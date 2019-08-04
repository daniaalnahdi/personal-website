/* Variables */

/* General Functions */
const generalFunctions = {
    html: document.querySelector("html"),
    body: document.querySelector("body"),
    sideNav: document.querySelector("aside"),

    // Returns true if mobile screen
    isMobile: () => {
        return (window.innerWidth <= 991)
    },

    // Disables scrolling 
    disableScroll: () => {
        generalFunctions.body.classList.add("disable-scroll");
        generalFunctions.html.classList.add("disable-scroll");

    },

    // Enables scrolling
    enableScroll: () => {
        generalFunctions.body.classList.remove("disable-scroll");
        generalFunctions.html.classList.remove("disable-scroll");

    },

    // Limits invocation of function
    debounce: (func, wait = 10, immediate = true) => {
        let timeout
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timeout = null
                if (!immediate) func.apply(context, args)
            };
            let callNow = immediate && !timeout
            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
            if (callNow) func.apply(context, args)
        }
    }
}

/* Navigation Functions */
const navFunctions = {
    icon: document.querySelector(".burger-container"),
    sideNav: document.querySelector("aside"),
    navLinks: document.querySelector("#side-links"),
    navHeader: document.querySelector("#nav-h"),
    bar: document.querySelector("nav"),
    scrollPos: 0,

    // Opens and closes mobile navigation
    toggleNav: () => {


        if (navFunctions.scrollPos == 0) { // style bar at top
            navFunctions.bar.classList.remove("show-bar");
        }

        if (navFunctions.icon.classList.contains("cross")) { // if side nav is opened, close it

            //transition effect
            navFunctions.navLinks.classList.remove("reveal");
            navFunctions.navLinks.classList.add("hide");
            navFunctions.navHeader.classList.add("reveal");
            navFunctions.navHeader.classList.remove("hide");

            //close nav
            window.setTimeout(() => {
                navFunctions.icon.classList.remove("cross");
                navFunctions.bar.classList.remove("slide-out");
                navFunctions.sideNav.classList.remove("show-links");
                navFunctions.hideBar(400);
                //generalFunctions.enableScroll();
            }, 300);

        } else {

            //transition effect
            navFunctions.navLinks.classList.add("reveal");
            navFunctions.navLinks.classList.remove("hide");
            navFunctions.navHeader.classList.remove("reveal");
            navFunctions.navHeader.classList.add("hide");

            //open nav
            navFunctions.icon.classList.add("cross");
            navFunctions.bar.classList.add("slide-out", "show-bar");
            navFunctions.sideNav.classList.add("show-links");
            //generalFunctions.disableScroll();

        }

    },

    // Collapses mobile navigation when window resizes
    closeNav: () => {
        if (!generalFunctions.isMobile()) {
            navFunctions.icon.classList.remove("cross");
            navFunctions.bar.classList.remove("slide-out");
            navFunctions.sideNav.classList.remove("show-links");
            generalFunctions.enableScroll();
        }
    },

    // Hides navigation bar after the given duration in milliseconds
    hideBar: (t) => {

        window.setTimeout(() => {
            navFunctions.bar.classList.remove("show-bar");

            if (window.pageYOffset > 20) { //to ensure bar doesn't hide at top
                navFunctions.bar.classList.add("hide-bar");
            };

        }, t);

    },

    // Shows or hides navigation bar depending on scroll direction
    toggleBar: () => {
        let currPos = window.pageYOffset;

        // If mobile navigation is unopened
        if (!navFunctions.sideNav.classList.contains("slide-out")) {
            if (currPos == 0) { // Reset to original at top
                navFunctions.bar.classList.remove("show-bar", "hide-bar");
            } else if (currPos > navFunctions.scrollPos) { // Scrolling down

                if (generalFunctions.isMobile() && navFunctions.icon.classList.contains("cross")) { //if side nav is open
                    navFunctions.toggleNav(); //collapse nav
                } else {
                    navFunctions.hideBar(200); // hide
                }

            } else { // Scrolling up

                navFunctions.bar.classList.add("show-bar"); // show
                navFunctions.bar.classList.remove("hide-bar");

            }
            navFunctions.scrollPos = currPos;
        }
    },

    // Sets up event listeners
    setUp: function () {
        navFunctions.icon.addEventListener('click', navFunctions.toggleNav);
        window.addEventListener('resize', navFunctions.closeNav);
        window.addEventListener('scroll', generalFunctions.debounce(navFunctions.toggleBar));
    }
}

