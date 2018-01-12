import '../css/style.scss';

(function IIFE(global) {
  const view = global.app.view;

  function init() {
    view.init();
  }

  global.addEventListener('load', init);
}(window));
