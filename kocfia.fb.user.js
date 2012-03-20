// ==UserScript==
// @name			KOCFIA-FB-PAGE
// @version			1
// @namespace		KOCFIA
// @description		facebook page improvement for KOC (outside the KOC iframe)
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

var fbCss = "body.canvas div#globalContainer { padding: 0; }"
	+ "\nbody.canvas #rightCol { display: none; }"
	+ "\nbody.canvas.center_fixed_width_app #pagelet_canvas_content { width: auto; margin: 0; }"
	+ "\nbody.canvas #mainContainer { border: none; }"
;
var styleElement = document.createElement("style");
styleElement.innerHTML = fbCss;
document.getElementsByTagName("head")[0].appendChild(styleElement);

//reload after 60s if no message from the koc iframe
var reloadWindow = setTimeout(function(){ console.log('reloading'); unsafeWindow.location.reload(true); }, 120000);

unsafeWindow.addEventListener('message', function(event){
	if( event.origin.indexOf('kingdomsofcamelot.com') != -1 ){
		if( event.data == 'loaded' ){
			clearTimeout( reloadWindow );
			reloadWindow = setTimeout(function(){ console.log('reloading'); unsafeWindow.location.reload(true); }, 120000);
		} else if( event.data == 'giftList' ){
			unsafeWindow.console.info('event fb', event.data);
			GM_xmlhttpRequest({
				method: 'GET',
				url: unsafeWindow.location.protocol +'//www.facebook.com/reqs.php#confirm_130402594779_0',
				onload: function( response ){
					//unsafeWindow.console.log('load fb', {task: event.data, result: response.responseText});
					event.source.postMessage({task: event.data, result: response.responseText}, event.origin);
				}
			});
		} else if( Object.isObject(event.data) && event.data.hasOwnProperty('task') ){
			unsafeWindow.console.info('event fb', event.data);
			if( event.data.task == 'firstMethodStepOne' ){
				GM_xmlhttpRequest({
					method: 'GET',
					url: event.data.url,
					onload: function( response ){
						//unsafeWindow.console.log('load fb', {task: event.data.task, result: response.responseText});
						event.source.postMessage({task: event.data.task, result: response.responseText}, event.origin);
					}
				});
			} else if( event.data.task == 'secondMethodStepOne' ){
				GM_xmlhttpRequest({
					method: 'GET',
					url: unsafeWindow.location.protocol +'//apps.facebook.com/kingdomsofcamelot/?fb_source=request&request_ids='+ event.data.param,
					onload: function( response ){
						//unsafeWindow.console.log('load fb', {task: event.data.task, result: response.responseText});
						event.source.postMessage({task: event.data.task, result: response.responseText}, event.origin);
					}
				});
			} else if( event.data.task == 'deleteGift' ){
				GM_xmlhttpRequest({
					method: 'POST',
					url: event.data.url,
					param: event.data.param,
					onload: function( response ){
						//unsafeWindow.console.log('load fb', {task: event.data.task, result: response.responseText});
						event.source.postMessage({task: event.data.task, result: response.responseText}, event.origin);
					}
				});
			}
		}
	}
}, false);
