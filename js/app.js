import View from './view';

(function IIFE(global) {
  function init() {
    View.init();
  }

  global.addEventListener('load', init);
}(window));
