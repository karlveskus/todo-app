function Model() {
  var tasks = {}; // {id: {description, completed}}
  var publicAPI;

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

  function getActiveTaskCount(callback) {
    callback(Object
      .entries(tasks)
      .filter(task => task[1].completed === false)
      .length);
  }

  function getCompletedTaskIds(callback) {
    return filterTasksByStatus(true, callback);
  }

  function getActiveTaskIds(callback) {
    return filterTasksByStatus(false, callback);
  }

  function filterTasksByStatus(isCompleted, callback) {
    getTasks((tasks) => {
      callback(Object
        .keys(tasks)
        .filter(id => tasks[id].completed === isCompleted));
    });
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

  publicAPI = {
    init,
    getTasks,
    addTask,
    switchTaskStatus,
    getCompletedTaskIds,
    getActiveTaskIds,
    getActiveTaskCount,
  };

  return publicAPI;
}

export default Model();
