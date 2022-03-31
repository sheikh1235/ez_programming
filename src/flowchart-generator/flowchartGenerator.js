const removeMultipleComments = (code) => {
  let commentFlag = false;
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";

  for (let i = 0; i < code.length; i++) {
    // Check for string
    // Check for multiple line comments
    if (commentFlag === true) {
      if (code[i] === "*") {
        if (i + 1 < code.length && code[i + 1] === "/") {
          commentFlag = false;
          i++;
        }
      }
    } else if (stringDoubleFlag === true) {
      if (code[i] === '"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    } else if (stringSingleFlag === true) {
      if (code[i] === "'") {
        stringSingleFlag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === "/") {
        if (i + 1 < code.length && code[i + 1] === "*") {
          commentFlag = true;
          i++;
        } else {
          temp += code[i];
        }
      } else if (code[i] === '"') {
        stringDoubleFlag = true;
        temp += code[i];
      } else if (code[i] === "'") {
        stringSingleFlag = true;
        temp += code[i];
      } else {
        temp += code[i];
      }
    }
  }

  return temp;
};

const removeSingleComments = (code) => {
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";

  for (let i = 0; i < code.length; i++) {
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    } else if (stringSingleFlag === true) {
      if (code[i] === "'") {
        stringSingleFlag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === '"') {
        stringDoubleFlag = true;
        temp += code[i];
      } else if (code[i] === "'") {
        stringSingleFlag = true;
        temp += code[i];
      } else {
        if (code[i] === "/") {
          if (i + 1 < code.length && code[i + 1] === "/") {
            while (code[i] !== "\n") i++;
            temp += code[i];
          }
        } else temp += code[i];
      }
    }
  }

  return temp;
};

const newLineParser = (code) => {
  let tempArray = [];
  let flag = false;

  let temp = "";

  for (let i = 0; i < code.length; i++) {
    if (flag === true) {
      if (code[i] === '"') {
        flag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === '"') {
        flag = true;
        temp += code[i];
      } else {
        if (code[i] !== "\n") {
          temp += code[i];
        } else {
          temp = removeDuplicateSpaces(temp);
          temp = removeSpacesAtStart(temp);
          temp = removeTabs(temp);
          if (temp !== "undefined" && temp !== "") {
            tempArray.push(temp);
            temp = "";
          } else {
            temp = "";
          }
        }
      }
    }
  }

  temp = removeDuplicateSpaces(temp);
  temp = removeSpacesAtStart(temp);
  temp = removeTabs(temp);
  if (temp !== "undefined") tempArray.push(temp);

  return tempArray;
};

const removeSpacesAtStart = (code) => {
  code.trimStart();
  let temp = "";
  if (code[0] !== " ") {
    temp += code[0];
  }

  for (let i = 1; i < code.length; i++) {
    temp += code[i];
  }
  return temp;
};

const removeSpacesAtEnd = (code) => {
  let temp = "";
  let count = 0;
  for (let i = code.length - 1; i >= 0; i--) {
    if (code[i] !== " ") {
      break;
    }
    count++;
  }

  for (let i = 0; i < code.length - count; i++) {
    temp += code[i];
  }
  return temp;
};

const removeDuplicateSpaces = (code) => {
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";

  for (let i = 0; i < code.length; i++) {
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    } else if (stringSingleFlag === true) {
      if (code[i] === "'") {
        stringSingleFlag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === '"') {
        stringDoubleFlag = true;
        temp += code[i];
      } else if (code[i] === "'") {
        stringSingleFlag = true;
        temp += code[i];
      } else {
        if (code[i] !== " ") {
          temp += code[i];
        } else {
          if (code[i] === " " && i + 1 < code.length && code[i + 1] === " ") {
            i++;
          } else {
            temp += code[i];
          }
        }
      }
    }
  }

  return temp;
};

const removeTabs = (code) => {
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";

  for (let i = 0; i < code.length; i++) {
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    } else if (stringSingleFlag === true) {
      if (code[i] === "'") {
        stringSingleFlag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === '"') {
        stringDoubleFlag = true;
        temp += code[i];
      } else if (code[i] === "'") {
        stringSingleFlag = true;
        temp += code[i];
      } else {
        if (code[i] !== "\t") {
          temp += code[i];
        }
      }
    }
  }

  return temp;
};

