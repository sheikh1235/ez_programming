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
import Mycodes from "./components/Mycodes/Mycodes";
import CodeSnippets from "./components/codeSnippets/CodeSnippets";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/mycodes" component={Mycodes} />
        <Route path="/codesnippets" component={CodeSnippets} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/homepage/:CodeId?" component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
