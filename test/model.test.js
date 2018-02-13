import { assert } from 'chai';
import 'babel-polyfill'; // Emulate a full ES2015+ environment
import 'mock-local-storage'; // Mock localStorage
import Model from '../js/model';

const task = {
  description: 'New Task',
  completed: false,
};

function addNewTask(callback) {
  Model.addTask(task.description, callback);
}

function addCompletedTask(callback) {
  addNewTask((taskId) => {
    Model.switchTaskStatus(taskId, () => callback(taskId));
  });
}

function addNewTasks(callback) {
  Model.addTask(task.description, () => {
    Model.addTask(task.description, callback);
  });
}

function resetState() {
  Model.resetTasks();
}

describe('getTasks()', () => {
  beforeEach(resetState);

  it('returns an empty object if tasks are not set', () => {
    Model.getTasks((tasks) => {
      assert.deepEqual(tasks, {});
    });
  });

  it('returns tasks object if tasks are set', () => {
    addNewTasks(() => {
      Model.getTasks((tasks) => {
        assert.deepEqual(tasks, { 0: task, 1: task });
      });
    });
  });
});

describe('addTask()', () => {
  beforeEach(resetState);

  it('adds a new task to the empty task list', () => {
    addNewTask(() => {
      Model.getTasks((tasks) => {
        assert.deepEqual(tasks, { 0: task });
      });
    });
  });

  it('returns the task ID when adding a new task', () => {
    addNewTask((taskId) => {
      assert.strictEqual(taskId, 0);
    });
  });
});

describe('switchTaskStatus()', () => {
  beforeEach(resetState);

  it('switches task status to completed', () => {
    addNewTask((taskId) => {
      Model.switchTaskStatus(taskId, (isCompleted) => {
        assert.equal(isCompleted, true);
      });
    });
  });

  it('switches task status to active', () => {
    addCompletedTask((taskId) => {
      Model.switchTaskStatus(taskId, (isCompleted) => {
        assert.equal(isCompleted, false);
      });
    });
  });
});

describe('getActiveTaskCount()', () => {
  beforeEach(resetState);

  it('returns 0 if no active tasks', () => {
    Model.getActiveTaskCount((count) => {
      assert.equal(count, 0);
    });
  });

  it('returns active task count when no completed tasks exist', () => {
    addNewTasks(() => {
      Model.getActiveTaskCount((count) => {
        assert.strictEqual(count, 2);
      });
    });
  });

  it('returns active task count when completed task exists', () => {
    addCompletedTask(() => {
      addNewTasks(() => {
        Model.getActiveTaskCount((count) => {
          assert.strictEqual(count, 2);
        });
      });
    });
  });
});

describe('getActiveTaskIds()', () => {
  beforeEach(resetState);

  it('returns empty list if no active tasks available', () => {
    addCompletedTask(() => {
      Model.getActiveTaskIds((activeTaskIds) => {
        let expected = [];

        assert.deepEqual(activeTaskIds, expected);
      });
    });
  });

  it('returns list of active task Ids', () => {
    addNewTasks(() => {
      addCompletedTask(() => {
        Model.getActiveTaskIds((activeTaskIds) => {
          let expected = ['0', '1'];

          assert.deepEqual(activeTaskIds, expected);
        });
      });
    });
  });
});

describe('getCompletedTaskIds()', () => {
  beforeEach(resetState);

  it('returns empty list if no completed tasks available', () => {
    addNewTasks(() => {
      Model.getCompletedTaskIds((getCompletedTaskIds) => {
        let expected = [];

        assert.deepEqual(getCompletedTaskIds, expected);
      });
    });
  });

  it('returns list of active task Ids', () => {
    addNewTasks(() => {
      addCompletedTask(() => {
        Model.getCompletedTaskIds((getCompletedTaskIds) => {
          let expected = ['2'];

          assert.deepEqual(getCompletedTaskIds, expected);
        });
      });
    });
  });
});

describe('removeTask()', () => {
  beforeEach(resetState);

  it('removes task from tasks list', () => {
    addNewTask((taskId) => {
      Model.removeTask(taskId, () => {
        Model.getTasks((tasks) => {
          let expected = {};
          assert.deepEqual(tasks, expected);
        });
      });
    });
  });
});
