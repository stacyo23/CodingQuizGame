//global variables to target
var hiScore =document.querySelector("#hiScore"); 
var toIndex =document.querySelector("#toIndex"); 
var reset =document.querySelector("#reset"); 

//retrieves scores from localstorage
var allScores =localStorage.getItem("allScores"); 
//parses the value into a string
allScores=JSON.parse(allScores); 

//if the allscores var contains values, it appends new scores as it iterates through the values
if (allScores !== null) {
    for (var i=0; i<allScores.length; i++) {

        var newLI =document.createElement("li"); 
        newLI.textContent =allScores[i].initials + " - " + allScores[i].score; 
        hiScore.appendChild(newLI);     
    }
}


//clears localstorage and reloads the page to show deleted scores
reset.addEventListener("click", function () {
    localStorage.clear(); 
    location.reload(); 
});

//takes the use to the index page to restart the quiz
toIndex.addEventListener("click", function () {
    window.location.replace("../index.html");
})


