const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_+{}|:;[],./<>?';

console.log("done 1 ");

let password = "";
let passwordLength = 10;
let checkCount = 0;
//set strength circle color to grey
handleSlider();

setIndicator("#ccc");

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)+"% 100%")
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min,max){
    return Math.floor(Math.random() * (max-min) + min);

}

function generateRandomNumber() {
    return getRandomInteger(0,9);
}

function generateLowercase() {
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateUppercase() {
    return String.fromCharCode(getRandomInteger(65,91));
}

function getSymbol() {
    const randNum = getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

console.log("done 2 ");
function calcStrength(){
     let hasUpper = false ;
     let hasLower = false ;
     let hasNum = false;
     let hasSym = false;
     if(uppercaseCheck.checked) hasUpper=true;
     if(lowercaseCheck.checked) hasLower=true;
     if(numbersCheck.checked) hasNum=true;
     if(symbolCheck.checked) hasSym=true;

     if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#0f0");
     }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym)&&
        passwordLength >= 6
     ){
        setIndicator("#ff0");
     }else{
        setIndicator("#f00");
     }
}

console.log("done 3");

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } 
    catch(e){
        copyMsg.innerText = "failed";
    }

    //to make the caopy wala text visible 
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
 
}

console.log("done 4 ");
function shufflePassword (array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp=array[i];
        array[i] = array[j];
        array[j]=temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

console.log("done 5 ");
function handleCheckboxChange(){
    checkCount=0;
    allCheckbox.forEach((checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });

    //special condiition 
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

console.log("done 6 ");

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckboxChange);
})

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    handleSlider();
} )

copybtn.addEventListener('click' , () => {
    if(passwordDisplay.value)
        copyContent();
} )

console.log("done 7 ");
generatebtn.addEventListener('click', () => {

    if(checkCount==0){
        return;
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    console.log("done 8 ");
    //remove old password 
    password="";

    let funArr=[];

    if(uppercaseCheck.checked)
        funArr.push(generateUppercase);
    if(lowercaseCheck.checked)
        funArr.push(generateLowercase);
    if(numbersCheck.checked)
        funArr.push(generateRandomNumber);
    if(symbolCheck.checked)
        funArr.push(getSymbol);
    
    //compulsory addition 
    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }

    //remaining addition
    for(let i=0;i<passwordLength-funArr.length ; i++){
        let randIndex = getRandomInteger(0,funArr.length);
        password+=funArr[randIndex]();
    }

    password=shufflePassword(Array.from(password));
    passwordDisplay.value = password;

    calcStrength();
    console.log("done 9 ");
})

