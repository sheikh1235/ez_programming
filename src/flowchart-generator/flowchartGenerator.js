const removeMultipleComments = (code) => {
  let commentFlag = false;
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";
  
  for(let i = 0; i < code.length; i++){
    // Check for string
    // Check for multiple line comments
    if(commentFlag === true){
      if (code[i] === '*') {
        if(( (i + 1) < code.length) &&  code[i + 1] === '/'){
          commentFlag = false;
          i++;
        }
      }  
    }
    else if (stringDoubleFlag === true) {
      if (code[i] === '\"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    }
    else if (stringSingleFlag === true) {
      if (code[i] === '\'') {
        stringSingleFlag = false;
      }
      temp += code[i];
    }
    else{
      if(code[i] === '/'){
        if (((i + 1) < code.length) && code[i + 1] === '*') {
          commentFlag = true;
          i++;
        }
        else{
          temp += code[i];
        }
      }
      else if (code[i] === '\"') {
        stringDoubleFlag = true;
        temp += code[i];
      }
      else if (code[i] === '\'') {
        stringSingleFlag = true;
        temp += code[i];
      }
      else {
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
  
  for(let i = 0; i < code.length; i++){
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '\"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    }
    else if (stringSingleFlag === true) {
      if (code[i] === '\'') {
        stringSingleFlag = false;
      }
      temp += code[i];
    }
    else{
      if (code[i] === '\"') {
        stringDoubleFlag = true;
        temp += code[i];
      }
      else if (code[i] === '\'') {
        stringSingleFlag = true;
        temp += code[i];
      }
      else {
        if (code[i] === '/') {
          if(( (i + 1) < code.length) &&  code[i + 1] === '/'){
            while(code[i] !== '\n')
              i++;
          }
        }
        else 
          temp += code[i];
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
    if (flag===true) {
      if (code[i] === '\"') {
        flag = false;
      }
      temp += code[i];
    } else {
      if (code[i] === '\"') {
        flag = true;
        temp += '\"';
      } 
      else {
        if (code[i] !== "\n") {
          temp += code[i];
        }
        else{
          tempArray.push(temp)
          temp=""
        }
      }
    }
  }
  tempArray.push(temp)
  return tempArray;
};

const removeSpacesAtStart = (code) => {
  code.trimStart()
  let temp = ""
  if (code[0] !== ' ') {
    temp += code[0]
  }

  for(let i = 1; i < code.length; i++){
    temp += code[i]
  }
	return temp;
};

const removeDuplicateSpaces = (code) => {  
  let stringDoubleFlag = false;
  let stringSingleFlag = false;
  let temp = "";
  
  for(let i = 0; i < code.length; i++){
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '\"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    }
    else if (stringSingleFlag === true) {
      if (code[i] === '\'') {
        stringSingleFlag = false;
      }
      temp += code[i];
    }
    else{
      if (code[i] === '\"') {
        stringDoubleFlag = true;
        temp += code[i];
      }
      else if (code[i] === '\'') {
        stringSingleFlag = true;
        temp += code[i];
      }
      else {
        if (code[i] !== ' ') {
          temp += code[i];
        }
        else{
          if (code[i] === ' ' && (i + 1) < code.length && code[i + 1] === ' ') {
            i++
          }
          else{
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
  
  for(let i = 0; i < code.length; i++){
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '\"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    }
    else if (stringSingleFlag === true) {
      if (code[i] === '\'') {
        stringSingleFlag = false;
      }
      temp += code[i];
    }
    else{
      if (code[i] === '\"') {
        stringDoubleFlag = true;
        temp += code[i];
      }
      else if (code[i] === '\'') {
        stringSingleFlag = true;
        temp += code[i];
      }
      else {
        if (code[i] !== '\t') {
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
  let tempArray = []
  
  for(let i = 0; i < code.length; i++){
    // Check for string
    if (stringDoubleFlag === true) {
      if (code[i] === '\"') {
        stringDoubleFlag = false;
      }
      temp += code[i];
    }
    else if (stringSingleFlag === true) {
      if (code[i] === '\'') {
        stringSingleFlag = false;
      }
      temp += code[i];
    }
    else{
      if (code[i] === '\"') {
        stringDoubleFlag = true;
        temp += code[i];
      }
      else if (code[i] === '\'') {
        stringSingleFlag = true;
        temp += code[i];
      }
      else {
        if (code[i] !== ";" && code[i] !== "{" && code[i] !== "}") {
          temp += code[i];
        }
        else{
          if (code[i] === ";") {
            temp += code[i]
            tempArray.push(temp)
            temp = ""
          }
          else if (code[i] === "{") {
            if(temp.length > 0){
              tempArray.push(temp)
            }
            temp = "{"
            tempArray.push(temp)
            temp = ""
          }
          if (code[i] === "}") {
            if(temp.length > 0){
              tempArray.push(temp)
            }
            temp = "}"
            tempArray.push(temp)
            temp = ""
          }
        }
      }
    }
  }
  
  if(temp.length > 0){
    tempArray.push(temp)
  }
  
  return tempArray;
};

const checkInputOutput = (code) => {
  //const subStrings = ["cin", "getline", "std::cin"];
  if (
    code.substring(0, 3) === "cin" ||
    code.substring(0, 7) === "getline" ||
    code.substring(0, 8) === "std::cin" || 
    code.substring(0, 4) === "cout" || 
    code.substring(0, 9) === "std::cout"
  ) {
    return 1;
  }
  return 0;
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
    this.endPoints.push(endPoint)
  }

  setSpecificEndPoint(index, endPoint){
    this.endPoints[index] = endPoint
  }

  getEndPoints() {
    return this.endPoints;
  }
}

const tokenizer = (code, index, previoesIndex) =>{
  let node = new Node();
  if(code.length === 1){

  }
  else if (checkInputOutput(code) === 1) {
    node.setLineOfCode(code);
    node.setType(2);
    node.setEndPoint(index + 1);
  }
  else if(code && code.length > 1) {
    node.setLineOfCode(code);
    node.setType(1);
    node.setEndPoint(index + 1);
  }
  return node;
}

const makingFlowchart = (index, arrayOfNode) => {
  let codeString = "";
  
  if (index < arrayOfNode.length) {
    if (arrayOfNode[index].getType() === 3) {
      codeString += index + "\n";
      codeString += index + "(yes)->";
      codeString += makingFlowchart(arrayOfNode[index].getEndPoints()[0], arrayOfNode);
      codeString += "\n";
      codeString += index + "(no)->";
      codeString += makingFlowchart(arrayOfNode[index].getEndPoints()[1], arrayOfNode);
      codeString += "\n";
    } else {
      codeString += index + "->";
      codeString += makingFlowchart(arrayOfNode[index].getEndPoints()[0], arrayOfNode);
    }
  }
  else{
    codeString = "e";
  }
  return codeString;
}

export const flowChartStringGenerator  =(inputCode) => {
  let  code = removeMultipleComments(inputCode);
       code = removeSingleComments(code);

  let  arrayOfCode = newLineParser(code)

  for(let i = 0; i < arrayOfCode.length; i++){
    arrayOfCode[i] = removeSpacesAtStart(arrayOfCode[i]);
    arrayOfCode[i] = removeDuplicateSpaces(arrayOfCode[i]);
    arrayOfCode[i] = removeTabs(arrayOfCode[i]);

    let tempArray = convertStandardForm(arrayOfCode[i]);
    if (tempArray.length > 1) {
      let j = i;
      arrayOfCode.splice(j);
      for(let k = 0; k < tempArray.length; k++){
        arrayOfCode.splice(j,0,tempArray[k]);
        j++;
      }      
    }
  }

  for(let i = 0; i < arrayOfCode.length; i++){
    arrayOfCode[i] = removeSpacesAtStart(arrayOfCode[i]);
    arrayOfCode[i] = removeDuplicateSpaces(arrayOfCode[i]);
    arrayOfCode[i] = removeTabs(arrayOfCode[i]);
  }


  //creating object of Node
  let node;

  //array of Node
  let arrayOfNode = [];

  for(let i = 0; i < arrayOfCode.length; i++){

    if(arrayOfCode[i].includes('int main') || arrayOfCode[i].includes('int main')){
      i++;
      let j = 0;
      while(i < arrayOfCode.length){
        if(arrayOfCode[i].length > 0){
          node = tokenizer(arrayOfCode[i], j, 0)
          if(node.getLineOfCode().length > 0){
            arrayOfNode.push(tokenizer(arrayOfCode[i], j, 0));
            j++;
          }
          i++;
        }
      }
    }
  }

  console.log(arrayOfNode);
  console.log(arrayOfNode.length);


  // Initializing
  let codeString = "st=>start: Begin \n";
  // 1=> processing
  // 2=> input/output
  // 3=> condition
  for (let i = 0; i < arrayOfNode.length; i++) {
    if (arrayOfNode[i].getType() === 1) {
      codeString += i + "=>operation: " + arrayOfNode[i].getLineOfCode() + " \n";
    } else if (arrayOfNode[i].getType() === 2) {
      codeString +=
        i + "=>inputoutput: " + arrayOfNode[i].getLineOfCode() + " \n";
    } else if (arrayOfNode[i].getType() === 3) {
      codeString += i + "=>condition: " + arrayOfNode[i].getLineOfCode() + " \n";
    }
  }
  codeString = codeString + "e=>end: End \n\n";

  codeString += "st->";

  if(arrayOfNode.length > 0){
    codeString += makingFlowchart(0, arrayOfNode);
  }else
    codeString+="e"
  
  return codeString
}

// export const flowChartStringGenerator = (code) => {
//   let flowchartString = `st=>start: Start:>http://www.google.com[blank]
//   e=>end:>http://www.google.com
//   op1=>operation: My Operation
//   sub1=>subroutine: My Subroutine
//   cond=>condition: Yes
//   or No?:>http://www.google.com
//   io=>inputoutput: catch something...
//   para=>parallel: parallel tasks
  
//   st->op1->cond
//   cond(yes)->io->e
//   cond(no)->para
//   para(path1, bottom)->sub1(right)->op1
//   para(path2, top)->op1`;
//   return flowchartString;
// };
