import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AuthActions } from "../../store/auth";
import { setHours } from "date-fns";

const Header = () => {
  const dispatch = useDispatch();
  const [isShowMoreUser, setIsShowMoreUser] = useState(false);
  const navigate = useNavigate();
  const { isLogin, fullName, email } = useSelector((state) => state.auth);
  const stateServer = useSelector((state) => state.system.stateServer);
  return (
    <div className="Header">
      <div className="Header__container">
        <div
          className="sidebar-icon"
          onClick={() => {
            const data = {
              bill: JSON.parse(localStorage.getItem("bills")) || [],
              lend: JSON.parse(localStorage.getItem("lends")) || [],
              task: JSON.parse(localStorage.getItem("tasks")) || [],
              plan: JSON.parse(localStorage.getItem("plans")) || [],
            };
            console.log(JSON.stringify(data));
            navigator.clipboard.writeText(JSON.stringify(data));
          }}
        >
          <i className="bi bi-list"></i>
        </div>
        <div className="logo">
          <h3
            className="noselect"
            onClick={() => {
              navigate("/");
            }}
          >
            ProLife
          </h3>
        </div>
        <div
          className="user noselect"
          onClick={(event) => {
            event.stopPropagation();
            setIsShowMoreUser((prev) => !prev);
          }}
        >
          <i className="bi bi-person-circle"></i>
        </div>
        {isShowMoreUser && (
          <div className="more" onClick={() => setIsShowMoreUser(false)}>
            {isLogin && (
              <div className="info">
                <div className="wrap-left">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="wrap-right">
                  <p className="full-name">{fullName}</p>
                  <p className="email">{email}</p>
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="login">
                <NavLink className="link" to="/login">
                  Login
                </NavLink>
              </div>
            )}
            {!isLogin && (
              <div className="signup">
                <NavLink className="link" to="/signup">
                  Signup
                </NavLink>
              </div>
            )}
            {isLogin && (
              <div
                className="logout"
                onClick={() => {
                  dispatch(AuthActions.logout());
                  setIsShowMoreUser(false);
                }}
              >
                <NavLink className="link">Logout</NavLink>
              </div>
            )}
          </div>
        )}
        {stateServer && (
          <div className="check-state-server">
            <i className="bi bi-check"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
