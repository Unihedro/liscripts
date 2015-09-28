// ==UserScript==
// @name         Jump to communication page
// @namespace    https://gist.github.com/Unihedro/f6825d2b5b51491d036d
// @version      1.1
// @description  Hit "m" on your keyboard from profile.
// @author       Unihedron
// @match        http://*.lichess.org/@/*
// @grant        none
// ==/UserScript==

Mousetrap.bind('m', function() {
  (function (href) {
    window.location.href = href.match(/^.+\./)[0] + 'lichess.org/mod/' + (href.substr(href.indexOf('@') + 2).replace(/[?/].+/, '')) + '/communication';
  })(window.location.href);
});
