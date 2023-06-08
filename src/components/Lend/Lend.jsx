import { useState } from "react";
import BTNAdd from "../../lib/BTNAdd/BTNAdd";
import "./Lend.css";
import Popup from "../../lib/Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { LendActions } from "../../store/lend";
import { useNavigate } from "react-router-dom";
import { DataActions } from "../../store/data";
import { checkBorder } from "../../utils/utils";

const Lend = () => {
  const navigate = useNavigate();
  // const lends = useSelector((state) => state.lend.lends);
  const lends = useSelector((state) => state.data.lend);
  const dispatch = useDispatch();
  const [showPU, setShowPU] = useState(false);

  const submitHandler = (data) => {
    dispatch(
      DataActions.createList({
        type: "lend",
        list: {
          fullName: data.fullName,
          title: data.title,
          estimateDate: Date.parse(data.estimateDate),
        },
      })
    );
  };

  return (
    <div className="Lend">
      {showPU && (
        <Popup
          onClose={() => setShowPU(false)}
          onSubmit={submitHandler}
          info={[
            { title: "fullName", placeHolder: "Full Name", type: "text" },
            { title: "title", placeHolder: "Title", type: "text" },
            { title: "estimateDate", type: "date" },
          ]}
        />
      )}
      <div className="Lend__btn-add">
        <BTNAdd
          onClick={() => setShowPU(true)}
          text="Add Lend"
          iconName="bi-plus-lg"
        />
      </div>
      <div className="Lend__list">
        {lends.length === 0 && <p>Not have lend, congratuation!</p>}
        {lends.map((e) => (
          <div
            className={`lend ${
              e.pay ? "border-green" : checkBorder(e.estimateDate)
            }`}
            key={e.createdAt.toString()}
            onClick={() => navigate(`/lend/${e.createdAt}`)}
          >
            <div className="wrap-left">
              <p className="fullName">{e.fullName}</p>
              <div className="wrap-date">
                <p>Start:</p>
                <p>{new Date(e.createdAt).toLocaleString("en-GB")}</p>
              </div>
              <div className="wrap-date">
                <p>Estimate</p>
                <p>
                  {new Date(e.estimateDate || NaN).toLocaleDateString("en-US")}
                </p>
              </div>
            </div>
            <div className="wrap-right">
              <div className="state-pay">
                <p>{e.pay ? "Paid" : "Not Paid"}</p>
              </div>
              <div className="total-price">
                <p className="price">{e.totalPrice} Đ</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lend;
