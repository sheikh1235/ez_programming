import React from "react";
import Nav from "./Nav";
import { Link , useHistory} from "react-router-dom";
import Footer from "./Footer";

const AddUser = () => {
  const navigate = useHistory();
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [error, setError] = React.useState(false);

  const addUser = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError(true);
      return false;
    }

    let result = await fetch("http://localhost:5000/add-user", {
      method: "post",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    navigate.push("/admin")
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="App">
      <div  style={{backgroundColor: "#3bb19b"}}>
      <Nav/>
      </div>
      <div className="product mt-4">
        <h1> Add User </h1>{" "}
        <input
          type="text"
          placeholder="First name"
          className="inputBox"
          value={firstName}
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
        />
        {error && !firstName && (
          <span className="invalid-input"> Enter valid First name </span>
        )}
        <input
          type="text"
          placeholder="Last Name"
          className="inputBox"
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />
        {error && !lastName && (
          <span className="invalid-input"> Enter valid Last Name </span>
        )}
        <input
          type="text"
          placeholder="Email"
          className="inputBox"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        {error && !email && (
          <span className="invalid-input"> Enter valid Email </span>
        )}
        <input
          type="text"
          placeholder="Password"
          className="inputBox"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        {error && !password && (
          <span className="invalid-input"> Enter valid Password </span>
        )}
        <button onClick={addUser} className="appButton text-white" style={{backgroundColor: "#3bb19b"}}>
          Add User
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
