import DashBoard from "./DashBoard/DashBoard";
import GroupClassify from "./GroupClassify";
import "./Home.css";

const Home = () => {
  const typesFinance = [
    { title: "Statistical", icon: "bi-journal-text", path: "/statistical" },
    { title: "Shopping", icon: "bi-cart4", path: "/shopping" },
    { title: "Lend", icon: "bi-calendar-minus", path: "/lend" },
    { title: "Borrow", icon: "bi-calendar-plus", path: "/borrow" },
  ];
  const typesTasks = [
    { title: "Tasks", icon: "bi-list-task", path: "/tasks" },
    { title: "Plans", icon: "bi-clipboard-plus", path: "/plans" },
  ];
  return (
    <div className="Home">
      <div className="Home__classify">
        <DashBoard />
        <GroupClassify list={typesFinance} header="Finance" />
        <GroupClassify list={typesTasks} header="Tasks" />
      </div>
    </div>
  );
};

export default Home;
