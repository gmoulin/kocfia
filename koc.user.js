// ==UserScript==
// @name          KOC
// @version       0.1
// @namespace     KOC
// @description   améliorations et automatisations diverses pour KOC
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require http://koc.kapok.fr/jquery-ui-1.8.16.custom.js
// @include        *kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==
var kocCss = "#crossPromoBarContainer, #progressBar { display: none !important; }"
;

$('head').append( $('<link rel="stylesheet" href="http://koc.kapok.fr/jquery-ui-1.8.16.custom.css" type="text/css">') )
		 .append( $('<style>').text(kocCss) );

var kocFrame = parent.document.getElementById('kofc_iframe_0');
//force koc iframe to width 100%
kocFrame.style.width = '100%';

//force wrapping iframe to width 100%
var style = document.createElement('style')
style.innerHTML = 'body { margin:0; width:100% !important;}';
kocFrame.parentNode.appendChild(style);

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
		this.conf = {
			'chat': this.chatOptions,
		};

		/* get stored conf if present */
			try {
				var storedConf = localStorage.getObject('koc_conf');
				if( storedConf ){
					$.extend(true, this.conf, storedConf);
				}
			} catch( e ){
				alert(e);
			}

		if( this.conf.chat.active ){
			this.initChat();
		}

	},
	'chatOptions': {
		'active': 1,
		'resizable': 1,
		'draggable': 1,
		'position': {'top': 0, 'left': 0},
		'alerts': {},
		'cleanHelp': 1,
	},
	'initChat': function(){
		console.log('chat init');

		//Chat :
		//- placement
		$('#chat').draggable({

		});
		//- couleur
		//- suppression du superflu (demande aide et son résultat)

	}
};

//Construction :
//- mise en place de la ville (à détailler)
	//- positionnement
	//- nombre
//- file d'attente des construction par ville
	//- modifiable (suppression, insertion, ordre)
	//- gestion des erreurs

//Entraînement :
//- entraînement automatique
//- entraînement programmé (x miliciens puis y archers puis ...)
//- prise en compte des options (accélérations, ...)

//Recherche :
//- file d'attente des recherches par ville

//Statistiques :
//- consommation
//- autonomie
//- formation
//- gains

//Exploration :
//- recherche de TS / CB / FS
//- recherche ennemi

//Alerte :
//- attaque
	//- plusieurs niveaux de dangerosité (éclairage, grosse attaque, vidage, ...)
//- manque de nourriture
//- manque de ressource (couplée avec les files d'attente)

//Rapport :
//- auto-suppression
//- sauvegarde
//- consultation simplifiée
//- scan des rapports d'alliance
//- vision claire des horaires

//Attaque :
//- CB
//- TS
  //- vérification vague 1 et 2
  //- liste de coordonnées
  //- uniquement les vides ou non (exploration)
//- rappel des quantités de troupes (mode anti-post-it :P)
//- mode rainbow (1 cible, x attaques de y miliciens)

//Renforcement :
//- garder x miliciens dans la ville 1, le reste va à la ville 2
//- prise en compte des attaques (CB, ...)

//Transport Ressources :
//- garder x minerais dans la ville 1, le reste va à la ville 2
//- utilisation wagon ou cavalerie
//- approvisionnement ville x à partri de ville y si ressources < z


KOC.init();
