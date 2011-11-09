// ==UserScript==
// @name			KOC
// @version			0.1
// @namespace		KOC
// @description		améliorations et automatisations diverses pour KOC
// @require			http://userscripts.org/scripts/source/68059.user.js
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

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

//inject the scripts
var jq = document.createElement('script');
jq.src = "http://code.jquery.com/jquery-1.7.min.js";

var jqnc = document.createElement('script');
jqnc.innerHTML = "jQuery.noConflict();";

var jqui = document.createElement('script');
jqui.src = "http://koc.kapok.fr/jquery-ui-1.8.16.custom.min.js";

var koc = document.createElement('script');
koc.src = "http://koc.kapok.fr/koc.js";

document.body.appendChild( jq );
document.body.appendChild( jqnc );
document.body.appendChild( jqui );
document.body.appendChild( koc );