const convertStandardForm = (code) => {
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";
  let tempArray = [];

  for (let i = 0; i < code.length; i++) {
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    } else if (stringSingleFlag === true) {
      if (code[i] === "'") {
        stringSingleFlag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === '"') {
        stringDoubleFlag = true;
        temp += code[i];
      } else if (code[i] === "'") {
        stringSingleFlag = true;
        temp += code[i];
      } else {
        if (code[i] !== ";" && code[i] !== "{" && code[i] !== "}") {
          temp += code[i];
        } else {
          if (code[i] === ";") {
            temp += code[i];

            temp = removeDuplicateSpaces(temp);
            temp = removeSpacesAtStart(temp);
            temp = removeTabs(temp);
            if (temp !== "undefined" && temp !== "") {
              tempArray.push(temp);
              temp = "";
            } else {
              temp = "";
            }
          } else if (code[i] === "{") {
            if (temp.length > 0) {
              temp = removeDuplicateSpaces(temp);
              temp = removeSpacesAtStart(temp);
              temp = removeTabs(temp);
              if (temp !== "undefined" && temp !== "") {
                tempArray.push(temp);
                temp = "";
              } else {
                temp = "";
              }
            }
            temp = "{";
            tempArray.push(temp);
            temp = "";
          } else if (code[i] === "}") {
            if (temp.length > 0) {
              temp = removeDuplicateSpaces(temp);
              temp = removeSpacesAtStart(temp);
              temp = removeTabs(temp);
              if (temp !== "undefined" && temp !== "") {
                tempArray.push(temp);
                temp = "";
              } else {
                temp = "";
              }
            }
            temp = "}";
            tempArray.push(temp);
            temp = "";
          }
        }
      }
    }
  }

  temp = removeDuplicateSpaces(temp);
  temp = removeSpacesAtStart(temp);
  temp = removeTabs(temp);
  if (temp !== "undefined" && temp !== "") {
    tempArray.push(temp);
  }

  return tempArray;
};

const convertStandardFormforConditions = (code) => {
  code = removeSpacesAtEnd(code);

  let tempArray = [];
  if (
    (checkCondition(code) === 1 ||
      checkElse(code) === 1 ||
      checkForLoop(code) === 1 ||
      checkDoWhileLoop(code) === 1 ||
      checkWhileLoop(code) === 1) &&
    code[code.length - 1] !== ")"
  ) {
    let stringDoubleFlag = false;
    let stringSingleFlag = false;
    let temp = "";
    let stack = [];

    for (let i = 0; i < code.length; i++) {
      // Check for string
      if (stringDoubleFlag === true) {
        if (code[i] === '"') {
          stringDoubleFlag = false;
        }
        temp += code[i];
      } else if (stringSingleFlag === true) {
        if (code[i] === "'") {
          stringSingleFlag = false;
        }
        temp += code[i];
      } else {
        if (code[i] === '"') {
          stringDoubleFlag = true;
          temp += code[i];
        } else if (code[i] === "'") {
          stringSingleFlag = true;
          temp += code[i];
        } else {
          if (code[i] !== "(" && code[i] !== ")") {
            temp += code[i];
          } else {
            if (code[i] === "(") {
              stack.push("(");
              temp += code[i];
            } else if (code[i] === ")") {
              stack.pop();
              temp += code[i];
              if (stack.length === 0) {
                temp = removeDuplicateSpaces(temp);
                temp = removeSpacesAtStart(temp);
                temp = removeTabs(temp);
                if (temp !== "undefined" && temp !== "") {
                  tempArray.push(temp);
                  temp = "";
                } else {
                  temp = "";
                }
              }
            }
          }
        }
      }
    }

    temp = removeDuplicateSpaces(temp);
    temp = removeSpacesAtStart(temp);
    temp = removeTabs(temp);
    if (temp !== "undefined" && temp !== "") {
      tempArray.push(temp);
    }
  } else {
    tempArray.push(code);
  }
  return tempArray;
};

const checkInputOutput = (code) => {
  if (
    code.substring(0, 3) === "cin" ||
    code.substring(0, 7) === "getline" ||
    code.substring(0, 8) === "std::cin" ||
    code.substring(0, 8) === "std :: cin" ||
    code.substring(0, 4) === "cout" ||
    code.substring(0, 9) === "std::cout" ||
    code.substring(0, 8) === "std :: cout"
  ) {
    return 1;
  }
  return 0;
};

const checkCondition = (code) => {
  if (code.substring(0, 2) === "if" || code.substring(0, 7) === "else if") {
    return 1;
  }
  return 0;
};

const checkIf = (code) => {
  if (code.substring(0, 2) === "if") {
    return 1;
  }
  return 0;
};

