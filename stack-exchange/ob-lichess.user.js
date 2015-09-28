// ==UserScript==
// @name         Lichess Onebox
// @namespace    https://gist.github.com/Unihedro/73a029181083103f901a
// @version      0.1
// @description  Oneboxes links to Lichess stuff.
// @author       Unihedron
// @match        *://chat.stackoverfow.com/*
// @match        *://chat.meta.stackexchange.com/*
// @match        *://chat.stackexchange.com/*
// @grant        none
// ==/UserScript==
$(document.head).append('<style>img.ob-lichess{width:20%;}</style>')
function ob(url) {
  var match = url.match(/http:\/\/(?:\w{2,3}\.)?lichess\.org\/(?:training\/(?!opening)(\d+)|(\w{8})(?:\w{4})?(?:\/(?:white|black))?\/?(?![^#]))/);
  if (!match)
    return; // unknown
  if (match[1])
    return '<img class="ob-lichess" src="http://lichess1.org/training/export/png/' + match[1] + '.png">';
  else if (match[2])
    return '<img class="ob-lichess" src="http://lichess1.org/game/export/png/' + match[2] + '.png">';
}
$('.message > .content > a').each(function() {
  var $this = $(this);
  var _ob = ob($this.attr('href'));
  if (_ob)
    $this.html(_ob);
});
