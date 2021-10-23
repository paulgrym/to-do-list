{
    const tasks = [
        // {
        //     content: "zrobić pracę domową",
        //     done: false
        // },
        // {
        //     content: "posprzątać",
        //     done: true
        // },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent, done: false });
        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        })

        const doneButtons = document.querySelectorAll(".js-done");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        })
    }

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            
            <li class="list__item">
            <button class="list__button js-done">${task.done ? "&#10004" : ""}</button>
            <p class="list__paragraph ${task.done ? "list__paragraph--done" : ""}">
            ${task.content}
            </p>
            <button class="list__button list__button--remove js-remove">	
            &#128465</button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    }

    const clearInput = (taskInput) => {
        taskInput.focus();
        taskInput.value = "";
    }

    const submitForm = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const taskInput = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            taskInput.focus();
        } else {
            addNewTask(newTaskContent);
        }

        clearInput(taskInput);
    }

    init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", submitForm);
    };

    init();
}