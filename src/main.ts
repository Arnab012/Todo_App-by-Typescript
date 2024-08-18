import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todoscontaner = document.querySelector(
  ".todocontainer"
) as HTMLDivElement;

const totoinput = document.getElementsByName("title")[0] as HTMLInputElement;

const myform = document.getElementById("myform") as HTMLFormElement;

myform.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: totoinput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };
  todos.push(todo);
  totoinput.value = "";
  console.log(todos);
  renderTodo(todos);
};

const gerenerateItemTodo = (
  title: string,
  isCompleted: boolean,
  id: string
) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;

  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) {
        item.isCompleted = checkBox.checked;
      }
    });
    paragraph.className = checkBox.checked ? "textcut" : "";
  };
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;

  paragraph.className = isCompleted ? "textcut" : "";
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  // appending all the item
  todo.append(checkBox, paragraph, btn);
  todoscontaner.append(todo);
};
const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todoscontaner.innerText = "";
  todos.forEach((item) => {
    gerenerateItemTodo(item.title, item.isCompleted, item.id);
  });
};
