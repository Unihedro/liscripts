// ==UserScript==
// @name         Uptime button
// @namespace    https://github.com/Unihedro/liscripts/blob/master/mod/uptime.user.js
// @version      1.0
// @author       Unihedron
// @match        http://*.lichess.org/@/*
// @grant        none
// ==/UserScript==
var keys = {status: 'Status', uptime: 'Uptime', lastDeploy: 'Last deploy'}; // change for yourself if you want your own language instead of en
$('.button.mod_zone_toggle').before('<a id="uptime"class="button hint--bottom-left"href="javascript:void"data-hint="'+ keys.status +'"><span data-icon="\ue000"></span></a>');
$('#uptime').click(function () {
  var _uptime = document.getElementById('_uptime');
  if (!_uptime) {
    $('.mod_zone').before('<div id="_uptime"style="padding:8px"></div>')
    _uptime = document.getElementById('_uptime');
  }
  $(_uptime).html('Loading...').load('/monitor/status/uptime', function () {
    _uptime.innerHTML = _uptime.innerHTML.replace(/uptime seconds: (\S+)/, function (_, time) {
      var parsed = moment.duration(+time, "seconds");
      return keys.uptime + ':<data value="' + time + '"title="' + time + '">' + parsed.humanize() + ' (' + parsed.toString() + ')</data>';
    }).replace(/last deploy: (\S+)/, function (_, time) {
      var parsed = moment(time);
      return keys.lastDeploy + ':<time datetime="' + time + '"title="' + time + '">' + parsed.calendar() + ' (' + parsed.fromNow() + ')</time>';
    }).replace(/\n/g, '<br>').replace(/uptime: [^<]+/, '');
  });
  return false;
});
