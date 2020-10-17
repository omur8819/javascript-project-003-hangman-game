const wordEl=document.getElementById("word");
const wrongLettersEl=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-btn");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const mainingMessage=document.getElementById("meaning");

const figureParts=document.querySelectorAll('.figure-part');
// console.log("figureParts: " figureParts);

 const meaning={
     javascript:"is a programming language that conforms to the ECMAScript specification",
     reactnative:"is an open-source mobile application framework created by Facebook",
     developer:"a person or company that creates new products, especially software, or services",
     frontend:" of a website is the part that users interact with.",
     backend:"of a website consists of a server, an application, and a database.",
     clarusway:"is a brand new coding school designed for beginners to become world class software developers."

 }
 const words=Object.keys(meaning);

// console.log(Object.keys(meaning));
 let selectedWord=words[Math.floor(Math.random()*words.length)];
 console.log(selectedWord);
//  meaningMessage
   

 const correctLetters=[];
 const wrongLetters=[];
//Show hidden word
 function displayWord() {
    mainingMessage.innerText= meaning[selectedWord]
     wordEl.innerHTML=`${selectedWord.split('').map(letter=>`<span class="letter">${correctLetters.includes(letter)? letter :""}</span>`).join("")}`;

     const innerWord=wordEl.innerText.replace(/\n/g, "");
    //  console.log(wordEl.innerText,innerWord);
    if (innerWord===selectedWord) {
        var createHeartId=setInterval(createHeart, 300);
        finalMessage.innerHTML=`Congratulations! You won! &#128522;`;
        popup.style.display="flex";
//Clear setInterval
        setTimeout(function(){
            clearInterval(createHeartId)},3000);
        
    }
     return createHeartId
 }
// Update the Wrong Letters
function updateWrongLetterttsEl() {
    //Display wrong letters
    // console.log('Update wrong');
    wrongLettersEl.innerHTML=`${wrongLetters.length>0? '<p>Wrong</p>':""} ${wrongLetters.map(letter=>`<span>${letter}</span>`)}`
    //Display parts
    figureParts.forEach((part,index)=>{
        const errors=wrongLetters.length;
        if (index<errors) {
            part.style.display="block";
            
        }else{
            part.style.display="none";
        }
    });
    // Check if lost
    if (wrongLetters.length===figureParts.length) {
        finalMessage.innerHTML="Unfortunately you lost. &#128524;";
        popup.style.display='flex';
        
    }
    
}
//  show Notification
function  showNotification() {
    // console.log("show Notification");
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000);
}
const tr=[219,221,186,222,191,220]
//  Keydown letter press
window.addEventListener("keydown",e=>{
    // console.log(e.keyCode);
    if(e.keyCode>=65 && e.keyCode<=90 || tr.includes(e.keyCode)){
        // console.log(123);
        const letter=e.key;
        if(selectedWord.includes(letter)){//letter in selectedWord (true)
            if (!correctLetters.includes(letter)) {//letter is not in correctLetters 
                correctLetters.push(letter)//push letter in correctLetters array
                displayWord();
            }else{
                showNotification();
            }

        }else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterttsEl()
                
            }

        }
    }

})
// Restart game and play again
playAgainBtn.addEventListener("click",()=>{
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=words[Math.floor(Math.random()*words.length)];
   
    displayWord();
    updateWrongLetterttsEl();
    popup.style.display='none';
    
   
})
 displayWord();

 const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    document.body.style.background = randomBg();
   
});

function randomBg() {
    return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
}

//nazar
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";

    heart.innerText = "🧿";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// setInterval(createHeart, 300);a
