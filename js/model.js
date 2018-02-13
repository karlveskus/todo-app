function Model() {
  const localStorageKey = 'tasks';

  let publicAPI;

  function addTask(description, callback) {
    getTasks((tasks) => {
      let taskId = Object.keys(tasks).length;

      tasks[taskId] = {
        description,
        completed: false,
      };
      setTasks(tasks);

      callback(taskId);
    });
  }

  function getActiveTaskCount(callback) {
    getTasks((tasks) => {
      callback(Object.entries(tasks)
        .filter(task => task[1].completed === false)
        .length);
    });
  }

  function getCompletedTaskIds(callback) {
    getTasks((tasks) => {
      callback(Object
        .keys(tasks)
        .filter(id => tasks[id].completed === true));
    });
  }

  function getActiveTaskIds(callback) {
    getTasks((tasks) => {
      callback(Object
        .keys(tasks)
        .filter(id => tasks[id].completed === false));
    });
  }

  function switchTaskStatus(taskId, callback) {
    getTasks((tasks) => {
      let newStatus = !tasks[taskId].completed;
      tasks[taskId].completed = newStatus;
      setTasks(tasks);

      callback(newStatus);
    });
  }

  function removeTask(id, callback) {
    getTasks((tasks) => {
      delete tasks[id];
      setTasks(tasks);

      callback(tasks);
    });
  }

  function resetTasks() {
    localStorage.removeItem(localStorageKey);
  }

  function getTasks(callback) {
    let tasks = JSON.parse(localStorage.getItem(localStorageKey)) || {};
    callback(tasks);
  }

  function setTasks(tasksGot) {
    localStorage.setItem(localStorageKey, JSON.stringify(tasksGot));
  }

  publicAPI = {
    getTasks,
    addTask,
    switchTaskStatus,
    getCompletedTaskIds,
    getActiveTaskIds,
    getActiveTaskCount,
    removeTask,
    resetTasks,
  };

  return publicAPI;
}

export default Model();
