import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faPenNib,
  faLightbulb,
  faTools,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

export const FontAwesome = (() => {
  const init = () => {
    library.add(faCode, faPenNib, faLightbulb, faExternalLinkAlt, faTools);
    dom.watch();
  };

  return {
    init,
  };
})();
