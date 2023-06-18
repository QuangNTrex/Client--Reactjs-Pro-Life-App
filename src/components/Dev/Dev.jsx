import { useState } from "react";
import "./Dev.css";
import Card from "../Card/Card";
import EditCard from "../Card/EditCard";

const Dev = () => {
  const [infoLeft, setInfoLeft] = useState([
    {
      title: "Title",
      value: "HAHA",
      showBoth: true,
      type: "text",
      style: { fontSize: "18px", fontWeight: "600" },
    },
    { title: "Title", value: "HAHA" },
    {
      title: "Time",
      value: Date.now(),
      type: "datetime-local",
      showBoth: true,
    },
  ]);
  const [infoRight, setInfoRight] = useState([
    {
      title: "Title",
      value: "HAHA",
      showBoth: true,
    },
    { title: "Title", value: "HAHA" },
  ]);
  const activeChangeHandler = () => {};
  const changeValueHandler = () => {};
  const deleteHandler = () => {};
  return (
    <div className="Dev">
      <Card
        infoLeft={infoLeft}
        infoRight={infoRight}
        onActiveChange={activeChangeHandler}
      />
      <EditCard
        infoLeft={infoLeft}
        infoRight={infoRight}
        onChangeValue={changeValueHandler}
        onDelete={deleteHandler}
      />
    </div>
  );
};

export default Dev;
