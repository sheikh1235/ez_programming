import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useParams, useHistory } from "react-router-dom";

const UpdateProduct = () => {
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const params = useParams();
  //const navigate = useNavigate();
  const history = useHistory();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setfirstName(result.firstName);
    setlastName(result.lastName);
    setemail(result.email);
    setpassword(result.password);
  };

  const updateProduct = async () => {
    console.warn(firstName, lastName, email, password);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    if (result) {
      //navigate("/");
      history.push("/admin");
    }
  };

  return (
    <div className="App">
      <Nav></Nav>
      <div className="product">
        <h1> Update Users </h1>{" "}
        <label for="abc1">
          <h3> First Name </h3>{" "}
        </label>{" "}
        <input
          id="abc1"
          type="text"
          placeholder="Enter First name"
          className="inputBox"
          value={firstName}
          onChange={(e) => {
            setfirstName(e.target.value);
          }}
        />{" "}
        <label for="abc2">
          <h3> Last Name </h3>{" "}
        </label>{" "}
        <input
          type="text"
          id="abc2"
          placeholder="Enter Last Name"
          className="inputBox"
          value={lastName}
          onChange={(e) => {
            setlastName(e.target.value);
          }}
        />{" "}
        <label for="abc3">
          <h3> Email </h3>{" "}
        </label>{" "}
        <input
          type="text"
          id="abc3"
          placeholder="Enter Email"
          className="inputBox"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />{" "}
        <button onClick={updateProduct} className="appButton">
          Update User{" "}
        </button>{" "}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UpdateProduct;
