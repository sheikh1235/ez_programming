import "./Homepage.css";
import styles from "./Homepage.css";
import { useState } from "react";
import TextEditor from "../../textEditor/TextEditor";
import Terminal from "../../terminal/Terminal";
import Header from "../header/Header";
import Flowchart from "../../flowchart/Flowchart";

const Homepage = () => {
  const [output, setOutput] = useState("");
  const [flowChartString, setFlowChartString] = useState("");

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="App">
      {/* <Header /> */}
      <div className="main_container">
        <nav className="navbar">
          <h1>EZ Programming</h1>
          <button className="white_btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
      <div className="text-editor-and-flowchart">
        <TextEditor
          setOutput={setOutput}
          setFlowChartString={setFlowChartString}
        />
        <Flowchart flowChartString={flowChartString} />
      </div>
      <Terminal output={output} setOutput={setOutput} />
    </div>
  );
};

export default Homepage;
