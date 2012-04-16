// ==UserScript==
// @name			KOCFIA-KABAM-RELOG
// @version			1
// @namespace		KOCFIA
// @description		reload new servers (347, 348) of kingdoms of camelot from kabam page after 10 seconds
// @include			*www.kingdomsofcamelot.com/fb/e2/fbLoginButton.php*
// ==/UserScript==

if( typeof unsafeWindow.login == 'function' ){
	unsafeWindow.setInterval(function(){
		unsafeWindow.login();
	}, 10000);
}
