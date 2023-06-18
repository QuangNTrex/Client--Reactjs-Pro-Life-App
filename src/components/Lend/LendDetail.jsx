import { useNavigate, useParams } from "react-router-dom";
import "./LendDetail.css";
import { useDispatch, useSelector } from "react-redux";
// import { LendActions } from "../../store/lend";
import { useEffect, useState } from "react";
import { DataActions } from "../../store/data";
import { slimName } from "../../utils/utils";

const LendDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const currentLend = useSelector((state) => state.data.lend).filter(
    (e) => e.createdAt.toString() === params.id
  )[0];
  const [indexActive, setIndexActive] = useState(-1);
  const addMountHandler = () => {
    if (currentLend.pay) return;
    setIndexActive(0);
    dispatch(DataActions.createItem({ type: "lend", listId: params.id }));
  };

  useEffect(() => {
    for (let i = 0; i < currentLend.list.length; i++) {
      const { title, money, createdAt } = currentLend.list[i];
      if (!title && !money && indexActive !== i) {
        dispatch(
          DataActions.deleteItem({
            type: "lend",
            listId: params.id,
            itemId: createdAt.toString(),
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
        {currentLend.list.length === 0 && <p>No have lend</p>}
        {currentLend.list.map((e, i) => (
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
                  autoFocus
                  className="input-title"
                  placeholder="Title"
                  defaultValue={e.title}
                  onChange={(ele) => {
                    dispatch(
                      DataActions.updateItem({
                        type: "lend",
                        listId: params.id,
                        itemId: e.createdAt.toString(),
                        item: { title: ele.target.value },
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
                      DataActions.updateItem({
                        type: "lend",
                        listId: params.id,
                        itemId: e.createdAt.toString(),
                        item: { money: Number(ele.target.value) },
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
          <p className="full-name">{slimName(currentLend.fullName)}</p>
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
                DataActions.updateList({
                  type: "lend",
                  listId: params.id,
                  list: { pay: !currentLend.pay },
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
