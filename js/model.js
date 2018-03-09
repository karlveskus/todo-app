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
    let taskId = tasks.length;

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
    let newStatus = !tasks[taskId].completed;
    tasks[taskId].completed = newStatus;
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
