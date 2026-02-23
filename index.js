let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

const createItem = (item) => {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    deleteButton.addEventListener("click", () => {
        clone.remove();
        saveTasks(getTasksFromDOM());
    })

    duplicateButton.addEventListener("click", () => {
        listElement.prepend(createItem(textElement.textContent));
        saveTasks(getTasksFromDOM());
    })

    editButton.addEventListener("click", () => {
        textElement.contentEditable = "true";
        textElement.focus();
    })

    textElement.addEventListener("blur", () => {
        textElement.contentEditable = "false";
        saveTasks(getTasksFromDOM());
    })

    return clone;
}

const getTasksFromDOM = () => Array.from(document.querySelectorAll(".to-do__item-text"), item => item.textContent);

const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

const loadTasks = () => localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : items;

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputElement.value) {
        listElement.prepend(createItem(inputElement.value));
        saveTasks(getTasksFromDOM());
        formElement.reset();
    }
})

items = loadTasks();
items.forEach((item) => listElement.append(createItem(item)));
