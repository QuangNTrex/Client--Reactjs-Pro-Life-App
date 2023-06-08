import { useParams } from "react-router-dom";
import "./TaskItem.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DataActions } from "../../store/data";

const TaskItem = () => {
  const [indexActive, setIndexActive] = useState(-1);
  const dispatch = useDispatch();
  const param = useParams();
  const currentTask = useSelector((state) => state.data.task).filter(
    (task) => task.createdAt == param.id
  )[0];
  const inputChangeHandler = (itemId, data) => {
    console.log(itemId, data);
    dispatch(
      DataActions.updateItem({
        type: "task",
        listId: param.id,
        itemId,
        item: data,
      })
    );
  };
  useEffect(() => {
    for (let i = 0; i < currentTask.list.length; i++) {
      const item = currentTask.list[i];
      if (!item.title && indexActive !== i) {
        dispatch(
          DataActions.deleteItem({
            type: "task",
            listId: param.id,
            itemId: item.createdAt.toString(),
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
        onClick={() => {
          setIndexActive(0);
          dispatch(DataActions.createItem({ listId: param.id, type: "task" }));
        }}
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
                  autoFocus
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
