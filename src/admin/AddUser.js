import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const AddUser = () => {
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
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="App">
      <Nav />
      <div className="product">
        <h1> Add User </h1>{" "}
        <input
          type="text"
          placeholder="Enter First name"
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
          placeholder="Enter Last Name"
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
          placeholder="Enter Email"
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
          placeholder="Enter Password"
          className="inputBox"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        {error && !password && (
          <span className="invalid-input"> Enter valid Password </span>
        )}
        <button onClick={addUser} className="appButton">
          Add User
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default AddUser;
