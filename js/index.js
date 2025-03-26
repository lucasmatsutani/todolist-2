const input = document.querySelector(".input-task");
const button = document.querySelector(".button-add-task");
const listTasks = document.querySelector(".list-tasks")

let myItensList = []

const addNewTask = () => {
    if (input.value.trim() === ""){
        return;
    };
    myItensList.push({tarefa: input.value, concluida: false});
    input.value = ""
    showTask();
};

const showTask = () => {
    let newLi = ``
    myItensList.forEach((item, index) => {
        newLi += `<li class="task ${item.concluida && "done"}">
                        <img src="./img/checked.png" alt="checked-image" onclick="doneTask(${index})">
                        <p>${item.tarefa}</p>
                        <img src="./img/trash.png" alt="trash-image" onclick="deleteItem(${index})">
                    </li>`
    });
    listTasks.innerHTML = newLi;
    localStorage.setItem("lista", JSON.stringify(myItensList));
}

const doneTask = (index) => {
    myItensList[index].concluida = !myItensList[index].concluida;
    showTask();
}

const deleteItem = (index) => {
    myItensList.splice(index, 1);
    showTask();
}

const reloadTasks = () => {
    const localStorageTasks = localStorage.getItem("lista");
    if (localStorageTasks){
        myItensList = JSON.parse(localStorageTasks);
    }
    showTask();
}

reloadTasks();

button.addEventListener("click", addNewTask)

input.addEventListener("keyup", (e) => {
    if (e.key === "Enter"){
        addNewTask();
    };
});