const checkElseIf = (code) => {
  if (code.substring(0, 7) === "else if") {
    return 1;
  }
  return 0;
};

const checkElse = (code) => {
  if (code.substring(0, 4) === "else") {
    return 1;
  }
  return 0;
};

const checkForLoop = (code) => {
  if (code.substring(0, 3) === "for") {
    return 1;
  }
  return 0;
};

const checkWhileLoop = (code) => {
  if (code.substring(0, 5) === "while") {
    return 1;
  }
  return 0;
};

const checkDoWhileLoop = (code) => {
  if (code.substring(0, 2) === "do") {
    return 1;
  }
  return 0;
};

class Code {
  constructor() {
    this.index = 0;
    this.arrayOfCode = [];
  }

  setIndex(index) {
    this.index = index;
  }

  setArrayOfCode(arrayOfCode) {
    this.arrayOfCode = arrayOfCode;
  }

  incrementIndex() {
    this.index++;
  }

  getIndex() {
    return this.index;
  }

  getCodeLine(index) {
    return this.arrayOfCode[index];
  }

  getArrayOfCode() {
    return this.arrayOfCode;
  }
}

//this is our node class....................
class Node {
  constructor() {
    this.lineOfCode = "";
    this.type = 0;
    this.endPoints = [];
  }

  setLineOfCode(mainString) {
    this.lineOfCode = mainString;
  }

  getLineOfCode() {
    return this.lineOfCode;
  }

