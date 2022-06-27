import React from "react";
import logo from "../title_logo-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  return (
    <div className="flex-column">
      <div className="text-center text-white" style={{fontSize: "25px"}}>
        Admin Panel
      </div>
      {
        <ul className="nav-ul" style={{backgroundColor: "#3bb19b"}}>
          <li >
            <Link to="/admin"> <u>Users</u> </Link>{" "}
          </li>{" "}
          <li>
            <Link to="/admin/newuser"> <u>Add Users</u> </Link>{" "}
          </li>{" "}
        </ul>
      }{" "}
    </div>
  );
};

export default Nav;
