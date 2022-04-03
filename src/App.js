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
  return (
    <Router>
      <Switch>
        {<Route path="/:CodeId?" component={Homepage} />}
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
