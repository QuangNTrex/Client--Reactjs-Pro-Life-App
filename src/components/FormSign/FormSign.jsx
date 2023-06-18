import { useLocation, useNavigate } from "react-router-dom";
import "./FormSign.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTTPPOST } from "../../utils/http";
import { AuthActions } from "../../store/auth";

const FormSign = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const serverUrl = useSelector((state) => state.system.serverUrl);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");

  const header = location.pathname.split("/")[1];

  const submitHandler = (e) => {
    e.preventDefault();
    if (header === "login") {
      HTTPPOST("/auth/signin", { email, password }).then((data) => {
        console.log(data);
        if (data && data.result) {
          dispatch(
            AuthActions.login({
              email: data.result.email,
              userName: data.result.userName,
              fullName: data.result.fullName,
            })
          );
          navigate("/");
        } else setTextError("Email or password is incorrect!");
      });
    } else {
      HTTPPOST("/auth/signup", { email, password, fullName, userName }).then(
        (data) => {
          if (data.result) navigate("/login");
          else setTextError("Input is invalid!");
        }
      );
    }
  };
  return (
    <div className="FormSign">
      <form className="form" onSubmit={submitHandler}>
        <div className="header">
          <h3>{header}</h3>
        </div>
        {textError && <p className="text-error">{textError}</p>}
        {header === "signup" && (
          <input
            type="text"
            className="full-name"
            placeholder="Full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <input
          type="text"
          className="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {header === "signup" && (
          <input
            type="text"
            className="user-name"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        )}
        <input
          className="password"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button">
          <button className="btn-submit-form">{header}</button>
        </div>
      </form>
    </div>
  );
};

export default FormSign;