  setType(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setEndPoints(endPoints) {
    this.endPoints = [...endPoints];
  }

  setEndPoint(endPoint) {
    this.endPoints.push(endPoint);
  }

  setSpecificEndPoint(index, endPoint) {
    this.endPoints[index] = endPoint;
  }

  getEndPoints() {
    return this.endPoints;
  }
}

class Function {
  constructor() {
    this.name = "";
    this.arrayOfNode = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  addNode(Node) {
    this.arrayOfNode.push(Node);
  }

  getArrayOfNode() {
    return this.arrayOfNode;
  }
}

const checkEndWithColon = (code) => {
  for (let i = code.length; i >= 0; i--) {
    if (code[i] === ";") {
      return 1;
    } else if (code[i] === ";") {
      continue;
    } else return 0;
  }
  return 0;
};

const ifStatement = (myCode, func) => {
  let node = new Node();
  node.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
  node.setType(3);
  node.setEndPoint(func.getArrayOfNode().length + 1);
  // Case 1: If doesn't have any statement
  if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] === ";") {
    node.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
    if (typeof node !== "undefined") {
      func.addNode(node);
    }
    myCode.incrementIndex();
  }
  // Case 2: Where If has some code in its block
  else if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] !== ";") {
    let lastNode;
    if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] === "{") {
      if (typeof node !== "undefined") {
        func.addNode(node);
      }
      myCode.incrementIndex();

      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }

      let arrayOfNode = func.getArrayOfNode();
      node.setSpecificEndPoint(1, arrayOfNode.length);
      lastNode = arrayOfNode[arrayOfNode.length - 1];
      myCode.incrementIndex();
      console.log(lastNode);
      console.log(myCode.getIndex());
      console.log(myCode.getArrayOfCode());
    } else {
      if (typeof node !== "undefined") {
        func.addNode(node);
      }
      node.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
      myCode.incrementIndex();
      lastNode = new Node();
      lastNode.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
      if (checkInputOutput(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
        lastNode.setType(2);
      } else if (
        myCode.getArrayOfCode()[myCode.getIndex()] &&
        myCode.getArrayOfCode()[myCode.getIndex()].length > 1
      ) {
        lastNode.setType(1);
      } else if (
        checkCondition(myCode.getArrayOfCode()[myCode.getIndex()]) === 3
      ) {
        lastNode.setType(3);
        lastNode.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
      }
      func.addNode(lastNode);
    }

    if (checkElseIf(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
      elseIfStatement(myCode, func);
    } else if (checkElse(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
      elseStatement(myCode, func);
    }
    console.log(func.getArrayOfNode().length);
    console.log(func.getArrayOfNode());
    lastNode.setSpecificEndPoint(0, func.getArrayOfNode().length);
  }
};

const elseIfStatement = (myCode, func) => {
  let node = new Node();
  node.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
  node.setType(3);
  node.setEndPoint(func.getArrayOfNode().length + 1);
  // Case 1: If doesn't have any statement
  if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] === ";") {
    node.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
    if (typeof node !== "undefined") {
      func.addNode(node);
    }
    myCode.incrementIndex();
  }
  // Case 2: Where If has some code in its block
  else if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] !== ";") {
    let lastNode;
    if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] === "{") {
      if (typeof node !== "undefined") {
        func.addNode(node);
      }
      myCode.incrementIndex();

      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }

      let arrayOfNode = func.getArrayOfNode();
      node.setSpecificEndPoint(1, arrayOfNode.length);
      lastNode = arrayOfNode[arrayOfNode.length - 1];
      myCode.incrementIndex();
      console.log(lastNode);
      console.log(myCode.getIndex());
      console.log(myCode.getArrayOfCode());
    } else {
      if (typeof node !== "undefined") {
        func.addNode(node);
      }
      node.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
      myCode.incrementIndex();
      lastNode = new Node();
      lastNode.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
      if (checkInputOutput(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
        lastNode.setType(2);
      } else if (
        myCode.getArrayOfCode()[myCode.getIndex()] &&
        myCode.getArrayOfCode()[myCode.getIndex()].length > 1
      ) {
        lastNode.setType(1);
      } else if (
        checkCondition(myCode.getArrayOfCode()[myCode.getIndex()]) === 3
      ) {
        lastNode.setType(3);
        lastNode.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
      }
      func.addNode(lastNode);
    }

    if (checkElseIf(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
      elseIfStatement(myCode, func);
    } else if (checkElse(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
      elseStatement(myCode, func);
    }
    console.log(func.getArrayOfNode().length);
    console.log(func.getArrayOfNode());
    lastNode.setSpecificEndPoint(0, func.getArrayOfNode().length);
  }
};

const elseStatement = (myCode, func) => {
  let node = new Node();
  node.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
  node.setType(3);
  node.setEndPoint(func.getArrayOfNode().length + 1);
  // Case 1: If doesn't have any statement
  if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] === ";") {
    node.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
    if (typeof node !== "undefined") {
      func.addNode(node);
    }
    myCode.incrementIndex();
  }
  // Case 2: Where If has some code in its block
  else if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] !== ";") {
    let lastNode;
    if (myCode.getArrayOfCode()[myCode.getIndex() + 1][0] === "{") {
      if (typeof node !== "undefined") {
        func.addNode(node);
      }
      myCode.incrementIndex();
      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }
      let arrayOfNode = func.getArrayOfNode();
      node.setSpecificEndPoint(1, arrayOfNode.length);
      lastNode = arrayOfNode[arrayOfNode.length - 1];
      console.log(lastNode);
    } else {
      if (typeof node !== "undefined") {
        func.addNode(node);
      }
      myCode.incrementIndex();
      lastNode = new Node();
      lastNode.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
      if (checkInputOutput(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
        lastNode.setType(2);
      } else if (
        myCode.getArrayOfCode()[myCode.getIndex()] &&
        myCode.getArrayOfCode()[myCode.getIndex()].length > 1
      ) {
        lastNode.setType(1);
      } else if (checkIf(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
        lastNode.setType(3);
        lastNode.setSpecificEndPoint(1, func.getArrayOfNode().length + 1);
      }
      func.addNode(lastNode);
      myCode.incrementIndex();
    }
    myCode.incrementIndex();

    if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
      if (checkElseIf(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
        elseIfStatement(myCode, func);
        lastNode.setSpecificEndPoint(0, func.getArrayOfNode().length);
      } else if (checkElse(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
        elseStatement(myCode, func);
        lastNode.setSpecificEndPoint(0, func.getArrayOfNode().length);
      } else {
        console.log(func.getArrayOfNode());
        console.log(func.getArrayOfNode().length);
        lastNode.setSpecificEndPoint(0, func.getArrayOfNode().length);
      }
    }
  }
};

const statements = (myCode, func) => {
  let node;
  let arrayOfCode = myCode.getArrayOfCode();
  if (myCode.getArrayOfCode()[myCode.getIndex()].length === 1) {
    if (myCode.getArrayOfCode()[myCode.getIndex()][0] === "}") {
      return;
    } else {
      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }
    }
  } else if (checkIf(myCode.getArrayOfCode()[myCode.getIndex()]) === 1) {
    ifStatement(myCode, func);
    if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
      statements(myCode, func);
    }
  } else if (
    checkInputOutput(myCode.getArrayOfCode()[myCode.getIndex()]) === 1
  ) {
    node = new Node();
    node.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
    node.setType(2);
    node.setEndPoint(func.getArrayOfNode().length + 1);

    if (typeof node !== "undefined") {
      func.addNode(node);
      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }
    } else {
      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }
    }
  } else if (
    myCode.getArrayOfCode()[myCode.getIndex()] &&
    myCode.getArrayOfCode()[myCode.getIndex()].length > 1
  ) {
    node = new Node();
    node.setLineOfCode(myCode.getArrayOfCode()[myCode.getIndex()]);
    node.setType(1);
    node.setEndPoint(func.getArrayOfNode().length + 1);
    if (typeof node !== "undefined") {
      func.addNode(node);
      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }
    } else {
      if (myCode.getIndex() < myCode.getArrayOfCode().length - 1) {
        myCode.incrementIndex();
        statements(myCode, func);
      }
    }
  }
};

