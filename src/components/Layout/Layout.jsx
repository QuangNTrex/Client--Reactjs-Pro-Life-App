import Content from "./Content";
import Header from "./Header";
import "./Layout.css";
import NaviBar from "./NaviBar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  return (
    <div className="Layout">
      <Header />
      <NaviBar />
      <Content>{props.children}</Content>
      <Sidebar />
    </div>
  );
};

export default Layout;
