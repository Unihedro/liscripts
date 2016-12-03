// ==UserScript==
// @name         autotitle
// @namespace    http://ix.io/mFU
// @updateURL    http://ix.io/mFU
// @version      1.0
// @description  automatic title for lichess inbox messages (recommended to keep autotitle comment for historical tracking)
// @author       Unihedron
// @match        http://*.lichess.org/inbox/new
// @match        http://*.lichess.org/inbox/new*
// @grant        none
// ==/UserScript==

var version = 1;

function rand(minv, maxv) {
	return Math.floor(Math.random() * (maxv - minv + 1)) + minv; // perfectly random (who even cares?)
}

function getName(minlength, maxlength)
{
	var vocals = 'aeiouyh' + 'aeiou' + 'aeiou';
	var cons = 'bcdfghjklmnpqrstvwxz' + 'bcdfgjklmnprstvw' + 'bcdfgjklmnprst';
	var allchars = vocals + cons;
	var length = rand(minlength, maxlength);
	var consnum = 1;

	var name = [];

	while (length--) {
		// If we have used 2 consonants, the next char must be vocal.
		if (consnum == 2) {
			touse = vocals;
			consnum = 0;
		}
		else touse = allchars;
		// Pick a random character from the set we are going to use.
		c = touse.charAt(rand(0, touse.length - 1));
		name.push(c);
		if (cons.indexOf(c) != -1)
            consnum++;
	}
	return name.shift().toUpperCase() + name.join('');
}

$('#subject').val(getName(4, 18) + ' // autotitle v' + version);
