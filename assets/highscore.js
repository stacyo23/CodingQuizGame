//global variables to target
var hiScore =document.querySelector("#hiScore"); 
var toIndex =document.querySelector("#toIndex"); 
var reset =document.querySelector("#reset"); 

reset.addEventListener("click", function () {
    localStorage.clear(); 
    location.reload(); 
});

toIndex.addEventListener("click", function () {
    window.location.replace("../index.html");
})


