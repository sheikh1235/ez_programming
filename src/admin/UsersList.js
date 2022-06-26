import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let result = await fetch("http://localhost:5000/users", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setUsers(result);
  };

  const deleteUser = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getUsers();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setUsers(result);
      }
    } else {
      getUsers();
    }
  };

  return (
    <div className="App">
      <Nav></Nav>
      <div className="product-list">
        <h3> Users List </h3>{" "}
        <input
          type=""
          className="search-product-box"
          placeholder="Search User"
          onChange={searchHandle}
        />{" "}
        <ul>
          <li> First Name </li> <li> Last Name </li> <li> Email </li>{" "}
          {/*<li> Password </li>*/} <li> Operation </li>{" "}
        </ul>{" "}
        {users.length > 0 ? (
          users.map((item, index) => (
            <ul key={item._id}>
              <li> {item.firstName} </li> <li> {item.lastName} </li>{" "}
              <li> {item.email} </li>{" "}
              <li>
                <button onClick={() => deleteUser(item._id)}> Delete </button>{" "}
                <Link to={"/admin/user/" + item._id}> Update </Link>{" "}
              </li>{" "}
            </ul>
          ))
        ) : (
          <h1> No Result Found </h1>
        )}{" "}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UsersList;
