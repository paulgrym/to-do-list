{
    const tasks = [
        {
            content: "zrobić pracę domową",
            done: false
        },
        {
            content: "posprzątać",
            done: true
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent, done: false });
        render();
    }

    const render = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done ? "list__item--done" : ""}">
            ${task.content}
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };
    
    const submitForm = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value;

        if (newTaskContent === "") {
            return;
        } else {
            addNewTask(newTaskContent);
        }
    }

    init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", submitForm);
    };

    init();
}