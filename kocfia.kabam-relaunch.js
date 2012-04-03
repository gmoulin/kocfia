// ==UserScript==
// @name			KOCFIA-KABAM-RELAUNCH
// @version			1
// @namespace		KOCFIA
// @description		reload new servers (347, 348) of kingdoms of camelot from kabam page after 10 seconds
// @include			*www.kingdomsofcamelot.com/fb/e2/fbLoginButton.php*
// ==/UserScript==

unsafeWindow.setTimeout(function(){
	unsafeWindow.document.getElementById('hitArea').parentNode.click();
}, 10000);
