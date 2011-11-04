// ==UserScript==
// @name			KOC-FB
// @version			0.1
// @namespace		KOC
// @description		facebook page improvement for KOC (outside the KOC iframe)
// @include			*apps.facebook.com/kingdomsofcamelot*
// ==/UserScript==
console.log('koc-fb start');
var fbCss = "body.canvas div#globalContainer { padding: 0; }"
	+ "\nbody.canvas #rightCol { display: none; }"
	+ "\nbody.canvas.center_fixed_width_app #pagelet_canvas_content { width: auto; margin: 0; }"
	+ "\nbody.canvas #mainContainer { border: none; }"
;
var styleElement = document.createElement("style");
styleElement.innerHTML = fbCss;
document.getElementsByTagName("head")[0].appendChild(styleElement);

