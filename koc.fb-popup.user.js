// ==UserScript==
// @name			KOC-FB-POPUP
// @version			0.1
// @namespace		KOC
// @description		facebook popup management
// @include			*facebook.com/connect/uiserver.php*
// ==/UserScript==
console.log('koc-fb-popup start');

console.log('cancel button', unsafeWindow.document.getElementById('uvsplj_8'));
console.log('submit button', unsafeWindow.document.getElementById('uvsplj_7'));

console.log('privacy select', unsafeWindow.document.querySelector('#platform_dialog_bottom_bar select'));

var channel = unsafeWindow.document.querySelector('#uiserver_form input[name=channel]');
console.log('channel', channel);
if( channel.value.match(/kingdomsofcamelot\.com\/.+\/cross_iframe\.htm$/) ){
	var active = GM_getValue('active');
	console.log('active', active);
	if( active ){
		var cancel = GM_getValue('cancel');
		var post = GM_getValue('post');
		console.log('cancel', cancel);
		console.log('post', post);

		if( post ){
			var privacyLevel = GM_getValue('privacyLevel');
			console.log('privacyLevel', privacyLevel);
			var privacy = unsafeWindow.document.querySelector('#platform_dialog_bottom_bar select');
			privacy.innerHTML = '<option value="'+ privacyLevel +'"></option>';
			privacy.selectedIndex = 0;
			unsafeWindow.document.getElementById('uvsplj_7').click();
		} else if( cancel ){
			unsafeWindow.document.getElementById('uvsplj_8').click();
		}
	}
}
