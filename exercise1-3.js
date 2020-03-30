"use strict";

// import readline-sync
const readline = require("readline-sync");

//-- FUNCTIONS DECLARATION --//
function printMenu(){
    console.log("1 - Insert a new task");
    console.log("2 - Remove a task by description");
    console.log("3 - Remove a task by deadline");
    console.log("4 - Print tasks");
    console.log("5 - exit");
}

function addTask(tasks){
    let description = readline.question("Task description: ");
    while(description === "") {
        description = readline.question("Please, insert a task description: ");
    }

    const important = readline.keyInYNStrict("Is the task important? ");
     
    const privateTask = readline.keyInYNStrict("Is the task private? ");

    let date = readline.question("Task deadline (YYYY-MM-DD): ").trim();
    // roughly check if the time is present
    // N.B. For this kind of operations, you should use Moment.js or similar!
    if(!date.includes(" ")) {
        date += " 23:59:59z";
    }
    const deadline = new Date(date);
    const task = {"description": description, "important": important , "private": privateTask, "deadline": deadline};
    tasks.push(task);

    // set a timeout to delete the task after its deadline, if the deadline is "valid"
    if(!Number.isNaN(deadline.getTime())) {
        const now = new Date();
        setTimeout(function(task) {
            tasks.splice(tasks.indexOf(task), 1);
        }, deadline.getTime() - now.getTime(), task);
    }
}

function removeByDescription(tasks){
    const remove = readline.question("Task to be removed (description): ");
    const toBeRemoved = [];
    for(const task of tasks) {
        if(task.description === remove){
            toBeRemoved.push(task);
        }
    }
    for(const removeTask of toBeRemoved){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }
}

function removeByDeadline(tasks){
    let remove = readline.question("Remove the tasks of (YYYY-MM-DD): ");
    remove = new Date(remove);

    const toBeRemoved = [];
    for(const task of tasks){
        if(task.deadline.getFullYear() === remove.getFullYear() && task.deadline.getMonth() === remove.getMonth() && task.deadline.getDay() === remove.getDay()){
            toBeRemoved.push(task);
        }
    }
    for(const removeTask of toBeRemoved){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }
}

function printTasks(tasks){
    tasks.sort((a,b) => a.description.localeCompare(b.description));
    console.log(tasks);
}

// -- FUNCTIONS INVOCATION --//
// code to be executed only when the file is run directly (i.e., with "node ex1.js")
if (require.main === module) {
    const tasks = [];

    const menu = setInterval(()=> {
    printMenu();
    let choice = readline.question("Your choice: ");

        switch(choice.trim()) {
            case "1":
                addTask(tasks);
                break;

            case "2":
                removeByDescription(tasks);
                break;

            case "3":
                removeByDeadline(tasks);
                break;

            case "4":
                printTasks(tasks);
                break;

            default:
                clearInterval(menu);
        }
    }, 500);
}