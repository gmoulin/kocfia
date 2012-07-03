// ==UserScript==
// @name			KOCFIA-PAGE
// @version			2
// @namespace		KOCFIA
// @description		Page improvements for kingdoms of camelot (outside the game iframe), manage both facebook or kabam pages for kingdoms of camelot game. Also used to manage mass gifts retrieval.
// @include			*kabam.com/kingdoms-of-camelot/play*
// @include			*kabam.com/kingdoms-of-camelot/?entrypt*
// @include			*apps.facebook.com/kingdomsofcamelot/?s=*
// @include			*apps.facebook.com/kingdomsofcamelot/?ref=bookmark*
// @include			*apps.facebook.com/kingdomsofcamelot/?g=F*
// ==/UserScript==

/* object isObject */
if( !Object.hasOwnProperty('isObject') ){
	Object.isObject = function(value){
		return Object.prototype.toString.apply(value) === '[object Object]';
	};
}

if( unsafeWindow.location.href.indexOf('kabam.com') == -1 ){ //from facebook
	var fbCss = "body.canvas div#globalContainer { padding: 0; }";
	fbCss += "\nbody.canvas { width: 150%; overflow: auto; height: 3000px; }";
	fbCss += "\nbody.canvas #rightCol, #pagelet_canvas_footer_content { display: none; }";
	fbCss += "\nbody.canvas.center_fixed_width_app #pagelet_canvas_content { width: auto; margin: 0; }";
	fbCss += "\nbody.canvas #mainContainer { border: none; }";
	fbCss += "\nbody.canvas.ego_wide .hasRightCol #contentArea { width: 100% !important; display: block !important; height: 100% !important; }";
	fbCss += "\nbody.canvas .canvas_rel_positioning { overflow: visible; height: 100% !important; }";
	fbCss += "\n#pagelet_iframe_canvas_content > div { position: relative; }";
	fbCss += "\n#iframe_canvas { position: absolute; top: 0; height: 2500px !important; overflow: hidden; }";
	fbCss += "\nhtml, #globalContainer, #canvas, #content, #content > div, #mainContainer, #contentCol, #pagelet_canvas_content, #pagelet_iframe_canvas_content, #pagelet_iframe_canvas_content > div { height: 100% !important; }";
} else { //from kabam
	var fbCss = "#main-header, #main-nav { display: none; }";
	fbCss += "\n.play #content { margin-top: 0; height: 300%; width: 150%; }";
	fbCss += "\n#game_frame, #gameIframe { width: 100%; height: 100%; display: block !important; overflow: auto; }";
	fbCss += "\nhtml, body, #canvas { height: 100%; }";
}

var styleElement = document.createElement("style");
styleElement.innerHTML = fbCss;
document.getElementsByTagName("head")[0].appendChild(styleElement);

var styleElement = document.createElement("style");
styleElement.innerHTML = fbCss;
document.getElementsByTagName("head")[0].appendChild(styleElement);

//reload after 60s if no message from the koc iframe
var reloadWindow = setTimeout(function(){ unsafeWindow.location.reload(true); }, 120000);

unsafeWindow.addEventListener('message', function(event){
	if( event.origin.indexOf('kingdomsofcamelot.com') != -1 ){
		if( event.data == 'loaded' ){
			clearTimeout( reloadWindow );
			reloadWindow = setTimeout(function(){ unsafeWindow.location.reload(true); }, 120000);
		}
	}
}, false);
