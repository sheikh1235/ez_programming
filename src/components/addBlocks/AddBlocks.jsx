import { codeBlocks } from "../../data/CodeBlocks";
import Button from "@mui/material/Button";

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
    <Button
      onClick={() => {
        addIfBlock(codeBlocks.ifBlock);
      }}
    >
      Add if block
    </Button>
  );
};

export default AddBlocks;
