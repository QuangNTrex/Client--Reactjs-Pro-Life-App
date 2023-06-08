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

function App() {
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
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
