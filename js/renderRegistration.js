import Backend from "./backend.js";
import renderLogin from "./renderLogin.js";

export default function renderRegistration() {
    history.pushState('registration', '', 'registration');
    document.body.innerHTML = '';
    document.body.innerHTML = `
        <div id="registration">
            <div>Пожалуйста, авторизируйтесь или зарегистрируйтесь</div>
            <div>Email</div>
            <input type="email">
            <div>Логин</div>
            <input class="login">
            <div>Пароль</div>
            <input type="password">
            <br>
            <button class="sign-up">Зарегистрироваться</button>
        </div>
    `;

    document.querySelector('.sign-up').addEventListener('click', sendRequestForChecking);

    document.querySelector('input[type="password"]').addEventListener('keypress', e => {
        if (e.key == 'Enter') sendRequestForChecking();
    });

    function sendRequestForChecking() {
        let email = document.querySelector('input[type="email"]').value;
        let password = document.querySelector('input[type="password"]').value;
        let username = document.querySelector('.login').value;

        Backend.register({
            "email": email,
            "password": password,
            "username": username,
        })
            .then(() => renderLogin())
    }
}