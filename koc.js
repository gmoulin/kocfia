// ==UserScript==
// @name          KOC
// @version       0.1
// @namespace     KOC
// @description   améliorations et automatisations diverses pour KOC
// @include        *.kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

/* load jQuery when KOC app is ready */
	//detect koc app loading

	//add jQuery from google CDN
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
		document.body.append( script );

		var jq = jQuery.noConflict();

/* localStorage helpers */
	/**
	 * localStorage method for caching javascript objects
	 */
	if( typeof Storage != "undefined" ){
		Storage.prototype.setObject = function(key, value){
			this.setItem(key, JSON.stringify(value));
		}

		Storage.prototype.getObject = function(key){
			return this.getItem(key) && JSON.parse( this.getItem(key) );
		}
	} else {
		alert('Pour utiliser ce script veuillez mettre à jour votre navigateur !')
	}

var KOC = {
	'init': function(){
		/* default conf */
		this.conf = {};

		/* get stored conf if present */
			try {
				var storedConf = localStorage.getObject('koc_conf');
				if( storedConf ){
					$.extend(true, this.conf, storedConf);
				}
			} catch( e ){
				alert(e);
			}

		/* page redesign */
	},
	'redesign': function(){

	}
};


(function($){
	KOC.init();
})(jq)
