{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ]
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = tasks.map((task, taskIndex) => (taskIndex === index) ? ({ ...task, done: !task.done }) : ({ ...task }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTaskDone = () => {
        tasks = tasks.map(task => ({ ...task, done: true }));
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const hideDoneButton = document.querySelector(".js-hideDone");
        const doneAllButton = document.querySelector(".js-doneAll");

        if (hideDoneButton && doneAllButton) {
            hideDoneButton.addEventListener("click", toggleHideDoneTasks);
            doneAllButton.addEventListener("click", markAllTaskDone);
        }
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
        <li class="list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""}">
            <button class="list__button js-done">
                ${task.done ? "✓" : ""}
            </button>
            <span class="list__taskContent ${task.done ? "list__taskContent--done" : ""}">
                ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">	
                🗑
            </button>
        </li>
        `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return
        };

        buttonsElement.innerHTML = `
            <button class="buttonsContainer__button js-hideDone">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="buttonsContainer__button js-doneAll" 
                ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const clearInput = (taskInput) => {
        taskInput.focus();
        taskInput.value = "";
    };

    const submitForm = (event) => {
        event.preventDefault();
        const taskInput = document.querySelector(".js-newTask");
        const newTaskContent = taskInput.value.trim();

        if (newTaskContent === "") {
            taskInput.focus();
        } else {
            addNewTask(newTaskContent);
        };

        clearInput(taskInput);
    };

    init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", submitForm);
    };

    init();
}