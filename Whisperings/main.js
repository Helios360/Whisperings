import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Main } from "./components/Main";

const app = document.querySelector('#app');

const render = async () => {
    app.innerHTML = `
        ${Header()}
        <div id="content-area"></div>
        ${Footer()}
  `;
    const contentArea = document.querySelector('#content-area');
    contentArea.innerHTML = await Main();
};

render();