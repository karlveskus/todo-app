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
          <input type="checkbox" value="None" id="checkbox-${taskId}" name="check" ${completed ? 'checked' : ''}/>
          <label for="checkbox-${taskId}"></label>
      </div>
      <p class="${completed ? 'completed' : ''}">${taskDescription}</p>
    `;

    taskElements[taskId] = task;

    checkbox = task.firstElementChild.firstElementChild;
    checkbox.addEventListener('click', function switchModelStatus() {
      model.switchTaskStatus(taskId, function switchViewStatus(completed) {
        switchTaskStatus(taskId, completed);
      });
    });

    taskList.insertBefore(task, taskList.firstChild);
  }

  function switchTaskStatus(taskId, completed) {
    let taskElement = taskElements[taskId].lastElementChild;
    taskElement.className = completed ? 'completed' : '';
  }

  function setEventListeners() {
    newTaskButton.addEventListener('click', newTaskClickHandler);
    taskList.addEventListener('DOMNodeInserted', taskListChangeHandler);
    taskList.addEventListener('DOMNodeRemoved', taskListChangeHandler);

    function newTaskClickHandler() {
      let description = newTaskInput.value;

      if (description.length > 0) {
        model.addTask(description, (taskId) => {
          addNewTask(taskId, description, false);
        });

        newTaskInput.value = '';
      }
    }

    function taskListChangeHandler() {
      let taskCount = Object.keys(taskElements).length;
      setTasksCount(taskCount);

      if (taskCount === 0) {
        setEmptyTaskListMessage();
      } else {
        removeEmptyTaskListMessage();
      }
    }
  }

  function setEmptyTaskListMessage() {
    taskList.innerHTML = '<p class="empty-list-message">You todo list is currently empty</p>';
  }

  function removeEmptyTaskListMessage() {
    taskList.getElementsByClassName('empty-list-message')[0].innerHTML = '';
  }

  function initView() {
    helpers = global.app.helpers;
    model = global.app.model;

    setEmptyTaskListMessage();
    setEventListeners();
    setDateAndMonth();

    model.getTasks(function addTasks(tasks) {
      Object.keys(tasks).forEach(function addTask(key) {
        addNewTask(key, tasks[key].description, tasks[key].completed);
      });
    });
  }

  let publicAPI = {
    init: initView,
  };

  global.app = global.app || {};
  global.app.view = publicAPI;
}(window));
