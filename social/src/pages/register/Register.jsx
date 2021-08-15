import axios from "axios";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if(password.current.value  !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    }else{
      const user = {
        username : username.current.value,
        email : email.current.value,
        password: password.current.value
      }
      try{
        await axios.post("/auth/register" , user);
        history.push("/login")
      }catch(err){

      }
    }
  }



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world <br />around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" className="loginInput" ref={username} minLength="4" maxLength="10" required />
            <input placeholder="Email" className="loginInput" ref={email} type="email" required />
            <input placeholder="Password" className="loginInput" ref={password} type="password" required />
            <input placeholder="Password Again" className="loginInput" ref={passwordAgain} type="password" required />
            <button className="loginButton" type="submit" >Sign Up</button>
            <Link to="/login" style={{ textDecoration: 'none'  }}>
              <button className="loginRegisterButton">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
