function Model() {
  const localStorageKey = 'tasks';
  let tasks;

  function getTasks() {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
  }

  function saveTasks() {
    localStorage.setItem(localStorageKey, JSON.stringify(tasks));
  }

  function addTask(description) {
    let taskId;

    if (tasks.length) {
      // If task list is not empty, then get ID of the last task and add 1 to get a new task ID
      let lastTask = tasks[tasks.length - 1];
      taskId = lastTask.id + 1;
    } else {
      taskId = 0;
    }

    tasks.push({
      id: taskId,
      description,
      completed: false,
    });
    saveTasks();

    return taskId;
  }

  function filterTasksAndGetIDs(predicate) {
    return tasks
      .filter(predicate)
      .map(task => task.id);
  }

  function getCompletedTaskIds() {
    let completed = task => task.completed === true;
    return filterTasksAndGetIDs(completed);
  }

  function getActiveTaskIds() {
    let active = task => task.completed === false;
    return filterTasksAndGetIDs(active);
  }

  function switchTaskStatus(taskId) {
    let newStatus;

    tasks = tasks.map((task) => {
      if (task.id === taskId) {
        newStatus = !task.completed;
        return Object.assign({}, task, { completed: newStatus });
      }
      return task;
    });
    saveTasks();

    return newStatus;
  }

  function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
  }

  function resetTasks() {
    tasks = [];
    localStorage.removeItem(localStorageKey);
  }

  function init() {
    tasks = getTasks();
  }

  let publicAPI = {
    init,
    getTasks,
    addTask,
    switchTaskStatus,
    getCompletedTaskIds,
    getActiveTaskIds,
    removeTask,
    resetTasks,
  };

  return publicAPI;
}

export default Model();
