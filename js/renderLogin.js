import Backend from "./backend.js";
import userAuthorized from "./userAuthorized.js";
import renderRegistration from "./renderRegistration.js"
import Store from "./store.js";

export default function renderLogin() {
    // check authorization by token
    if (localStorage.getItem('token')) {
        const store = Store.instance;
        store.user.token = localStorage.getItem('token');
        userAuthorized();
        return;
    }

    history.pushState("renderLogin", '', 'login');
    document.body.innerHTML = '';
    document.body.innerHTML = `
        <div id="registration">
            <div>Пожалуйста, авторизируйтесь или зарегистрируйтесь</div>
            <div>Email</div>
            <input type="email">
            <div>Пароль</div>
            <input type="password">
            <br>
            <button id="sign-in">Войти</button>
            <br>
            <div id="sign-up">Зарегистрироваться</div>
        </div>
    `;

    // setup listeners IIFE
    void function Listeners() {
        document.getElementById('sign-in').addEventListener('click', sendRequestForChecking);

        document.querySelector('input[type="password"]').addEventListener('keypress', e => {
            if (e.key == 'Enter') sendRequestForChecking();
        });

        document.getElementById('sign-up').addEventListener('click', () => renderRegistration());

        function sendRequestForChecking() {
            let email = document.querySelector('input[type="email"]').value;
            let password = document.querySelector('input[type="password"]').value;

            Backend.login({
                "email": email,
                "password": password
            })
                .then( info => {
                    localStorage.setItem('token', info.token);

                    const store = Store.instance;

                    store.user.token = localStorage.getItem('token');
                    userAuthorized();
                })
        }
    }();
}