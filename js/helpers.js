function Helpers() {
  let publicAPI;

  function getCurrentDay(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    return day;
  }

  function getCurrentDate(inputDate) {
    let date = inputDate.getDate();

    let j = date % 10;
    let k = date % 100;

    if (j === 1 && k !== 11) {
      return `${date}st`;
    }
    if (j === 2 && k !== 12) {
      return `${date}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${date}rd`;
    }
    return `${date}th`;
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

  publicAPI = {
    getCurrentDay,
    getCurrentDate,
    getCurrentMonth,
    showElement,
    hideElement,
  };

  return publicAPI;
}

export default Helpers();
