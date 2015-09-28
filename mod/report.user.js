// ==UserScript==
// @name         Lichess Report List Helper
// @namespace    https://gist.github.com/Unihedro/1d36d39069980d09d4fb
// @version      1.1
// @description  Highlight duplicate user reports,
//               and allows filtering by report type.
// @author       Unihedron
// @match        http://*.lichess.org/report/list
// @grant        none
// ==/UserScript==
var PREFIX = '-uni-';
var Name = {
  Duplicate: PREFIX + 'duplicate',
  Cheat: PREFIX + 'cheat',
  Insult: PREFIX + 'insult',
  Troll: PREFIX + 'troll',
  Boost: PREFIX + 'boost',
  Other: PREFIX + 'other'
};
$('head').append('<style>#report .' + Name.Duplicate + ' {' +
'  background: rgba(255, 130, 27, 0.3);' +
'}</style>').append('<style id="' + PREFIX + 'style"></style>');
var $report = $('#report');
var $h1 = $report.find('h1');
$h1.append(':Cheat,dInsult,QTroll,OBoost,!Other,vHide'.split(',').map(function (d) {
  return ' <a data-hint="' + d.substr(1) + '" class="button hint--top-left"><span data-icon="' + d[0] + '"></span></a>';
}).join(''));
var last;
function setActiveClass(name) {
  document.getElementById(PREFIX + 'style').innerHTML = (name ?
    '#report .' + name + '{ background: rgba(107, 148, 158, 0.2); }' :
    '#report > .see > tbody > tr:not(.' + last + '){ display: none; }');
}
$h1.find('.button').click(function () {
  var $this = $(this);
  var name = Name[$this.data('hint')];
  setActiveClass(name ? last = name : name);
  $this.parent().find('.active').removeClass('active');
  $this.addClass('active');
});
var $reports = $report.find('.see > tbody > tr');
var map = {};
function iterate() {
  function highlightDupe(element) {
    element.parentElement.classList.add(Name.Duplicate);
    return element;
  }
  var name = this.innerHTML;
  map[name] ?
    (Array.isArray(map[name]) ?
      map[name].push(highlightDupe(this)) :
      map[name] = [highlightDupe(map[name]), highlightDupe(this)]) :
  map[name] = this;
}
$reports.find('td:nth-child(1) a').each(iterate);
map = {}; // discard
$reports.find('td:nth-child(2) a').each(iterate);
$reports.find('td:nth-child(3) strong').each(function() {
  this.parentElement.parentElement.classList.add(Name[this.innerHTML]);
});
