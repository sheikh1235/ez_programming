import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <img
        alt="logo"
        className="logo"
        src="https://png.pngtree.com/png-vector/20191125/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_2035379.jpg"
      />{" "}
      {
        <ul className="nav-ul">
          <li>
            <Link to="/admin"> Users </Link>{" "}
          </li>{" "}
          <li>
            <Link to="/admin/newuser"> Add Users </Link>{" "}
          </li>{" "}
          {/*
                                              <li>
                                                <Link to="/update"> Update Users</Link>
                                          </li>*/}{" "}
        </ul>
      }{" "}
    </div>
  );
};

export default Nav;
