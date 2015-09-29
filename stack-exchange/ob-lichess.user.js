// ==UserScript==
// @name         Lichess Onebox
// @namespace    https://github.com/Unihedro/liscripts
// @version      0.2
// @description  Oneboxes links to Lichess stuff.
// @author       Unihedron and ProgramFOX
// @match        *://chat.stackoverfow.com/*
// @match        *://chat.meta.stackexchange.com/*
// @match        *://chat.stackexchange.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

document.head.innerHTML += '<style>img.ob-lichess{width:20%;}</style>';
function ob(url) {
  var match = url.match(/http:\/\/(?:\w{2,3}\.)?lichess\.org\/(?:training\/(?!opening)(\d+)|(\w{8})(?:\w{4})?(?:\/(?:white|black))?\/?(?![^#]))/);
  if (!match) return; // doesn't appear to be a lichess link
  if (match[1]) {
    return '<img class="ob-lichess" src="http://lichess1.org/training/export/png/' + match[1] + '.png">';
  } 
  else if (match[2]) {
    return '<img class="ob-lichess" src="http://lichess1.org/game/export/png/' + match[2] + '.png">';
  }
}
function replaceLinks(messageElement) {
  var links = messageElement.querySelectorAll('.content > a');
  for (var i = 0; i < links.length; i++) {
    var curr = links[i];
    var _ob = ob(curr.getAttribute('href'));
    if (_ob) {
      curr.innerHTML = _ob;
    }
  }
}
function oneboxMessagesIfAny(node) {
  if (node.classList.contains('message')) {
    replaceLinks(node);
  } else {
    var msgs = node.getElementsByTagName('div');
    for (var i = 0; i < msgs.length; i++) {
      if (msgs[i].classList.contains('message')) {
        replaceLinks(msgs[i]);
      }
    }
  }
}
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      oneboxMessagesIfAny(mutation.addedNodes[i]);
    }
  });
});
var config = {
  childList: true,
  subtree: true
};
observer.observe(document.documentElement, config);
