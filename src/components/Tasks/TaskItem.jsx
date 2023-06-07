import { useParams } from "react-router-dom";
import "./TaskItem.css";
import { useDispatch, useSelector } from "react-redux";
import { TaskActions } from "../../store/task";
import { useEffect, useState } from "react";

const TaskItem = () => {
  const [indexActive, setIndexActive] = useState(-1);
  const dispatch = useDispatch();
  const param = useParams();
  const currentTask = useSelector((state) => state.task.tasks).filter(
    (task) => task.createdAt == param.id
  )[0];
  const inputChangeHandler = (taskItemId, data) => {
    dispatch(
      TaskActions.updateListTask({
        taskId: param.id,
        taskItemId,
        item: data,
      })
    );
  };
  useEffect(() => {
    for (let i = 0; i < currentTask.list.length; i++) {
      const item = currentTask.list[i];
      if (!item.title && indexActive !== i) {
        dispatch(
          TaskActions.deleteTaskItem({
            taskId: param.id,
            taskItemId: item.createdAt.toString(),
          })
        );
        return;
      }
    }
  }, [indexActive]);
  return (
    <div className="TaskItem">
      <div
        className="btn-add-task"
        onClick={() => dispatch(TaskActions.addListTask({ taskId: param.id }))}
      >
        <i className="bi bi-plus-lg"></i>
      </div>
      <div className="list">
        {currentTask.list.map((item, i) => (
          <div
            className="item"
            key={item.createdAt}
            onClickCapture={() => {
              setIndexActive(i);
            }}
          >
            <div className="wrap-left">
              {i !== indexActive && (
                <p className="title">{item.title || "Untitled"}</p>
              )}
              {i === indexActive && (
                <input
                  placeholder="Untitled"
                  className="input-title"
                  value={item.title}
                  onChange={(e) => {
                    inputChangeHandler(item.createdAt, {
                      title: e.target.value,
                    });
                  }}
                />
              )}
              <div className="deadline">
                {i !== indexActive && (
                  <p>
                    {item.deadline &&
                      new Date(
                        item.deadline - 1000 * 60 * 60 * 7
                      ).toLocaleString("en-GB")}
                  </p>
                )}
                {i === indexActive && (
                  <input
                    className="input-deadline"
                    value={
                      item.deadline &&
                      new Date(item.deadline).toISOString().slice(0, -5)
                    }
                    type="datetime-local"
                    onChange={(e) => {
                      inputChangeHandler(item.createdAt, {
                        deadline: Date.parse(e.target.value),
                      });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="wrap-right">
              <div
                className="state-done"
                onClick={() => {
                  setIndexActive(-1);
                  inputChangeHandler(item.createdAt, {
                    done: !item.done,
                  });
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

export default TaskItem;
