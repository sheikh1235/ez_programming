import "./App.css";
import { useState } from "react";
import TextEditor from "./textEditor/TextEditor";
import Terminal from "./terminal/Terminal";
import Header from "./components/header/Header";
import Flowchart from "./flowchart/Flowchart";

const App = () => {
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

export default App;
