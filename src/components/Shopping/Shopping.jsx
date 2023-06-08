import { useRef, useState } from "react";
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
  const bills = useSelector((state) => state.data.bill);

  const timeoutRef = useRef();
  const [showPU, setShowPU] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [indexActive, setIndexActive] = useState(-1);

  const submitHandler = (list) => {
    if (!list.title) list.title = getDay();
    dispatch(DataActions.createList({ type: "bill", list }));
  };
  const inputChangeHandler = (listId, list) => {
    dispatch(DataActions.updateList({ type: "bill", list, listId }));
  };
  const deleteHandler = (listId) => {
    const text = prompt("Enter password to delete");
    if (text === "quangdeptrai") {
      dispatch(DataActions.deleteList({ type: "bill", listId }));
    }
  };
  const closeEditModeHandler = () => {
    setEditMode(false);
    setIndexActive(-1);
  };
  const downHandler = (i) => {
    timeoutRef.current = setTimeout(() => {
      setEditMode(true);
      setIndexActive(i);
    }, 500);
  };
  const upHandler = () => {
    clearTimeout(timeoutRef.current);
  };
  console.log(editMode);

  return (
    <div className="Shopping">
      {showPU && (
        <Popup
          onClose={() => setShowPU(false)}
          info={[{ title: "title", type: "text", placeHolder: getDay() }]}
          onSubmit={submitHandler}
        />
      )}
      {editMode && (
        <div className="btn-close-edit-mode" onClick={closeEditModeHandler}>
          <p>Close</p>
        </div>
      )}
      <div className="Shopping__btn-add-bill" onClick={() => setShowPU(true)}>
        <div className="container noselect">
          <i className="bi bi-plus-lg"></i>
          <p>Add Bill</p>
        </div>
      </div>

      <div className="Shopping__Lists">
        {bills.length === 0 && <p>list is empty</p>}
        {bills.length !== 0 && (
          <div className="wrap">
            {bills.map((bill, i) => (
              <div
                className="bill"
                key={bill.createdAt.toString()}
                onClick={() => {
                  if (!editMode) return navigate(`./${bill.createdAt}`);
                  setIndexActive(i);
                }}
                onTouchStart={downHandler.bind(null, i)}
                onTouchEnd={upHandler}
                onMouseDown={downHandler.bind(null, i)}
                onMouseUp={upHandler}
                onContextMenu={(e) => e.preventDefault()}
              >
                {indexActive !== i && (
                  <div className="wrap-left">
                    <h4 className="title noselect">{bill.title}</h4>
                    <p className="date noselect">{getDay(bill.createdAt)}</p>
                  </div>
                )}
                {indexActive === i && (
                  <div className="wrap-left">
                    <input
                      type="text"
                      className="input-title"
                      autoFocus
                      value={bill.title}
                      onChange={(e) => {
                        inputChangeHandler(bill.createdAt, {
                          title: e.target.value,
                        });
                      }}
                    />
                    <p className="date noselect">{getDay(bill.createdAt)}</p>
                  </div>
                )}
                <div className="wrap-right">
                  <div className="total-price noselect">
                    <p className="noselect">
                      {Math.round(bill.totalPrice * 100) / 100} VND
                    </p>
                  </div>
                  <div className="state-pay noselect">
                    {indexActive === i && (
                      <div
                        className="trash"
                        onClick={deleteHandler.bind(null, bill.createdAt)}
                      >
                        <i className="bi bi-trash"></i>
                      </div>
                    )}
                    {!(indexActive === i) &&
                      (bill.pay ? <p>Paid</p> : <p>Not Paid</p>)}
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
