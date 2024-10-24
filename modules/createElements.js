const createAppTitle = () => {
  const title = document.createElement('h3');
  title.textContent = 'Todo App';

  return title;
};

const createButtonsGroup = params => {
  const btns = params.map(({ className, type, text }) => {
    const btn = document.createElement('button');
    btn.className = className;
    btn.type = type;
    btn.textContent = text;
    return btn;
  });

  return btns;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add("d-flex", "align-items-center", "mb-3");

  const formInputLabel = document.createElement('label');
  formInputLabel.classList.add('form-group', 'me-3', 'mb-0');

  const formInput = document.createElement('input');
  formInput.classList.add('form-control');
  formInput.type = 'text';
  formInput.name = 'text';
  formInput.placeholder = 'ввести задачу';

  formInputLabel.append(formInput);

  const formSelectLabel = document.createElement('label');
  formSelectLabel.classList.add('form-group', 'me-3', 'mb-0');

  formSelectLabel.insertAdjacentHTML(`afterbegin`,
    `<select class="form-select" name="priority">
      <option value="" selected>Выберите приоритет</option>
      <option value="table-light">Обычная</option>
      <option value="table-warning">Важная</option>
      <option value="table-danger">Срочная</option>
    </select>`
  );

  const btnGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Сохранить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },
  ]);

  form.append(formInputLabel, formSelectLabel, ...btnGroup);

  form.input = formInput;
  form.btnAdd = btnGroup[0];
  form.btnAdd.disabled = true;
  form.btnReset = btnGroup[1];

  return form;
};

const createRow = ({ text, priority, status, id }, index) => {
  const tr = document.createElement('tr');
  const statusStyle = status === 'Выполнена' ? 'table-success' : priority;
  tr.classList.add(statusStyle);
  tr.setAttribute('data-id', id);

  const taskIndex = index + 1;
  const btnContainer = document.createElement('td');
  const btnGroup = createButtonsGroup([
    {
      className: 'btn btn-danger me-1',
      type: 'button',
      text: ' Удалить ',
    },
    {
      className: 'btn btn-success me-1',
      type: 'button',
      text: ' Завершить ',
    },
    {
      className: 'btn btn-info',
      type: 'button',
      text: ' Редактировать ',
    },
  ]);

  btnContainer.append(...btnGroup);

  tr.insertAdjacentHTML('afterbegin', `
    <td>${taskIndex}</td>
    <td class="${status === 'Выполнена' ? 'text-decoration-line-through' : 'text'}">
      ${text}
    </td>
    <td>${status}</td>
  `);

  tr.append(btnContainer);

  tr.btnDel = btnGroup[0];
  tr.btnCompleate = btnGroup[1];
  tr.btnEdit = btnGroup[2];

  return tr;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('afterbegin', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');
  table.append(thead, tbody);

  tableWrapper.append(table);

  return {
    tableWrapper,
    table,
    tbody,
  };
};

const createModal = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay', 'is-visible');

  const formModal = document.createElement('form');
  formModal.classList.add('form');

  const formHeader = document.createElement('div');
  formHeader.classList.add('modal-header');

  const formTitle = document.createElement('h3');
  formTitle.classList.add('form-title');
  formTitle.innerText = 'Введите логин';

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('btn-close');
  closeBtn.type = 'button';

  formModal.append(closeBtn, formTitle);

  formModal.insertAdjacentHTML('beforeend', `
    <div class="mb-3">
      <input class="form-input" type="text" name="name" id="name" required>
    </div>
  `);

  const btnGroup = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Ввести',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  formModal.append(...btnGroup);
  formModal.submitBtn = btnGroup[0];
  formModal.resetBtn = btnGroup[1];

  overlay.append(formModal);

  return {
    overlay,
    formModal,
    closeBtn,
  };
};

export {
  createAppTitle,
  createForm,
  createRow,
  createTable,
  createModal,
};
