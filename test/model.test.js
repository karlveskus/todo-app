import { assert } from 'chai';
import 'babel-polyfill'; // Emulate a full ES2015+ environment
import 'mock-local-storage'; // Mock localStorage
import Model from '../js/model';

const newTask = {
  id: 0,
  description: 'First task',
  completed: false,
};

function addNewTask() {
  let taskId = Model.addTask(newTask.description);
  return taskId;
}

function addCompletedTask() {
  let taskId = addNewTask();
  Model.switchTaskStatus(taskId);
  return taskId;
}

function resetState() {
  Model.resetTasks();
  Model.init();
}

describe('getTasks()', () => {
  beforeEach(resetState);

  it('returns an empty list if tasks are not set', () => {
    let tasks = Model.getTasks();

    assert.deepEqual(tasks, []);
  });

  it('returns tasks list if tasks are set', () => {
    addNewTask();
    let tasks = Model.getTasks();

    assert.deepEqual(tasks, [newTask]);
  });
});

describe('addTask()', () => {
  beforeEach(resetState);

  it('adds a new task to the empty task list', () => {
    addNewTask();
    let tasks = Model.getTasks();

    assert.deepEqual(tasks, [newTask]);
  });

  it('returns the task ID when adding a new task', () => {
    addNewTask();
    let taskId = addNewTask();

    assert.strictEqual(taskId, 1);
  });
});

describe('switchTaskStatus()', () => {
  beforeEach(resetState);

  it('switches task status to completed', () => {
    let taskId = addNewTask();
    Model.switchTaskStatus(taskId);
    let task = Model.getTasks().find(t => t.id === taskId);

    assert.equal(task.completed, true);
  });

  it('switches task status to active', () => {
    let taskId = addCompletedTask();
    Model.switchTaskStatus(taskId);
    let task = Model.getTasks().find(t => t.id === taskId);

    assert.equal(task.completed, false);
  });

  it('returns true if task status was changed to completed', () => {
    let taskId = addNewTask();
    let isCompleted = Model.switchTaskStatus(taskId);

    assert.equal(isCompleted, true);
  });

  it('returns false if task status was changed to active', () => {
    let taskId = addCompletedTask();
    let isCompleted = Model.switchTaskStatus(taskId);

    assert.equal(isCompleted, false);
  });
});

describe('getActiveTaskIds()', () => {
  beforeEach(resetState);

  it('returns an empty list if no active tasks added', () => {
    let activeTaskIds = Model.getActiveTaskIds();

    assert.deepEqual(activeTaskIds, []);
  });

  it('returns a list of active task IDs when no completed tasks added', () => {
    let taskId = addNewTask();
    let activeTaskIds = Model.getActiveTaskIds();

    assert.deepEqual(activeTaskIds, [taskId]);
  });

  it('returns a list of active task IDs when completed tasks exist', () => {
    let taskId1 = addNewTask();
    let taskId2 = addNewTask();
    addCompletedTask();
    let activeTaskIds = Model.getActiveTaskIds();

    assert.deepEqual(activeTaskIds, [taskId1, taskId2]);
  });
});

describe('getCompletedTaskIds()', () => {
  beforeEach(resetState);

  it('returns empty list if no completed tasks available', () => {
    let completedTaskIds = Model.getCompletedTaskIds();

    assert.deepEqual(completedTaskIds, []);
  });

  it('returns list of completed task Ids', () => {
    addNewTask();
    addNewTask();
    let taskId = addCompletedTask();
    let completedTaskIds = Model.getCompletedTaskIds();

    assert.deepEqual(completedTaskIds, [taskId]);
  });
});

describe('removeTask()', () => {
  beforeEach(resetState);

  it('removes task from task list', () => {
    let taskId = addNewTask();
    Model.removeTask(taskId);
    let tasks = Model.getTasks();

    assert.deepEqual(tasks, []);
  });
});
