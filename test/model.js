import { assert } from 'chai';
// Mock localStorage
import 'mock-local-storage';
import model from '../js/model';

function addNewTask(callback) {
  model.addTask('New Task', callback);
}

describe('getTasks()', () => {
  it('returns null if tasks are not set', () => {
    model.getTasks((tasks) => {
      assert.isNull(tasks);
    });
  });

  it('returns tasks object if tasks are set', () => {
    addNewTask(() => {
      model.getTasks((tasks) => {
        assert.isObject(tasks);
      });
    });
  });
});

describe('addTask()', () => {
  it('increases task list length', () => {
    model.getTasks((initialTasks) => {
      let expectedCount = initialTasks ? Object.keys(initialTasks).length + 1 : 1;

      model.addTask('New task', () => {
        model.getTasks((newTasks) => {
          let newTaskCount = Object.keys(newTasks).length;
          assert.equal(newTaskCount, expectedCount);
        });
      });
    });
  });

  it('returns number of task ID', () => {
    model.addTask('New Task', (taskId) => {
      assert.isNumber(taskId);
    });
  });
});
