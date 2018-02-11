import Helpers from './helpers';
import Model from './model';

function View() {
  let taskElements = {}; // {id: DOMElement}
  let publicAPI;

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
    let today = new Date();
    let day = Helpers.getCurrentDay(today);
    let date = Helpers.getCurrentDate(today);
    let month = Helpers.getCurrentMonth(today);

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
          <input type="checkbox" id="checkbox-${id}" ${isCompleted ? 'checked' : ''}/>
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

    Model.switchTaskStatus(id, function toggleCompletedClassName(isCompleted) {
      if (isCompleted === true) {
        taskTextElement.className = 'completed';
      } else {
        taskTextElement.className = '';
      }
      updateActiveTasksCount();
    });
  }

  function updateActiveTasksCount() {
    Model.getActiveTaskCount(setTasksCount);
  }

  function setEventListeners() {
    newTaskButton.addEventListener('click', newTaskClickHandler);
    newTaskInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        newTaskButton.click();
      }
    });

    taskList.addEventListener('DOMNodeInserted', taskListChangeHandler);
    taskList.addEventListener('DOMNodeRemoved', taskListChangeHandler);

    showAll.addEventListener('click', () => {
      showAllTasks();
      setFilterMenuActive(showAll);
    });
    showActive.addEventListener('click', () => {
      showActiveTasks();
      setFilterMenuActive(showActive);
    });
    showCompleted.addEventListener('click', () => {
      showCompletedTasks();
      setFilterMenuActive(showCompleted);
    });
  }

  function newTaskClickHandler() {
    let description = newTaskInput.value;

    if (description.length > 0) {
      Model.addTask(description, (taskId) => {
        addNewTask(taskId, description, false);
      });

      newTaskInput.value = '';
    }
  }

  function taskListChangeHandler() {
    updateActiveTasksCount();

    Model.getTasks((tasks) => {
      if (Object.entries(tasks).length === 0) {
        Helpers.showElement(emptyListMessage);
      } else {
        Helpers.hideElement(emptyListMessage);
      }
    });
  }

  function showAllTasks() {
    Object.values(taskElements).forEach((task) => {
      Helpers.showElement(task);
    });
  }

  function showActiveTasks() {
    Model.getActiveTaskIds((activeTaskIds) => {
      filterTasks(activeTaskIds);
    });
  }

  function showCompletedTasks() {
    Model.getCompletedTaskIds((completedTaskIds) => {
      filterTasks(completedTaskIds);
    });
  }

  function setFilterMenuActive(filter) {
    [showAll, showActive, showCompleted].forEach((element) => {
      if (element === filter) {
        element.className = 'active';
      } else {
        element.className = '';
      }
    });
  }

  function filterTasks(taskIds) {
    Object.entries(taskElements).forEach(([taskId, taskElement]) => {
      if (taskIds.includes(taskId)) {
        Helpers.showElement(taskElement);
      } else {
        Helpers.hideElement(taskElement);
      }
    });
  }

  function init() {
    Helpers.showElement(emptyListMessage);
    setEventListeners();
    setDateAndMonth();

    Model.getTasks(function addTasks(tasks) {
      Object.entries(tasks).forEach(([taskId, task]) => {
        addNewTask(taskId, task.description, task.completed);
      });
    });
  }

  publicAPI = {
    init,
  };

  return publicAPI;
}

export default View();
