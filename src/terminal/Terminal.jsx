import { useEffect, useRef } from "react";
import { XTerm } from "xterm-for-react";

const Terminal = ({ output, setOutput }) => {
  const xtermRef = useRef(null);

  const continueTxt = "\n\n..... Press Enter to continue.";
  useEffect(() => {
    output !== "" && xtermRef.current.terminal.focus();

    output !== "" && xtermRef.current.terminal.writeln(output + continueTxt);
  }, [output]);

  return (
    <div>
      <XTerm
        ref={xtermRef}
        options={{ cols: 148, convertEol: true, cursorBlink: true, rows: 12 }}
        onData={(data) => {
          if (data === "\r") {
            xtermRef.current.terminal.clear();
            xtermRef.current.terminal.blur();
            setOutput("");
          }
        }}
      />
    </div>
  );
};

export default Terminal;
