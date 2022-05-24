import "./Homepage.css";
import { useHistory,Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import TextEditor from "../../textEditor/TextEditor";
import Terminal from "../../terminal/Terminal";
import Header from "../header/Header";
import Flowchart from "../../flowchart/Flowchart";
import AnimatedPointer from "../animatedPointer/AnimatedPointer";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../Navbar/Navbar";


const Homepage = (props) => {
  const [output, setOutput] = useState("");
  const [flowChartString, setFlowChartString] = useState("");
  const [authenticated, setAuthenticated] = useState(true);
  const [Code, setCode] = useState({
    id: "",
    name: "",
    body: "",
  });
  let history = useHistory();
  const CodeId = props.match.params.CodeId;

  const raw =
    '#include<iostream>\n\nusing namespace std;\n\nint main()\n{\n  cout<<"Hello World";\n}';
  useEffect(() => {
    if (CodeId === undefined) {
      history.push(`/homepage/${uuidv4()}`);
      window.location.reload();
    } else {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:5000/api/code/get${CodeId}`, {
          params: {
            token: token,
          },
        })
        .then((res) => {
          console.log(res);
          setAuthenticated(true);
          setCode({
            ...Code,
            id: res.data.id,
            name: res.data.name,
            body: res.data.body,
          });
        })
        .catch((err) => {
          if (err.response && err.response.status === 405) {
            setAuthenticated(true);
            setCode({ ...Code, id: CodeId, name: "Untitled", body: raw });
          } else {
            // history.push('/login')
            setAuthenticated(true);
            setCode({ ...Code, id: CodeId, name: "Untitled", body: raw });
          }
        });
    }
  }, []);

  return authenticated ? (
    <div className="App">
      {/* <Header /> */}
      <div className="main_container">
          <Navbar/>
      </div>
      <div className="">
        <TextEditor
          setOutput={setOutput}
          setFlowChartString={setFlowChartString}
          code={Code}
        />
      </div>
        <Flowchart flowChartString={flowChartString} />
      <Terminal output={output} setOutput={setOutput} />
    </div>
  ) : (
    <h1>Not authenticated</h1>
  );
};

export default Homepage;
