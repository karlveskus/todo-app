(function IIFE(global) {
  const view = global.app.view;
  const model = global.app.model;

  function init() {
    model.init();
    view.init();
  }

  global.addEventListener('load', init);
}(window));
