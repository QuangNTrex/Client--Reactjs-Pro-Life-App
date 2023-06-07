import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <div className="Header__container">
        <div className="sidebar-icon">
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
        <div className="abc">abc</div>
      </div>
    </div>
  );
};

export default Header;
