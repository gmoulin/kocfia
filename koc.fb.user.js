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

//check after 30s if the game is loaded
setTimeout(function(){
	if( document.getElementById('app_content_130402594779') == null ){
		console.info('reloading');
		unsafewindow.location.reload(true);
	}
}, 60000);
