import { renderApp, renderTasks, renderModal } from "./render.js";
import { getStorage, setStorage, removeStorage, changeStausStorage, setStorageItemText } from "./storageService.js";

export const formControl = (form, tbody, userName) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    const randomInt = Math.random().toString().substring(2, 10);
    const statusDefault = 'В процессе';

    newTask.id = randomInt;
    newTask.status = statusDefault;

    if (newTask.priority === '') {
      alert('Выберите приоритет задачи!');
    } else {
      setStorage(userName, newTask);
      renderTasks(tbody, getStorage(userName), userName);
      
      form.reset();
      form.btnAdd.disabled = true;
    }
  });

  ['keyup', 'change'].forEach(event => {
    form.input.addEventListener(event, e => {      
      if (e.target.value === '') {
        form.btnAdd.disabled = true;
      } else {
        form.btnAdd.disabled = false;
      }
    });
  });

  form.btnReset.addEventListener('click', () => {
    form.btnAdd.disabled = true;
  });
};

export const deleteControl = (tbody, userName) => {
  tbody.querySelectorAll('.btn-danger').forEach(btn => {
    btn.addEventListener('click', e => {
      if (confirm('Подтвердите действие')) {
        const taskID = e.target.closest('tr').getAttribute('data-id');
        removeStorage(userName, taskID);
        renderTasks(tbody, getStorage(userName), userName);
      };
    });
  });
};

export const compleateControl = (tbody, userName) => {
  tbody.querySelectorAll('.btn-success').forEach(btn => {
    btn.addEventListener('click', e => {
      const tr = e.target.closest('tr');
      
      const taskID = tr.getAttribute('data-id');
      
      const status = 'Выполнена';
      
      changeStausStorage(userName, taskID, status);
      renderTasks(tbody, getStorage(userName), userName);
    });
  });
};

export const editControl = (tbody, userName) => {
  tbody.querySelectorAll('.btn-info').forEach(btn => {
    btn.addEventListener('click', e => {
      const tr = e.target.closest('tr');
      const text = tr.querySelector('.text');
      const taskID = tr.getAttribute('data-id');

      if (text) {
        text.setAttribute('contenteditable', 'true');
        text.focus();
        
        text.addEventListener('blur', () => {
          text.setAttribute('contenteditable', 'false');
          setStorageItemText(userName, taskID, text.innerText);
        });
      };
    });
  });
};

const closeModal = overlay => overlay.classList.remove('is-visible');

export const modalFormControl = (overlay, formModal, user, app) => {
  formModal.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);    
    user = Object.fromEntries(formData);
    
    setStorage(user.name)
    formModal.reset();
    closeModal(overlay);

    const userName = user.name;
    console.log('user ', userName);

    if (userName) {
      const {
        form,
        tbody,
      } = renderApp(app);
  
      const data = getStorage(userName);
      
      renderTasks(tbody, data, userName);
      formControl(form, tbody, userName);
      deleteControl(tbody, userName);
      compleateControl(tbody, userName);
      editControl(tbody, userName);
    };
  });
};

export const modalControl = (overlay, {resetBtn}, closeBtn) => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay ||
        e.target === closeBtn ||
        e.target === resetBtn) {
      closeModal(overlay);
    }
  });
};

export const autentification = (app) => {
  const user = {};

  const {
    overlay,
    formModal,
    closeBtn,
  } = renderModal(app);

  modalControl(overlay, formModal, closeBtn);
  modalFormControl(overlay, formModal, user, app);
};
