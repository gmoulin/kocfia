// ==UserScript==
// @name          KOC-FB
// @version       0.1
// @namespace     KOC
// @description   améliorations et automatisations diverses pour KOC
// @include        *apps.facebook.com/kingdomsofcamelot*
// ==/UserScript==
var fbCss = "body.canvas div#globalContainer { padding: 0; }"
	+ "body.canvas #rightCol { display: none; }"
	+ "body.canvas.center_fixed_width_app #pagelet_canvas_content { width: auto; margin: 0; }"
	+ "body.canvas #mainContainer { border: none; }"
;

var styleElement = document.createElement("style");
styleElement.styleSheet.cssText = fbCss;
document.getElementsByTagName("head")[0].appendChild(styleElement);

