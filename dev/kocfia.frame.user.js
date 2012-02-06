// ==UserScript==
// @name			KOCFIA-MAIN
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
var kocFrame = parent.document.getElementById('kocIframes1');
//force koc iframe to width 100%
kocFrame.style.width = '100%';

var kocForm = parent.document.getElementById('kocIframesForm1');
var kocReload = document.createElement('script');
kocReload.innerHTML = "var reloadParams = {url: '"+ kocForm.action +"', signed: '"+ kocForm.querySelector('input').value +"'};";

//force wrapping iframe to width 100%
var style = document.createElement('style')
style.innerHTML = 'body { margin:0; width:100% !important;}';
kocFrame.parentNode.appendChild(style);

var kocCss = document.createElement('style');
kocCss.innerHTML = "#crossPromoBarContainer, #progressBar { display: none !important; }";

var domain = 'http://kocfia-dev.kapok.fr/';

//inject the css
var jquiCss = document.createElement('link');
jquiCss.rel = "stylesheet";
jquiCss.href = domain + "jquery-ui-1.8.17.custom.css";
jquiCss.type = "text/css";

//inject the scripts
var jqui = document.createElement('script');
jqui.src = domain + "jquery-ui-1.8.17.custom.min.js";

var kocfia = document.createElement('script'),
	d = new Date();
kocfia.src = domain + "kocfia.js?ts=" + d.getTime();


document.head.appendChild( jquiCss );
document.head.appendChild( kocCss );
document.body.appendChild( jqui );
document.body.appendChild( kocReload );
document.body.appendChild( kocfia );
