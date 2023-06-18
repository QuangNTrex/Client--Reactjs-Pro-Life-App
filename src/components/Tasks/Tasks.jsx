import { useDispatch, useSelector } from "react-redux";
import BTNAdd from "../../lib/BTNAdd/BTNAdd";
import "./Tasks.css";
// import { TaskActions } from "../../store/task";
import { useState } from "react";
import Popup from "../../lib/Popup/Popup";
import { checkBorder, slimName, upFirstStr } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { DataActions } from "../../store/data";
const listWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const Tasks = () => {
  const tasks = useSelector((state) => state.data.task);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPU, setShowPU] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [indexActive, setIndexActive] = useState(-1);

  const submitHandler = (data) => {
    const title = data.title;
    const deadline = data.deadline;
    const repeat = data.repeat;
    dispatch(
      DataActions.createList({
        type: "task",
        list: { title, deadline, repeat },
      })
    );
    setShowPU(false);
  };
  const inputChangeHandler = (listId, data) => {
    dispatch(DataActions.updateList({ type: "task", list: data, listId }));
  };
  const deleteTaskHandler = (listId) => {
    const prom = prompt(`Press password to delete the task`);
    if (prom === "quangdeptrai")
      dispatch(DataActions.deleteList({ type: "task", listId }));
  };
  return (
    <div className="Tasks">
      {showPU && (
        <Popup
          onClose={() => setShowPU(false)}
          onSubmit={submitHandler}
          info={[
            { title: "title", placeHolder: "Title" },
            {
              title: "deadline",
              placeHolder: "Deadline",
              type: "datetime-local",
            },
            {
              title: "repeat",
              placeHolder: "Repeat",
              type: "checkboxs",
              list: listWeek,
            },
          ]}
        />
      )}

      <div className="btn-add-task">
        <BTNAdd
          text={editMode ? "Done!" : "Edit"}
          iconName={!editMode ? "bi-pen" : "bi-check2-all"}
          onClick={() => {
            console.log("click");
            setIndexActive(-1);
            setEditMode((prev) => !prev);
          }}
        />
        <BTNAdd
          text="Add Task"
          onClick={() => {
            setShowPU(true);
          }}
        />
      </div>

      <div className="list">
        {tasks.map((e, i) => (
          <div
            key={e.createdAt.toString()}
            className={`item ${
              e.done ? "border-green" : checkBorder(e.deadline)
            }`}
            onClick={() => {
              if (editMode) return setIndexActive(i);
              navigate(`/tasks/${e.createdAt}`);
            }}
          >
            {indexActive !== i && (
              <div className="wrap-left">
                <p className="title">
                  {slimName(upFirstStr(e.title) || "Untitled")}
                </p>
                <div className="deadline">
                  <p className="">Deadline: </p>
                  <p className="deadline-time">
                    {console.log(e.deadline)}
                    {new Date(e.deadline ? e.deadline : "").toLocaleString()}
                  </p>
                </div>
                <div className="repeat">
                  <p>Repeat: </p>
                  {Object.keys(e.repeat).length === 0 && <p>none</p>}
                  {Object.keys(e.repeat).map((e) => (
                    <p key={e}>{upFirstStr(e.slice(0, 3))}</p>
                  ))}
                </div>
              </div>
            )}

            {indexActive === i && (
              <div className="wrap-left">
                <input
                  type="text"
                  className="input-title"
                  value={e.title}
                  onChange={(event) => {
                    inputChangeHandler(e.createdAt.toString(), {
                      title: event.target.value,
                    });
                  }}
                />
                <div className="deadline">
                  <p className="">Deadline: </p>
                  <input
                    type="datetime-local"
                    className="input-deadline"
                    value={
                      e.deadline &&
                      new Date(e.deadline).toISOString().slice(0, -5)
                    }
                    onChange={(event) => {
                      inputChangeHandler(e.createdAt.toString(), {
                        deadline: Date.parse(event.target.value),
                      });
                    }}
                  />
                </div>
                <div className="repeat">
                  <p>Repeat: </p>
                  {listWeek.map((week) => (
                    <div key={week} className="week">
                      <p>{week[0].toUpperCase()}</p>
                      <input
                        type="checkbox"
                        className="check-box"
                        checked={e.repeat[week]}
                        onChange={(event) => {
                          const repeat = { ...e.repeat };
                          repeat[week] = true;
                          if (!event.target.checked) delete repeat[week];
                          dispatch(
                            DataActions.updateList({
                              type: "task",
                              list: { repeat },
                              listId: e.createdAt.toString(),
                            })
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="wrap-right">
              <div className="progress">
                <p> Progress: </p>
                <p>
                  {e.list.reduce((total, event) => total + event.done, 0)}/
                  {e.list.length}
                </p>
              </div>
              <div className="state-done">
                {indexActive !== i && <p>{e.done ? "Done" : "Not Done"}</p>}
                {indexActive === i && (
                  <div
                    className="btn-destroy"
                    onClick={deleteTaskHandler.bind(
                      null,
                      e.createdAt.toString(),
                      e.title
                    )}
                  >
                    <i className="bi bi-trash"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
