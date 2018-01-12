(function IIFE(global) {
  var tasks;
  var view;

  function addTask(description) {
    let taskId = Object.keys(tasks).length;

    tasks[taskId] = description;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    view.addNewTask(taskId, description);
    view.setTasksCount(Object.keys(tasks).length);
  }

  function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return JSON.parse(tasks);
  }

  function init() {
    let localStorageTasks;

    view = global.app.view;
    localStorageTasks = localStorage.getItem('tasks');

    if (localStorageTasks) {
      tasks = JSON.parse(localStorageTasks);
    } else {
      localStorage.setItem('tasks', JSON.stringify({}));
    }
  }

  let publicAPI = {
    init,
    getTasks,
    addTask,
  };

  global.app = global.app || {};
  global.app.model = publicAPI;
}(window));
