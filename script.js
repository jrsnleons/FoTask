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