import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Homepage from "./components/homepage/Homepage";
import Mycodes from "./components/Mycodes/Mycodes";

import CodeSnippets from "./components/codeSnippets/CodeSnippets";

import Nav from "./admin/Nav";
import Footer from "./admin/Footer";
import AddProduct from "./admin/AddUser";
import ProductList from "./admin/UsersList";
import UpdateProduct from "./admin/UpdateComponent";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/mycodes" component={Mycodes} />
        <Route path="/codesnippets" component={CodeSnippets} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/homepage/:CodeId?" component={Homepage} />
        <Route exact path="/admin/newuser" component={AddProduct} />
        <Route exact path="/admin" component={ProductList} />
        <Route exact path="/admin/user/:id" component={UpdateProduct} />
      </Switch>
    </Router>
  );
}

export default App;
