(function IIFE(global) {
  var helpers;
  var model;
  var taskElements = {}; // {id: DOMElement}
  var publicAPI;

  const dateText = document.getElementById('date');
  const monthText = document.getElementById('month');
  const taskCountText = document.getElementById('task-count');
  const newTaskInput = document.getElementById('new-task-input');
  const newTaskButton = document.getElementById('new-task-button');
  const taskList = document.getElementById('task-list');
  const showAll = document.getElementById('show-all');
  const showActive = document.getElementById('show-active');
  const showCompleted = document.getElementById('show-completed');

  const emptyListMessage = taskList.querySelector('.empty-list-message');

  function setDateAndMonth() {
    let [day, date] = helpers.getCurrentDay();
    let month = helpers.getCurrentMonth();

    dateText.innerHTML = `<span class="day">${day},</span> ${date}`;
    monthText.innerHTML = month;
  }

  function setTasksCount(taskCount) {
    taskCountText.innerHTML = `${taskCount} Active tasks`;
  }

  function addNewTask(id, description, isCompleted) {
    let checkbox;
    let task = document.createElement('li');

    task.innerHTML = `
      <div class="checkbox">
          <input type="checkbox" value="None" id="checkbox-${id}" name="check" ${isCompleted ? 'checked' : ''}/>
          <label for="checkbox-${id}"></label>
      </div>
      <p class="${isCompleted ? 'completed' : ''}">${description}</p>
    `;

    taskElements[id] = task;

    checkbox = task.querySelector('input');
    checkbox.addEventListener('click', () => switchTaskStatus(id));

    taskList.insertBefore(task, taskList.firstChild);
  }

  function switchTaskStatus(id) {
    let taskTextElement = taskElements[id].lastElementChild;

    model.switchTaskStatus(id, function toggleCompletedClassName(isCompleted) {
      if (isCompleted === true) {
        taskTextElement.className = 'completed';
      } else {
        taskTextElement.className = '';
      }
      updateActiveTasksCount();
    });
  }

  function updateActiveTasksCount() {
    model.getActiveTaskCount(setTasksCount);
  }

  function setEventListeners() {
    newTaskButton.addEventListener('click', newTaskClickHandler);

    taskList.addEventListener('DOMNodeInserted', taskListChangeHandler);
    taskList.addEventListener('DOMNodeRemoved', taskListChangeHandler);

    showAll.addEventListener('click', showAllTasks);
    showActive.addEventListener('click', showActiveTasks);
    showCompleted.addEventListener('click', showCompletedTasks);

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
      updateActiveTasksCount();

      if (taskCount === 0) {
        helpers.showElement(emptyListMessage);
      } else {
        helpers.hideElement(emptyListMessage);
      }
    }

    function showAllTasks() {
      Object.entries(taskElements).forEach((task) => {
        helpers.showElement(task[1]);
      });
    }

    function showCompletedTasks() {
      model.getCompletedTaskIds((completedTaskIds) => {
        filterTasks(completedTaskIds);
      });
    }

    function showActiveTasks() {
      model.getActiveTaskIds((activeTaskIds) => {
        filterTasks(activeTaskIds);
      });
    }

    function filterTasks(taskIds) {
      Object.entries(taskElements).forEach(([taskId, taskElement]) => {
        if (taskIds.includes(taskId)) {
          helpers.showElement(taskElement);
        } else {
          helpers.hideElement(taskElement);
        }
      });
    }
  }

  function init() {
    helpers = global.app.helpers;
    model = global.app.model;

    helpers.showElement(emptyListMessage);
    setEventListeners();
    setDateAndMonth();

    model.getTasks(function addTasks(tasks) {
      Object.keys(tasks).forEach(function addTask(key) {
        addNewTask(key, tasks[key].description, tasks[key].completed);
      });
    });
  }

  publicAPI = {
    init,
  };

  global.app = global.app || {};
  global.app.view = publicAPI;
}(window));
