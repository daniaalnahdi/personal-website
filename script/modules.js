export const Utils = (() => {
  const html = document.querySelector('html'),
    body = document.querySelector('body');

  const isMobile = () => {
    return window.innerWidth <= 991;
  };

  // Disables scrolling
  const disableScroll = () => {
    body.classList.add('disable-scroll');
    html.classList.add('disable-scroll');
  };

  // Enables scrolling
  const enableScroll = () => {
    body.classList.remove('disable-scroll');
    html.classList.remove('disable-scroll');
  };

  // Limits invocation of function
  const debounce = (func, wait = 10, immediate = true) => {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  return {
    isMobile,
    disableScroll,
    enableScroll,
    debounce,
  };
})();

export const NavStates = (() => {
  const icon = document.querySelector('.burger-container'),
    sideNav = document.querySelector('aside'),
    navLinks = document.querySelector('#side-links'),
    navTitle = document.querySelector('#nav-h'),
    bar = document.querySelector('nav');
  let scrollPos = 0;

  // Opens and closes mobile navigation
  const toggleNav = () => {
    // style bar at top if user hasn't scrolled
    if (scrollPos == 0) {
      bar.classList.remove('show-bar');
    }

    // if side nav is opened, close it
    if (icon.classList.contains('cross')) {
      //transition effect
      navLinks.classList.remove('reveal');
      navLinks.classList.add('hide');
      navTitle.classList.add('reveal');
      navTitle.classList.remove('hide');

      //close nav
      window.setTimeout(() => {
        icon.classList.remove('cross');
        bar.classList.remove('slide-out');
        sideNav.classList.remove('show-links');
        hideBar();
        //globalUtils.enableScroll();
      }, 300);
    } else {
      //transition effect
      navLinks.classList.add('reveal');
      navLinks.classList.remove('hide');
      navTitle.classList.remove('reveal');
      navTitle.classList.add('hide');

      //open nav
      icon.classList.add('cross');
      bar.classList.add('slide-out', 'show-bar');
      sideNav.classList.add('show-links');
      //globalUtils.disableScroll();
    }
  };

  // Hides navigation bar after the given duration in milliseconds (default .4s)
  const hideBar = (timeout = 400) => {
    window.setTimeout(() => {
      bar.classList.remove('show-bar');

      if (window.pageYOffset > 20) {
        //to ensure bar doesn't hide at top
        bar.classList.add('hide-bar');
      }
    }, timeout);
  };

  // Collapses mobile navigation when window resizes
  const closeNav = () => {
    if (!Utils.isMobile()) {
      icon.classList.remove('cross');
      bar.classList.remove('slide-out');
      sideNav.classList.remove('show-links');
      Utils.enableScroll();
    }
  };

  // Shows or hides navigation bar depending on scroll direction
  const toggleBar = () => {
    let currPos = window.pageYOffset;

    // If mobile navigation is unopened
    if (!sideNav.classList.contains('slide-out')) {
      if (currPos == 0) {
        // Reset to original at top
        bar.classList.remove('show-bar', 'hide-bar');
      } else if (currPos > scrollPos) {
        // Scrolling down

        if (Utils.isMobile() && icon.classList.contains('cross')) {
          //if side nav is open
          toggleNav(); //collapse nav
        } else {
          hideBar(200); // hide
        }
      } else {
        // Scrolling up
        bar.classList.add('show-bar'); // show
        bar.classList.remove('hide-bar');
      }
      scrollPos = currPos;
    }
  };

  // Sets up event listeners
  const setUpEventListeners = () => {
    icon.addEventListener('click', toggleNav);
    window.addEventListener('resize', closeNav);
    window.addEventListener('scroll', Utils.debounce(toggleBar));
  };

  return {
    toggleNav,
    hideBar,
    init: setUpEventListeners,
  };
})();

export const NavLinks = (() => {
  const sections = document.querySelectorAll('section'),
    barLinks = document.querySelectorAll('#bar-links li'),
    sideLinks = document.querySelectorAll('#side-links li');

  // Scrolls to the given section
  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    window.setTimeout(() => {
      if (Utils.isMobile()) {
        NavStates.toggleNav();
      } else {
        NavStates.hideBar();
      }
    }, 300);

    document.getElementById(sectionId).scrollIntoView();
  };

  //highlights the link in the nav bar if the link section is viewed
  const highlightNavLink = (sectionId, sectionsIndexOffset = 0) => {
    const section = document.getElementById(sectionId),
      link = barLinks[sectionId - sectionsIndexOffset].querySelector('a'),
      underline = barLinks[sectionId - sectionsIndexOffset].querySelector(
        '.nav-underline'
      );

    const startPos = section.offsetTop,
      endPos = section.offsetTop + section.offsetHeight,
      offSet = 400;

    if (
      window.pageYOffset >= startPos - offSet &&
      window.pageYOffset <= endPos - offSet
    ) {
      underline.classList.add('nav-underline-highlighted');
      link.classList.add('a-highlighted');
    } else {
      underline.classList.remove('nav-underline-highlighted');
      link.classList.remove('a-highlighted');
    }
  };

  const setUpEventListeners = () => {
    // Get section positions to scroll to
    for (let i = 0; i < sections.length - 1; i++) {
      const sectionsIndexOffset = 1, //skips first section
        sectionId = i + sectionsIndexOffset,
        section = sections[sectionId], //ignores first section
        barLink = barLinks[i].querySelector('a'),
        sideLink = sideLinks[i].querySelector('a');

      section.setAttribute('id', sectionId);
      barLink.href = '';
      sideLink.href = '';

      barLink.addEventListener('click', () => {
        scrollToSection(event, sectionId);
      });
      sideLink.addEventListener('click', () => {
        scrollToSection(event, sectionId);
      });
      window.addEventListener('scroll', () => {
        Utils.debounce(highlightNavLink(sectionId, sectionsIndexOffset));
      });
    }
  };

  return {
    init: setUpEventListeners,
  };
})();

