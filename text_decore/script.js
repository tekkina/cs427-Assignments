var text = document.getElementById("textarea");
var btn =  document.getElementById("Btn");
var checkedButton = document.getElementById("bling");
var translateBtn = document.getElementById("secondBtn");
var malkovitchBtn = document.getElementById("thirdBtn");
var timerId = null; 
var image = "url('https://courses.cs.washington.edu/courses/cse190m/CurrentQtr/labs/6/hundred-dollar-bill.jpg')";

function decoration(){
    if((timerId===null)){
    text.style.backgroundColor ="lightblue";
    btn.value=".....undo Bigger Decoration";
    btn.style.backgroundColor= "red";
}
else  {
    text.style.backgroundColor ="white"; 
    btn.value="Bigger Decoration!"
    btn.style.backgroundColor = "rgba(146, 18, 137, 0.854)";
    btn.style.color ="rgb(253, 215, 168)"
}
};  

function moreDecoration() {
  if (checkedButton.checked) {
        alert("radio button will be checked."+ "\n" + "if you donot want to change the text" + "\n" + "decoration referesh the page, or press \"ok\" to change the style");
        text.style.fontFamily ="bolder";
        text.style.textDecoration="underline";
        text.style.backgroundImage = image;
        text.style.backgroundSize ="cover";

    }
    else{
        alert("radio button will be unchecked." + "\n" + "and text decoration will be changed back."+"\n");
        text.style.textDecoration="none";
        text.style.backgroundImage ="none";
    }

  }
    function increaseFontSize() {
      var currentSize = parseInt(window.getComputedStyle(text).fontSize,10);
      var newSize = currentSize + 2;
     text.style.fontSize =`${newSize}px`;
    }
    
    function startTimer() {
      timerId = setInterval(increaseFontSize,500);
    }
    
    function stopTimer() {
      clearInterval(timerId);
      timerId = null;
    } 


function translate(){
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const words = text.value.split(' ');
    const translatedWords = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i].toLowerCase();
      let translatedWord = '';
      if (vowels.includes(word[0])) {
        translatedWord = word + 'ay';
      } else {
        let firstVowelIndex = -1;
        for (let j = 0; j < word.length; j++) {
          if (vowels.includes(word[j])) {
            firstVowelIndex = j;
            break;
          }
        }
        translatedWord = word.slice(firstVowelIndex) + word.slice(0, firstVowelIndex) + 'ay';
      }
      if (words[i][0] === words[i][0].toUpperCase()) {
        translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
      }
      translatedWords.push(translatedWord);
    }

    text.value = translatedWords.join(' ');
  }

function malkovitch(){
  const replacedText = text.value.split(" ").map(word => {
    if (word.length >= 5) {
      return "Malkovich";
    } else {
      return word;
    }
  }).join(" ");
text.value = replacedText;};

document.getElementById("bling").addEventListener("change",moreDecoration);
document.getElementById("Btn").addEventListener('click',function(){
  decoration();
  timeControl();
});
malkovitchBtn.addEventListener('click',malkovitch);
translateBtn.addEventListener('click',translate);

function timeControl() {
  if (timerId === null)
    startTimer();
  else 
    stopTimer();
};