//array of questions to be rendered to page

var questions = [
    {
        title: "Which of these is NOT considered a type of data?",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    }, 
    {
        title: "Arrays must be enclosed in ___",
        choices: ["curly brackets", "parenthesis","nothing", "square brackets" ],
        answer: "square brackets"
    }, 
    {
        title: "Which symbol is required to target an id element in CSS?",
        choices: ["#", "*", ".", "/"], 
        answer: "#"
    }, 
    {
        title: "Which of the following is not a coding language?", 
        choices: ["Javascript", "goat yoga", "Jquery", "HTML/CSS"],
        answer: "goat yoga"
    }, 
    {
        title: "Strings are enclosed in ___",
        choices: ["parenthesis", "curly brackets", "a circle", "quotation marks"],
        answer: "quotation marks"
    }
]

//starts score at 0
var score =0; 
//starts index of questions at the first question
var questionIndex=0; 

//creates variables for the elements by ID names
var timer =document.querySelector("#timer");
var pressStart =document.querySelector("#pressStart");
var questionsDiv =document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper"); 

//time @ initiation
var timeLeft =75; 
var holdInterval =0; 
//time to be removed upon wrong answers
var penalty =10; 

var createUL=document.createElement("ul");

//starts countdown time
pressStart.addEventListener("click", function () {
if (holdInterval === 0) {
    holdInterval = setInterval(function () {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft; 
        if (timeLeft === 0) {
            clearInterval(holdInterval); 
            finish(); 
            timer.textContent = "Time's Up!" 
        }
    }, 1000);
}
//renders next question based on the index
render(questionIndex); 
}); 

//dynamically adds questions to the page
function render(questionIndex) {
    //clears values 
    questionsDiv.innerHTML =""; 
    createUL.innerHTML ="";

    //for loop to iterate through the questions array
    for (var i =0; i <questions.length; i++) {
        //creates an element for the question at each index to be used
        var userQuestion =questions[questionIndex].title; 
        //creates an element for the choices the user can choose to be used
        var userChoices =questions[questionIndex].choices; 
        //renders the question at the questionsDiv
        questionsDiv.textContent=userQuestion; 
    }

    //loop to create a list item for each possible answer
    userChoices.forEach(function(newItem) {
        var listItem =document.createElement("li");
        listItem.textContent =newItem; 
        //tacks each possible answer to the question
        questionsDiv.appendChild(listItem); 
        //checks user response against answer
        listItem.addEventListener("click", (checkAnswer)); 

    })
}

function checkAnswer(event) {
    var response =event.target; 

    if (response.matches("li")) {
        //creates a new div for confirming whether question right/wrong
        var newDiv =document.createElement("div"); 
        //sets the id of newDiv element to newDiv
        newDiv.setAttribute("id", "newDiv"); 
        //checks response against answer in array
        if (response.textContent == questions[questionIndex].answer) {
            score++; 
            newDiv.textContent ="Correct"; 
        } else {
            timeLeft=timeLeft-penalty; 
            newDiv.textContent = "Wrong! The correct answer was: " + questions[questionIndex].answer; 
        }

    }
    //moves to next question
    questionIndex++; 

    //ensures that once all questions have been rendered, the game ends
if (questionIndex >= questions.length) {
    finish(); 
    newDiv.textContent ="End of quiz! You got " + score + "/" + questions.length + " correct!";
} else {
    //renders next question
    render(questionIndex); 
}
//appends new div to questionsdiv
questionsDiv.appendChild(newDiv); 
}

function finish() {
    //clears values
    questionsDiv.innerHTML = "";
    timeLeft.innerHTML = "";

//dynamically creates h1 tag with an id of create H1
var createH1 = document.createElement("h1");
createH1.setAttribute("id", "createH1");
createH1.textContent = "All Done!"

 //appends "All Done" to the page
 questionsDiv.appendChild(createH1);

 //creates a paragraph tag with id createP
  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

//appens new paragraph tag
  questionsDiv.appendChild(createP);


if (timeLeft >= 0) {
    //if time left on timer, assigns value to remaining
    var remainingTime =timeLeft; 
    //creates new paragraph element
    var createP2 =document.createElement("p");
    //clears timer counting
    clearInterval(holdInterval); 
    //renders final score to page
    createP.textContent ="Your final score is: " + remainingTime; 
    //appends new paragraph tag to questionsDiv
    questionsDiv.appendChild(createP2); 
}

//create new element
var getInitials =document.createElement("label"); 
//gives element an id of initials
getInitials.setAttribute("id", "getInitials");
//assigns text content to getInitials 
getInitials.textContent = "Enter your initials"; 
questionsDiv.appendChild(getInitials); 

//creates an input element
var initialInput =document.createElement("input"); 
//sets input type to text
initialInput.setAttribute("type", "text"); 
//gives var an id of initials
initialInput.setAttribute("id", "initials"); 
//sets initials to be an empty string
initialInput.textContent=""; 
//appends input to div
questionsDiv.appendChild(initialInput); 

var submitBtn =document.createElement("button"); 
//sets button type to be submit
submitBtn.setAttribute("type", "submit"); 
//asigns id value of submit
submitBtn.setAttribute("id", "submit"); 
//button text
submitBtn.textContent ="Submit"; 
//appends button to div
questionsDiv.appendChild(submitBtn); 

submitBtn.addEventListener("click", function () {
//assigns initials to a variable
    var initials=initialInput.value; 

//ensures initials not blank
if (initials===null) {
    alert("No value entered"); 
} else {
    //stores score with initials in var
    var finalScore = {
        initials: initials, 
        score: remainingTime
    }
//retrieves all scores from localstorage
    var allScores =localStorage.getItem("allScores");
    
    //if empty, then the allscores val is an empty array(not null)
    if (allScores===null) {
        allScores=[]; 
    } else {
        //parses from JSON values
        allScores =JSON.parse(allScores); 
    }
    //pushes finalscore values to array
   allScores.push(finalScore);  
    //var parses scores into JSON
   var JSONScores=JSON.stringify(allScores); 
//sets stringified values into localstorage
localStorage.setItem("allScores", JSONScores); 
//moves window to highscores page
window.location.replace("./highscore.html"); 

}


});

}
