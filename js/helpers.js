function Helpers() {
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

  return publicAPI;
}

export default Helpers();
