// ==UserScript==
// @name			KOCFIA-KABAM-PAGE-KO
// @version			1
// @namespace		KOCFIA
// @description		reload kabam koc page when ko (server not found, connection reset, ...)
// @include			*www.kabam.com/kingdoms-of-camelot/
// @include			*www.kabam.com/kingdoms-of-camelot/play?*
// @include			*www.kabam.com/kingdoms-of-camelot/?encrypt=*
// ==/UserScript==

unsafeWindow.console.log('page ', GM_getValue('timeout', false));
GM_deleteValue('timeout');

