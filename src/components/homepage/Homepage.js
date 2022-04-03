import "./Homepage.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TextEditor from "../../textEditor/TextEditor";
import Terminal from "../../terminal/Terminal";
import Header from "../header/Header";
import Flowchart from "../../flowchart/Flowchart";
import AnimatedPointer from "../animatedPointer/AnimatedPointer";

const Homepage = (props) => {
  const [output, setOutput] = useState("");
  const [flowChartString, setFlowChartString] = useState("");
  const [Code, setCode] = useState({
    id:'',
    name:'',
    body:''
  });
  let history = useHistory();
  const CodeId = props.match.params.CodeId;

  const raw = '#include<iostream>\n\nusing namespace std;\n\nint main()\n{\n  cout<<"Hello World";\n}';
  useEffect(() => {
    if(CodeId === undefined)
    {
      history.push(`/${1234}`);
    }
    else{
      axios
      .get(`http://localhost:5000/api/code/get${CodeId}`, {
      })
      .then((res) => {
        console.log(res);
        setCode({ ...Code, id: CodeId ,name: res.code_name, body: res.code_body });
      })
      .catch((err) => {
        console.log(err); 
        setCode({ ...Code, id: CodeId ,name: 'Untitled', body: raw });
      });
    }
  }, []);

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
          code = {Code}
        />
        <Flowchart flowChartString={flowChartString} />
      </div>
      <Terminal output={output} setOutput={setOutput} />
    </div>
  );
};

export default Homepage;
