// ==UserScript==
// @name			KOCFIA-MAIN
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

jQuery.noConflict();

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

//injection
document.head.appendChild( kocCss );
document.body.appendChild( kocReload );

//preload KOCFIA but do not execute it
var domain = 'http://kocfia-dev.kapok.fr/',
	d = new Date(), i,
	cached = 0,
	preload = [
		'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
		domain + "jquery-ui-1.8.17.custom.min.js",
		domain + "jquery-ui-1.8.17.custom.css",
		domain + "kocfia.js?ts=" + d.getTime()
	];

var loadInCache = function(url){
	var obj = document.createElement('object');
	obj.data = url;
	obj.width  = 0;
	obj.height = 0;
	/*obj.onload = function(){ cached++; };
	obj.onerror = function(){ cached++; };*/
	document.body.appendChild(obj);
};

var isEmptyObject = function(obj) {
	return Object.keys(obj).length === 0;
};

var trys = 60, el, anchor = document.getElementsByTagName('script')[0];
function load(){
	if( window.seed && !isEmptyObject(window.seed.cities) && !isEmptyObject(window.seed.citystats) ){
		for( i = 0; i < preload.length; i += 1 ){
			if( preload[i].indexOf('.css') === -1 ){
				el = document.createElement('script');
				el.src = preload[i];
			} else {
				el = document.createElement('link');
				el.rel = "stylesheet";
				el.href = preload[i];
				el.type = "text/css";
			}
			el.onload = se.onreadystatechange = initWhenLoaded;
			anchor.parentNode.insertBefore(el, anchor);
		}
	} else {
		trys -= 1;
		if( trys <= 0 ) window.location.reload();
		else window.setTimeout(function(){ load(); }, 1000);
	}
};

//if the page is already loaded, call load immediatly, else preload and listen for window load event
if( "undefined" != typeof(document.readyState) && "complete" === document.readyState ){
	load();
} else {
	for( i = 0; i < preload.length; i += 1 ){
		loadInCache( preload[i] );
	}

	window.addEventListener('load', load, false);
}

