import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    axios
        .get(`http://localhost:5000/users`, {
        })
        .then((res) => {
          console.log(res)
          setUsers(res.data)
        })
        .catch((err) => {
        });
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
      <div  style={{backgroundColor: "#3bb19b"}}>
      <Nav/>
      </div>
      <div className="product-list">
        <input
          type=""
          className="search-product-box"
          placeholder="Search User"
          onChange={searchHandle}
        />{" "}
        <ul className="font-weight-bold">
          <li> First Name </li> <li> Last Name </li> <li style = {{width : "200px"}}> Email </li>{" "}<li> Operation </li>{" "}
        </ul>{" "}
        {users.length > 0 ? (
          users.map((item, index) => (
            <ul key={item._id}>
              <li> {item.firstName} </li> <li> {item.lastName} </li>{" "}
              <li style = {{width : "200px"}}> {item.email} </li>{" "}
              <li>
                <button onClick={() => deleteUser(item._id)}> Delete </button>{" "}
                <Link style={{color: "#000"}} to={"/admin/user/" + item._id}> Update </Link>{" "}
              </li>{" "}
            </ul>
          ))
        ) : (
          <h1> No Result Found </h1>
          )}{" "}
      </div>
      <Footer/>
    </div>
  );
};

export default UsersList;
