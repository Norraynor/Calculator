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
    }
    //if(result%1 !==0){
    ChangeDisplay(parseFloat(result.toFixed(2)).toString());
    //}
    //else{
       // ChangeDisplay(result);
    //}
    firstNumber = result;
    secondNumber = 0;
    operation = 0;
}
const display = document.querySelector("#display-value");
let displayValue = "";
let operation = "";
let firstNumber = "";
let secondNumber = "";
let afterOperator = false;

function AssignNumber(value){
    if(!firstNumber){
        firstNumber = ConvertToNumber(value);
    }
    else{
        secondNumber = ConvertToNumber(value);
    }
}
function ConvertToNumber(value){
    if(value.includes(".")){
        return parseFloat(value);
    }
    else{
        return parseInt(value);
    }
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
        if(element.id !== "equal" && element.id !== "clear" && element.id !== "del"){
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
            else{
                //check what kind of operator it is and give it to Operate function with the first number
                switch(element.id){
                    case "add":
                        operation = element.id;
                        AssignNumber(displayValue);
                        afterOperator = true;
                        break;
                    case "sub":
                        operation = element.id;
                        AssignNumber(displayValue);
                        afterOperator = true;
                        break;
                    case "mult":
                        operation = element.id;
                        AssignNumber(displayValue);
                        afterOperator = true;
                        break;
                    case "div":
                        operation = element.id;
                        AssignNumber(displayValue);
                        afterOperator = true;
                        break;
                }
            }
        }
        else{
            //do stuff for equal clear etc.
            if(element.id === "equal"){
                AssignNumber(displayValue);
                Operate(operation,firstNumber,secondNumber);
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