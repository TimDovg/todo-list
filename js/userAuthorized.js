import renderMain from "./renderMain.js";
import {setListenersForMain, setListenersForTodoComponent} from "./listeners.js";
import observer from "./observer.js";
import Backend from "./backend.js";
import createTodoComponent from "./todoComponent.js";
import Store from "./store.js";

const store = Store.instance;

export default function userAuthorized() {
    history.pushState('authorized', '', 'authorized');
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

}