import "./EditCard.css";

const EditCard = ({ infoLeft, infoRight, onChangeValue, onDelete, id }) => {
  const inputTextChangeHandler = (e, item) => {
    onChangeValue(id, { [item.title]: e.target.value });
  };
  const inputNumberChangeHandler = (e, item) => {
    const number = Number(e.target.value.replace(",", "."));
    if (number === NaN) return;
    onChangeValue(id, { [item.title]: number });
  };
  const inputTimeChangeHandler = (e, item) => {
    const time = Date.parse(e.target.value);
    onChangeValue(id, { [item.title]: time });
  };

  const convertArrToJsx = (arr) => {
    return arr.map((item) => {
      let value = item.value;
      if (item.type === "datetime-local")
        value = item.value && new Date(item.value).toISOString().slice(0, -5);

      return (
        <div className="item" key={Math.random()}>
          {item.showBoth && (
            <p className="title" style={item.style}>
              {item.title}
            </p>
          )}
          {!item.isNotInput && (
            <input
              type={item.type}
              value={value}
              style={item.style}
              onChange={(e) => {
                if (item.type === "datetime-local")
                  inputTimeChangeHandler(e, item);
                else if (item.type === "number")
                  inputNumberChangeHandler(e, item);
                else inputTextChangeHandler(e, item);
              }}
            />
          )}
          {item.isNotInput && (
            <p className="value" style={item.style}>
              {item.value}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="EditCard">
      <div className="container">
        <div className="wrap-left">{convertArrToJsx(infoLeft)}</div>
        <div className="wrap-right">
          {[
            ...convertArrToJsx(infoRight),
            onDelete && (
              <div
                className="item trash"
                key={Math.random()}
                onClick={onDelete.bind(null, id)}
              >
                <i className="bi bi-trash"></i>
              </div>
            ),
          ]}
        </div>
      </div>
    </div>
  );
};

export default EditCard;
