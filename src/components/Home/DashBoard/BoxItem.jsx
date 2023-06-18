import "./BoxItem.css";

const BoxItem = ({ title, statist }) => {
  return (
    <div className="BoxItem">
      <p className="statist">{statist}</p>
      <p className="title">{title}</p>
    </div>
  );
};

export default BoxItem;
