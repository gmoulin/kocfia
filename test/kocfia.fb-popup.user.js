// ==UserScript==
// @name			KOCFIA-FB-POPUP
// @version			0.1
// @namespace		KOC
// @description		facebook popup management
// @include			*facebook.com/dialog/feed*
// ==/UserScript==
console.log('koc-fb-popup start');

console.log('cancel button', unsafeWindow.document.querySelector('input[type=submit][name=cancel]'));
console.log('submit button', unsafeWindow.document.querySelector('input[type=submit][name=publish]'));

console.log('privacy select', unsafeWindow.document.querySelector('#platform_dialog_bottom_bar select'));

var channel = unsafeWindow.document.querySelector('#uiserver_form input[name=channel]');
console.log('channel', channel);
if( channel.value.match(/kingdomsofcamelot\.com\/.+\/cross_iframe\.htm$/) ){

	unsafeWindow.addEventListener(function(event){
		console.log(event);
		if( event.origin.indexOf('kingdomsofcamelot.com') != -1 ){
			if( event.data.active ){
				if( event.data.post ){
					unsafeWindow.document.querySelector('input[type=submit][name=publish]').click();
				} else if( event.data.cancel ){
					unsafeWindow.document.querySelector('input[type=submit][name=cancel]').click();
				}
			}
		}
	}, false);

	unsafeWindow.parent.postMessage('fbWallPopup module conf please', 'https://apps.facebook.com/');
	unsafeWindow.parent.postMessage('fbWallPopup module conf please', 'http://apps.facebook.com/');
}

