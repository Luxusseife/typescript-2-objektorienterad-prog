// Definierar kontrakt för en "att göra"-uppgift.
interface ToDo {
    task: string,
    completed: boolean,
    priority: number
}

// Exporterar definierad klass.
export class ToDoList {
    // Privat egenskap som innehåller en tom array med "att göra"-objekt.
    private todos: ToDo[] = [];

    // Hämtar lagrade "att-göra"-uppgifter från LocalStorage vid skapande av ett nytt objekt.
    constructor() {
        this.loadFromLocalStorage();
    }

    // Metod för att lägga till nya "att göra"-uppgifter.
    addToDo(task: string, priority: number): boolean {

        // Trim() används för att ta bort överflödiga tecken.
        const trimmedTask = task.trim();

        // Validering av input.
        if (!trimmedTask || priority === undefined) {
            // Felmeddelande och alert när input saknas.
            throw new Error("Ej angiven uppgift eller prioritet");
        }

        // Skapar ett nytt "att göra"-objekt.
        const newToDo = {
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
    }

    // Metod för att hämta "att göra"-listan.
    getToDos(): ToDo[] {
        return this.todos;
    }

    // Metod för att spara "att göra"-listan till LocalStorage.
    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    // Metod för att hämta "att göra"-listan från LocalStorage.
    loadFromLocalStorage(): void {
        const savedTodos = localStorage.getItem("todos");
        // Villkor; om det finns sparade uppgifter hämtas dessa.
        if (savedTodos) {
            this.todos = JSON.parse(savedTodos);
        }
    }

    // Metod för att markera uppgifter som avklarade.
    markToDoCompleted(todoIndex: number): void {

        // Markerar en specifik uppgift som avklarad.
        this.todos[todoIndex].completed = true;

        // Uppdaterar LocalStorage.
        this.saveToLocalStorage();
    }

    // Metod för att avmarkera en uppgift som tidigare markerats som avklarad.
    markToDoUnfinished(todoIndex: number): void {

        // Avmarkerar den specifika uppgiften.
        this.todos[todoIndex].completed = false;

        // Uppdaterar LocalStorage.
        this.saveToLocalStorage();
    }

    // Metod för att radera en uppgift.
    deleteToDo(todoIndex: number): void {

        // Raderar en specifik uppgift.
        this.todos.splice(todoIndex, 1);

        // Uppdaterar LocalStorage.
        this.saveToLocalStorage();
    }
}