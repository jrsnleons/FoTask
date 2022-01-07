//----------------------------------TODO APP-------------------------------------------

//gettting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".todo-footer button");


inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user value is not only space
        addBtn.classList.add("active"); //active the add button
    }else{
        addBtn.classList.remove("active"); //unactive the add button
    }
}

showTasks();                                               //calls the function showTasks                 

//if user click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage 
    if(getLocalStorage == null){                            //if localstorage is null
        listArr = [];                                       //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);              //transforming json strting into a json object
    }
    listArr.push(userData);                                  //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transform js object into a json string
    showTasks();                                             //calls showTasks function
    addBtn.classList.remove("active");                        //unactive the add button
}

//funciton to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage 
    if(getLocalStorage == null){                            //if localstorage is null
        listArr = [];                                       //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);              //transforming json strting into a json object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;               //passing the length value in pendingNub
    if(listArr.length > 0){                                 //if arrayy length is greater than 0
        deleteAllBtn.classList.add("active");               //active the clearall button
    }else{
        deleteAllBtn.classList.remove("active");            //unactive the clear all button
    }
    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>` ;
    });
    todoList.innerHTML = newLiTag;                          //adding new li tag inside ul tag
    inputBox.value = "";                                    //once task added leave the input field blank
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage 
    listArr = JSON.parse(getLocalStorage);                  //transforming json strting into a json object
    listArr.splice(index, 1);                               //delete or remove te particular indexed li
    // after remove the li again update the localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transform js object into a json string
    showTasks();    
}

//delete all tasks function
deleteAllBtn.onclick = ()=>{
    listArr = [];                                             //empty the array
    // after deletingthe all tasks again update the localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transform js object into a json string
    showTasks();    
}   


//-----------------------TODO APP END----------------------------------------------------

//---------------------POMODORO APP START --------------------------------------------

//timer----------
const el = document.querySelector(".clock");
const bell = document.querySelector("audio");

const mindiv = document.querySelector(".mins");
const secdiv = document.querySelector(".secs");

const startBtn = document.querySelector(".start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
    let btn = localStorage.getItem("btn");
    
    if(btn == "focus"){
        mins = +localStorage.getItem("focusTime");
    }else{
        mins = +localStorage.getItem("breakTime");
    }

    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;
});

function decremenT(){
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
    if(circle.classList.contains("danger")){
        circle.classList.remove("danger");
    }

    if(seconds > 0){
        perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
        setProgress(perc);
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);
        if(seconds < 10){
            circle.classList.add("danger");
        }
    }else{
        mins = 0;
        seconds = 0;
        bell.play();
        let btn = localStorage.getItem("btn");

        if(btn == "focus"){
            startBtn.textContent = "start break";
            startBtn.classList.add("break");
            localStorage.setItem("btn", "break");
        }else{
            startBtn.classList.remove("break");
            startBtn.textContent = "start focus";
            localStorage.setItem("btn", "break");
        }
        startBtn.style.transform = "scale(1)";
    }

}


//progress-------------------------------------
const circle = document.querySelector(".progress-ring__circle");
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent){
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}


//settings----------------------------------
const focusTimeInput = document.querySelector("#focusTime");
const breakTimeInput = document.querySelector("#breakTime");
const pauseBtn = document.querySelector(".pause");
const focusPH = document.querySelector(".studyInput");
const breakPH = document.querySelector(".breakInput");



document.querySelector("form").addEventListener("submit", (e) =>{
    e.preventDefault();
    localStorage.setItem("focusTime", focusTimeInput.value);
    localStorage.setItem("breakTime", breakTimeInput.value);
    focusPH.value = localStorage.focusTime;
    breakPH.value = localStorage.breakTime;
});

document.querySelector(".reset").addEventListener("click", () =>{
    startBtn.style.transform = "scale(1)";
    clearTimeout(initial);
    setProgress(0);
    mindiv.textContent = 0;
    secdiv.textContent = 0;
});

pauseBtn.addEventListener("click", () => {
    if(paused == undefined){
        return;
    }
    if(paused){
        paused = false;
        initial = setTimeout("decremenT()", 60);
        pauseBtn.textContent = "pause";
        pauseBtn.classList.remove("resume");
    }else{
        clearTimeout(initial);
        pauseBtn.textContent = "resume";
        pauseBtn.classList.add("resume");
        paused = true;
    }
});




$(document).ready(function(){
    var status = 0;
    $("#hiddenForm").hide();
    $("#buttonHide").click(function(e){
        if(status == 0){
            $("#hiddenForm").show(500);
            status = 1;
        }else{
            $("#hiddenForm").hide(500);
            status = 0;
        }
    });



    focusPH.value = localStorage.focusTime;
    breakPH.value = localStorage.breakTime;
})
