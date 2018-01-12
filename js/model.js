(function IIFE(global) {
  let taskCount = 2;

  function getTaskCount() {
    return taskCount;
  }

  let publicAPI = {
    getTaskCount,
  };

  global.app = global.app || {};
  global.app.model = publicAPI;
}(window));
