(function IIFE(global) {
  var tasks = {};

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

  function getCompletedTaskIds(callback) {
    return callback(filterTasksByComplitionStatus(true));
  }

  function getActiveTaskIds(callback) {
    return callback(filterTasksByComplitionStatus(false));
  }

  function filterTasksByComplitionStatus(completed) {
    let taskIds = [];

    getTasks((tasks) => {
      Object.entries(tasks).forEach((task) => {
        if (task[1].completed === completed) {
          taskIds.push(task[0]);
        }
      });
    });

    return taskIds;
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
    }
  }

  let publicAPI = {
    init,
    getTasks,
    addTask,
    switchTaskStatus,
    getCompletedTaskIds,
    getActiveTaskIds,
  };

  global.app = global.app || {};
  global.app.model = publicAPI;
}(window));
