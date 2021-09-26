import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faPenNib,
  faLightbulb,
  faTools,
  faExternalLinkAlt,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const FontAwesome = (() => {
  const init = () => {
    library.add(
      faCode,
      faPenNib,
      faLightbulb,
      faTools,
      faExternalLinkAlt,
      faFileAlt,
      faPlayCircle,
      faGithub
    );
    dom.watch();
  };

  return {
    init,
  };
})();
