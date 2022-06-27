import "./About.css";

import Navbar from "../Navbar/Navbar";
import { padding } from "@mui/system";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{marginLeft: "170px"}}>
        <h2 style={{ backgroundColor: "#263238",
         marginRight: "50px", padding: "10px",
          color: "#f0f0f0", borderColor: "263238", fontFamily: "Cursive"}}
         className = "d-inline-flex border border-dark">
          EZ Programming
        </h2>
        <p style={{marginLeft: "50px"}}>
            We are providing a platform that aims to make the programming easy for you
        </p>
      </div>
    </div>
  );
};

export default About;
