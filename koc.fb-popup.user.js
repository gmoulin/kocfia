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

	unsafeWindow.addEventListener(function(event){
		console.log(event);
		if( event.origin == 'http://koc.kapok.fr' ){
			if( event.data.active ){
				if( event.data.post ){
					var privacy = unsafeWindow.document.querySelector('#platform_dialog_bottom_bar select');
					privacy.innerHTML = '<option value="'+ event.data.privacyLevel +'"></option>';
					privacy.selectedIndex = 0;
					unsafeWindow.document.getElementById('uvsplj_7').click();
				} else if( event.data.cancel ){
					unsafeWindow.document.getElementById('uvsplj_8').click();
				}
			}
		}
	}, false);

	unsafeWindow.parent.postMessage('fbWallPopup data please', 'http://koc.kapok.fr');
}

setTimeout(function(){
	console.log('frames from popup');
	console.log(window.frames);
	console.log(top.frames);
	console.log(parent.frames);
}, 5000);

