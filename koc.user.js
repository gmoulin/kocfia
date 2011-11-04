// ==UserScript==
// @name			KOC
// @version			0.1
// @namespace		KOC
// @description		améliorations et automatisations diverses pour KOC
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require			http://koc.kapok.fr/jquery-ui-1.8.16.custom.min.js
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==
console.log('koc start');
var kocCss = "#crossPromoBarContainer, #progressBar { display: none !important; }"
		+ "\n.draggable .handle { cursor: move; }"
;

$('head').append( $('<link rel="stylesheet" href="http://koc.kapok.fr/jquery-ui-1.8.16.custom.css" type="text/css">') )
		 .append( $('<style>').text(kocCss) );

console.log('koc css inject done');

var kocFrame = parent.document.getElementById('kofc_iframe_0');
//force koc iframe to width 100%
kocFrame.style.width = '100%';

//force wrapping iframe to width 100%
var style = document.createElement('style')
style.innerHTML = 'body { margin:0; width:100% !important;}';
kocFrame.parentNode.appendChild(style);

console.log('koc iframe width to 100% done');

console.log(window.Storage);
console.log(unsafeWindow.Storage);
console.log(Storage);
/* localStorage helpers */
	localStorage.setObject = function(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	}

	localStorage.getObject = function(key){
		var value = localStorage.getItem(key);
		return value && JSON.parse(value);
	}

console.log('before KOC object declaration');
var KOC = {
	'init': function(){
		console.log('KOC init function');
		/* get stored conf if present */
			try {
				var storedConf = localStorage.getObject('koc_conf');
				if( storedConf ){
					$.extend(true, this.conf, storedConf);
				}
			} catch( e ){
				alert(e);
			}

		console.log(this.conf);

		if( this.conf.chatOptions.active ){
			this.initChat();
		}

	},
	'initChat': function(){
		console.log('chat init');

		//Chat :
		//- placement
		$('#kocmain_bottom').find('div.mod_comm').draggable({
			helper: "original",
			//handle: 'p',
		});
		//- couleur
		//- suppression du superflu (demande aide et son résultat)

	},
	/* default conf */
	'conf': {
		'chatOptions': {
			'active': 1,
			'resizable': 1,
			'draggable': 1,
			'position': {'top': 0, 'left': 0},
			'alerts': {},
			'cleanHelp': 1,
		},
	}
};

console.log('after KOC object declaration');

KOC.init();

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

//Coordination :
//Si on pouvait intégrer le planificateur ce serait top (au moins les données source : récupérer tous les temps de marche des pourfendeurs connectés jusqu'à un point donné, pour un type d'unité à choisir)

