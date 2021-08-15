import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {AuthContext} from "./context/AuthContext"
import { useContext } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {
  const {user} = useContext(AuthContext);
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Login /> }
          </Route>
          <Route path="/profile/:username">
          {user ? <Profile /> : <Login /> }
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login />}
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
