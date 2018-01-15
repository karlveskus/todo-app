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

  let publicAPI = {
    getCurrentDay,
    getCurrentMonth,
    showElement,
    hideElement,
  };

  global.app = global.app || {};
  global.app.helpers = publicAPI;
}(window));