/* Link Functions */
const linkFunctions = {
    sections: document.querySelectorAll("section"),
    barLinks: document.querySelectorAll("#bar-links li"),
    sideLinks: document.querySelectorAll("#side-links li"),

    // Scrolls to the given section
    scrollToSection: (event, s) => {
        event.preventDefault();

        window.setTimeout(() => {

            if (generalFunctions.isMobile()) {
                navFunctions.toggleNav();
            } else {
                navFunctions.hideBar(400);
            }

        }, 300);


        let id = s.getAttribute('id');
        document.getElementById(id).scrollIntoView();


    },

    //highlights the link in the nav bar if the link section is viewed
    highlightNavLink: (s) => {

        let id = s.getAttribute('id')
        let section = document.getElementById(id);
        let startPos = section.offsetTop;
        let endPos = section.offsetTop + section.offsetHeight;
        const offSet = 400;

        let link = linkFunctions.barLinks[id - 1].querySelector("a");
        let underline = linkFunctions.barLinks[id - 1].querySelector(".nav-underline");

        if (window.pageYOffset >= (startPos - offSet) && window.pageYOffset <= (endPos - offSet)) {

            underline.classList.add("nav-underline-highlighted");
            link.classList.add("a-highlighted");

        } else {

            underline.classList.remove("nav-underline-highlighted");
            link.classList.remove("a-highlighted");

        }


    },

    setUp: function () {
        // Get section positions to scroll to
        for (i = 0; i < linkFunctions.sections.length - 1; i++) {
            const s = linkFunctions.sections[i + 1] //ignores first section
            const bl = linkFunctions.barLinks[i].querySelector("a");
            const sl = linkFunctions.sideLinks[i].querySelector("a");
            let id = i + 1;

            s.setAttribute('id', id);
            bl.href = "";
            sl.href = "";

            bl.addEventListener('click', () => { linkFunctions.scrollToSection(event, s) });
            sl.addEventListener('click', () => { linkFunctions.scrollToSection(event, s) });
            window.addEventListener('scroll', () => { generalFunctions.debounce(linkFunctions.highlightNavLink(s)) });

        }

    }


}

/* Transition Functions */
const transitionFunctions = {
    elements: document.querySelectorAll(".fade-in"),

    // Reveals elements as they are being scrolled to 
    revealElements: () => {

        transitionFunctions.elements.forEach(element => {
            // half way through the element
            const slideInAt = (window.scrollY + window.innerHeight) - element.offsetHeight / 2;
            // bottom of the element
            const elementBottom = element.offsetTop + element.offsetHeight;
            const isHalfShown = slideInAt > element.offsetTop;
            const isNotScrolledPast = window.scrollY < elementBottom;
            if (isHalfShown && isNotScrolledPast) {
                element.classList.add("reveal");
            } else {
                element.classList.remove("reveal");
            }
        });
    },

    //Reveals first element without prompting user to scroll
    revealFirstElement: () => {
        transitionFunctions.elements[0].classList.add("reveal");
    },

    setUp: function () {
        window.addEventListener("scroll", generalFunctions.debounce(transitionFunctions.revealElements));
        window.addEventListener("DOMContentLoaded", (transitionFunctions.revealFirstElement));
        window.addEventListener("resize", generalFunctions.debounce(transitionFunctions.revealElements));


    }

}

/* Set up all event listeners */
navFunctions.setUp();
linkFunctions.setUp();
transitionFunctions.setUp();