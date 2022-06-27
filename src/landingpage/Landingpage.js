import { fontStyle } from "@mui/system";
import logo from "../title_logo-removebg-preview.png";
import "./Landingpage.css";
import { Link, useNavigate } from "react-router-dom";

const Landingpage = () => {
  return (
    <div className="bglnd text-center">
      <p
        style={{
          color: "#024648",
          fontFamily: "Serif",
          fontSize: "255px",
          marginBottom: "0",
          textShadow: "14px 16px 13px rgb(4 62 27)"
        }}
      >
        EZ
      </p>
      <br />
      <p
        style={{
          color: "#024648",
          fontFamily: "Serif",
          fontSize: "41px",
          marginBottom: "20px",
          
        }}
      >
        PROGRAMMING
      </p>

      <ast >
      <div className="span1 mt-2">
          <Link to="/editor"></Link>
        </div>
        <br />
        <div className="span2 mt-2">
          <Link to="/savedcodes"></Link>
        </div>
      </ast>
    </div>
  );
};
export default Landingpage;
