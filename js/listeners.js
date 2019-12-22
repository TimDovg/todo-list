import Backend from "./backend.js";
import observer from "./observer.js";
import renderAlert from "./renderError.js";
import Store from "./store.js";

const store = Store.instance;
const todo = document.getElementsByClassName('todo');

export function setListenersForTodoComponent() {
    const text = document.querySelectorAll('.text-todo');
    const completed = document.querySelectorAll('img[src="images/checked-box.svg"]');
    const close = document.querySelectorAll('img[src="images/close.png"]');
    const back = document.querySelectorAll('img[src="images/undo.svg"]');

    // появление инпута и кнопки для редоктирования по нажатию на туду-текст

    [].forEach.call(text, item => {
        item.addEventListener('click', e => {
            let newTextInput = document.createElement('input');
            let newButton = document.createElement('button');
            let text = e.currentTarget.innerText;
            let id = e.currentTarget.getAttribute('data-id');
            let completed = e.currentTarget.parentNode.classList.contains('completed');

            newButton.innerText = 'Редактировать';
            e.currentTarget.innerHTML = '';
            newTextInput.value = text;
            newButton.addEventListener('click', sendUpdatedTodo);
            newTextInput.addEventListener('keypress', e => {
               if (e.key == `Enter`) sendUpdatedTodo();
            });

            e.currentTarget.append(newTextInput, newButton);
            newTextInput.focus();


            function sendUpdatedTodo() {
                Backend.updateTodo(id, {
                    "text": newTextInput.value,
                    "completed": completed,
                });
            }
        }, {once: true});
    });

    [].forEach.call(completed, imgCompleted => {
        imgCompleted.addEventListener('click', forImgCompletedClick);

        function forImgCompletedClick(e) {
            let textTodo = e.currentTarget.parentNode.parentNode.querySelector('.text-todo');
            let id = textTodo.getAttribute('data-id');

            Backend.updateTodo(id, {
                "text": textTodo.innerHTML,
                "completed": true,
            });
        }
    });

    [].forEach.call(close, imgClose => {
        imgClose.addEventListener('click', forImgCloseClick);

        function forImgCloseClick(e) {
            let textTodo = e.currentTarget.parentNode.parentNode.querySelector('.text-todo');
            let id = textTodo.getAttribute('data-id');

            Backend.deleteTodo(id)
        }
    });

    [].forEach.call(back, imgBack => {
        imgBack.addEventListener('click', forImgBackClick);

        function forImgBackClick(e) {
            let textTodo = e.currentTarget.parentNode.parentNode.querySelector('.text-todo');
            let id = textTodo.getAttribute('data-id');

            Backend.updateTodo(id, {
                "text": textTodo.innerHTML,
                "completed": false,
            });
        }
    });
}

export function setListenersForMain() {
    // добавление нового туду, фильтры и логаут

    const button = document.querySelector('.add button');
    const input = document.querySelector('.add input');
    const showAll = document.querySelectorAll('.filter label')[0];
    const showCompleted = document.querySelectorAll('.filter label')[1];
    const showUncompleted = document.querySelectorAll('.filter label')[2];
    const logOut = document.querySelector('.log-out');

    input.addEventListener('keypress', e => {
        if (e.key == 'Enter') sendCreatedTodo();
    });

    button.addEventListener('click', sendCreatedTodo);

    showAll.addEventListener('click', () => {
      [].forEach.call(todo, item => {
          item.style.display = 'flex';
      });
    });

    showCompleted.addEventListener('click', () => {
        [].forEach.call(todo, item => {
            if (!item.firstElementChild.classList.contains('completed')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        });
    });

    showUncompleted.addEventListener('click', () => {
        [].forEach.call(todo, item => {
            if (item.firstElementChild.classList.contains('completed')) {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        });
    });

    logOut.addEventListener('click', () => {
        alert('no');
    });

    function sendCreatedTodo() {
        Backend.createTodo({text: input.value});
        input.value = '';
    }
}