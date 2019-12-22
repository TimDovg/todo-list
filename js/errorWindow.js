// using shadowRoot & template

const template = document.createElement('template');

template.innerHTML = `
    <style type="text/css">
        .window {
            font-weight: bold;
            background: #434783;
            padding: 10px 30px 10px 10px;
            position: fixed;
            width: 200px;
            bottom: 0px;
            right: 0px;
            z-index: 2;
            color: red;
            word-break: break-all;
            transition: width 2s;
        }
       
        .button {
            cursor: pointer;
            margin-right: 5px;
            margin-top: 5px;
            padding: 1px 5px;
            border: 1px solid white;
            color: white;
            position: absolute;
            top: 0px;
            right: 0px;
        }
    </style>
    <div class="window">
        <div class="text"></div>
        <div class="button">X</div>
    </div>
`;

export default class ErrorWindow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    render(error, color) {
        const temp = template.content.cloneNode(true);
        temp.querySelector('.text').innerHTML = error;
        // для зеленой окраски
        if (color == 'lightgreen') temp.querySelector('.text').style.color = 'lightgreen';

        temp.querySelector('.button').addEventListener('click', () => document.querySelector('error-window').remove());
        this.shadowRoot.append(temp);
        setTimeout(() => document.querySelector('error-window').remove(), 3000);
    }
}