const tokenizer = (myCode, func) => {
  statements(myCode, func);
};

const makingFlowchart = (index, arrayOfNode) => {
  let codeString = "";

  if (index < arrayOfNode.length) {
    if (arrayOfNode[index].getType() === 3) {
      codeString += index + "\n";
      codeString += index + "(yes)->";
      codeString += makingFlowchart(
        arrayOfNode[index].getEndPoints()[0],
        arrayOfNode
      );
      codeString += "\n";
      codeString += index + "(no)->";
      codeString += makingFlowchart(
        arrayOfNode[index].getEndPoints()[1],
        arrayOfNode
      );
      codeString += "\n";
    } else {
      codeString += index + "->";
      codeString += makingFlowchart(
        arrayOfNode[index].getEndPoints()[0],
        arrayOfNode
      );
    }
  } else {
    codeString = "e";
  }
  return codeString;
};

export const flowChartStringGenerator = (inputCode) => {
  let code;
  code = removeMultipleComments(inputCode);

  code = removeSingleComments(code);

  let arrayOfCode = [];
  arrayOfCode = newLineParser(code);

  for (let i = 0; i < arrayOfCode.length; i++) {
    let tempArray = convertStandardForm(arrayOfCode[i]);
    console.log(tempArray);
    if (tempArray.length > 1) {
      let j = i;
      arrayOfCode.splice(j, 1);
      for (let k = 0; k < tempArray.length; k++) {
        if (tempArray[k] !== "") {
          arrayOfCode.splice(j, 0, tempArray[k]);
          j++;
        }
      }
    }
  }

  for (let i = 0; i < arrayOfCode.length; i++) {
    let tempArray = convertStandardFormforConditions(arrayOfCode[i]);
    if (tempArray.length > 1) {
      let j = i;
      arrayOfCode.splice(j, 1);
      for (let k = 0; k < tempArray.length; k++) {
        if (tempArray[k] !== "") {
          arrayOfCode.splice(j, 0, tempArray[k]);
          j++;
        }
      }
    }
  }

  console.log(code);

  // creating object of Node

  // array of Node
  let arrayOfNode = [];

  let mainFunction = new Function();

  console.log(arrayOfCode);

  for (let i = 0; i < arrayOfCode.length; i++) {
    if (
      arrayOfCode[i].includes("int main") ||
      arrayOfCode[i].includes("void main")
    ) {
      i++;

      let myCode = new Code();
      myCode.setIndex(i);
      myCode.setArrayOfCode(arrayOfCode);

      console.log("Hellp");
      console.log(myCode);

      mainFunction.setName("main");
      tokenizer(myCode, mainFunction);
      break;
    }
  }

  console.log(mainFunction.getArrayOfNode());

  arrayOfNode = mainFunction.getArrayOfNode();

  // Initializing
  let codeString = "st=>start: Begin \n";
  // 1=> processing
  // 2=> input/output
  // 3=> condition
  for (let i = 0; i < arrayOfNode.length; i++) {
    if (arrayOfNode[i].getType() === 1) {
      codeString +=
        i + "=>operation: " + arrayOfNode[i].getLineOfCode() + " \n";
    } else if (arrayOfNode[i].getType() === 2) {
      codeString +=
        i + "=>inputoutput: " + arrayOfNode[i].getLineOfCode() + " \n";
    } else if (arrayOfNode[i].getType() === 3) {
      codeString +=
        i + "=>condition: " + arrayOfNode[i].getLineOfCode() + " \n";
    }
  }
  codeString = codeString + "e=>end: End \n\n";

  codeString += "st->";

  if (arrayOfNode.length > 0) {
    codeString += makingFlowchart(0, arrayOfNode);
  } else codeString += "e";

  return codeString;
};
