export default function createTodoComponent({createDate, completed, _id, text}) {
    let classCompleted = '';
    let img = `<img title="Отметить как сделанное" data-size=25 src="images/checked-box.svg">`;

    if (completed) {
        classCompleted = "completed";
        img = `<img title="Отметить как несделанное" data-size=25 src="images/undo.svg">`;
    }

    return `<div class="todo" title="Редактировать">
                <div class="wrap-text-todo ${classCompleted}">
                    <div class="text-todo" data-id="${_id}">${text}</div>
                    <div class="date-todo">${createDate}</div>
                </div>
                <div class="tools">
                    ${img} <img title="Удалить" data-size=25 src="images/close.png">
                </div>
            </div>`;
}