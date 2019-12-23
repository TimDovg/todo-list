import renderLogin from "./renderLogin.js";
import userAuthorized from "./userAuthorized.js";
import renderRegistration from "./renderRegistration.js";
import renderAlert from "./renderError.js";

renderLogin();

window.addEventListener('popstate', e => {
    switch (e.state) {
        case 'renderLogin':
            renderLogin();
            break;

        case 'registration':
            renderRegistration();
            break;

        case 'authorized':
            if (!localStorage.getItem('token')) {
                renderAlert(`You are not authorized!<br>Sign-in, please.`);
                break;
            }

            userAuthorized();
            break;
    }
});