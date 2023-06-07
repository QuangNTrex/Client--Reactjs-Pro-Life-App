import "./BTNAdd.css";

const BTNAdd = ({ onClick, iconName, text }) => {
  return (
    <div className="BTNAdd" onClick={onClick}>
      <i className={`bi ${iconName || "bi-plus-lg"}`}></i>
      <p>{text}</p>
    </div>
  );
};

export default BTNAdd;
