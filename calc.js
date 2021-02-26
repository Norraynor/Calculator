const display = document.querySelector("#display-value");
let displayValue = "";
let operation = "";
let firstNumber = 0;
let secondNumber = "";
let afterOperator = false;

function Add(a,b){
    return a+b;
}
function Subtract(a,b){
    return a-b;
}
function Multiply(a,b){
    return a*b;
}
function Divide(a,b){
    if(b===0){
        return "LMAO";
    }
    return a/b;
}

function Operate(operator,a,b){
    let result = 0;
    switch(operator){
        case "add":
            result = Add(a,b);
            break;
        case "sub":
            result = Subtract(a,b);
            break;
        case "mult":
            result = Multiply(a,b);
            break;
        case "div":
            result = Divide(a,b);
            break;
        default:
            result = a;
    }
    //if(result%1 !==0){
    if(IsNumber(result)){
        ChangeDisplay(parseFloat(result.toFixed(2)).toString());        
    }
    else{
        ChangeDisplay(result);
    }
    //}
    //else{
       // ChangeDisplay(result);
    //}
    firstNumber = result;
    secondNumber = 0;
    operation = 0;
}

function AssignNumber(value){
    if(afterOperator || (IsNumber(firstNumber) &&firstNumber!==0)){
        secondNumber = ConvertToNumber(value);
    }else{
        firstNumber = ConvertToNumber(value);
    }
}
function InitializeOperation(){
    AssignNumber(displayValue);
    Operate(operation,firstNumber,secondNumber);
}
function ConvertToNumber(value){
    if(value.includes(".")){
        return parseFloat(value);
    }
    else{
        return parseInt(value);
    }
}
function IsNumber(value){
    if(isNaN(value)){    
        return false;
    }
    return true;
}

function ChangeDisplay(value){
    display.textContent = value;
}
function ClearDisplay(){
    ChangeDisplay("");
}

const buttons = document.querySelectorAll("button");
buttons.forEach(element => {
    element.addEventListener("click",() => {
        //check if not special buttons
        if(!element.classList.contains("additional") && element.id !== "equal"){
            //input numbers and dot only here
            if(!element.classList.contains("operator")){
                if(afterOperator){
                    displayValue = "";
                    afterOperator = false;
                }
                if(element.id === "dot" && !displayValue.includes(".")){
                    displayValue += ".";
                }
                displayValue += element.value;
                ChangeDisplay(displayValue);
            }
            //input operators only here
            else{
                //change operator when clicking operator buttons after it has already been pressed
                if(afterOperator){
                    switch(element.id){
                        case "add":
                            operation = element.id;
                            afterOperator = true;
                            break;
                        case "sub":
                            operation = element.id;
                            afterOperator = true;
                            break;
                        case "mult":
                            operation = element.id;
                            afterOperator = true;
                            break;
                        case "div":
                            operation = element.id;
                            afterOperator = true;
                            break;
                    }
                }
                else{
                    //check what kind of operator it is and give it to Operate function with the first number
                    switch(element.id){
                        case "add":
                            InitializeOperation();
                            operation = element.id;
                            afterOperator = true;
                            break;
                        case "sub":
                            InitializeOperation();
                            operation = element.id;
                            afterOperator = true;
                            break;
                        case "mult":
                            InitializeOperation();
                            operation = element.id;
                            afterOperator = true;
                            break;
                        case "div":
                            InitializeOperation();
                            operation = element.id;
                            afterOperator = true;
                            break;
                    }
                }
            }
        }
        else{
            //do stuff for equal clear etc.
            if(element.id === "equal"){
                InitializeOperation();
                afterOperator = true;
            }
            if(element.id === "clear"){
                ClearAll();
            }
        }
    })
});

function ClearAll(){
    ClearDisplay();
    firstNumber = 0;
    secondNumber = 0;
    operation = "";
    displayValue = "";
}