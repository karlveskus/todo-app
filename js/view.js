(function IIFE(global) {
  var helpers;
  var model;
  var taskElements = {};

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

  function addNewTask(taskId, taskDescription, completed) {
    let checkbox;
    let task = document.createElement('li');

    task.innerHTML = `
      <div class="checkbox">
          <input type="checkbox" value="None" id="checkbox-${taskId}" name="check"/>
          <label for="checkbox-${taskId}"></label>
      </div>
      <p class="${completed ? 'completed' : ''}">${taskDescription}</p>
    `;

    taskElements[taskId] = task;

    checkbox = task.firstElementChild.firstElementChild;

    if (completed) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    checkbox.addEventListener('click', (e) => {
      let taskId = Number(e.target.id.split('-')[1]);
      model.switchTaskStatus(taskId);
    });

    taskList.insertBefore(task, taskList.firstChild);
  }

  function switchTaskStatus(taskId, completed) {
    var taskElement = taskElements[taskId];

    if (completed === true) {
      taskElement.lastElementChild.className = 'completed';
    } else {
      taskElement.lastElementChild.className = '';
    }

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
      addNewTask(key, tasks[key].description, tasks[key].completed);
    });
  }

  let publicAPI = {
    init: initView,
    addNewTask,
    setTasksCount,
    switchTaskStatus,
  };

  global.app = global.app || {};
  global.app.view = publicAPI;
}(window));
