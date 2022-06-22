import { useState, useRef, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
import "./TextEditor.css";
import { scroller } from "react-scroll";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Tooltip from "@mui/material/Tooltip";
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

  const [code, setCode] = useState({
    id: "",
    name: "",
    body: "",
    description: "",
  });
  const [nameMissing, setnameMissing] = useState(false);
  const [input, setInput] = useState("");
  const [Loading, setLoading] = useState(false);
  const [fileName, setfileName] = useState("");

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

  //run the code
  const handleSubmit = async () => {
    console.log(code);
    axios
      .post("http://localhost:5000/run/", {
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
  }
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
          {editorToolbar(handleSubmit)}
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
              className="btn btn-info dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-bs-expanded="false"
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
              {" "}
              <strong> ... </strong>{" "}
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

const editorToolbar = (handleSubmit) => {
  return (
    <Tooltip title="Compile & Run" className="abc">
      <IconButton
        onClick={() => {
          handleSubmit();
        }}
      >
        <PlayCircleFilledIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TextEditor;
