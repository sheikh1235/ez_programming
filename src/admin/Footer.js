import React from "react";
import logo from "../title_logo-removebg-preview.png";
import { Link , useHistory} from "react-router-dom";

const Footer = () => {
  const navigate = useHistory();
  return (
    <div className="footer text-center mb-3" style={{backgroundColor: "#f0f0f0"}}>
      <img
      src = {logo}
      width= "70px"
      height = "100px"
      onClick={()=>{
        console.log("hell nonooo")
        navigate.push("/login")
      }}
      />
    </div>
  );
};

export default Footer;
