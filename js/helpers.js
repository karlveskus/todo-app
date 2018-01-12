(function setHelpers(global) {
  function getCurrentDay() {
    return ['Friday', '12th'];
  }

  function getCurrentMonth() {
    return 'January';
  }

  let publicAPI = {
    getCurrentDay,
    getCurrentMonth,
  };

  global.app = global.app || {};
  global.app.helpers = publicAPI;
}(window));
