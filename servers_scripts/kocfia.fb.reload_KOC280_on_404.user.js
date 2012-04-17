// ==UserScript==
// @name			KOCFIA-FB-RELOAD-KOC280-ON-404
// @version			1
// @namespace		KOCFIA
// @description		reload kingdoms of camelot on server 280 when facebook display the 404 page after 10 seconds
// @include			*facebook.com/4oh4.php*
// ==/UserScript==

unsafeWindow.setTimeout(function(){
	unsafeWindow.location = unsafeWindow.location.protocol +'//apps.facebook.com/kingdomofcamelot/?s=280';
}, 10000);
