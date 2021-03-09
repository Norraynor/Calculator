const display = document.querySelector("#display-value");
let displayValue = "";
let operation = "";
let firstNumber = 0;
let secondNumber = "";
let afterOperator = false;
let afterResult = false;

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
    displayValue = "";
    ChangeDisplay(displayValue);
}

const buttons = document.querySelectorAll("button");
buttons.forEach(element => {
    element.addEventListener("click",() => {
        //check if not special buttons
        if(!element.classList.contains("additional") && element.id !== "equal"){
            //input numbers and dot only here
            if(!element.classList.contains("operator")){
                if(afterResult){
                    ClearAll();
                    afterOperator=false;
                    afterResult=false;
                }
                if(afterOperator){
                    ClearDisplay();
                    afterOperator = false;
                }
                if(element.id === "dot" && !displayValue.includes(".")){
                    displayValue += ".";
                }
                if(displayValue === "0"){
                    if(element.id==="number-0"){
                        return;
                    }else{
                        ClearDisplay();
                    }
                }
                displayValue += element.value;
                ChangeDisplay(displayValue);
            }
            //input operators only here
            else{
                //change operator when clicking operator buttons after it has already been pressed
                if(afterOperator){
                    if(!afterResult){
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
                    }else{
                        switch(element.id){
                            case "add":
                                operation = element.id;
                                afterOperator = true;
                                afterResult = false;
                                break;
                            case "sub":
                                operation = element.id;
                                afterOperator = true;
                                afterResult = false;
                                break;
                            case "mult":
                                operation = element.id;
                                afterOperator = true;
                                afterResult = false;
                                break;
                            case "div":
                                operation = element.id;
                                afterOperator = true;
                                afterResult = false;
                                break;
                    }

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
                afterResult = true;
            }
            if(element.id === "clear"){
                ClearAll();
            }
            if(element.id === "del"){
                DeleteOneNumber();
                ChangeDisplay(displayValue);
            }
        }
    })
});

function DeleteOneNumber(){
        displayValue = displayValue.slice(0,-1);    
}

function ClearAll(){
    ClearDisplay();
    firstNumber = 0;
    secondNumber = 0;
    operation = "";
}

///
/// need to figure this part out about keycodes
///
/*
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
  
    switch(event.code) {
      case "Digit0":
      case "ArrowDown":
          //assign 0 to display value
        break;
      
    }
  
    // Consume the event so it doesn't get handled twice
    event.preventDefault();
  });

  // Make sure this code gets executed after the DOM is loaded.
document.querySelector("#addLinks").addEventListener("keyup", event => {
    if(event.key !== "Enter") return; // Use `.key` instead.
    document.querySelector("#linkadd").click(); // Things you want to do.
    event.preventDefault(); // No need to `return false;`.
});*/

function InputButton(e) {
    const buttonArray =  Array.from(buttons);
    console.log(e.code);

    switch(e.code){
        case "Delete":
            buttonArray.find(button => button.id ==="clear").click();
            break;
        case "Backspace":
            buttonArray.find(button => button.id ==="del").click();
            break;
        case "Numpad0":
        case "Digit0":
            buttonArray.find(button => button.id ==="number-0").click();
            break;
        case "Numpad1":
        case "Digit1":
            buttonArray.find(button => button.id ==="number-1").click();
            break;
        case "Numpad2":
        case "Digit2":
            buttonArray.find(button => button.id ==="number-2").click();
            break;
        case "Numpad3":
        case "Digit3":
            buttonArray.find(button => button.id ==="number-3").click();
            break;
        case "Numpad4":
        case "Digit4":
            buttonArray.find(button => button.id ==="number-4").click();
            break;
        case "Numpad5":
        case "Digit5":
            buttonArray.find(button => button.id ==="number-5").click();
            break;
        case "Numpad6":
        case "Digit6":
            buttonArray.find(button => button.id ==="number-6").click();
            break;
        case "Numpad7":
        case "Digit7":
            buttonArray.find(button => button.id ==="number-7").click();
            break;
        case "Numpad8":
        case "Digit8":
            buttonArray.find(button => button.id ==="number-8").click();
            break;
        case "Numpad9":
        case "Digit9":
            buttonArray.find(button => button.id ==="number-9").click();
            break;
        case "NumpadAdd":
            buttonArray.find(button => button.id ==="add").click();
            break;
        case "NumpadSubtract":
            buttonArray.find(button => button.id ==="sub").click();
            break;
        case "NumpadMultiply":
            buttonArray.find(button => button.id ==="mult").click();
            break;
        case "NumpadDivide":
            buttonArray.find(button => button.id ==="div").click();
            break;
        
        case "Enter":
        case "NumpadEnter":
            buttonArray.find(button => button.id ==="equal").click();
            break;
        case "NumpadDecimal":
        case "Period":
        case "Comma":
            buttonArray.find(button => button.id ==="dot").click();
            break;
    }
  }
window.addEventListener('keydown', InputButton);