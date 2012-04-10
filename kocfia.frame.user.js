// ==UserScript==
// @name			KOCFIA-MAIN
// @version			2
// @namespace		KOCFIA
// @description		améliorations et automatisations diverses pour KOC
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

/* array isArray */
if( !Array.hasOwnProperty('isArray') ){
	Array.isArray = function(value){
		return Object.prototype.toString.apply(value) === '[object Array]';
	};
}

/* object isObject */
if( !Object.hasOwnProperty('isObject') ){
	Object.isObject = function(value){
		return Object.prototype.toString.apply(value) === '[object Object]';
	};
}

/* string trim */
if( !String.prototype.hasOwnProperty('trim') ){
	String.prototype.trim = (function(re){
		return function(){
			return this.replace(re, "$1");
		};
	}(/^\s*(\S*(\s+\S+)*)\s*$/));
}

var kocFrame = unsafeWindow.parent.document.getElementById('kocIframes1');
//force koc iframe to width 100%
if( kocFrame ) kocFrame.style.width = '100%';

var kocForm = unsafeWindow.parent.document.getElementById('kocIframesForm1');
if( kocForm ){
	var kocReload = unsafeWindow.document.createElement('script');
	kocReload.innerHTML = "var reloadParams = {url: '"+ kocForm.action +"', signed: '"+ kocForm.querySelector('input').value +"'};";
	unsafeWindow.document.body.appendChild( kocReload );
}

//force wrapping iframe to width 100%
var style = unsafeWindow.document.createElement('style');
style.innerHTML = 'body { margin:0; width:100% !important;}';
if( kocFrame ) kocFrame.parentNode.appendChild(style);

var kocCss = unsafeWindow.document.createElement('style');
kocCss.innerHTML = "#crossPromoBarContainer, #progressBar { display: none !important; }";
unsafeWindow.document.head.appendChild( kocCss );

var loadInCache = function(url){
	var obj = unsafeWindow.document.createElement('object');
	obj.data = url;
	obj.width  = 0;
	obj.height = 0;
	unsafeWindow.document.body.appendChild(obj);
};

var isEmptyObject = function(obj) {
	return Object.keys(obj).length === 0;
};

var trys = 60;
var tag;
var anchor = unsafeWindow.document.getElementsByTagName('script')[0];
var load = function(){
	if( unsafeWindow.seed && !isEmptyObject(unsafeWindow.seed.cities) && !isEmptyObject(unsafeWindow.seed.citystats) ){
		for( i = 0; i < preload.length; i += 1 ){
			if( preload[i].indexOf('.css') === -1 ){
				tag = unsafeWindow.document.createElement('script');
				if( preload[i].indexOf('jquery.min.js') > -1 ){
					tag.onload = function(){
						tag = unsafeWindow.document.createElement('script');
						tag.innerHTML = "jQuery.noConflict()";
						anchor.parentNode.insertBefore(tag, anchor);
					};
				}
				tag.src = preload[i];
			} else {
				tag = unsafeWindow.document.createElement('link');
				tag.rel = "stylesheet";
				tag.href = preload[i];
				tag.type = "text/css";
			}
			anchor.parentNode.insertBefore(tag, anchor);
		}
	} else {
		trys -= 1;
		if( trys <= 0 ) unsafeWindow.location.reload();
		else unsafeWindow.setTimeout(function(){ load(); }, 1000);
	}
};

var start = function(){
	//if the page is already loaded, call load immediatly, else preload and listen for window load event
	if( "undefined" != typeof(unsafeWindow.document.readyState) && "complete" === unsafeWindow.document.readyState ){
		load();
	} else {
		for( i = 0; i < preload.length; i += 1 ){
			loadInCache( preload[i] );
		}

		unsafeWindow.addEventListener('load', load, false);
	}
}

//preload KOCFIA but do not execute it
var domain = 'http://kocfia.kapok.dev/',
	d = new Date(), i,
	preload = [
		'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', //latest 1.x.x jquery
		domain + "jquery-ui-1.8.18.custom.min.js",
		domain + "jquery-ui-1.8.18.custom.css",
		domain + "jquery.miniColors.css",
		domain + "jquery.miniColors.min.js",
		domain + "jquery.tipsy.css",
		domain + "jquery.tipsy.min.js",
		domain + "kocfia.confPanel.css?ts=" + d.getTime(),
		domain + "kocfia.js?ts=" + d.getTime()
	];

//try to get timestamps
var request = GM_xmlhttpRequest({
	method: 'GET',
	url: domain + 'getTimestamps.php',
	onload: function(response){
		var tmp = JSON.parse(response.responseText);
		if( Array.isArray(tmp) && tmp.length ){
			preload = tmp;
		}
		start();
	},
	onerror: function(){
		start();
	},
	onabort: function(){
		start();
	}
});

unsafeWindow.setTimeout(function(){ request.abort(); }, 3000);
