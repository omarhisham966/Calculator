const equalButton = document.querySelector(".equal-button")
const decimalButton = document.querySelector(".decimal-button")
const percentageButton = document.querySelector(".percentage")
const deleteButton = document.querySelector(".delete-button")
const clearButton = document.querySelector(".clear-button")
const upperDisplay = document.querySelector(".operation")
const mainDisplay = document.querySelector(".result")
const numbers = document.querySelectorAll(".number-btn")
const operators = document.querySelectorAll(".operator-btn")
const changeSignButton = document.querySelector('.change-sign-button')

let firstNumber, operator
let justCalculated = false
let currentNumber = ''
let oper = ''
let lastOperator
let lastOperand
let lastWasPercentage = false
///very important concept better than making a separate eventlistener for each number, doing it for all the number once is a better way by declaring an identical class for all the number buttons than using querySelectorAll than looping by foreach on each number and displaying on the display the button textContent which is the number on the button 

numbers.forEach(btn=>{btn.addEventListener('click',()=>{

    if(lastWasPercentage && !justCalculated){
        return
    }

    lastOperand = ''
    lastOperator = ''
    
    if(currentNumber === '' && firstNumber === undefined){
        currentNumber = btn.textContent
        mainDisplay.value = currentNumber
    }

    else if(!justCalculated){
        if(firstNumber === 'Undefined'){
            currentNumber = btn.textContent
            firstNumber = undefined
            operator = undefined
            mainDisplay.value = currentNumber
        }
        else{
            if(!currentNumber.includes('.') && currentNumber === '0' && btn.textContent === '0'){
                return
            }

            else if(!currentNumber.includes('.') && currentNumber === '0' && btn.textContent !== '0'){
                if(firstNumber === undefined){
                    currentNumber = btn.textContent
                    mainDisplay.value = currentNumber
                }
                else{
                    currentNumber = btn.textContent
                    mainDisplay.value = firstNumber + operator + currentNumber
                }
            }

            else{
                currentNumber += btn.textContent
                mainDisplay.value += btn.textContent
            }
            
        }
    }

    else {
        if(firstNumber === 'Undefined'){
            firstNumber = undefined
            currentNumber = btn.textContent
            mainDisplay.value = currentNumber
            upperDisplay.value = ''
            justCalculated = false
            operator = undefined 
            
        }
        else{
            firstNumber = undefined
            currentNumber += btn.textContent
            mainDisplay.value = currentNumber
            if(justCalculated === true){
                justCalculated = false
            }
            if(upperDisplay.value !== ''){
                upperDisplay.value = ''
            }
            lastWasPercentage = false
    }
}
    

})})


operators.forEach(btn=>{btn.addEventListener('click',()=>{ 

    if(lastWasPercentage && !justCalculated){
        return
    }

    lastOperand = ''
    lastOperator = ''

    let clickedOperator
    if(btn.textContent === '–'){
        clickedOperator = '-'
    }
    else clickedOperator = btn.textContent

    if(firstNumber === 'Undefined'){
        mainDisplay.value = 'Undefined'
        operator = undefined
        return
    }
    else{

        if(justCalculated){
            operator = clickedOperator
            justCalculated = false
            mainDisplay.value = firstNumber + operator 
            upperDisplay.value = ''
            lastWasPercentage = false
        }

        else if (currentNumber === '' && firstNumber === undefined){
            if(clickedOperator === '-'){
                currentNumber = clickedOperator
                mainDisplay.value = currentNumber
            }
            else{
                firstNumber = '0'
                operator = clickedOperator
                mainDisplay.value = firstNumber + operator
            }
        }

        else if(currentNumber === '-'){
            mainDisplay.value = '0'
            currentNumber = ''
        }

        else if(currentNumber !== '' && firstNumber === undefined){
            firstNumber = currentNumber
            operator = clickedOperator
            currentNumber = ''
            mainDisplay.value = firstNumber + operator
        }

        else if(firstNumber !== undefined && currentNumber === ''){
            operator = clickedOperator
            justCalculated = false
            mainDisplay.value = firstNumber + operator
        }
        
        else if(firstNumber !== undefined && currentNumber !== ''){
            firstNumber = operate(operator ,firstNumber ,currentNumber).toString()
            currentNumber = ''
            if(firstNumber === "Undefined"){
                mainDisplay.value = 'Undefined'
                operator = undefined 
                return
            }
            operator = clickedOperator
            mainDisplay.value = firstNumber + operator
            oper = ''
        }
    }
})})

