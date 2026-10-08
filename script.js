const equalButton = document.querySelector(".equal-button")
const decimalButton = document.querySelector(".decimal-button")
const percentageButton = document.querySelector(".percentage")
const deleteButton = document.querySelector(".delete-button")
const clearButton = document.querySelector(".clear-button")
const upperDisplay = document.querySelector(".operation")
const mainDisplay = document.querySelector(".result")
const numbers = document.querySelectorAll(".number-btn")
const operators = document.querySelectorAll(".operator-btn")

let firstNumber, operator
let justCalculated = false
let currentNumber = ''
const op = ['÷','x','–','+']
///very important concept better than making a separate eventlistener for each number, doing it for all the number once is a better way by declaring an identical class for all the number buttons than using querySelectorAll than looping by foreach on each number and displaying on the display the button textContent which is the number on the button 

numbers.forEach(btn=>{btn.addEventListener('click',()=>{
    if(mainDisplay.value === ''){
        currentNumber = btn.textContent
        mainDisplay.value = currentNumber
        console.log(currentNumber)
    }

    else if(!justCalculated){
        currentNumber += btn.textContent
        mainDisplay.value += btn.textContent
    }

    else {
        currentNumber += btn.textContent
        mainDisplay.value = currentNumber
        if(justCalculated === true){
            justCalculated = false
        }
        if(upperDisplay.value !== ''){
            upperDisplay.value = ''
        }
    }
    

})})



function add(a,b){
    return Number(a) + Number(b)
}

function subtract(a,b){
    return Number(a) - Number(b)
}

function multiply(a,b){
    return Number(a) * Number(b)
}

function divide(a,b){
    if(b==='0'){
        return "Undefined"
    }
    else return Number(a)/Number(b)
}

function operate(operator,a,b){
    if(operator === "+"){
        const result = add(a,b)
        return result
    }
    else if(operator === "–"){
        const result = subtract(a,b)
        return result
    }
    else if(operator === "x"){
        const result = multiply(a,b)
        return result
    }
    else if(operator === '÷'){
        const result = divide(a,b)
        if(result === "Undefined"){
            return result
        }
        else if(result !== undefined && result%1 !== 0){
            return Math.round(result*100000000)/100000000
        }

        else return result
    }

}