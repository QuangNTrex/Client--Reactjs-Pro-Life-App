import { useEffect, useRef, useState } from "react";
import useStatistical from "../../../hook/use-statistical";
import "./DashBoard.css";
import BoxItem from "./BoxItem";
import { compactPrice } from "../../../utils/utils";

const listTime = ["MONTH", "WEEK", "DAY"];
const DashBoard = () => {
  const { lendStatistic, shoppingStatistic, taskStatistic, planStatistic } =
    useStatistical();
  const timeoutRef = useRef();
  const [indexListTime, setIndexListTime] = useState(0);
  const [activeContainer, setActiveContainer] = useState(false);
  useEffect(() => {
    if (!activeContainer) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndexListTime((prev) => (prev + 1) % 3);
    }, 10000);
  }, [indexListTime, activeContainer]);

  const lendStatist = lendStatistic(listTime[indexListTime]);
  const shoppingStatist = shoppingStatistic(listTime[indexListTime]);
  const taskStatist = taskStatistic(listTime[indexListTime]);
  const planStatist = planStatistic(listTime[indexListTime]);

  // console.log(lendStatist, shoppingStatist, taskStatist, planStatist);

  return (
    <div className="DashBoard">
      <div className="wrap-top">
        <div className="navbar-time">
          {listTime.map((time, i) => (
            <div
              key={i}
              className={`time ${i === indexListTime && "active"}`}
              onClick={() => {
                setActiveContainer(true);
                setIndexListTime(i);
              }}
            >
              {time.slice(0, 2)}
            </div>
          ))}
        </div>
        <div
          className="btn-close-close"
          onClick={() => setActiveContainer((prev) => !prev)}
        >
          {activeContainer && <i className="bi bi-chevron-down"></i>}
          {!activeContainer && <i className="bi bi-chevron-up"></i>}
        </div>
      </div>
      {activeContainer && (
        <div className="container">
          <div className="wrap-top-left">
            <div className="task-list">
              <p className="title">Task</p>
              <BoxItem title="Deadline" statist={taskStatist.totalDeadline} />
              <BoxItem title="Task Left" statist={taskStatist.taskLeft} />
            </div>
            <div className="plan-list">
              <p className="title">Plan</p>
              <BoxItem title="Planing" statist={planStatist.planing} />
              <BoxItem title="Next Plan" statist={planStatist.nextPlan} />
            </div>
          </div>

          <div className="wrap-top-right">
            <div className="lend-list">
              <p className="title">Lend</p>
              <BoxItem
                title="Total"
                statist={compactPrice(lendStatist.totalMoney)}
              />
              <BoxItem title="Paid" statist={compactPrice(lendStatist.paid)} />
            </div>
          </div>

          <div className="wrap-bottom">
            <div className="shopping-list">
              <p className="title">Shop</p>
              <BoxItem
                title="Total"
                statist={compactPrice(shoppingStatist.totalMoney)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
