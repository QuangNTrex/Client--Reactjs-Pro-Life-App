import { useNavigate, useParams } from "react-router-dom";
import "./LendDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { LendActions } from "../../store/lend";
import { useEffect, useState } from "react";

const LendDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const currentLend = useSelector((state) => state.lend.lends).filter(
    (e) => e.createdAt.toString() === params.id
  )[0];
  const [indexActive, setIndexActive] = useState(-1);
  const addMountHandler = () => {
    if (currentLend.pay) return;
    setIndexActive(0);
    dispatch(LendActions.addAmount({ lendId: params.id }));
  };

  useEffect(() => {
    for (let i = 0; i < currentLend.amounts.length; i++) {
      const { title, money, createdAt } = currentLend.amounts[i];
      if (!title && !money && indexActive !== i) {
        dispatch(
          LendActions.deleteAmount({
            lendId: params.id,
            amountId: createdAt.toString(),
          })
        );
        return;
      }
    }
  }, [indexActive]);
  if (!currentLend) return navigate("/lend");
  return (
    <div className="LendDetail">
      <div className="add-amount" onClick={addMountHandler}>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="list">
        {currentLend.amounts.length === 0 && <p>No have lend</p>}
        {currentLend.amounts.map((e, i) => (
          <div
            className="amount"
            key={e.createdAt.toString()}
            onClick={() => {
              if (currentLend.pay) return;
              setIndexActive(i);
            }}
          >
            <div className="wrap-left">
              {indexActive !== i && <p className="title">{e.title}</p>}
              {indexActive === i && (
                <input
                  className="input-title"
                  defaultValue={e.title}
                  onChange={(ele) => {
                    dispatch(
                      LendActions.updateAmount({
                        lendId: params.id,
                        amountId: e.createdAt.toString(),
                        amount: { title: ele.target.value },
                      })
                    );
                  }}
                />
              )}
              <div className="time-create">
                <p>Create At: </p>
                <p>{new Date(e.createdAt).toLocaleString("en-US")}</p>
              </div>
            </div>
            <div className="wrap-right">
              {indexActive !== i && <p className="money">{e.money}</p>}
              {indexActive === i && (
                <input
                  className="input-money"
                  type="number"
                  defaultValue={e.money.toString()}
                  onChange={(ele) => {
                    dispatch(
                      LendActions.updateAmount({
                        lendId: params.id,
                        amountId: e.createdAt.toString(),
                        amount: { money: Number(ele.target.value) },
                      })
                    );
                  }}
                />
              )}
              <p>Đ</p>
            </div>
          </div>
        ))}
      </div>
      <div className="Lend__bottom">
        <div className="wrap-left">
          <p className="full-name">{currentLend.fullName}</p>
          <p>{currentLend.title}</p>
        </div>
        <div className="wrap-right">
          <div className="price">
            <p>Total Price: </p>
            <p>{currentLend.totalPrice} Đ</p>
          </div>
          <div
            className="btn-pay"
            onClick={() => {
              setIndexActive(-1);
              dispatch(
                LendActions.updateLend({
                  lendId: params.id,
                  lend: { pay: !currentLend.pay },
                })
              );
            }}
          >
            <p>{currentLend.pay ? "Paid" : "Not Paid"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendDetail;
