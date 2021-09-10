//getting all required elements 
const inputBox = document.querySelector(".inputfield_input");
const addBtn = document.querySelector(".btn-add")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".clear")
const storage = "new todo"

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() != 0) {//if user values aren't only spaces
        addBtn.classList.add("active") //active the addd button
    } else {
        addBtn.classList.remove("active") //unactive the addd button
    }

}
showTasks()//calling task function

//if user clicks on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem(storage); //getting localstorage
    if (getLocalStorage == null) {//if localStorage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transfoeming json string intpo a js object
    }
    listArr.push(userData);//pushing oradding user  data
    localStorage.setItem(storage, JSON.stringify(listArr)); //transforming js object in a json object
    showTasks()//calling task function
}

// function to add task list inside ul

function showTasks() {
    let getLocalStorage = localStorage.getItem(storage); //getting localstorage
    if (getLocalStorage === null) {//if localStorage is null
        listArr = []; //creating blank array
    } else {
        listArr = JSON.parse(getLocalStorage); //transfoeming json string intpo a json
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length; //
    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active")
    }
    else {
        deleteAllBtn.classList.remove("active")
    }
    let newLiTag = ' ';
    console.log(listArr);
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>
        `
    });
    todoList.innerHTML = newLiTag;//adding new li ta inside ul tag
    inputBox.value = "";//once task added leave the input field blanck
}

//delete tasks 
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem(storage); //getting localstorage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1)//delete or remove
    // change list again update the local storage
    localStorage.setItem(storage, JSON.stringify(listArr)); //transforming js object in a json object
    showTasks()//calling task function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = []; //empty an array
    // deleting all tasks
    localStorage.setItem(storage, JSON.stringify(listArr)); //transforming js object in a json object
    showTasks()//calling task function
}