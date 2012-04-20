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
	var fbCss = "body.canvas div#globalContainer { padding: 0; }"
		+ "\nbody.canvas #rightCol { display: none; }"
		+ "\nbody.canvas.center_fixed_width_app #pagelet_canvas_content { width: auto; margin: 0; }"
		+ "\nbody.canvas #mainContainer { border: none; }";
} else { //from kabam
	var fbCss = "#main-header, #main-nav { display: none; }"
		+ "\n.play #content { margin-top: 0; height: 300%; width: 100%; }"
		+ "\n#game_frame, #gameIframe { width: 100%; height: 100%; display: block !important; }"
		+ "\nhtml, body, #canvas { height: 100%; }";
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
