import { useState, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
import "./TextEditor.css";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import AddBlocks from "../components/addBlocks/AddBlocks";
import { flowChartStringGenerator } from "../flowchart-generator/flowchartGenerator";

require("codemirror/mode/clike/clike");

const TextEditor = (props) => {
  const textEditorRef = useRef(null);
  const initialValue =
    '#include<iostream>\n\nusing namespace std;\n\nint main()\n{\n  cout<<"Hello World";\n}';

  const [code, setCode] = useState(initialValue);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    console.log(code);
    axios
      .post("http://localhost:5000/run/", {
        code: code,
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

  //receives an array of code block
  const addIfBlock = (block) => {
    let cursorPos = textEditorRef.current.editor.getCursor();
    const afterCursor = { line: cursorPos.line, ch: cursorPos.ch + 3 };
    let newLineCursor = { line: cursorPos.line, ch: cursorPos.ch };

    //insert new lines
    // block.forEach((value, index, array) => {
    //   textEditorRef.current.CommandActions.newlineAndIndent();
    //   newLineCursor = { ...newLineCursor, line: newLineCursor.line + 1 };
    // });

    //insert the block
    block.forEach((value, index, array) => {
      textEditorRef.current.editor.replaceRange(value, cursorPos);
      cursorPos = { ...cursorPos, line: cursorPos.line + 1 };
    });

    textEditorRef.current.editor.focus();
    textEditorRef.current.editor.setCursor(afterCursor);
    console.log(afterCursor);
  };
  const generateFlowChart = (e) => {
    e.preventDefault();
    if (code) props.setFlowChartString(flowChartStringGenerator(code));
  };

  return (
    <div>
      <CodeMirror
        ref={textEditorRef}
        value={code}
        options={{
          mode: "text/x-c++src",
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <div className="text_editor_toolbar">
        <div className="left_toolbar">
          {editorToolbar(handleSubmit)}
          <textarea
            placeholder="Enter input here..."
            className="code_input"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
        </div>
        <div className="generate_flowchart_btn">
          <GenerateFlowchartButton
            onClick={generateFlowChart}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Flowchart
          </GenerateFlowchartButton>
        </div>
      </div>

      <AddBlocks addIfBlock={addIfBlock} />
    </div>
  );
};

// Following function changes the style of the convert to flowchart button.

const GenerateFlowchartButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#d16620"),
  backgroundColor: "#d16620",
  fontWeight: "bold",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: "#c15e1d",
  },
}));

const editorToolbar = (handleSubmit) => {
  return (
    <Tooltip title="Compile & Run">
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
