import { NavStates, NavLinks, Transitions } from './js/modules.js';
import './assets/images/favicon.png'
import './scss/main.scss';

(() => {
  NavStates.init();
  NavLinks.init();
  Transitions.init();
})();
