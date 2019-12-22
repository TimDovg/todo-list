import Backend from "./backend.js";
import renderAlert from "./renderError.js";

export default function renderMain() {
    onInit();

    document.body.innerHTML = `
        <div class="main">
            <div>
                <div class="add"><input><button title="Новое задание">Добавить</button></div>
                <div class="filter">
                        <label>Все<input name="filter" type="radio" checked></label>
                        <label>Завершенные<input name="filter" type="radio"></label>
                        <label>Незавершенные<input name="filter" type="radio"></label>
                </div>
                <div class="todo-list">
                    <!--just example-->
                    
                
                    <!--<div class="todo" title="Редактировать">
                        <div class="wrap-text-todo">
                            <div class="text-todo">email 1</div>
                            <div class="date-todo">Сегодня</div>
                        </div>
                        <div class="tools">
                            <img title="Отметить как сделанное" data-size=25 src="images/checked-box.svg"> <img title="Удалить" data-size=25 src="images/close.png">
                        </div>
                    </div>
                    <div class="todo" title="Редактировать">
                        <div class="wrap-text-todo">
                            <div class="text-todo">email 2</div>
                            <div class="date-todo">Вчера</div>
                        </div>
                        <div class="tools">
                            <img title="Отметить как сделанное" data-size=25 src="images/checked-box.svg"> <img title="Удалить" data-size=25 src="images/close.png">
                        </div>
                    </div>
                    <div class="todo" title="Редактировать">
                    <div class="wrap-text-todo">
                        <div class="text-todo">Chesdsffffffffffffffffffffffffffffffffffffhesdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffckhesdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffckhesdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffckhesdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffckhesdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffckhesdsfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffckfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffck email 1</div>
                        <div class="date-todo">3 дня назад</div>
                    </div>
                    <div class="tools">
                        <img title="Отметить как сделанное" data-size=25 src="images/checked-box.svg"> <img title="Удалить" data-size=25 src="images/close.png">
                    </div>
                    </div>-->
                </div>
            </div>
            <div class="counters">
                <div>Всего<div class="counter-all">0</div></div>
                <div class="wrap-counter">
                    <div>Незавершенные<div class="counter-uncompleted">0</div></div>
                    <div>Завершенные<div class="counter-completed">0</div></div>
                </div>
                <div class="log-out">Выйти из аккаунта</div>
            </div>
        </div>
    `;

    function onInit() {
        //checking Authorization

        Backend.checkAuth()
            .catch(err => {throw renderAlert(err)})
            .then(() => renderAlert('You are authorized.<br>Welcome!', 'lightgreen'));
    }
}