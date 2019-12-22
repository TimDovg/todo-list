import renderAlert from "./renderError.js";
import {setListenersForTodoComponent, setListenersForMain} from "./listeners.js";
import observer from "./observer.js";
import Store from "./store.js";
import renderMain from "./renderMain.js";
import renderLogin from "./renderLogin.js";
import Backend from "./backend.js";
import createTodoComponent from "./todoComponent.js";

const store = Store.instance;

store.user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZjkyNGVlMmVhNzBjMDAxNjgyNmUzZiIsImVtYWlsIjoidGltQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEV6cmJHcC5JR1k4WGRCRmI0NkkuVHVwUHpuZnBTSXBEY1pWcURTdDdGNkttemxvUHVQZEFxIiwidXNlcm5hbWUiOiJib3NzIiwiX192IjowfSwiaWF0IjoxNTc2NjA5MzAwfQ.vwaFehn0MmN-hM9wD4Nrc8DxG2DRaj9fbWEtA7NtyQk";
renderMain();
setListenersForMain();

observer.subscribe('change', renderTodoList);
observer.subscribe('change', setListenersForTodoComponent);
observer.subscribe('change', countTodo);

Backend.readTodoAll();



function renderTodoList() {
    const list = document.querySelector('.todo-list');
    list.innerHTML = '';

    store.todo.forEach( todo => list.innerHTML += createTodoComponent(todo));
}

function countTodo() {
    // счетчики туду

    const counterAll = document.querySelector('.counter-all');
    const counterCompleted = document.querySelector('.counter-completed');
    const counterUncompleted = document.querySelector('.counter-uncompleted');
    let countOfAll = store.todo.length;
    let countOfCompleted = store.todo.filter( todo => todo.completed == true).length;

    counterAll.innerHTML = countOfAll;
    counterCompleted.innerHTML = countOfCompleted;
    counterUncompleted.innerHTML = countOfAll - countOfCompleted;
}