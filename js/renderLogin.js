export default function renderLogin() {
    document.body.innerHTML = '';
    document.body.innerHTML = `
        <div id="registration">
            <div>Пожалуйста, авторизируйтесь или зарегистрируйтесь</div>
            <div>Email</div>
            <input type="email">
            <div>Логин</div>
            <input>
            <div>Пароль</div>
            <input type="password">
            <br>
            <button id="sign-in">Войти</button>
            <br>
            <button id="sign-up">Зарегистрироваться</button>
        </div>
    `;
}