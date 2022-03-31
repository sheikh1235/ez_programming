import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Homepage from "./components/homepage/Homepage";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Switch>
        {<Route exact path="/" component={Homepage} />}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
}

export default App;
