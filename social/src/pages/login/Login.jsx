import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom";  

export default function Login() {

  const email = useRef();
  const password = useRef();
  const { user,  isFetching , error , dispatch} = useContext(AuthContext);


  const handleClick = (e) =>{
    e.preventDefault();
    loginCall({email: email.current.value, password: password.current.value},dispatch);
  };

console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world <br /> around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" ref={email} className="loginInput" required />
            <input placeholder="Password" type="password" ref={password} className="loginInput" minLength="6" required />
            <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white" /> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/register" >
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