export const Transitions = (() => {
  const elements = document.querySelectorAll('.fade-in'),
    cards = document.querySelectorAll('.info-card');

  // Reveals elements as they are being scrolled to
  const revealElementOnScroll = () => {
    elements.forEach((element) => {
      // half way through the element
      const slideInAt =
          window.scrollY + window.innerHeight - element.offsetHeight / 2,
        // bottom of the element
        elementBottom = element.offsetTop + element.offsetHeight,
        isHalfShown = slideInAt > element.offsetTop,
        isNotScrolledPast = window.scrollY < elementBottom;
      if (isHalfShown && isNotScrolledPast) {
        element.classList.add('reveal');
      } else {
        element.classList.remove('reveal');
      }
    });
  };

  // Scales cards as they are being scrolled to
  const scaleCardsOnScroll = () => {
    cards.forEach((card) => {
      // half way through the card
      const offSet = 100,
        scaleAt =
          window.scrollY +
          window.innerHeight -
          card.offsetHeight / 2 -
          offSet -
          50,
        elementBottom = card.offsetTop + card.offsetHeight / 2 - offSet,
        isHalfShown = scaleAt > card.offsetTop,
        isNotScrolledPast = window.scrollY < elementBottom;

      if (isHalfShown && isNotScrolledPast) {
        card.classList.add('scale');
        card.classList.remove('fade');
      } else {
        card.classList.remove('scale');
        card.classList.add('fade');
      }
    });
  };

  //Reveals first element without prompting user to scroll
  const revealFirstElement = () => {
    elements[0].classList.add('reveal');
  };

  const setUpEventListeners = () => {
    window.addEventListener('scroll', Utils.debounce(revealElementOnScroll));
    window.addEventListener('scroll', Utils.debounce(scaleCardsOnScroll));
    window.addEventListener('resize', Utils.debounce(revealElementOnScroll));
    window.addEventListener('resize', Utils.debounce(scaleCardsOnScroll));
    window.addEventListener('DOMContentLoaded', revealFirstElement);
  };

  return {
    init: setUpEventListeners,
  };
})();
