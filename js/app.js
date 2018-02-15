import Model from './model';
import View from './view';

(function IIFE(global) {
  function init() {
    Model.init();
    View.init();
  }

  global.addEventListener('load', init);
}(window));
