const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]"); 

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const sysbolsCheck = document.querySelector("#symobols");
const indigator = document.querySelector("[data-indicater]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const symbol = '!@#$%^&*()_+}{?><.,~`[]';

let password = "";
let passWordLength = 10;
let checkCount = 0;
handelSlider();





handelSlider();//pass word length update in UI

function handelSlider(){
    inputSlider.value = passWordLength;
    lengthDisplay.innerText = passWordLength;

}

function setIndicator(){ // strenth color set 
    indigator.style.backgroundColor = color;
}

function getRedInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRendomNumber(){ // it return 0 to 9  rendom number
    return getRedInteger(0,9);
}

function generateLowercase(){  // it return a to z rendom lowercase latter (97) = a  ,(123) = z
    return String.fromCharCode(getRedInteger(97,123))
} 

function generateUppercase(){  // it return A to Z rendom Uppercase latter (65) = A    (91) = Z
    return String.fromCharCode(getRedInteger(65,91))
} 

function generateSymbol(){ // it return rendom symbol
     const randNum=getRedInteger(0,symbol.length);
     return symbol.charAt(randNum);
}
 

function calcStrongh(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(sysbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passWordLength >= 8){
        setIndicator("#0f0");
    }
    else if(
        (hasUpper || hasLower) &&
        (hasNum || hasSym) &&
        passWordLength >= 6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
    
}

// copy content//

async function copyContent(){ // for copy content
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "copied";
    }
    catch(e) {
       copyMsg.innerText = "faild" ;
    }
    // to make copy wala visible
    copyMsg.classList.add("active");

    setTimeout( () => {
       copyMsg.classList.remove("active") ;
    }, 2000);
    
   


}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handelCheckBocChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
            checkCount++;
    })

    if(passWordLength < checkCount){
        passWordLength = checkCount;
        handelSlider(); 
    }
}

allCheckBox.forEach( (checkbox) => { 
    checkbox.addEventListener('change',handelCheckBocChange);
})



inputSlider.addEventListener('input',(e)=>{
    passWordLength = e.target.value;
    handelSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})



//Generate Password//

generateBtn.addEventListener('click',()=>{
    // none of this checkbox ar selected

    if(checkCount == 0) 
        return;

    if( passWordLength < checkCount) {
        passWordLength = checkCount;
        handelSlider();
    }
    console.log ("Generate btn ok")

    // let's start the jurnny to findout new password

    //remove old password
    password = "";

    //let's puts the stuff mention buy checkBoxes

    // if(uppercaseCheck.checked){
    //     password += generateUppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowercase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRendomNumber();
    // }

    // if(sysbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funArr = [];

    if(uppercaseCheck.checked){
        funArr.push(generateUppercase);
    }
    
    if(lowercaseCheck.checked){
        funArr.push(generateLowercase);
    }

    if(numbersCheck.checked){
        funArr.push(generateRendomNumber);
    }

    if(sysbolsCheck.checked){
        funArr.push(generateSymbol);
    }

    // compulsoly addition

    for( let i=0;i < funArr.length;i++){
        password = funArr[i]();
    }
    console.log ("Compolsary addition ok")

    //remaning addition

    for(let i=0; i < passWordLength-funArr.length; i++) {
        let rendIndex = getRedInteger(0 , funArr.length) ;
        password += funArr[rendIndex]();
    }

    console.log ("remening addition ok")

    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log(password);
    console.log ("suffling done")

    //show in UI
    passwordDisplay.value = password;
    console.log ("UI addition done")

    calcStrongh();


})


