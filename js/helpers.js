export default {
  getCurrentDay(timeInMilliseconds) {
    let date = new Date(timeInMilliseconds);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    return day;
  },

  getCurrentDate(timeInMilliseconds) {
    let date = new Date(timeInMilliseconds);
    date = date.getDate();

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
  },

  getCurrentMonth(timeInMilliseconds) {
    let date = new Date(timeInMilliseconds);
    let monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    return monthNames[date.getMonth()];
  },

  showElement(element) {
    element.style.display = 'block'; // eslint-disable-line no-param-reassign
  },

  hideElement(element) {
    element.style.display = 'none'; // eslint-disable-line no-param-reassign
  },
};
