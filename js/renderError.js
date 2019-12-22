import ErrorWindow from "./errorWindow.js";

customElements.define('error-window', ErrorWindow);

export default function renderAlert(error, color) {
    const window = document.createElement('error-window');

    document.body.append(window);
    window.render(error, color);
    return error;
}