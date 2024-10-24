import { autentification } from "./modules/control.js";

{
  const app = document.querySelector('.app-container');

  const init = (app) => {
    autentification(app);
  };

  document.addEventListener('DOMContentLoaded', () => {
    init(app);
  });
};