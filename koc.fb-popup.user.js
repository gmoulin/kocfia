// ==UserScript==
// @name			KOC-FB-POPUP
// @version			0.1
// @namespace		KOC
// @description		facebook popup management
// @require			http://userscripts.org/scripts/source/68059.user.js
// @include			*facebook.com/connect/uiserver.php*
// ==/UserScript==
console.log('koc-fb-popup start');

console.log('cancel button', document.getElementById('uvsplj_8'));
console.log('submit button', document.getElementById('uvsplj_7'));

console.log('privacy select', document.querySelector('#platform_dialog_bottom_bar select'));

if( typeof window.Storage != "undefined" ){
	var kocConf = localStorage.getObject('koc_conf');
	if( kocConf && kocConf.fb-wall-popup.active ){
		var channel = document.querySelector('#uiserver_form input[name=channel]');
		console.log('channel', channel);
		if( channel.value.match(/kingdomsofcamelot\.com\/.+\/cross_iframe\.htm$/) ){
			if( kocConf.fb-wall-popup.cancel ){
				document.getElementById('uvsplj_8').click();
			} else if( kocConf.fb-wall-popup.post ){
				var privacy = document.querySelector('#platform_dialog_bottom_bar select');
				privacy.innerHTML = '<option value="'+ kocConf.fb-wall-popup.privacyLevel +'"></option>';
				privacy.selectedIndex = 0;
				document.getElementById('uvsplj_7').click();
			}
		}
	}
}

