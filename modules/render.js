import { compleateControl, deleteControl, editControl } from './control.js';
import {
  createAppTitle,
  createForm,
  createModal,
  createRow,
  createTable,
} from './createElements.js';

export const renderApp = (app) => {
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-column');

  const title = createAppTitle();
  const form = createForm();
  const {tableWrapper, tbody} = createTable();

  app.append(title, form, tableWrapper);

  return {
    form,
    tbody,
  };
};

export const renderModal = (app) => {
  const {overlay, formModal, closeBtn} = createModal();

  app.append(overlay);

  return {
    overlay,
    formModal,
    closeBtn,
  };
};

export const renderTasks = (tbody, data, userName) => {
  const tasks = data.map(createRow);

  tbody.innerHTML = '';
  tbody.append(...tasks);
  
  deleteControl(tbody, userName);
  compleateControl(tbody, userName);
  editControl(tbody, userName);
  
  return tasks;
};