deleteButton.addEventListener('click', ()=>{
    lastOperand = ''
    lastOperator = ''

    if(mainDisplay.value === "Undefined"){
        return
    }
    if(mainDisplay.value.length<1){
        return
    }
    else{
        if(mainDisplay.value.at(-1) === operator){
            mainDisplay.value = mainDisplay.value.slice(0,-1)
            operator = undefined
            currentNumber = firstNumber
            firstNumber = undefined 
        }

        else if(oper === '%'){
            oper = ''
            currentNumber = mainDisplay.value.slice(firstNumber.length+1,-1)
            mainDisplay.value = firstNumber + operator +currentNumber 
            lastWasPercentage = false
        }

        else if(operator === undefined && firstNumber !== undefined && upperDisplay.value !== ''){
            mainDisplay.value = mainDisplay.value.slice(0,-1)
            currentNumber = firstNumber.slice(0,-1)
            firstNumber = undefined
            justCalculated = false
            lastWasPercentage = false
        }
        else {
            mainDisplay.value=mainDisplay.value.slice(0,-1)
            currentNumber = currentNumber.slice(0,-1)
        }

        if(upperDisplay.value !== ''){
            upperDisplay.value = ''
        }

    }
})

clearButton.addEventListener('click',()=>{
    mainDisplay.value = ''
    firstNumber = undefined
    operator = undefined
    currentNumber = ''
    lastOperand = ''
    lastOperator = ''
    lastWasPercentage = false
    oper = ''
    if(justCalculated === true){
        justCalculated = false
    }
    if(upperDisplay.value !== ''){
        upperDisplay.value = ''
    }
    
})

equalButton.addEventListener('click',()=>{
    if(mainDisplay.value === "Undefined"){
        return
    }
    if(currentNumber === '' && operator === '%' && firstNumber !== undefined){
        operator = undefined
        upperDisplay.value = firstNumber + lastOperator
        firstNumber = operate(lastOperator,firstNumber,currentNumber).toString()
        mainDisplay.value = firstNumber
        justCalculated = true
    }

    else if(justCalculated === true){
        if(lastWasPercentage === true){
            upperDisplay.value = `${firstNumber} ${lastOperator} ${lastOperand}`
            currentNumber = divideBy100(lastOperator, firstNumber, lastOperand)
            firstNumber = operate(lastOperator,firstNumber,currentNumber).toString()
            mainDisplay.value = firstNumber
            currentNumber = ''
        }
        else{
            upperDisplay.value = `${firstNumber} ${lastOperator} ${lastOperand}`
            firstNumber = operate(lastOperator,firstNumber,lastOperand).toString()
            mainDisplay.value = firstNumber
        }
    }

    if(firstNumber === undefined || operator === undefined || currentNumber === '' || currentNumber === '-'){
        return 
    }
    else{
        mainDisplay.value = operate(operator,firstNumber,currentNumber)
        lastOperator = operator
        justCalculated = true
        if(oper === '%'){
            upperDisplay.value = `${firstNumber} ${operator} ${lastOperand}%`
            oper = ''
        }
        else{ 
            upperDisplay.value = `${firstNumber} ${operator} ${currentNumber}`
            lastOperand = currentNumber
        }
        operator = undefined
        currentNumber = ''
        firstNumber = mainDisplay.value
    }
})

changeSignButton.addEventListener('click', ()=>{

     if(lastWasPercentage && !justCalculated){
        return
    }

    lastOperand = ''
    lastOperator = ''
    
    
    if(justCalculated){
        currentNumber = firstNumber
        upperDisplay.value = ''
        firstNumber = undefined
        justCalculated = false
        lastWasPercentage = false
        if(currentNumber > 0){
            currentNumber = '-' + currentNumber
        }
        else if(currentNumber < 0){
            currentNumber = currentNumber.slice(1)
        }
        else return
        mainDisplay.value = currentNumber
    }

    else if(currentNumber === ''){
        return
    }

    else if(currentNumber !== ''){
        if (currentNumber === '0'){
            return
        }
        if(currentNumber > 0){
            currentNumber = '-' + currentNumber
        }
        else currentNumber = currentNumber.slice(1)

        if(firstNumber !== undefined){
            mainDisplay.value = firstNumber + operator + currentNumber 
        }

        else mainDisplay.value = currentNumber
    }
})

