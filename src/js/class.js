"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoList = void 0;
// Exporterar definierad klass.
var ToDoList = /** @class */ (function () {
    // Hämtar lagrade "att-göra"-uppgifter från LocalStorage vid skapande av ett nytt objekt.
    function ToDoList() {
        // Privat egenskap som innehåller en tom array med "att göra"-objekt.
        this.todos = [];
        this.loadFromLocalStorage();
    }
    // Metod för att lägga till nya "att göra"-uppgifter.
    ToDoList.prototype.addToDo = function (task, priority) {
        // Trim() används för att ta bort överflödiga tecken.
        var trimmedTask = task.trim();
        // Validering av input.
        if (!trimmedTask || priority === undefined) {
            // Felmeddelande och alert när input saknas.
            throw new Error("Ej angiven uppgift eller prioritet");
        }
        // Skapar ett nytt "att göra"-objekt.
        var newToDo = {
            task: trimmedTask,
            priority: priority,
            completed: false // Inga uppgifter är klara från start.
        };
        // Lägger till ny "att göra"-uppgift.
        this.todos.push(newToDo);
        // Sparar den uppdaterade "att göra"-listan i LocalStorage.
        this.saveToLocalStorage();
        // Returnerar true då uppgiften har lagts till.
        return true;
    };
    // Metod för att hämta "att göra"-listan.
    ToDoList.prototype.getToDos = function () {
        return this.todos;
    };
    // Metod för att spara "att göra"-listan till LocalStorage.
    ToDoList.prototype.saveToLocalStorage = function () {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    };
    // Metod för att hämta "att göra"-listan från LocalStorage.
    ToDoList.prototype.loadFromLocalStorage = function () {
        var savedTodos = localStorage.getItem("todos");
        // Villkor; om det finns sparade uppgifter hämtas dessa.
        if (savedTodos) {
            this.todos = JSON.parse(savedTodos);
        }
    };
    // Metod för att markera uppgifter som avklarade.
    ToDoList.prototype.markToDoCompleted = function (todoIndex) {
        // Markerar en specifik uppgift som avklarad.
        this.todos[todoIndex].completed = true;
        // Uppdaterar LocalStorage.
        this.saveToLocalStorage();
    };
    // Metod för att avmarkera en uppgift som tidigare markerats som avklarad.
    ToDoList.prototype.markToDoUnfinished = function (todoIndex) {
        // Avmarkerar den specifika uppgiften.
        this.todos[todoIndex].completed = false;
        // Uppdaterar LocalStorage.
        this.saveToLocalStorage();
    };
    // Metod för att radera en uppgift.
    ToDoList.prototype.deleteToDo = function (todoIndex) {
        // Raderar en specifik uppgift.
        this.todos.splice(todoIndex, 1);
        // Uppdaterar LocalStorage.
        this.saveToLocalStorage();
    };
    // Metod för att radera alla uppgifter.
    ToDoList.prototype.deleteAllToDos = function () {
        // Hämtar in bekräftelse på att hela listan ska rensas.
        var confirmation = confirm("Är du säker på att du vill radera hela listan?");
        // Om bekräftelse finnes, raderas listan.
        if (confirmation) {
            // Raderar alla uppgifter.
            this.todos = [];
            // Uppdaterar LocalStorage.
            this.saveToLocalStorage();
        }
    };
    return ToDoList;
}());
exports.ToDoList = ToDoList;
