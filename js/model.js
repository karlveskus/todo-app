(function IIFE(global) {
  var tasks;
  var view;

  function addTask(description, completed) {
    let taskId = Object.keys(tasks).length;

    tasks[taskId] = {
      description,
      completed,
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    view.addNewTask(taskId, description, completed);
    view.setTasksCount(Object.keys(tasks).length);

    return taskId;
  }

  function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return JSON.parse(tasks);
  }

  function switchTaskStatus(taskId) {
    let completed = tasks[taskId].completed;
    tasks[taskId].completed = !completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    view.switchTaskStatus(taskId, !completed);
  }

  function init() {
    let localStorageTasks;

    view = global.app.view;
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
