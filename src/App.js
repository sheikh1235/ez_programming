import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Editor from "./components/editor/Homepage";
import Mycodes from "./components/Mycodes/Mycodes";
import CodeSnippets from "./components/codeSnippets/CodeSnippets";
import AddProduct from "./admin/AddUser";
import ProductList from "./admin/UsersList";
import UpdateProduct from "./admin/UpdateComponent";
import Adminsignup from "./admin/Signin";
import About from "./components/about/About";
import Landingpage from "./landingpage/Landingpage"


import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/homepage" component={Landingpage} />
        <Route path="/mycodes" component={Mycodes} />
        <Route path="/codesnippets" component={CodeSnippets} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/editor/:CodeId?" component={Editor} />
        <Route exact path="/adminlogin" component={Adminsignup} />
        <Route exact path="/admin/newuser" component={AddProduct} />
        <Route exact path="/admin" component={ProductList} />
        <Route exact path="/admin/user/:id" component={UpdateProduct} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
}

export default App;
