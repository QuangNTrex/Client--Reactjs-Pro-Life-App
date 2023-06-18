import { useRef, useState } from "react";
import BTNAdd from "../../lib/BTNAdd/BTNAdd";
import "./Lend.css";
import Popup from "../../lib/Popup/Popup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataActions } from "../../store/data";
import { checkBorder, slimName } from "../../utils/utils";

const Lend = () => {
  const navigate = useNavigate();
  const [indexEdit, setIndexEdit] = useState(-1);
  const timeoutRef = useRef();
  const lends = useSelector((state) => state.data.lend);
  const dispatch = useDispatch();
  const [showPU, setShowPU] = useState(false);

  const submitHandler = (data) => {
    console.log(data);
    dispatch(
      DataActions.createList({
        type: "lend",
        list: {
          fullName: data.fullName,
          title: data.title,
          estimateDate: data.estimateDate,
        },
      })
    );
  };
  const downHandler = (index) => {
    timeoutRef.current = setTimeout(() => {
      setIndexEdit(index);
    }, 500);
  };
  const upHandler = () => {
    clearTimeout(timeoutRef.current);
  };
  const inputChangeHandler = (listId, data) => {
    dispatch(DataActions.updateList({ type: "lend", list: data, listId }));
  };
  const deleteTaskHandler = (listId, title) => {
    const prom = prompt(`Press password to delete the task`);
    if (prom === "quangdeptrai")
      dispatch(DataActions.deleteList({ type: "lend", listId }));
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
      {indexEdit >= 0 && (
        <div className="close" onClick={() => setIndexEdit(-1)}>
          <p>Close</p>
        </div>
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
        {lends.map((e, i) => (
          <div
            className={`lend ${
              e.pay ? "border-green" : checkBorder(e.estimateDate)
            }`}
            key={e.createdAt.toString()}
            onClick={() => {
              if (indexEdit < 0) return navigate(`/lend/${e.createdAt}`);
              setIndexEdit(i);
            }}
            onTouchStart={downHandler.bind(null, i)}
            onTouchEnd={upHandler}
            onMouseDown={downHandler.bind(null, i)}
            onMouseUp={upHandler}
            onMouseMove={upHandler}
            onTouchMove={upHandler}
          >
            <div className="wrap-left">
              {indexEdit !== i && (
                <p className="fullName">{slimName(e.fullName, 25)}</p>
              )}
              {indexEdit === i && (
                <input
                  className="input-name"
                  value={e.fullName}
                  onChange={(event) =>
                    inputChangeHandler(e.createdAt, {
                      fullName: event.target.value,
                    })
                  }
                ></input>
              )}
              <div className="wrap-date">
                <p>Start:</p>
                <p>{new Date(e.createdAt).toLocaleString("en-GB")}</p>
              </div>

              <div className="wrap-date">
                <p>Estimate</p>
                {indexEdit !== i && (
                  <p>
                    {new Date(e.estimateDate || NaN).toLocaleDateString(
                      "en-US"
                    )}
                  </p>
                )}
                {indexEdit === i && (
                  <input
                    className="input-estimate"
                    type="datetime-local"
                    value={
                      e.estimateDate &&
                      new Date(e.estimateDate || NaN).toISOString().slice(0, -5)
                    }
                    onChange={(event) =>
                      inputChangeHandler(e.createdAt, {
                        estimateDate: Date.parse(event.target.value),
                      })
                    }
                  ></input>
                )}
              </div>
            </div>
            <div className="wrap-right">
              <div className="total-price">
                <p className="price">{e.totalPrice} Đ</p>
              </div>
              <div className="state-pay">
                <p>{e.pay ? "Paid" : "Not Paid"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lend;
