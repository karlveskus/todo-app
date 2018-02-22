import Helpers from './helpers';
import Model from './model';

function View() {
  let taskElements = {}; // {id: DOMElement}

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
    let currentTime = Date.now();
    let day = Helpers.getCurrentDay(currentTime);
    let date = Helpers.getCurrentDate(currentTime);
    let month = Helpers.getCurrentMonth(currentTime);

    dateText.innerHTML = `<span class="day">${day},</span> ${date}`;
    monthText.innerHTML = month;
  }

  function setTasksCount(taskCount) {
    taskCountText.innerHTML = `${taskCount} Active tasks`;
  }

  function addTask(id, description, isCompleted) {
    let task = document.createElement('li');

    task.innerHTML = `
      <div class="checkbox">
          <input type="checkbox" id="checkbox-${id}" ${isCompleted ? 'checked' : ''}/>
          <label for="checkbox-${id}"></label>
      </div>
      <p class="${isCompleted ? 'completed' : ''}">${description}</p>
      <span class="remove-task" title="Remove this task">&#10005;</span>
    `;

    taskElements[id] = task;

    let checkbox = task.querySelector('input');
    checkbox.addEventListener('click', () => switchTaskStatus(id));

    let removeTaskButton = task.querySelector('span');
    removeTaskButton.addEventListener('click', () => removeTask(id));

    taskList.insertBefore(task, taskList.firstChild);
  }

  function switchTaskStatus(id) {
    let taskTextElement = taskElements[id].querySelector('p');
    let isCompleted = Model.switchTaskStatus(id);

    if (isCompleted === true) {
      taskTextElement.className = 'completed';
    } else {
      taskTextElement.className = '';
    }

    updateActiveTasksCount();
  }

  function removeTask(id) {
    Model.removeTask(id);
    let taskElement = taskElements[id];
    delete taskElements[id];
    taskList.removeChild(taskElement);
  }

  function updateActiveTasksCount() {
    let activeTaskCount = Model.getActiveTaskIds().length;
    setTasksCount(activeTaskCount);
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
      let taskId = Model.addTask(description);
      addTask(taskId, description, false);

      newTaskInput.value = '';
    }
  }

  function taskListChangeHandler() {
    let tasks = Model.getTasks();
    updateActiveTasksCount();

    if (Object.entries(tasks).length === 0) {
      Helpers.showElement(emptyListMessage);
    } else {
      Helpers.hideElement(emptyListMessage);
    }
  }

  function showAllTasks() {
    Object.values(taskElements).forEach((task) => {
      Helpers.showElement(task);
    });
  }

  function showActiveTasks() {
    let activeTaskIds = Model.getActiveTaskIds();
    filterTasks(activeTaskIds);
  }

  function showCompletedTasks() {
    let completedTaskIds = Model.getCompletedTaskIds();
    filterTasks(completedTaskIds);
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
      if (taskIds.includes(Number(taskId))) {
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

    Model.getTasks().forEach((task) => {
      addTask(task.id, task.description, task.completed);
    });
  }

  let publicAPI = {
    init,
  };

  return publicAPI;
}

export default View();
