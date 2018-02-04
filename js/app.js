import model from './model';
import view from './view';

(function IIFE(global) {
  function init() {
    model.init();
    view.init();
  }

  global.addEventListener('load', init);
}(window));
