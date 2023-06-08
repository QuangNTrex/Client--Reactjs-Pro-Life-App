import BTNAdd from "../../lib/BTNAdd/BTNAdd";
import "./Plans.css";
import Popup from "../../lib/Popup/Popup";
import { useSelector } from "react-redux";
import useManageList from "../../hook/use-manage-list";
import { useNavigate } from "react-router-dom";

const Plans = () => {
  const {
    createListHandler,
    inputChangeHandler,
    deleteListHandler,
    showPUHandler,
    hidePUHandler,
    offEditMode,
    mouseDownHandler,
    mouseUpHandler,
    IndexActiveHandler,
    showPU,
    indexActive,
    editMode,
  } = useManageList("plan");
  const navigate = useNavigate();
  const plans = useSelector((state) => state.data.plan);
  return (
    <div className="Plans">
      {showPU && (
        <Popup
          onClose={hidePUHandler}
          onSubmit={(data) => {
            createListHandler(data);
          }}
          info={[
            { title: "title", placeHolder: "Title", type: "text" },
            { title: "note", placeHolder: "Note", type: "text" },
            {
              title: "startAt",
              placeHolder: "StartAt",
              type: "datetime-local",
            },
            { title: "endAt", placeHolder: "EndAt", type: "datetime-local" },
          ]}
        />
      )}
      <div className="Plans__btn-add">
        <BTNAdd text="Add Task" onClick={showPUHandler} />
      </div>
      {editMode && (
        <div className="btn-close-edit-mode" onClick={offEditMode}>
          <p>Close</p>
        </div>
      )}
      {plans.length === 0 && <div>No Plan</div>}
      <div className="list">
        {plans.map((plan, i) => (
          <div
            className={`plan ${plan.done && "border-green"}`}
            key={plan.createdAt}
            onClick={() => {
              if (!editMode) return navigate(`/plans/${plan.createdAt}`);
              IndexActiveHandler(i);
            }}
            onMouseDown={mouseDownHandler.bind(null, i)}
            onMouseUp={mouseUpHandler}
            onTouchMove={mouseUpHandler}
            onTouchStart={mouseDownHandler.bind(null, i)}
            onTouchEnd={mouseUpHandler}
            onContextMenu={(p) => p.preventDefault()}
          >
            {indexActive !== i && (
              <div className="wrap-left">
                <p className="title">{plan.title}</p>
                <div className="note">
                  <p>Note:</p>
                  <p>{plan.note}</p>
                </div>
              </div>
            )}
            {indexActive === i && (
              <div className="wrap-left">
                <input
                  type="text"
                  autoFocus
                  className="input-title"
                  onChange={(e) => {
                    inputChangeHandler(plan.createdAt, {
                      title: e.target.value,
                    });
                  }}
                  value={plan.title}
                />
                <div className="note">
                  <p>Note:</p>
                  <input
                    type="text"
                    className="input-note"
                    onChange={(e) => {
                      inputChangeHandler(plan.createdAt, {
                        note: e.target.value,
                      });
                    }}
                    value={plan.note}
                  />
                </div>
              </div>
            )}
            {indexActive !== i && (
              <div className="wrap-right">
                <div className="start">
                  <p>Start: </p>
                  <p>{new Date(plan.startAt).toLocaleString()}</p>
                </div>
                <div className="end">
                  <p>End: </p>
                  <p>{new Date(plan.endAt).toLocaleString()}</p>
                </div>
                <div className="done">
                  {indexActive !== i && (
                    <p>{plan.done ? "Done" : "Not Done"}</p>
                  )}
                  {indexActive === i && (
                    <div className="trash">
                      <i className="bi bi-trash"></i>
                    </div>
                  )}
                </div>
              </div>
            )}
            {indexActive === i && (
              <div className="wrap-right">
                <div className="start">
                  <p>Start: </p>
                  <input
                    className="input-start-at"
                    type="datetime-local"
                    onChange={(e) => {
                      inputChangeHandler(plan.createdAt, {
                        startAt: Date.parse(e.target.value),
                      });
                    }}
                    value={
                      plan.startAt &&
                      new Date(plan.startAt).toISOString().slice(0, -5)
                    }
                  />
                </div>
                <div className="end">
                  <p>End: </p>
                  <input
                    className="input-end-at"
                    type="datetime-local"
                    onChange={(e) => {
                      inputChangeHandler(plan.createdAt, {
                        endAt: Date.parse(e.target.value),
                      });
                    }}
                    value={
                      plan.endAt &&
                      new Date(plan.endAt).toISOString().slice(0, -5)
                    }
                  />
                </div>
                <div className="done">
                  {indexActive !== i && (
                    <p>{plan.done ? "Done" : "Not Done"}</p>
                  )}
                  {indexActive === i && (
                    <div
                      className="trash"
                      onClick={deleteListHandler.bind(null, plan.createdAt)}
                    >
                      <i className="bi bi-trash"></i>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
