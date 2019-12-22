// all requests in static methods

import Store from "./store.js";
import renderAlert from "./renderError.js";
import observer from "./observer.js";

const store = Store.instance;

export default class Backend {
    static register(userInfo) {
        return fetch('https://todo-app-back.herokuapp.com/register', {
            method: 'POST',
            body:
                JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) return response;
                else throw response.error;
            })
    }

    static login(userInfo) {
        return fetch('https://todo-app-back.herokuapp.com/login', {
            method: 'POST',
            body:
                JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) return response;
                else throw response.error;
            })
    }

    static checkAuth() {
        return fetch('https://todo-app-back.herokuapp.com/me', {
            method: 'GET',
            headers: {
                'Authorization': store.user.token,
            }
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) return response;
                else throw response.error;
            })
    }

    static createTodo(dataTodo) {
        return fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'POST',
            body:
                JSON.stringify(dataTodo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.user.token,
            }
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) return response;
                else throw response.error;
            })
            .catch(err => {throw renderAlert(err)})
            .then(() => Backend.readTodoAll())
    }

    static readTodoAll() {
        fetch('https://todo-app-back.herokuapp.com/todos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.user.token,
            }
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) {
                    // для быстроты, сортировка
                    // [месяц, день, год]

                    response.sort((a, b) => {
                        let dateA = a.createDate.split('/');
                        let dateB = b.createDate.split('/');

                        dateA = dateA[2] + dateA[0] + dateA[1];
                        dateB = dateB[2] + dateB[0] + dateB[1];

                        if (+dateB == +dateA) return -1; // потому что, нет миллисекунд
                        return +dateB - +dateA;
                    });

                    return response;
                }
                else throw response.error;
            })
            .catch(err => {throw renderAlert(err)})
            .then(todoArr => {
                store.todo = todoArr;
                observer.next('change');
            });
    }

    static updateTodo(id, data) {
        return fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.user.token,
            },
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) return response;
                else throw response.error;
            })
            .catch(err => {throw renderAlert(err)})
            .then(() => Backend.readTodoAll())
    }

    static deleteTodo(id) {
        return fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.user.token,
            },
        })
            .then(response => response.json())
            .then(response => {
                if (!response.error) return response;
                else throw response.error;
            })
            .catch(err => {throw renderAlert(err)})
            .then(() => Backend.readTodoAll())
    }
}