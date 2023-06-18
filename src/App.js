import "./App.css";
import Layout from "./components/Layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Shopping from "./components/Shopping/Shopping";
import Bill from "./components/Shopping/Bill";
import Lend from "./components/Lend/Lend";
import LendDetail from "./components/Lend/LendDetail";
import Tasks from "./components/Tasks/Tasks";
import Plans from "./components/Plans/Plans";
import TaskItem from "./components/Tasks/TaskItem";
import PlanItem from "./components/Plans/PlanItem";
import Statistical from "./components/Statistical/Statistical";
import Dev from "./components/Dev/Dev";
import FormSign from "./components/FormSign/FormSign";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HTTP, HTTPPOST } from "./utils/http";
import { SystemActions } from "./store/system";
import { AuthActions } from "./store/auth";

Date.prototype.toLocaleString = function () {
  let formatString = "#HH#:#MM# #DD#/#MM#/#YYYY#";
  if (this.toString() === "Invalid Date") return "Not Date";
  if (this.toString() === "Thu Jan 01 1970 07:00:00 GMT+0700 (Giờ Đông Dương)")
    return "Not Date";
  var YYYY,
    YY,
    MMMM,
    MMM,
    MM,
    M,
    DDDD,
    DDD,
    DD,
    D,
    hhhh,
    hhh,
    hh,
    h,
    mm,
    m,
    ss,
    s,
    ampm,
    AMPM,
    dMod,
    th;
  YY = ((YYYY = this.getFullYear()) + "").slice(-2);
  MM = (M = this.getMonth() + 1) < 10 ? "0" + M : M;
  MMM = (MMMM = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][M - 1]).substring(0, 3);
  DD = (D = this.getDate()) < 10 ? "0" + D : D;
  DDD = (DDDD = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][this.getDay()]).substring(0, 3);
  th =
    D >= 10 && D <= 20
      ? "th"
      : (dMod = D % 10) == 1
      ? "st"
      : dMod == 2
      ? "nd"
      : dMod == 3
      ? "rd"
      : "th";
  formatString = formatString
    .replace("#YYYY#", YYYY)
    .replace("#YY#", YY)
    .replace("#MMMM#", MMMM)
    .replace("#MMM#", MMM)
    .replace("#MM#", MM)
    .replace("#M#", M)
    .replace("#DDDD#", DDDD)
    .replace("#DDD#", DDD)
    .replace("#DD#", DD)
    .replace("#D#", D)
    .replace("#th#", th);
  h = hhh = this.getHours();
  if (h == 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? "0" + h : h;
  hhhh = hhh < 10 ? "0" + hhh : hhh;
  AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
  mm = (m = this.getMinutes()) < 10 ? "0" + m : m;
  ss = (s = this.getSeconds()) < 10 ? "0" + s : s;
  return formatString
    .replace("#hhhh#", hhhh)
    .replace("#hhh#", hhh)
    .replace("#hh#", hh)
    .replace("#h#", h)
    .replace("#mm#", mm)
    .replace("#m#", m)
    .replace("#ss#", ss)
    .replace("#s#", s)
    .replace("#ampm#", ampm)
    .replace("#AMPM#", AMPM);
};
Date.prototype.customFormat = function () {
  let formatString = "#HH#:#MM# #DD#/#MM#/#YYYY#";
  if (this.toString() === "Invalid Date") return "Not Date";
  if (this.toString() === "Thu Jan 01 1970 07:00:00 GMT+0700 (Giờ Đông Dương)")
    return "Not Date";
  var YYYY,
    YY,
    MMMM,
    MMM,
    MM,
    M,
    DDDD,
    DDD,
    DD,
    D,
    hhhh,
    hhh,
    hh,
    h,
    mm,
    m,
    ss,
    s,
    ampm,
    AMPM,
    dMod,
    th;
  YY = ((YYYY = this.getFullYear()) + "").slice(-2);
  MM = (M = this.getMonth() + 1) < 10 ? "0" + M : M;
  MMM = (MMMM = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][M - 1]).substring(0, 3);
  DD = (D = this.getDate()) < 10 ? "0" + D : D;
  DDD = (DDDD = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][this.getDay()]).substring(0, 3);
  th =
    D >= 10 && D <= 20
      ? "th"
      : (dMod = D % 10) == 1
      ? "st"
      : dMod == 2
      ? "nd"
      : dMod == 3
      ? "rd"
      : "th";
  formatString = formatString
    .replace("#YYYY#", YYYY)
    .replace("#YY#", YY)
    .replace("#MMMM#", MMMM)
    .replace("#MMM#", MMM)
    .replace("#MM#", MM)
    .replace("#M#", M)
    .replace("#DDDD#", DDDD)
    .replace("#DDD#", DDD)
    .replace("#DD#", DD)
    .replace("#D#", D)
    .replace("#th#", th);
  h = hhh = this.getHours();
  if (h == 0) h = 24;
  if (h > 12) h -= 12;
  hh = h < 10 ? "0" + h : h;
  hhhh = hhh < 10 ? "0" + hhh : hhh;
  AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
  mm = (m = this.getMinutes()) < 10 ? "0" + m : m;
  ss = (s = this.getSeconds()) < 10 ? "0" + s : s;
  return formatString
    .replace("#hhhh#", hhhh)
    .replace("#hhh#", hhh)
    .replace("#hh#", hh)
    .replace("#h#", h)
    .replace("#mm#", mm)
    .replace("#m#", m)
    .replace("#ss#", ss)
    .replace("#s#", s)
    .replace("#ampm#", ampm)
    .replace("#AMPM#", AMPM);
};
function App() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { tasks, plans, bills, lends } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  // check test
  useEffect(() => {
    HTTP("/test").then((data) => {
      dispatch(SystemActions.setStateServer({ stateServer: true }));
    });
    HTTPPOST("/auth/signin").then((data) => {
      if (data && data.result) {
        dispatch(AuthActions.login({ ...data.result }));
      }
    });

    HTTPPOST("/data/updates", { data: tasks, type: "task" });
    HTTPPOST("/data/updates", { data: plans, type: "plan" });
    HTTPPOST("/data/updates", { data: bills, type: "bill" });
    HTTPPOST("/data/updates", { data: lends, type: "lend" });
  }, [isLogin]);
  return (
    <div className="App light">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shopping/:id" element={<Bill />} />
          <Route path="/lend" element={<Lend />} />
          <Route path="/lend/:id" element={<LendDetail />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<TaskItem />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:id" element={<PlanItem />} />
          <Route path="/statistical" element={<Statistical />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/developer" element={<Dev />} />

          {!isLogin && <Route path="/login" element={<FormSign />} />}
          {!isLogin && <Route path="/signup" element={<FormSign />} />}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
