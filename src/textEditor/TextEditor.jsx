import { useState, useRef, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
import "./TextEditor.css";
import { scroller } from "react-scroll";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import LoadingButton from "@mui/lab/LoadingButton";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Tooltip from "@mui/material/Tooltip";
import NextPlanOutlinedIcon from "@mui/icons-material/NextPlanOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import AddBlocks from "../components/addBlocks/AddBlocks";
import { codeBlocks } from "../data/CodeBlocks";

import { flowChartStringGenerator } from "../flowchart-generator/flowchartGenerator";

require("codemirror/mode/clike/clike");

const TextEditor = (props) => {
  const textEditorRef = useRef(null);

  const [FCstatus, setFCstatus] = useState(false);
  const [currentLine, setcurrentLine] = useState(0);
  const [nextLineLoading, setnextLineLoading] = useState(false);
  const [debuggerLoading, setdebuggerLoading] = useState(false);
  const [startDebug, setstartDebug] = useState(false);
  const [code, setCode] = useState({
    id: "",
    name: "",
    body: "",
    description: "",
  });

  const [nameMissing, setnameMissing] = useState(false);
  const [debugInfo, setdebugInfo] = useState([]);
  const [input, setInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const [fileName, setfileName] = useState("");
  const [instance, setinstance] = useState(null);

  useEffect(() => {
    if (props.code !== undefined) {
      setfileName(props.code.name);
      setCode((prev) => {
        return {
          ...prev,
          id: props.code.id,
          name: props.code.name,
          description: props.code.desc,
          body: props.code.body,
        };
      });
    }
  }, [props.code]);

  const sliceIt = (data) => {
    let myArray = data.split("\n");
    let last = myArray.pop();
    console.log('l->', last)
    let k = "(gdb) "
    if (last.localeCompare(k) == 0){
      setdebugInfo(myArray);
    }
  };
  //run the code
  const RunTheCode = async () => {
    console.log(code);
    axios
      .post("http://localhost:5000/run", {
        code: code.body,
        input: input,
      })
      .then((res) => {
        const data = res.data;
        props.setOutput(data.output);
      })
      .catch((err) => {
        props.setOutput(err.message);
      });
  };
  const DebugTheCode = async () => {
    console.log(code);
    let breakpoint = 8;
    setdebuggerLoading(true);
    axios
      .post("http://localhost:5000/debug", {
        code: code.body,
        // line number
        breakpoint: breakpoint,
      })
      .then((res) => {
        const data = res.data.output;
        console.log(data);
        // props.setOutput(data);
        console.log(data)
        sliceIt(data);
        setdebuggerLoading(false);
        setcurrentLine(0);
        setstartDebug(true);
      })
      .catch((err) => {
        props.setOutput(err.message);
        setdebuggerLoading(false);
      });
  };
  const StopTheDebugging = async () => {
    console.log(code);
    setstartDebug(false);
    axios
      .get("http://localhost:5000/end", {})
      .then((res) => {
        const data = res.data;
        setcurrentLine(0);
        // props.setOutput(data.output);
      })
      .catch((err) => {
        props.setOutput(err.message);
      });
  };

  const PauseTheDebugging = async () => {
    console.log("Debugging paused");
    // axios
    //   .post("http://localhost:5000/run/", {
    //     code: code.body,
    //     input: input,
    //   })
    //   .then((res) => {
    //     const data = res.data;

    //     props.setOutput(data.output);
    //   })
    //   .catch((err) => {
    //     props.setOutput(err.message);
    //   });
  };

  const StepTheNextLine = async () => {
    setnextLineLoading(true);
    console.log(code);
    axios
      .get("http://localhost:5000/next", {})
      .then((res) => {
        const data = res.data;
        console.log(data.infoLocals);
        // props.setOutput(data.infoLocals);
        sliceIt(data.infoLocals);
        setnextLineLoading(false);
        setcurrentLine(currentLine + 1);
      })
      .catch((err) => {
        props.setOutput(err.message);
        setnextLineLoading(false);
      });
  };

  const ResumeTheDebugging = async () => {
    console.log(code);
    axios
      .get("http://localhost:5000/next", {})
      .then((res) => {
        const data = res.data;
        console.log(data.infoLocals);
        // props.setOutput(data.infoLocals);
        sliceIt(data.infoLocals);
        setcurrentLine(currentLine + 1);
      })
      .catch((err) => {
        props.setOutput(err.message);
      });
  };

  const autoIndent = () => {
    textEditorRef.current.editor.execCommand("selectAll");
    textEditorRef.current.editor.execCommand("indentAuto");
  };

  //receives an array of code block
  const addBlock = (block) => {
    let cursorPos = textEditorRef.current.editor.getCursor();
    //insert the block
    textEditorRef.current.editor.replaceRange(block, cursorPos);
    textEditorRef.current.editor.focus();
    autoIndent();
  };
  const generateFlowChart = (e) => {
    if (FCstatus) {
      scroller.scrollTo("generate_flowchart_btn", {
        duration: 200,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
    setFCstatus(!FCstatus);
    props.setshowFC(FCstatus);
    e.preventDefault();
    if (code) props.setFlowChartString(flowChartStringGenerator(code.body));
  };

  const saveCode = async (e) => {
    e.preventDefault();
    if (fileName === "") {
      setnameMissing(true);
      return;
    }
    try {
      const url = "http://localhost:5000/api/code/save";
      const data = {
        codeId: code.id,
        codeName: fileName,
        codeBody: code.body,
        codeDesc: code.description,
        token: localStorage.getItem("token"),
      };
      setLoading(true);
      axios
        .post(url, {
          data: data,
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <CodeMirror
        editorDidMount={(editor) => {
          setinstance(editor);
        }}
        ref={textEditorRef}
        value={code.body}
        options={{
          mode: "text/x-c++src",
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode({ ...code, body: value });
        }}
      />
      <div className="text_editor_toolbar mx-1">
        <div className="left_toolbar">
          {editorToolbar(RunTheCode, startDebug)}
          <Tooltip title="Start Debugging" className="dbgbtn">
            <IconButton
              onClick={() => {
                DebugTheCode();
              }}
            >
              {debuggerLoading ? (
                <i
                  className="fa-1x fas fa-cog fa-spin"
                  style={{ color: "#c78624" }}
                ></i>
              ) : (
                <ArrowDropDownCircleIcon />
              )}
            </IconButton>
          </Tooltip>
          <textarea
            placeholder="Enter input here..."
            className="code_input form-control"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <div className="mx-2 mt-2">
            <div className="d-flex flex-row">
              <input
                className={
                  nameMissing
                    ? "code_input_name1 form-control is-invalid"
                    : "code_input_name1 form-control"
                }
                type="text"
                placeholder="Filename"
                onChange={(e) => {
                  setnameMissing(false);
                  setfileName(e.target.value);
                }}
                value={fileName}
              />
              <span class="input-group-text code_input_name0">.cpp</span>
            </div>

            <input
              className="code_input_name2 form-control"
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setCode({ ...code, description: e.target.value });
              }}
              value={code.description}
            ></input>
          </div>
        </div>

        <div className="generate_flowchart_btn d-flex flex-row">
          <div className="dropup">
            <button
              title="Helping syntaxes"
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-bs-expanded="false"
              style={{ backgroundColor: "#d16620", color: "#FFF" }}
            >
              Helping code
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item btns1" href="#">
                  Decison Making &raquo;
                </a>
                <ul className="dropdown-menu dropdown-submenu">
                  <li>
                    <button className="dropdown-item">
                      <AddBlocks
                        addBlock={addBlock}
                        block={codeBlocks.ifBlock}
                        name="if"
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <AddBlocks
                        addBlock={addBlock}
                        block={codeBlocks.ifElseBlock}
                        name="if else"
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <AddBlocks
                        addBlock={addBlock}
                        block={codeBlocks.elseIfBlock}
                        name="else if"
                      />
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <a className="dropdown-item btns1" href="#">
                  Loop &raquo;
                </a>
                <ul className="dropdown-menu dropdown-submenu">
                  <li>
                    <button className="dropdown-item">
                      <AddBlocks
                        addBlock={addBlock}
                        block={codeBlocks.forLoop}
                        name="for"
                      />
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item">
                      <AddBlocks
                        addBlock={addBlock}
                        block={codeBlocks.whileLoop}
                        name="while"
                      />
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <GenerateFlowchartButton
            title="Generate Flowchart"
            onClick={generateFlowChart}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Flowchart
          </GenerateFlowchartButton>
          {Loading ? (
            <SaveCodeButton
              title="Save code"
              onClick={saveCode}
              variant="contained"
            >
              <i class="fa-2x fas fa-spinner fa-spin"></i>
            </SaveCodeButton>
          ) : (
            <SaveCodeButton
              onClick={saveCode}
              variant="contained"
              endIcon={<SendIcon />}
            >
              {" "}
              Save{" "}
            </SaveCodeButton>
          )}
        </div>
      </div>
      {startDebug && (
        <div className="text-center mt-3" style={{ marginRight: "150px" }}>
          {StepNextLineButton(StepTheNextLine, nextLineLoading)}
          {PauseDebuggingButton(PauseTheDebugging)}
          {ResumeDebuggingButton(ResumeTheDebugging)}
          {StopDebuggingButton(StopTheDebugging)}
          <br />
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#c7c7c7",
              border: "2px solid",
              borderRadius: "5px",
              padding: "10px",
              borderBlockColor: "#000",
            }}
            className="d-inline-flex"
          >
            <p className="mr-3">Current Line </p>
            <i className="fa fa-arrow-right mt-1" aria-hidden="true"></i>
            <p className="ms-3 font-weight-bold">{instance.getLine(currentLine)}</p>
          </div>
          <div className="mt-3 d-flex justify-content-center">
            {symbolTable(debugInfo)}
          </div>
        </div>
      )}
    </div>
  );
};

// Following function changes the style of the convert to flowchart button.

const GenerateFlowchartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d16620"),
  backgroundColor: "#d16620",
  width: "130px",
  marginLeft: "10px",
  fontWeight: "bold",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: "#c15e1d",
  },
}));

const SaveCodeButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d16620"),
  backgroundColor: "#d16620",

  width: "130px",
  fontWeight: "bold",
  marginLeft: "10px",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: "#c15e1d",
  },
}));

const editorToolbar = (handleSubmit, startDebug) => {
  return (
    <Tooltip title="Compile & Run" className="runbtn">
      {startDebug ? (
        <IconButton
          disabled={true}
          onClick={() => {
            handleSubmit();
          }}
        >
          <PlayCircleFilledIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            handleSubmit();
          }}
        >
          <PlayCircleFilledIcon />
        </IconButton>
      )}
    </Tooltip>
  );
};

const symbolTable = (arr) => {
  console.log(typeof arr);
  return (
    <table
      style={{ width: "250px" }}
      className="table table-hover table-active"
    >
      <thead>
        <tr>
          <th scope="col">Variable</th>
          <th scope="col">Value </th>
        </tr>
      </thead>
      <tbody className="table-light ">
        {arr.map((a) => {
          let row = a.split(" ");
          return (
            <tr>
              <td>{row[0]}</td>
              <td>{row[2]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const StopDebuggingButton = (handleSubmit) => {
  return (
    <Tooltip title="Stop Debugging" className="stpdbgbtn">
      <IconButton
        onClick={() => {
          handleSubmit();
        }}
      >
        <StopCircleOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};
const StepNextLineButton = (handleSubmit, nextLineLoading) => {
  return (
    <Tooltip title="Step Next Line" className="nxtlnbtn">
      <IconButton
        onClick={() => {
          handleSubmit();
        }}
      >
        {nextLineLoading ? (
          <i style={{ color: "#528609" }} className="fas fa-circle-notch fa-spin"></i>
        ) : (
          <NextPlanOutlinedIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
const PauseDebuggingButton = (handleSubmit) => {
  return (
    <Tooltip title="Pause Debugging" className="psdbgbtn">
      <IconButton
        onClick={() => {
          handleSubmit();
        }}
      >
        <PauseCircleOutlineIcon />
      </IconButton>
    </Tooltip>
  );
};
const ResumeDebuggingButton = (handleSubmit) => {
  return (
    <Tooltip title="Pause Debugging" className="psdbgbtn">
      <IconButton
        onClick={() => {
          handleSubmit();
        }}
      >
        <AutorenewIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TextEditor;
