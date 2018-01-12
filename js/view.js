(function IIFE(global) {
  var helpers;
  var model;

  const dateText = document.getElementById('date');
  const monthText = document.getElementById('month');
  const taskCountText = document.getElementById('task-count');
  const newTaskInput = document.getElementById('new-task-input');
  const newTaskButton = document.getElementById('new-task-button');
  const taskList = document.getElementById('task-list');

  function setDateAndMonth() {
    let [day, date] = helpers.getCurrentDay();
    dateText.innerHTML = `<span class="day">${day},</span> ${date}`;
    monthText.innerHTML = helpers.getCurrentMonth();
  }

  function setTasksCount(taskCount) {
    taskCountText.innerHTML = `${taskCount} Active tasks`;
  }

  function addNewTask(taskId, taskDescription) {
    let task = document.createElement('li');
    task.innerHTML = `
      <div class="checkbox">
          <input type="checkbox" value="None" id="checkbox-${taskId}" name="check" />
          <label for="checkbox-${taskId}"></label>
      </div>
      <p>${taskDescription}</p>
    `;

    taskList.insertBefore(task, taskList.firstChild);
  }

  function setEventListeners() {
    newTaskButton.addEventListener('click', () => {
      let taskDescription = newTaskInput.value;

      if (taskDescription.length > 0) {
        model.addTask(taskDescription);
      }
    });
  }

  function initView() {
    let tasks;

    helpers = global.app.helpers;
    model = global.app.model;

    setEventListeners();
    setDateAndMonth();

    tasks = model.getTasks();
    setTasksCount(Object.keys(tasks).length);

    Object.keys(tasks).forEach((key) => {
      addNewTask(key, tasks[key]);
    });
  }

  let publicAPI = {
    init: initView,
    addNewTask,
    setTasksCount,
  };

  global.app = global.app || {};
  global.app.view = publicAPI;
}(window));
