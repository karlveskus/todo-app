(function IIFE(global) {
  var tasks;

  function addTask(description, callback) {
    let taskId = Object.keys(tasks).length;

    tasks[taskId] = {
      description,
      completed: false,
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    callback(taskId);
  }

  function getTasks(callback) {
    let tasks = localStorage.getItem('tasks');

    callback(JSON.parse(tasks));
  }

  function switchTaskStatus(taskId, callback) {
    let swappedStatus = !tasks[taskId].completed;
    tasks[taskId].completed = swappedStatus;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    callback(swappedStatus);
  }

  function init() {
    let localStorageTasks;

    localStorageTasks = localStorage.getItem('tasks');

    if (localStorageTasks) {
      tasks = JSON.parse(localStorageTasks);
    } else {
      localStorage.setItem('tasks', JSON.stringify({}));
      tasks = {};
    }
  }

  let publicAPI = {
    init,
    getTasks,
    addTask,
    switchTaskStatus,
  };

  global.app = global.app || {};
  global.app.model = publicAPI;
}(window));
