import { useRef } from "react";
import { compactPrice, upFirstStr } from "../../utils/utils";
import "./Card.css";

const STYLE = {
  title: { fontSize: "18px", fontWeight: "600" },
};
const Card = ({ PropPosItems, onActiveChange, onClick }) => {
  const timeoutRef = useRef();
  const upHandler = () => {
    clearTimeout(timeoutRef.current);
  };
  const downHandler = (id) => {
    timeoutRef.current = setTimeout(() => {
      onActiveChange(id);
    }, 500);
  };

  const convertArrToJsx = (arr) => {
    return arr.map((item) => {
      let value = item.value;
      if (item.type === "datetime-local")
        value = new Date(item.value).customFormat();
      if (item.type === "money") value = compactPrice(value);

      return (
        <div className="item" key={Math.random()}>
          {item.showBoth && (
            <p className="title noselect" style={item.style}>
              {upFirstStr(item.title)}
            </p>
          )}
          <p className="value noselect" style={item.style}>
            {value}
          </p>
        </div>
      );
    });
  };
  return (
    <div
      className="Card"
      onMouseDown={downHandler.bind(null, 1)}
      onTouchStart={downHandler.bind(null, 1)}
      onMouseUp={upHandler}
      onTouchEnd={upHandler}
      onTouchMove={upHandler}
      onClick={onClick}
    >
      <div className="container">
        <div className="wrap-left"></div>
        <div className="wrap-right"></div>
      </div>
    </div>
  );
};

export default Card;
