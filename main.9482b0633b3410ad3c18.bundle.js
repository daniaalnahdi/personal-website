!function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=1)}([function(e,t,s){},function(e,t,s){"use strict";s.r(t);var n,i,o,r,l,c,d,a,u,f,v,w,L,h,m,b,g,y,p,S,q,E=(n=document.querySelector("html"),i=document.querySelector("body"),{isMobile:function(){return window.innerWidth<=991},disableScroll:function(){i.classList.add("disable-scroll"),n.classList.add("disable-scroll")},enableScroll:function(){i.classList.remove("disable-scroll"),n.classList.remove("disable-scroll")},debounce:function(e){var t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return function(){var i=this,o=arguments,r=function(){t=null,n||e.apply(i,o)},l=n&&!t;clearTimeout(t),t=setTimeout(r,s),l&&e.apply(i,o)}}}),T=(o=document.querySelector(".burger-container"),r=document.querySelector("aside"),l=document.querySelector("#side-links"),c=document.querySelector("#nav-h"),d=document.querySelector("nav"),a=0,v=function(){E.isMobile()||(o.classList.remove("cross"),d.classList.remove("slide-out"),r.classList.remove("show-links"),E.enableScroll())},w=function(){var e=window.pageYOffset;r.classList.contains("slide-out")||(0==e?d.classList.remove("show-bar","hide-bar"):e>a?E.isMobile()&&o.classList.contains("cross")?u():f(200):(d.classList.add("show-bar"),d.classList.remove("hide-bar")),a=e)},{toggleNav:u=function(){0==a&&d.classList.remove("show-bar"),o.classList.contains("cross")?(l.classList.remove("reveal"),l.classList.add("hide"),c.classList.add("reveal"),c.classList.remove("hide"),window.setTimeout((function(){o.classList.remove("cross"),d.classList.remove("slide-out"),r.classList.remove("show-links"),f()}),300)):(l.classList.add("reveal"),l.classList.remove("hide"),c.classList.remove("reveal"),c.classList.add("hide"),o.classList.add("cross"),d.classList.add("slide-out","show-bar"),r.classList.add("show-links"))},hideBar:f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:400;window.setTimeout((function(){d.classList.remove("show-bar"),window.pageYOffset>20&&d.classList.add("hide-bar")}),e)},init:function(){o.addEventListener("click",u),window.addEventListener("resize",v),window.addEventListener("scroll",E.debounce(w))}}),O=(L=document.querySelectorAll("section"),h=document.querySelectorAll("#bar-links li"),m=document.querySelectorAll("#side-links li"),b=function(e,t){e.preventDefault(),window.setTimeout((function(){E.isMobile()?T.toggleNav():T.hideBar()}),300),document.getElementById(t).scrollIntoView()},{init:function(){for(var e=function(e){var t=e+1,s=L[t],n=h[e].querySelector("a"),i=m[e].querySelector("a");s.setAttribute("id",t),n.href="",i.href="",n.addEventListener("click",(function(){b(event,t)})),i.addEventListener("click",(function(){b(event,t)})),window.addEventListener("scroll",(function(){E.debounce(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=document.getElementById(e),n=h[e-t].querySelector("a"),i=h[e-t].querySelector(".nav-underline"),o=s.offsetTop,r=s.offsetTop+s.offsetHeight,l=400;window.pageYOffset>=o-l&&window.pageYOffset<=r-l?(i.classList.add("nav-underline-highlighted"),n.classList.add("a-highlighted")):(i.classList.remove("nav-underline-highlighted"),n.classList.remove("a-highlighted"))}(t,1))}))},t=0;t<L.length-1;t++)e(t)}}),k=(g=document.querySelectorAll(".fade-in"),y=document.querySelectorAll(".info-card"),p=function(){g.forEach((function(e){var t=window.scrollY+window.innerHeight-e.offsetHeight/2,s=e.offsetTop+e.offsetHeight,n=t>e.offsetTop,i=window.scrollY<s;n&&i?e.classList.add("reveal"):e.classList.remove("reveal")}))},S=function(){y.forEach((function(e){var t=window.scrollY+window.innerHeight-e.offsetHeight/2-100-50,s=e.offsetTop+e.offsetHeight/2-100,n=t>e.offsetTop,i=window.scrollY<s;n&&i?(e.classList.add("scale"),e.classList.remove("fade")):(e.classList.remove("scale"),e.classList.add("fade"))}))},q=function(){g[0].classList.add("reveal")},{init:function(){window.addEventListener("scroll",E.debounce(p)),window.addEventListener("scroll",E.debounce(S)),window.addEventListener("resize",E.debounce(p)),window.addEventListener("resize",E.debounce(S)),window.addEventListener("DOMContentLoaded",q)}});s(0);T.init(),O.init(),k.init()}]);