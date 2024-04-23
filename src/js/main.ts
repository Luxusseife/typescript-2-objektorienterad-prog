// Importerar klassen ToDoList från klass-filen.
import { ToDoList } from "./class";

// Lagrar en ny ToDoList i en variabel.
const toDoList = new ToDoList;

// Deklarerar variabler för inhämtade element.
const todoFormEl = document.getElementById("todoForm") as HTMLFormElement;
const todoTaskEl = document.getElementById("todoTask") as HTMLInputElement;
const todoPriorityEl = document.getElementById("todoPriority") as HTMLSelectElement;
const prio1El = document.getElementById("prio-div-1") as HTMLDivElement;
const prio2El = document.getElementById("prio-div-2") as HTMLDivElement;
const prio3El = document.getElementById("prio-div-3") as HTMLDivElement;
const deleteAllEl = document.getElementById("deleteAll") as HTMLDivElement;

// Händelselyssnare.
todoFormEl.addEventListener("submit", handleForm, false);
document.addEventListener("DOMContentLoaded", updateToDoList, false);

// Hanterar default för formulärsubmit och validerar input.
function handleForm(event: Event): void {

    // Förhindrar default-beteende.
    event.preventDefault();

    // Hämtar in värde från text-fält, "att göra"-uppgiften.
    const task = todoTaskEl.value;

    // Villkor; om uppgift inte fyllts i - skicka felmeddelande.
    if (!task) {
        alert("Skriv in en uppgift!")
        // Koden exekveras inte vidare.
        return;
    }

    // Omvandlar värdet från rull-listan till en integer.
    const priority = parseInt(todoPriorityEl.value);

    // Villkor; om prioritet inte har valts - skicka felmeddelande.
    if (!priority) {
        alert("Ange en prioritet!")
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
    } catch (error) {
        console.log(error.message);
    }
}

// Uppdaterar listan med "att göra"-uppgifter,
function updateToDoList(): void {

    // Rensar tidigare information.
    [prio1El, prio2El, prio3El].forEach(div => div.innerHTML = "");

    // Skapar en ny div som innehåller ifylld uppgift.
    toDoList.getToDos().forEach((todo, index) => {

        // Skapar en div och lägger till klass-namn.
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("container");

        // Skapar en rubrik med uppgiften.
        const todoItem = document.createElement("h3");
        todoItem.textContent = todo.task;

        // Lägger till rubrik till div.
        todoDiv.appendChild(todoItem);

        // Villkor; om uppgiften är markerad som avklarad, lägg till klassen .completed. 
        if (todo.completed) {
            todoItem.classList.add("completed");
        }

        // Skapar en avklarad/ej klar-knapp och lägger till händelselyssnare.
        const doneButton = document.createElement("button");
        doneButton.textContent = todo.completed ? "Ej klar" : "Avklarad"; // Kollar av om uppgiften är markerad som klar/ej klar.
        doneButton.addEventListener("click", () => completeToDo(index, doneButton));

        // Skapar en radera-knapp och lägger till händelselyssnare.
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Radera";
        deleteButton.addEventListener("click", () => deleteToDo(index));

        // Lägger till knapparna till div-containern.
        todoDiv.appendChild(doneButton);
        todoDiv.appendChild(deleteButton);

        // Lägger till den nya div-containern på rätt plats baserat på prioritet.
        [prio1El, prio2El, prio3El][todo.priority - 1].appendChild(todoDiv);
    });
}

// Visar en uppgift som avklarad/ej klar och uppdaterar "att göra"-listan.
function completeToDo(index: number, button: HTMLButtonElement): void {
    const todo = toDoList.getToDos()[index];
    let prioDiv = prio1El || prio2El || prio3El; 

    // Villkor; om uppgiften ej är avklarad (default) så visar knappen "Avklarad". 
    if (todo.completed) {
        toDoList.markToDoUnfinished(index);
        button.textContent = "Avklarad";
        // Tar bort klassen när uppgiften inte längre är avklarad
        prioDiv.classList.remove('completed-task');
    } else {
        toDoList.markToDoCompleted(index);
        button.textContent = "Ej klar";
        // Lägg till klassen när uppgiften är avklarad
        prioDiv.classList.add('completed-task');
    }

    updateToDoList();
}

// Raderar en uppgift och uppdaterar "att göra"-listan.
function deleteToDo(index: number): void {
    toDoList.deleteToDo(index);
    updateToDoList();
}