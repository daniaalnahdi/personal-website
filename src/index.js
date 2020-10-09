import { NavStates, NavLinks, Transitions } from './js/modules';
import { FontAwesome } from './js/vendors'
import './assets/images/favicon.png'
import './scss/main.scss';

(() => {
  FontAwesome.init();
  NavStates.init();
  NavLinks.init();
  Transitions.init();
})();
