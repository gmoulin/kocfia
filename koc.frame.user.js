// ==UserScript==
// @name			KOC
// @version			0.1
// @namespace		KOC
// @description		améliorations et automatisations diverses pour KOC
// @require			http://userscripts.org/scripts/source/68059.user.js
// @require			http://code.jquery.com/jquery-1.7.min.js
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==
jQuery.noConflict();
/*
 * http://userscripts.org/scripts/source/68059.user.js -> used to run the whole script inside the page scope
 * else prototypes are not reachable (grease monkey sandbox limitation)
 */

var kocFrame = parent.document.getElementById('kofc_iframe_0');
//force koc iframe to width 100%
kocFrame.style.width = '100%';

//force wrapping iframe to width 100%
var style = document.createElement('style')
style.innerHTML = 'body { margin:0; width:100% !important;}';
kocFrame.parentNode.appendChild(style);

var koccss = document.createElement('style');
koccss.innerHTML = "#crossPromoBarContainer, #progressBar { display: none !important; }"
		+ "\n.drag-handle { cursor: move; width: 10px; height: 20px; background-color: grey; float: left;}";

//inject the scripts
var jqui = document.createElement('script');
jqui.src = "http://koc.kapok.dev/jquery-ui-1.8.16.custom.min.js";

var koc = document.createElement('script');
koc.src = "http://koc.kapok.dev/koc-0.0.1.js";

//clean and arrange the window
var jquicss = document.createElement('link');
jquicss.rel = "stylesheet";
jquicss.href = "http://koc.kapok.fr/jquery-ui-1.8.16.custom.css";
jquicss.type = "text/css";

document.head.appendChild( jquicss );
document.head.appendChild( koccss );
document.body.appendChild( jqui );
document.body.appendChild( koc );