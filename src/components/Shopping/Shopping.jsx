import { useState } from "react";
import Popup from "../../lib/Popup/Popup";
import "./Shopping.css";
import { useDispatch, useSelector } from "react-redux";
import { BillActions } from "../../store/bill";
import { useNavigate } from "react-router-dom";
import { DataActions } from "../../store/data";

const getDay = (time) => {
  const currentDate = time ? new Date(time) : new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const Shopping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const bills = useSelector((state) => state.bill.bills);
  const bills = useSelector((state) => state.data.bill);

  const [showPU, setShowPU] = useState(false);
  const submitHandler = (list) => {
    if (!list.title) list.title = getDay();
    // dispatch(BillActions.createBill({ title: list.title }));
    dispatch(DataActions.createList({ type: "bill", list }));
  };

  return (
    <div className="Shopping">
      {showPU && (
        <Popup
          onClose={() => setShowPU(false)}
          info={[{ title: "title", type: "text", placeHolder: getDay() }]}
          onSubmit={submitHandler}
        />
      )}
      <div className="Shopping__btn-add-bill" onClick={() => setShowPU(true)}>
        <div className="container">
          <i className="bi bi-plus-lg"></i>
          <p>Add Bill</p>
        </div>
      </div>

      <div className="Shopping__Lists">
        {bills.length === 0 && <p>list is empty</p>}
        {bills.length !== 0 && (
          <div className="wrap">
            {bills.map((bill) => (
              <div
                className="bill"
                key={bill.createdAt.toString()}
                onClick={() => navigate(`./${bill.createdAt}`)}
              >
                <div className="wrap-left">
                  <h4 className="title noselect">{bill.title}</h4>
                  <p className="date noselect">{getDay(bill.createdAt)}</p>
                </div>
                <div className="wrap-right">
                  <div className="total-price">
                    <p> {Math.round(bill.totalPrice * 100) / 100} Đ VND</p>
                  </div>
                  <div className="state-pay noselect">
                    {!bill.pay && <p>Not Paid</p>}
                    {bill.pay && <p>Paid</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
