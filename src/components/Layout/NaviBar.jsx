import { NavLink, useLocation } from "react-router-dom";
import "./NaviBar.css";

const uppercaseFirst = (title) => {
  return title.charAt(0).toUpperCase() + title.slice(1);
};

const NaviBar = () => {
  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const arrPath = pathName.split("/");
  let path = "";

  if (pathName === "") return <div></div>;
  return (
    <div className="NaviBar">
      <NavLink className="link noselect" to="/">
        Home
      </NavLink>
      {arrPath.map((e) => {
        path += "/" + e;
        return (
          <div className="wrapper" key={Math.random().toString()}>
            <i className="bi bi-chevron-left noselect"></i>
            <NavLink className="link noselect" to={path}>
              {uppercaseFirst(e)}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default NaviBar;
