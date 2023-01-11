interface Todo {
  text: string;
  status: boolean;
}

const form = document.querySelector('#todoform')! as HTMLElement;
const textField = document.querySelector('#textfield')! as HTMLInputElement;
const btn = document.querySelector('#btn')! as HTMLElement;
const list = document.querySelector('ul')! as HTMLElement;

const todos: Todo[] = jsonToArray()
todos.forEach(createTodo); //화면에 출력하도록 투두가 있으면 투두 출력을 foreach로 돌림

function updateTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
//json 스토리지에서 가져와서 object로 만들어서 todo array에 넣기
function jsonToArray(): Todo[] {
  const todoJson = localStorage.getItem('todos');
  if (todoJson === null) return [];
  return JSON.parse(todoJson);

}

function addTodoList(e: SubmitEvent) {
  e.preventDefault();

  const newTodo: Todo = {
    text: textField.value,
    status: false, 
  }
  
  createTodo(newTodo);
  todos.push(newTodo);

  updateTodos();
  textField.value = "";
}

function createTodo(todo: Todo) {
  const newLi = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.status;
  
  checkbox.addEventListener('change', function(){
    todo.status = checkbox.checked
    updateTodos();
  })
  list.append(newLi);
  newLi.append(todo.text);
  newLi.append(checkbox);
}

form.addEventListener("submit", addTodoList);