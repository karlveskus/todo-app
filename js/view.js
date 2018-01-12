(function IIFE(global) {
  const helpers = global.app.helpers;
  const model = global.app.model;

  const date = document.getElementById('date');
  const month = document.getElementById('month');
  const taskCount = document.getElementById('task-count');

  const countTemplate = `${model.getTaskCount()} Active tasks`;
  const dateTemplate = `
    <span class="day">${helpers.getCurrentDay()[0]},</span> ${helpers.getCurrentDay()[1]}
  `;

  function initView() {
    date.innerHTML = dateTemplate;
    month.innerHTML = helpers.getCurrentMonth();
    taskCount.innerHTML = countTemplate;
  }

  let publicAPI = {
    init: initView,
  };

  global.app = global.app || {};
  global.app.view = publicAPI;
}(window));
