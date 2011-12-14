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
var reloadWindow = setTimeout(function(){ console.log('reloading'); unsafeWindow.location.reload(true); }, 120000);
unsafeWindow.addEventListener('message', function(event){
	console.log('unsafeWindow message', event);
	if( event.origin.indexOf('kingdomsofcamelot.com') != -1 ){
		clearTimeout( reloadWindow );
		reloadWindow = setTimeout(function(){ console.log('reloading'); unsafeWindow.location.reload(true); }, 120000);
	}
}, false);

