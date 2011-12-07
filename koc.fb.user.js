// ==UserScript==
// @name			KOC-FB
// @version			0.1
// @namespace		KOC
// @description		facebook page improvement for KOC (outside the KOC iframe)
// @include			*apps.facebook.com/kingdomsofcamelot*
// ==/UserScript==
console.info('koc-fb start');

var fbCss = "body.canvas div#globalContainer { padding: 0; }"
	+ "\nbody.canvas #rightCol { display: none; }"
	+ "\nbody.canvas.center_fixed_width_app #pagelet_canvas_content { width: auto; margin: 0; }"
	+ "\nbody.canvas #mainContainer { border: none; }"
;
var styleElement = document.createElement("style");
styleElement.innerHTML = fbCss;
document.getElementsByTagName("head")[0].appendChild(styleElement);

//reload after 60s if no message from the koc iframe
var isKocLoaded = setTimeout(function(){ unsafewindow.location.reload(true); }, 60000);
unsafewindow.addEventListener('message', function(event){
	console.log(event);
	if( event.origin != 'http://koc.kapok.fr' ){
		clearTimeout( isKocLoaded );
		isKocLoaded = setTimeout(function(){ unsafewindow.location.reload(true); }, 60000);
	}
}, false);

setTimeout(function(){
	console.log(window.frames);
	console.log(top.frames);
	console.log(parent.frames);
}, 5000);
