import { Translator } from './js/translator';
import {
  NavStates,
  NavLinks,
  Footer,
  Transitions,
  Buttons,
} from './js/modules';
import { FontAwesome } from './js/vendors';
import './assets/images/favicon.png';
import './scss/main.scss';

(() => {
  FontAwesome.init();
  Translator.init();
  NavStates.init();
  NavLinks.init();
  Buttons.init();
  Footer.init();
  Transitions.init();
})();
