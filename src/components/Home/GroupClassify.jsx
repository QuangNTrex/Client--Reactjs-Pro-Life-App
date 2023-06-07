import "./GroupClassify.css";
import { useNavigate } from "react-router-dom";

const GroupClassify = (props) => {
  const navigate = useNavigate();

  return (
    <div className="GroupClassify">
      <div className="header">
        <h4>{props.header}</h4>
      </div>
      <div className="list">
        {props.list.map((item) => (
          <div
            className="type"
            key={Math.random().toString()}
            onClick={() => {
              navigate(item.path);
            }}
          >
            <i className={`bi ${item.icon} noselect`}></i>
            <p className="noselect">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupClassify;
