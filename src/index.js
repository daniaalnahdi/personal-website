import { Translator } from './js/translator';
import { NavStates, NavLinks, Transitions } from './js/modules';
import { FontAwesome } from './js/vendors';
import './assets/images/favicon.png';
import './scss/main.scss';

const app = async () => {
  FontAwesome.init();
  Translator.init();
  NavStates.init();
  NavLinks.init();
  Transitions.init();
};

document.addEventListener('DOMContentLoaded', app);
