import { isSameDay, isSameMonth, isSameWeek } from "date-fns";
import { useSelector } from "react-redux";

const text = {
  month: "MONTH",
  week: "WEEK",
  day: "DAY",
};
const timeObj = {
  month: 1000 * 3600 * 24 * 30,
  week: 1000 * 3600 * 24 * 7,
  day: 1000 * 3600 * 24 * 1,
};

const useStatistical = () => {
  const bills = useSelector((state) => state.data.bill);
  const lends = useSelector((state) => state.data.lend);
  const tasks = useSelector((state) => state.data.task);
  const plans = useSelector((state) => state.data.plan);

  const shoppingStatistic = (type = text.month, option = {}) => {
    let compareTime = isSameMonth;
    if (type.toUpperCase() === text.week) compareTime = isSameWeek;
    if (type.toUpperCase() === text.day) compareTime = isSameDay;
    const data = { totalMoney: 0 };
    bills.forEach((bill) => {
      if (compareTime(bill.createdAt, Date.now()) && bill.pay)
        data.totalMoney += bill.totalPrice;
    });
    return data;
  };

  const lendStatistic = (type = text.month, option = {}) => {
    const data = { totalMoney: 0, paid: 0, notPaid: 0 };
    let compareTime = isSameMonth;
    if (type.toUpperCase() === text.week) compareTime = isSameWeek;
    if (type.toUpperCase() === text.day) compareTime = isSameDay;
    lends.forEach((lend) => {
      if (!compareTime(lend.createdAt, Date.now())) return;
      data.totalMoney += lend.totalPrice;
      if (lend.pay) data.paid += lend.totalPrice;
      else data.notPaid += lend.totalPrice;
    });
    return data;
  };

  const taskStatistic = (type = text.month, option = {}) => {
    const data = { totalDeadline: 0, taskLeft: 0 };
    let compareTime = isSameMonth;
    if (type.toUpperCase() === text.week) compareTime = isSameWeek;
    if (type.toUpperCase() === text.day) compareTime = isSameDay;
    tasks.forEach((task) => {
      if (task.done) return;
      data.taskLeft++;
      if (!task.deadline) return;
      if (task.deadline <= Date.now()) data.totalDeadline++;
    });
    return data;
  };

  const planStatistic = (type = text.month, option = {}) => {
    const data = { planing: 0, nextPlan: 0 };
    let compareTime = isSameMonth;
    if (type.toUpperCase() === text.week) compareTime = isSameWeek;
    if (type.toUpperCase() === text.day) compareTime = isSameDay;
    plans.forEach((plan) => {
      if (plan.done) return;
      if (!plan.endAt) data.planing++;
      else if ((plan.startAt || 0) <= Date.now() && Date.now() <= plan.endAt)
        data.planing++;

      compareTime(
        Date.now() + timeObj[type.toLowerCase()],
        plan.startAt || 0
      ) && data.nextPlan++;
    });
    return data;
  };
  return { lendStatistic, shoppingStatistic, taskStatistic, planStatistic };
};

export default useStatistical;
