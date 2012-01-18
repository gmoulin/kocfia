// ==UserScript==
// @name			KOC
// @version			0.1
// @namespace		KOC
// @description		améliorations et automatisations diverses pour KOC
// @require			http://userscripts.org/scripts/source/68059.user.js
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==
jQuery.noConflict();
/*
 * http://userscripts.org/scripts/source/68059.user.js -> used to run the whole script inside the page scope
 * else prototypes are not reachable (grease monkey sandbox limitation)
 */
//var kocFrame = parent.document.getElementById('kocIframes1');
var kocFrame = parent.document.frames[0];
//force koc iframe to width 100%
kocFrame.style.width = '100%';

//force wrapping iframe to width 100%
var style = document.createElement('style')
style.innerHTML = 'body { margin:0; width:100% !important;}';
kocFrame.parentNode.appendChild(style);

var koccss = document.createElement('style');
koccss.innerHTML = "#crossPromoBarContainer, #progressBar { display: none !important; }";

var domain = 'http://koc.kapok.dev/';

//inject the scripts
var jqui = document.createElement('script');
jqui.src = domain + "jquery-ui-1.8.17.custom.min.js";

var koc = document.createElement('script'),
	d = new Date();
koc.src = domain + "koc-0.0.1.js?ts=" + d.getTime();

//clean and arrange the window
var jquicss = document.createElement('link');
jquicss.rel = "stylesheet";
jquicss.href = domain + "jquery-ui-1.8.17.custom.css";
jquicss.type = "text/css";

document.head.appendChild( jquicss );
document.head.appendChild( koccss );
document.body.appendChild( jqui );
document.body.appendChild( koc );
