function Helpers() {
  function getCurrentDay(inputDate) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[inputDate.getDay()];

    let date = inputDate.getDate();

    return [day, addSuffixToDate(date)];
  }

  function addSuffixToDate(i) {
    let j = i % 10;
    let k = i % 100;

    if (j === 1 && k !== 11) {
      return `${i}st`;
    }
    if (j === 2 && k !== 12) {
      return `${i}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${i}rd`;
    }
    return `${i}th`;
  }

  function getCurrentMonth(inputDate) {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    return monthNames[inputDate.getMonth()];
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
