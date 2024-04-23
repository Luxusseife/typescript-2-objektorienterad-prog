"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importerar klassen ToDoList från klass-filen.
var class_1 = require("./class");
// Lagrar en ny ToDoList i en variabel.
var toDoList = new class_1.ToDoList;
// Deklarerar variabler för inhämtade element.
var todoFormEl = document.getElementById("todoForm");
var todoTaskEl = document.getElementById("todoTask");
var todoPriorityEl = document.getElementById("todoPriority");
var prio1El = document.getElementById("prio-div-1");
var prio2El = document.getElementById("prio-div-2");
var prio3El = document.getElementById("prio-div-3");
var deleteAllEl = document.getElementById("deleteAll");
// Händelselyssnare.
todoFormEl.addEventListener("submit", handleForm, false);
document.addEventListener("DOMContentLoaded", updateToDoList, false);
// Hanterar default för formulärsubmit och validerar input.
function handleForm(event) {
    // Förhindrar default-beteende.
    event.preventDefault();
    // Hämtar in värde från text-fält, "att göra"-uppgiften.
    var task = todoTaskEl.value;
    // Villkor; om uppgift inte fyllts i - skicka felmeddelande.
    if (!task) {
        alert("Skriv in en uppgift!");
        // Koden exekveras inte vidare.
        return;
    }
    // Omvandlar värdet från rull-listan till en integer.
    var priority = parseInt(todoPriorityEl.value);
    // Villkor; om prioritet inte har valts - skicka felmeddelande.
    if (!priority) {
        alert("Ange en prioritet!");
        // Koden exekveras inte vidare.
        return;
    }
    // Lägger till en ny "att göra"-uppgift.
    try {
        toDoList.addToDo(task, priority);
        // Uppdaterar "att göra"-listan.
        updateToDoList();
        // Återställer formuläret.
        todoFormEl.reset();
        // Felmeddelade om något går fel.
    }
    catch (error) {
        console.log(error.message);
    }
}
// Uppdaterar listan med "att göra"-uppgifter,
function updateToDoList() {
    // Rensar tidigare information.
    [prio1El, prio2El, prio3El].forEach(function (div) { return div.innerHTML = ""; });
    // Skapar en ny div som innehåller ifylld uppgift.
    toDoList.getToDos().forEach(function (todo, index) {
        // Skapar en div och lägger till klass-namn.
        var todoDiv = document.createElement("div");
        todoDiv.classList.add("container");
        // Skapar en rubrik med uppgiften.
        var todoItem = document.createElement("h3");
        todoItem.textContent = todo.task;
        // Lägger till rubrik till div.
        todoDiv.appendChild(todoItem);
        // Villkor; om uppgiften är markerad som avklarad, lägg till klassen .completed. 
        if (todo.completed) {
            todoItem.classList.add("completed");
        }
        // Skapar en avklarad/ej klar-knapp och lägger till händelselyssnare.
        var doneButton = document.createElement("button");
        doneButton.textContent = todo.completed ? "Ej klar" : "Avklarad"; // Kollar av om uppgiften är markerad som klar/ej klar.
        doneButton.addEventListener("click", function () { return completeToDo(index, doneButton); });
        // Skapar en radera-knapp och lägger till händelselyssnare.
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Radera";
        deleteButton.addEventListener("click", function () { return deleteToDo(index); });
        // Lägger till knapparna till div-containern.
        todoDiv.appendChild(doneButton);
        todoDiv.appendChild(deleteButton);
        // Lägger till den nya div-containern på rätt plats baserat på prioritet.
        [prio1El, prio2El, prio3El][todo.priority - 1].appendChild(todoDiv);
    });
}
// Visar en uppgift som avklarad/ej klar och uppdaterar "att göra"-listan.
function completeToDo(index, button) {
    var todo = toDoList.getToDos()[index];
    // Villkor; om uppgiften ej är avklarad (default) så visar knappen "Avklarad". 
    if (todo.completed) {
        toDoList.markToDoUnfinished(index);
        button.textContent = "Avklarad";
        // Annars visas "Ej klar".
    }
    else {
        toDoList.markToDoCompleted(index);
        button.textContent = "Ej klar";
    }
    updateToDoList();
}
// Raderar en uppgift och uppdaterar "att göra"-listan.
function deleteToDo(index) {
    toDoList.deleteToDo(index);
    updateToDoList();
}
