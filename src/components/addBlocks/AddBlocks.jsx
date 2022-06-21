import { codeBlocks } from "../../data/CodeBlocks";
import Button from "@mui/material/Button";
import "./AddBlocks.css"

const AddBlocks = ({
  addIfBlock,
  addElseBlock,
  addElseIfBlock,
  addIfElseBlock,
  addForLoop,
  addWhileLoop,
  addDoWhileLoop,
}) => {
  return (
    <button
    
      onClick={() => {
        addIfBlock(codeBlocks.ifBlock);
      }}
      className= "btn btns1"
    >
      IF BLOCK
    </button>
  );
};

export default AddBlocks;
