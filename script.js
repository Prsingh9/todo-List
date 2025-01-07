const addTaskBtn = document.getElementById("addTask");
const btnText = addTaskBtn.innerText; 
const tasknameTextField = document.getElementById("taskname");
const recordsDisplay = document.getElementById("records");

let taskArray = []; 
let edit_id = null; 
let objStr = localStorage.getItem("tasks"); 

if (objStr != null) {
      taskArray = JSON.parse(objStr); 
}

DisplayInfo(); 
addTaskBtn.onclick = () => {
  const task = tasknameTextField.value;

  if (task !== "") {
    if (edit_id != null) {
      taskArray.splice(edit_id, 1, { task: task }); 
      edit_id = null; 
      addTaskBtn.innerText = btnText;
    } else {
      taskArray.push({ task: task }); 
    }
  }

  SaveInfo(taskArray); 
  tasknameTextField.value = "";
  DisplayInfo(); 
};
function SaveInfo(taskArray) {
  let str = JSON.stringify(taskArray);
  localStorage.setItem("tasks", str); 
}

function DisplayInfo(tasksToShow) {
 
  let statement = "";

  const tasksToDisplay = tasksToShow || taskArray; 
  tasksToDisplay.forEach((Usertask, i) => {
    statement += `<tr>               
        <th scope="row">${i + 1}</th>
        <td class="${Usertask.completed ? "completed-task" : ""}" >${
      Usertask.task
    }</td>
        <td>
          <i class="btn text-white fa fa-edit btn-info " onclick='EditInfo(${i})'></i>
          <i class="btn text-white fa fa-trash btn-danger mx-2" onclick='DeleteInfo(${i})'></i>
          <i class="btn text-white fa fa-check-circle btn-success" onclick='MarkCompleted(${i})'></i>
          </td>
      </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {

  edit_id = id;
  //
  tasknameTextField.value = taskArray[id].task; 
  addTaskBtn.innerText = "Save Changes";
}
function DeleteInfo(id) {
  taskArray.splice(id, 1); 
  SaveInfo(taskArray);
  DisplayInfo(); 
}

function MarkCompleted(id) {
  taskArray[id].completed = true; 
  SaveInfo(taskArray); 
  DisplayInfo(); 
}

const btnFil = document.getElementById("filterDropdown");

document.getElementById("allTasks").addEventListener("click", function () {
  DisplayInfo();
  btnFil.innerText = document.getElementById("allTasks").innerText;
});

document
  .getElementById("inProgressTasks")
  .addEventListener("click", function () {
    const inProgressTasksArray = taskArray.filter((task) => !task.completed);
    DisplayInfo(inProgressTasksArray); 
    btnFil.innerText = document.getElementById("inProgressTasks").innerText;
  });

document
  .getElementById("completedTasks")
  .addEventListener("click", function () {
    const completedArray = taskArray.filter((task) => task.completed);
    DisplayInfo(completedArray);
    btnFil.innerText = document.getElementById("completedTasks").innerText;
  });


const allTr = document.querySelectorAll("#records tr"); 

const searchInputField = document.querySelector("#search");

searchInputField.addEventListener("input", function (e) {

  const searchString = e.target.value.toLowerCase(); 

  recordsDisplay.innerHTML = "";

  allTr.forEach((tr) => {
    const td_in_tr = tr.querySelectorAll("td"); 
    if (td_in_tr[0].innerText.toLowerCase().indexOf(searchString) > -1) {
      recordsDisplay.appendChild(tr); 
    }
  });

  if (recordsDisplay.innerHTML == "") {
    recordsDisplay.innerHTML = "no records found";
  }
});