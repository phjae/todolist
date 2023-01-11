"use strict";
const form = document.querySelector('#todoform');
const textField = document.querySelector('#textfield');
const btn = document.querySelector('#btn');
const list = document.querySelector('ul');
const todos = jsonToArray();
todos.forEach(createTodo); //화면에 출력하도록 투두가 있으면 투두 출력을 foreach로 돌림
function updateTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
//json 스토리지에서 가져와서 object로 만들어서 todo array에 넣기
function jsonToArray() {
    const todoJson = localStorage.getItem('todos');
    if (todoJson === null)
        return [];
    return JSON.parse(todoJson);
}
function addTodoList(e) {
    e.preventDefault();
    const newTodo = {
        text: textField.value,
        status: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    updateTodos();
    textField.value = "";
}
function createTodo(todo) {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.status;
    checkbox.addEventListener('change', function () {
        todo.status = checkbox.checked;
        updateTodos();
    });
    list.append(newLi);
    newLi.append(todo.text);
    newLi.append(checkbox);
}
form.addEventListener("submit", addTodoList);
