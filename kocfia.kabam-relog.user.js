// ==UserScript==
// @name			KOCFIA-KABAM-RELOG
// @version			1
// @namespace		KOCFIA
// @description		reload new servers (347, 348) of kingdoms of camelot from kabam page after 10 seconds
// @include			*www.kingdomsofcamelot.com/fb/e2/fbLoginButton.php*
// ==/UserScript==

var check = GM_getValue('timeout', false);
unsafeWindow.console.log('timeout', check);
unsafeWindow.console.log('login', typeof unsafeWindow.login);

if( !check && typeof unsafeWindow.login == 'function' ){
	GM_setValue('timeout', true);

	unsafeWindow.setTimeout(function(){
		unsafeWindow.console.log('in');
		GM_deleteValue('timeout');
		unsafeWindow.login();
	}, 10000);
}
