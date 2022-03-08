import "./Homepage.css";
import { useState } from "react";
import TextEditor from "../../textEditor/TextEditor";
import Terminal from "../../terminal/Terminal";
import Header from "../header/Header";
import Flowchart from "../../flowchart/Flowchart";

const Homepage = () => {
  const [output, setOutput] = useState("");
  const [flowChartString, setFlowChartString] = useState("");
  return (
    <div className="App">
      <Header />
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
