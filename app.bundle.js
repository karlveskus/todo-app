/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(5);
__webpack_require__(6);
module.exports = __webpack_require__(7);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function setHelpers(global) {
  function getCurrentDay() {
    // TODO
    return ['Friday', '12th'];
  }

  function getCurrentMonth() {
    // TODO
    return 'January';
  }

  function showElement(element) {
    element.style.display = 'block';
  }

  function hideElement(element) {
    element.style.display = 'none';
  }

  var publicAPI = {
    getCurrentDay: getCurrentDay,
    getCurrentMonth: getCurrentMonth,
    showElement: showElement,
    hideElement: hideElement
  };

  global.app = global.app || {};
  global.app.helpers = publicAPI;
})(window);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function IIFE(global) {
  var tasks = {}; // {id: {description, completed}}
  var publicAPI;

  function addTask(description, callback) {
    var taskId = Object.keys(tasks).length;

    tasks[taskId] = {
      description: description,
      completed: false
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    callback(taskId);
  }

  function getTasks(callback) {
    var tasks = localStorage.getItem('tasks');

    callback(JSON.parse(tasks));
  }

  function getActiveTaskCount(callback) {
    callback(Object.entries(tasks).filter(function (task) {
      return task[1].completed === false;
    }).length);
  }

  function getCompletedTaskIds(callback) {
    return filterTasksByStatus(true, callback);
  }

  function getActiveTaskIds(callback) {
    return filterTasksByStatus(false, callback);
  }

  function filterTasksByStatus(isCompleted, callback) {
    getTasks(function (tasks) {
      callback(Object.keys(tasks).filter(function (id) {
        return tasks[id].completed === isCompleted;
      }));
    });
  }

  function switchTaskStatus(taskId, callback) {
    var swappedStatus = !tasks[taskId].completed;
    tasks[taskId].completed = swappedStatus;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    callback(swappedStatus);
  }

  function init() {
    var localStorageTasks = void 0;

    localStorageTasks = localStorage.getItem('tasks');

    if (localStorageTasks) {
      tasks = JSON.parse(localStorageTasks);
    } else {
      localStorage.setItem('tasks', JSON.stringify({}));
    }
  }

  publicAPI = {
    init: init,
    getTasks: getTasks,
    addTask: addTask,
    switchTaskStatus: switchTaskStatus,
    getCompletedTaskIds: getCompletedTaskIds,
    getActiveTaskIds: getActiveTaskIds,
    getActiveTaskCount: getActiveTaskCount
  };

  global.app = global.app || {};
  global.app.model = publicAPI;
})(window);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function IIFE(global) {
  var helpers;
  var model;
  var taskElements = {}; // {id: DOMElement}
  var publicAPI;

  var dateText = document.getElementById('date');
  var monthText = document.getElementById('month');
  var taskCountText = document.getElementById('task-count');
  var newTaskInput = document.getElementById('new-task-input');
  var newTaskButton = document.getElementById('new-task-button');
  var taskList = document.getElementById('task-list');
  var showAll = document.getElementById('show-all');
  var showActive = document.getElementById('show-active');
  var showCompleted = document.getElementById('show-completed');

  var emptyListMessage = taskList.querySelector('.empty-list-message');

  function setDateAndMonth() {
    var _helpers$getCurrentDa = helpers.getCurrentDay(),
        _helpers$getCurrentDa2 = _slicedToArray(_helpers$getCurrentDa, 2),
        day = _helpers$getCurrentDa2[0],
        date = _helpers$getCurrentDa2[1];

    var month = helpers.getCurrentMonth();

    dateText.innerHTML = '<span class="day">' + day + ',</span> ' + date;
    monthText.innerHTML = month;
  }

  function setTasksCount(taskCount) {
    taskCountText.innerHTML = taskCount + ' Active tasks';
  }

  function addNewTask(id, description, isCompleted) {
    var checkbox = void 0;
    var task = document.createElement('li');

    task.innerHTML = '\n      <div class="checkbox">\n          <input type="checkbox" id="checkbox-' + id + '" ' + (isCompleted ? 'checked' : '') + '/>\n          <label for="checkbox-' + id + '"></label>\n      </div>\n      <p class="' + (isCompleted ? 'completed' : '') + '">' + description + '</p>\n    ';

    taskElements[id] = task;

    checkbox = task.querySelector('input');
    checkbox.addEventListener('click', function () {
      return switchTaskStatus(id);
    });

    taskList.insertBefore(task, taskList.firstChild);
  }

  function switchTaskStatus(id) {
    var taskTextElement = taskElements[id].lastElementChild;

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

    showAll.addEventListener('click', function () {
      showAllTasks();
      setFilterMenuActive(showAll);
    });
    showActive.addEventListener('click', function () {
      showActiveTasks();
      setFilterMenuActive(showActive);
    });
    showCompleted.addEventListener('click', function () {
      showCompletedTasks();
      setFilterMenuActive(showCompleted);
    });
  }

  function newTaskClickHandler() {
    var description = newTaskInput.value;

    if (description.length > 0) {
      model.addTask(description, function (taskId) {
        addNewTask(taskId, description, false);
      });

      newTaskInput.value = '';
    }
  }

  function taskListChangeHandler() {
    var taskCount = Object.keys(taskElements).length;
    updateActiveTasksCount();

    if (taskCount === 0) {
      helpers.showElement(emptyListMessage);
    } else {
      helpers.hideElement(emptyListMessage);
    }
  }

  function showAllTasks() {
    Object.values(taskElements).forEach(function (task) {
      helpers.showElement(task);
    });
  }

  function showActiveTasks() {
    model.getActiveTaskIds(function (activeTaskIds) {
      filterTasks(activeTaskIds);
    });
  }

  function showCompletedTasks() {
    model.getCompletedTaskIds(function (completedTaskIds) {
      filterTasks(completedTaskIds);
    });
  }

  function setFilterMenuActive(filter) {
    [showAll, showActive, showCompleted].forEach(function (element) {
      if (element === filter) {
        element.className = 'active';
      } else {
        element.className = '';
      }
    });
  }

  function filterTasks(taskIds) {
    Object.entries(taskElements).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          taskId = _ref2[0],
          taskElement = _ref2[1];

      if (taskIds.includes(taskId)) {
        helpers.showElement(taskElement);
      } else {
        helpers.hideElement(taskElement);
      }
    });
  }

  function init() {
    helpers = global.app.helpers;
    model = global.app.model;

    helpers.showElement(emptyListMessage);
    setEventListeners();
    setDateAndMonth();

    model.getTasks(function addTasks(tasks) {
      Object.entries(tasks).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            taskId = _ref4[0],
            task = _ref4[1];

        addNewTask(taskId, task.description, task.completed);
      });
    });
  }

  publicAPI = {
    init: init
  };

  global.app = global.app || {};
  global.app.view = publicAPI;
})(window);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function IIFE(global) {
  var view = global.app.view;
  var model = global.app.model;

  function init() {
    model.init();
    view.init();
  }

  global.addEventListener('load', init);
})(window);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);