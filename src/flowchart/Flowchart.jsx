import Myflowchart from "react-simple-flowchart";

const Flowchart = (props) => {
  const opt = {
    x: 250,
    y: 10,
    "line-width": 3,
    "line-length": 50,
    "text-margin": 10,
    "font-size": 14,
    "font-color": "black",
    "line-color": "black",
    "element-color": "black",
    fill: "white",
    "yes-text": "yes",
    "no-text": "no",
    "arrow-end": "block",
    scale: 1,
    symbols: {
      start: {
        "font-color": "red",
        "element-color": "green",
        "font-weight": "bold",
      },
      end: {
        "font-color": "red",
        "element-color": "green",
        "font-weight": "bold",
      },
    },
    flowstate: {
      department1: { fill: "pink" },
      department2: { fill: "yellow" },
      external: { fill: "green" },
    },
  };

  return (
    <div className="flowchart-container">
      {props.flowChartString && (
        <Myflowchart chartCode={props.flowChartString} options={opt} />
      )}
    </div>
  );
};

export default Flowchart;
