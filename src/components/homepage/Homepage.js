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
import { v4 as uuidv4 } from 'uuid';

const Homepage = (props) => {
  const [output, setOutput] = useState("");
  const [flowChartString, setFlowChartString] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
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
      history.push(`/${uuidv4()}`);
    }
    else{
      const token = localStorage.getItem("token")
      axios
      .get(`http://localhost:5000/api/code/get${CodeId}`, {
        params: {
          token: token
        }
      })
      .then((res) => {
        console.log(res);
        setAuthenticated(true)
        setCode({ ...Code, id: res.data.id ,name: res.data.name, body: res.data.body });

      })
      .catch((err) => {
        if( err.response && err.response.status === 405){
          setAuthenticated(true)
          setCode({ ...Code, id: CodeId ,name: 'Untitled', body: raw });
        } 
        else{
          // history.push('/login')
          setAuthenticated(true)
          setCode({ ...Code, id: CodeId ,name: 'Untitled', body: raw });
        }
      });
    }
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    authenticated ? (<div className="App">
    {/* <Header /> */}
    <div className="main_container">
      <nav className="navbar">
        <div className="navbarrr">
        <h1>EZ Programming</h1>
        <h3>My Codes</h3>
        </div>
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
  </div>) : (
    <h1>
      Not authenticated                                
    </h1>
  )
  );
};

export default Homepage;
