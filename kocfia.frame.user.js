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
 * i.e. no console, no localStorage, ...
 */

//console.log('ok');
var kocFrame = parent.document.getElementById('kocIframes1');
//force koc iframe to width 100%
if( kocFrame ) kocFrame.style.width = '100%';

var kocForm = parent.document.getElementById('kocIframesForm1');
if( kocForm ){
	var kocReload = document.createElement('script');
	kocReload.innerHTML = "var reloadParams = {url: '"+ kocForm.action +"', signed: '"+ kocForm.querySelector('input').value +"'};";
	document.body.appendChild( kocReload );
}

//force wrapping iframe to width 100%
var style = document.createElement('style');
style.innerHTML = 'body { margin:0; width:100% !important;}';
if( kocFrame ) kocFrame.parentNode.appendChild(style);

var kocCss = document.createElement('style');
kocCss.innerHTML = "#crossPromoBarContainer, #progressBar { display: none !important; }";
document.head.appendChild( kocCss );

//preload KOCFIA but do not execute it
var domain = 'http://kocfia.kapok.dev/',
	d = new Date(), i,
	preload = [
		'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
		domain + "jquery-ui-1.8.17.custom.min.js",
		domain + "jquery-ui-1.8.17.custom.css",
		domain + "jquery.miniColors.css",
		domain + "jquery.miniColors.min.js",
		domain + "jquery.tablesorter.min.js",
		domain + "kocfia.confPanel.css?ts=" + d.getTime(),
		domain + "kocfia.js?ts=" + d.getTime()
	];

var loadInCache = function(url){
	//console.log('loadInCache');
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

var trys = 60;
var tag;
var anchor = document.getElementsByTagName('script')[0];
var load = function(){
	//console.log('load');
	if( window.seed && !isEmptyObject(window.seed.cities) && !isEmptyObject(window.seed.citystats) ){
		for( i = 0; i < preload.length; i += 1 ){
			if( preload[i].indexOf('.css') === -1 ){
				tag = document.createElement('script');
				if( preload[i].indexOf('jquery.min.js') > -1 ){
					tag.onload = function(){
						tag = document.createElement('script');
						tag.innerHTML = "jQuery.noConflict();";
						anchor.parentNode.insertBefore(tag, anchor);
					};
				}
				tag.src = preload[i];
			} else {
				tag = document.createElement('link');
				tag.rel = "stylesheet";
				tag.href = preload[i];
				tag.type = "text/css";
			}
			anchor.parentNode.insertBefore(tag, anchor);
		}
	} else {
		trys -= 1;
		if( trys <= 0 ) window.location.reload();
		else window.setTimeout(function(){ load(); }, 1000);
	}
};

//if the page is already loaded, call load immediatly, else preload and listen for window load event
if( "undefined" != typeof(document.readyState) && "complete" === document.readyState ){
	//console.log('immediate');
	load();
} else {
	//console.log('delayed');
	for( i = 0; i < preload.length; i += 1 ){
		loadInCache( preload[i] );
	}

	window.addEventListener('load', load, false);
}