percentageButton.addEventListener('click', ()=>{
    
    if (lastWasPercentage && !justCalculated) {
        return
    }

    if(currentNumber === '' && firstNumber === undefined){
        firstNumber = '0'
        operator = percentageButton.textContent
        mainDisplay.value = firstNumber + operator
    }

    else if(operator!=='%' && currentNumber === ''){
        lastOperand = ''
        lastOperator = ''
         if(firstNumber === 'Undefined'){
        return
        }
        else{   
        justCalculated = false
        operator = percentageButton.textContent
        mainDisplay.value = firstNumber + operator
        }
    }

    else if(currentNumber !== '' && operator === undefined){
        firstNumber = currentNumber
        currentNumber = ''
        operator = percentageButton.textContent
        lastOperator = operator
        mainDisplay.value = firstNumber + operator
    }
    else if(operator!=='%' && currentNumber !== ''){
        lastWasPercentage = true
        oper = percentageButton.textContent
        mainDisplay.value += oper
        lastOperand = currentNumber
        currentNumber = divideBy100(operator, firstNumber, currentNumber)
    }

    else if(operator === '%' && currentNumber === ''){
        return 
    }

    else if(operator === '%' && currentNumber !== ''){
        firstNumber = (firstNumber % currentNumber).toString()
        currentNumber = ''
        operator = percentageButton.textContent
        mainDisplay.value = firstNumber + operator
    }
})

    
decimalButton.addEventListener('click', ()=>{

     if(lastWasPercentage && !justCalculated){
        return
    }

    lastOperand = ''
    lastOperator = ''
    lastWasPercentage = false

    if(currentNumber.includes('.')){
        return
    }

    if(currentNumber === ''){
        if(firstNumber === undefined && operator === undefined){
            currentNumber = '0.'
            mainDisplay.value = currentNumber
    }

    else if(firstNumber !== undefined && operator !== undefined){
        currentNumber = '0.'
        mainDisplay.value = firstNumber + operator + currentNumber
    }

    else if(firstNumber !== undefined && operator === undefined){
        currentNumber = '0.'
        mainDisplay.value = currentNumber
        firstNumber = undefined
        justCalculated = false
        upperDisplay.value = ''
    }
}

    else {
        if(operator !== undefined){
            currentNumber += '.'
            mainDisplay.value = firstNumber + operator + currentNumber 
        }
        else {
            if(currentNumber === '-'){
                currentNumber += '0.'
                mainDisplay.value = currentNumber
            }
            else{
                currentNumber += '.'
                mainDisplay.value = currentNumber 
            }
    }
}
})


document.addEventListener('keydown', (event)=>{
    operators.forEach(btn=>{
        if(event.key === '*' && btn.textContent === 'x'){
            btn.click()
        }
        else if(event.key === '/' && btn.textContent === '÷'){
            btn.click()
        }
        else if(event.key === '-' && btn.textContent === '–'){
            btn.click()
        }
        else if(event.key === '+' && btn.textContent === '+'){
                btn.click()
            }
        }
    )
    numbers.forEach(btn=>{
        if(btn.textContent === event.key){
            btn.click()
        }
    })

    if(event.key === 'Enter' || event.key === '='){
        equalButton.click()
    }

    else if(event.key === 'Backspace'){
        deleteButton.click()
    }

    else if(event.key === '.'){
        decimalButton.click()
    }

    else if(event.key === '%'){
        percentageButton.click()
    }

    else if(event.key === 'Escape'){
        clearButton.click()
    }

    else if(event.key === 'F9'){
        changeSignButton.click()
    }
})

function divideBy100(operator, a, b){
    if(operator === '+' || operator === '-'){
        b = (b/100) * a
    }

    else if(operator === 'x' || operator === '÷'){
        b = b/100
    }
    return b.toString()
}

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
    if(Number(b) === 0 ){
        return "Undefined"
    }
    else return Number(a)/Number(b)
}

function operate(operator,a,b){
    if(operator === "+"){
        const result = add(a,b)
        return result
    }
    else if(operator === "-"){
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
    else if(operator === '%'){
        if(b === ''){

            return a/100
        }
        else return a % b
    }

}