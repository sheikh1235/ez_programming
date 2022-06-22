import "./AddBlocks.css"
import Button from "@mui/material/Button";

const AddBlocks = ({ block, name, addBlock }) => {
  return (
    <Button
      onClick={() => {
        addBlock(block);
      }}
      className="btn btns1"
    >
      {name}
    </Button>
  );
};

export default AddBlocks;