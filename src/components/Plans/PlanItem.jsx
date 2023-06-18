import { useParams } from "react-router-dom";
import useManageItem from "../../hook/use-manage-item";
import "./PlanItem.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataActions } from "../../store/data";

const PlanItem = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const currentPlan = useSelector((state) => state.data.plan).filter(
    (item) => item.createdAt == param.id
  )[0];
  const {
    indexActive,
    inputChangeHandler,
    indexActiveHandler,
    createItemHandler,
    toggleDoneHandler,
  } = useManageItem(currentPlan.createdAt, "plan");

  useEffect(() => {
    for (let i = 0; i < currentPlan.list.length; i++) {
      const item = currentPlan.list[i];
      if (!item.title && indexActive !== i) {
        dispatch(
          DataActions.deleteItem({
            type: "plan",
            listId: param.id,
            itemId: item.createdAt.toString(),
          })
        );
        return;
      }
    }
  }, [indexActive]);

  return (
    <div className="PlanItem">
      <div className="btn-add-plan" onClick={createItemHandler}>
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="list">
        {currentPlan.list.map((item, i) => (
          <div
            className="item"
            key={item.createdAt}
            onClick={indexActiveHandler.bind(null, i)}
          >
            {indexActive !== i && (
              <div className="wrap-left">
                <p className="title">{item.title}</p>
                <div className="note">
                  <p>Note:</p>
                  <p>{item.note}</p>
                </div>
              </div>
            )}
            {indexActive === i && (
              <div className="wrap-left">
                <input
                  type="text"
                  autoFocus
                  placeholder="Title"
                  className="input-title"
                  onChange={(e) => {
                    inputChangeHandler(item.createdAt, {
                      title: e.target.value,
                    });
                  }}
                  value={item.title}
                />
                <div className="note">
                  <p>Note:</p>
                  <input
                    type="text"
                    placeholder="Note"
                    className="input-note"
                    onChange={(e) => {
                      inputChangeHandler(item.createdAt, {
                        note: e.target.value,
                      });
                    }}
                    value={item.note}
                  />
                </div>
              </div>
            )}

            <div className="wrap-right">
              <div className="start">
                <p>Start: </p>
                {indexActive !== i && (
                  <p>{new Date(item.startAt).toLocaleString()}</p>
                )}
                {indexActive === i && (
                  <input
                    type="datetime-local"
                    className="input-start-at"
                    onChange={(e) => {
                      inputChangeHandler(item.createdAt, {
                        startAt: Date.parse(e.target.value),
                      });
                    }}
                    value={
                      item.startAt &&
                      new Date(item.startAt).toISOString().slice(0, -5)
                    }
                  />
                )}
              </div>
              <div className="end">
                <p>End: </p>
                {indexActive !== i && (
                  <p>{new Date(item.endAt).toLocaleString()}</p>
                )}
                {indexActive === i && (
                  <input
                    type="datetime-local"
                    className="input-end-at"
                    onChange={(e) => {
                      inputChangeHandler(item.createdAt, {
                        endAt: Date.parse(e.target.value),
                      });
                    }}
                    value={
                      item.endAt &&
                      new Date(item.endAt).toISOString().slice(0, -5)
                    }
                  />
                )}
              </div>
              <div
                className="done"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDoneHandler(item.createdAt, item.done);
                }}
              >
                <p>{item.done ? "Done" : "Not Done"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanItem;
