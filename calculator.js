//Store the HTML elements.
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const btnSign = document.querySelectorAll("btnSign");
const clearButton = document.getElementById ("clear");
const equalButton = document.getElementById("equal");

//variables to hold the current input, previous input
let currentInput = ""; //Current value being tipe by the user.
let previousInput = ""; // Last value before operator
let operator = ""; // +, -, *, /.
let result = null; //The result of the calculation.

//function to update the display based on current input and the result.
function updateDisplay(){

    // If there is a current type display it.
    if(currentInput !== ""){
        display.innerText = currentInput; //Display div inner the text that the user is writing.
    }
    //If the result is not null display it 
    else if ( result !== null){
        display.innerText = result; // Display div inner the result of the calculation.
    }
    else{ // If the lasts conditions do not apply the display div going to inner 0.
        display.innerText = "0";
    }
}

// Function to handle buttons clickes.numbers and operators.
function handleClick(event){
    //Get the value of the clicked button.
    const value = event.target.innerText;

    //Check if the button that the user clicked is a number or a point.
    if(!isNaN(value) || value === '.'){
        currentInput += value; // Appent the number to the current input.
    }
    else if(value === '.' && !currentInput.includes('.')){
        currentInput += value
    }
    // Check if the button clicked is one of the operators.
    else if (['+','-','*','/'].includes(value)){ //Include is check if the value is present in the array of the operators.
        if (currentInput === ""){ // Prevent adding a operator without a number.
            return; // if this happen return .
        }
        //If there is already a previous input calculate the result.
        else if ( previousInput !== ""){
            calculate(); // go to the calculate function and run it. 
        }

        operator = value; //set the operator like +.
        previousInput = currentInput; // save the current input as a previous input
        currentInput = ""; //reset the current input to the next number.
        updateDisplay
    }

    updateDisplay(); // update the display.
}

//function to make the calculation
function calculate(){
    //convert the previous input into a number and store it in the prev constant.
    const prev = parseFloat(previousInput); // this is first part of the operation
    //Convert the current input to a number
    const current = parseFloat(currentInput); // this if the second part of the operation.

    if ( isNaN(prev) || isNaN(current))return; //Check if either value is not a number with the NaN function, and return if so.
    
    //Perform the calculation base on the operator
    if(operator === '+'){
        result = prev + current; // If the button have a plus sign sum the prev + current and store the result into the result element.
    }
    else if (operator === '-'){
        result = prev - current; // If the button is a - rest the current to the prev.
    }
    else if (operator === '*'){
        result = prev * current; // if the button have a * multiplay the prev for the current. 
    }
    else if ( operator === '/'){
        if(current === 0 || prev === 0){
            result = "Error"; // if the user divide somenting by 0 the calculator goint to say error.
        }
        else{
        result = prev / current; // if the number is not 0 divided the prev by the current.
        }
    }

    currentInput = result.toString(); //Convert the result back to a string
    previousInput = ""; // Reset the previous input.
    operator= ""; //Reset the operator/
    updateDisplay(); // Update the display with the result.
}

//This function handles when the equal button is cliked.
function handleEqualClick(){
    //If there is input perform the calculator
    if(currentInput !== "" && previousInput !== ""){
        calculate(); //Perform calculation when equal button is clicked.
    }
}

//This function clear the calculator.
function clearCalculator(){
    //Reset all variables to their initial values.
    currentInput = "";
    previousInput = "";
    operator = "";
    result = null;
    updateDisplay(); //Update the display to show 0.
}

//Add event listener to the equal button.
equalButton.addEventListener("click", handleEqualClick);
//Add event listener to the clear button.
clearButton.addEventListener("click", clearCalculator);

//Add event listeners to all the calculator bottons
for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", handleClick);//Add click event to each button.

}

