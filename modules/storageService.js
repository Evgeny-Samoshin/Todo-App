export const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

export const setStorage = (key, obj) => {
  const data = getStorage(key);
  if (obj) {
    data.push(obj);
  };
  
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeStorage = (key, id) => {
  const data = getStorage(key);
  const newData = JSON.stringify(data.filter(item => item.id !== id));
  
  localStorage.setItem(key, newData);
};

export const changeStausStorage = (key, id, status) => {
  const data = getStorage(key);
  const newData = data.map(task => {
    if (task.id === id) {
      task.status = status;
      return task;
    } else {
      return task;
    };
  });

  localStorage.setItem(key, JSON.stringify(newData));
};

export const setStorageItemText = (key, id, text) => {
  const data = getStorage(key);
  const newData = data.map(task => {
    if (task.id === id) {
      task.text = text;
      return task;
    } else {
      return task;
    };
  });

  localStorage.setItem(key, JSON.stringify(newData));
};

