/* helpers */
	//localStorage method for caching javascript objects
		if( typeof window.Storage != "undefined" ){
			window.Storage.prototype.setObject = function(key, value){
				this.setItem(key, JSON.stringify(value));
			};

			window.Storage.prototype.getObject = function(key){
				var item = this.getItem(key);
				return item && (item !== 'undefined') && JSON.parse( item );
			};
		} else {
			alert('Pour utiliser ce script veuillez mettre à jour votre navigateur !');
		}

	String.prototype.capitalize = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	// Return new array with duplicate values removed
	Array.prototype.unique = function(){
		var o = {}, i, l = this.length, r = [];
		for( i = 0; i < l; i += 1 ) o[ this[i] ] = this[i];
		for( i in o ) r.push( o[i] );
		return r;
	};

	var uniqueObject = function( arr ){
		var hash = {}, result = [], i , length = arr.length;
		for( i = 0; i < length; i += 1 ){
			var key = JSON.stringify(arr[i]);
			if( !hash.hasOwnProperty( key ) ){
				hash[ key ] = true;
				result.push( arr[i] );
			}
		}
		return result;
	};

	Array.max = function( array ){
		return Math.max.apply( Math, array );
	};

	Array.min = function( array ){
		return Math.min.apply( Math, array );
	};

	/* array isArray */
	if( !Array.hasOwnProperty('isArray') ){
		Array.isArray = function(value){
			return Object.prototype.toString.apply(value) === '[object Array]';
		};
	}

	/* object isObject */
	if( !Object.hasOwnProperty('isObject') ){
		Object.isObject = function(value){
			return Object.prototype.toString.apply(value) === '[object Object]';
		};
	}

	/* date now */
	if( !Date.hasOwnProperty('now') ){
		Date.now = function(){
			return (new Date()).getTime();
		};
	}

	Date.timestamp = function(){
		return Date.now() / 1000;
	};

//prototype json.stringify bug with array
	if( window.Prototype ){
		delete Object.prototype.toJSON;
		delete Array.prototype.toJSON;
		delete Hash.prototype.toJSON;
		delete String.prototype.toJSON;
		delete Number.prototype.toJSON;
		delete Boolean.prototype.toJSON;
	}

//localized
var MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre", "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];
var DAY_NAMES = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

jQuery(document).ready(function(){
//CSS rules declarations
	var chatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; z-index: 99997; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_tabs { background-color: #1054A7; width: auto; top: 0; left: 0; height: 20px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_body { top: 20px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_body form { height: 25px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .mod_comm_forum { padding-left: 0; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction .button20 { top: 2px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction { width: auto; padding: 3px 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input { display: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input_clone { position: absolute; top: 5px; left: 5px; border: 1px solid #A56631; width: 265px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist { width: auto; margin-left: 0; border: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .kocfia-merlin-small { float: right; padding: 4px; font-size: 10px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { height: 20px; line-height: 20px; padding: 0 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 { background: #FCF8DD; height: 20px; line-height: 20px; padding-right: 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background: none; height: 20px; line-height: 20px; padding-left: 5px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { width: auto; float: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .message.clearfix { width: auto; display: block; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info { width: auto; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .nm { padding-left: 18px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width: auto; float: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .flag { display: none; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap img { margin-right: 0; width: 15px; height: 15px; float: none; position: absolute; top: 2px; left: 2px; cursor: pointer; z-index: 1; }";
		chatMoveableCss += "\n.kocmain .mod_comm .tx a { text-decoration: underline; }";
		chatMoveableCss += "\n.kocmain .mod_comm .tx a:hover { text-decoration: none; }";
		chatMoveableCss += "\n#comm_tabs.seltab2 .tab2 { cursor: normal; }";
		chatMoveableCss += "\n#comm_tabs.seltab1 .tab1 { cursor: normal; }";
		chatMoveableCss += "\n.kocmain .mod_comm .kocfia-chat-top-wrapper { height: 20px; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global { top: 0; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .kocfia-chat-list-wrapper { overflow-y: show; overflow-x: hidden; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_global .kocfia-chat-list-wrapper .chatlist { overflow: visible; height: auto; }";
		chatMoveableCss += "\n.kocmain .mod_comm .comm_body { height: auto; }";
		chatMoveableCss += "\n.kocmain .mod_comm .kocfia-chat-bottom { height: 5px; }";

	var chatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }";
		chatHelpCss += "\n.kocmain .mod_comm.ui-draggable { display: block; }";

	var chatHighlightLeadersCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.chancellor:not(.direct) { background-color: %chancellorColor%; }";
		chatHighlightLeadersCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.vice_chancellor:not(.direct) { background-color: %viceChancellorColor%; }";
		chatHighlightLeadersCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.officer:not(.direct) { background-color: %officerColor%; }";

	var chatHighlightFriendsCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.friend:not(.direct) { background-color: %friendColor%; }";
	var chatHighlightFoesCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.foe:not(.direct) { background-color: %foeColor%; }";

	var chatHighlightAlarmCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.attack { background-color: %attackColor%; }";
		chatHighlightAlarmCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.scout { background-color: %scoutColor%; }";
		chatHighlightAlarmCss += "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap.autonomy { background-color: %autonomyColor%; }";

	jQuery.jgrid.no_legacy_api = true;

(function(window, document, $, undefined){
	var $head = $('head'),
		$body = $('body'),
		reloadTimeout, reloadInterval, reloadTimer, refreshTimeout, confChoiceTimeout,
		resetRaidInterval, autoFormationInterval, autoReassignInterval,
		autoPileUpInterval, autoSuppleInterval, watchReportsInterval,
		autoBuildInterval, autoHospitalInterval, autoReportsCleanUpInterval,
		tournamentMonitorInterval,
		merlinBoxClick = false;

	//drag handle
	var moveHandles = '<div class="move-handle move-handle-e"></div>';
		moveHandles += '<div class="move-handle move-handle-w"></div>';
		moveHandles += '<div class="move-handle move-handle-s"></div>';
		moveHandles += '<div class="move-handle move-handle-n"></div>';

	var KOCFIA = {
		version: '0.7.1',
		userScriptLoaderVersion: 3,
		debug: true,
		debugWhat: { //comment module line for no debug
			//shared: 1,
			dataAndStats : 1,
			overview : 1,
			summary : 1,
			chat: 1,
			map: 1,
			//canvas: 1,
			marches: 1,
			barbarian: 1,
			wilderness: 1,
			darkForest: 1,
			scout: 1,
			plunder: 1,
			formation: 1,
			transport: 1,
			reassign: 1,
			knights: 1,
			estates: 1,
			build: 1,
			fbWallPopup: 1,
			notepad: 1,
			alarm: 1,
			hospital: 1,
			throne: 1,
			quickMarch: 1,
			reports: 1,
			search: 1,
			gifts: 1
		},
		server: null,
		captchaDetected: false,
		modules: [
			'dataAndStats',
			'overview', 'summary',
			'chat',
			'map', //'canvas',
			'marches',
			'barbarian', 'wilderness', 'darkForest', 'scout', 'plunder',
			'formation', 'transport', 'reassign',
			'knights', 'estates',
			'build',
			//'fbWallPopup',
			'notepad',
			'alarm',
			'hospital',
			'throne',
			'quickMarch',
			'reports',
			'search',
			'gifts',
			'tournament'
		],
		modulesLabel: {
			dataAndStats: 'Informations et Statistiques',
			overview: 'État des lieux des villes, troupes et ressources',
			summary: 'Résumé',
			chat: 'Chat',
			map: 'Carte',
			canvas: 'Mappemonde',
			marches: 'Marches',
			barbarian: 'Camps Barbares <small>(trône)</small>',
			wilderness: 'Terres Sauvages <small>(armoiries, trône)</small>',
			darkForest: 'Forêts Obscures <small>(éther, trône)</small>',
			scout: 'Éclairages',
			plunder: 'Pillages <small>(ressources sur frigos)</small>',
			formation: 'Formation des troupes',
			transport: 'Transport <small>(stockage et approvisionnement)</small>',
			knights: 'Chevaliers',
			estates: 'Terres Sauvages conquises',
			reassign: 'Réassignements de troupes',
			build: 'Construction',
			//fbWallPopup: 'Post sur mur Facebook',
			notepad: 'Bloc-note',
			alarm: 'Alertes',
			hospital: 'Hôpital',
			throne: 'Salle du trône',
			quickMarch: 'Marches simplifiées',
			reports: 'Rapports',
			search: 'Recherche de joueurs et alliances',
			gifts: 'Cadeaux',
			tournament: 'Tournoi'
		},
		tabLabel: {
			dataAndStats: 'Infos & Stats',
			overview: 'État des lieux des villes, troupes et resources',
			chat: 'Chat',
			map: 'Carte',
			canvas: 'Mappemonde',
			marches: 'Marches',
			barbarian: 'CB <small>(manuel)</small>',
			wilderness: 'TS',
			darkForest: 'Forêts',
			scout: 'Eclairages',
			plunder: 'Pillages',
			formation: 'Formations',
			transport: 'Transports',
			knights: 'Chevaliers',
			estates: 'Terres',
			reassign: 'Réassignements',
			build: 'Constructions',
			hospital: 'Hôpital',
			throne: 'Trône',
			quickMarch: 'Marche',
			reports: 'Rapports',
			search: 'Recherche',
			gifts: 'Cadeaux',
			tournament: 'Tournois'
		},
		stored: ['conf'],
		/* default configuration */
			//each module has its own default conf
			defaultConf: {
				general: {
					reload: 0,
					reloadFrequency: 30,
					refresh: 0,
					refreshFrequency: 30,
					hideMagicalBoxPreview: 0,
					hideOtherPlayersCourtInvitation: 0,
					hideFairPopup: 0,
					resetRaidTimer: 0
				},
				confPanel: {
					position: {top: 100, left: 100},
					size: {width: 550, height: 350},
					selected: 0,
					visible: 0
				}
			}
	};

	/* DATA */
		KOCFIA.cities = {}; //cityXXXX:{'id','name',coords: {x,y}}, ...]
		KOCFIA.citiesKey = [];
		KOCFIA.tilesTypes = {
			 0: 'Marais',
			10: 'Plaine',
			11: 'Prairie',
			20: 'Forêt',
			30: 'Colline',
			40: 'Montagne',
			50: 'Plaine',
			51: 'Ville ou CB',
			511: 'Ville',
			512: 'CB',
			53: 'Ville sous brumes',
			54: 'Forêt Obscure'
		};
		KOCFIA.marchesTypes = {
			0: '?', //MARCH_TYPE_NONE: 0,
			1: 'Transport', //MARCH_TYPE_TRANSPORT: 1
			2: 'Renfort', //MARCH_TYPE_REINFORCE: 2
			3: 'Éclairage', //MARCH_TYPE_SCOUT: 3
			4: 'Attaque', //MARCH_TYPE_ATTACK: 4
			5: 'Réassignement', //MARCH_TYPE_REASSIGN: 5
			6: 'Barbarian', //MARCH_TYPE_BARBARIAN: 6
			7: 'Barbarian', //MARCH_TYPE_MERCENARY: 7
			8: 'Barbarian', //MARCH_TYPE_BARBARIAN_REINFORCE: 8
			9: 'Raid', //MARCH_TYPE_BOT_BARBARIAN: 9
			10: 'Attaque', //MARCH_TYPE_DARK_FOREST: 10
			11: 'Éclairage' //MARCH_TYPE_DARK_FOREST_SCOUT: 11
		};
		KOCFIA.resources = [
			{name: 'gold', label: 'Or', key: 'rec0', icon: window.stimgUrl + 'img/gold_30.png' },
			{name: 'resource1x3600', label: 'Nourriture', key: 'rec1', icon: window.stimgUrl + 'img/food_30.png' },
			{name: 'resource2x3600', label: 'Bois', key: 'rec2', icon: window.stimgUrl + 'img/wood_30.png' },
			{name: 'resource3x3600', label: 'Pierre', key: 'rec3', icon: window.stimgUrl + 'img/stone_30.png' },
			{name: 'resource4x3600', label: 'Minerai', key: 'rec4', icon: window.stimgUrl + 'img/iron_30.png' },
			{name: 'resource5', label: 'Pierre d\'Ether', key: 'rec5', icon: window.stimgUrl + 'img/aetherstone_30.png'}
		];
		KOCFIA.resourceInfo = {
			rec0: {name: 'gold', label: 'Or', labelBis: 'd\'', key: 'rec0', icon: window.stimgUrl + 'img/gold_30.png' },
			rec1: {name: 'resource1x3600', label: 'Nourriture', labelBis:'de ', key: 'rec1', icon: window.stimgUrl + 'img/food_30.png' },
			rec2: {name: 'resource2x3600', label: 'Bois', labelBis:'de ', key: 'rec2', icon: window.stimgUrl + 'img/wood_30.png' },
			rec3: {name: 'resource3x3600', label: 'Pierre', labelBis:'de ', key: 'rec3', icon: window.stimgUrl + 'img/stone_30.png' },
			rec4: {name: 'resource4x3600', label: 'Minerai', labelBis:'de ', key: 'rec4', icon: window.stimgUrl + 'img/iron_30.png' },
			rec5: {name: 'resource5', label: 'Pierre d\'Ether', labelBis: 'de ', key: 'rec5', icon: window.stimgUrl + 'img/aetherstone_30.png'},
			gold: {name: 'gold', label: 'Or', labelBis: 'd\'', key: 'rec0', icon: window.stimgUrl + 'img/gold_30.png' },
			resource1x3600: {name: 'resource1x3600', label: 'Nourriture', labelBis:'de ', key: 'rec1', icon: window.stimgUrl + 'img/food_30.png' },
			resource2x3600: {name: 'resource2x3600', label: 'Bois', labelBis:'de ', key: 'rec2', icon: window.stimgUrl + 'img/wood_30.png' },
			resource3x3600: {name: 'resource3x3600', label: 'Pierre', labelBis:'de ', key: 'rec3', icon: window.stimgUrl + 'img/stone_30.png' },
			resource4x3600: {name: 'resource4x3600', label: 'Minerai', labelBis:'de ', key: 'rec4', icon: window.stimgUrl + 'img/iron_30.png' },
				 resource5: {name: 'resource5', label: 'Pierre d\'Ether', labelBis: 'de ', key: 'rec5', icon: window.stimgUrl + 'img/iron_30.png' }
		};
		KOCFIA.resources_cap = [
			{name: 'resource1Capx3600', label: 'Limite', icon: window.stimgUrl + 'img/food_30.png' },
			{name: 'resource2Capx3600', label: 'Limite', icon: window.stimgUrl + 'img/wood_30.png' },
			{name: 'resource3Capx3600', label: 'Limite', icon: window.stimgUrl + 'img/stone_30.png' },
			{name: 'resource4Capx3600', label: 'Limite', icon: window.stimgUrl + 'img/iron_30.png' }
		];
		KOCFIA.resources_production_detail = [
			{rows: 7, name: 'resource1', label: ['Base', 'Gardien', 'Chevalier', 'Recherche', 'TS', 'Trône', 'Boost'], icon: window.stimgUrl + 'img/food_30.png' },
			{rows: 7, name: 'resource2', label: ['Base', 'Gardien', 'Chevalier', 'Recherche', 'TS', 'Trône', 'Boost'], icon: window.stimgUrl + 'img/wood_30.png' },
			{rows: 7, name: 'resource3', label: ['Base', 'Gardien', 'Chevalier', 'Recherche', 'TS', 'Trône', 'Boost'], icon: window.stimgUrl + 'img/stone_30.png' },
			{rows: 7, name: 'resource4', label: ['Base', 'Gardien', 'Chevalier', 'Recherche', 'TS', 'Trône', 'Boost'], icon: window.stimgUrl + 'img/iron_30.png' }
		];
		KOCFIA.resources_production_barbarian = [
			{name: 'gold', label: 'Raid', icon: window.stimgUrl + 'img/gold_30.png' },
			{name: 'resource1', label: 'Raid', icon: window.stimgUrl + 'img/food_30.png' },
			{name: 'resource2', label: 'Raid', icon: window.stimgUrl + 'img/wood_30.png' },
			{name: 'resource3', label: 'Raid', icon: window.stimgUrl + 'img/stone_30.png' },
			{name: 'resource4', label: 'Raid', icon: window.stimgUrl + 'img/iron_30.png' }
		];
		KOCFIA.resources_consumption = [
			{name: 'gold', label: 'Salaires', icon: window.stimgUrl + 'img/gold_30.png' },
			{name: 'resource1', label: 'Troupes', icon: window.stimgUrl + 'img/food_30.png' },
			{name: 'resource2', label: 'Consommation', icon: window.stimgUrl + 'img/wood_30.png' },
			{name: 'resource3', label: 'Consommation', icon: window.stimgUrl + 'img/stone_30.png' },
			{name: 'resource4', label: 'Consommation', icon: window.stimgUrl + 'img/iron_30.png' }
		];
		KOCFIA.resources_production_total = [
			{name: 'gold', label: 'Total', icon: window.stimgUrl + 'img/gold_30.png' },
			{name: 'resource1', label: 'Total', icon: window.stimgUrl + 'img/food_30.png' },
			{name: 'resource2', label: 'Total', icon: window.stimgUrl + 'img/wood_30.png' },
			{name: 'resource3', label: 'Total', icon: window.stimgUrl + 'img/stone_30.png' },
			{name: 'resource4', label: 'Total', icon: window.stimgUrl + 'img/iron_30.png' }
		];
		KOCFIA.resources_autonomy = [
			{name: 'gold', label: 'Autonomie', icon: window.stimgUrl + 'img/gold_30.png' },
			{name: 'resource1x3600', label: 'Autonomie', icon: window.stimgUrl + 'img/food_30.png' },
			{name: 'resource2x3600', label: 'Autonomie', icon: window.stimgUrl + 'img/wood_30.png' },
			{name: 'resource3x3600', label: 'Autonomie', icon: window.stimgUrl + 'img/stone_30.png' },
			{name: 'resource4x3600', label: 'Autonomie', icon: window.stimgUrl + 'img/iron_30.png' }
		];
		KOCFIA.population = [
			{rows: 4, name: ['population', 'populationCap', 'laborPopulation', 'availablePopulation'], label: ['Population', 'Plafond', 'Larbins', 'Glandeurs'], icon: window.stimgUrl + 'img/population_40.png'},
			{name: 'taxRate', label: 'Taxation', icon: window.stimgUrl + 'img/taxes.png'},
			{name: 'hapiness', label: 'Bonheur', icon: window.stimgUrl + 'img/happiness.png'}
		];
		KOCFIA.unitInfo = {
			unt1: {label: 'Ravitailleur', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_1_30_s34.jpg'},
			unt2: {label: 'Milicien', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_2_30_s34.jpg'},
			unt3: {label: 'Eclaireur', labelBis: 'd\'', icon: window.stimgUrl + 'img/units/unit_3_30_s34.jpg'},
			unt4: {label: 'Piquier', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_4_30_s34.jpg'},
			unt5: {label: 'Paladin', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_5_30_s34.jpg'},
			unt6: {label: 'Archer', labelBis: 'd\'', icon: window.stimgUrl + 'img/units/unit_6_30_s34.jpg'},
			unt7: {label: 'Cavalerie', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_7_30_s34.jpg'},
			unt8: {label: 'Cavalerie Lourde', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_8_30_s34.jpg'},
			unt9: {label: 'Wagon', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_9_30_s34.jpg'},
			unt10: {label: 'Baliste', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_10_30_s34.jpg'},
			unt11: {label: 'Bélier', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_11_30_s34.jpg'},
			unt12: {label: 'Catapulte', labelBis: 'de ', icon: window.stimgUrl + 'img/units/unit_12_30_s34.jpg'}
		};
		KOCFIA.troops = [
			{name: 'unt1', key: 'unt1', label: 'Ravitailleur', icon: window.stimgUrl + 'img/units/unit_1_30_s34.jpg'},
			{name: 'unt2', key: 'unt2', label: 'Milicien', icon: window.stimgUrl + 'img/units/unit_2_30_s34.jpg'},
			{name: 'unt3', key: 'unt3', label: 'Eclaireur', icon: window.stimgUrl + 'img/units/unit_3_30_s34.jpg'},
			{name: 'unt4', key: 'unt4', label: 'Piquier', icon: window.stimgUrl + 'img/units/unit_4_30_s34.jpg'},
			{name: 'unt5', key: 'unt5', label: 'Paladin', icon: window.stimgUrl + 'img/units/unit_5_30_s34.jpg'},
			{name: 'unt6', key: 'unt6', label: 'Archer', icon: window.stimgUrl + 'img/units/unit_6_30_s34.jpg'},
			{name: 'unt7', key: 'unt7', label: 'Cavalerie', icon: window.stimgUrl + 'img/units/unit_7_30_s34.jpg'},
			{name: 'unt8', key: 'unt8', label: 'Cavalerie Lourde', icon: window.stimgUrl + 'img/units/unit_8_30_s34.jpg'},
			{name: 'unt9', key: 'unt9', label: 'Wagon', icon: window.stimgUrl + 'img/units/unit_9_30_s34.jpg'},
			{name: 'unt10', key: 'unt10', label: 'Baliste', icon: window.stimgUrl + 'img/units/unit_10_30_s34.jpg'},
			{name: 'unt11', key: 'unt11', label: 'Bélier', icon: window.stimgUrl + 'img/units/unit_11_30_s34.jpg'},
			{name: 'unt12', key: 'unt12', label: 'Catapulte', icon: window.stimgUrl + 'img/units/unit_12_30_s34.jpg'}
		];
		KOCFIA.defenses = [
			{fort: 'fort53', frt: 'frt53', label: 'Arbalètes', icon: window.stimgUrl + 'img/units/unit_53_30.jpg'},
			{fort: 'fort55', frt: 'frt55', label: 'Trébuchets', icon: window.stimgUrl + 'img/units/unit_55_30.jpg'},
			{fort: 'fort60', frt: 'frt60', label: 'Pièges', icon: window.stimgUrl + 'img/units/unit_60_30.jpg'},
			{fort: 'fort61', frt: 'frt61', label: 'Chausse-trapes', icon: window.stimgUrl + 'img/units/unit_61_30.jpg'},
			{fort: 'fort62', frt: 'frt62', label: 'Palissades', icon: window.stimgUrl + 'img/units/unit_62_30.jpg'}
		];
		KOCFIA.fortInfo = {
			frt53: {fort: 'fort53', label: 'Arbalètes', icon: window.stimgUrl + 'img/units/unit_53_30.jpg'},
			frt55: {fort: 'fort55', label: 'Trébuchets', icon: window.stimgUrl + 'img/units/unit_55_30.jpg'},
			frt60: {fort: 'fort60', label: 'Pièges', icon: window.stimgUrl + 'img/units/unit_60_30.jpg'},
			frt61: {fort: 'fort61', label: 'Chausse-trapes', icon: window.stimgUrl + 'img/units/unit_61_30.jpg'},
			frt62: {fort: 'fort62', label: 'Palissades', icon: window.stimgUrl + 'img/units/unit_62_30.jpg'}
		};
		KOCFIA.inSeed = {
			population: {
				population: {index: 0},
				populationCap: {index: 1},
				laborPopulation: {index: 3},
				taxRate: {index: 1},
				hapiness: {index: 2}
			},
			resources: {
				gold: {index: 0},
				resource1x3600: {index: 0, type: 'rec1'},
				resource2x3600: {index: 0, type: 'rec2'},
				resource3x3600: {index: 0, type: 'rec3'},
				resource4x3600: {index: 0, type: 'rec4'},
				resource5: {index: 0, type: 'rec5'}
			},
			resources_cap: {
				resource1Capx3600: {index: 1, type: 'rec1'},
				resource2Capx3600: {index: 1, type: 'rec2'},
				resource3Capx3600: {index: 1, type: 'rec3'},
				resource4Capx3600: {index: 1, type: 'rec4'}
			},
			resources_consumption: {
				gold: {index: 2},
				resource1: {index: 3, type: 'rec1'},
				resource2: {index: 3, type: 'rec2'},
				resource3: {index: 3, type: 'rec3'},
				resource4: {index: 3, type: 'rec4'}
			}
		};
		KOCFIA.train = [
			{name: 'unit', label: 'Formation', icon: window.stimgUrl + 'img/gold_30.png'},
			{name: 'unt1', key: 'unt1', label: 'Ravitailleur', icon: window.stimgUrl + 'img/units/unit_1_30_s34.jpg'},
			{name: 'unt2', key: 'unt2', label: 'Milicien', icon: window.stimgUrl + 'img/units/unit_2_30_s34.jpg'},
			{name: 'unt3', key: 'unt3', label: 'Eclaireur', icon: window.stimgUrl + 'img/units/unit_3_30_s34.jpg'},
			{name: 'unt4', key: 'unt4', label: 'Piquier', icon: window.stimgUrl + 'img/units/unit_4_30_s34.jpg'},
			{name: 'unt5', key: 'unt5', label: 'Paladin', icon: window.stimgUrl + 'img/units/unit_5_30_s34.jpg'},
			{name: 'unt6', key: 'unt6', label: 'Archer', icon: window.stimgUrl + 'img/units/unit_6_30_s34.jpg'},
			{name: 'unt7', key: 'unt7', label: 'Cavalerie', icon: window.stimgUrl + 'img/units/unit_7_30_s34.jpg'},
			{name: 'unt8', key: 'unt8', label: 'Cavalerie Lourde', icon: window.stimgUrl + 'img/units/unit_8_30_s34.jpg'},
			{name: 'unt9', key: 'unt9', label: 'Wagon', icon: window.stimgUrl + 'img/units/unit_9_30_s34.jpg'},
			{name: 'unt10', key: 'unt10', label: 'Baliste', icon: window.stimgUrl + 'img/units/unit_10_30_s34.jpg'},
			{name: 'unt11', key: 'unt11', label: 'Bélier', icon: window.stimgUrl + 'img/units/unit_11_30_s34.jpg'},
			{name: 'unt12', key: 'unt12', label: 'Catapulte', icon: window.stimgUrl + 'img/units/unit_12_30_s34.jpg'}
		];
		KOCFIA.revive = [
			{name: 'unit', label: 'Hôpital', icon: window.stimgUrl + 'img/gold_30.png'}
		];

	KOCFIA.init = function(){
		if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('KOCFIA init function');

		if( window.kocfiaFrameUserScriptVersion === undefined ){
			alert('Problème lors du chargement du jeu ou de KOCFIA. Dans le deuxième cas une réinstallation des scripts grease monkey est peut-être nécessaire.');

			return false;
		} else if( window.kocfiaFrameUserScriptVersion != KOCFIA.userScriptLoaderVersion ){
			alert('Une nouvelle version du script grease monkey utilisé pour charger KOCFIA est disponible. Veuillez le mettre à jour (réinstaller le script principal).');

			if( window.kocfiaFrom ) window.open(window.kocfiaFrom +'kocfia.frame.user.js', 'Script utilisateur utilisé par grease monkey pour charger KOCFIA');

			return false;
		}

		//get server id
			KOCFIA.server = Shared.getServer();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('server', KOCFIA.server);
			if( KOCFIA.server === null ){
				alert('Wrong server id, aborting !');
				return;
			}

		//get user id
			KOCFIA.kabamuid = Shared.getUserId();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('kabamuid', KOCFIA.kabamuid);
			if( KOCFIA.kabamuid === null ){
				alert('Wrong user id, aborting !');
				return;
			}

		KOCFIA.storeUniqueId = KOCFIA.server + '_' + KOCFIA.kabamuid;

		//prepare the module with shared parts
		KOCFIA.wilderness = $.extend({}, KOCFIA.autoAttack, KOCFIA.wilderness);
		KOCFIA.barbarian = $.extend({}, KOCFIA.autoAttack, KOCFIA.barbarian);
		KOCFIA.plunder = $.extend({}, KOCFIA.autoAttack, KOCFIA.plunder);
		KOCFIA.darkForest = $.extend({}, KOCFIA.autoAttack, KOCFIA.darkForest);
		KOCFIA.scout = $.extend({}, KOCFIA.autoAttack, KOCFIA.scout);

		//gather the default conf
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('default conf gathering');
			var i, modulesLength = KOCFIA.modules.length;
			for( i = 0; i < modulesLength; i += 1 ){
				var mod = KOCFIA.modules[i];
				KOCFIA.defaultConf[ mod ] = $.extend(true, {}, KOCFIA[ mod ].options);
			}
			KOCFIA.conf = $.extend(true, {}, KOCFIA.defaultConf);
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('default conf gathering');

		//get stored conf if present
			var storedConf = localStorage.getObject('kocfia_conf_' + KOCFIA.storeUniqueId);
			if( storedConf ){
				KOCFIA.conf = $.extend(true, {}, KOCFIA.conf, storedConf);
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.info('used stored conf');
			}
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.log(KOCFIA.conf);

		//set message event listener
		//used to pass data between iframes
			window.addEventListener('message', function(event){
				console.log('frame event', event, !Object.isObject(event.data) ? event.data : event.data.task);
				//return the conf values for fbWallPopup module
				if( event.origin.indexOf('facebook.com') > -1 ){
					if( event.data == 'fbWallPopup module conf please' ){
						event.source.postMessage(KOCFIA.conf.fbWallPopup, 'https://apps.facebook.com/');
						event.source.postMessage(KOCFIA.conf.fbWallPopup, 'http://apps.facebook.com/');
						event.source.postMessage(KOCFIA.conf.fbWallPopup, 'https://www.kabam.com/');
						event.source.postMessage(KOCFIA.conf.fbWallPopup, 'http://www.kabam.com/');
					}
				}
			}, false);

			top.postMessage('loaded', 'https://apps.facebook.com/');
			top.postMessage('loaded', 'http://apps.facebook.com/');
			top.postMessage('loaded', 'https://www.kabam.com/');
			top.postMessage('loaded', 'http://www.kabam.com/');
			window.setInterval(function(){
				top.postMessage('loaded', 'https://apps.facebook.com/');
				top.postMessage('loaded', 'http://apps.facebook.com/');
				top.postMessage('loaded', 'https://www.kabam.com/');
				top.postMessage('loaded', 'http://www.kabam.com/');
			}, 10000);

		//test 30s after init it the loading screen is still visible
		if( window.location.href.indexOf('test/test.php') == -1 ){
			window.setTimeout(function(){
				var $loadingScreen = $('#kocinitloading');
				if( $loadingScreen.length === 0 || $loadingScreen.is(':visible') ){
					$('#kocfia-reload').submit();
				}
			}, 30000);
		}

		//gather stored items list for deletion ease
			KOCFIA.stored.push( 'conf' );
			var j, length, stored;
			for( i = 0; i < modulesLength; i += 1 ){
				mod = KOCFIA.modules[i];
				if( KOCFIA[ mod ].hasOwnProperty('stored') && Array.isArray(KOCFIA[ mod ].stored) ){
					length = KOCFIA[ mod ].stored.length;
					for( j = 0; j < length; j += 1 ){
						KOCFIA.stored.push( mod + '_' + KOCFIA[ mod ].stored[j] );
						stored = localStorage.getObject('kocfia_' + mod + '_' + KOCFIA[ mod ].stored[j] + '_' + KOCFIA.storeUniqueId);
						if( stored ){
							KOCFIA[ mod ][ KOCFIA[ mod ].stored[j] ] = stored;
						}
					}
				}
			}

		//get player cities
			Shared.getCities();

		//configuration panel
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('confPanel');
			KOCFIA.confPanel();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('confPanel');

		//modules init
			var initModule = function(i){
				//delayed init for modules
				window.setTimeout(function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('kocfia '+ KOCFIA.modules[i] +' on');
					KOCFIA[ KOCFIA.modules[i] ].on();
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('kocfia '+ KOCFIA.modules[i] +' on');
				}, i * 100 + 500);
			};

			for( i = 0; i < modulesLength; i += 1 ){
				if( KOCFIA.conf[KOCFIA.modules[i]].active ){
					initModule(i);
				}
			}

		//refresh button
			KOCFIA.$buttons.append(
				$('<button id="kocfia-refresh-seed" class="button secondary">')
					.html('<span>Raffraîchir</span>')
					.attr('title', 'Force la mise à jour des données du jeux, sauf les troupes.')
					.click(function(e){ Shared.updateSeed(); })
			);
			KOCFIA.$refreshButton = $('#kocfia-refresh-seed');

			KOCFIA.$buttons.append(
				$('<button id="kocfia-free-knights" class="button secondary">')
					.html('<span>Rappeler les chevaliers perdus</span>')
					.click(function(e){
						for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
							Shared.freeKnights( KOCFIA.citiesKey[i] );
						}
					})
			);

		//map links
			$body.on('click', '.mapLink', function(){
				var coord = $(this).text().split(',');
				window.Modal.hideModalAll();
				window.changeview_map( document.getElementById('mod_views_map') );
				$('#mapXCoor').val( coord[0] );
				$('#mapYCoor').val( coord[1] );
				window.reCenterMapWithCoor();
			});

		//reload game form
			var $form = $('<form>', { id: 'kocfia-reload', target: '_top', action: '', method: 'post' });
			$form.append(' <input type="hidden" name="s" value="'+ KOCFIA.storeUniqueId +'">');
			$body.append( $form.hide() );

		//reload timeout
			$body.append('<div id="kocfia-reload-msg" class="kocfia-timer-div">Rechargement de la page dans : <span class="kocfia-timer"></span></div>');
			KOCFIA.$reloadTimer = $('#kocfia-reload-msg');
			if( KOCFIA.conf.general.reload ){
				Shared.reloadCountdown(1);
			}

		//refresh data
			if( KOCFIA.conf.general.refresh ){
				Shared.refreshCountdown(1);
			}

		//merlin box
			$body.on('click', '.mod_comm_mmb, .kocfia-merlin-small', function(){
				merlinBoxClick = true;
			});

			if( KOCFIA.conf.general.hideMagicalBoxPreview ){
				i = 0;
				var hideMerlinPreview = window.setInterval(function(){
					if( $('#modalBox1').is(':visible') ){
						if( $('#modalTitle1').text().indexOf('Merlin') > -1 ){
							window.Modal.hideModal();
							clearInterval(hideMerlinPreview);
						}
					}
					i += 1;
					if( i > 30 ) clearInterval(hideMerlinPreview);
				}, 1000);
			}

		//other players court invitations
			if( KOCFIA.conf.general.hideOtherPlayersCourtInvitation ){
				i = 0;
				var hideCourtInvitation = window.setInterval(function(){
					if( $('#modalBox1').is(':visible') && $('#modalBox1').hasClass('modalBoxUEP') ){
						window.Modal.hideModal();
						clearInterval(hideCourtInvitation);
					}
					i += 1;
					if( i > 30 ) clearInterval(hideCourtInvitation);
				}, 1000);
			}

		//fair popup
			if( KOCFIA.conf.general.hideFairPopup ){
				i = 0;
				var hideViewCourt = window.setInterval(function(){
					if( $('#modalBox1').is(':visible') && $('#modalBox1').hasClass('modalBoxUEP') ){
						$('#modalContent1').find('.button20.sendfriendbtn').click();
						clearInterval(hideViewCourt);
					}
					i += 1;
					if( i > 30 ) clearInterval(hideViewCourt);
				}, 1000);
			}

		//reset raid timer
			if( KOCFIA.conf.general.autoResetBarbarianRaids ){
				Shared.resetRaidTimer(1);
			}

		//needed asap
			KOCFIA.chat.$chatInput = $('#mod_comm_input');
			KOCFIA.chat.$chatGeneral = $('#mod_comm_list1');
			KOCFIA.chat.$chatAlliance = $('#mod_comm_list2');
			KOCFIA.chat.$chat = $('#kocmain_bottom').find('.mod_comm');

		//ajax sniffer
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.time('sniffer');
			KOCFIA.ajaxSniffer();
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('init') ) console.timeEnd('sniffer');

		//chat action icons
			KOCFIA.chat.$chatAlliance
				.on('click', '.research', function(){
					//if( KOCFIA.conf.search.on ){
						var $this = $(this),
							type;

						if( $this.hasClass('player') ) type = 'player';
						else if( $this.hasClass('alliance') ) type = 'alliance';

						//player and alliance search tab
						//KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$="quickMarch"]').trigger('click');

						//$('#kocfia-quickMarch')
							//.find('.type').find('#kocfia-quickMarch-type-'+ type).prop('checked').end()
							//.find('.coord').val( $this.attr('rel').replace(/§/, ',') ).trigger('change');
					//} else {
						//alert('L\'onglet '+ KOCFIA.tabLabel.search +' n\'est pas actif.');
					//}
				})
				.on('click', '.reduceToggle', function(){
					$(this).toggleClass('ui-icon-triangle-1-se ui-icon-triangle-1-e')
						.closest('.chatwrap').find('.reduce').stop(true, true).slideToggle();
				})
				.on('click', '.reinforce, .attack, .scout, .food', function(){
					if( KOCFIA.conf.quickMarch.on ){
						var $this = $(this),
							type;

						if( $this.hasClass('attack') ) type = 'attack';
						else if( $this.hasClass('scout') ) type = 'scout';
						else if( $this.hasClass('reinforce') ) type = 'reinforce';
						else if( $this.hasClass('food') ) type = 'transport';

						//quick march tab
						KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$="quickMarch"]').trigger('click');

						$('#kocfia-quickMarch')
							.find('.type').find('#kocfia-quickMarch-type-'+ type).prop('checked').end()
							.find('.coord').val( $this.attr('rel').replace(/§/, ',') ).trigger('change');
					} else {
						alert('L\'onglet '+ KOCFIA.tabLabel.quickMarch +' n\'est pas actif.');
					}
				});
	};

	/* AJAX SNIFFER */
		KOCFIA.ajaxSniffer = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('ajaxSniffer') ) console.info('KOCFIA ajaxSniffer function');
			XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;
			var newOpen = function(method, url, async, user, password){
				var filename = url.substring(url.lastIndexOf('/')+1);

				//KOCFIA.ajax[filename] = (KOCFIA.ajax[filename] || 0) + 1;

				//this.addEventListener('load', function(){ KOCFIA.ajax[filename] = KOCFIA.ajax[filename] - 1; });
				//this.addEventListener('abort', function(){ KOCFIA.ajax[filename] = KOCFIA.ajax[filename] - 1; });
				//this.addEventListener('error', function(){ KOCFIA.ajax[filename] = KOCFIA.ajax[filename] - 1; });

				switch(filename){
					case 'getChat.php':
						this.addEventListener("load", function(){
							if( KOCFIA.conf.chat.active && ( KOCFIA.conf.chat.cleanHelp || KOCFIA.conf.chat.highlightLeaders || KOCFIA.conf.chat.highlightFriends || KOCFIA.conf.chat.highlightFoes ) ){
								var r = JSON.parse(this.responseText);
								if( r.data && r.data.newChats ){
									if( r.data.newChats['3'] && r.data.newChats['3'].length > 0 ){
										if( KOCFIA.conf.chat.playSoundOnWisper ) KOCFIA.chat.$audio[0].play();
									}

									if( r.data.newChats['2'] && r.data.newChats['2'].length > 0 ){
										window.setTimeout(function(){
											if( KOCFIA.conf.alarm.active ) KOCFIA.alarm.scanChat( r.data.newChats['2'].length );

											if( KOCFIA.conf.chat.cleanHelp ) KOCFIA.chat.cleanHelp( r.data.newChats['2'] );
											if( KOCFIA.conf.chat.highlightLeaders ) KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatAlliance, r.data.newChats['2'].length );
										}, 100);
									}

									if( r.data.newChats['1'] && r.data.newChats['1'].length > 0 ){
										window.setTimeout(function(){
											if( KOCFIA.conf.chat.highlightLeaders ) KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatGeneral, r.data.newChats['1'].length );
											if( KOCFIA.conf.chat.highlightFriends || KOCFIA.conf.chat.highlightFoes ) KOCFIA.chat.highlightFriendsAndFoes( r.data.newChats['1'].length );
										}, 100);
									}
								}
							}
						}, false);
						break;
					case 'allianceGetLeaders.php':
						this.addEventListener("load", function(){
							if( KOCFIA.conf.chat.active && KOCFIA.conf.chat.highlightLeaders ){
								if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('ajaxSniffer') ) console.time('allianceGetLeaders load');
								var r = JSON.parse(this.responseText);
								if( r.officers ){
									KOCFIA.chat.leaders = {};
									for( var o in r.officers ){
										if( r.officers.hasOwnProperty(o) ){
											KOCFIA.chat.leaders[ r.officers[o].genderAndName ] = r.officers[o].type.toLowerCase();
										}
									}
								}
								KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatAlliance, 0 );
								KOCFIA.chat.highlightLeaders( KOCFIA.chat.$chatGeneral, 0 );
								if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('ajaxSniffer') ) console.timeEnd('allianceGetLeaders load');
							}
						}, false);
						break;
					//with update seed
					case 'allianceLeave.php':
					case 'assignknight.php':
					case 'boostCombat.php':
					case 'boostKnight.php':
					case 'boostProduction.php':
					case 'buyWildTraps.php':
					case 'buyItem.php':
					case 'cancelConstruction.php':
					case 'cancelFortifications.php':
					case 'cancelTraining.php':
					case 'changename.php':
					case 'construct.php':
					case 'courtSelectItem.php':
					case 'destroyBuilding.php':
					case 'destruct.php':
					case 'dismissUnits.php':
					case 'doveOut.php':
					case 'experienceKnight.php':
					case 'fertilizePeople.php':
					case 'fireKnight.php':
					case 'fogUser.php':
					case 'fortify.php':
					case 'gate.php':
					case 'hireknight.php':
					case 'hireSpecialKnight.php':
					case 'hireWildMerc.php':
					case 'hypnotize.php':
					case 'itemChest.php':
					case 'kickoutReinforcements.php':
					case 'magicalboxPick.php':
					case 'medals.php':
					case 'progressTutorial.php':
					case 'quest.php':
					case 'reduceTroopUpkeep.php':
					case 'research.php':
					case 'resetKnight.php':
					case 'resourceCrate.php':
					case 'rewardKnight.php':
					case 'speedupConstruction.php':
					case 'speedupFortify.php':
					case 'speedupMarch.php':
					case 'speedupResearch.php':
					case 'speedupTrade.php':
					case 'speedupTraining.php':
					case 'skillupKnight.php':
					case 'trade.php':
					case 'train.php':
					case 'undefend.php':
					case 'untrade.php':
					case 'useMysteryChest.php':
					case 'vacationMode.php':
					case 'volunteee.php':
						this.addEventListener("load", function(){
							window.setTimeout(function(){
								KOCFIA.overview.updateFromSeed();
								KOCFIA.dataAndStats.update();
								KOCFIA.summary.update();
								KOCFIA.throne.updateCounter();
							}, 500);
						}, false);
						break;
					case 'updateSeed.php':
						this.addEventListener("load", function(){
							window.setTimeout(function(){
								KOCFIA.overview.updateFromSeed();
								KOCFIA.dataAndStats.update();
								KOCFIA.summary.update();
								KOCFIA.throne.updateCounter();
							}, 500);
							window.setTimeout(function(){ KOCFIA.alarm.checkIncoming(); }, 550);
						}, false);
						break;
					case 'relocate.php':
					case 'relocateAndChangename.php':
						this.addEventListener("load", function(){
							var cityKey = 'city'+ window.currentcityid;
							if( !$.isEmptyObject(KOCFIA.darkForest.attacks.levels[ cityKey ]) && KOCFIA.darkForest.attacks.info[ cityKey ].active ){
								window.setTimeout(function(){
									//reset coords list for dark forest
									var r = JSON.parse(this.responseText);
									if( r.ok ){
										KOCFIA.darkForest.coords = {};
									}
								}, 5);
							}

							window.setTimeout(function(){
								KOCFIA.overview.updateFromSeed();
								KOCFIA.dataAndStats.update();
								KOCFIA.summary.update();
								KOCFIA.throne.updateCounter();
							}, 500);
						}, false);
						break;
					case 'changeCityName.php':
						this.addEventListener("load", function(){
							window.setTimeout(function(){
								Shared.getCities();
								KOCFIA.overview.updateFromSeed();
								KOCFIA.dataAndStats.update();
								KOCFIA.summary.update();
								KOCFIA.throne.updateCounter();
							}, 500);
						}, false);
						break;
					case 'abandonWilderness.php':
					case 'changeTax.php':
					case 'getCityTradeStatus.php':
					case 'levyGold.php':
					case 'spreadWealth.php':
						this.addEventListener("load", function(){
							var r = JSON.parse(this.responseText);
							if( r.updateSeed ){
								window.setTimeout(function(){
									KOCFIA.overview.updateFromSeed();
									KOCFIA.dataAndStats.update();
									KOCFIA.summary.update();
									KOCFIA.throne.updateCounter();
								}, 500);
							}
						}, false);
						break;
					case 'march.php':
						this.addEventListener("load", function(){
							console.log(this);
							var r = JSON.parse(this.responseText);
							if( r.ok ){
								window.setTimeout(function(){
									KOCFIA.overview.updateFromSeed();
									KOCFIA.dataAndStats.update();
									KOCFIA.summary.update();
									KOCFIA.throne.updateCounter();
								}, 500);
							}
						}, false);
						break;
					case 'cancelMarch.php':
						this.addEventListener("load", function(){
							console.log(this);
							window.setTimeout(function(){
								if( $('#modalBox1').is(':visible') && $('#modalBox1').find('.kofcalert').length ){
									window.Modal.hideModal();
								}
							}, 300);

							var r = JSON.parse(this.responseText);
							if( r.ok ){
								window.setTimeout(function(){
									KOCFIA.overview.updateFromSeed();
									KOCFIA.dataAndStats.update();
									KOCFIA.summary.update();
									KOCFIA.throne.updateCounter();
								}, 500);
							}
						}, false);
						break;
					case 'magicalboxPreview.php':
						if( KOCFIA.conf.general.hideMagicalBoxPreview ){
							$('.modalBox, .modalCurtain').addClass('previous');
						}
						this.addEventListener("load", function(){
							//using merlinBoxClick flag to avoid closing the modal on game asked by the user
							if( KOCFIA.conf.general.hideMagicalBoxPreview && !merlinBoxClick ){
								$body.addClass('noModal');
								window.setTimeout(function(){
									window.Modal.hideModal();
									window.setTimeout(function(){
										$body.removeClass('noModal');
									}, 50);
								}, 50);
							}
							merlinBoxClick = false;
						}, false);
						break;
					case 'viewCourt.php':
						if( KOCFIA.conf.general.hideOtherPlayersCourtInvitation ){
							$('.modalBox, .modalCurtain').addClass('previous');
						}
						this.addEventListener("load", function(){
							if( KOCFIA.conf.general.hideOtherPlayersCourtInvitation ){
								$body.addClass('noModal');
								window.setTimeout(function(){
									window.Modal.hideModal();
									window.setTimeout(function(){
										$body.removeClass('noModal');
									}, 50);
								}, 50);
							}
						}, false);
						break;
					case 'rollFriendChance.php':
						if( KOCFIA.conf.general.hideFairPopup ){
							$('.modalBox, .modalCurtain').addClass('previous');
						}
						this.addEventListener("load", function(){
							if( KOCFIA.conf.general.hideFairPopup ){
								$body.addClass('noModal');
								window.setTimeout(function(){
									$('.modalBox').find('.button20.sendfriendbtn').click();
									window.setTimeout(function(){
										window.Modal.hideModal();
										window.setTimeout(function(){
											$body.removeClass('noModal');
										}, 50);
									}, 50);
								}, 50);
							}
						}, false);
						break;
					case '_dispatch.php':
						this.addEventListener("load", function(){
							console.log('_dispatch', this);
							window.setTimeout(function(){
								KOCFIA.chat.cleanHelp(0); //to clean self construction help messages
								KOCFIA.overview.updateFromSeed();
								KOCFIA.dataAndStats.update();
								KOCFIA.summary.update();
								KOCFIA.throne.updateCount();
							}, 500);
						}, false);
						break;
					case '_dispatch53.php':
						this.addEventListener("load", function(){
							console.log(this);
							if( this.params ){
								window.setTimeout(function(){
									KOCFIA.gifts.selectPlayers();
									//KOCFIA.throne.update();
								}, 500);
							}
						}, false);
						break;
					case 'fetchMapTiles.php':
						if( KOCFIA.conf.map.additionalInfo && $('#maparea_map').is(':visible') ){
							this.addEventListener("load", function(){
								var r = JSON.parse(this.responseText);
								if( r.ok && r.data ){
									window.setTimeout(function(){
										KOCFIA.map.addTilesInfo(r);
									}, 500);
								}
							}, false);
						}
						break;
					default: break;
				}

				this.oldOpen(method, url, async, user, password);
			};

			XMLHttpRequest.prototype.open = newOpen;
		};

	/* CONFIGURATION PANEL */
		KOCFIA.confPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.info('KOCFIA confPanel function');

			var $confPanel = $('<div id="kocfia-conf-panel">');

			var $optionsSection = $('<div id="kocfia-options">'),
				lis = '<li><a href="#kocfia-options">Options</a></li>',
				sections = '';

			var i, modulesLength = KOCFIA.modules.length, mod, active, auto, name;
			for( i = 0; i < modulesLength; i += 1 ){
				mod = KOCFIA.modules[i];
				if( typeof KOCFIA[ mod ].modPanel == 'function' ){
					active = KOCFIA.conf[ mod ].active;
					auto = (KOCFIA.conf[ mod ].hasOwnProperty('automatic') && KOCFIA.conf[ mod ].automatic ? 'auto' : '');
					if( mod == 'transport' ){
						if( KOCFIA.conf[ mod ].automaticPileUp ) auto += ' pileUp';
						if( KOCFIA.conf[ mod ].automaticSupply ) auto += ' supply';
					}
					name = ( KOCFIA.tabLabel[ mod ] ? KOCFIA.tabLabel[ mod ] : mod.capitalize() );
					lis += '<li class="kocfia-conf-panel-tab '+ (active ? 'on' : 'off') +' '+ auto +'">';
					lis += '<a href="#kocfia-'+ mod +'">'+ name +'</a>';
					lis += '</li>';
					sections += '<div id="kocfia-'+ mod +'"></div>';
				}
			}

			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.time('option panel');
			KOCFIA.optionPanel( $optionsSection );
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.timeEnd('option panel');

			//listeners - manage the checked status change of the options
			$confPanel
				.on('click', '.help-toggle', function(){
					var $this = $(this),
						pos = $this.offset(),
						id = '#' + $this.closest('.ui-tabs-panel').attr('id') + '-help';
					$(id).dialog('option', 'position', [pos.left - 150, pos.top]).dialog('open');
				})
				.on('click', '.history-toggle', function(){
					var $this = $(this),
						rel = ($this.attr('rel') ? '-'+ $this.attr('rel') : ''),
						pos = $this.offset(),
						id = '#' + $this.closest('.ui-tabs-panel').attr('id') + '-history' + rel;

					$(id).dialog('option', 'position', [pos.left, pos.top]).dialog('open');
				})
				.on('change', '.conf-toggle', function(){
					var $this = $(this),
						infos = this.id.split('-'),
						mod = infos[0],
						func = infos[1],
						status = null;

					if( func == 'active' ){
						KOCFIA.$confPanelNav.find('li').find('a').filter('[href="#kocfia-'+ mod +'"]').parent().toggleClass('on off');
					} else if( func.indexOf('automatic') > -1 ){
						if( mod == 'transport' ){
							if( func.indexOf('PileUp') > -1 ) KOCFIA.$confPanelNav.find('li').find('a').filter('[href="#kocfia-'+ mod +'"]').parent().toggleClass('pileUp');
							else if( func.indexOf('Supply') > -1 ) KOCFIA.$confPanelNav.find('li').find('a').filter('[href="#kocfia-'+ mod +'"]').parent().toggleClass('supply');
						} else {
							KOCFIA.$confPanelNav.find('li').find('a').filter('[href="#kocfia-'+ mod +'"]').parent().toggleClass('auto');
						}
					}

					if( $this.prop('checked') ){
						status = 1;
						if( func == 'active' ) func = 'on';
						else func += 'On';
					} else {
						status = 0;
						if( func == 'active' ) func = 'off';
						else func += 'Off';
					}

					KOCFIA.conf[ mod ][ infos[1] ] = status;

					if( infos[1] == 'active' && status === 0 && KOCFIA.conf[ mod ].hasOwnProperty('automatic') ){
						KOCFIA.conf[ mod ].automatic = 0;
					}

					if( mod == 'general' ){
						if( infos[1] == 'reload' ){
							Shared.reloadCountdown(status);
						} else if( infos[1] == 'refresh' ){
							Shared.refreshCountdown(status);
						} else if( infos[1] == 'resetRaidTimer' ){
							Shared.resetRaidTimer(status);
						} else if( infos[1] == 'resetCatpchaDetect' ){
							Shared.resetCatpchaDetect();
						}
					}

					Shared.storeConf();

					if( KOCFIA[ mod ] && typeof KOCFIA[ mod ][ func ] == 'function' ) KOCFIA[ mod ][ func ]();
					//else console.error('not a function', mod, func);
				})
				.on('keyup, change', '.conf-choice', function(){
					var $this = $(this),
						infos = this.id.split('-');
					if( $this.is('input') && this.type == 'url' ){
						if( this.checkValidity() ){
							if( confChoiceTimeout ) window.clearTimeout( confChoiceTimeout );
							confChoiceTimeout = window.setTimeout(function(){
								KOCFIA.conf[ infos[0] ][ infos[1] ] = $this.val();

								if( infos[0] == 'chat' ) KOCFIA.chat.$audio[0].src = KOCFIA.conf[ infos[0] ][ infos[1] ];
								else if( infos[0] == 'alarm' ) KOCFIA.alarm.sounds[ $this.attr('rel') ].$tag[0].src = KOCFIA.conf[ infos[0] ][ infos[1] ];

								Shared.storeConf();
							}, 300);
						}
					} else {
						if( confChoiceTimeout ) window.clearTimeout( confChoiceTimeout );
						confChoiceTimeout = window.setTimeout(function(){
							KOCFIA.conf[ infos[0] ][ infos[1] ] = $this.val();
							Shared.storeConf();
							if( $this.attr('id') == 'general-reloadFrequency' ) $this.siblings('input').change();
						}, 300);
					}
				})
				.on('click', '.conf-action', function(e){
					e.preventDefault();
					var $this = $(this),
						infos = $this.attr('rel').split('-'),
						param = $this.data('param');
					if( infos[0] == 'shared' ){
						if( param ){
							Shared[ infos[1] ]( param );
						} else {
							Shared[ infos[1] ]();
						}
					} else {
						if( infos[1].indexOf('delete') > -1 && !confirm('Êtes-vous sûr ?') ) return false;

						if( param ){
							KOCFIA[ infos[0] ][ infos[1] ](param);
						} else {
							KOCFIA[ infos[0] ][ infos[1] ]();
						}
					}
				})
				//notifications close
				.on('click', '.kocfia-success, .kocfia-error', function(){
					$(this).remove();
				})
				.on('click', '.kocfia-working .close, .kocfia-error .close', function(){
					$(this).parent().remove();
				})
				//audio
				.on('keyup, change', '.audio .conf-choice', function(){
					var $this = $(this),
						$p = $this.parent(),
						$audio = $p.find('audio'),
						$play = $p.find('.ui-icon-play'),
						$pause = $p.find('.ui-icon-pause');

					if( $this[0].checkValidity() ){
						$audio[0].pause();
						$audio.attr('src', $this.val()).end();
						$audio[0].play();
						$play.css('display', 'none');
						$pause.css('display', 'inline-block');
					}
				})
				.on('click', '.audio .ui-icon-play', function(){
					$(this).parent()
						.find('.ui-icon-play').css('display', 'none').end()
						.find('.ui-icon-pause').css('display', 'inline-block').end()
						.find('audio')[0].play();
				})
				.on('click', '.audio .ui-icon-pause', function(){
					$(this).parent()
						.find('.ui-icon-play').css('display', 'inline-block').end()
						.find('.ui-icon-pause').css('display', 'none').end()
						.find('audio')[0].pause();
				})
				.on('click', '.audio .ui-icon-stop', function(){
					var $this = $(this),
						$p = $this.parent();

					$p
						.find('.ui-icon-play').css('display', 'inline-block').end()
						.find('.ui-icon-pause').css('display', 'none');

					var $audio = $p.find('audio');

					//no stop() in the API...
					$audio[0].pause();
					$audio[0].currentTime = 0;
				})
				;

			$confPanel.tipsy({delegate: '[title], [original-title]', html: true});

			var $content = $('<div id="kocfia-conf-panel-content">')
				.append( $optionsSection )
				.append( sections );

			var $wrapper = $('<div id="kocfia-conf-panel-wrapper">')
				.append( $content );

			//conf panel markup
			$confPanel
				.append( '<span class="ui-icon ui-icon-close"></span>' )
				.append( '<nav id="kocfia-conf-panel-tabs"><ul>' + lis + '</ul></nav>' )
				.append( $wrapper )
				.append( moveHandles );

			//conf panel functionnalities
			$confPanel
				.draggable({
					handle: '#kocfia-conf-panel-tabs, .move-handle',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.confPanel.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 250,
					minHeight: 250,
					handles: 'n, e, s, w, ne, se, sw, nw',
					resize: function(event, ui){
						KOCFIA.$confPanelWrapper.css('height', KOCFIA.calcConfPanelInnerHeight());
					},
					stop: function(event, ui){
						KOCFIA.conf.confPanel.size = ui.size;
						KOCFIA.conf.confPanel.position = ui.position;
						Shared.storeConf();
					}
				})
				.tabs({
					selected: KOCFIA.conf.confPanel.selected,
					select: function(event, ui){
						//save the selected panel index
						KOCFIA.conf.confPanel.selected = ui.index;
						Shared.storeConf();

						if( $(ui.panel).is('#kocfia-map') ){
							//use timeout so the tab selection is "finished" and the element inside have the correct width
							window.setTimeout(function(){
								KOCFIA.$confPanel.trigger('resizestop');
							}, 50);
						}
					}
				})
				.css({
					top: KOCFIA.conf.confPanel.position.top,
					left: KOCFIA.conf.confPanel.position.left,
					width: KOCFIA.conf.confPanel.size.width,
					height: KOCFIA.conf.confPanel.size.height,
					position: 'absolute'
				})
				.find('.ui-icon-close').click(function(e){
					e.preventDefault();
					KOCFIA.$confPanel.hide();
					KOCFIA.conf.confPanel.visible = 0;
					Shared.storeConf();
				});

			//button
			var $confPanelToggle = $('<button id="kocfia-conf-panel-toggle" class="button">').html('<span>KOCFIA v'+ KOCFIA.version +'</span>');
			$confPanelToggle.click(function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.info('$kocConfPanelToggle click');
				KOCFIA.$confPanel.toggle();
				KOCFIA.conf.confPanel.visible = (KOCFIA.$confPanel.is(':visible') ? 1 : 0);
				Shared.storeConf();

				KOCFIA.$confPanelWrapper.css('height', KOCFIA.calcConfPanelInnerHeight());
			});

			$body.append( $confPanel );

			$('#kocfia-options').accordion({
				collapsible: true,
				autoHeight: false,
				animated: true
			});

			$('<div id="kocfia-buttons">')
				.html( $confPanelToggle )
				.insertBefore( $('#main_engagement_tabs') );

			KOCFIA.$buttons = $('#kocfia-buttons');

			KOCFIA.$confPanel = $('#kocfia-conf-panel');
			KOCFIA.$confPanelNav = $('#kocfia-conf-panel-tabs');
			KOCFIA.$confPanelWrapper = KOCFIA.$confPanel.find('#kocfia-conf-panel-wrapper');

			var delay = function( mod, i ){
				window.setTimeout(function(){
					KOCFIA[ mod ].modPanel();
				}, i * 5);
			};

			for( i = 0; i < modulesLength; i += 1 ){
				mod = KOCFIA.modules[i];
				if( KOCFIA[ mod ].hasOwnProperty('modPanel') && typeof KOCFIA[ mod ].modPanel == 'function' ){
					delay( mod, i );
				}
			}

			//help + history dialogs
			//and show confPanel is set as visible in configuration
			window.setTimeout(function(){
				KOCFIA.$confPanel.find('.help').dialog({ autoOpen: false, height: 300, width: 400, zIndex: 100003 });
				KOCFIA.$confPanel.find('.history').dialog({ autoOpen: false, height: 300, width: 400, zIndex: 100002 });

				if( KOCFIA.conf.confPanel.visible ){
					KOCFIA.$confPanel.show();
					KOCFIA.$confPanelWrapper.css('height', KOCFIA.calcConfPanelInnerHeight());

					//resize the grids in map tab
					window.setTimeout(function(){
						KOCFIA.$confPanel.trigger('resizestop');
					}, 50);
				}
			}, (i + 2) * 100);
		};

		KOCFIA.calcConfPanelInnerHeight = function(){
			return KOCFIA.$confPanel.innerHeight() - KOCFIA.$confPanelNav.height() - 20;
		};

		KOCFIA.optionPanel = function($optionsSection){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('confPanel') ) console.info('KOCFIA shared optionPanel function');
			var code = '<h3>Global</h3>';
				code += '<div>';
				code += Shared.generateButton('shared', 'cleanLocalStorage', 'Remise à zèro des données persistantes', null);
				//code += Shared.generateButton('shared', 'reloadGame', 'Recharger la page');
				//code += Shared.generateCheckbox('general', 'refresh', 'Rafraîchir les données toutes les ', KOCFIA.conf.general.refresh).replace(/<\/p>/, '');
				//code += Shared.generateInput('general', 'refreshFrequency', ' minutes', KOCFIA.conf.general.refreshFrequency).replace(/<p>/, '');
				code += Shared.generateCheckbox('general', 'reload', 'Recharger toutes les ', KOCFIA.conf.general.reload).replace(/<\/p>/, '');
				code += Shared.generateInput('general', 'reloadFrequency', '', KOCFIA.conf.general.reloadFrequency).replace(/<p>/, '') +' minutes';
				code += Shared.generateCheckbox('general', 'hideMagicalBoxPreview', 'Masquer automatiquement la pub pour la boîte magique de Merlin', KOCFIA.conf.general.hideMagicalBoxPreview);
				code += Shared.generateCheckbox('general', 'hideOtherPlayersCourtInvitation', 'Masquer automatiquement les invations pour voir la cour d\'un joueur', KOCFIA.conf.general.hideOtherPlayersCourtInvitation);
				code += Shared.generateCheckbox('general', 'hideFairPopup', 'Masquer automatiquement les fêtes foraines (avec envoie)', KOCFIA.conf.general.hideFairPopup);
				code += '<br>' + Shared.generateCheckbox('general', 'resetRaidTimer', 'Remise à zéro automatique du compteur des attaques de camps barbares (raid)', KOCFIA.conf.general.resetRaidTimer);
				code += Shared.generateButton('general', 'resetRaidTimer', 'Remettre à zéro le compteur des attaques de camps barbares (raid)', null);
				code += '<br>' + Shared.generateButton('general', 'resetCatpchaDetect', 'Annuler la pause pour cause de captcha', null);
				code += '</div>';
			$optionsSection.append( code );

			var i, length = KOCFIA.modules.length;
			for( i = 0; i < length; i += 1 ){
				KOCFIA[ KOCFIA.modules[i] ].confPanel( $optionsSection );
			}

			/*code = '<h3>Crédits</h3>';
			code += '<div><ul>';
			code += '<li><a href="http://beworld.perso.sfr.fr/bao/">Beworld</a> pour son travail</li>';
			code += '</ul></div>';

			$optionsSection.append( code );*/
		};

	/* SHARED */
		Shared = {};

		/* conf */
			Shared.storeConf = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared storeConf function', KOCFIA.conf);
				localStorage.setObject('kocfia_conf_' + KOCFIA.storeUniqueId, KOCFIA.conf);
			};

			Shared.cleanLocalStorage = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared cleanLocalStorage function');
				var i, length = KOCFIA.stored.length;
				for( i = 0; i < length; i += 1 ){
					localStorage.removeItem('kocfia_' + KOCFIA.stored[i] + '_' + KOCFIA.storeUniqueId);
				}
				$('#kocfia-map-load-saved').find('option').filter(':gt(0)').remove();
			};

			Shared.getServer = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('kocfia shared getServer function');
				return window.domainName;
			};

			Shared.getUserId = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('kocfia shared getUserId function');
				return window.kabamuid;
			};

		/* cities */
			Shared.getCities = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.time('cities');
				var i, length = window.seed.cities.length;
				for( i = 0; i < length; i += 1 ){
					var c = window.seed.cities[i];
					KOCFIA.cities['city' + c[0]] = {id: c[0], name: c[1], coords: {x: c[2], y: c[3]}, roman: window.roman[i], label: window.roman[i] +' '+ c[1], tileId: parseInt(c[5], 10)};
					KOCFIA.citiesKey.push( 'city' + c[0] );
				}
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.timeEnd('cities');
			};

		/* reload and refresh */
			Shared.reloadGame = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared reloadGame function');
				$('#kocfia-reload').submit();
			};

			Shared.reloadCountdown = function(status){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared reloadCountdown function', status);
				if( status ){
					reloadTimer = parseFloat(KOCFIA.conf.general.reloadFrequency) * 60 * 1000;
					reloadTimeout = window.setTimeout(function(){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared reloadCountdown timeout function');
						$('#kocfia-reload').submit();
						clearInterval( reloadInterval );
					}, reloadTimer - 1);

					KOCFIA.$reloadTimer.show().find('.kocfia-timer').html( Shared.readableDuration(reloadTimer / 1000) );
					reloadInterval = window.setInterval(function(){
						reloadTimer -= 1000;
						KOCFIA.$reloadTimer.find('.kocfia-timer').html( Shared.readableDuration(reloadTimer / 1000) );
					}, 1000);
				} else if( reloadTimeout ){
					clearTimeout( reloadTimeout );
					clearInterval( reloadInterval );
					KOCFIA.$reloadTimer.hide();
				}
			};

			Shared.refreshCountdown = function(status){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared refreshCountdown function', status);
				if( status ){
					refreshTimeout = window.setTimeout(function(){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared refreshCountdown timeout function');
						$('#kocfia-refresh-seed').trigger('click');
					}, parseFloat(KOCFIA.conf.general.refreshFrequency) * 60 * 1000);
				} else if( refreshTimeout ){
					clearTimeout( refreshTimeout );
				}
			};

			Shared.resetRaidTimer = function(status){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared resetRaidTimer function', status);
				if( status ){

					var cityKey;
					for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						window.setTimeout(function(){ Shared.resetRaidTimerByCity( cityKey, 3 ); }, i * 3000);
					}

					clearInterval( resetRaidInterval );
					resetRaidInterval = window.setInterval(function(){
						var cityKey;
						for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
							cityKey = KOCFIA.citiesKey[i];
							window.setTimeout(function(){ Shared.resetRaidTimerByCity( cityKey, 3 ); }, i * 5000);
						}
					}, 60 * 60 * 1000); //one hour
				} else if( resetRaidInterval ){
					clearInterval( resetRaidInterval );
				}
			};

			Shared.resetRaidTimerByCity = function( cityKey, attempts ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared resetRaidTimerByCity function', cityKey, attempts);
				var params = $.extend({}, window.g_ajaxparams);

				params.pf = 0;
				params.ctrl = 'BotManager';
				params.action = 'resetRaidTimer';
				params.settings = {};

				params.settings.cityId = cityKey.replace(/city/, '');

				$.ajax({
					url: window.g_ajaxpath + "ajax/_dispatch.php" + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function( result ){
					if( result.ok ){
						if( window.currentcityid == cityKey ) window.cityinfo_army();
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							Shared.resetRaidTimerByCity( cityKey, attempts );
						}
					}
				})
				.fail(function(){
					attempts -= 1;
					if( attempts > 0 ){
						Shared.resetRaidTimerByCity( cityKey, attempts );
					}
				});
			};

		/* encode, decode number formats */
			Shared.format = function( num ){
				if( num === undefined || num === null ) return '';
				num = '' + num;
				if( num.indexOf(',') > -1 ) num.replace(/,/, '.');
				num = '' + parseFloat(num).toFixed(0);
				var l = num.length,
					suffix = '',
					decimal;
				num = parseFloat(num);

				if( isNaN(num) ) return '';

				if( l <= 3 ){
					return num;
				} else if( l <= 6 ){
					num = (Math.floor(num / 1000 * 10) / 10).toFixed(1);
					suffix = 'K';
				} else if( l <= 9 ){
					num = (Math.floor(num / 1000000 * 10) / 10).toFixed(1);
					suffix = 'M';
				} else if( l <= 12 ){
					num = (Math.floor(num / 1000000000 * 10) / 10).toFixed(1);
					suffix = 'G';
				} else {
					num = (Math.floor(num / 1000000000 * 10) / 10).toFixed(1);
					suffix = 'G';
				}

				var s = '' + num;
				decimal = s.substr(s.length - 1, 1);
				s = s.substr(0, s.length - 2);

				if( decimal == '0' ){
					return parseFloat(num).toFixed(0) + suffix;
				} else if( s.length == 1 ){
					return num + suffix;
				} else if( s.length == 2 ){
					return (Math.floor(parseFloat(num) * 10) / 10).toFixed(1) + suffix;
				} else {
					return Math.floor( num ) + suffix;
				}
			};

			Shared.gridFormat = function( cellValue, options, rowObject ){

				return cellValue != '?' ? Shared.format( cellValue ) : cellValue;
			};

			Shared.numberRegExp = "[0-9]+(\.[0-9]{1,2})?([KMGkmg]){0,1}";

			Shared.decodeFormat = function( num ){
				num = num.toString().replace(/'/, ''); //reset readable() format
				var regexp = new RegExp('^[0-9]+(\.[0-9]{1,2})?([KMG]){0,1}$', 'gi'),
					match = regexp.exec(num);
				if( !match ){
					return false;
				} else if( match[2] ){
					num = parseFloat(num.substr(0, num.length-1));
					if( match[2] == 'K' || match[2] == 'k' ) num *= 1000;
					if( match[2] == 'M' || match[2] == 'm' ) num *= 1000000;
					if( match[2] == 'G' || match[2] == 'g' ) num *= 1000000000;
					return num;
				} else if( parseFloat(num) == num ){
					return parseFloat( num );
				} else {
					return false;
				}
			};

			Shared.readable = function( num ){
				if( typeof num == 'undefined' || num === null ) return '';
				num = '' + Math.floor( parseFloat(num) );
				var length = num.length;
				var s = '';

				while( length > 3 ){
					s = "'" + num.substr(length - 3, 3) + s;
					length -= 3;
				}

				return num.substr(0, length) + s;
			};

			Shared.readableDuration = function( time ){
				if( isNaN( parseFloat(time) ) || !isFinite(time) ){
					return '-';
				}
				time = Math.floor( parseFloat(time) );

				var time_units = [
					[31556926, 'a'],
					[2629744, 'm'],
					[86400, 'j'],
					[3600, 'h'],
					[60, 'm'],
					[1, 's']
				];

				var values = [], i, length = time_units.length, v;
				for( i = 0; i < length; i++ ){
					if( i === 0 ){
						v = parseInt(Math.floor(time / time_units[i][0]), 10);
					} else {
						v = parseInt(Math.floor((time % time_units[i-1][0]) / time_units[i][0]), 10);
					}
					if( v > 0 ) values.push( v + time_units[i][1] );
				}

				return values.join(' ');
			};

		/* conf options elements */
			Shared.generateCheckbox = function(module, option, text, checked){
				return '<p><input type="checkbox" class="conf-toggle" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +'><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
			};

			Shared.generateInput = function(module, option, text, value, type, rel){
				return '<p><label for="'+ module +'-'+ option +'">'+ text +'</label><input type="'+ type +'" class="conf-choice" id="'+ module +'-'+ option +'" value="'+ value +'" rel="'+ rel +'"></p>';
			};

			Shared.generateButton = function(module, action, text, param){
				return '<p><button rel="'+ module +'-'+ action +'" class="button danger conf-action" '+ (param !== null ? 'data-param="'+param+'"' : '') +'><span>'+ text +'</span></button></p>';
			};

			Shared.generateRadio = function(module, name, values, labels, selected){
				var code = '<p>';
				if( values.length && labels.length && values.length == labels.length ){
					var i, length = values.length;
					for( i = 0; i < length; i += 1 ){
						if( i > 0 ) code += '<br />';
						code += '<input type="radio" class="conf-toggle" id="'+ module +'-'+ values[i] +'" name="'+ module + '_' + name +'" '+ (selected[i] == 1 ? 'checked' : '') +' />';
						code += '<label for="'+ module +'-'+ values[i] +'">'+ labels[i] +'</label>';
					}
				}
				code += '</p>';
				return code;
			};

			Shared.generateSelect = function(module, name, label, selected, options){
				var code = '<p><label for="'+ module + '-' + name +'">'+ label +'</label><select id="'+ module + '-' + name +'" class="conf-choice">';
				if( options.values && options.labels && options.values.length == options.labels.length){
					var values = options.values,
						labels = options.labels,
						i, length = values.length;
					for( i = 0; i < length; i += 1 ){
						code += '<option value="'+ values[i] +'" '+ (values[i] == selected ? 'selected' : '') +'>'+ labels[i] +'</option>';
					}
				}
				code += '</select></p>';
				return code;
			};

			Shared.generateAudioInput = function(module, option, text, value, rel){
				var code = '<p class="audio"><label for="'+ module +'-'+ option +'">'+ text +'</label><br>';
				code += '<input type="url" class="conf-choice" id="'+ module +'-'+ option +'" value="'+ value +'" rel="'+ rel +'">';
				code += '<audio src="'+ value +'" preload="auto" />';
				code += '<span class="ui-icon ui-icon-play"></span>';
				code += '<span class="ui-icon ui-icon-pause"></span>';
				code += '<span class="ui-icon ui-icon-stop"></span>';
				code += '</p>';

				return code;
			};

		/* march */
			Shared.marchTimeCalculator = function(cityKey, troops, from_x, from_y, is_round_trip, items_applied, type){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('kocfia shared marchTimeCalculator function', cityKey, troops, from_x, from_y, is_round_trip, items_applied, type);
				var speed = 99999,
					total_troops = 0,
					time = 0,
					city = KOCFIA.cities[cityKey],
					ts = Date.timestamp();

				var techElevenModifier = parseInt(window.seed.tech.tch11, 10),
					techTwelveModifier = parseInt(window.seed.tech.tch12, 10),
					i, length = troops.length,
					j, troop_speed;
				for( i = 0; i < length; i += 1 ){
					j = i + 1;

					if( troops[i] <= 0 || !window.unitstats.hasOwnProperty("unt" + j) ) continue;

					total_troops += troops[i];
					troop_speed = parseInt(parseInt(window.unitstats["unt" + j][3], 10) * (1 + 0.1 * techElevenModifier), 10);

					if( j > 6 ){
						troop_speed = troop_speed * (1 + 0.05 * techTwelveModifier);
					}

					if( troop_speed < speed ){
						speed = troop_speed;
					}
				}

				if( 0 === speed ) return "";

				var barbarian_raid = false;

				if( type == 'transport' || type == 'reinforce' || type == 'reassign' ){
					var level = Shared.buildingHighestLevel(cityKey, 18);
					if( level > 0 ) speed = speed * (1 + level / 2);
				}

				var throne67 = window.cm.ThroneController.effectBonus(67);
				var throne68, throne69, throne70, throne71, throne72;
				throne68 = throne69 = throne70 = throne71 = throne72 = 0;

				if( type == 'attack' ){
					throne68 = window.cm.ThroneController.effectBonus(68);
				} else if( type == 'scout' ){
					throne72 = window.cm.ThroneController.effectBonus(72);
				} else if( type == 'reinforce' ){
					throne72 = window.cm.ThroneController.effectBonus(69);
				} else if( type == 'reassign' ){
					throne72 = window.cm.ThroneController.effectBonus(71);
				} else if( type == 'transport' ){
					throne72 = window.cm.ThroneController.effectBonus(70);
				}

				var throneBoost = throne67 + throne68 + throne69 + throne70 + throne71 + throne72;
				if( !barbarian_raid ){
					speed = speed * (1 + (throneBoost * 0.01));
				}

				var multiplier = 1 + (Shared.getGuardianBonus( cityKey, 'march' ) * 0.01);
				if( !barbarian_raid && window.cm.WorldSettings.isOn("GUARDIAN_MARCH_EFFECT") ){
					speed = speed * (1 + (multiplier * 0.01));
				}

				time = 0;
				var minimum_time = 173,
					x = Math.abs(parseInt(city.coords.x, 10) - parseInt(from_x, 10)),
					y = Math.abs(parseInt(city.coords.y, 10) - parseInt(from_y, 10));
				if( x > 375 ) x = 750 - x;
				if( y > 375 ) y = 750 - y;

				var distance = Math.sqrt((x * x) + (y * y));

				time = Math.ceil(distance * 6000 / speed);

				if( items_applied["57"] && window.seed.items.i57 > 0 ) time = parseInt(time * 0.5, 10);
				else if( items_applied["55"] && window.seed.items.i55 > 0 ) time = parseInt(time * 0.75, 10);

				time += 30;

				if( seed.playerEffects.returnExpire > ts ) time = parseInt(time * 0.75, 10);

				if( is_round_trip ) time *= 2;

				if( time < minimum_time && barbarian_raid && attack_selected ) time = minimum_time;

				return time;
			};

			Shared.forceMarchUpdate = function( attack, force, dfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared forceMarchUpdate function');
				if( window.seed.queue_atkp[ attack.cityKey ] ){
					var mParams = $.extend({}, window.g_ajaxparams),
						i = 0, j, march,
						marchStatus = [],
						mLength = attack.marching.length;
					if( mLength === 0 ){
						return;
					}

					var checkMarch = function(i, attempts){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared forceMarchUpdate checkMarch function');
						marchStatus[i] = false;
						march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
						if( march ){
							if( !march.hasOwnProperty('kocfiaUpdated') || force ){
								mParams.rid = attack.marching[i];
								$.ajax({
									url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
									type: 'post',
									data: mParams,
									dataType: 'json',
									timeout: 10000
								})
								.done(function(data){
									if( data.ok ){
										marchStatus[i] = true;
										if( window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ] ){
											//set the units Return value
											for( j = 1; j < 13; j += 1 ){
												if( data.march['unit'+ j +'Return'] ){
													window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
												}
											}
											for( j = 1; j < 6; j += 1 ){
												if( data.march['resource' + j] ){
													window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['resource' + j] = data.march['resource' + j];
												}
											}
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].marchStatus = data.march.marchStatus;
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].hasUpdated = true;
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].kocfiaUpdated = true;

											if( data.march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
												window.setTimeout(function(){ //create a copy of i
													Shared.cancelMarch( attack.marching[i], attack.cityKey, 1, 3, cdfd );
												}, 0);
											}
										}

										i += 1;
										if( i < mLength ){
											return checkMarch(i, 3);
										} else {
											for( var j = 0; j < marchStatus.length; j += 1 ){
												if( !marchStatus[j] ) return window.setTimeout(function(){ Shared.forceMarchUpdate( attack, force, null ); }, 10000);
											}
										}

									} else {
										attempts -= 1;
										if( attempts > 0 ){
											return checkMarch(i, attempts);
										} else {
											i += 1;
											if( i < mLength ){
												return checkMarch(i, 3);
											} else {
												for( j = 0; j < marchStatus.length; j += 1 ){
													if( !marchStatus[j] ) return setTimeout(function(){ Shared.forceMarchUpdate( attack, force, dfd ); }, 10000);
												}
											}
										}
									}
								})
								.fail(function(){
									attempts -= 1;
									if( attempts > 0 ){
										return checkMarch(i, attempts);
									} else {
										i += 1;
										if( i < mLength ){
											return checkMarch(i, 3);
										} else {
											for( var j = 0; j < marchStatus.length; j += 1 ){
												if( !marchStatus[j] ) return setTimeout(function(){ Shared.forceMarchUpdate( attack, force, dfd ); }, 10000);
											}
										}
									}
								});
							} else {
								marchStatus[i] = true;
								if( march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
									window.setTimeout(function(){ //create a copy of i
										Shared.cancelMarch( attack.marching[i], attack.cityKey, 1, 3, cdfd );
									}, 0);
								}
							}
						} else {
							i += 1;
							if( i < mLength ){
								return checkMarch(i, 3);
							} else {
								for( var j = 0; j < marchStatus.length; j += 1 ){
									if( !marchStatus[j] ) return setTimeout(function(){ Shared.forceMarchUpdate( attack, force, dfd ); }, 10000);
								}
							}
						}
					};

					checkMarch(i, 3);
				}
			};

			Shared.refreshMarchByCity = function( cityKey, force, dfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared refreshMarchByCity function');
				if( window.seed.queue_atkp.hasOwnProperty( cityKey ) && !$.isEmptyObject(window.seed.queue_atkp[ cityKey ]) ){
					var mParams = window.g_ajaxparams,
						i = 0, j, march,
						marches = Object.keys(window.seed.queue_atkp[ cityKey ]),
						length = marches.length;
					if( length === 0 ){
						return;
					}

					var checkMarch = function(i, attempts){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared refreshMarchByCity checkMarch function');
						march = window.seed.queue_atkp[ cityKey ][ marches[i] ];
						// cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN 9
						if( march && march.marchType != 9 ){
							if( !march.hasOwnProperty('kocfiaUpdated') || force ){
								var mParams = window.g_ajaxparams;
								mParams.rid = marches[i].replace(/m/, '');
								$.ajax({
									url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
									type: 'post',
									data: mParams,
									dataType: 'json',
									timeout: 10000
								})
								.done(function(data){
									if( data.ok ){
										//set the units Return value
										for( j = 1; j < 13; j += 1 ){
											if( data.march['unit'+ j +'Return'] ){
												window.seed.queue_atkp[ cityKey ][ marches[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
											}
										}
										for( j = 1; j < 6; j += 1 ){
											if( data.march['resource' + j] ){
												window.seed.queue_atkp[ cityKey ][ marches[i] ]['resource' + j] = data.march['resource' + j];
											}
										}
										window.seed.queue_atkp[ cityKey ][ marches[i] ].marchStatus = data.march.marchStatus;
										window.seed.queue_atkp[ cityKey ][ marches[i] ].hasUpdated = true;

										window.seed.queue_atkp[ cityKey ][ marches[i] ].kocfiaUpdated = true;

										i += 1;
										if( i < length ){
											return checkMarch(i, 3);
										} else {
											Shared.updateSeed();
											if( dfd ) return dfd.resolve();
										}
									} else {
										attempts -= 1;
										if( attempts > 0 ){
											return checkMarch(i, attempts);
										} else {
											i += 1;
											if( i < length ){
												return checkMarch(i, 3);
											} else {
												Shared.updateSeed();
												if( dfd ) return dfd.reject();
											}
										}
									}
								})
								.fail(function(){
									attempts -= 1;
									if( attempts > 0 ){
										return checkMarch(i, attempts);
									} else {
										i += 1;
										if( i < length ){
											return checkMarch(i, 3);
										} else {
											Shared.updateSeed();
											if( dfd ) return dfd.reject();
										}
									}
								});
							}
						} else {
							i += 1;
							if( i < length ){
								return checkMarch(i, 3);
							} else {
								Shared.updateSeed();
							}
						}
					};

					checkMarch(i, 3);
				}
			};

			Shared.recallWaves = function( attack ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared recallWaves function', attack);
				var marchIndex = 0;

				var sequence = function(){
					return $.Deferred(function(rdfd){
						if( attack.marching.length > 0 ){
							return rdfd.pipe( byMarch(rdfd) );
						} else {
							return rdfd.reject();
						}
					}).promise();
				};

				var byMarch = function(rdfd){
					if( marchIndex > attack.marching.length ){
						return rdfd.resolve();
					}

					var cancel = function(){
						return $.Deferred(function(mdfd){
							return mdfd.pipe( Shared.cancelMarch( attack.marching[ marchIndex ], attack.cityKey, 2, 3, mdfd ) );
						}).promise();
					};

					$.when( cancel() )
						.always(function(){
							marchIndex += 1;
							return rdfd.pipe( byMarch(rdfd) );
						});
				};

				$.when( sequence() )
					.always(function(){
						if( KOCFIA.conf.marches.active ){
							KOCFIA.marches.refreshByCity( attack.cityKey );
						}
					});
			};

			Shared.getUnitLimit = function( cityKey, hasAuraBoost, hasAura2Boost, hasMarchBoost, hasMarch2Boost ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared getUnitLimit function', cityKey, hasAuraBoost, hasAura2Boost, hasMarchBoost, hasMarch2Boost);
				var rallyPointLevel = Shared.buildingHighestLevel(cityKey, 12),
					modifier = 1,
					timestamp = Date.timestamp();
				if( (window.seed.playerEffects.aurasExpire && window.seed.playerEffects.aurasExpire > timestamp) || hasAuraBoost ){ //item 285
					modidier = 1.15;
				}
				if( (window.seed.playerEffects.auras2Expire && window.seed.playerEffects.auras2Expire > timestamp) || hasAura2Boost ){ //item 286
					modifier = 1.3;
				}

				if( hasMarchBoost ){ //item 931
					modifier += 0.25;
				} else if( hasMarch2Boost ){ //item 932
					modifier += 0.5;
				}

				var effect = window.cm.ThroneController.effectBonus(66),
					limit = 0;
				if( rallyPointLevel == 11 ){
					limit = Math.round(150000 * modifier);
				} else if( rallyPointLevel == 12 ){
					limit = Math.round(200000 * modifier);
				} else {
					limit = Math.round(rallyPointLevel * 10000 * modifier);
				}

				limit = Math.round(limit * (1 + effect / 100));

				return limit;
			};

			Shared.cancelMarch = function( marchId, cityKey, type, attempts, dfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared cancelMarch function', marchId, cityKey, type, attempts);
				if( marchId.toString().indexOf('m') == -1 ) marchId = 'm' + marchId;

				var params = $.extend({}, window.g_ajaxparams);
				params.cid = cityKey.replace(/city/, '');
				params.mid = marchId.replace(/m/, '');
				var recall = (type == 1 ? 'ajax/undefend.php' : 'ajax/cancelMarch.php');
				$.ajax({
					url: window.g_ajaxpath + recall + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function(result){
					if( result.ok ){
						if( result.updateSeed ){
							window.seed.queue_atkp[ cityKey ][ marchId ].marchStatus = 8;
							var marchtime = parseInt(window.seed.queue_atkp[ cityKey ][ marchId ].returnUnixTime, 10) - parseInt(seed.queue_atkp[ cityKey ][ marchId ].destinationUnixTime, 10),
								timestamp = Date.timestamp();
							if( window.seed.playerEffects.returnExpire > timestamp ){
								marchtime *= 0.5;
							}

							window.seed.queue_atkp[ cityKey ][ marchId ].destinationUnixTime = (result.hasOwnProperty('destinationUnixTime') ? parseInt(result.destinationUnixTime, 10) : timestamp);
							window.seed.queue_atkp[ cityKey ][ marchId ].returnUnixTime = (result.hasOwnProperty('returnUnixTime') ? parseInt(result.returnUnixTime, 10) : timestamp + marchtime * parseInt(result.returnMultiplier, 10));
							window.seed.queue_atkp[ cityKey ][ marchId ].marchStatus = 8;

							window.update_seed( result.updateSeed );
						}

						if( type == 2 ){
							for(var j = 1; j <= KOCFIA.troops.length; j += 1 ){
								window.seed.queue_atkp[ cityKey ][ marchId ]["unit" + j + "Return"] = parseInt(window.seed.queue_atkp[ cityKey ][ marchId ]["unit" + j + "Count"], 10);
							}
						}

						if( dfd ) return dfd.resolve();
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							return Shared.cancelMarch( marchId, cityKey, type, attempts, dfd );
						} else {
							if( dfd ) return dfd.reject();
							return false;
						}
					}
				})
				.fail(function(){
					attempts -= 1;
					if( attempts > 0 ){
						return Shared.cancelMarch( marchId, cityKey, type, attempts, dfd );
					} else {
						if( dfd ) return dfd.reject();
						return false;
					}
				});
			};

			Shared.getDuration = function( cityKeyFrom, cityKeyTo, coord, unit, type ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared getDuration function', cityKeyFrom, cityKeyTo, coord, unit, type);
				var coordXTo = null,
					coordYTo = null,
					city, distance;

				if( cityKeyTo ){
					city = KOCFIA.cities[ cityKeyTo ];
					coordXTo = city.coords.x;
					coordYTo = city.coords.y;
				} else if( coord !== '' ){
					coord = Shared.checkCoord( coord );
					if( coord !== false ){
						coordXTo = coord.x;
						coordYTo = coord.y;
					} else return '';
				}

				if( coordXTo === null ) return '';

				var is_round_trip = false,
					items_applied = {},
					isFriendly = true,
					troops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					u = parseInt(unit.replace(/unt/, ''), 10);

				if( $('#kocfia-quickMarch').is(':visible') ){
					if( $('#kocfia-quickMarch-item-55').prop('checked') ) items_applied['55'] = 1;
					if( $('#kocfia-quickMarch-item-57').prop('checked') ) items_applied['57'] = 1;
				}

				troops[u] = 1;

				return Shared.marchTimeCalculator(cityKeyFrom, troops, coordXTo, coordYTo, is_round_trip, items_applied, type);
			};

		/* knight */
			Shared.getKnightStatText = function( knight ){
				//stats
				var timestamp = Date.timestamp(),
					p = parseInt(knight.politics, 10),
					c = parseInt(knight.combat, 10),
					i = parseInt(knight.intelligence, 10),
					r = parseInt(knight.resourcefulness, 10);

				if( parseInt(knight.combatBoostExpireUnixtime, 10) > timestamp ) c = c * 1.25;

				if( parseInt(knight.intelligenceBoostExpireUnixtime, 10) > timestamp ) i = i * 1.25;

				if( parseInt(knight.politicsBoostExpireUnixtime, 10) > timestamp ) p = p * 1.25;

				if( parseInt(knight.resourcefulnessBoostExpireUnixtime, 10) > timestamp ) r = r * 1.25;

				var max = Math.max(p, c, i, r);

				if( r == p && r == c && r == i ){
					return 'pas de statistique principale';
				} else if( r == max ){
					return 'ingéniosité '+ max;
				} else if( p == max ){
					return 'politique '+ max;
				} else if( c == max ){
					return 'combat '+ max;
				} else if( i == max ){
					return 'intelligence '+ max;
				}
			};

			Shared.getAvailableKnights = function( cityKey ){
				var leaders = window.seed.leaders[cityKey],
					knights = [], knight, k;
				for( k in window.seed.knights[cityKey] ){
					if( window.seed.knights[cityKey].hasOwnProperty(k) ){
						knight = window.seed.knights[cityKey][k];
						if( knight.knightStatus == 1
							&& leaders.resourcefulnessKnightId != knight.knightId
							&& leaders.politicsKnightId != knight.knightId
							&& leaders.combatKnightId != knight.knightId
							&& leaders.intelligenceKnightId != knight.knightId
						){
							knights.push( knight );
						}
					}
				}
				return knights;
			};

			Shared.freeKnights = function( cityKey ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared freeKnights function', cityKey);
				var leaders = window.seed.leaders[cityKey],
					attacks = window.seed.queue_atkp[cityKey],
					occupiedKnights = [];

				for( var a in attacks ){
					if( attacks.hasOwnProperty(a) ){
						occupiedKnights.push( attacks[a].knightId );
					}
				}

				if( leaders.resourcefulnessKnightId ) occupiedKnights.push( leaders.resourcefulnessKnightId );
				if( leaders.politicsKnightId ) occupiedKnights.push( leaders.politicsKnightId );
				if( leaders.combatKnightId ) occupiedKnights.push( leaders.combatKnightId );
				if( leaders.intelligenceKnightId ) occupiedKnights.push( leaders.intelligenceKnightId );

				for( var k in window.seed.knights[cityKey] ){
					if( window.seed.knights[cityKey].hasOwnProperty(k) ){
						if( window.seed.knights[cityKey][k].knightStatus != 1
							&& $.inArray( window.seed.knights[cityKey][k].knightId, occupiedKnights ) == -1
						){
							window.seed.knights[cityKey][k].knightStatus = 1;
						}
					}
				}
			};

		/* map */
			Shared.mapLink = function( coords ){
				if( !$.isArray(coords) ) coords = [coords];
				var code = '', i, length = coords.length;
				for( i = 0; i < length; i += 1 ){
					code += '<span class="mapLink">'+ coords[i] +'</span>';
				}
				return code;
			};

			Shared.getDistance = function( fromX, fromY, toX, toY ){
				fromX = parseInt(fromX, 10);
				fromY = parseInt(fromY, 10);
				toX = parseInt(toX, 10);
				toY = parseInt(toY, 10);

				if( fromX < 0 ) fromX = 750 + fromX;
				else if( fromX >= 750 ) fromX = fromX - 750;

				if( fromY < 0 ) fromY = 750 + fromY;
				else if( fromY >= 750 ) fromY = fromY - 750;

				var max = 750,
					middle = max / 2,
					x = Math.abs(toX - fromX),
					y = Math.abs(toY - fromY);

				if (x > middle) {
					x = max - x;
				}
				if (y > middle) {
					y = max - y;
				}

				return Math.round(100 * Math.sqrt(x * x + y * y)) / 100;
			};

			Shared.coordRegExp = "[0-9]{1,3},[0-9]{1,3}";

			Shared.checkCoord = function( coord ){
				if( coord !== null && coord !== '' ){
					coord = $.trim( coord );
					coord = coord.split(',');
					if( coord.length != 2 ) return false;
					coord[0] = parseInt(coord[0], 10);
					coord[1] = parseInt(coord[1], 10);
					if( isNaN(coord[0]) || coord[0] < 0 || coord[0] > 750 ) return false;
					if( isNaN(coord[1]) || coord[1] < 0 || coord[1] > 750 ) return false;

					return {x: coord[0], y: coord[1]};
				} else return false;
			};

		/* update seed */
			Shared.updatingSeed = false;
			Shared.updateSeed = function(){
				if( !Shared.updatingSeed ){
					Shared.updatingSeed = true;
					window.update_seed_ajax(true, null);
					window.setTimeout(function(){ Shared.updatingSeed = false; }, 10000);
				}
			};

		/* city buildings */
			Shared.buildingHighestLevel = function( cityKey, buildingId ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared buildingHighestLevel function');

				var map = {
					 8: 'embassy',
					12: 'rallypoint',
					13: 'barrack',
					15: 'blacksmith',
					16: 'workshop',
					17: 'stable',
					18: 'wall'
				};

				if( KOCFIA.dataAndStats.stats.hasOwnProperty( cityKey )
					&& map.hasOwnProperty( buildingId )
					&& KOCFIA.dataAndStats.stats[ cityKey ].hasOwnProperty( map[ buildingId ] )
				){
					return KOCFIA.dataAndStats.stats[ cityKey ][ map[ buildingId ] ];
				} else {
					var level = 0, b;
					for( b in window.seed.buildings[cityKey] ){
						if( window.seed.buildings[cityKey].hasOwnProperty(b) ){
							var building = window.seed.buildings[cityKey][b],
								buildingLevel = parseInt(building[1], 10);

							if( building[0] == buildingId && level < buildingLevel ) level = buildingLevel;
						}
					}

					return level;
				}
			};

			Shared.barracksCount = function( cityKey ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared barracksCount function');

				var b, count = 0;
				for( b in window.seed.buildings[cityKey] ){
					if( window.seed.buildings[cityKey].hasOwnProperty(b) ){
						if( window.seed.buildings[cityKey][b][0] == 13 ) count += 1;
					}
				}
				return count;
			};

			Shared.getRallyPointSlots = function( cityKey ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared barracksCount function');

				var slots = Shared.buildingHighestLevel(cityKey, 12),
					a, attack;
				if( slots == 12 ) slots -= 1; //eleven armies at level 12
				for( a in window.seed.queue_atkp[cityKey] ){
					if( window.seed.queue_atkp[cityKey].hasOwnProperty(a) ){
						attack = window.seed.queue_atkp[cityKey][a];
						// cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN 9
						// cm.BOT_STATUS.BOT_MARCH_STOPPED 3
						//stopped barbarian camp
						if( attack.marchType == 9 && attack.marchStatus == 3 ) continue;

						// cm.MARCH_TYPES.MARCH_TYPE_ATTACK 4
						// cm.MARCH_TYPES.MARCH_TYPE_SCOUT 3
						// cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN 5
						// cm.MARCH_STATUS.MARCH_STATUS_INACTIVE 0
						//attack or scout march
						if( (attack.marchType == 3 || attack.marchType == 4) && (attack.marchStatus === 0 || attack.marchStatus == 5) ) continue;

						slots -= 1;
					}
				}

				return slots;
			};

		/* players */
			Shared.getPlayerInfo = function( playerId, from ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared getPlayerInfo function');

				var params = $.extend({}, window.g_ajaxparams),
					lastLogin = null,
					online = null;

				params.pid = playerId;

				var getInfo = function( dfd, attempts ){
					$.ajax({
						url: window.g_ajaxpath + "ajax/viewCourt.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							lastLogin = data.playerInfo.lastLogin;
							return dfd.pipe( getOnline(dfd, 3) );
						} else {
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( getInfo(dfd, attempts) );
							else return dfd.pipe( getOnline(dfd, 3) );
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ) return dfd.pipe( getInfo(dfd, attempts) );
						else return dfd.pipe( getOnline(dfd, 3) );
					});
				};

				var getOnline = function( dfd, attempts ){
					$.ajax({
						url: window.g_ajaxpath + "ajax/getOnline.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							if( $.isEmptyObject(data.data) ){
								online = '?';
							} else {
								online = data.data[ userId ];
							}
							return dfd.resolve();
						} else {
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( getOnline(dfd, attempts) );
							else return dfd.reject();
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ) return dfd.pipe( getOnline(dfd, attempts) );
						else return dfd.reject();
					});
				};

				var sequence = function(){
					return $.Deferred(function(dfd){
						return getInfo(dfd, 3);
					}).promise();
				};

				$.when( sequence() )
					.always(function(){
						var status = (online === null ? '?' : (online === true ? 'Connecté' : 'Déconnecté'));
						status += ' - '+ (lastLogin === null ? '?' : (lastLogin ? lastLogin : '?'));

						if( from == 'map' ){
							KOCFIA.map.setPlayerStatus(playerId, '<span class="playerInfo" rel="'+ playerId +'">'+ status +'</span>');
						} else {
							$(from).html( status );
						}
					});
			};

			Shared.getDiplomacy = function( allianceId ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared getDiplomacy function');

				if( allianceId === null || allianceId == '?' ) return '';

				if( allianceId === '' ) return 'aucune';

				if( window.seed.allianceDiplomacies === null || $.isEmptyObject(window.seed.allianceDiplomacies) ){
					return 'neutre';
				} else if( window.seed.allianceDiplomacies.hasOwnProperty('friendly') && window.seed.allianceDiplomacies.friendly && window.seed.allianceDiplomacies.friendly.hasOwnProperty( 'a' + allianceId ) ){
					return 'amical';
				} else if( window.seed.allianceDiplomacies.hasOwnProperty('hostile') && window.seed.allianceDiplomacies.hostile && window.seed.allianceDiplomacies.hostile.hasOwnProperty( 'a' + allianceId ) ){
					return 'hostile';
				} else if( window.seed.allianceDiplomacies.hasOwnProperty('allianceId') && window.seed.allianceDiplomacies.allianceId == allianceId ){
					return 'allié';
				}
				return 'neutre';
			};

			Shared.playerStatusLink = function( playerId ){
				return playerId !== null ? '<span class="playerInfo" rel="'+ playerId +'">status</span>' : '? - ?';
			};

		/* next iteration timers */
			Shared.nextIteration = function( $bar, duration ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared nextIteration function', $bar, duration);
				var time = new Date();
				time.setTime( time.getTime() + duration * 1000 );

				var hours = time.getHours(),
					minutes = time.getMinutes();

				time = (hours < 10 ? '0'+ hours : hours) +':'+ (minutes < 10 ? '0'+ minutes : minutes);

				$bar.html(time);
			};

		/* form notifications */
			Shared.notificationRemoval = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared notificationRemoval function');

				KOCFIA.$confPanelWrapper.find('.kocfia-error, .kocfia-success, .kocfia-working').remove();
			};

			Shared.success = function( message ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared success function');
				Shared.notificationRemoval();

				var code = '<div class="kocfia-success" style="display: none;">';
				if( message === null || message === '' ) message = 'Enregistrement réussi';
				code += message;
				code += '</div>';

				$( code )
					.appendTo( KOCFIA.$confPanelWrapper )
					.fadeIn(200, function(){ var $self = $(this); window.setTimeout(function(){ $self.fadeOut(500); }, 2000); });
			};

			Shared.notify = function( message ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared notify function');
				Shared.notificationRemoval();

				var code = '<div class="kocfia-error" style="display: none;">';

				if( Array.isArray(message) ){
					code += '<h4>Notifications<span class="close">x</span></h4>';
					code += '<ul><li>'+ message.join('</li><li>') +'</li></ul>';
					code += '</div>';

					$( code )
						.appendTo( KOCFIA.$confPanelWrapper )
						.fadeIn(200);
				} else {
					if( message === null || message === '' ) message = 'Erreur';
					code += '<h4>Notifications<span class="close">x</span></h4>';
					code += '<ul><li>'+ message +'</li></ul>';
					code += '</div>';

					$( code )
						.appendTo( KOCFIA.$confPanelWrapper )
						.fadeIn(200, function(){ var $self = $(this); window.setTimeout(function(){ $self.fadeOut(500); }, 5000); });
				}
			};

			Shared.working = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared working function');
				Shared.notificationRemoval();

				var code = '<div class="kocfia-working" style="display: none;">';
				code += '<h4>Traitement en cours<span class="close">x</span></h4>';
				code += '</div>';
				$( code )
					.appendTo( KOCFIA.$confPanelWrapper )
					.fadeIn(200);
			};

		/* guardians */
			Shared.getGuardian = function( cityKey ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared getGuardian function');

				if( Array.isArray(window.seed.guardian) && window.seed.guardian.length > 0 ){
					var cityId = cityKey.replace(/city/, ''),
						guardian;
					for( var i = 0, l = window.seed.guardian.length; i < l; i += 1 ){
						guardian = window.seed.guardian[ i ];
						if( Object.isObject(guardian) && !$.isEmptyObject(guardian) ){
							if( guardian.city == cityId ){
								return guardian;
							}
						}
					}
				}

				return false;
			};

			Shared.getGuardianBonus = function( cityKey, type ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('shared') ) console.info('KOCFIA shared getGuardianBonus function', cityKey, type);

				var guardian = Shared.getGuardian( cityKey );

				if( guardian === false ){
					return 0;
				}

				//guardians levels default
				var defaults = {
					'wood': 0,
					'ore': 0,
					'stone': 0,
					'food': 0
				};

				var bonusPerLevel = {
					0  : 0,
					1  : 1,
					2  : 1,
					3  : 2,
					4  : 2,
					5  : 3,
					6  : 3,
					7  : 4,
					8  : 5,
					9  : 7,
					10 : 10,
					11 : 15,
					12 : 20
				};

				//make sure all the guardian type level are present
				guardian.cityGuardianLevels = $.extend(defaults, guardian.cityGuardianLevels);

				var isSet = guardian.guardianCount == 4;

				switch( type ){
					case 'train':
							var base = bonusPerLevel[guardian.cityGuardianLevels.stone] / 100,
								isStone = guardian.type == 'stone';

							if( isStone && isSet ){
								return base * 1.5;
							} else if( isStone && !isSet ){
								return base;
							} else if( !isStone && isSet ){
								return base * 0.5;
							} else {
								return 0;
							}
						break;
					case 'march':
							var base = bonusPerLevel[guardian.cityGuardianLevels.food] / 100,
								isFood = guardian.type == 'food';

							if( isFood && isSet ){
								return base * 1.5;
							} else if( isFood && !isSet ){
								return base;
							} else if( !isFood && isSet ){
								return base * 0.5;
							} else {
								return 0;
							}
						break;
					case 'resources':
							var bonuses = {
								'wood'	: 0,
								'food'	: 0,
								'stone' : 0,
								'ore'	: 0
							};

							var food = bonusPerLevel[guardian.cityGuardianLevels.food] / 100,
								stone = bonusPerLevel[guardian.cityGuardianLevels.stone] / 100,
								wood = bonusPerLevel[guardian.cityGuardianLevels.wood] / 100,
								ore = bonusPerLevel[guardian.cityGuardianLevels.ore] / 100,
								isFood = guardian.type == 'food',
								isStone = guardian.type == 'stone',
								isWood = guardian.type == 'wood',
								isOre = guardian.type == 'ore';

							if( isSet ){
								bonuses.food = isFood ? food * 1.5 : food * 0.5;
								bonuses.stone = isStone ? stone * 1.5 : stone * 0.5;
								bonuses.wood = isWood ? wood * 1.5 : wood * 0.5;
								bonuses.ore = isOre ? ore * 1.5 : ore * 0.5;
							} else {
								bonuses.food = food;
								bonuses.stone = stone;
								bonuses.wood = wood;
								bonuses.ore = ore;
							}

							return bonuses;
						break;

					default:
						return 0;
				}
			};

		/* captcha */
			Shared.manageCaptcha = function( from ){
				KOCFIA.captchaDetected = true;
				window.setTimeout(function(){
					KOCFIA.captchaDetected = false;
				}, 30 * 60 * 1000);

				$('<div>')
					.attr('title', 'Alerte Captcha')
					.html('Une tentative de marche a déclenché une demande de validation via captcha. Toutes les marches automatiques sont mise en pause pour 30 minutes.<br>Sont concernées les marches via les onglets CB, FO, TS, Transport, Réassignement, Éclairages et Pillages.<br>Vous pouvez annuler cette pause via le bouton "Annuler la pause pour cause de captcha" dans les options.')
					.dialog({ modal: true, height: 'auto', width: 'auto', zIndex: 100100 });
			};

			Shared.resetCatpchaDetect = function(){
				KOCFIA.captchaDetected = false;
			};

	/* FACEBOOK WALL POST POPUP */
		KOCFIA.fbWallPopup = {
			options: {
				active: 0,
				cancel: 0,
				post: 0
			}
		};

		KOCFIA.fbWallPopup.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('fbWallPopup') ) console.info('KOCFIA fbWallPopup confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.fbWallPopup +'</h3>';
			code += '<div>';
			code += '<p>PAS FINI</p>';
			code += Shared.generateCheckbox('fbWallPopup', 'active', 'Activer', KOCFIA.conf.fbWallPopup.active);
			code += Shared.generateRadio('fbWallPopup', 'action', ['cancel', 'post'], ['annulation automatique', 'publication automatique'], [KOCFIA.conf.fbWallPopup.cancel, KOCFIA.conf.fbWallPopup.post]);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.fbWallPopup.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('fbWallPopup') ) console.info('kocfia fbWallPopup on function');
		};

		KOCFIA.fbWallPopup.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('fbWallPopup') ) console.info('kocfia fbWallPopup off function');
		};

	/* CHAT */
		KOCFIA.chat = {
			options: {
				active: 1,
				moveable: 1,
				cleanHelp: 1,
				onRight: 1,
				position: {top: 0, left: 0},
				size: {width: false, height: false},
				onRightPosition: {top: '-562px', left: '761px'},
				highlightLeaders: 0,
				highlightFriends: 0,
				highlightFoes: 0,
				chancellorColor: '#EAFC83',
				viceChancellorColor: '#C7E3F7',
				officerColor: '#D5D2F7',
				friendColor: '#FAE4E4',
				foeColor: '#FFCAA2',
				playSoundOnWhisper: 0,
				whisperSoundUrl: 'http://kocfia.kapok.fr/whisper.ogg'
			},
			stored: ['friends_list', 'foes_list'],
			friendsList: [],
			foesList: [],
			leaders: {}
		};

		KOCFIA.chat.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.chat +'</h3>';
				code += '<div>';
				code += Shared.generateCheckbox('chat', 'active', 'Activer', KOCFIA.conf.chat.active);
				code += Shared.generateCheckbox('chat', 'moveable', 'Chat déplacable et redimensionnable', KOCFIA.conf.chat.moveable);
				code += Shared.generateCheckbox('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOCFIA.conf.chat.cleanHelp);
				code += '<br>'+ Shared.generateCheckbox('chat', 'playSoundOnWisper', 'Jouer un son lors de la réception d\'un chuchot', KOCFIA.conf.chat.playSoundOnWisper);
				code += Shared.generateInput('chat', 'whisperSoundUrl', 'Adresse web du son à jouer <small>(wave, vorbis, ogg, webm)</small>', KOCFIA.conf.chat.whisperSoundUrl, 'url', 'whisper');
				code += '<br>'+ Shared.generateButton('chat', 'onRight', 'Repositionner le chat à droite');
				code += '<br>'+ Shared.generateCheckbox('chat', 'highlightLeaders', 'Changer la couleur des messages de la chancellerie (chats Général et Alliance)', KOCFIA.conf.chat.highlightLeaders);
				code += Shared.generateButton('chat', 'getLeadersList', 'Raffraîchir la liste des joueurs de la chancellerie');
				code += '<br>'+ Shared.generateCheckbox('chat', 'highlightFriends', 'Changer la couleur des messages des amis (chat Général)', KOCFIA.conf.chat.highlightFriends);
				code += Shared.generateCheckbox('chat', 'highlightFoes', 'Changer la couleur des messages des ennemis (chat Général)', KOCFIA.conf.chat.highlightFoes);
				code += Shared.generateButton('chat', 'cleanFriendsList', 'Vider la liste d\'amis');
				code += Shared.generateButton('chat', 'cleanFoesList', 'Vider la liste d\'ennemis');
				code += '</div>';

			$section.append( code );
		};

		KOCFIA.chat.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-chat').html('');

			var colors = '<div class="kocfia-chat-colors">';
			colors += '<h3>Couleurs de fond</h3>';
			colors += '<label for="kocfia-chat-chancellorColor">Chancelier&nbsp;:&nbsp;</label><input type="text" id="kocfia-chat-chancellorColor" name="chancellorColor">';
			colors += '<br><label for="kocfia-chat-viceChancellorColor">Vice chancelier&nbsp;:&nbsp;</label><input type="text" id="kocfia-chat-viceChancellorColor" name="viceChancellorColor">';
			colors += '<br><label for="kocfia-chat-officerColor">Officier&nbsp;:&nbsp;</label><input type="text" id="kocfia-chat-officerColor" name="officerColor">';
			colors += '<br><label for="kocfia-chat-friendColor">Amis&nbsp;:&nbsp;</label><input type="text" id="kocfia-chat-friendColor" name="friendColor">';
			colors += '<br><label for="kocfia-chat-foeColor">Ennemis&nbsp;:&nbsp;</label><input type="text" id="kocfia-chat-foeColor" name="foeColor">';
			colors += '<br><button class="button modify apply"><span>Appliquer</span></button>';
			colors += '</div>';

			var friends = '',
				i, length = KOCFIA.chat.friendsList.length;
			for( i = 0; i < length; i += 1 ){
				friends += '<li><a href="#">'+ KOCFIA.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash" title="supprimer"></span></li>';
			}

			var foes = '';
			length = KOCFIA.chat.foesList.length;
			for( i = 0; i < length; i += 1 ){
				foes += '<li><a href="#">'+ KOCFIA.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash" title="supprimer"></span></li>';
			}

			var code = '<h3>Liste d\'amis</h3>';
				code += '<p><label for="kocfia-friend">Joueur : </label>';
				code += '<input type="text" name="kocfia-friend" id="kocfia-friend" />';
				code += '<button rel="friends" class="button modify"><span>Ajouter</span></button></p>';
				code += '<ul class="kocfia-chat-list" rel="friends">'+ friends +'</ul>';
				code += '<h3>Liste d\'ennemis</h3>';
				code += '<p><label for="kocfia-foe">Joueur : </label>';
				code += '<input type="text" name="kocfia-foe" id="kocfia-foe" />';
				code += '<button rel="foes" class="button modify"><span>Ajouter</span></button></p>';
				code += '<ul class="kocfia-chat-list" rel="foes">'+ foes +'</ul>';

			$section.append( colors + code )
				.on('click', 'button:not(.apply)', function(e){
					e.preventDefault();

					var $this = $(this),
						rel = $this.attr('rel'),
						list = rel + 'List',
						$input = $this.parent().find('input'),
						name = $input.val(),
						$ul = KOCFIA.chat.$lists.filter('[rel="'+ rel +'"]');

					if( !$ul.find('li').find('a').filter(':contains("'+ name +'")').length ){
						KOCFIA.chat[list].push( name );
						KOCFIA.chat[list].sort();
						var f = '', i, length = KOCFIA.chat[list].length;
						for( i = 0; i < length; i += 1 ){
							f += '<li><a href="#">'+ KOCFIA.chat[list][ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>';
						}
						$ul.html( f );

						if( rel == 'friends' ) KOCFIA.chat.storeFriendsList();
						else if( rel == 'foes' ) KOCFIA.chat.storeFoesList();

						if( KOCFIA.chat.highlightFriends || KOCFIA.chat.highlightFoes ){
							KOCFIA.chat.highlightFriendsAndFoes(0);
						}
					}

					$input.val('');
				})
				.on('click', '.ui-icon-trash', function(){
					var $li = $(this).parent(),
						rel = $li.parent().attr('rel'),
						list = rel + 'List';
					KOCFIA.chat[list].splice(KOCFIA.chat[list].indexOf( $li.find('a').text() ), 1);
					if( rel == 'friends' ) KOCFIA.chat.storeFriendsList();
					else if( rel == 'foes' ) KOCFIA.chat.storeFoesList();
					$li.remove();
				})
				.on('click', 'a', function(e){
					e.preventDefault();
					//use game native function
					Chat.whisper( $(this).text() );
				})
				.on('click', '.apply', function(){
					$('#kocfia-chat').find('.kocfia-chat-colors').find('input').each(function(){
						KOCFIA.conf.chat[ this.name ] = $(this).miniColors('value');
					});
					Shared.storeConf();

					if( KOCFIA.conf.chat.highlightLeaders ){
						$('#kocfia-chat-highlight-leaders').remove();

						var css = chatHighlightLeadersCss;
						css = css.replace(/%chancellorColor%/, KOCFIA.conf.chat.chancellorColor);
						css = css.replace(/%viceChancellorColor%/, KOCFIA.conf.chat.viceChancellorColor);
						css = css.replace(/%officerColor%/, KOCFIA.conf.chat.officerColor);

						$head.append( $('<style id="kocfia-chat-highlight-leaders">').html(css) );
					}

					if( KOCFIA.conf.chat.highlightFriends ){
						$('#kocfia-chat-highlight-friends').remove();
						$head.append( $('<style id="kocfia-chat-highlight-friends">').html( chatHighlightFriendsCss.replace(/%friendColor%/, KOCFIA.conf.chat.friendColor) ) );
					}

					if( KOCFIA.conf.chat.highlightFoes ){
						$('#kocfia-chat-highlight-foes').remove();
						$head.append( $('<style id="kocfia-chat-highlight-foes">').html( chatHighlightFoesCss.replace(/%foeColor%/, KOCFIA.conf.chat.foeColor) ) );
					}
				});

			$section.find('.kocfia-chat-colors').find('input').miniColors().each(function(){
				$(this).miniColors('value', KOCFIA.conf.chat[ this.name ]);
			});

			KOCFIA.chat.$lists = $('#kocfia-chat').find('.kocfia-chat-list');
		};

		KOCFIA.chat.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat on function');

			KOCFIA.chat.$audio = $('<audio id="kocfia-sound-whisper" src="'+ KOCFIA.conf.chat.whisperSoundUrl +'" preload="auto">').appendTo( $body );

			//get leader boards
			KOCFIA.chat.getLeadersList();

			//dupplicate input
				KOCFIA.chat.$chatInput.clone().attr('id', 'mod_comm_input_clone')
					.appendTo( KOCFIA.chat.$chat.find('.postaction') );
				KOCFIA.chat.$chatInputClone = $('#mod_comm_input_clone');

				KOCFIA.chat.$chat.find('.postaction').find('.button20')
					.removeAttr('onclick')
					.click(function(e){
						e.preventDefault();
						e.stopPropagation();
						KOCFIA.chat.$chatInput.val( KOCFIA.chat.$chatInputClone.val() );
						window.Chat.sendChat();
						KOCFIA.chat.$chatInputClone.val('');
					});

				KOCFIA.chat.$chat.prepend('<div class="kocfia-chat-top-wrapper">').append('<div class="kocfia-chat-bottom">');
				KOCFIA.chat.$chat.find('.kocfia-merlin-small, .mod_comm_mmb, .comm_tabs').appendTo( KOCFIA.chat.$chat.find('.kocfia-chat-top-wrapper') );

				KOCFIA.chat.$chat.find('.comm_body').append('<div class="kocfia-chat-form-wrapper">');
				KOCFIA.chat.$chat.find('.comm_body').find('.mod_comm_forum, form').appendTo( KOCFIA.chat.$chat.find('.kocfia-chat-form-wrapper') );

				KOCFIA.chat.$chat.find('.comm_body').append('<div class="kocfia-chat-list-wrapper">');
				KOCFIA.chat.$chat.find('.chatlist').appendTo( KOCFIA.chat.$chat.find('.kocfia-chat-list-wrapper') );

				KOCFIA.chat.$formWrapper = KOCFIA.chat.$chat.find('.kocfia-chat-form-wrapper');
				KOCFIA.chat.$listWrapper = KOCFIA.chat.$chat.find('.kocfia-chat-list-wrapper');

				//redefine the whisper function to use the cloned input
				window.Chat.whisper = function(to){
					if( typeof to === "string" && to.length !== 0 ){
						var text = KOCFIA.chat.$chatInputClone.val().strip();
						if( text.charAt(0) == "@" ) text = "";

						KOCFIA.chat.$chatInputClone.val("@" + to + " " + text).focus();
					}
				};

			//clean help
				if( KOCFIA.conf.chat.cleanHelp ){
					KOCFIA.chat.cleanHelpOn();
				} else {
					var hideChatRules = function(){
						var tmp = KOCFIA.chat.$chatAlliance.find('.noalliance');
						if( tmp.length ){
							tmp.first().hide();
						} else {
							window.setTimeout(function(){ hideChatRules(); }, 500);
						}
					};
					window.setTimeout(function(){ hideChatRules(); }, 500);
				}

			//highlightleaders
				if( KOCFIA.conf.chat.highlightLeaders ){
					KOCFIA.chat.highlightLeadersOn();
				}

			//update lists in panel
				var friends = '', foes = '',
					i, length = KOCFIA.chat.friendsList.length;
				for( i = 0; i < length; i += 1 ){
					friends += '<li><a href="#">'+ KOCFIA.chat.friendsList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>';
				}

				length = KOCFIA.chat.foesList.length;
				for( i = 0; i < length; i += 1 ){
					foes += '<li><a href="#">'+ KOCFIA.chat.foesList[ i ] +'</a><span class="ui-icon ui-icon-trash"></span></li>';
				}

				KOCFIA.chat.$lists.filter('[rel="friends"]').html( friends );
				KOCFIA.chat.$lists.filter('[rel="foes"]').html( foes );

			//activate highlight
				if( KOCFIA.conf.chat.highlightFriends ){
					KOCFIA.chat.highlightFriendsOn();
				}

				if( KOCFIA.conf.chat.highlightFoes ){
					KOCFIA.chat.highlightFoesOn();
				}

			//placement
				if( KOCFIA.conf.chat.moveable ){
					KOCFIA.chat.moveableOn();
				}

				if( KOCFIA.conf.chat.onRight && KOCFIA.conf.chat.position.top === 0 ){
					KOCFIA.chat.onRight();
				}
		};

		KOCFIA.chat.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat off function');
			KOCFIA.chat.moveableOff();
			KOCFIA.chat.cleanHelpOff();
			KOCFIA.chat.highlightLeadersOff();
			KOCFIA.chat.highlightFriendsOff();
			KOCFIA.chat.highlightFoesOff();
		};

		/* moveable */
		KOCFIA.chat.moveableOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat moveableOn function');
			$head.append( $('<style id="kocfia-chat-moveable">').html(chatMoveableCss) );

			KOCFIA.chat.$chat
				.draggable({
					helper: 'original',
					containment: 'body',
					handle: '.kocfia-chat-top-wrapper, .kocfia-chat-form-wrapper, .kocfia-chat-bottom',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.chat.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 250,
					minHeight: 150,
					resize: function(event, ui){
						KOCFIA.chat.$listWrapper
							.css('height', ui.size.height - 25 - KOCFIA.chat.$formWrapper.height());

						KOCFIA.chat.$chatInputClone
							.width(function(){ return ui.size.width - 65; })
							.siblings('.button20').css('left', function(){ return ui.size.width - 55; });
					},
					stop: function(event, ui){
						KOCFIA.conf.chat.size = ui.size;
						KOCFIA.conf.chat.position = ui.position;
						Shared.storeConf();
					}
				})
				.css({
					top: KOCFIA.conf.chat.position.top,
					left: KOCFIA.conf.chat.position.left
				});

			if( KOCFIA.conf.chat.size.width ){
				KOCFIA.chat.$chat.css('width', KOCFIA.conf.chat.size.width);

				KOCFIA.chat.$chatInputClone.width(function(){ return KOCFIA.conf.chat.size.width - 65; })
					.siblings('.button20').css('left', function(){ return KOCFIA.conf.chat.size.width - 55; });
			}

			if( KOCFIA.conf.chat.size.height ) KOCFIA.chat.$chat.css('height', KOCFIA.conf.chat.size.height);
			else KOCFIA.chat.$chat.css('height', KOCFIA.chat.$chat.parent().css('height')); //original height

			KOCFIA.chat.$listWrapper
				.css('height', KOCFIA.chat.$chat.height() - 25 - KOCFIA.chat.$formWrapper.height());

			var $jeu = KOCFIA.chat.$chat.find('.mod_comm_mmb');
			$jeu.data('ori', $jeu.html())
				.removeClass('mod_comm_mmb').addClass('kocfia-merlin-small').html('Boîtes Magiques');
		};

		KOCFIA.chat.moveableOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat moveableOff function');
			$('#kocfia-chat-moveable').remove();
			KOCFIA.chat.$chat[0].style = '';
			KOCFIA.chat.$chat
				.draggable('destroy')
				.resizable('destroy')
				.css({top: 0, left: 0});
			KOCFIA.chat.$chatInputClone.css('width', '')
				.siblings('.button20').css('left', '');

			KOCFIA.chat.$listWrapper.css('height', '');

			var $jeu = KOCFIA.chat.$chat.find('.kocfia-merlin-small');
				$jeu.removeClass('kocfia-merlin-small').addClass('mod_comm_mmb').html( $jeu.data('ori') ).removeData('ori');
		};

		KOCFIA.chat.onRight = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat onRight function');
			KOCFIA.conf.chat.position = {
				top: KOCFIA.conf.chat.onRightPosition.top,
				left: KOCFIA.conf.chat.onRightPosition.left
			};
			KOCFIA.chat.$chat.css(KOCFIA.conf.chat.position);
			Shared.storeConf();
		};

		/* cleanHelp */
		KOCFIA.chat.cleanHelpOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat cleanHelpOn function');
			$head.append( $('<style id="kocfia-chat-help">').html(chatHelpCss) );
		};

		KOCFIA.chat.cleanHelpOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat cleanHelpOff function');
			$('#kocfia-chat-help').remove();
		};

		KOCFIA.chat.cleanHelp = function( nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat cleanHelp function');
			//suppression du superflu (demande aide et son résultat)
			if( KOCFIA.conf.chat.active && KOCFIA.conf.chat.cleanHelp ){
				window.setTimeout(function(){
					var $messages = KOCFIA.chat.$chatAlliance.find('.chatwrap');
					if( nbMsg > 0 ){
						$messages.filter(':lt('+ nbMsg +')');
					}
					$messages
						.find('.tx')
						.find('a').each(function(){
							var $helpLink = $(this);
							if( $helpLink.attr('onclick') && $helpLink.attr('onclick').indexOf('claimAllianceChatHelp') === 0 ){
								$helpLink
									.click() //clic auto sur les demandes d'aides
									.closest('.chatwrap').remove(); //et suppression de la demande d'aide
								//suppression du résultat -> masqué en css .noalliance
							}
						});
				}, 250);
			}
		};

		/* highlight leaders */
		KOCFIA.chat.highlightLeaders = function( $targetChat, nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('kocfia chat highlightLeaders function');
			if( $targetChat && $targetChat.length ){
				var $messages = $targetChat.find('.chatwrap');
				if( nbMsg > 0 ){
					$messages.filter(':lt('+ nbMsg +')');
				}

				$messages.find('.nm').each(function(){
					var $nm = $(this),
						name = $nm.text();
					if( KOCFIA.chat.leaders[ name ] ){
						$nm.closest('.chatwrap').removeClass('chancellor vice_chancellor officer').addClass( KOCFIA.chat.leaders[ name ] );
					}
				});
			}
		};

		KOCFIA.chat.getLeadersList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('kocfia chat getLeadersList function');
			//ajax call to get the leaders, highlighting will be done in the ajax response listener
			window.getDirectoryTabAllianceMembers();
		};

		KOCFIA.chat.highlightLeadersOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightLeadersOn function');
			KOCFIA.chat.getLeadersList();

			var css = chatHighlightLeadersCss;
			css = css.replace(/%chancellorColor%/, KOCFIA.conf.chat.chancellorColor);
			css = css.replace(/%viceChancellorColor%/, KOCFIA.conf.chat.viceChancellorColor);
			css = css.replace(/%officerColor%/, KOCFIA.conf.chat.officerColor);

			$head.append( $('<style id="kocfia-chat-highlight-leaders">').html(css) );
		};

		KOCFIA.chat.highlightLeadersOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightLeadersOff function');
			$('#kocfia-chat-highlight-leaders').remove();
			KOCFIA.chat.leaders = {};
		};

		/* highlight friends */
		KOCFIA.chat.highlightFriendsOn = function( highlight ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFriendsOn function');
			$head.append( $('<style id="kocfia-chat-highlight-friends">').html( chatHighlightFriendsCss.replace(/%friendColor%/, KOCFIA.conf.chat.friendColor) ) );
			KOCFIA.chat.highlightFriendsAndFoes(0);
		};

		KOCFIA.chat.highlightFriendsOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFriendsOff function');
			$('#kocfia-chat-highlight-friends').remove();
		};

		KOCFIA.chat.storeFriendsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA storeFriendsList function');
			localStorage.setObject('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId, KOCFIA.chat.friendsList);
		};

		KOCFIA.chat.cleanFriendsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA cleanFriendsList function');
			KOCFIA.chat.friendsList = [];
			localStorage.removeItem('kocfia_chat_friends_list_' + KOCFIA.storeUniqueId);
			$('#kocfia-chat').find('ul').filter('[rel="friends"]').html('');
		};

		/* highlight foes */
		KOCFIA.chat.highlightFoesOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFoesOn function');
			$head.append( $('<style id="kocfia-chat-highlight-foes">').html(chatHighlightFoesCss.replace(/%foeColor%/, KOCFIA.conf.chat.foeColor)) );
			KOCFIA.chat.highlightFriendsAndFoes(0);
		};

		KOCFIA.chat.highlightFoesOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFoesOff function');
			$('#kocfia-chat-highlight-foes').remove();
		};

		KOCFIA.chat.storeFoesList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA storeFoesList function');
			localStorage.setObject('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId, KOCFIA.chat.foesList);
		};

		KOCFIA.chat.cleanFoesList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA cleanFoesList function');
			KOCFIA.chat.foesList = [];
			localStorage.removeItem('kocfia_chat_foes_list_' + KOCFIA.storeUniqueId);
			$('#kocfia-chat').find('ul').filter('[rel="foes"]').html('');
		};

		/* highlight friends and foes */
		KOCFIA.chat.highlightFriendsAndFoes = function( nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('chat') ) console.info('KOCFIA chat highlightFriendsAndFoes function', nbMsg);
			if( KOCFIA.hasOwnProperty('$chatGeneral') ){
				var $messages = KOCFIA.chat.$chatGeneral.find('.chatwrap'),
					highlightFriends = KOCFIA.conf.chat.highlightFriends && KOCFIA.chat.friendsList.length,
					highlightFoes = KOCFIA.conf.chat.highlightFoes && KOCFIA.chat.foesList.length;

				if( nbMsg > 0 ){
					$messages.filter(':lt('+ nbMsg +')');
				}

				$messages.removeClass('friend foe').find('.nm').each(function(){
					var $nm = $(this),
						name = $nm.text().replace(/^(Lady |Lord )/, '');
					if( highlightFriends && $.inArray(name, KOCFIA.chat.friendsList) > -1 ){
						$nm.closest('.chatwrap').addClass('friend');
					}
					if( highlightFoes && $.inArray(name, KOCFIA.chat.foesList) > -1 ){
						$nm.closest('.chatwrap').addClass('foe');
					}
				});
			}
		};

	/* OVERVIEW */
		KOCFIA.overview = {
			options: {
				active: 1,
				position: {top: 100, left: 100},
				size: {width: 500, height: 300},
				replace: 0,
				moveable: 1,
				visible: 0,
				parts_visible: {
					population: 1,
					troops: 1,
					train: 1,
					revive: 1,
					defenses: 1,
					resources: 1,
					resources_cap: 0,
					resources_production_detail: 0,
					resources_production_barbarian: 0,
					resources_consumption: 0,
					resources_production_total: 0,
					resources_autonomy: 1
				}
			},
			updating: false,
			parts: {
				population: 'population',
				troops: 'unités',
				train: 'formation',
				revive: 'hôpital',
				defenses: 'fortifications',
				resources: 'ressources',
				resources_cap: 'limite de capacité',
				resources_production_detail: 'détail production',
				resources_production_barbarian: 'production camps barbares',
				resources_consumption: 'Consommation',
				resources_production_total: 'total production',
				resources_autonomy: 'autonomie'
			},
			barbarian_resources: {}, //by cityKey and marchId, contains resources []
			stored: ['barbarian_resources']
		};

		KOCFIA.overview.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.overview +'</h3>';
				code += '<div>';
				code += Shared.generateCheckbox('overview', 'active', 'Activer', KOCFIA.conf.overview.active);
				code += Shared.generateRadio('overview', 'action', ['replace', 'moveable'], ['Remplace le dessous du jeu (ne pas oublier de mettre le chat à droite)', 'État des lieux déplacable et redimensionnable'], [KOCFIA.conf.overview.replace, KOCFIA.conf.overview.moveable]);
				code += Shared.generateButton('overview', 'resetPlacement', 'Remise à zéro de la position');
				code += Shared.generateButton('overview', 'resetDimensions', 'Remise à zéro des dimensions');
				code += '</div>';

			$section.append( code )
				.on('click', '#overview-replace, #overview-moveable', function(){
					$(this).closest('div').find('button').toggle( $(this).is('#overview-moveable') );
				})
				.find('#overview-replace').closest('div').find('button').toggle( KOCFIA.conf.overview.replace );
		};

		KOCFIA.overview.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview on function');

			var dataTable = '<table id="kocfia-overview-data"><colgroup><col class="img"><col class="label"><col class="sum">',
				headers = '<thead><tr><th class="img">&nbsp;</th><th class="label">&nbsp;</th><th class="sum">Total</th>',
				dataLine = '',
				cols = 3,
				$overview = $('<div id="kocfia-overview" class="ui-widget ui-widget-content ui-corner-all">');

			//headers
			//data line for cities
				var i, cityKey, length = KOCFIA.citiesKey.length;
				for( i = 0; i < length; i += 1 ){
					cityKey = KOCFIA.citiesKey[i];
					if( KOCFIA.cities.hasOwnProperty(cityKey) ){
						dataTable += '<col>';
						headers += '<th title="'+ KOCFIA.cities[ cityKey ].name +'">'+ window.roman[ i ] +'</th>';
						dataLine += '<td>&nbsp;</td>';
					}
				}
				headers += '</tr></thead>';
				cols += i;

			dataTable += headers + '<tbody>';

			//body lines
			var left = 0, j, part, kocfia_part, rowspan;
			for( part in KOCFIA.overview.parts ){
				if( KOCFIA.overview.parts.hasOwnProperty( part ) ){
					dataTable += '<tr class="'+ part +' toggle"><th colspan="'+ cols +'"';
					if( part == 'resources_production_barbarian' ){
						dataTable += ' title="Estimé pour chaque raid barbare revenant en ville, donc total non complet tant que tous les raids n\'ont pas été vu en train de rentrer"';
					}
					dataTable += '>';
					dataTable += '<span class="ui-icon ui-icon-triangle-1-'+ (KOCFIA.conf.overview.parts_visible[ part ] ? 'se' : 'e') +'"></span>';
					dataTable += KOCFIA.overview.parts[ part ].capitalize();
					dataTable += '</th></tr>';
					kocfia_part = KOCFIA[ part ];

					length = kocfia_part.length;
					for( i = 0; i < length; i += 1 ){
						if( !kocfia_part[i].hasOwnProperty('label') && kocfia_part[i].hasOwnProperty('key') ){
							kocfia_part[i].label = window.resourceinfo[ kocfia_part[i].key ];
						}
						rowspan = kocfia_part[i].rows;
						if( rowspan ){
							for( j = 0; j < rowspan; j += 1 ){
								dataTable += '<tr class="'+ part + (j + 1 == rowspan && i + 1 != length ? ' bb' : '') +'">';
								dataTable += (j === 0 ? '<td class="img'+ (i + 1 != length ? ' bb' : '') +'" rowspan="'+ rowspan +'"><img src="'+ kocfia_part[i].icon +'"></td>' : '');
								dataTable += '<td class="label">'+ kocfia_part[i].label[j] +'</td>';
								dataTable += '<td class="sum"></td>';
								dataTable += dataLine + '</tr>';
							}
						} else {
							dataTable += '<tr class="'+ part +'">';
							dataTable += '<td class="img"><img src="'+ kocfia_part[i].icon +'"></td>';
							dataTable += '<td class="label">'+ kocfia_part[i].label +'</td>';
							dataTable += '<td class="sum"></td>';
							dataTable += dataLine + '</tr>';
						}
					}
				}
			}
			dataTable += '</tbody></table>';

			$overview.append('<div class="wrap">' + dataTable + '</div>');

			$body.append( $overview );
			KOCFIA.overview.$div = $('#kocfia-overview');

			KOCFIA.overview.$div
				//highlight from headers
					.on('mouseenter', 'th', function(){
						var col = KOCFIA.overview.$headersThs.index( $(this).addClass('highlight') );
						KOCFIA.overview.$tbodyTrs.find('tr').each(function(){
							$(this).find('td').eq(col).addClass('highlight');
						});
					})
					.on('mouseleave', 'th', function(){
						var col = KOCFIA.overview.$headersThs.index( $(this).removeClass('highlight') );
						KOCFIA.overview.$tbodyTrs.find('tr').each(function(){
							$(this).find('td').eq(col).removeClass('highlight');
						});
					})
				//highlight from body
					.on('mouseenter', 'tbody td', function(){
						var $this = $(this),
							$td = $this.parent().addClass('highlight').find('td'),
							col = $td.length - $td.index( $this );
						KOCFIA.overview.$headersThs.eq(KOCFIA.overview.$headersThsLength - col).addClass('highlight');
					})
					.on('mouseleave', 'tbody td', function(){
						var $this = $(this),
							$td = $this.parent().removeClass('highlight').find('td'),
							col = $td.length - $td.index( $this );
						KOCFIA.overview.$headersThs.eq(KOCFIA.overview.$headersThsLength - col).removeClass('highlight');
					})
				//toggles
					.on('click', '.toggle', function(){
						var $this = $(this),
							$triangle = $this.find('.ui-icon'),
							part = $this.attr('class').split(' ')[0];
							opened = !$triangle.hasClass('ui-icon-triangle-1-se');

						if( opened ) $triangle.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-se');
						else $triangle.removeClass('ui-icon-triangle-1-se').addClass('ui-icon-triangle-1-e');

						var $trs = KOCFIA.overview.$tbodyTrs.filter( '.' + part );

						$trs.filter(':not(.toggle)').toggle( opened );

						if( !opened ){
							var $details = $trs.filter('.toggle').find('.details-toggle');
							if( $details.length ){
								$details.find('input').each(function(){
									var $input = $(this),
										detail = $input.val();

									$input.prop('checked', false);
									KOCFIA.overview.$tbodyTrs.filter( '.' + detail ).hide();
									KOCFIA.conf.overview.parts_visible[ detail ] = false;
								});
							}
						}

						KOCFIA.conf.overview.parts_visible[ part ] = opened;

						Shared.storeConf();
					});

			KOCFIA.overview.$wrap = KOCFIA.overview.$div.find('.wrap');
			KOCFIA.overview.$table = KOCFIA.overview.$div.find('#kocfia-overview-data');
			KOCFIA.overview.$header = KOCFIA.overview.$table.find('thead');
			KOCFIA.overview.$headersThs = KOCFIA.overview.$header.find('th');
			KOCFIA.overview.$tbody = KOCFIA.overview.$table.find('tbody');
			KOCFIA.overview.$tbodyTrs = KOCFIA.overview.$tbody.find('tr');
			KOCFIA.overview.$headersThsLength = KOCFIA.overview.$headersThs.length;

			var trs, $details, detail;
			for( part in KOCFIA.conf.overview.parts_visible ){
				if( KOCFIA.conf.overview.parts_visible.hasOwnProperty(part) ){
					$trs = KOCFIA.overview.$tbodyTrs.filter( '.' + part );

					if( !KOCFIA.conf.overview.parts_visible[part] ){
						$trs.filter(':not(.toggle)').hide();
					}
				}
			}

			window.setTimeout(function(){ KOCFIA.overview.updateFromSeed(); }, 1000);

			KOCFIA.overview.$div.tipsy({delegate: '[title], [original-title]', html: true});

			if( KOCFIA.conf.overview.replace ){
				KOCFIA.overview.replaceOn();
			} else {
				KOCFIA.overview.moveableOn();
			}
		};

		KOCFIA.overview.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview off function');
			KOCFIA.overview.$div.remove();
			KOCFIA.overview.$div = null;
		};

		KOCFIA.overview.updateFromSeed = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview updateFromSeed function');
			if( !KOCFIA.conf.overview.active ) return;

			if( KOCFIA.overview.updating ) return;
			KOCFIA.overview.updating = true;

			if( !KOCFIA.overview.hasOwnProperty('$tbodyTrs') ) return; //overview panel not initialized

			var $popTrs = KOCFIA.overview.$tbodyTrs.filter('.population').filter(':gt(0)'),
				$resTrs = KOCFIA.overview.$tbodyTrs.filter('.resources').filter(':gt(0)'),
				$resCapTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_cap').filter(':gt(0)'),
				$resProdDetailTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_production_detail').filter(':gt(0)'),
				$resProdBarbarianTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_production_barbarian').filter(':gt(0)'),
				$resConsoTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_consumption').filter(':gt(0)'),
				$resProdTotalTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_production_total').filter(':gt(0)'),
				$resAutonomyTrs = KOCFIA.overview.$tbodyTrs.filter('.resources_autonomy').filter(':gt(0)'),
				$troopsTrs = KOCFIA.overview.$tbodyTrs.filter('.troops').filter(':gt(0)'),
				$defensesTrs = KOCFIA.overview.$tbodyTrs.filter('.defenses').filter(':gt(0)'),
				$trainsTrs = KOCFIA.overview.$tbodyTrs.filter('.train').filter(':gt(0)'),
				$reviveTrs = KOCFIA.overview.$tbodyTrs.filter('.revive').filter(':gt(0)'),
				length = KOCFIA.citiesKey.length,
				keys = ['gold', 'food', 'wood', 'stone', 'ore'],
				guardianBase = {gold: 0, food: 0, wood: 0, stone: 0, ore: 0},
				throneSlot = window.seed.throne.slotEquip[ window.seed.throne.activeSlot ],
				i, j, k, m, b, r, n, s, e, d,
				subLength, population, hapiness, cityKey, rowsLength,
				queue, queuedUnits, duration, formation,
				barbariansRes, barbariansTroops, marches, march, populationModifier,
				time, factor, bonusG, bonusW, fort, line, type, $tds, $td, stock,
				stockInSeed, take, substract, bonusK, brLength, bonusT, item,
				base, total, nbLine, timestamp, effectGrowth, effectBase;

			for( i = 0; i < length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					//barbarian camps
						barbariansRes = [];
						barbariansTroops = [];
						marches = window.seed.queue_atkp[ cityKey ];
						if( marches ){
							for( m in marches ){
								if( marches.hasOwnProperty(m) ){
									march = marches[m];
									if( march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN ){
										if( march.botMarchStatus == window.cm.BOT_STATUS.BOT_MARCH_RETURNING ){
											//get attack duration (go, fight, return, unload, repeat)
											time = parseFloat(march.returnUnixTime) - parseFloat(march.marchUnixTime) + (parseFloat(march.restPeriod) / 60);

											//how many attacks in one hour
											factor = 3600 / time;
											//get resources in one hour
											barbarianRes = [ factor * parseFloat(march.gold), factor * parseFloat(march.resource1), factor * parseFloat(march.resource2), factor * parseFloat(march.resource3), factor * parseFloat(march.resource4) ];

											if( !KOCFIA.overview.barbarian_resources.hasOwnProperty(cityKey) ){
												KOCFIA.overview.barbarian_resources[ cityKey ] = {};
											}

											KOCFIA.overview.barbarian_resources[ cityKey ][ m ] = barbarianRes;

											//cleaning
											for( b in KOCFIA.overview.barbarian_resources[ cityKey ] ){
												if( KOCFIA.overview.barbarian_resources[ cityKey ].hasOwnProperty(b) && !marches.hasOwnProperty(b) ){
													delete KOCFIA.overview.barbarian_resources[ cityKey ][ b ];
												}
											}
											KOCFIA.overview.storeBarbarianResources();

										} else if( (march.botMarchStatus == window.cm.BOT_STATUS.BOT_MARCH_MARCHING || march.botMarchStatus == window.cm.BOT_STATUS.BOT_MARCH_RESTING)
											&& KOCFIA.overview.barbarian_resources.hasOwnProperty(m)
										){
											barbarianRes = KOCFIA.overview.barbarian_resources[ cityKey ][ m ];
										} else {
											barbarianRes = [ 0, 0, 0, 0, 0 ];
										}

										barbariansRes.push( barbarianRes );

										subLength = KOCFIA.troops.length;
										for( j = 0; j < subLength; j += 1 ){
											if( !barbariansTroops[j] ) barbariansTroops[j] = 0;
											barbariansTroops[j] += parseFloat(march['unit'+ ( j + 1 ) +'Count']);
										}
									}
								}
							}
						}

					//population
						line = 0;
						subLength = KOCFIA.population.length;
						for( j = 0; j < subLength; j += 1 ){
							type = KOCFIA.population[j];
							if( type.rows ){
								rowsLength = type.rows;
								for( k = 0; k < rowsLength; k += 1 ){
									inSeed = KOCFIA.inSeed.population[ type.name[k] ];
									$tds = $popTrs.eq(line).find('td');
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
									n = null;
									if( inSeed ){
										if( type.name[k] != 'taxRate' ){
											n = parseFloat( window.seed.citystats[ cityKey ].pop[ inSeed.index ] );
										} else {
											n = parseFloat( window.seed.citystats[ cityKey ].gold[ inSeed.index ] );
										}
									} else if( type.name[k] == 'availablePopulation' ){
										take = KOCFIA.inSeed.population[ type.name[0] ];
										substract = KOCFIA.inSeed.population[ type.name[2] ];

										n = parseFloat( window.seed.citystats[ cityKey ].pop[ take.index ] ) - parseFloat( window.seed.citystats[ cityKey ].pop[ substract.index ] );
									}

									if( n !== null ){
										$td.html( Shared.format( n ) )
											.attr('title', Shared.readable( n ))
											.data('ori', n);
									} else {
										$td.html('&nbsp;')
											.attr('title', Shared.readable( n ))
											.data('ori', 0);
									}

									line += 1;
								}

							} else {
								inSeed = KOCFIA.inSeed.population[ type.name ];
								$tds = $popTrs.eq(line).find('td');
								$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
								if( inSeed ){
									n = parseFloat( window.seed.citystats[ cityKey ].pop[ inSeed.index ] );

									$td.html( Shared.format( n ) )
										.attr('title', Shared.readable( n ))
										.data('ori', n);

								} else {
									$td.html('&nbsp;')
										.attr('title', Shared.readable( n ))
										.data('ori', 0);
								}

								line += 1;
							}
						}

					//resources
						subLength = KOCFIA.resources.length;
						for( j = 0; j < subLength; j += 1 ){
							type = KOCFIA.resources[j];
							inSeed = KOCFIA.inSeed.resources[ type.name ];
							$tds = $resTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							if( inSeed ){
								if( inSeed.hasOwnProperty('type') ){
									n = parseFloat( window.seed.resources[ cityKey ][ inSeed.type ][ inSeed.index ] );
								} else {
									n = parseFloat( window.seed.citystats[ cityKey ].gold[ inSeed.index ] );
								}

								if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable(n))
									.data('ori', n);
							} else {
								$td.html('&nbsp;')
									.attr('title', '')
									.data('ori', 0);
							}
						}

					//resources cap
						subLength = KOCFIA.resources_cap.length;
						for( j = 0; j < subLength; j += 1 ){
							type = KOCFIA.resources_cap[j];
							inSeed = KOCFIA.inSeed.resources_cap[ type.name ];
							$tds = $resCapTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							if( inSeed ){
								n = parseFloat( window.seed.resources[ cityKey ][ inSeed.type ][ inSeed.index ] );
								if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable(n))
									.data('ori', n);
							} else {
								$td.html('&nbsp;')
									.attr('title', '')
									.data('ori', 0);
							}
						}

					//resources production detail
						base = [];
						total = [0, 0, 0, 0, 0];
						line = 0;
						nbLine = KOCFIA.resources_production_detail.length / 4;
						timestamp = Date.timestamp();

						//guardian bonus
							guardianBonus = Shared.getGuardianBonus( cityKey, 'resources' );

							bonusG = $.extend({}, guardianBase, guardianBonus);

						//knight bonus
							bonusK = 0;
							if( window.seed.knights[ cityKey ] ){
								k = window.seed.knights[ cityKey ][ "knt" + window.seed.leaders[cityKey].resourcefulnessKnightId ];
								if( k ){
									bonusK = parseFloat(k.resourcefulness);
									if( k.resourcefulnessBoostExpireUnixtime > timestamp ){
										bonusK *= 1.25;
									}
								}
							}

						//wild bonus
							bonusW = [0, 0, 0, 0, 0, 0];
							if( window.seed.wilderness[ cityKey ] ){
								for( j in window.seed.wilderness[ cityKey ] ){
									if( window.seed.wilderness[ cityKey ].hasOwnProperty(j) ){
										b = parseInt(window.seed.wilderness[ cityKey ][ j ].tileType.toString()[0], 10);
										bonusW[ b ] += parseInt(window.seed.wilderness[ cityKey ][ j ].tileLevel, 10);
									}
								}
							}

						//throne items bonus
							bonusT = [0, 0, 0, 0, 0];
							for( j = 1; j < 5; j += 1 ){
								b = 0;
								for( s in throneSlot ){
									if( throneSlot.hasOwnProperty(s) ){
										item = window.kocThroneItems[ throneSlot[s] ];
										if( item && item.hasOwnProperty('effects') ){
											for( e in item.effects ){
												if( item.effects.hasOwnProperty(e) ){
													effect = item.effects[ e ];
													effectBase = parseInt(window.cm.thronestats.tiers[ effect.id ][ effect.tier ].base, 10);
													effectGrowth = parseInt(window.cm.thronestats.tiers[ effect.id ][ effect.tier ].growth, 10);
													if( effect.id == 82
														|| (effect.id == 83 && j == 1)
														|| (effect.id == 84 && j == 2)
														|| (effect.id == 85 && j == 3)
														|| (effect.id == 86 && j == 4)
													){
														b += effectBase + (parseInt(item.level, 10) * effectGrowth);
													}
												}
											}
										}
									}
								}
								bonusT[ j ] = (b / 100);
							}

						//population modifier
							populationModifier = 1;
							population = parseFloat(window.seed.citystats[ cityKey ].pop[0]);
							hapiness = parseFloat(window.seed.citystats[ cityKey ].pop[3]);
							if( hapiness > population ){
								populationModifier = population / hapiness;
							}

						subLength = KOCFIA.resources_production_detail.length;
						for( j = 0; j < subLength; j += 1 ){
							type = KOCFIA.resources_production_detail[j];
							r = j + 1; //no gold
							if( type.rows ){
								rowsLength = type.rows;
								for( k = 0; k < rowsLength; k += 1 ){
									$tds = $resProdDetailTrs.eq(line).find('td');
									$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
									n = null;
									//'base', 'gardien', 'chevalier', 'technologie', 'TS', 'Throne', 'sort'
									switch( type.label[k] ){
										case 'Base':
												n = parseFloat(window.seed.resources[ cityKey ]["rec" + r][2] * populationModifier);
												base[r] = n;
												total[r] = n;
											break;
										case 'Gardien':
												n = parseFloat( bonusG[ keys[r] ] );
												total[r] += n;
											break;
										case 'Chevalier':
												n = parseFloat(base[r] * (bonusK / 100));
												total[r] += n;
											break;
										case 'Recherche':
												n = parseFloat(base[r] * (parseFloat(window.seed.tech["tch" + r]) / 10));
												total[r] += n;
											break;
										case 'TS':
												n = parseFloat(base[r] * 0.05 * bonusW[r]);
												total[r] += n;
											break;
										case 'Boost':
												if( parseInt(window.seed.playerEffects["r" + r + "BstExp"], 10) > timestamp ){
													n = parseFloat(base[r] * 0.25);
												}
												total[r] += (n === null ? 0 : n);
											break;
										case 'Trône':
												n = parseFloat(base[r] * bonusT[r]);
												total[r] += n;
											break;
										default: break;
									}

									if( n !== null ){
										$td.html( Shared.format( n ) )
											.attr('title', Shared.readable( n ))
											.data('ori', n);
									} else {
										$td.html( '&nbsp;' )
											.attr('title', '')
											.data('ori', '0');
									}

									line += 1;
								}
							}
						}

					//resources from barbarian camps
						subLength = KOCFIA.resources_production_barbarian.length;
						for( j = 0; j < subLength; j += 1 ){
							$tds = $resProdBarbarianTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							n = 0;
							if( barbariansRes.length ){
								brLength = barbariansRes.length;
								for( k = 0; k < brLength; k += 1 ){
									n += barbariansRes[k][j];
								}
								total[j] += n;

								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable( n ))
									.data('ori', n );
							} else {
								$td.html( '&nbsp;' )
									.attr('title', '')
									.data('ori', '0');
							}
						}

					//resources consumption
						subLength = KOCFIA.resources_consumption.length;
						for( j = 0; j < subLength; j += 1 ){
							type = KOCFIA.resources_consumption[j];
							$tds = $resConsoTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							n = null;
							inSeed = KOCFIA.inSeed.resources_consumption[ type.name ];
							if( inSeed ){
								if( inSeed.hasOwnProperty('type') ){
									n = parseFloat( window.seed.resources[ cityKey ][ inSeed.type ][ inSeed.index ] );
								} else {
									n = parseFloat(window.seed.citystats[ cityKey ].gold[2]) * 10;
									for( k in window.seed.knights[ cityKey ] ){
										if( window.seed.knights[ cityKey ].hasOwnProperty(k) ){
											n += parseFloat(window.seed.knights[ cityKey ][ k ].knightLevel) * 2;
										}
									}
								}

								total[j] -= n;
							}

							if( n !== null ){
								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable( n ))
									.data('ori', n);
							} else {
								$td.html( '&nbsp;' )
									.attr('title', '')
									.data('ori', '0');
							}
						}

					//resources production total
						subLength = KOCFIA.resources_production_total.length;
						for( j = 0; j < subLength; j += 1 ){
							$tds = $resProdTotalTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );

							if( total[j] ){
								total[j] += 100;
								$td.html( Shared.format( total[j] ) )
									.attr('title', Shared.readable( total[j] ))
									.data('ori', total[j] );
							} else {
								$td.html('&nbsp;');
							}
						}

					//resources autonomy
						subLength = KOCFIA.resources_autonomy.length;
						for( j = 0; j < subLength; j += 1 ){
							stock = KOCFIA.resources[j];
							stockInSeed = KOCFIA.inSeed.resources[ stock.name ];
							$tds = $resAutonomyTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							s = 0;
							if( stockInSeed ){
								if( stockInSeed.hasOwnProperty('type') ){
									s = parseFloat( window.seed.resources[ cityKey ][ stockInSeed.type ][ stockInSeed.index ] );
									if( stock.name.indexOf('x3600') > -1 ) s /= 3600;
								} else {
									s = parseFloat( window.seed.citystats[ cityKey ].gold[ stockInSeed.index ] );
								}

								if( total[j] >= 0 ){
									$td.html('-');
								} else if( s === 0 ){
									$td.html('0s');
								} else {
									n = s / ( -1 * total[j] ) * 3600;
									s = Shared.readableDuration( n );
									b = s.split(' ');
									if( b.length > 2 ) b = b.slice(0, 2).join(' ');
									else b = s;
									$td.html( b );

									if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.autonomy && !isNaN(n) && n < 24 * 3600 ){
										KOCFIA.alarm.react('autonomy', cityKey, {res: stock.key, conso: total[j] * 3600, time: n});
									}
								}
							} else {
								$td.html('-');
							}
						}

					//troops
						subLength = KOCFIA.troops.length;
						for( j = 0; j < subLength; j += 1 ){
							type = KOCFIA.troops[j];
							$tds = $troopsTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							n = null;
							b = null;

							if( window.seed.units[ cityKey ].hasOwnProperty(type.name) ){
								n = parseFloat( window.seed.units[ cityKey ][ type.name ] );
							}

							if( barbariansTroops.length && barbariansTroops[j] ){
								b = parseFloat( barbariansTroops[j] );
							}

							if( n !== null ){
								$td.html( Shared.format( n ) + '<span class="inCamps">'+ (b !== null ? '&nbsp;('+ Shared.format(b) +')' : '') +'</span>' )
									.attr('title', Shared.readable(n) + (b !== null ? ' ('+ Shared.readable(b) +')' : '') )
									.data('ori', n)
									.data('camp', (b !== null ? b : 0));
							} else {
								$td.html('&nbsp;')
									.attr('title', '')
									.data('ori', 0)
									.data('camp', (b !== null ? b : 0));
							}
						}

					//defenses
						subLength = KOCFIA.defenses.length;
						for( j = 0; j < subLength; j += 1 ){
							fort = KOCFIA.defenses[j];
							$tds = $defensesTrs.eq( j ).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							n = null;

							if( window.seed.fortifications[ cityKey ].hasOwnProperty( fort.fort ) ){
								n = parseFloat( window.seed.fortifications[ cityKey ][ fort.fort ] );
							}

							if( n !== null ){
								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable(n))
									.data('ori', n);
							} else {
								$td.html('&nbsp;')
									.attr('title', '')
									.data('ori', 0);
							}
						}

					//revive
						queue = window.seed.queue_revive[ cityKey ];
						if( queue && Array.isArray(queue) && queue.length > 0 ){
							unit = KOCFIA.unitInfo['unt'+ queue[0][0]];
							wounded = queue[0][1];
							d =  unit.label +' - '+ Shared.readable(wounded);
							m = '';

							finish = parseInt(queue[0][3], 10);
							if( finish > timestamp ){
								n = Shared.readableDuration( finish - timestamp );
								m = n.split(' ').slice(0, 2).join(' ');
								d += ' - '+ n;
							}

							text = '<small><img src="'+ unit.icon +'" alt="'+ unit.label +'">'+ Shared.format(wounded) + (m !== 0 ? '<br>'+ m : '') +'</small>';

						} else {
							text = '&nbsp;';
							d = '';
						}

						$tds = $reviveTrs.eq(0).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );

						$td.html( text )
							.attr('title', d);

					//train
						queuedUnits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						duration = 0;
						//array of [tid, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]
						queue = window.seed.queue_unt[ cityKey ];
						if( queue.length > 0 ){
							for( j = 0; j < queue.length; j += 1 ){
								formation = queue[j];
								if( parseFloat(formation[3]) > timestamp ){
									k = parseInt(formation[0], 10) - 1;

									queuedUnits[ k ] += parseInt(formation[1], 10);
								}
								duration = parseFloat(formation[3]) - timestamp;
							}
						}

						//duration
						$tds = $trainsTrs.eq(0).find('td');
						$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
						n = Shared.readableDuration( duration );
						m = n.split(' ').slice(0, 2).join(' ');

						if( n !== null ){
							$td.html( m )
								.attr('title', n)
								.data('ori', duration);
						} else {
							$td.html('&nbsp;')
								.attr('title', '')
								.data('ori', 0);
						}

						//troops
						subLength = KOCFIA.train.length;
						for( j = 1; j < subLength; j += 1 ){
							type = KOCFIA.train[j];
							$tds = $trainsTrs.eq(j).find('td');
							$td = $tds.eq( $tds.index( $tds.filter('.sum') ) + 1 + i );
							n = queuedUnits[j - 1];

							if( n !== null ){
								$td.html( Shared.format( n ) )
									.attr('title', Shared.readable(n) )
									.data('ori', n);
							} else {
								$td.html('&nbsp;')
									.attr('title', '')
									.data('ori', 0);
							}
						}
				}
			}

			KOCFIA.overview.sums();
			KOCFIA.overview.updating = false;
		};

		KOCFIA.overview.sums = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview sums function');
			var trainRowIndex = 0;
			KOCFIA.overview.$tbodyTrs.each(function(){
				var $tr = $(this);

				if( !$tr.hasClass('resources_autonomy') && !$tr.hasClass('revive') ){
					if( $tr.hasClass('train') && trainRowIndex === 0 ){
						trainRowIndex++;
						return true; //skip this row
					}
					var sum = 0,
						inCamp = 0,
						$tds = $tr.find('td');
					if( $tds.length ){
						var $sumTd = $tds.filter('.sum'),
							col = $tds.index( $sumTd );
						$tds.filter(':gt('+ col +')').each(function(){
							var $td = $(this);
							if( $td.data('ori') ) sum += parseFloat( $td.data('ori') );
							if( $td.data('camp') ) inCamp += parseFloat( $td.data('camp') );
						});

						if( isNaN(sum) ){
							$sumTd.html( '-' )
								.attr('title', '');
						} else {
							$sumTd.html( Shared.format( sum + inCamp ) )
								.attr('title', Shared.readable(sum + inCamp) );
						}
					}
				}
			});
		};

		KOCFIA.overview.calcInnerSizes = function( size ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('kocfia overview calcInnerSizes function');

			var tableH = size.height - (KOCFIA.conf.overview.moveable ? KOCFIA.overview.$div.find('h3').outerHeight(true) + 10 : 4); /* wrap bottom margin */
			KOCFIA.overview.$wrap.css('height', tableH);
		};

		KOCFIA.overview.storeBarbarianResources = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview storeBarbarianResources function');
			localStorage.setObject('kocfia_overview_barbarian_resources_' + KOCFIA.storeUniqueId, KOCFIA.overview.barbarian_resources);
		};

		/* moveable */
			KOCFIA.overview.moveableOn = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview moveableOn function');
				KOCFIA.overview.replaceOff();

				KOCFIA.overview.$div
					.prepend('<h3>État des lieux</h3>')
					.prepend('<span class="ui-icon ui-icon-close"></span>')
					.append( moveHandles )
					.draggable({
						handle: 'h3, .move-handle',
						scroll: true,
						distance: 20,
						stop: function(event, ui){
							KOCFIA.conf.overview.position = ui.position;
							Shared.storeConf();
						}
					})
					.resizable({
						minWidth: 250,
						minHeight: 250,
						handles: 'n, e, s, w, ne, se, sw, nw',
						resize: function(event, ui){
							KOCFIA.overview.calcInnerSizes( ui.size );
						},
						stop: function(event, ui){
							KOCFIA.conf.overview.size = ui.size;
							KOCFIA.conf.overview.position = ui.position;
							Shared.storeConf();
						}
					})
					.css({
						top: KOCFIA.conf.overview.position.top,
						left: KOCFIA.conf.overview.position.left,
						width: KOCFIA.conf.overview.size.width,
						height: KOCFIA.conf.overview.size.height
					})
					.on('click', '.ui-icon-close', function(e){
						e.preventDefault();
						KOCFIA.overview.$div.hide();
						KOCFIA.conf.overview.visible = 0;
						Shared.storeConf();
					});

				if( KOCFIA.conf.overview.visible ){
					KOCFIA.overview.$div.show();

					KOCFIA.overview.calcInnerSizes( KOCFIA.conf.overview.size );
				} else {
					KOCFIA.overview.$div.hide();
				}

				var $overviewToggle = $('<button id="kocfia-overview-toggle" class="button secondary">').html('<span>État des lieux</span>');
				$overviewToggle.click(function(){
					KOCFIA.overview.$div.toggle();

					if( KOCFIA.overview.$div.is(':visible') ){
						KOCFIA.overview.calcInnerSizes( KOCFIA.conf.overview.size );
					}

					KOCFIA.conf.overview.visible = (KOCFIA.overview.$div.is(':visible') ? 1 : 0);
					Shared.storeConf();
				});

				KOCFIA.$buttons.append($overviewToggle);
			};

			KOCFIA.overview.moveableOff = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview moveableOff function');
				KOCFIA.overview.$div
					.draggable('destroy')
					.resizable('destroy')
					.find('h3, .ui-icon-close, .move-handle').remove();
			};

			KOCFIA.overview.resetPlacement = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview resetPlacement function');
				if( KOCFIA.conf.overview.moveable ){
					KOCFIA.overview.$div.css( KOCFIA.overview.options.position );
					KOCFIA.conf.overview.position = KOCFIA.overview.options.position;
					Shared.storeConf();
				}
			};

			KOCFIA.overview.resetDimensions = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview resetDimensions function');
				if( KOCFIA.conf.overview.moveable ){
					KOCFIA.overview.$div.css( KOCFIA.overview.options.size );
					KOCFIA.conf.overview.size = KOCFIA.overview.options.size;
					Shared.storeConf();
				}
			};

		/* replace */
			KOCFIA.overview.replaceOn = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview replaceOn function');
				KOCFIA.overview.moveableOff();

				var $bottom = $('#kocmain_bottom'),
					$friendPanel = $bottom.siblings('.panel_friendlist');
				var p = $bottom.offset();
				var h = $bottom.outerHeight() + $friendPanel.outerHeight(),
					w = $bottom.outerWidth();

				//koc not fully loaded graphicaly
				if( p.top < 10 ){
					window.setTimeout(function(){
						KOCFIA.overview.replaceOn();
					}, 250);
					return;
				}

				KOCFIA.overview.$div.css({
					height: $bottom.outerHeight() + $friendPanel.outerHeight(),
					width: $bottom.outerWidth() - 2, /* borders */
					top: p.top + 2, /* borders */
					left: p.left
				});

				$friendPanel.hide();
				KOCFIA.overview.$div.show();
				$bottom.find('.mod_comm').css('display', 'block');

				KOCFIA.overview.calcInnerSizes({height: h, width: w});

				$('#kocfia-overview-toggle').remove();
			};

			KOCFIA.overview.replaceOff = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('overview') ) console.info('KOCFIA overview replaceOff function');

				$('#kocmain_bottom').show().siblings('.panel_fiendlist').show();
			};

	/* AutoAttack shared base */
		KOCFIA.autoAttack = {
			module: 'autoAttack',
			options: {
				active: 1,
				automatic: 0
			},
			stored: ['attacks'],
			attacks: {} //by city id and attack id
		};

		KOCFIA.autoAttack.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel[ this.module ] +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox(this.module, 'active', 'Activer', KOCFIA.conf[ this.module ].active);
			code += Shared.generateCheckbox(this.module, 'automatic', 'Lancer les '+ (this.module == 'scout' ? 'éclairages' : 'attaques') +' automatiques', KOCFIA.conf[ this.module ].automatic);
			code += Shared.generateButton(this.module, 'deleteAllPlans', 'Supprimer toutes les '+ (this.module == 'scout' ? 'éclairages' : 'attaques') +' enregistrées');
			if( this.module == 'darkForest' ){
				code += Shared.generateButton(this.module, 'deleteAllCoords', 'Supprimer toutes les coordonnées enregistrées');
			}
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.autoAttack.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' on function');

			if( this.module != 'scout' ){
				var i, length = KOCFIA.citiesKey.length;
				for( i = 0; i < length; i += 1 ){
					KOCFIA[ this.module ].listCityAttacks( KOCFIA.citiesKey[i] );
				}
			} else KOCFIA[ this.module ].listAttacks();

			if( KOCFIA.conf[ this.module ].automatic ){
				KOCFIA[ this.module ].automaticOn();
			} else if( this.module == 'darkForest' ){
				KOCFIA.darkForest.$nextBar.hide();
			}
		};

		KOCFIA.autoAttack.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' off function');

			KOCFIA[ this.module ].automaticOff();
		};

		KOCFIA.autoAttack.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' automaticOn function');
			var module = this.module;

			$('#'+ module +'-panel-automatic').prop('checked', true);

			KOCFIA[ module ].$saved.find('.charge').hide(); //hide manual launch button

			if( module == 'darkForest' ) KOCFIA[ module ].$form.find('.launch').hide();

			KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', (this.module == 'darkForest' ? 1 : 2));

			//using closure to have a "copy" of the attack plan
			var i = 1, c, a, ts;
			var delayedLaunch = function(attack, i){
				var delay = window.setTimeout(function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('launching automatic attack', attack.id, attack.cityKey, attack);
					KOCFIA[ module ].launchAttack( attack );
				}, i * 20 * 1000);
			};

			if( module == 'wilderness' || module == 'barbarian' ){
				//launching stored attacks
				for( c in KOCFIA[ module ].attacks ){
					if( KOCFIA[ module ].attacks.hasOwnProperty(c) ){
						for( a in KOCFIA[ module ].attacks[c] ){
							if( KOCFIA[ module ].attacks[c].hasOwnProperty(a) ){
								delayedLaunch(KOCFIA[ module ].attacks[c][a], i);
								i += 1;
							}
						}
					}
				}
			} else if( module == 'plunder' ){
				//launching stored attacks
				for( c in KOCFIA[ module ].attacks ){
					if( KOCFIA[ module ].attacks.hasOwnProperty(c) ){
						for( a in KOCFIA[ module ].attacks[c] ){
							if( KOCFIA[ module ].attacks[c].hasOwnProperty(a) ){

								if( KOCFIA[ module ].timestamps.hasOwnProperty(a) ){
									ts = KOCFIA[ module ].timestamps[ a ];
									//wait one hour between attacks
									if( ts + 1 * 60 * 60 > Date.timestamp() ){
										KOCFIA[ module ].timestamps[ a ] = Date.timestamp();
										delayedLaunch(KOCFIA[ module ].attacks[c][a], i);
									}
								} else {
									delayedLaunch(KOCFIA[ module ].attacks[c][a], i);
								}
								i += 1;
							}
						}
					}
				}
			} else if( module == 'scout' ){
				//launching stored attacks
				for( a in KOCFIA[ module ].attacks ){
					if( KOCFIA[ module ].attacks.hasOwnProperty(a) ){
						delayedLaunch(KOCFIA[ module ].attacks[a], i);
						i += 1;
					}
				}
			} else if( module == 'darkForest' ){
				KOCFIA[ module ].$nextBar.show();
				Shared.nextIteration( KOCFIA[ module ].$nextBar, i * 20 );

				delayedLaunch(KOCFIA[ module ].attacks, i);
			}
		};

		KOCFIA.autoAttack.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' automaticOff function');
			var module = this.module;

			$('#'+ module +'-panel-automatic').prop('checked', false);

			if( module == 'darkForest' ){
				KOCFIA[ module ].$form.find('.launch').show();
				KOCFIA[ module ].$nextBar.hide();
			}

			//show all manual launch buttons
			KOCFIA[ module ].$saved.find('.charge').show();

			//hide the on going attacks one
			KOCFIA[ module ].$ongoing.find('tr').each(function(){
				var $tr = $(this);
				KOCFIA[ module ].$saved.find('tr').filter('[data-city="'+ $tr.data('city') +'"][data-attack="'+ $tr.data('attack') +'"]').find('.charge').hide();
			});
		};

		KOCFIA.autoAttack.storeAttacks = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' storeAttacks function');
			localStorage.setObject('kocfia_'+ this.module +'_attacks_' + KOCFIA.storeUniqueId, KOCFIA[ this.module ].attacks);
		};

		KOCFIA.autoAttack.deletePlan = function( attackId, cityKey, save ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deletePlan function', attackId, cityKey, save);
			delete KOCFIA[ this.module ].attacks[ cityKey ][ attackId ];

			if( save ) KOCFIA[ this.module ].storeAttacks();
		};

		KOCFIA.autoAttack.deleteAllPlans = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deleteAllPlans function');
			localStorage.removeItem('kocfia_'+ this.module +'_attacks_' + KOCFIA.storeUniqueId);
			KOCFIA[ this.module ].attacks = {};

			KOCFIA[ this.module ].$saved.find('tbody').html('');
		};

		KOCFIA.autoAttack.getForm = function(){
			var form = '<h3>Configurer une attaque</h3>';
			form += '<div class="attack-form">';

			//form edit inputs
			form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';
			form += '<input type="hidden" class="edit-cityKey" name="cityKey" value="" autocomplete="off" />';

			//buttons
			form += '<div class="buttons">';
			form += '<button class="reset button danger"><span>Annuler</span></button>';
			form += '<button class="launch button"><span>Lancer</span></button>';
			form += '<button class="save button modify"><span>Sauvegarder</span></button>';
			form += '<button class="saveAndLaunch button modify"><span>Sauvegarder et Lancer</span></button>';
			form += '</div>';

			//city choice
			var i, length = KOCFIA.citiesKey.length, cityKey, city;
			form += '<fieldset class="buttonset">';
			form += '<legend>Ville</legend><div>';
			for( i = 0; i < length; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];

					form += '<input id="kocfia-'+ this.module +'-'+ cityKey +'" name="'+ this.module +'-city" value="'+ cityKey +'" type="radio" class="city-choice" autocomplete="off" required>';
					form += '<label for="kocfia-'+ this.module +'-'+ cityKey +'">'+ city.label +'</label>';
				}
			}
			form += '</div></fieldset>';

			form += '<fieldset class="coords fl">';
			form += '<legend>Coordonnées</legend>';
			form += '<small>Format: x,y<br>Soit en ligne séparées par un espace,<br>soit en colonne séparées par un retour à la ligne</small>';
			form += '<textarea name="coords" autocomplete="off" required placeholder="x,y"></textarea>';
			form += '</fieldset>';

			//pre configured attack builds
			form += KOCFIA[ this.module ].getBuildsList();

			form += '<div style="clear: both;"></div>';
			form += '<fieldset class="detail">';
			form += '<legend>Détail</legend>';
			if( this.module != 'plunder' ){
				form += '<label>Niveau&nbsp;:&nbsp;</label>';
				form += '<input type="number" class="targetLevel" required min="1" max="10" />';
			} else {
				form += '<label>Nom du joueur ciblé&nbsp;:&nbsp;</label>';
				form += '<input type="text" class="targetName" required />';
			}
			form += '<div><label>Laisser&nbsp;:&nbsp;</label>';
			form += '<input type="number" class="rallypointSlot" required min="0" max="11" value="0" /> place(s) dans le point de ralliement</div>';
			form += '</fieldset>';

			//wave skeleton
			var skel = '<fieldset class="wave">';
			skel += '<legend><button class="add-wave button secondary"><span>Vague supplémentaire</span></button><button class="remove-wave button danger"><span>Supprimer</span></button>&nbsp;Vague</legend>';
			skel += '<label>Chevalier&nbsp;:&nbsp;</label>';
			skel += '<select class="knight-choice" name="knight" autocomplete="off">';
			skel += '<option value="">N\'importe lequel</option>';
			skel += '</select>';
			skel += '<div class="unit-block">';
			skel += '<label>Unité&nbsp;:&nbsp;</label><select class="unit-choice" autocomplete="off" required>';
			skel += '<option value="">Choisir</option>';
			skel += '</select>';
			skel += '<label>Quantité&nbsp;:&nbsp;</label><input class="unit-qty" type="text" autocomplete="off" required pattern="'+ Shared.numberRegExp +'" placeholder="1.2k" />';
			skel += '</div>';
			skel += '<button class="add-unit button secondary"><span>Unité supplémentaire</span></button>';
			skel += '</fieldset>';
			KOCFIA[ this.module ].$waveSkeleton = $(skel);

			//clone last wave x times at most
			form += '<fieldset class="option">';
			form += '<legend>Option</legend>';
			form += '<p>Pour les objets de trône (CB / TS / Pillage) et les armoiries (TS).</p>';
			form += 'Duppliquer la dernière vague au maximum <input type="number" class="clone" min="0" max ="10"> fois';
			form += '</fieldset>';

			//unit keep
			form += '<fieldset class="keep">';
			form += '<legend>Conserver</legend>';
			form += '<div class="unit-block">';
			form += '<label>Unité&nbsp;:&nbsp;</label><select class="unit-choice">';
			form += '<option value="">Choisir</option>';
			form += '</select>';
			form += '<label>Quantité&nbsp;:&nbsp;</label><input class="unit-qty" type="text" autocomplete="off" pattern="'+ Shared.numberRegExp +'" placeholder="1.2k" />';
			form += '</div>';
			form += '<button class="add-unit button secondary"><span>Unité supplémentaire</span></button>';
			form += '</fieldset>';

			//buttons
			form += '<div class="buttons">';
			form += '<button class="reset button danger"><span>Annuler</span></button>';
			form += '<button class="launch button"><span>Lancer</span></button>';
			form += '<button class="save button modify"><span>Sauvegarder</span></button>';
			form += '<button class="saveAndLaunch button modify"><span>Sauvegarder et Lancer</span></button>';
			form += '</div>';

			form += '</div>';

			return form;
		};

		KOCFIA.autoAttack.planAttack = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' planAttack function');
			var $waves = KOCFIA[ this.module ].$form.find('.wave'),
				$keep = KOCFIA[ this.module ].$form.find('.keep'),
				$cityChoice = KOCFIA[ this.module ].$form.find('.city-choice').filter(':checked'),
				level = $.trim( KOCFIA[ this.module ].$form.find('.targetLevel').val() ),
				name = $.trim( KOCFIA[ this.module ].$form.find('.targetName').val() ),
				coords = $.trim( KOCFIA[ this.module ].$form.find('textarea').val().replace(/\n/g, ' ') ),
				$clone = KOCFIA[ this.module ].$form.find('.clone'),
				errors = [],
				regexp = /[^0-9, ]/,
				attack = { type: 'attack', category: this.module, waves: [], coordIndex: 0, keep: {} },
				label, coord;

			if( this.module == 'wilderness' ) label = 'terres sauvages';
			else if( this.module == 'barbarian' ) label = 'camps barbares';
			else if( this.module == 'plunder' ) label = 'pillages';

			//check form
				//city
				if( !$cityChoice.length ){
					errors.push('Ville de départ obligatoire.');
				} else {
					attack.cityKey = $cityChoice.val();
				}

				if( this.module == 'plunder' ){
					//targetName
					if( name === '' ){
						errors.push('Le nom du joueur ciblé est requis.');
					} else {
						attack.targetName = name;
					}
				} else {
					//targetLevel
					if( level === '' ){
						errors.push('Le niveau des '+ label +' ciblées est requis.');
					} else if( level == Number.NaN ){
						errors.push('Le niveau des '+ label +' ciblées est éronné, il doit être un chiffre.');
					} else if( level < 1 || level > 10 ){
						errors.push('Le niveau des '+ label +' ciblées est éronné, il doit être compris entre 1 et 10.');
					} else {
						attack.targetLevel = level;
					}
				}

				//coords
				if( coords.length === 0 ){
					errors.push('Au moins une coordonnée est requise.');
				} else if( regexp.test( coords ) ){
					errors.push('Pour les coordonnées, veuillez respecter le format x,y avec un saut de ligne ou un espace entre deux coordonnées.');
				} else {
					coords = coords.split(' ');
					var wrongGPS = false, i, length = coords.length;
					for( i = 0; i < length; i += 1 ){
						wrongGPS = Shared.checkCoord( coords[i] ) === false;
						if( wrongGPS ) break;
					}
					if( wrongGPS ){
						errors.push('Au moins une des coordonnées est erronée.');
					} else {
						attack.coords = coords;
					}
				}

				//waves
				var wave;
				$waves.each(function(){
					var $wave = $(this);
					wave = {};

					//knight
						wave.knight = $wave.find('.knight-choice').val();

					//troops
						$wave.find('.unit-block').each(function(){
							var $b = $(this),
								valid = true,
								u = $b.find('.unit-choice').val(),
								q = Shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

							if( u.length === 0 ){
								valid = false;
							}

							if( q === false || q < 1 ){
								valid = false;
							}

							if( valid ){
								wave[ u ] = q;
							}
						});

					if( !$.isEmptyObject(wave) ){
						attack.waves.push(wave);
					}
				});

				if( !attack.waves.length ){
					errors.push('Au moins une unité de l\'attaque doit être spécifiée.');
					errors.push('Au moins une unité de l\'attaque doit avoir une quantité valide.');
				}

				//clone last wave at most
				if( $clone.length > 0 ){
					attack.cloneLastWaveAtMost = parseInt($.trim( $clone.val() ), 10);
					if( isNaN(attack.cloneLastWaveAtMost) ){
						attack.cloneLastWaveAtMost = 0;
					}
				}

				//keep
				$keep.find('.unit-block').each(function(){
					var $b = $(this),
						u = $.trim( $b.find('.unit-choice').val() ),
						q = Shared.decodeFormat( $.trim( $b.find('.unit-qty').val() ) );

					if( u.length === 0 && q !== false && q > 0 ){
						errors.push('L\'unité à conserver doit être spécifiée.');
					} else if( u.length > 0 && (q === false || q < 1) ){
						errors.push('L\'unité à conserver doit avoir une quantité.');
					} else if( u.length > 0 ){
						attack.keep[ u ] = q;
					}
				});

				//rally point free slot
				var rps = $.trim(KOCFIA[ this.module ].$form.find('.rallypointSlot').val());
				if( rps === '' ) rps = 0;

				rps = parseInt( rps, 10 );
				if( isNaN(rps) || rps < 0 ){
					errors.push('Le nombre de places à conserver dans le point de ralliement doit être un chiffre positif.');
				} else attack.rpSlot = rps;

				if( errors.length ){
					errors = errors.unique();
				}

			return {attack: attack, errors: errors};
		};

		KOCFIA.autoAttack.addWaves = function( num, cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' addWaves function', num, cityKey);
			//fill the keep <select> options too

			var $clone = KOCFIA[ this.module ].$waveSkeleton.clone(), choices = '', i;
			$clone.insertBefore( KOCFIA[ this.module ].$form.find('.option') );
			for( i = 1; i < num; i += 1 ){
				$clone.clone().insertBefore( KOCFIA[ this.module ].$form.find('.option') );
			}

			if( this.module == 'wilderness' || this.module == 'barbarian' || this.module == 'plunder' ){
				var knights = Shared.getAvailableKnights( cityKey ),
					length = knights.length;
				for( i = 0; i < length; i += 1 ){
					var knight = knights[i];
					choices += '<option value="'+ knight.knightId +'">'+ knight.knightName +'('+ Shared.getKnightStatText( knight ) +')</option>';
				}

				KOCFIA[ this.module ].$form.find('.knight-choice').each(function(){
					$(this).append( choices );
				});
			}

			choices = '';
			for( var u in KOCFIA.unitInfo ){
				if( KOCFIA.unitInfo.hasOwnProperty(u) ){
					choices += '<option value="'+ u +'">'+ KOCFIA.unitInfo[u].label + '</option>';
				}
			}

			KOCFIA[ this.module ].$form.find('.unit-choice').each(function(){
				$(this).append( choices );
			});
		};

		KOCFIA.autoAttack.attackInfo = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' attackInfo function', attack);
			var city = KOCFIA.cities[ attack.cityKey ];

			var code = '<tr data-city="'+ attack.cityKey +'" data-attack="'+ attack.id +'">';
			code += '<td class="trip">'+ city.label;
			if( this.module != 'plunder' ){
				code += '<br>Vers : '+ (this.module == 'wilderness' ? 'TS' : 'CB') + attack.targetLevel;
			} else {
				code += '<br>Cible : '+ attack.targetName;
			}
			code += '<br>'+ attack.coords.length +' coordonnée(s)';
			code += '<br>Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '');
			code += '<div><button class="charge button"><span>Lancer</span></button>';
			code += '<button class="delete button danger"><span>Supprimer</span></button></div>';
			code += '<div><button class="edit button secondary"><span>Modifier</span></button>';
			if( this.module != 'plunder' ){
				code += '<button class="duplicate button secondary" title="Créer une nouvelle configuration à partir de celle-ci"><span>Copier</span></button>';
			}
			code += '</div></td>';

			code += '<td class="coords"><small>' + Shared.mapLink( attack.coords ) +'</small></td>';
			code += '<td class="waves">';

			var knights = window.seed.knights[ attack.cityKey ],
				j, k, wavesLength = attack.waves.length, unitsCode, wave, unit;
			for( j = 0; j < wavesLength; j += 1 ){
				wave = attack.waves[j];
				code += '<div class="wave">Vague '+ (j + 1) + '&nbsp;:&nbsp;';
				code += '<div class="knight">chevalier&nbsp;:&nbsp;';
				code += ( wave.knight ? knights[ wave.knight ].knightName + '(niveau '+ knights[ attack.knight ].skillPointsApplied +', '+ Shared.getKnightStatText( knight ) +')' : 'n\'importe' );
				code += '</div>';
				code += '<div class="troops">unités&nbsp;:&nbsp;';

				unitsCode = '';
				for( unit in wave ){
					if( wave.hasOwnProperty(unit) && unit.indexOf('knight') == -1 ){
						if( unitsCode.length ) unitsCode += ', ';

						unitsCode += '<span title="'+ KOCFIA.unitInfo[ unit ].label +' - '+ Shared.readable( wave[ unit ] ) +'">'+ Shared.format( wave[ unit ] );
						unitsCode += '<img src="'+ KOCFIA.unitInfo[ unit ].icon +'"></span>';
					}
				}
				code += unitsCode + '</div></div>';
			}
			code += '</td><td class="keep"><div class="troops">';

			unitsCode = '';
			keepLength = attack.keep.length;
			for( j = 0; j < keepLength; j += 1 ){
				unit = attack.keep[j];
				if( unitsCode.length ) unitsCode += '<br />';

				unitsCode += Shared.format( unit.qty );
				unitsCode += '<img src="'+ window.stimgUrl +'img/units/unit_';
				unitsCode += unit.id.replace(/unt/, '') + '_50_s34.jpg" title="'+ KOCFIA.unitInfo[ unit.id ].label +'">';
			}
			code += unitsCode + '</div></td></tr>';

			return code;
		};

		KOCFIA.autoAttack.listCityAttacks = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' listCityAttacks function', cityKey);
			var $tbody = KOCFIA[ this.module ].$saved.find('tbody').filter('[data-city="'+ cityKey +'"]');
			if( $tbody.length ) $tbody[0].innerHTML = '';

			var attacks = KOCFIA[ this.module ].attacks[ cityKey ],
				code = '';
			if( attacks ){
				for( var a in attacks ){
					if( attacks.hasOwnProperty(a) ){
						code += KOCFIA[ this.module ].attackInfo( attacks[a] );
					}
				}
			}

			$tbody.append( code );
		};

		KOCFIA.autoAttack.refreshOngoingInfo = function(attack, stopped, msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' refreshOngoingInfo function');

			var $tr = KOCFIA[ this.module ].$ongoing.find('tr').filter('[data-city="'+ attack.cityKey +'"][data-attack="'+ attack.id +'"]'),
				$trash = $tr.find('.trash');
			if( $tr.length === 0 || $trash.length ){
				if( $trash.length ) $tr.remove();

				var city = KOCFIA.cities[ attack.cityKey ],
					code = '<tr data-city="'+ attack.cityKey +'" data-attack="'+ attack.id +'" data-stop="0">';
				code += '<td class="trip">'+ city.label;
				if( this.module == 'plunder' ){
					code += '<br>Vers : '+ (this.module == 'wilderness' ? 'TS' : 'CB') + attack.targetLevel;
				} else {
					code += '<br>Cible : '+ attack.targetLevel;
				}
				code += '<br>Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '');
				code += '<div><button class="button stop danger"><span>Arrêter</span></button></div></td>';
				code += '<td class="coords"><small>' + Shared.mapLink( attack.coords ) +'</small></td>';
				code += '<td class="current"></td>';
				code += '<td class="info"></td></tr>';

				$tr = $( code );

				KOCFIA[ this.module ].$ongoing.find('tbody').filter('[data-city="'+ attack.cityKey +'"]').append( $tr );
			}

			//attack stopped
			if( !stopped ){
				if( attack.coordIndex < attack.coords.length ){
					$tr.find('.current').html( Shared.mapLink( attack.coords[ attack.coordIndex ] ) + '<br />' + (attack.coordIndex + 1) + 'e / ' + attack.coords.length );
				}
			} else {
				if( !KOCFIA.conf[ this.module ].automatic ) KOCFIA[ this.module ].$saved.find('tr').filter('[data-attack="'+ attack.id +'"]').find('.charge').show();

				$tr.find('.stop').toggleClass('stop trash secondary danger')
					.find('span').html('Enlever').attr('title', 'Supprime le suivi de cette configuration');
			}

			//clean old messages
			var timestamp = Date.timestamp(),
				obsolete = 5 * 60 * 1000,
				msgTimestamp;

			$msg = $tr.find('.info').find('div');
			if( $msg.length > 9 ){
				//keep one for td width
				KOCFIA[ this.module ].$history.append( $msg.filter(':lt(9)') );
			}
			$msg.each(function(){
				var $div = $(this);
				msgTimestamp = $div.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					KOCFIA[ this.module ].$history.append( $div );
				}
			});

			if( !$.isEmptyObject(msg) ){
				$tr.find('.info').append( '<div data-timestamp="'+ timestamp +'">'+ msg +'</div>' );
			}
		};

		KOCFIA.autoAttack.launchAttack = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' launchAttack function', attack);
			attack.coordIndex = 0;
			attack.marching = [];
			KOCFIA.checkAndLaunchAttack( attack );
		};

		KOCFIA.autoAttack.getHeader = function(){
			var header = '<div class="infos">';
			header += '<span class="buttonset"><input type="checkbox" id="'+ this.module +'-panel-automatic" '+ (KOCFIA.conf[ this.module ].automatic ? 'checked' : '') +' autocomplete="off" />';
			header += '<label for="'+ this.module +'-panel-automatic">attaques automatiques</label></span>';
			header += '<button class="button secondary history-toggle" title="Historique des '+ KOCFIA.modulesLabel[ this.module ] +'"><span>Historique</span></button>';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div>';

			return header;
		};

		KOCFIA.autoAttack.getListsTemplate = function(){
			//ongoing
				var onGoing = '<h3>Attaques en cours</h3>';
				onGoing += '<div class="attack-list ongoing">';
				onGoing += '<table><thead><tr>';
				onGoing += '<th class="trip">Itinéraire</th>';
				onGoing += '<th class="coords">Coordonnées</th>';
				onGoing += '<th class="current">Cible</th>';
				onGoing += '<th class="info">Info</th>';
				onGoing += '</tr></thead>';

			//attacks plan
				var savedPlans = '<h3>Attaques enregistrées</h3>';
				savedPlans += '<div class="attack-list saved">';
				savedPlans += '<table><thead><tr>';
				savedPlans += '<th class="trip">Itinéraire</th>';
				savedPlans += '<th class="coords">Coordonnées</th>';
				savedPlans += '<th class="waves">Vagues</th>';
				savedPlans += '<th class="keep">Conserver</th>';
				savedPlans += '</tr></thead>';

			//attacks ongoing and plan tbodies
				var cityKey, city, line;
				for( i = 0; i < length; i += 1 ){
					cityKey = KOCFIA.citiesKey[i];
					if( KOCFIA.cities.hasOwnProperty(cityKey) ){
						city = KOCFIA.cities[cityKey];
						line = '<tbody data-city="'+ cityKey +'"></tbody>';

						onGoing += line;
						savedPlans += line;
					}
				}
				onGoing += '</table></div>';
				savedPlans += '</table></div>';

			return savedPlans + onGoing;
		};

		KOCFIA.autoAttack.addSectionListeners = function(){
			var module = this.module;

			KOCFIA.$confPanel.find('#kocfia-'+ this.module)
				.on('change', '#'+ module +'-panel-automatic', function(){
					var checked = $(this).prop('checked');
					$('#'+ module +'-automatic').prop('checked', checked).change();
					if( checked ) KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
				})
				//load knights and units on city change )
				.on('change', '.city-choice', function(){
					KOCFIA[ module ].$form.find('.coords, .builds').show();
				})
				//add unit button
				.on('click', '.add-unit', function(){
					var $this = $(this),
						$b = $this.siblings('.unit-block').eq(0).clone();

					$b.find('input, select').val('');
					$b.append('<button class="remove button secondary">Supprimer</button>')
					  .insertBefore( $this );
				})
				//remove unit button
				.on('click', '.remove', function(){
					$(this).parent().remove();
					$('.tipsy').remove();
				})
				//add wave button
				.on('click', '.add-wave', function(){
					KOCFIA[ module ].$form.find('.wave').eq(0).clone()
						.find('.unit-block').filter(':gt(0)').remove().end()
						.find('input, select').val('').end()
						.insertBefore( KOCFIA[ module ].$form.find('.option') );
				})
				//remove wave button
				.on('click', '.remove-wave', function(){
					$(this).closest('.wave').remove();
				})
				//reset form
				.on('click', '.reset', function(){
					KOCFIA[ module ].$form.find('.coords, .detail, .keep, .option, .save, .launch, .saveAndLaunch, .builds').hide();
					KOCFIA[ module ].$form.find('.wave').remove();

					var $keep = KOCFIA[ module ].$form.find('.keep');
					$keep.find('.unit-block').filter(':gt(0)').remove();
					$keep.find('.unit-choice').find('option').filter(':gt(0)').remove();

					var $inputs = KOCFIA[ module ].$form.find('input');
					$inputs.filter('[type="text"], [type="number"], [type="hidden"]').val('');
					$inputs.filter('[type="radio"], [type="checkbox"]').prop('checked', false);

					KOCFIA[ module ].$form.find('select, textarea').val('');
				})
				//launch
				.on('click', '.launch', function(){
					var result = KOCFIA[ module ].planAttack();
					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						result.attack.id = Math.floor( Date.timestamp() );
						KOCFIA[ module ].launchAttack( result.attack );

						//open ongoing accordion
						KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
					}
				})
				//save
				.on('click', '.save, .saveAndLaunch', function(){
					var result = KOCFIA[ module ].planAttack();
					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						if( !KOCFIA[ module ].attacks[ result.attack.cityKey ] ){
							KOCFIA[ module ].attacks[ result.attack.cityKey ] = {};
						}

						var editAttackId = KOCFIA[ module ].$form.find('.edit-attackId').val(),
							editCityKey = KOCFIA[ module ].$form.find('.edit-cityKey').val();
						if( editAttackId !== '' && editCityKey !== '' ){
							KOCFIA[ module ].deletePlan( editAttackId, editCityKey, false );
							KOCFIA[ module ].$saved.find('tbody').filter('[data-city="'+ editCityKey +'"]')
								.find('tr').filter('[data-attack="'+ editAttackId +'"]')
								.remove();
						}

						result.attack.id = Math.floor( Date.timestamp() );

						KOCFIA[ module ].attacks[ result.attack.cityKey ][ result.attack.id ] = result.attack;

						KOCFIA[ module ].$saved.find('tbody').filter('[data-city="'+ result.attack.cityKey +'"]')
							.append( KOCFIA[ module ].attackInfo( result.attack ) );

						KOCFIA[ module ].storeAttacks();

						KOCFIA[ module ].$form.find('.reset').trigger('click');

						if( $(this).hasClass('saveAndLaunch') ){
							KOCFIA[ module ].launchAttack( result.attack );

							//open ongoing accordion
							KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
						} else {
							//open saved accordion
							KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 1);
						}
					}
				})
				//attack plan delete
				.on('click', '.delete', function(){
					if( confirm('Etes-vous sûr ?') ){
						var $this = $(this),
							$tr = $this.closest('tr');

						KOCFIA[ module ].deletePlan( $tr.data('attack'), $tr.data('city'), true );
						$tr.remove();
					}
				})
				//attack plan edit and duplication
				.on('click', '.edit, .duplicate', function(){
					KOCFIA[ module ].$form.find('.reset').trigger('click');
					var $this = $(this),
						$tr = $this.closest('tr'),
						attackId = $tr.data('attack'),
						cityKey = $tr.data('city'),
						attack = KOCFIA[ module ].attacks[ cityKey ][ attackId ];

					if( attack ){
						KOCFIA[ module ].$form.find('.detail, .coords, .keep, .option, .add-wave, .save, .launch, .saveAndLaunch, .builds').show();

						if( $this.hasClass('edit') ){
							KOCFIA[ module ].$form.find('.edit-attackId').val( attack.id );
							KOCFIA[ module ].$form.find('.edit-cityKey').val( attack.cityKey );
						}

						KOCFIA[ module ].$form.find('.city-choice').filter('[value="'+ cityKey +'"]').prop('checked', true);
						if( module != 'plunder' ){
							KOCFIA[ module ].$form.find('.targetLevel').val( attack.targetLevel );
						} else {
							//security
							if( KOCFIA[ module ].attacks[ cityKey ][ attackId ].hasOwnPropety('targetUserId') ){
								delete KOCFIA[ module ].attacks[ cityKey ][ attackId ].targetUserId;
							}

							KOCFIA[ module ].$form.find('.targetName').val( attack.targetName );
						}
						KOCFIA[ module ].$form.find('.rallypointSlot').val( attack.rpSlot );

						KOCFIA[ module ].$form.find('textarea').val(attack.coords.join("\n"));

						KOCFIA[ module ].addWaves( attack.waves.length, attack.cityKey );

						if( attack.hasOwnProperty('cloneLastWaveAtMost') ){
							KOCFIA[ module ].$form.find('.clone').val( attack.cloneLastWaveAtMost );
						}

						var $waves = KOCFIA[ module ].$form.find('.wave');
						var i, j, wavesLength = attack.waves.length,
							$wave, wave, $blocks, $b, unit;
						for( i = 0; i < wavesLength; i += 1 ){
							$wave = $waves.eq(i);
							wave = attack.waves[i];

							if( module == 'wilderness' ){
								$wave.find('.knight-choice').val( wave.knight );
							} else {
								$wave.find('.knight-priority').val( wave.knightPriority );
							}

							for( unit in wave ){
								if( wave.hasOwnProperty(unit) && unit.indexOf('knight') == -1 ){
									$wave.find('.add-unit').trigger('click');
								}
							}

							$blocks = $wave.find('.unit-block');
							j = 0;
							for( unit in wave ){
								if( wave.hasOwnProperty(unit) && unit.indexOf('knight') == -1 ){
									$b = $blocks.eq(j);
									$b.find('.unit-choice').val( unit );
									$b.find('.unit-qty').val( Shared.format( wave[ unit ] ) );
									j += 1;
								}
							}
						}

						var $keep = KOCFIA[ module ].$form.find('.keep');
						for( unit in attack.keep ){
							if( keep.hasOwnProperty(unit) ){
								$keep.find('.add-unit').trigger('click');
							}
						}

						$blocks = $keep.find('.unit-block');
						i = 0;
						for( unit in attack.keep ){
							if( attack.keep.hasOwnProperty(unit) ){
								$b = $blocks.eq(i);
								$b.find('.unit-choice').val( unit );
								$b.find('.unit-qty').val( Shared.format( attack.keep[ unit ] ) );
								i += 1;
							}
						}

						//open form accordion
						KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 0);
					} else {
						Shared.notify('Plan d\'attaque introuvable.');
					}
				})
				//knight choice change
				.on('change', '.knight-choice', function(){
					var id = $(this).val();
					if( id !== '' ){
						KOCFIA[ module ].$form.find('.knight-choice').not( this ).each(function(){
							if( this.value == id ) this.value = '';
						});
					}
				})
				//stop on next round
				.on('click', '.stop', function(){
					if( confirm('Etes-vous sûr ?') ){
						var $this = $(this),
							$tr = $this.closest('tr').data('stop', 1),
							attackId = $tr.data('attack'),
							cityKey = $tr.data('city');
						$this.find('span').html('Arrêt en cours');

						if( KOCFIA[ module ].attacks.hasOwnProperty( cityKey )
							&& KOCFIA[ module ].attacks[ cityKey ].hasOwnProperty( attackId )
							&& KOCFIA[ module ].attacks[ cityKey ][ attackId ].hasOwnProperty('timeout')
							&& KOCFIA[ module ].attacks[ cityKey ][ attackId ].timeout
						){
							window.clearTimeout(KOCFIA[ module ].attacks[ cityKey ][ attackId ].timeout);
							KOCFIA[ module ].refreshOngoingInfo(KOCFIA[ module ].attacks[ cityKey ][ attackId ], true, 'Attaque stoppée sur demande.');
						}

						KOCFIA[ module ].$saved.find('tr').filter('[data-attack="'+ attackId +'"]').find('.charge').show();
					}
				})
				//manual launch
				.on('click', '.charge', function(){
					if( KOCFIA.conf[ module ].active ){
						if( !KOCFIA.conf[ module ].automatic ){
							var $tr = $(this).hide().closest('tr'),
								attack = KOCFIA[ module ].attacks[ $tr.data('city') ][ $tr.data('attack') ];
							if( attack ){
								attack.coordIndex = 0;
								attack.marching = [];
								KOCFIA[ module ].refreshOngoingInfo( attack, false );
								KOCFIA[ module ].launchAttack( attack );

								//open ongoing accordion
								KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
							} else {
								alert('Plan d\'attaque introuvable.');
							}
						} else {
							alert('Le mode automatic est activé. Le lancement d\'attaque sauvegardée est bloqué (attaque déjà en cours).');
						}
					} else {
						alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
					}
				})
				//attack templates
				.on('click', '.build', function(){
					var rel = $(this).attr('rel');
					KOCFIA[ module ].$form.find('.wave').remove();
					if( module == 'wilderness' ){
						if( rel == '1' || rel == '1bis' ){
							KOCFIA[ module ].addWaves(1, KOCFIA[ module ].$form.find('.city-choice').filter(':checked').val());
						} else {
							KOCFIA[ module ].addWaves(2, KOCFIA[ module ].$form.find('.city-choice').filter(':checked').val());
						}
					} else {
						KOCFIA[ module ].addWaves(1, KOCFIA[ module ].$form.find('.city-choice').filter(':checked').val());
					}

					KOCFIA[ module ].$form.find('.detail, .keep, .option, .launch, .save, .saveAndLaunch').show();

					if( rel != 'empty' ){
						var $waves = KOCFIA[ module ].$form.find('.wave'),
							$addUnit = $waves.find('.add-unit'),
							$level = KOCFIA[ module ].$form.find('.targetLevel');
						if( module == 'wilderness' ){
							if( rel != '1' && rel != '1bis' ){
								$addUnit.eq(1).trigger('click');
							}

							if( rel == '8' || rel == '8bis' || rel == '9' || rel == '9bis' || rel == '9rd' || rel == '10bis' ){
								$addUnit.eq(0).trigger('click');
							}
						} else if( rel != '5' && rel != '6' && rel != '7' && rel != '7bis' && rel != '10' ) {
							$addUnit.eq(0).trigger('click');
						}

						var $uChoices = $waves.find('.unit-choice'),
							$uQuantity = $waves.find('.unit-qty');

						KOCFIA[ module ].getBuildsConf($level, $uChoices, $uQuantity, rel);
					}
				})
				//remove ongoing attack info line
				.on('click', '.trash', function(){
					var $tr = $(this).closest('tr');
					$('#kocfia-'+ this.module +'-history').append( $tr.find('.info').find('div') );
					$tr.remove();
				});
		};

		KOCFIA.autoAttack.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-'+ this.module).html('');

			var header = KOCFIA[ this.module ].getHeader();
			var form = KOCFIA[ this.module ].getForm();
			var lists = KOCFIA[ this.module ].getListsTemplate();
			var help = KOCFIA[ this.module ].getHelp();
			var history = '<div id="kocfia-'+ this.module +'-history" class="history" title="Historique des '+ KOCFIA.modulesLabel[ this.module ] +'"></div>';

			KOCFIA[ this.module ].addSectionListeners();

			$section.append( header + '<div class="accordion">' + form + lists + '</div>' + help + history );

			KOCFIA[ this.module ].$accordion = $section.find('.accordion');
			KOCFIA[ this.module ].$form = $section.find('.attack-form');
			KOCFIA[ this.module ].$saved = $section.find('.attack-list.saved');
			KOCFIA[ this.module ].$ongoing = $section.find('.attack-list.ongoing');
			KOCFIA[ this.module ].$history = $section.find('.history');

			if( this.module == 'darkForest' ){
				KOCFIA.darkForest.$form = $section.find('.darkForest-form');
				KOCFIA.darkForest.$tbodies = KOCFIA[ this.module ].$form.find('tbody');
				KOCFIA.darkForest.$nextBar = $section.find('.nextIteration');

				if( KOCFIA.darkForest.attacks.hasOwnProperty('levels') ){
					var cityKey, i, level;
					for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[ i ];
						if( KOCFIA.darkForest.attacks.levels.hasOwnProperty( cityKey ) ){
							for( level in KOCFIA.darkForest.attacks.levels[ cityKey ] ){
								if( KOCFIA.darkForest.attacks.levels[ cityKey ].hasOwnProperty(level) ){
									KOCFIA.darkForest.$tbodies
										.filter('[data-city="'+ cityKey +'"]')
										.find('.summary')
										.find('.rule')
										.filter('[data-level="'+ level +'"]')
										.data('rule', KOCFIA.darkForest.attacks.levels[ cityKey ][ level ]);
								}
							}
						}
					}
				}
			}

			KOCFIA[ this.module ].$accordion.accordion({
				collapsible: true,
				autoHeight: false,
				animated: false,
				change: function(event, ui){
					KOCFIA.$confPanelWrapper[0].scrollTop = 0;
					KOCFIA.$confPanelWrapper[0].scrollLeft = 0;
				}
			}).accordion('activate', false);
		};

		KOCFIA.autoAttack.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getHelp function');
			var help = '<div id="kocfia-'+ this.module +'-help" class="help" title="Aide '+ KOCFIA.modulesLabel[ this.module ] +'">';
			help += '<h4>Informations et limitations :</h4><ul>';
			if( this.module == 'wilderness' ){
				help += '<li>Les terres sauvages occupées ne seront pas attaquées (vérification pour chaque coordonnée à chaque attaque)</li>';
			} else if( this.module == 'plunder' ){
				help += '<li>Les villes ciblées ne seront attaquées que si le joueur n\'est pas connecté</li>';
				help += '<li>Aucun éclairage n\'est effectué avant l\'attaque</li>';
				help += '<li>Il est donc préférable d\'être sûr que les joueurs ciblés sont bien inactifs et que les villes ciblées ne disposent pas de défenses</li>';
				help += '<li>En mode automatique un délai de 1 heure sépare deux séries de pillages sur les villes d\'un joueur</li>';
			}
			help += '<li>Les attaques sauvegardées peuvent être lancées manuellement ou en activant les attaques automatiques</li>';
			help += '<li>Aucune vague n\'est lancée si il n\'y a pas assez de chevaliers pour lancer toutes les vagues de l\'attaque</li>';
			help += '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant supérieur à 1 minute)</li>';
			if( this.module != 'scout' && this.module != 'darkForest' ){
				help += '<li>La dernière vague peut être duppliquée au maximum 10 fois lors du lancement de l\'attaque (permet de par exemple de lancer x fois 1 milicien pour récupérer plus d\'objets de trône)</li>';
				help += '<li>Chaque dupplication vérifie les places dans le point de ralliement, les chevaliers et les troupes disponibles</li>';
				help += '<li>Ces dupplications de vague sont optionnelles, elles ne bloquent pas le lancement de l\'attaque</li>';
			}
			help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'attaque sauvegardée</li>';
			help += '<li>Entre 3 et 5 secondes s\'écoulent entre chaque lancement de vague</li>';
			help += '<li>Dix secondes après impact sur la cible, une mise à jour des données de la marche est effectuée (survivants, status)</li>';
			help += '<li>Les campeurs sont automatiquement rappelés</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '</ul><h4>Méthode :</h4><ol>';
			help += '<li>Sélectionner une ville</li>';
			help += '<li>Spécifier une ou plusieurs coordonnées (séparées par un retour à la ligne, sous le format x,y)</li>';
			if( this.module != 'plunder' ){
				help += '<li>Spécifier le niveau pour les '+ (this.module == 'wilderness' ? 'TS attaquées' : 'CB attaqués') +'</li>';
			} else {
				help += '<li>Spécifier le nom du joueur ciblé pour le retrouver plus facilement dans les listes des attaques sauvegardées et en cours</li>';
				help += '<li>Ce nom est aussi utilisé pour les vérifications de présence en ligne lors des lancements, il est donc nécessaire qu\'il soit complet et sans faute</li>';
			}
			help += '<li>Spécifier combien de places conserver dans le point de ralliement (optionnel)</li>';
			help += '<li>Remplir les vagues d\'attaques (manuellement ou via les attaques préprogrammées)</li>';
			help += '<li>Spécifier les chevaliers (optionnel, par défaut le premier chevalier disponible est utilisé)</li>';
			help += '<li>Les quantités peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2m pour deux millions, 3g pour trois milliards)</li>';
			if( this.module != 'scout' && this.module != 'darkForest' ){
				help += '<li>Spécifier le nombre de fois que la dernière vague sera lancée (optionnel)</li>';
			}
			help += '<li>Spécifier les quantités de troupes à conserver (optionnel)</li>';
			help += '</ol></div>';

			return help;
		};

	/* DARK FOREST - extend autoAttack */
		KOCFIA.darkForest = {
			module: 'darkForest',
			coords: {}, //dark forest and bogs coords by city
			stored: ['attacks', 'coords'],
			currentSearch: {}
		};

		KOCFIA.darkForest.planAttack = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' planAttack function');
			var errors = [], $cb, c,
				cityKey, cityActive, city,
				rps, levelActive, level, rule,
				keep, waves, targets, $tbody, $rule,
				plan = { type: 'attack', category: this.module, cities: [], info: {}, levels: {}, coordIndex: 0 },
				previousActivatedCitiesHash = 0,
				activatedCitiesHash = 0;

			if( KOCFIA.darkForest.attacks.hasOwnProperty('info') ){
				for( c in KOCFIA.darkForest.attacks.info ){
					if( KOCFIA.darkForest.attacks.info.hasOwnProperty(c) && KOCFIA.darkForest.attacks.info[ c ].active ){
						previousActivatedCitiesHash += parseInt(c.replace(/city/, ''), 10);
					}
				}
			}

			//check form
			KOCFIA[ this.module ].$form.find('tbody').each(function(){
				$tbody = $(this);

				cityKey = $tbody.data('city');
				cityActive = null;
				city = KOCFIA.cities[ cityKey ];
				rps = null;
				level = null;
				levelActive = null;
				keep = {};
				waves = [];
				targets = [];

				cityActive = ($tbody.find('th').find('.active').prop('checked') ? 1 : 0);

				rps = parseInt( $.trim( $tbody.find('.rps').val() ), 10 );
				if( isNaN(rps) ) rps = 0;

				$tbody.find('.keep').find('input').each(function(){
					var $this = $(this),
						qty = $.trim( $(this).val() ),
						unit = this.name;
					if( qty !== '' ){
						qty = Shared.decodeFormat( qty );
						if( qty !== false ) keep[ unit ] = qty;
						else {
							unitInfo = KOCFIA.resourceInfo[ unit ];
							errors.push('Quantité invalide de conservation '+ unitInfo.labelBis + unitInfo.label +' de '+ city.label);
						}
					}
				});

				plan.levels[ cityKey ] = {};

				$tbody.find('.rule').each(function(){
					$rule = $(this);
					rule = $rule.data('rule');
					levelActive = ($rule.find('.active').prop('checked') ? 1 : 0);

					knightPriority = rule.knightPriority;

					level = $rule.data('level');
					targets.push(level);

					plan.levels[ cityKey ][level] = {active: levelActive, knightPriority: knightPriority, waves: rule.waves};
				});

				plan.cities.push( cityKey );
				plan.info[ cityKey ] = {active: cityActive, rps: rps, keep: keep, targetsLevel: targets};
			});

			if( errors.length ){
				errors = errors.unique();
			} else {
				var empty = true;
				for( var i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
					if( KOCFIA.cities.hasOwnProperty(cityKey) ){
						if( !$.isEmptyObject(plan.levels[ KOCFIA.citiesKey[i] ]) ){
							empty = false;
							break;
						} else if( plan.info[ KOCFIA.citiesKey[i] ].active ){
							city = KOCFIA.cities[ KOCFIA.citiesKey[i] ];
							errors.push('Au moins une vague valide doit être spécifiée pour '+ city.label);
						}
					}
				}
			}

			if( errors.length === 0 ){
				for( c in plan.info ){
					if( plan.info.hasOwnProperty(c) && plan.info[ c ].active ){
						activatedCitiesHash += parseInt(c.replace(/city/, ''), 10);
					}
				}

				//activated cities modification, reseting coords list
				if( activatedCitiesHash != previousActivatedCitiesHash ){
					KOCFIA.darkForest.coords = {};
				}
			}

			return {attack: plan, errors: errors};
		};

		KOCFIA.darkForest.listCityAttacks = function( cityKey ){};

		KOCFIA.darkForest.getBuildsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuilds function');
			//col 1
			var builds = '<button class="button secondary" rel="empty"><span>Vide</span></button>';
			builds += '<button class="button secondary" rel="1b" title="Milicien + Balistes<br>Empennage 10 - Chevalier 55<br>pertes : ~ 1 milicien"><span>FO1</span></button>';

			builds += '<button class="button secondary" rel="2a" title="Miliciens<br>Empennage 10 - Chevalier 140<br>pertes : ~ 4k miliciens"><span>FO2</span></button>';
			builds += '<button class="button secondary" rel="2c" title="Piquiers + Paladins<br>Empennage 11 - Chevalier 134+<br>pertes : ~ 60 piquiers et 200 paladins"><span>FO2</span></button>';

			builds += '<button class="button secondary" rel="3a" title="Point de ralliement 11<br>Toutes unitées sauf Ravitailleur<br>(majorité de Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ 2k miliciens et 60 autres"><span>FO3</span></button>';
			builds += '<button class="button secondary" rel="3c" title="Point de ralliement 11<br>Toutes infantries, Cavalier, Cavalier Lourd, Wagon<br>(majorité de Miliciens)<br>Empennage 10 - Chevalier 150<br>pertes : ~ 2.5k miliciens et quelques autres"><span>FO3</span></button>';

			builds += '<button class="button secondary" rel="4b" title="Point de ralliement 12<br>Miliciens, Scout, Piquier, Paladin<br>(majorité de Miliciens)<br>Empennage 11 - Chevalier 57<br>pertes : ~ 7.5k miliciens et 2 autres ?"><span>FO4</span></button>';

			builds += '<button class="button secondary" rel="5a" title="Point de ralliement 10<br>Miliciens, Paladins et Archers<br>Empennage ? - Chevalier 140+<br>pertes : ~ 8k miliciens, 5000 paladins et 800 archers"><span>FO5</span></button>';

			builds += '<button class="button secondary" rel="6a" title="Point de ralliement 11<br>Miliciens, Piquiers, Archers, Cavalerie Lourde<br>Empennage ? - Chevalier ?<br>pertes : ~ 7k miliciens, 10k piquiers, 12k archers et 4k cavalerie lourde"><span>FO6</span></button>';

			builds += '<button class="button secondary" rel="7" title="Point de ralliement 12<br>Toutes unitées sauf Ravitailleur<br>(majorité Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ ?"><span>FO7</span></button>';

			//col 2
			builds += '<button class="button secondary" rel="1a" title="Milicien + Archers<br>Empennage 10 - Chevalier 55<br>pertes : ~ 1 milicien"><span>FO1</span></button>';
			builds += '<button class="button secondary" rel="1c" title="Point de ralliement 11<br>Cavalier + Scouts<br>Empennage ? - Chevalier ?<br>pertes : ~ 1 cavalier"><span>FO1</span></button>';

			builds += '<button class="button secondary" rel="2b" title="Scout + Paladins<br>Empennage 11 - Chevalier 128+<br>pertes : ~ 60 paladins"><span>FO2</span></button>';
			builds += '<button class="button secondary" rel="2d" title="Point de ralliement 11<br>Toutes infanteries, Cavalier<br>(majorité de Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ 50 miliciens et 2-3 autres?"><span>FO2</span></button>';

			builds += '<button class="button secondary" rel="3b" title="Point de ralliement 12<br>Toutes unitées sauf celles de siège<br>(majorité de Miliciens)<br>Empennage 11 - Chevalier ?<br>pertes : 100-200 Miliciens, 1 scout, 1-2 autres"><span>FO3</span></button>';

			builds += '<button class="button secondary" rel="4a" title="Point de ralliement 11<br>Toutes unitées sauf Ravitailleur<br>(majorité de Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ ?"><span>FO4</span></button>';
			builds += '<button class="button secondary" rel="4c" title="Point de ralliement 11<br>Toutes infantries, Cavalier, Cavalier Lourd, Wagon, Baliste, Bélier<br>(majorité de Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ 10k miliciens et quelques autres"><span>FO4</span></button>';

			builds += '<button class="button secondary" rel="5b" title="Point de ralliement 12<br>Toutes unitées sauf Ravitailleur<br>(majorité Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ ?"><span>FO5</span></button>';
			builds += '<button class="button secondary" rel="6b" title="Point de ralliement 12<br>Toutes unitées sauf Ravitailleur<br>(majorité Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ ?"><span>FO6</span></button>';
			builds += '<button class="button secondary" rel="8" title="Point de ralliement 12<br>Toutes unitées sauf Ravitailleur<br>(majorité Miliciens)<br>Empennage ? - Chevalier ?<br>pertes : ~ ?"><span>FO8</span></button>';

			return builds;
		};

		KOCFIA.darkForest.getBuildsConf = function( rel, $form ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuildsConf function');

			switch( rel ){
				case '1a':
						$form.find('input')
							.filter('.level').val(1).end()
							.filter('[name="unt2"]').val('1').end()
							.filter('[name="unt6"]').val('10k');
					break;
				case '1b':
						$form.find('input')
							.filter('.level').val(1).end()
							.filter('[name="unt2"]').val('1').end()
							.filter('[name="unt10"]').val('10k');
					break;
				case '1c':
						$form.find('input')
							.filter('.level').val(1).end()
							.filter('[name="unt3"]').val('120k').end()
							.filter('[name="unt7"]').val('1');
					break;
				case '2a':
						$form.find('input')
							.filter('.level').val(2).end()
							.filter('[name="unt2"]').val('90k');
					break;
				case '2b':
						$form.find('input')
							.filter('.level').val(2).end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt5"]').val('70k');
					break;
				case '2c':
						$form.find('input')
							.filter('.level').val(2).end()
							.filter('[name="unt4"]').val('1k').end()
							.filter('[name="unt5"]').val('42k');
					break;
				case '2d':
						$form.find('input')
							.filter('.level').val(2).end()
							.filter('[name="unt1"]').val('1').end()
							.filter('[name="unt2"]').val('149994').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('1').end()
							.filter('[name="unt5"]').val('1').end()
							.filter('[name="unt6"]').val('1').end()
							.filter('[name="unt7"]').val('1');
					break;
				case '3a':
						$form.find('input')
							.filter('.level').val(3).end()
							.filter('[name="unt2"]').val('149193').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('250').end()
							.filter('[name="unt5"]').val('250').end()
							.filter('[name="unt6"]').val('250').end()
							.filter('[name="unt7"]').val('1').end()
							.filter('[name="unt8"]').val('1').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('1').end()
							.filter('[name="unt11"]').val('1').end()
							.filter('[name="unt12"]').val('1');
					break;
				case '3b':
						$form.find('input')
							.filter('.level').val(3).end()
							.filter('[name="unt1"]').val('1').end()
							.filter('[name="unt2"]').val('198973').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('10').end()
							.filter('[name="unt5"]').val('1k').end()
							.filter('[name="unt6"]').val('10').end()
							.filter('[name="unt7"]').val('1').end()
							.filter('[name="unt8"]').val('1').end()
							.filter('[name="unt9"]').val('1');
					break;
				case '3c':
						$form.find('input')
							.filter('.level').val(3).end()
							.filter('[name="unt1"]').val('1').end()
							.filter('[name="unt2"]').val('149992').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('1').end()
							.filter('[name="unt5"]').val('1').end()
							.filter('[name="unt6"]').val('1').end()
							.filter('[name="unt7"]').val('1').end()
							.filter('[name="unt8"]').val('1').end()
							.filter('[name="unt9"]').val('1');
					break;
				case '4a':
						$form.find('input')
							.filter('.level').val(4).end()
							.filter('[name="unt2"]').val('148694').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('500').end()
							.filter('[name="unt5"]').val('500').end()
							.filter('[name="unt6"]').val('500').end()
							.filter('[name="unt7"]').val('1').end()
							.filter('[name="unt8"]').val('1').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('1').end()
							.filter('[name="unt11"]').val('1').end()
							.filter('[name="unt12"]').val('1');
					break;
				case '4b':
						$form.find('input')
							.filter('.level').val(4).end()
							.filter('[name="unt2"]').val('199996').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('1').end()
							.filter('[name="unt5"]').val('1');
					break;
				case '4c':
						$form.find('input')
							.filter('.level').val(4).end()
							.filter('[name="unt1"]').val('1').end()
							.filter('[name="unt2"]').val('149990').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('1').end()
							.filter('[name="unt5"]').val('1').end()
							.filter('[name="unt6"]').val('1').end()
							.filter('[name="unt7"]').val('1').end()
							.filter('[name="unt8"]').val('1').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('1').end()
							.filter('[name="unt11"]').val('1');
					break;
				case '5a':
						$form.find('input')
							.filter('.level').val(5).end()
							.filter('[name="unt2"]').val('25k').end()
							.filter('[name="unt5"]').val('30k').end()
							.filter('[name="unt6"]').val('45k');
					break;
				case '5b':
						$form.find('input')
							.filter('.level').val(5).end()
							.filter('[name="unt2"]').val('198393').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('500').end()
							.filter('[name="unt5"]').val('500').end()
							.filter('[name="unt6"]').val('500').end()
							.filter('[name="unt7"]').val('25').end()
							.filter('[name="unt8"]').val('25').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('150').end()
							.filter('[name="unt11"]').val('5').end()
							.filter('[name="unt12"]').val('1');
					break;
				case '6a':
						$form.find('input')
							.filter('.level').val(6).end()
							.filter('[name="unt2"]').val('70k').end()
							.filter('[name="unt4"]').val('40k').end()
							.filter('[name="unt6"]').val('20k').end()
							.filter('[name="unt8"]').val('20k');
					break;
				case '6b':
						$form.find('input')
							.filter('.level').val(6).end()
							.filter('[name="unt2"]').val('196572').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('1000').end()
							.filter('[name="unt5"]').val('1000').end()
							.filter('[name="unt6"]').val('1000').end()
							.filter('[name="unt7"]').val('50').end()
							.filter('[name="unt8"]').val('50').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('250').end()
							.filter('[name="unt11"]').val('75').end()
							.filter('[name="unt12"]').val('1');
					break;
				case '7':
						$form.find('input')
							.filter('.level').val(7).end()
							.filter('[name="unt2"]').val('192498').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('2000').end()
							.filter('[name="unt5"]').val('2000').end()
							.filter('[name="unt6"]').val('2000').end()
							.filter('[name="unt7"]').val('100').end()
							.filter('[name="unt8"]').val('200').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('500').end()
							.filter('[name="unt11"]').val('100').end()
							.filter('[name="unt12"]').val('200');
					break;
				case '8':
						$form.find('input')
							.filter('.level').val(8).end()
							.filter('[name="unt2"]').val('188948').end()
							.filter('[name="unt3"]').val('1').end()
							.filter('[name="unt4"]').val('3000').end()
							.filter('[name="unt5"]').val('3000').end()
							.filter('[name="unt6"]').val('3000').end()
							.filter('[name="unt7"]').val('200').end()
							.filter('[name="unt8"]').val('400').end()
							.filter('[name="unt9"]').val('1').end()
							.filter('[name="unt10"]').val('1000').end()
							.filter('[name="unt11"]').val('150').end()
							.filter('[name="unt12"]').val('300');
					break;
				default: break;
			}
		};

		KOCFIA.darkForest.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getHelp function');
			var help = '<div id="kocfia-'+ this.module +'-help" class="help" title="Aide '+ KOCFIA.modulesLabel[ this.module ] +'">';
			help += '<h4>Informations et limitations :</h4>';
			help += '<ul>';
			help += '<li>Chaque coordonnée est vérifiée avant lancement (vérification du niveau et si ce n\'est pas un marais)</li>';
			help += '<li>Les attaques sauvegardées peuvent être lancées manuellement ou via le mode automatique</li>';
			help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
			help += '<li>Aucune vague n\'est lancée si il n\'y a pas assez de chevaliers pour lancer tous les vagues de l\'attaque</li>';
			help += '<li>Si une vague est en erreur les vagues précédentes seront rappelées (sous réserves des limitations de temps de marche restant supérieur à 1 minute)</li>';
			help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'attaque sauvegardé</li>';
			help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '<li>Pour les coordonnées une recherche automatique est effectuée à 100 de distance autour des villes activées pour lister les fôrets sombres et marais</li>';
			help += '<li>Cette liste ne changera plus, sauf si vous activez une nouvelle ville ou déplacez une ville (portail) et si une erreur est détectée durant une vérification avant lancement</li>';
			help += '<li>La recherche automatique est faite par étape de 5% jusqu\'à complétion</li>';
			help += '<li>La recherche automatique est volontairement ralentie pour éviter de surcharger le serveur</li>';
			help += '</ul>';
			help += '<h4>Méthode :</h4>';
			help += '<ol>';
			help += '<li>Sélectionner une ville</li>';
			help += '<li>Spécifier le niveau pour les FS attaquées</li>';
			help += '<li>Spécifier combien de places conserver dans le point de ralliement (optionnel)</li>';
			help += '<li>Remplir les vagues d\'attaques (manuellement ou via les attaques préprogrammées)</li>';
			help += '<li>Spécifier la priorité pour les chevaliers (optionnel, par défaut le premier chevalier disponible est utilisé)</li>';
			help += '<li>Les quantités peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2m pour deux millions, 3g pour trois milliards)</li>';
			help += '<li>Spécifier les quantités de troupes à conserver (optionnel)</li>';
			help += '</ol>';
			help += '</div>';

			return help;
		};

		KOCFIA.darkForest.getCoords = function(  ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getCoords function');
			if( !$.isEmptyObject(KOCFIA[ this.module ].coords) ){
				return KOCFIA[ this.module ].coords;
			} else {
				return false;
			}
		};

		KOCFIA.darkForest.search = function( $tr ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' search function');
			var module = this.module;
			return $.Deferred(function(dfd){
				/* deferred functions */
					//display the partialExplore results, while merging them with previous results
					var parseResults = function( cdfd, result ){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred parseResults function');
						var coords = {};

						//merge results with previous deferred partialExplore results
						if( !$.isEmptyObject(KOCFIA[ module].currentSearch) ){
							coords = KOCFIA[ module ].currentSearch;
						}

						var id, tile;
						for( id in result.data ){
							if( result.data.hasOwnProperty(id) ){
								tile = result.data[id];
								//dark forest (tileType = 54) or swamp (tileType = 0)
								if( tile.tileType === 0 || tile.tileType == 54 ){
									coords[ tile.xCoord +','+ tile.yCoord ] = 1;
								}
							}
						}

						KOCFIA[ module].currentSearch = coords;

						if( !loop ) return cdfd.resolve();
						else {
							if( start / length > step ){
								KOCFIA.darkForest.refreshOngoingInfo( null, false, (step * 100).toFixed(0) +'% effectués.');
								step += 0.01;
							}
							if( start / length > threshold ){
								//exit only if some valid coords are found
								var nb = Object.keys(KOCFIA[ module].currentSearch).length;
								threshold += 0.05;
								if( nb > 0 ){
									return cdfd.resolve();
								}
							}

							start += 50;
							end += 50;
							window.setTimeout(function(){
								return cdfd.pipe( partialExplore(cdfd, 10) );
							}, 3000);
						}
					};

					//split the full coordinates search in small requests of 100 coordinates
					var partialExplore = function(cdfd, attempts){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred partialExplore function', start, end, length);
						loop = true;
						if( end > length ){
							end = length;
							loop = false;
						}
						if( $tr.data('stop') ){
							return cdfd.reject();
						}

						if( start == end ) start -= 1; //avoid the start = end case with the slice which need a difference

						params.blocks = blocks.slice(start, end).join(',');

						if( params.blocks.length === 0 && loop === false ) return cdfd.resolve();

						$.ajax({
							url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(result){
							if( result.ok && result.data ){
								return cdfd.pipe( parseResults( cdfd, result ) );
							} else {
								attempts -= 1;
								if( attempts > 0 ){
									return cdfd.pipe( partialExplore(cdfd, attempts) );
								} else {
									return cdfd.reject();
								}
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ){
								return cdfd.pipe( partialExplore(cdfd, attempts) );
							} else {
								return cdfd.reject();
							}
						});
					};

					var computeBlocks = function(cdfd){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred computeBlocks function', cityIndex);

						if( cityIndex >= KOCFIA.citiesKey.length ){
							length = blocks.length;
							KOCFIA[ module ].$ongoing.find('tbody').find('.info').append('<div data-timestamp="'+ Date.timestamp() +'">Parcours de '+ length +' coordonnées</div>');
							return cdfd.pipe( partialExplore(cdfd, 10) );
						} else {
							cityKey = KOCFIA.citiesKey[ cityIndex ];
							city = KOCFIA.cities[ cityKey ];

							if( !KOCFIA.darkForest.attacks.info[ cityKey ].active ){
								cityIndex += 1;
								return cdfd.pipe( computeBlocks(cdfd) );
							}

							coordX = parseInt(city.coords.x, 10);
							coordY = parseInt(city.coords.y, 10);

							var x = 0,
								y = rangeMax,
								rangeMaxSquare = Math.pow(rangeMax, 2),
								rangeMinSquare = Math.pow(rangeMin, 2),
								i, j, coords = {};

							for( x = 0; x < y; x += 1 ){
								for( i = coordX - x; i <= coordX + x; i += 1 ){
									j = coordY + y;
									if( Math.pow(i, 2) + Math.pow(j, 2) >= rangeMinSquare ){
										coords[ i +','+ j ] = {x: i, y: j};
									}
								}
								for( i = coordX - x; i <= coordX + x; i += 1 ){
									j = coordY - y;
									if( Math.pow(i, 2) + Math.pow(j, 2) >= rangeMinSquare ){
										coords[ i +','+ j ] = {x: i, y: j};
									}
								}
								for( i = coordX - y; i <= coordX + y; i += 1 ){
									j = coordY + x;
									if( Math.pow(i, 2) + Math.pow(j, 2) >= rangeMinSquare ){
										coords[ i +','+ j ] = {x: i, y: j};
									}
								}
								for( i = coordX - y; i <= coordX + y; i += 1 ){
									j = coordY - x;
									if( Math.pow(i, 2) + Math.pow(j, 2) >= rangeMinSquare ){
										coords[ i +','+ j ] = {x: i, y: j};
									}
								}

								if( Math.abs( Math.pow(x, 2) + Math.pow(y, 2) - rangeMaxSquare ) > Math.abs( Math.pow(x, 2) + Math.pow(y - 1, 2) - rangeMaxSquare )
										|| Math.pow(x + 1, 2) + Math.pow(y, 2) > rangeMaxSquare
								  ){
									y -= 1;
								}
							}

							//for one coord, kabam return 25 coordinates
							//the given coord is the top left corner of a 5x5 square
							var returned = {}, filtered = {}, c, g;
							for( c in coords ){
								if( coords.hasOwnProperty(c) && !returned.hasOwnProperty(c) ){
									g = coords[c];
									for( i = g.x; i <= g.x + 5; i += 1 ){
										for( j = g.y; j <= g.y + 5; j += 1 ){
											returned[ i+','+j ] = 1;
										}
									}
									filtered[ c ] = g;
								}
							}

							for( c in filtered ){
								if( filtered.hasOwnProperty(c) ){
									g = filtered[ c ];
									blocks.push("bl_" + ( g.x >= 750 ? Math.abs(g.x - 750) : g.x ) + "_bt_" + ( g.y >= 750 ? Math.abs(g.y - 750) : g.y ));
								}
							}

							window.setTimeout(function(){
								cityIndex += 1;
								return cdfd.pipe( computeBlocks(cdfd) );
							}, 1000);
						}
					};

					var searchSequence = function(){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( module ) ) console.info('KOCFIA '+ module +' explore deferred searchSequence function');
						return $.Deferred(function(cdfd){
							if( $.isEmptyObject(KOCFIA[ module ].coords) ){
								return cdfd.pipe( computeBlocks(cdfd) );
							} else {
								threshold = KOCFIA[ module ].coords.threshold;
								blocks = KOCFIA[ module ].coords.blocks;
								length = KOCFIA[ module ].coords.length;
								start = KOCFIA[ module ].coords.start;
								end = KOCFIA[ module ].coords.end;
								step = KOCFIA[ module ].coords.step;

								return cdfd.pipe( partialExplore(cdfd, 3) );
							}
						}).promise();
					};

				var params = window.g_ajaxparams,
					blocks = [],
					rangeMin = 1,
					rangeMax = 100,
					coords = [],
					i, j, k,
					city, range,
					coordX, coordY,
					maxX, maxY,
					leftCoordMin,
					rightCoordMin,
					topCoordMin,
					bottomCoordMin;

				//calculate the radius of the circle based on the distance max
				var radiusMax = Math.ceil(rangeMax / 2 * Math.PI),
					radiusMin = Math.floor(rangeMin / 2 * Math.PI);

				var loop,
					threshold = 0.05, // 5%
					step = 0.01,
					start = 0,
					end = 49,
					length,
					cityIndex = 0;
				$.when( searchSequence() )
					.always(function(){
						if( end == length ){
							if( KOCFIA[ module ].coords.hasOwnProperty('timestamp') ) delete KOCFIA[ module ].coords.timestamp;
							KOCFIA[ module ].coords.status = 'complete';
							if( KOCFIA[ module ].coords.hasOwnProperty('blocks') ) delete KOCFIA[ module ].coords.blocks;
							if( KOCFIA[ module ].coords.hasOwnProperty('length') ) delete KOCFIA[ module ].coords.length;
							if( KOCFIA[ module ].coords.hasOwnProperty('start') ) delete KOCFIA[ module ].coords.start;
							if( KOCFIA[ module ].coords.hasOwnProperty('end') ) delete KOCFIA[ module ].coords.end;
							if( KOCFIA[ module ].coords.hasOwnProperty('threshold') ) delete KOCFIA[ module ].coords.threshold;
							if( KOCFIA[ module ].coords.hasOwnProperty('step') ) delete KOCFIA[ module ].coords.step;
							KOCFIA.darkForest.refreshOngoingInfo( null, false, 'Récupération des coordonnées finies.');
						} else {
							KOCFIA[ module ].coords.status = 'partial';
							KOCFIA[ module ].coords.threshold = threshold;
							KOCFIA[ module ].coords.step = step;
							KOCFIA[ module ].coords.timestamp = Date.timestamp();
							if( !KOCFIA[ module ].coords.hasOwnProperty('blocks') ) KOCFIA[ module ].coords.blocks = blocks;
							KOCFIA[ module ].coords.length = length;
							KOCFIA[ module ].coords.start = start;
							KOCFIA[ module ].coords.end = end;
						}

						if( !KOCFIA[ module ].coords.hasOwnProperty('list') || KOCFIA[ module ].coords.list.length === 0 ){
							KOCFIA[ module ].coords.list = Object.keys(KOCFIA[ module].currentSearch);
						} else {
							$.merge(KOCFIA[ module ].coords.list, Object.keys(KOCFIA[ module].currentSearch));
						}

						KOCFIA[ module ].currentSearch = {};

						KOCFIA[ module ].storeCoords();

						return dfd.resolve();
					});
			}).promise();
		};

		KOCFIA.darkForest.storeCoords = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' storeCoords function');
			localStorage.setObject('kocfia_'+ this.module +'_coords_' + KOCFIA.storeUniqueId, KOCFIA[ this.module ].coords);
		};

		KOCFIA.darkForest.deleteAllCoords = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deleteAllCoords function');

			KOCFIA[ this.module ].coords = {};
			localStorage.removeItem('kocfia_'+ this.module +'_coords_' + KOCFIA.storeUniqueId);
		};

		KOCFIA.darkForest.refreshOngoingInfo = function(attack, stopped, msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' refreshOngoingInfo function');
			var $tr = KOCFIA[ this.module ].$ongoing.find('tbody').find('tr'),
				$trash = $tr.find('.trash');
			if( $tr.length === 0 || $trash.length ){
				var code = '',
					cityKey, city, i, j, k, u, t, info, unit, rule;
				for( i = 0; i < attack.cities.length; i += 1 ){
					cityKey = attack.cities[i];
					city = KOCFIA.cities[ cityKey ];

					if( attack.info[ cityKey ].active ){
						code += '<tr';
						if( i === 0 ) code += ' data-stop="0"';
						code += '><td class="trip">';

						//city info, targets, keep
						info = attack.info[ cityKey ];

						if( i === 0 ) code += '<div><button class="button danger stop"><span>Arrêter</span></button></div>';

						code += city.label;
						code += '<br>Garder '+ info.rps +' place'+ (info.rps > 1 ? 's' : '');
						code += '<br>FS ciblée'+ (info.targetsLevel.length > 1 ? 's' : '') +' : ' + info.targetsLevel.join(', ');

						if( !$.isEmptyObject(info.keep) ){
							code += '<br>Conserver : ';
							j = 0;
							for( u in info.keep ){
								if( info.keep.hasOwnProperty(u) ){
									qty = info.keep[ u ];
									if( j > 0 ) code += ', ';
									unit = KOCFIA.unitInfo[u];

									code += '<span title="'+ unit.label +' - '+ Shared.readable( qty ) +'"><img src="'+ unit.icon +'" alt="'+ unit.label +'">';
									code += ' '+ Shared.format( qty ) +'</span>';
									j += 1;
								}
							}
						}
						code += '</td><td class="rules">';

						//rules
						for( j = 0; j < info.targetsLevel.length; j += 1 ){
							rule = attack.levels[ cityKey ][ info.targetsLevel[ j ] ];
							if( rule.active ){
								code += '<div class="rule">';
								code += 'FO'+ info.targetsLevel[ j ];
								code += ' | Chevalier : '+ (rule.knightPriority == 'highest' ? 'Combat haut' : (rule.knightPriority == 'lowest' ? 'Combat bas' : 'n\'importe'));
								for( k = 0; k < rule.waves.length; k += 1 ){
									code += ' | Vague '+ (k + 1) +' : ';
									t = 0;
									for( u in rule.waves[k] ){
										if( rule.waves[k].hasOwnProperty(u) ){
											if( t > 0 ) code += ', ';
											qty = rule.waves[k][u];
											unit = KOCFIA.unitInfo[u];

											code += '<span title="'+ unit.label +'-'+ Shared.readable( qty ) +'"><img src="'+ unit.icon +'" alt="'+ unit.label +'">';
											code += ' '+ Shared.format( qty ) +'</span>';

											t += 1;
										}
									}
								}
								code += '</div>';
							}
						}
						code += '</td>';

						if( i === 0 ) code += '<td class="info" rowspan="'+ KOCFIA.citiesKey.length +'"></td>';

						code += '</tr>';
					}
				}

				KOCFIA[ this.module ].$ongoing.find('tbody').html( code );
			}

			if( stopped ){
				$tr.find('.stop').toggleClass('stop trash secondary danger')
					.find('span').html('Enlever');
			}

			//clean old messages
			var timestamp = Date.timestamp(),
				obsolete = 5 * 60 * 1000,
				msgTimestamp;
			$msg = $tr.find('.info').find('div');
			if( $msg.length > 14 ){
				//keep one for td width
				KOCFIA[ this.module ].$history.append( $msg.filter(':lt(14)') );
			}
			$msg.each(function(){
				var $div = $(this);
				msgTimestamp = $div.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					KOCFIA[ this.module ].$history.append( $div );
				}
			});

			if( !$.isEmptyObject(msg) ){
				$tr.find('.info').append('<div data-timestamp="'+ timestamp +'">'+ msg +'</div>');
			}
		};

		KOCFIA.darkForest.getForm = function(){
			var form = '<h3>Configurer</h3>';
			form += '<div class="darkForest-form">';

			//buttons
			var buttons = '<div class="buttons">';
			buttons += '<button class="button modify whole-save"><span>Enregister</span></button>';
			buttons += '<button class="button danger whole-reset">Annuler</button>';
			buttons += '</div>';

			//toggle and cities tbody
			form += '<div class="city-toggles buttonset">';
			form += '<label>Afficher :</label>';
			var i, j, k, l, tbodies = '', length = KOCFIA.citiesKey.length,
				cityKey, city, unitInfo, unitKey, unit, rule, line,
				order = ['unt1', 'unt3', 'unt5', 'unt7', 'unt9', 'unt11', 'unt2', 'unt4', 'unt6', 'unt8', 'unt10', 'unt12'],
				builds = KOCFIA.darkForest.getBuildsList();
			for( i = 0; i < length; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];

					form += '<input id="kocfia-darkforest-toggle-'+ cityKey +'" type="checkbox" value="'+ cityKey +'">';
					form += '<label for="kocfia-darkforest-toggle-'+ cityKey +'">'+ city.label +'</label>';

					tbodies += '<tbody data-city="'+ cityKey +'">';
					tbodies += '<tr><th colspan="3">';

					tbodies += '<div><label for="kocfia-darkForest-rps-'+ cityKey +'">Laisser :</label>';
					tbodies += '<input type="number" id="kocfia-darkForest-rps-'+ cityKey +'" class="rps" min="0" max="11" required ';
					if( KOCFIA.darkForest.attacks.hasOwnProperty('info')
						&& KOCFIA.darkForest.attacks.info.hasOwnProperty( cityKey )
						&& KOCFIA.darkForest.attacks.info[ cityKey ].rps
					){
						tbodies += 'value="'+ KOCFIA.darkForest.attacks.info[ cityKey ].rps +'">';
					} else {
						tbodies += 'value="0">';
					}
					tbodies += 'place(s) dans le point de ralliement</div>';

					tbodies += '<input type="checkbox" id="kocfia-darkForest-active-'+ cityKey +'" class="active" value="'+ cityKey +'" title="Ville active ?"';
					if( KOCFIA.darkForest.attacks.hasOwnProperty('info')
						&& KOCFIA.darkForest.attacks.info.hasOwnProperty( cityKey )
						&& KOCFIA.darkForest.attacks.info[ cityKey ].active
					){
						tbodies += ' checked';
					}
					tbodies += '><label for="kocfia-darkForest-active-'+ cityKey +'">'+ city.label +'</label>';

					tbodies += '</th></tr>';
					tbodies += '<tr><td class="builds">';
					tbodies += '<h4>Configurations</h4>';
					tbodies += '<div>'+ builds +'</div>';

					tbodies += '</td><td class="keep">';
					tbodies += '<h4>Conserver</h4><div class="units">';
					for( j = 0, l = order.length; j < l; j += 1 ){
						unitKey = order[j];
						unitInfo = KOCFIA.unitInfo[ unitKey ];
						tbodies += '<div><label id="kocfia-darkForest-keep-'+ unitKey +'-qty" title="'+ unitInfo.label +'"><img src="'+ unitInfo.icon +'"></label>';
						tbodies += '<input id="kocfia-darkForest-keep-'+ unitKey +'-qty" type="text" name="'+ unitKey +'" pattern="'+ Shared.numberRegExp +'"';
						if( KOCFIA.darkForest.attacks.hasOwnProperty('info')
							&& KOCFIA.darkForest.attacks.info.hasOwnProperty( cityKey )
							&& KOCFIA.darkForest.attacks.info[ cityKey ].keep.hasOwnProperty( unitKey )
						) {
							tbodies += 'value ="'+ KOCFIA.darkForest.attacks.info[ cityKey ].keep[ unitKey ] +'"';
						}
						tbodies += '></div>';
					}
					tbodies += '</div><div><button class="button secondary copy" title="Copie cette configuration de conservation aux autres villes"><span>Copier</span></button></div>';

					tbodies += '</td><td class="summary">';
					tbodies += '<h4>Résumé</h4>';
					//plan.levels[ cityKey ][level] = {active: levelActive, knightPriority: knightPriority, waves: rule.waves };
					if( KOCFIA.darkForest.attacks.hasOwnProperty('levels')
						&& KOCFIA.darkForest.attacks.levels.hasOwnProperty( cityKey )
					){
						for( level in KOCFIA.darkForest.attacks.levels[ cityKey ] ){
							if( KOCFIA.darkForest.attacks.levels[ cityKey ].hasOwnProperty(level) ){
								rule = KOCFIA.darkForest.attacks.levels[ cityKey ][ level ];

								line = '<div class="rule" data-level="'+ level +'">';
								line += '<input type="checkbox" title="Configuration active ?" class="active" '+ (rule.active ? 'checked': '') +'> ';
								line += 'FO'+ level;
								line += ' | chevalier : ';
								if( rule.knightPriority === '' ) line += 'n\'importe';
								else if( rule.knightPriority == 'highest' ) line += 'combat haut';
								else line += 'combat bas';

								for( j = 0; j < rule.waves.length; j += 1 ){
									line += ' | vague '+ (j + 1) + ' :';
									l = 0;
									for( k = 0; k < KOCFIA.troops.length; k += 1 ){
										unitInfo = KOCFIA.troops[k];
										unit = unitInfo.key;
										if( rule.waves[j].hasOwnProperty(unit) ){
											qty = rule.waves[j][ unit ];
											if( l > 0 ) line += ',';
											line += ' <span title="'+ unitInfo.label +' - '+ Shared.readable(qty) +'"><img src="'+ unitInfo.icon +'">'+ Shared.format(qty) +'</span>';
											l += 1;
										}
									}
								}

								line += '<button class="button modify edit" title="Modifier cette configuration"><span>Modifier</span></button>';
								line += '<button class="button danger remove" title="Supprimer cette configuration"><span>Supprimer</span></button>';
								line += '<button class="button secondary copy" title="Ajouter cette configuration aux autres villes, remplace une configuration du même niveau"><span>Copier</span></button>';

								line += '</div>';

								tbodies += line;
							}
						}
					}

					tbodies += '</td></tr>';

					tbodies += '<tr><td class="form" colspan="3"></td></tr>';

					tbodies += '</tbody>';
				}
			}
			form += '</div>';

			form += buttons;

			form += '<table>';
			form += tbodies;
			form += '</table>';

			form += buttons;

			form += '</div>';

			return form;
		};

		KOCFIA.darkForest.getListsTemplate = function(){
			var onGoing = '<h3>Attaques en cours';
			onGoing += '<span class="nextIteration" title="Horaire de la prochaine tentative d\'attaque de forêts obscures"></span>';
			onGoing += '</h3><div class="attack-list ongoing">';
			onGoing += '<table><thead><tr>';
			onGoing += '<th class="trip">Villes</th>';
			onGoing += '<th class="tules">Configurations</th>';
			onGoing += '<th class="info">Info</th>';
			onGoing += '</tr></thead>';
			onGoing += '<tbody></tbody>';
			onGoing += '</table></div>';

			return onGoing;
		};

		KOCFIA.darkForest.addSectionListeners = function(){
			KOCFIA.$confPanel.find('#kocfia-darkForest')
				.on('change', '#darkForest-panel-automatic', function(){
					var checked = $(this).prop('checked');
					$('#darkForest-automatic').prop('checked', checked).change();
					if( checked ) KOCFIA.darkForest.$accordion.accordion('activate', false).accordion('activate', 1);
					KOCFIA.darkForest.$form.find('.launch').toggle( checked );
				})
				//save whole form
				.on('click', '.whole-save', function(){
					var result = KOCFIA.darkForest.planAttack();

					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						KOCFIA.darkForest.attacks = result.attack;

						KOCFIA.darkForest.storeAttacks();

						Shared.success( null );
					}
				})
				//reset whole form
				.on('click', '.whole-reset', function(){
					KOCFIA.darkForest.$form.find('tbody').html('');
				})
				//cities tbody toggle
				.on('change', '.city-toggles input', function(){
					var checked = $(this).prop('checked'),
						cityKey = this.value,
						$tbody = KOCFIA.darkForest.$tbodies.filter('[data-city="'+ cityKey +'"]'),
						$trs = $tbody.find('tr');

					$trs.toggle( checked );

					if( !checked ){
						if( KOCFIA.darkForest.$form.find('.city-toggles').find('input').filter(':checked').length === 0 ){
							KOCFIA.darkForest.$form.find('table').siblings('.buttons').hide();
						}
					} else {
						KOCFIA.darkForest.$form.find('table').siblings('.buttons').show();
					}
				})
				//builds management
				.on('click', '.builds .button', function(){
					var $this = $(this),
						rel = $this.attr('rel'),
						$tr = $this.closest('tr'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						$placeholder = $tbody.find('.form');

					var $form = $tr.find('.keep').clone();
					$form.find('button').parent().remove();

					var level = '<div><label for="kocfia-darkForest-form-'+ cityKey +'-level">Niveau :</label>';
					level += '<input type="number" required min="1" max="10" id="kocfia-darkForest-form-'+ cityKey +'-level" class="level"></div>';

					var knight = '<div><label for="kocfia-darkForest-form-knight-'+ cityKey +'">Chevalier :</label>';
					knight += '<select id="kocfia-darkForest-form-knight-'+ cityKey +'" class="knight-priority">';
					knight += '<option value="">N\'importe</option>';
					knight += '<option value="highest">Combat haut</option>';
					knight += '<option value="lowest">Combat bas</option>';
					knight += '</select></div>';

					var waves = '<div class="waves"><div class="wave"><h5>Vague</h5></div></div>',
						$units = $form.find('.units').detach();
					$units.find('input').val('');

					var buttons = '<div class="buttons">';
					buttons += '<button class="button secondary add"><span>Ajouter une vague</span></button>';
					buttons += '<button class="button modify minimize" title="Valide cette configuration et la déplace dans le résumé"><span>Appliquer et Réduire</span></button>';
					buttons += '<button class="button danger reset" title="Remet à zéro cette configuration"><span>Annuler</span></button>';
					buttons += '<button class="button danger delete" title="Supprime cette configuration"><span>Supprimer</span></button>';
					buttons += '</div>';

					var waveButtons = '<div class="buttons">';
					waveButtons += '<button class="button modify copy" title="Ajoute une nouvelle cette vague à partir de celle-ci"><span>Copier</span></button>';
					waveButtons += '<button class="button danger remove" title="Supprime cette vague"><span>Enlever</span></button>';
					waveButtons += '</div>';

					$form.removeClass('keep').addClass('form')
						.attr('colspan', 3)
						.find('h4').html('Configuration de l\'attaque')
						.end()
						.append( '<div class="detail"><h5>Détails</h5>'+ level + knight + buttons +'</div>' )
						.append( waves );

					$form.find('.wave')
						.append( waveButtons )
						.append( $units );

					$placeholder.replaceWith( $form );

					if( rel != 'empty' ){
						KOCFIA.darkForest.getBuildsConf( rel, $form );
					}
				})
				//empty wave add
				.on('click', '.detail .add', function(){
					var $form = $(this).closest('.form'),
						$waves = $form.find('.waves');

					var $wave = $waves.find('.wave').eq(0).clone();
					$wave.find('input').val('');

					$waves.append( $wave );
				})
				//check the rule, if ok transform and move it to the summary
				.on('click', '.detail .minimize', function(){
					var $form = $(this).closest('.form'),
						$waves = $form.find('.wave');

					var rule = {},
						errors = [];

					var $level = $form.find('.level');
					if( $level[0].checkValidity() ){
						rule.level = $level.val();
					} else {
						errors.push('Niveau non valide');
					}

					rule.knightPriority = $form.find('.knight-priority').val();

					var waves = [], i = 1, unitInfo, wave;
					$waves.each(function(){
						wave = {};
						$(this).find('input').each(function(){
							var $this = $(this),
								qty = $.trim( $(this).val() ),
								unit = this.name;
							if( qty !== '' ){
								qty = Shared.decodeFormat( qty );
								if( qty !== false ) wave[ unit ] = qty;
								else {
									unitInfo = KOCFIA.resourceInfo[ unit ];
									errors.push('Quantité invalide pour '+ unitInfo.labelBis + unitInfo.label +' de la vague '+ i);
								}
							}
						});
						if( !$.isEmptyObject(wave) ) waves.push( wave );
						else {
							errors.push('Aucune unité valide pour la vague '+ i);
						}
						i += 1;
					});

					if( waves.length > 0 && errors.length === 0 ){
						rule.waves = waves;

						var $summary = $form.closest('tbody').find('.summary');
							$rule = $summary.find('.rule').filter('[data-level="'+ rule.level +'"]');

						var line = '<div class="rule" data-level="'+ rule.level +'">';
						line += '<input type="checkbox" title="Configuration active ?" class="active" checked> ';
						line += 'FO'+ rule.level;
						line += ' | chevalier : ';
						if( rule.knightPriority === '' ) line += 'n\'importe';
						else if( rule.knightPriority == 'highest' ) line += 'combat haut';
						else line += 'combat bas';

						var wavesLength, unitsLength, j, k;
						for( i = 0, wavesLength = rule.waves.length; i < wavesLength; i += 1 ){
							line += ' | vague '+ (i + 1) + ' :';
							k = 0;
							for( j = 0; j < KOCFIA.troops.length; j += 1 ){
								unitInfo = KOCFIA.troops[j];
								unit = unitInfo.key;
								if( rule.waves[i].hasOwnProperty(unit) ){
									qty = rule.waves[i][ unit ];
									if( k > 0 ) line += ',';
									line += ' <span title="'+ unitInfo.label +' - '+ Shared.readable(qty) +'"><img src="'+ unitInfo.icon +'">'+ Shared.format(qty) +'</span>';
									k += 1;
								}
							}
						}

						line += '<button class="button modify edit" title="Modifier cette configuration"><span>Modifier</span></button>';
						line += '<button class="button danger remove" title="Supprimer cette configuration"><span>Supprimer</span></button>';
						line += '<button class="button secondary copy" title="Ajouter cette configuration aux autres villes, remplace une configuration du même niveau"><span>Copier</span></button>';

						line += '</div>';

						var $line = $(line);
						$line.data('rule', rule);

						if( $rule.length ){
							$rule.replaceWith( $line );
						} else {
							$summary.append( $line );
						}

						$form.find('.delete').trigger('click');
					} else {
						errors.push('Attaque invalide');
						Shared.notify( errors.unique() );
					}
				})
				//reset the rule form
				.on('click', '.detail .reset', function(){
					var $form = $(this).closest('.form'),
						$waves = $form.find('.waves');

					$waves.find('.wave').filter(':gt(0)').remove();

					$form.find('input').val('');
				})
				//delete the rule
				.on('click', '.detail .delete', function(){
					$(this).closest('.form').replaceWith('<td colspan="3" class="form"></td>');
					$('.tipsy').remove();
				})
				//delete the wave
				.on('click', '.wave .remove', function(){
					$(this).closest('.wave').remove();
					$('.tipsy').remove();
				})
				//delete the wave
				.on('click', '.wave .copy', function(){
					var $this = $(this),
						$wave = $this.closest('.wave').clone();

					$this.closest('.waves').append( $wave );
				})
				//edit the rule
				.on('click', '.rule .edit', function(){
					var $rule = $(this).closest('.rule'),
						$tbody = $rule.closest('tbody'),
						$form, $addWave, i, $inputs, wave, unit,
						rule = $rule.data('rule');

					$tbody.find('.builds').find('.button').filter('[rel="empty"]').trigger('click');
					$form = $tbody.find('.form');
					$addWave = $form.find('.detail').find('.add');

					$form
						.find('.level').val( $rule.data('level') ).end()
						.find('.knight-priority').val( rule.knightPriority );

					for( i = 1; i < rule.waves.length; i += 1 ){
						$addWave.trigger('click');
					}

					$form.find('.wave').each(function(i){
						$inputs = $(this).find('input');
						wave = rule.waves[i];

						for( unit in wave ){
							if( wave.hasOwnProperty(unit) ){
								$inputs.filter('[name="'+ unit +'"]').val( wave[ unit ] );
							}
						}
					});
				})
				//remove rule
				.on('click', '.rule .remove', function(){
					$(this).closest('.rule').remove();
					$('.tipsy').remove();
				})
				//copy rule in other cities
				.on('click', '.rule .copy', function(){
					var $rule = $(this).closest('.rule'),
						level = $rule.attr('data-level'),
						active = $rule.find('.active').prop('checked'),
						$otherTbodies = $rule.closest('tbody').siblings('tbody'),
						$check, $summary, $clone;

					$otherTbodies.each(function(){
						$summary = $(this).find('.summary');
						$check = $summary.find('.rule').filter('[data-level="'+ level +'"]');
						$clone = $rule.clone(true);
						$clone.find('.active').prop('checked', active );

						if( $check.length ){
							$check.replaceWith( $clone );
						} else {
							$summary.append( $clone );
						}
					});
				})
				//copy keep in other cities
				.on('click', '.keep .copy', function(){
					var $keep = $(this).closest('.keep'),
						$otherTbodies = $keep.closest('tbody').siblings('tbody'),
						$clone;

					$otherTbodies.each(function(){
						$(this).find('.keep').replaceWith( $keep.clone(true) );
					});
				})
				//stop on next round
				.on('click', '.stop', function(){
					if( confirm('Etes-vous sûr ?') ){
						$(this).closest('tr').data('stop', 1).data('attack');
					}
				})
				//remove ongoing attack info line
				.on('click', '.trash', function(){
					var $tbody = $(this).closest('tbody');
					$('#kocfia-'+ this.module +'-history').append( $tbody.find('.info').find('div') );
					$tbody[0].innerHTML = '';
					$('.tipsy').remove();
				});
		};

		KOCFIA.darkForest.checkTarget = function(marchId, cityKey, coord, level, attempts){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('darkForest') ) console.info('KOCFIA darkForest checkTarget function', marchId, coord, level);
			var cParams = jQuery.extend(true, {}, window.g_ajaxparams);

			//check if darkForest level has changed
			cParams.blocks = "bl_" + coord[0] + "_bt_" + coord[1];
			$.ajax({
				url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
				type: 'post',
				data: cParams,
				dataType: 'json',
				timeout: 10000
			})
			.done(function(result){
				if( result.data ){
					var info = result.data['l_'+ coord[0] +'_t_'+ coord[1]];
					//recall march if the current level is superior to the level recorded on launch
					if( info && parseInt(info.tileLevel, 10) > parseInt(level, 10) ){
						window.attack_recall( marchId, 2, cityKey );
					}
				} else {
					attempts -= 1;
					if( attempts > 0 ){
						KOCFIA.darkForest.checkTarget(marchId, cityKey, coord, level, attempts);
					}
				}
			})
			.fail(function(){
				attempts -= 1;
				if( attempts > 0 ){
					KOCFIA.darkForest.checkTarget(marchId, cityKey, coord, level, attempts);
				}
			});
		};

	/* WILDERNESS - extend autoAttack */
		KOCFIA.wilderness = {
			module: 'wilderness'
		};

		KOCFIA.wilderness.getBuildsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuilds function');
			var builds = '<fieldset class="builds fl">';
			builds += '<legend>Attaques types</legend>';
			builds += '<div>';
			builds += '<button class="build button secondary" rel="empty"><span>Vide</span></button>';
			builds += '<button class="build button secondary" rel="1" title="Miliciens"><span>TS1</span></button>';
			builds += '<button class="build button secondary" rel="1bis" title="Archers"><span>TS1 (emp1)</span></button>';
			builds += '<button class="build button secondary" rel="2" title="v1 Miliciens - v2 Archers"><span>TS2 (emp2)</span></button>';
			builds += '<button class="build button secondary" rel="3" title="v1 Miliciens - v2 Archers"><span>TS3 (emp3)</span></button>';
			builds += '<button class="build button secondary" rel="4" title="v1 Miliciens - v2 Archers"><span>TS4 (emp4)</span></button>';
			builds += '<button class="build button secondary" rel="5" title="v1 Miliciens - v2 Archers"><span>TS5 (emp5)</span></button>';
			builds += '<button class="build button secondary" rel="5bis" title="v1 Miliciens - v2 Archers"><span>TS5 (emp6)</span></button>';
			builds += '<button class="build button secondary" rel="6" title="v1 Miliciens - v2 Archers"><span>TS6 (emp6)</span></button>';
			builds += '<button class="build button secondary" rel="6bis" title="v1 Miliciens - v2 Archers"><span>TS6 (emp7)</span></button>';
			builds += '<button class="build button secondary" rel="7" title="v1 Miliciens - v2 Archers"><span>TS7 (emp8)</span></button>';
			builds += '<button class="build button secondary" rel="8" title="v1 Miliciens + Balistes - v2 Archers + Balistes"><span>TS8 (emp9)</span></button>';
			builds += '<button class="build button secondary" rel="8bis" title="v1 Miliciens + Balistes - v2 Archers + Balistes"><span>TS8 (emp9)</span></button>';
			builds += '<button class="build button secondary" rel="9" title="v1 Miliciens + Balistes - v2 Archers + Balistes"><span>TS9 (emp 9)</span></button>';
			builds += '<button class="build button secondary" rel="9bis" title="v1 Miliciens + Balistes - v2 Archers + Balistes"><span>TS9 (emp10)</span></button>';
			builds += '<button class="build button secondary" rel="9rd" title="v1 Miliciens + Balistes - v2 Archers + Balistes"><span>TS9 (emp10)</span></button>';
			builds += '<button class="build button secondary" rel="10" title="v1 Miliciens - v2 Archers"><span>TS10 (emp10)</span></button>';
			builds += '<button class="build button secondary" rel="10bis" title="v1 Miliciens + Catapulte - v2 Archers + Catapultes"><span>TS10 (emp10)</span></button>';
			builds += '</div>';
			builds += '</fieldset>';

			return builds;
		};

		KOCFIA.wilderness.getBuildsConf = function($level, $uChoices, $uQuantity, rel){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuildsConf function');
			switch( rel ){
				case '1':
						$level.val( 1 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('160');
					break;
				case '1bis':
						$level.val( 1 );
						//wave 1
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('80');
					break;
				case '2':
						$level.val( 2 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('5');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('130');
					break;
				case '3':
						$level.val( 3 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('10');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('520');
					break;
				case '4':
						$level.val( 4 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('20');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('1.6k');
					break;
				case '5':
						$level.val( 5 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('50');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('2.5k');
					break;
				case '5bis':
						$level.val( 5 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('50');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('2.2k');
					break;
				case '6':
						$level.val( 6 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('100');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('4.2k');
					break;
				case '6bis':
						$level.val( 6 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('100');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('3k');
					break;
				case '7':
						$level.val( 7 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('150');
						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('6k');
					break;
				case '8':
						$level.val( 8 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('299');
						$uChoices.eq(1).val('unt10');
						$uQuantity.eq(1).val('1');

						//wave 2
						$uChoices.eq(2).val('unt10');
						$uQuantity.eq(2).val('800');
						$uChoices.eq(3).val('unt6');
						$uQuantity.eq(3).val('10k');
					break;
				case '8bis':
						$level.val( 8 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('299');
						$uChoices.eq(1).val('unt10');
						$uQuantity.eq(1).val('1');

						//wave 2
						$uChoices.eq(2).val('unt10');
						$uQuantity.eq(2).val('900');
						$uChoices.eq(3).val('unt6');
						$uQuantity.eq(3).val('9k');
					break;
				case '9':
						$level.val( 9 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('599');
						$uChoices.eq(1).val('unt10');
						$uQuantity.eq(1).val('1');

						//wave 2
						$uChoices.eq(2).val('unt10');
						$uQuantity.eq(2).val('2.5k');
						$uChoices.eq(3).val('unt6');
						$uQuantity.eq(3).val('40k');
					break;
				case '9bis':
						$level.val( 9 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('599');
						$uChoices.eq(1).val('unt10');
						$uQuantity.eq(1).val('1');

						//wave 2
						$uChoices.eq(2).val('unt10');
						$uQuantity.eq(2).val('1.6k');
						$uChoices.eq(3).val('unt6');
						$uQuantity.eq(3).val('15k');
					break;
				case '9rd':
						$level.val( 9 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('599');
						$uChoices.eq(1).val('unt10');
						$uQuantity.eq(1).val('1');

						//wave 2
						$uChoices.eq(2).val('unt10');
						$uQuantity.eq(2).val('900');
						$uChoices.eq(3).val('unt6');
						$uQuantity.eq(3).val('13k');
					break;
				case '10':
						$level.val( 10 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('1199');

						//wave 2
						$uChoices.eq(1).val('unt2');
						$uQuantity.eq(1).val('1');
						$uChoices.eq(2).val('unt6');
						$uQuantity.eq(2).val('69999');
					break;
				case '10bis':
						$level.val( 10 );
						//wave 1
						$uChoices.eq(0).val('unt2');
						$uQuantity.eq(0).val('1199');
						$uChoices.eq(1).val('unt12');
						$uQuantity.eq(1).val('1');

						//wave 2
						$uChoices.eq(2).val('unt12');
						$uQuantity.eq(2).val('2.5k');
						$uChoices.eq(3).val('unt6');
						$uQuantity.eq(3).val('35k');
					break;
				default: break;
			}
		};

	/* BARBARIAN - extend autoAttack */
		KOCFIA.barbarian = {
			module: 'barbarian'
		};

		KOCFIA.barbarian.getBuildsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuilds function');
			var builds = '<fieldset class="builds fl">';
			builds += '<legend>Attaques types</legend>';
			builds += '<div>';
			builds += '<button class="build button secondary" rel="empty"><span>Vide</span></button>';
			builds += '<button class="build button secondary" rel="1"><span>CB1</span></button>';
			builds += '<button class="build button secondary" rel="2"><span>CB2</span></button>';
			builds += '<button class="build button secondary" rel="3"><span>CB3</span></button>';
			builds += '<button class="build button secondary" rel="4"><span>CB4</span></button>';
			builds += '<button class="build button secondary" rel="5"><span>CB5</span></button>';
			builds += '<button class="build button secondary" rel="6"><span>CB6</span></button>';
			builds += '<button class="build button secondary" rel="7"><span>CB7</span></button>';
			builds += '<button class="build button secondary" rel="7bis"><span>CB7 (emp 11)</span></button>';
			builds += '<button class="build button secondary" rel="8"><span>CB8</span></button>';
			builds += '<button class="build button secondary" rel="9"><span>CB9</span></button>';
			builds += '<button class="build button secondary" rel="10"><span>CB10</span></button>';
			builds += '</div>';
			builds += '</fieldset>';

			return builds;
		};

		KOCFIA.barbarian.getBuildsConf = function($level, $uChoices, $uQuantity, rel){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuildsConf function');
			switch( rel ){
				case '1':
						$level.val( 1 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('250');
						$uChoices.eq(1).val('unt9');
						$uQuantity.eq(1).val('50');
					break;
				case '2':
						$level.val( 2 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('2.1k');
						$uChoices.eq(1).val('unt9');
						$uQuantity.eq(1).val('40');
					break;
				case '3':
						$level.val( 3 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('3.5k');
						$uChoices.eq(1).val('unt9');
						$uQuantity.eq(1).val('50');
					break;
				case '4':
						$level.val( 4 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('7.5k');
						$uChoices.eq(1).val('unt9');
						$uQuantity.eq(1).val('75');
					break;
				case '5':
						$level.val( 5 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('16k');
					break;
				case '6':
						$level.val( 6 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('35k');
					break;
				case '7':
						$level.val( 7 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('47k');
					break;
				case '7bis':
						$level.val( 7 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('40k');
					break;
				case '8':
						$level.val( 8 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('90k');
						$uChoices.eq(1).val('unt12');
						$uQuantity.eq(1).val('1k');
					break;
				case '9':
						$level.val( 9 );
						$uChoices.eq(0).val('unt6');
						$uQuantity.eq(0).val('45k');
						$uChoices.eq(1).val('unt10');
						$uQuantity.eq(1).val('45k');
					break;
				case '10':
						$level.val( 10 );
						$uChoices.eq(0).val('unt12');
						$uQuantity.eq(0).val('125k');
					break;
				default: break;
			}
		};

	/* PLUNDER - extend autoAttack */
		KOCFIA.plunder = {
			module: 'plunder',
			timestamps: {}
		};

		KOCFIA.plunder.getBuildsList = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuilds function');
			var builds = '<fieldset class="builds fl">';
			builds += '<legend>Attaques types</legend>';
			builds += '<div>';
			builds += '<button class="build button secondary" rel="empty"><span>Vide</span></button>';
			builds += '<button class="build button secondary" rel="1"><span>Cavalerie</span></button>';
			builds += '<button class="build button secondary" rel="2"><span>Cavalerie Lourde</span></button>';
			builds += '<button class="build button secondary" rel="3"><span>Wagon</span></button>';
			builds += '</div>';
			builds += '</fieldset>';

			return builds;
		};

		KOCFIA.plunder.getBuildsConf = function($level, $uChoices, $uQuantity, rel){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' getBuildsConf function');
			switch( rel ){
				case '1':
						$uChoices.eq(0).val('unt7');
						$uQuantity.eq(0).val('100k');
					break;
				case '2':
						$uChoices.eq(0).val('unt8');
						$uQuantity.eq(0).val('100k');
					break;
				case '3':
						$level.val( 3 );
						$uChoices.eq(0).val('unt9');
						$uQuantity.eq(0).val('25k');
					break;
				default: break;
			}
		};

	/* SCOUT - extend autoAttack */
		KOCFIA.scout = {
			module: 'scout'
		};

		KOCFIA.scout.getHelp = function(){
			var help = '<div id="kocfia-'+ this.module +'-help" class="help" title="Aide '+ KOCFIA.modulesLabel[ this.module ] +'">';
			help += '<h4>Informations et limitations :</h4>';
			help += '<ul>';
			help += '<li>Les éclairages sauvegardés peuvent être lancés manuellement ou en activant les éclairages automatiques</li>';
			help += '<li>Pour le formulaire les erreurs seront listées au-dessus</li>';
			help += '<li>Lors du démarrage du mode automatique, 20 secondes s\'écoulent entre chaque lancement de plan d\'éclairage sauvegardé</li>';
			help += '<li>Dix secondes s\'écoulent entre chaque lancement de vague</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '</ul>';
			help += '<h4>Méthode :</h4>';
			help += '<ol>';
			help += '<li>Sélectionner une ou plusieurs villes</li>';
			help += '<li>Spécifier une ou plusieurs coordonnées (séparées par un retour à la ligne, sous le format x,y)</li>';
			help += '<li>Spécifier combien de places conserver dans le point de ralliement (optionnel)</li>';
			help += '<li>Spécifier les quantités d\'éclaireurs à envoyer par éclairage (optionnel)</li>';
			help += '<li>Les quantités peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2m pour deux millions, 3g pour trois milliards)</li>';
			help += '<li>Spécifier les quantités d\'éclaireurs à conserver (optionnel)</li>';
			help += '</ol>';
			help += '</div>';

			return help;
		};

		KOCFIA.scout.getHeader = function(){
			var header = '<div class="infos">';
			header += '<span class="buttonset"><input type="checkbox" id="'+ this.module +'-panel-automatic" '+ (KOCFIA.conf[ this.module ].automatic ? 'checked' : '') +' autocomplete="off" />';
			header += '<label for="'+ this.module +'-panel-automatic">éclairages automatiques</label></span>';
			header += '<button class="button secondary history-toggle" title="Historique des '+ KOCFIA.modulesLabel[ this.module ] +'"><span>Historique</span></button>';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div>';

			return header;
		};

		KOCFIA.scout.getForm = function(){
			var form = '<h3>Configurer un éclairage</h3>';
			form += '<div class="attack-form">';

			//form edit inputs
			form += '<input type="hidden" class="edit-attackId" name="attackId" value="" autocomplete="off" />';

			var checkBoxes = '', units = '', keeps = '', cityKey, city;
			form += '<table>';
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[cityKey];

					checkBoxes += '<td class="buttonset">';
					checkBoxes += '<input id="kocfia-'+ this.module +'-'+ cityKey +'" name="city" value="'+ cityKey +'" type="checkbox" class="city-choice" autocomplete="off" required>';
					checkBoxes += '<label for="kocfia-'+ this.module +'-'+ cityKey +'">'+ city.label +'</label>';
					checkBoxes += '</td>';

					units += '<td><input class="unit-qty" name="'+ cityKey +'" type="text" autocomplete="off" required pattern="'+ Shared.numberRegExp +'" placeholder="1.2k"></td>';
					keeps += '<td><input class="unit-qty" name="'+ cityKey +'" type="text" autocomplete="off" pattern="'+ Shared.numberRegExp +'" placeholder="1.2k"></td>';
				}
			}
			form += '<tbody>';
			form += '<tr class="cities"><td>Depuis :</td>';
			form += checkBoxes + '</tr>';
			form += '<tr class="quantities"><td>Quantité :</td>';
			form += units + '</tr>';
			form += '<tr class="keeps"><td>Conserver :</td>';
			form += keeps + '</tr>';
			form += '<tr><td>Garder :</td>';
			form += '<td colspan="99">';
			form += '<input type="number" class="rallypointSlot" required min="0" max="11" value="0"> place(s) dans le point de ralliement</td>';
			form += '</td></tr>';
			form += '<tr><td>Coordonnées :</td>';
			form += '<td colspan="99">';
			form += '<small>Format: x,y. Soit en ligne séparées par un espace, soit en colonne séparées par un retour à la ligne.</small>';
			form += '<textarea name="coords" autocomplete="off" required placeholder="x,y"></textarea>';
			form += '</td></tr>';
			form += '</tbody></table>';

			//buttons
			form += '<button class="launch button secondary">Lancer</button>';
			form += '<button class="save button modify">Sauvegarder</button>';
			form += '<button class="saveAndLaunch button modify">Sauvegarder et Lancer</button>';
			form += '<button class="reset button danger">Annuler</button>';

			form += '</div>';

			return form;
		};

		KOCFIA.scout.getListsTemplate = function(){
			//attacks list
				var onGoing = '<h3>Eclairage en cours</h3>';
				onGoing += '<div class="attack-list ongoing">';
				onGoing += '<table><thead><tr>';
				onGoing += '<th class="trip">Détails</th>';
				onGoing += '<th class="coords">Coordonnées</th>';
				onGoing += '<th class="current">Cible</th>';
				onGoing += '<th class="info">Info</th>';
				onGoing += '</tr></thead>';
				onGoing += '<tbody></tbody></table></div>';

			//attacks plan
				var savedPlans = '<h3>Eclairages enregistrées</h3>';
				savedPlans += '<div class="attack-list saved">';
				savedPlans += '<table><thead><tr>';
				savedPlans += '<th class="trip">Détails</th>';
				savedPlans += '<th class="coords">Coordonnées</th>';
				savedPlans += '</tr></thead>';
				savedPlans += '<tbody></tbody></table></div>';

			return savedPlans + onGoing;
		};

		KOCFIA.scout.addSectionListeners = function(){
			var module = this.module;
			KOCFIA.$confPanel.find('#kocfia-'+ this.module)
				.on('change', '#'+ module +'-panel-automatic', function(){
					var checked = $(this).prop('checked');
					$('#'+ module +'-automatic').prop('checked', checked).change();
					if( checked ) KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
				})
				//reset form
				.on('click', '.reset', function(){
					var $inputs = KOCFIA[ module ].$form.find('input');

					$inputs.filter('[type="checkbox"]').prop('checked', false);
					$inputs.filter('[type="text"], [type="number"], [type="hidden"]').val('');
					KOCFIA[ module ].$form.find('textarea').val('');
				})
				//launch
				.on('click', '.launch', function(){
					var result = KOCFIA[ module ].planAttack();

					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						result.attack.id = Math.floor( Date.timestamp() );
						KOCFIA[ module ].launchAttack( result.attack );

						//open ongoing accordion
						KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
					}
				})
				//save
				.on('click', '.save, .saveAndLaunch', function(){
					var result = KOCFIA[ module ].planAttack();

					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						var editAttackId = KOCFIA[ module ].$form.find('.edit-attackId').val();
						if( editAttackId !== '' ){
							KOCFIA[ module ].deletePlan( editAttackId, false );

							KOCFIA[ module ].$saved.find('tbody')
								.find('tr').filter('[data-attack="'+ editAttackId +'"]')
								.remove();
						}

						result.attack.id = Math.floor( Date.timestamp() );

						KOCFIA[ module ].attacks[ result.attack.id ] = result.attack;

						KOCFIA[ module ].$saved.find('tbody')
							.append( KOCFIA[ module ].attackInfo( result.attack ) );

						KOCFIA[ module ].storeAttacks();

						KOCFIA[ module ].$form.find('.reset').trigger('click');

						if( $(this).hasClass('saveAndLaunch') ){
							KOCFIA[ module ].launchAttack( result.attack );

							//open ongoing accordion
							KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
						} else {
							//open saved accordion
							KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 1);
						}
					}
				})
				//attack plan delete
				.on('click', '.delete', function(){
					if( confirm('Etes-vous sûr ?') ){
						var $this = $(this),
							$tr = $(this).closest('tr'),
							attackId = $tr.data('attack');

						KOCFIA[ module ].deletePlan( attackId, true );
						$tr.remove();
					}
				})
				//attack plan edit and duplication
				.on('click', '.edit, .duplicate', function(){
					//reset
					var $inputs = KOCFIA[ module ].$form.find('input');

					$inputs.filter('[type="checkbox"]').prop('checked', false);
					$inputs.filter('[type="text"]').val('');
					KOCFIA[ module ].$form.find('textarea').val('');

					var $this = $(this),
						$tr = $this.closest('tr'),
						attackId = $tr.data('attack'),
						attack = KOCFIA[ module ].attacks[ attackId ],
						cityKey;

					if( attack ){
						KOCFIA[ module ].$form.find('.edit-attackId').val( $this.hasClass('edit') ? attack.id : '' );

						var $checkBoxes = KOCFIA[ module ].$form.find('.cities').find('input');
						$checkBoxes.each(function(){
							var $cb = $(this);
							if( $.inArray($cb.val(), attack.cities) > -1 ) $cb.prop('checked', true);
						});

						var $quantities = KOCFIA[ module ].$form.find('.quantities').find('input');
						$quantities.each(function(){
							cityKey = this.name;
							if( attack.units.hasOwnProperty( cityKey ) ){
								this.value = Shared.format(attack.units[ cityKey ]);
							}
						});

						var $keeps = KOCFIA[ module ].$form.find('.keeps').find('input');
						$keeps.each(function(){
							cityKey = this.name;
							if( attack.units.hasOwnProperty( cityKey ) ){
								this.value = Shared.format(attack.keeps[ cityKey ]);
							}
						});

						KOCFIA[ module ].$form.find('textarea').val(attack.coords.join("\n"));
						KOCFIA[ module ].$form.find('.rallypointSlot').val(attack.rpSlot);

						//open form accordion
						KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 0);
					} else {
						alert('Plan d\'attaque introuvable.');
					}
				})
				//stop on next round
				.on('click', '.stop', function(){
					if( confirm('Etes-vous sûr ?') ){
						var $this = $(this),
							attackId = $this.closest('tr').data('stop', 1).data('attack');
						$this.find('span').html('Arrêt en cours');

						if( KOCFIA[ module ].attacks.hasOwnProperty( attackId )
							&& KOCFIA[ module ].attacks[ attackId ].hasOwnProperty('timeout')
							&& KOCFIA[ module ].attacks[ attackId ].timeout
						){
							window.clearTimeout(KOCFIA[ module ].attacks[ attackId ].timeout);
							KOCFIA[ module ].refreshOngoingInfo(KOCFIA[ module ].attacks[ attackId ], true, 'Eclairage stoppé sur demande.');
						}

						KOCFIA[ module ].$saved.find('tr').filter('[data-attack="'+ attackId +'"]').find('.charge').show();
					}
				})
				//manual launch
				.on('click', '.charge', function(){
					if( KOCFIA.conf[ module ].active ){
						if( !KOCFIA.conf[ module ].automatic ){
							var $tr = $(this).hide().closest('tr');
							var attack = KOCFIA[ module ].attacks[ $tr.data('attack') ];
							if( attack ){
								attack.coordIndex = 0;
								attack.marching = [];
								KOCFIA[ module ].refreshOngoingInfo( attack, false );
								KOCFIA[ module ].launchAttack( attack );

								//open ongoing accordion
								KOCFIA[ module ].$accordion.accordion('activate', false).accordion('activate', 2);
							} else {
								alert('Plan d\'attaque introuvable.');
							}
						} else {
							alert('Le mode automatic est activé. Le lancement d\'attaque sauvegardée est bloqué (attaque déjà en cours).');
						}
					} else {
						alert('Le module n\'est pas actif. Les lancements d\'attaques sont bloqués.');
					}
				})
				//remove ongoing attack info line
				.on('click', '.trash', function(){
					var $tr = $(this).closest('tr');
					$('#kocfia-'+ this.module +'-history').append( $tr.find('.info').find('div') );
					$tr.remove();
					$('.tipsy').remove();
				});
		};

		KOCFIA.scout.deletePlan = function( attackId, save ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' deletePlan function', attackId, save);
			delete KOCFIA[ this.module ].attacks[ attackId ];

			if( save ) KOCFIA[ this.module ].storeAttacks();
		};

		KOCFIA.scout.attackInfo = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' attackInfo function', attack);

			var code = '<tr data-attack="'+ attack.id +'">';
			code += '<td class="trip">';
			var cityKey, city, i;
			for( i = 0; i < attack.cities.length; i += 1 ){
				cityKey= attack.cities[i];
				city = KOCFIA.cities[ cityKey ];

				code += '<div>';
				code += city.label + ': ';
				code += Shared.format( attack.units[ cityKey ] );
				if( attack.keeps.hasOwnProperty(cityKey) ){
					code += ' ('+ Shared.format( attack.keeps[ cityKey ] ) +')';
				}
				code += '</div>';
			}
			code += '<div>Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '') +'</div>';
			code += '<div>'+ attack.coords.length +' coordonnée(s)</div>';
			code += '<div><button class="charge button" title="Lancer cette configuration"><span>Lancer</span></button></div>';
			code += '<div><button class="edit button secondary" title="Modifier cette configuration"><span>Modifier</span></button>';
			code += '<button class="duplicate button secondary" title="Créer une nouvelle configuration à partir de celle-ci"><span>Copier</span></button></div>';
			code += '<div><button class="delete button danger" title="Supprimer cette configuration"><span>Supprimer</span></button>';
			code += '</div></td>';
			code += '<td class="coords">' + Shared.mapLink( attack.coords ) +'</td>';
			code += '</tr>';

			return code;
		};

		KOCFIA.scout.listAttacks = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' listAttacks function');
			if( KOCFIA[ this.module ].hasOwnProperty('$saved') ){
				var $tbody = KOCFIA[ this.module ].$saved.find('tbody');
				$tbody.html('');

				var code = '', a;
				if( !$.isEmptyObject(KOCFIA[ this.module ].attacks) ){
					for( a in KOCFIA[ this.module ].attacks ){
						if( KOCFIA[ this.module ].attacks.hasOwnProperty(a) ){
							code += KOCFIA[ this.module ].attackInfo( KOCFIA[ this.module ].attacks[a] );
						}
					}
				}

				$tbody.append( code );
			}
		};

		KOCFIA.scout.refreshOngoingInfo = function(attack, stopped, msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' refreshOngoingInfo function');

			var $tr = KOCFIA.scout.$ongoing.find('tbody').find('tr').filter('[data-attack="'+ attack.id +'"]'),
				$trash = $tr.find('.trash');
			if( $tr.length === 0 || $trash.length ){
				if( $trash.length ) $tr.remove();
				var code = '<tr data-attack="'+ attack.id +'" data-stop="0">';
				code += '<td class="trip">';

				var cityKey, city, i;
				code += '<div>';
				code += '<button class="stop button danger" title="Arrêter l\'éclairage"><span>Arrêter</span></button>';
				code += '</div>';
				for( i = 0; i < attack.cities.length; i += 1 ){
					cityKey = attack.cities[i];
					city = KOCFIA.cities[ cityKey ];

					code += '<div>';
					code += city.label + ': ';
					code += Shared.format( attack.units[ cityKey ] );
					if( attack.keeps.hasOwnProperty(cityKey) ){
						code += ' ('+ Shared.format( attack.keeps[ cityKey ] ) +')';
					}
					code += '</div>';
				}
				code += '<div>Garder '+ attack.rpSlot +' place'+ (attack.rpSlot > 1 ? 's' : '') +'</div>';
				code += '</td><td class="coords">' + Shared.mapLink( attack.coords ) +'</td>';
				code += '<td class="current"></td>';
				code += '<td class="info"></td>';
				code += '</tr>';

				$tr = $( code );

				KOCFIA[ this.module ].$ongoing.find('tbody').append( $tr );
			}

			//attack stopped
			if( !stopped ){
				$tr.find('.current').html( Shared.mapLink( attack.coords[ attack.coordIndex ] ) + '<br>' + (attack.coordIndex + 1) + 'e / ' + attack.coords.length );
			} else {
				$tr.find('.stop').toggleClass('stop trash secondary danger')
					.find('span').html('Enlever');
			}

			//clean old messages
			var timestamp = Date.timestamp(),
				obsolete = 5 * 60 * 1000,
				msgTimestamp;
			$msg = $tr.find('.info').find('div');
			if( $msg.length > 9 ){
				//keep one for td width
				KOCFIA[ this.module ].$history.append( $msg.filter(':lt(9)') );
			}
			$msg.each(function(){
				var $div = $(this);
				msgTimestamp = $div.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					KOCFIA[ this.module ].$history.append( $div );
				}
			});

			if( !$.isEmptyObject(msg) ){
				$tr.find('.info').append('<div data-timestamp="'+ timestamp +'">'+ msg +'</div>');
			}
		};

		KOCFIA.scout.planAttack = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty( this.module ) ) console.info('KOCFIA '+ this.module +' planAttack function');
			var errors = [],
				regexp = /[^0-9, ]/,
				rule;

			//check form
				var $checkBoxes = KOCFIA[ this.module ].$form.find('.cities').find('input').filter(':checked'),
					cities = $checkBoxes.map(function(){ return this.value; }).get();

				if( cities.length === 0 ){
					errors.push('Au moins une ville sélectionnée est nécessaire.');
				}

				var $quantities = KOCFIA[ this.module ].$form.find('.quantities').find('input'),
					units = {}, q, cityKey;
				$quantities.each(function(i, input){
					q = $.trim( input.value );
					if( q !== '' ){
						q = Shared.decodeFormat( q );
						cityKey = input.name;

						if( q === false || q < 1 ){
							errors.push('Au moins une des quantités pour éclairer est invalide.');
						} else {
							units[ cityKey ] = q;
						}
					}
				});

				if( $.isEmptyObject(units) ){
					errors.push('Au moins une quantité pour éclairer est nécessaire.');
				}

				var $keeps = KOCFIA[ this.module ].$form.find('.keeps').find('input'),
					keeps = {};
				$keeps.each(function(i, input){
					q = $.trim( input.value );
					if( q !== '' ){
						q = Shared.decodeFormat( q );
						cityKey = input.name;

						if( q === false || q < 1 ){
							errors.push('Au moins une des quantités à conserver est invalide.');
						} else {
							keeps[ cityKey ] = q;
						}
					}
				});

				//coords
				var coord,
					coords = $.trim( KOCFIA[ this.module ].$form.find('textarea').val().replace(/\n/g, ' ') );
				if( coords.length === 0 ){
					errors.push('Au moins une coordonnée est requise.');
				} else if( regexp.test( coords ) ){
					errors.push('Pour les coordonnées, veuillez respecter le format x,y avec un saut de ligne ou un espace entre deux coordonnées.');
				} else {
					coords = coords.split(' ');
					var wrongGPS = false, i, length = coords.length;
					for( i = 0; i < length; i += 1 ){
						wrongGPS = Shared.checkCoord( coords[i] ) === false;
						if( wrongGPS ) break;
					}
					if( wrongGPS ){
						errors.push('Au moins une des coordonnées est erronée.');
					}
				}

				//rally point free slot
				var rps = $.trim(KOCFIA[ this.module ].$form.find('.rallypointSlot').val());
				if( rps === '' ) rps = 0;
				rps = parseInt( rps, 10 );
				if( isNaN(rps) || rps < 0 ){
					errors.push('Le nombre de places à conserver dans le point de ralliement doit être un chiffre positif.');
				}

				if( errors.length ){
					errors = errors.unique();
				}

				rule = {cities: cities, units: units, keeps: keeps, category: this.module, type: 'scout', rpSlot: rps, coords: coords};

			return {attack: rule, errors: errors};
		};

	/* NOTEPAD */
		KOCFIA.notepad = {
			options: {
				active: 1,
				visible: 0,
				moveable: 1,
				position: {top: 10, left: 10},
				size: {width: 300, height: 280}
			},
			stored: ['notes'],
			notes: {}
		};

		KOCFIA.notepad.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.notepad +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('notepad', 'active', 'Activer', KOCFIA.conf.notepad.active);
			code += Shared.generateButton('notepad', 'resetPositionAndDimension', 'Remise à zéro de la position et des dimensions');
			code += Shared.generateButton('notepad', 'clean', 'Supprimer les notes');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.notepad.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad on function');
			var $notepad = $('<div id="kocfia-notepad" class="ui-widget ui-widget-content ui-corner-all">');

			var code = '<h3 class="title">Bloc Note</h3><div class="wrapper"><div class="content">';
			code += '<label for="kocfia-notepad-note-name">Nom de la note&nbsp;:&nbsp;</label>';
			code += '<input type="text" id="kocfia-notepad-note-name" />';
			code += '<br><label for="kocfia-notepad-note-text">';
			code += '<span class="charsLeft">1000 caractères restant</span>Contenu&nbsp;:&nbsp;</label>';
			code += '<textarea id="kocfia-notepad-note-text"></textarea>';
			code += '<br /><button class="save button modify">Enregistrer</button>';
			code += '<button class="cancel button secondary">Annuler</button>';

			code += '<h3>Notes :</h3><ul class="notes">';
			for( var n in KOCFIA.notepad.notes ){
				if( KOCFIA.notepad.notes.hasOwnProperty(n) ){
					var note = KOCFIA.notepad.notes[n];
					code += '<li><button class="button secondary" data-id="'+ n +'"><span>'+ note.name +'</span></button><span class="ui-icon ui-icon-trash"></span></li>';
				}
			}
			code += '</ul></div></div>';

			$notepad
				.append( '<span class="ui-icon ui-icon-close"></span>' )
				.append( code )
				.append( moveHandles )
				.draggable({
					handle: 'h3, .move-handle',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.notepad.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 200,
					minHeight: 200,
					handles: 'n, e, s, w, ne, se, sw, nw',
					resize: function(){
						KOCFIA.notepad.$wrapper.css('height', KOCFIA.notepad.calcInnerHeight());
					},
					stop: function(event, ui){
						KOCFIA.conf.notepad.size = ui.size;
						KOCFIA.conf.notepad.position = ui.position;
						Shared.storeConf();
					}
				})
				.css({
					top: KOCFIA.conf.notepad.position.top,
					left: KOCFIA.conf.notepad.position.left,
					width: KOCFIA.conf.notepad.size.width,
					height: KOCFIA.conf.notepad.size.height
				})
				.on('click', '.ui-icon-close', function(){
					KOCFIA.notepad.$div.hide();
					KOCFIA.conf.notepad.visible = 0;
					Shared.storeConf();
				})
				.on('click', '.save', function(){
					var name = $.trim( KOCFIA.notepad.$name.val() ),
						text = $.trim( KOCFIA.notepad.$textarea.val() );

					if( name.length ){
						if( text.length > 1000 ){
							alert('Texte trop long.');
						} else {
							var id = Math.floor( Date.timestamp() );
							KOCFIA.notepad.notes[ id ] = {name: name, text: text};
							KOCFIA.notepad.storeNotes();

							KOCFIA.notepad.$notes.append( '<li><button class="button secondary" data-id="'+ id +'"><span>'+ name +'</span></button><span class="ui-icon ui-icon-trash"></span></li>' );
						}
					} else {
						alert('Nom de la note invalide.');
					}
				})
				.on('click', '.cancel', function(){
					KOCFIA.notepad.$name.val('');
					KOCFIA.notepad.$textarea.val('');
				})
				.on('click', '.notes button', function(){
					KOCFIA.notepad.load( $(this).data('id') );
				})
				.on('click', '.notes .ui-icon-trash', function(){
					var $this = $(this);
					KOCFIA.notepad.deleteNote( $this.siblings().data('id') );
					$this.parent().remove();
				});

			$body.append( $notepad );

			KOCFIA.notepad.$div = $('#kocfia-notepad');
			KOCFIA.notepad.$title = KOCFIA.notepad.$div.find('.title');
			KOCFIA.notepad.$notes = KOCFIA.notepad.$div.find('.notes');
			KOCFIA.notepad.$wrapper = KOCFIA.notepad.$div.find('.wrap');
			KOCFIA.notepad.$name = $('#kocfia-notepad-note-name');
			KOCFIA.notepad.$textarea = $('#kocfia-notepad-note-text');
			KOCFIA.notepad.$charsLeft = KOCFIA.notepad.$div.find('.charsLeft');

			KOCFIA.notepad.$textarea[0].addEventListener('input', function(){
				var text = this.value,
					l = 1000 - parseFloat(text.length);
				if( l < 2 ){
					KOCFIA.notepad.$charsLeft.html(l + ' caractère restant');
				} else {
					KOCFIA.notepad.$charsLeft.html(l + ' caractères restant');
				}
			}, false);

			if( KOCFIA.conf.notepad.visible ){
				KOCFIA.notepad.$div.show();
				KOCFIA.notepad.$wrapper.css('height', KOCFIA.notepad.calcInnerHeight());
			}

			var $notepadToggle = $('<button id="kocfia-notepad-toggle" class="button secondary">').append( '<span>Bloc Note</span>' );
			$notepadToggle.click(function(){
				KOCFIA.notepad.$div.toggle();

				KOCFIA.conf.notepad.visible = (KOCFIA.notepad.$div.is(':visible') ? 1 : 0);

				if( KOCFIA.conf.notepad.visible ) KOCFIA.notepad.$wrapper.css('height', KOCFIA.notepad.calcInnerHeight());

				Shared.storeConf();
			});

			KOCFIA.$buttons.append($notepadToggle);
		};

		KOCFIA.notepad.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad off function');
			KOCFIA.notepad.$div.remove();
			$('#kocfia-notepad-toggle').remove();
		};

		KOCFIA.notepad.calcInnerHeight = function(){
			return KOCFIA.notepad.$div.innerHeight() - KOCFIA.notepad.$title.height() - 15;
		};

		KOCFIA.notepad.resetPositionAndDimension = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad resetPositionAndDimension function');

			KOCFIA.notepad.$div.css({
				top: KOCFIA.notepad.options.position.top,
				left: KOCFIA.notepad.options.position.left,
				width: KOCFIA.notepad.options.size.width,
				height: KOCFIA.notepad.options.size.height
			});

			KOCFIA.conf.notepad.position.top = KOCFIA.notepad.options.position.top;
			KOCFIA.conf.notepad.position.left = KOCFIA.notepad.options.position.left;
			KOCFIA.conf.notepad.size.width = KOCFIA.notepad.options.size.width;
			KOCFIA.conf.notepad.size.height = KOCFIA.notepad.options.size.height;

			Shared.storeConf();
		};

		KOCFIA.notepad.clean = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad clean function');

			localStorage.setObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId, '');

			KOCFIA.notepad.$notes.html('');
		};

		KOCFIA.notepad.load = function( id ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad load function');

			if( KOCFIA.notepad.notes[id] ){
				KOCFIA.notepad.$name.val( KOCFIA.notepad.notes[id].name );
				KOCFIA.notepad.$textarea.val( KOCFIA.notepad.notes[id].text );
			} else {
				alert('Note introuvable.');
			}
		};

		KOCFIA.notepad.deleteNote = function( id ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('kocfia notepad delete function');
			delete KOCFIA.notepad.notes[id];
			KOCFIA.notepad.storeNotes();
		};

		KOCFIA.notepad.storeNotes = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('notepad') ) console.info('KOCFIA notepad storeNotes function');
			localStorage.setObject('kocfia_notepad_notes_' + KOCFIA.storeUniqueId, KOCFIA.notepad.notes);
		};

	/* SUMMARY */
		KOCFIA.summary = {
			options: {
				active: 1,
				visible: 0,
				moveable: 1,
				position: {top: 10, left: 10},
				size: {width: 300, height: 280}
			}
		};

		KOCFIA.summary.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('summary') ) console.info('KOCFIA summary confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.summary +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('summary', 'active', 'Activer', KOCFIA.conf.summary.active);
			code += Shared.generateButton('summary', 'resetPositionAndDimension', 'Remise à zéro de la position et des dimensions');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.summary.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('summary') ) console.info('KOCFIA summary on function');
			var $summary = $('<div id="kocfia-summary" class="ui-widget ui-widget-content ui-corner-all">');

			var code = '<h3 class="title">Résumé</h3><div class="wrap">';
			code += '<table><thead><tr><th>&nbsp;</th>';
			var i, length, city, cels = '', info;
			for( i = 0, length = KOCFIA.citiesKey.length; i < length; i += 1 ){
				if( KOCFIA.cities.hasOwnProperty(KOCFIA.citiesKey[ i ]) ){
					city = KOCFIA.cities[ KOCFIA.citiesKey[ i ] ];
					code += '<th title="'+ city.name +'">'+ city.roman +'</th>';
					cels += '<td></td>';
				}
			}
			cels += '<td></td>';
			code += '<th>Total</th></tr><tbody>';

			//troops
			var keys = ['unt2'];
			for( i = 0, length = keys.length; i < length; i += 1 ){
				info = KOCFIA.unitInfo[ keys[i] ];
				code += '<tr><td title="'+ info.label +' à l\'heure"><img src="'+ info.icon +'"> / h</td>'+ cels +'</tr>';
			}

			//population
			code += '<tr><td><img src="'+ KOCFIA.population[0].icon +'"> / h</td>'+ cels +'</tr>';
			//delta
			for( i = 0, length = keys.length; i < length; i += 1 ){
				info = KOCFIA.unitInfo[ keys[i] ];
				code += '<tr><td title="différence '+ info.label +'">&delta; <img src="'+ info.icon +'"></td>' + cels + '</tr>';
			}

			//hapiness
			code += '<tr><td title="'+ KOCFIA.population[2].label +'"><img src="'+ KOCFIA.population[2].icon +'"></td>'+ cels +'</tr>';

			//total training
			code += '<tr><td title="Total de la durée des formations">Form.</td>'+ cels +'</tr>';

			//population in training
			code += '<tr><td title="Somme de la population récupérable des formations en cours">&Sigma; <img src="'+ KOCFIA.population[0].icon +'"></td>'+ cels +'</tr>';

			//total stone
			code += '<tr><td title="Stock '+ KOCFIA.resourceInfo.rec3.labelBis + KOCFIA.resourceInfo.rec3.label +'"><img src="'+ KOCFIA.resourceInfo.rec3.icon +'"></td>'+ cels +'</tr>';

			//total ore
			code += '<tr><td title="Stock '+ KOCFIA.resourceInfo.rec4.labelBis + KOCFIA.resourceInfo.rec4.label +'"><img src="'+ KOCFIA.resourceInfo.rec4.icon +'"></td>'+ cels +'</tr>';

			code += '</tbody></table></div>';

			$summary
				.append( '<span class="ui-icon ui-icon-close"></span>' )
				.append( code )
				.append( moveHandles )
				.draggable({
					handle: 'h3, .move-handle',
					scroll: true,
					distance: 20,
					stop: function(event, ui){
						KOCFIA.conf.summary.position = ui.position;
						Shared.storeConf();
					}
				})
				.resizable({
					minWidth: 200,
					minHeight: 200,
					handles: 'n, e, s, w, ne, se, sw, nw',
					resize: function(event, ui){
						KOCFIA.summary.calcInnerSizes( ui.size );
					},
					stop: function(event, ui){
						KOCFIA.conf.summary.size = ui.size;
						KOCFIA.conf.summary.position = ui.position;
						Shared.storeConf();
					}
				})
				.css({
					top: KOCFIA.conf.summary.position.top,
					left: KOCFIA.conf.summary.position.left,
					width: KOCFIA.conf.summary.size.width,
					height: KOCFIA.conf.summary.size.height
				})
				.on('click', '.ui-icon-close', function(){
					KOCFIA.summary.$div.hide();
					KOCFIA.conf.summary.visible = 0;
					Shared.storeConf();
				});

			$body.append( $summary );

			$summary.tipsy({delegate: '[title], [original-title]', html: true});

			KOCFIA.summary.$div = $('#kocfia-summary');
			KOCFIA.summary.$wrapper = KOCFIA.summary.$div.find('.wrap');
			KOCFIA.summary.$title = KOCFIA.summary.$div.find('.title');
			KOCFIA.summary.$tds = KOCFIA.summary.$div.find('tbody').find('td');
			KOCFIA.summary.numCelsPerLine = KOCFIA.citiesKey.length + 2;

			if( KOCFIA.conf.summary.visible ){
				KOCFIA.summary.$div.show();
				KOCFIA.summary.calcInnerSizes( KOCFIA.conf.summary.size );
			}

			var $summaryToggle = $('<button id="kocfia-summary-toggle" class="button secondary">').append( '<span>Résumé</span>' );
			$summaryToggle.click(function(){
				KOCFIA.summary.$div.toggle();

				KOCFIA.conf.summary.visible = (KOCFIA.summary.$div.is(':visible') ? 1 : 0);

				if( KOCFIA.conf.summary.visible ) KOCFIA.summary.$wrapper.css('height', KOCFIA.summary.calcInnerSizes( KOCFIA.conf.summary.size ));

				Shared.storeConf();
			});

			KOCFIA.$buttons.append($summaryToggle);

			KOCFIA.summary.update();
		};

		KOCFIA.summary.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('summary') ) console.info('KOCFIA summary off function');
			KOCFIA.summary.$div.remove();
			$('#kocfia-summary-toggle').remove();
		};

		KOCFIA.summary.calcInnerSizes = function( size ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('summary') ) console.info('kocfia summary calcInnerSizes function');

			var tableH = size.height - KOCFIA.summary.$title.outerHeight(true) - 10; /* wrap bottom margin */
			KOCFIA.summary.$wrapper.css('height', tableH);
		};

		KOCFIA.summary.resetPositionAndDimension = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('summary') ) console.info('KOCFIA summary resetPositionAndDimension function');

			KOCFIA.summary.$div.css({
				top: KOCFIA.summary.options.position.top,
				left: KOCFIA.summary.options.position.left,
				width: KOCFIA.summary.options.size.width,
				height: KOCFIA.summary.options.size.height
			});

			KOCFIA.conf.summary.position.top = KOCFIA.summary.options.position.top;
			KOCFIA.conf.summary.position.left = KOCFIA.summary.options.position.left;
			KOCFIA.conf.summary.size.width = KOCFIA.summary.options.size.width;
			KOCFIA.conf.summary.size.height = KOCFIA.summary.options.size.height;

			Shared.storeConf();
		};

		KOCFIA.summary.update = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('summary') ) console.info('KOCFIA summary update function');
			if( !KOCFIA.conf.summary.active ) return;
			if( !KOCFIA.summary.hasOwnProperty('$tds') ) return;
			var i, b, l, t, length, nb, queue, keys,
				popPerHour, hapiness, unit2Delta,
				timestamp = Date.timestamp();

			var sums = {
				unit2PerHour: 0,
				popPerHour: 0,
				unit2Delta: 0,
				hapiness: 0,
				trainTime: 0,
				trainPopulation: 0,
				stone: 0,
				ore: 0
			};

			for( i = 0, length = KOCFIA.citiesKey.length; i < length; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					stat = KOCFIA.dataAndStats.stats[ cityKey ];

					if( Object.isObject(stat) && !$.isEmptyObject(stat) ){
						//the population is repleanished every two hours (5% per 6 minutes)
						popPerHour = parseInt(window.seed.citystats[ cityKey ].pop[1], 10) / 2; //population limit

						hapiness = parseInt(window.seed.citystats[ cityKey ].pop[2], 10);

						unit2Delta = popPerHour - stat.unit2PerHour * parseInt(window.unitcost.unt2[6], 10);

						queue = window.seed.queue_unt[ cityKey ];
						time = 0;
						nb = 0;
						if( Array.isArray(queue) ){
							for( b = 0; b < queue.length; b += 1 ){
								train = queue[ b ];
								nb += parseInt(parseInt(train[1], 10) * parseInt(window.unitcost['unt'+ train[0]][6], 10) / 2, 10);
							}

							time = train[3] - timestamp;
						}

						if( time < 0 ) time = 0;

						stone = parseInt(window.seed.resources[ cityKey ].rec3[0], 10) / 3600;
						ore = parseInt(window.seed.resources[ cityKey ].rec4[0], 10) / 3600;

						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 0).html( Shared.format(stat.unit2PerHour) ).attr('title', Shared.readable(stat.unit2PerHour));

						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 1).html( Shared.format(popPerHour) ).attr('title', Shared.readable(popPerHour));

						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 2).html( Shared.format(unit2Delta) ).attr('title', Shared.readable(unit2Delta));

						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 3).html( hapiness );

						t = Shared.readableDuration(time);
						b = t.split(' ');
						if( b.length > 2 ) b = b.slice(0, 2).join(' ');
						else b = t;

						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 4).html( b ).toggleClass('warning', time < 3600).attr('title', Shared.readableDuration(time));
						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 5).html( Shared.format(nb) ).attr('title', Shared.readable(nb));

						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 6).html( Shared.format(stone) ).attr('title', Shared.readable(stone));
						KOCFIA.summary.$tds.eq(i + 1 + KOCFIA.summary.numCelsPerLine * 7).html( Shared.format(ore) ).attr('title', Shared.readable(ore));

						sums.popPerHour += popPerHour;

						sums.unit2Delta += unit2Delta;

						sums.hapiness += hapiness;

						sums.trainTime += time;
						sums.trainPopulation += nb;

						sums.stone += stone;
						sums.ore += ore;
					}
				}
			}

			sums.unit2PerHour = KOCFIA.dataAndStats.sums.unit2PerHour;

			i = 0;
			for( b in sums ){
				if( sums.hasOwnProperty(b) ){
					if( b != 'trainTime' ){
						KOCFIA.summary.$tds.eq(i * KOCFIA.summary.numCelsPerLine + KOCFIA.summary.numCelsPerLine - 1).html( sums[ b ] !== 0 ? Shared.format(sums[ b ]) : '' ).attr('title', sums[ b ] !== 0 ? Shared.readable(sums[ b ]) : '');
					} else {
						if( sums[ b ] > 0 ){
							time = Shared.readableDuration( sums[ b ] );
							t = time.split(' ');
							if( t.length > 2 ) t = t.slice(0, 2).join(' ');
							else t = time;
						}

						KOCFIA.summary.$tds.eq(i * KOCFIA.summary.numCelsPerLine + KOCFIA.summary.numCelsPerLine - 1).html( sums[ b ] > 0 ? t : '' ).attr('title', sums[ b ] > 0 ? Shared.readableDuration( sums[ b ] ) : '');
					}
					i += 1;
				}
			}
		};

	/* MAP */
		KOCFIA.map = {
			options: {
				active: 1,
				additionalInfo: 0,
				improveCoordsForm: 0
			},
			stored: ['search'],
			search: {}/*{by city, tiles}*/
		};

		/* grid related */
		KOCFIA.map.gridRowActions = function( cellValue, options, rowObject ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map gridRowActions function', cellValue, options, rowObject);
			var code = '<span class="ui-icon ui-icon-cart attack-shortcut" data-coords="'+ rowObject.coords +'" title="Attaquer"></span>';
			code += '<span class="ui-icon ui-icon-note scout-shortcut" data-coords="'+ rowObject.coords +'" title="Eclairer"></span>';

			return code;
		};

		KOCFIA.map.data = {
			cities: [],
			barbarians: [],
			wilderness: [],
			darkForests: []
		};

		KOCFIA.map.selection = {
			cities: {},
			barbarians: {},
			wilderness: {},
			darkForests: {}
		};

		KOCFIA.map.gridParams = {
			shared: {
				datatype: 'local',
				loadui: 'disable',
				rowNum: 20,
				rowList: [20, 50, 100],
				sortname: 'range',
				sortorder: 'asc',
				altRows: true,
				altclass: 'zebra',
				height: 'auto',
				autowidth: true,
				viewrecords: true, //total in pager
				gridview: true, //speed boost
				hiddengrid: true,
				multiselect: true,
				multiboxonly: true,
				multikey: 'shiftKey',
				shrinkToFit: true
			},
			cities: {
				colNames: ['', 'Dist', 'Coord', 'Nom', 'Niv', 'Joueur', 'Puis', 'Alliance', 'Diplo', 'Brume', 'PlayerId', 'Status'],
				colModel: [
					{name: 'actions', sortable: false, search: false, formatter: KOCFIA.map.gridRowActions, width: 40},
					{name: 'range', index: 'range', align: 'right', sorttype: 'float', width: 60},
					{name: 'coords', index: 'coords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
					{name: 'city', index: 'city', width: 100},
					{name: 'level', index: 'level', align: 'center', sorttype: 'int', width: 60},
					{name: 'player', index: 'player', width: 100},
					{name: 'might', index: 'might', align: 'right', defval: 0, sorttype: 'int', formatter: function( cellValue, options, rowObject ){ return Shared.format(cellValue); }, width: 50},
					{name: 'guild', index: 'guild', width: 100},
					{name: 'diplomacy', index: 'diplomacy', formatter: function( cellValue, options, rowObject ){ return Shared.getDiplomacy(cellValue); }, width: 70},
					{name: 'mist', index: 'mist', align: 'center', formatter: function( cellValue, options, rowObject ){ return cellValue === 1 ? 'Oui' : ''; }, width: 55},
					{name: 'playerId', index: 'playerId', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'playerStatus', index: 'playerStatus', search: false, width: 90}
				],
				caption: 'Villes',
				pager: '#kocfia-map-pager-cities',
				onSelectRow: function(key, checked){
					//xxxyyy -> xxx,yyy with padded 0 cleaned
					var coord = parseInt(key.toString().substr(0, 3), 10) +','+ parseInt(key.toString().substr(3, 3), 10);
					if( checked ){
						KOCFIA.map.selection.cities[ coord ] = KOCFIA.map.$resultsCities.jqGrid('getRowData', key);
					} else {
						delete KOCFIA.map.selection.cities[ coord ];
					}
				}
			},
			barbarians: {
				colNames: ['', 'Distance', 'Coordonnées', 'Niveau'],
				colModel: [
					{name: 'actions', sortable: false, search: false, formatter: KOCFIA.map.gridRowActions, width: 50},
					{name: 'range', index: 'range', align: 'right', sorttype: 'float', width: 60},
					{name: 'coords', index: 'coords', align:'center', key: true, sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 80},
					{name: 'level', index: 'level', align: 'center', sorttype: 'int', width: 60}
				],
				caption: 'Camps barbares',
				pager: '#kocfia-map-pager-barbarians',
				onSelectRow: function(key, checked){
					//xxxyyy -> xxx,yyy with padded 0 cleaned
					var coord = parseInt(key.toString().substr(0, 3), 10) +','+ parseInt(key.toString().substr(3, 3), 10);
					if( checked ){
						KOCFIA.map.selection.barbarians[ coord ] = KOCFIA.map.$resultsBarbarians.jqGrid('getRowData', key);
					} else {
						delete KOCFIA.map.selection.barbarians[ coord ];
					}
				}
			},
			wilderness: {
				colNames: ['', 'Dist', 'Coord', 'Niv', 'Type', 'Joueur', 'Puis', 'Alliance', 'Diplo', 'PlayerId', 'Status'],
				colModel: [
					{name: 'actions', sortable: false, search: false, formatter: KOCFIA.map.gridRowActions, width: 40},
					{name: 'range', index: 'range', align: 'right', sorttype: 'float', width: 60},
					{name: 'coords', index: 'coords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
					{name: 'level', index: 'level', align: 'center', sorttype: 'int', width: 60},
					{name: 'type', index: 'type', width: 90},
					{name: 'player', index: 'player', width: 100},
					{name: 'might', index: 'might', align: 'right', defval: 0, sorttype: 'int', formatter: function( cellValue, options, rowObject ){ return Shared.format(cellValue); }, width: 50},
					{name: 'guild', index: 'guild', width: 100},
					{name: 'diplomacy', index: 'diplomacy', formatter: function( cellValue, options, rowObject ){ return Shared.getDiplomacy(cellValue); }, width: 70},
					{name: 'playerId', index: 'playerId', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'playerStatus', index: 'playerStatus', search: false, width: 90}
				],
				caption: 'Terres Sauvages',
				pager: '#kocfia-map-pager-wilderness',
				onSelectRow: function(key, checked){
					//xxxyyy -> xxx,yyy with padded 0 cleaned
					var coord = parseInt(key.toString().substr(0, 3), 10) +','+ parseInt(key.toString().substr(3, 3), 10);
					if( checked ){
						KOCFIA.map.selection.wilderness[ coord ] = KOCFIA.map.$resultsWilderness.jqGrid('getRowData', key);
					} else {
						delete KOCFIA.map.selection.wilderness[ coord ];
					}
				}
			},
			darkForests: {
				colNames: ['', 'Distance', 'Coordonnées', 'Niveau'],
				colModel: [
					{name: 'actions', sortable: false, search: false, formatter: KOCFIA.map.gridRowActions, width: 50},
					{name: 'range', index: 'range', align: 'right', width: 60, sorttype: 'float'},
					{name: 'coords', index: 'coords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 80},
					{name: 'level', index: 'level', align: 'center', sorttype: 'int', width: 60}
				],
				caption: 'Forêts Obscures',
				pager: '#kocfia-map-pager-darkForests'
			}
		};

		KOCFIA.map.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.map +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('map', 'active', 'Activer', KOCFIA.conf.map.active);
			code += Shared.generateCheckbox('map', 'additionalInfo', 'Afficher les informations sur la carte (niveau, joueur, puissance, alliance, diplomatie)', KOCFIA.conf.map.additionalInfo);
			code += Shared.generateCheckbox('map', 'improveCoordsForm', 'Améliorer le formulaire des coordonnées de la carte (placement, support touche entrée, champ pour copier-coller)', KOCFIA.conf.map.improveCoordsForm);
			code += Shared.generateButton('map', 'cleanSearch', 'Supprimer toutes les recherches géographiques');

			var i, cityKey, city;
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				city = KOCFIA.cities[cityKey];
				code += Shared.generateButton('map', 'cleanSearchForCity', 'Supprimer les recherches géographiques de ' + city.label, cityKey).replace(/<\/p>/, '');
			}
			code += '</p></div>';

			$section.append( code );
		};

		KOCFIA.map.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-map').html('');

			var header = '<div class="infos">';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div>';

			var code = '<fieldset class="search"><legend>Exploration</legend>';
			code += '<div><label for="kocfia-map-near-x">Autour de&nbsp;:&nbsp;</label>';
			code += '<input type="text" id="kocfia-map-near" class="coord" required pattern="'+ Shared.coordRegExp +'">';
			code += '<select id="kocfia-map-city-coord"><option value="">Villes</option>';

			var loadOptions = '', c, cityKey, city, length = KOCFIA.citiesKey.length;
			for( c = 0; c < length; c += 1 ){
				cityKey = KOCFIA.citiesKey[ c ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];
					code += '<option value="'+ city.coords.x + ',' + city.coords.y +'">'+ city.label +'</option>';

					if( KOCFIA.map.search.hasOwnProperty( cityKey ) ){
						if( !$.isEmptyObject( KOCFIA.map.search[ cityKey ] ) ){
							loadOptions += '<option value="'+ cityKey +'">'+ city.label +'</option>';
						}
					}
				}
			}

			code += '</select></div>';
			code += '<div><label for="kocfia-map-range-min">Distance entre&nbsp;:&nbsp;</label>';
			code += '<input type="number" id="kocfia-map-range-min" class="range" value="1" required min="1" placeholder="1">';
			code += '<label for="kocfia-map-range-max">&nbsp;et&nbsp;</label>';
			code += '<input type="text" id="kocfia-map-range-max" class="range" value="20" required min="2" placeholder="2">';
			code += '<button class="go button"><span>Rechercher</span></button></div>';
			code += '</fieldset>';

			code += '<div class="search-status"></div>';

			//grids
			code += '<table id="kocfia-map-results-cities" class="search-results"></table>';
			code += '<div id="kocfia-map-pager-cities" class="search-pager"></div>';
			code += '<table id="kocfia-map-results-barbarians" class="search-results"></table>';
			code += '<div id="kocfia-map-pager-barbarians" class="search-pager"></div>';
			code += '<table id="kocfia-map-results-wilderness" class="search-results"></table>';
			code += '<div id="kocfia-map-pager-wilderness" class="search-pager"></div>';
			code += '<table id="kocfia-map-results-darkForests" class="search-results"></table>';
			code += '<div id="kocfia-map-pager-darkForests" class="search-pager"></div>';

			$section.append( header + code + KOCFIA.map.getHelp() )
				.on('change', '#kocfia-map-city-coord', function(){
					var v = $(this).val();
					if( v !== '' ){
						$('#kocfia-map-near').val( v );
					}
				})
				.on('click', '.search .go', function(event){
					event.stopPropagation();
					if( !KOCFIA.map.searching ){
						KOCFIA.map.$save.hide();

						var coord = $.trim( $('#kocfia-map-near').val() ),
							rangeMin = $.trim( $('#kocfia-map-range-min').val() ),
							rangeMax = $.trim( $('#kocfia-map-range-max').val() ),
							errors = [],
							regexp = /[^0-9,]/;

						if( coord === '' ){
							errors.push('Veuillez spécifier une coordonnée.');
						} else if( regexp.test( coord ) ){
							errors.push('Pour les coordonnées, veuillez respecter le format x,y.');
						} else {
							coord = Shared.checkCoord( coord );
							if( coord !== false ){
								coordX = coord.x;
								coordY = coord.y;
							} else {
								errors.push('Coordonnée invalide.');
							}
						}

						if( rangeMin === '' && rangeMax === '' ){
							errors.push('Veuillez spécifier une distance.');
						} else {
							rangeMin = parseInt(rangeMin, 10);
							rangeMax = parseInt(rangeMax, 10);
							if( !isNaN(rangeMin) && !isNaN(rangeMax) ){
								if( rangeMin < 1 || rangeMax < 1 || rangeMin > rangeMax ){
									errors.push('Distance invalide. Minimum 1 de distance et distance minimum inférieure ou égale à la distance max.');
								}
							} else {
								errors.push('Veuillez spécifier une distance.');
							}
						}

						if( errors.length ){
							Shared.notify( errors );
						} else {
							$(this).addClass('danger').html('Annuler la recherche');
							KOCFIA.map.explore( coordX, coordY, rangeMin, rangeMax );
						}
					} else {
						if( KOCFIA.map.xhr ) KOCFIA.map.xhr.abort(); //kill the ajax request
						KOCFIA.map.searching = false;
						$(this).removeClass('danger').html('Rechercher');
						KOCFIA.map.$status[0].innerHTML = '';
					}
				});

			KOCFIA.map.$search = $section.find('.search');
			KOCFIA.map.$save = $section.find('.save');
			KOCFIA.map.$filter = $section.find('.filter');
			KOCFIA.map.$category = $section.find('.map-category');
			KOCFIA.map.$coordsList = $('#kocfia-map-coordsList');
			KOCFIA.map.$status = $section.find('.search-status');

			//grids
			KOCFIA.map.$resultsCities = $section.find('#kocfia-map-results-cities')
				.jqGrid( $.extend({}, KOCFIA.map.gridParams.shared, KOCFIA.map.gridParams.cities) )
				.jqGrid('navGrid', '#kocfia-map-pager-cities', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-cities', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.map.$resultsCities[0].toggleToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd','#kocfia-map-pager-cities', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.map.$resultsCities[0].clearToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-cities', {caption: '', title: "Exporter les coordonnées sélectionnées dans l'onglet d'éclairage", buttonicon: 'ui-icon-contact', onClickButton: function(){ KOCFIA.map.exportSelection('cities', 'scout'); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-cities', {caption: '', title: "Exporter les coordonnées sélectionnées dans l'onglet de pillage", buttonicon: 'ui-icon-cart', onClickButton: function(){ KOCFIA.map.exportSelection('cities', 'plunder'); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-cities', {caption: '', title: "Exporter la sélection dans le bloc note", buttonicon: 'ui-icon-note', onClickButton: function(){ KOCFIA.map.exportSelection('cities', 'notepad'); }, position: 'last'})
				.jqGrid('filterToolbar');

			KOCFIA.map.$resultsBarbarians = $section.find('#kocfia-map-results-barbarians')
				.jqGrid( $.extend({}, KOCFIA.map.gridParams.shared, KOCFIA.map.gridParams.barbarians) )
				.jqGrid('navGrid', '#kocfia-map-pager-barbarians', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-barbarians', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.map.$resultsBarbarians[0].toggleToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd','#kocfia-map-pager-barbarians', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.map.$resultsBarbarians[0].clearToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-barbarians', {caption: '', title: "Exporter les coordonnées sélectionnées dans l'onglet des camps barbares", buttonicon: 'ui-icon-cart', onClickButton: function(){ KOCFIA.map.exportSelection('barbarians', 'barbarian'); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-barbarians', {caption: '', title: "Exporter la sélection dans le bloc note", buttonicon: 'ui-icon-note', onClickButton: function(){ KOCFIA.map.exportSelection('barbarians', 'notepad'); }, position: 'last'})
				.jqGrid('filterToolbar');

			KOCFIA.map.$resultsWilderness = $section.find('#kocfia-map-results-wilderness')
				.jqGrid( $.extend({}, KOCFIA.map.gridParams.shared, KOCFIA.map.gridParams.wilderness) )
				.jqGrid('navGrid', '#kocfia-map-pager-wilderness', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-wilderness', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.map.$resultsWilderness[0].toggleToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd','#kocfia-map-pager-wilderness', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.map.$resultsWilderness[0].clearToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-wilderness', {caption: '', title: "Exporter les coordonnées sélectionnées dans l'onglet des terres sauvages", buttonicon: 'ui-icon-cart', onClickButton: function(){ KOCFIA.map.exportSelection('wilderness', 'wilderness'); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-wilderness', {caption: '', title: "Exporter la sélection dans le bloc note", buttonicon: 'ui-icon-note', onClickButton: function(){ KOCFIA.map.exportSelection('wilderness', 'notepad'); }, position: 'last'})
				.jqGrid('filterToolbar');

			KOCFIA.map.$resultsDarkForests = $section.find('#kocfia-map-results-darkForests')
				.jqGrid( $.extend({}, KOCFIA.map.gridParams.shared, KOCFIA.map.gridParams.darkForests) )
				.jqGrid('navGrid', '#kocfia-map-pager-darkForests', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-darkForests', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.map.$resultsDarkForests[0].toggleToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd','#kocfia-map-pager-darkForests', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.map.$resultsDarkForests[0].clearToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-map-pager-wilderness', {caption: '', title: "Exporter la sélection dans le bloc note", buttonicon: 'ui-icon-note', onClickButton: function(){ KOCFIA.map.exportSelection('wilderness', 'notepad'); }, position: 'last'})
				.jqGrid('filterToolbar');

			//grid listeners
			$section
				.on('click', '.playerInfo', function(){
					Shared.getPlayerInfo($(this).attr('rel'), 'map');
				})
				.on('click', '.attack-shortcut, .scout-shortcut', function(){
					if( KOCFIA.conf.quickMarch.on ){
						var $this = $(this),
							type = $this.hasClass('attack-shortcut') ? 'attack' : 'scout';

						KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$="quickMarch"]').trigger('click');

						$('#kocfia-quickMarch')
							.find('.type').find('#kocfia-quickMarch-type-'+ type).prop('checked').end()
							.find('.coord').val( $this.attr('data-coord') ).trigger('change');
					} else {
						alert('L\'onglet marche simplifées n\'est pas actif.');
					}
				})
				.on('click', '.ui-jqgrid-titlebar', function(){
					$(this).find('.ui-jqgrid-titlebar-close').trigger('click');
				})
				.find('.ui-jqgrid-titlebar-close').click(function(e){
					e.stopPropagation();

					console.log(this, $(this));

					$(this)
						.filter('.ui-icon-circle-triangle-s') //grid was closed ?
						.closest('.ui-jqgrid-view').siblings('.ui-jqgrid-view') //get other grids
						.find('.ui-icon-circle-triangle-n').parent().trigger('click'); //close them
				})
				;

			KOCFIA.$confPanel.on('resizestop', function(){
				var size = $("#kocfia-map").find('.search').innerWidth() + 1;
				KOCFIA.map.$resultsCities.jqGrid('setGridWidth', size);
				KOCFIA.map.$resultsBarbarians.jqGrid('setGridWidth', size);
				KOCFIA.map.$resultsWilderness.jqGrid('setGridWidth', size);
				KOCFIA.map.$resultsDarkForests.jqGrid('setGridWidth', size);
			});
		};

		KOCFIA.map.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map on function');
			KOCFIA.map.improveCoordsForm();
		};

		KOCFIA.map.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map off function');
			KOCFIA.map.improveCoordsForm();
		};

		KOCFIA.map.cleanSearch = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map cleanSearch function');
			localStorage.removeItem('kocfia_map_search_' + KOCFIA.storeUniqueId);

			$('#kocfia-map-load-saved').find('option').filter(':gt(0)').remove();
		};

		KOCFIA.map.cleanSearchForCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map cleanSearchForCity function');
			KOCFIA.map.search[cityKey] = {};
			localStorage.setObject('kocfia_map_search_' + KOCFIA.storeUniqueId, KOCFIA.map.search);

			$('#kocfia-map-load-saved').find('option').filter('[value="'+ cityKey +'"]').remove();
		};

		KOCFIA.map.storeSearch = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map storeSearch function');
			localStorage.setObject('kocfia_map_search_' + KOCFIA.storeUniqueId, KOCFIA.map.search);
		};

		KOCFIA.map.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map getHelp function');
			var help = '<div id="kocfia-map-help" class="help" title="Aide '+ KOCFIA.modulesLabel.map +'">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '<li>Par défaut les résultats sont triés par distance croissante</li>';
			help += '<li>Les requêtes au serveur sont optmisées pour limiter l\'impact</li>';
			help += '<li>Le status en ligne et sa date de dernière connection sont à faire manuellement (requêtes serveur différentes), cependant pour chaque vérification tous les résultats du même joueur sont mis à jour</li>';
			help += '</ul><h4>Méthode :</h4><ol>';
			help += '<li>Spécifier une coordonnée</li>';
			help += '<li>Spécifier une distance de recherche autour de la coordonnée</li>';
			help += '<li>Lancer la recherche</li>';
			help += '<li>Déployer une des 4 grilles de résultats (Ville, Terres sauvages, Fôrets sombres et camps barbares) pour visionner les résultats</li>';
			help += '</ol><h4>Filtres rapides :</h4><ul>';
			help += '<li>Dans chaque grille, l\'icône <span class="ui-icon ui-icon-pin-s"></span> permet d\'afficher ou masquer sous l\'entête des colonnes des champs de filtrage rapide</li>';
			help += '<li>Saisir du texte dans l\'un de ces champs permet de filtrer les résultats</li>';
			help += '<li>L\'icône <span class="ui-icon ui-icon-refresh"></span> permet de vider les champs de filtrage rapide</li>';
			help += '</ul><h4>Filtrage poussé :</h4><ul>';
			help += '<li>Dans chaque grille, l\'icône <span class="ui-icon ui-icon-zoomin"></span> permet d\'afficher une popup où un filtrage plus poussé des résultats est possible</li>';
			help += '<li>Par exemple vous pouvez choisir d\'afficher uniquement les niveaux supérieur à 5</li>';
			help += '<li>Vous pouvez aussi coupler plusieurs valeurs pour une colonne mais aussi enchaîner les filtres sur plusieurs colonnes</li>';
			help += '<li>Cette méthode se rapproche grandement du requêttage de base de données</li>';
			help += '</ul><h4>Actions par ligne :</h4><ul>';
			help += '<li>Pour chaque ligne, dans la colonne action, peuvent se trouver plusieurs icônes permettant par exemple d\'attaquer, de transporter, ... vers la coordonnées correspondante. L\'onglet "Marche" est alors sélectionné, le type de marche et la coordonnée ciblée préremplis.</li>';
			help += '</ul><h4>Actions sur sélection :</h4><ul>';
			help += '<li>La première colonne comporte des cases à cocher, une pour chaque résultat.</li>';
			help += '<li>Plusieurs icônes sont présentes en bas à gauche de chaque grille pour exporter les résultats sélectionnés vers par exemple les onglets CB, TS, Fôret, Pillage, ... et le bloc-note.</li>';
			help += '</ul></div>';

			return help;
		}

		KOCFIA.map.improveCoordsForm = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map improveCoordsForm function');
			var $form = $('#maparea_map').find('.mod_coord');

			$('#mod_views_map').click(function(){
				if( KOCFIA.conf.map.additionalInfo ){
					window.reCenterMapWithCoor(); //dirty, force fetchMapTiles.php ajax call
				}
			});

			if( KOCFIA.conf.map.improveCoordsForm ){
				$form.addClass('improved')
					.on('keyup', 'input', function(e){
						if( e.which == 13 ){
							if( this.id == 'mapXCoor' || this.id == 'mapYCoor' ){
								window.reCenterMapWithCoor();
							} else {
								var coord = $.trim( $(this).val() );
								coord = Shared.checkCoord( coord );
								if( coord !== false ){
									$('#mapXCoor').val( coord.x );
									$('#mapYCoor').val( coord.y );
									window.reCenterMapWithCoor();
								}
							}
						}
					})
					.find('.clearfix')
						.find('#mapXCoor, #mapYCoor').each(function(){
							$(this).replaceWith('<input type="number" min="0" max="750" id="'+ this.id +'" value="'+ this.value +'">');
						}).end()
						.append('<div class="mapXYCoor"><input type="text" pattern="[0-9]{1,3},[0-9]{1,3}" placeholder="123,456"></div>');
			} else {
				$form.removeClass('improved')
					.off('keyup', 'input')
					.find('.clearfix')
						.find('#mapXCoor, #mapYCoor').each(function(){
							$(this).replaceWith('<input type="text" id="'+ this.id +'" value="'+ this.value +'">');
						}).end()
						.find('#mapXYCoor').remove().end();
			}
		};

		KOCFIA.map.addTilesInfo = function( result ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map addTilesInfo function');
			if( !$('#mapwindow').is(':visible') || !KOCFIA.conf.map.additionalInfo ) return;

			var id, tile, user, alliance, name, might, text, diplomacy;
			for( id in result.data ){
				if( result.data.hasOwnProperty(id) ){
					tile = result.data[id];
					user = null;
					a = null;
					might = null;
					name = null;
					alliance = null;

					//city
						if( tile.tileType == 51 ){
							if( tile.tileCityId !== null ){
								user = result.userInfo['u'+ tile.tileUserId];
								alliance = (result.allianceNames.hasOwnProperty('a' + user.a) ? result.allianceNames['a' + user.a] : '');
								name = user.n;
								diplomacy = Shared.getDiplomacy(user.a);

								text = '<span class="kocfia-map-tile-info ';
								if( diplomacy == 'hostile' ) text += 'hostile';
								else if( diplomacy == 'amical' ) text += 'friendly';
								else if( diplomacy == 'allié' ) text += 'ally';
								text += '">';
								text += tile.tileLevel;
								text += ', '+ name;
								text += ', '+ Shared.format(user.m); //might
								if( alliance !== '' ) text += ', '+ alliance;
								text += '</span>';

								$('#l_'+ tile.xCoord +'_t_'+ tile.yCoord).html( text );

							} else {
					//barbarian
								$('#l_'+ tile.xCoord +'_t_'+ tile.yCoord).html('<span class="kocfia-map-tile-info">'+ tile.tileLevel +'</span>');
							}
					//city
						//} else if( tile.tileType == 53 ){ //misted city
					//dark forest
						} else if( tile.tileType == 54 ){
							$('#l_'+ tile.xCoord +'_t_'+ tile.yCoord).html('<span class="kocfia-map-tile-info">'+ tile.tileLevel +'</span>');
					//wilderness (swamp tileType = 0)
						} else if( tile.tileType >= 10 && tile.tileType <= 50 ){
							if( tile.tileUserId !== null ){
								if( tile.tileUserId != "0" && !tile.misted ){
									user = result.userInfo['u'+ tile.tileUserId];
									name = user.n;
									might = Shared.format(user.m);
									alliance = (result.allianceNames.hasOwnProperty('a' + user.a) ? result.allianceNames['a' + user.a] : '');
									diplomacy = Shared.getDiplomacy(user.a);

									text = '<span class="kocfia-map-tile-info ';
									if( diplomacy == 'hostile' ) text += 'hostile';
									else if( diplomacy == 'amical' ) text += 'friendly';
									else if( diplomacy == 'allié' ) text += 'ally';
									text += '">';
									text += tile.tileLevel;
									text += ', '+ name;
									text += ', '+ Shared.format(user.m); //might
									if( alliance !== '' ) text += ', '+ alliance;
									text += '</span>';

									$('#l_'+ tile.xCoord +'_t_'+ tile.yCoord).html( text );
								}
							} else {
								$('#l_'+ tile.xCoord +'_t_'+ tile.yCoord).html('<span class="kocfia-map-tile-info">'+ tile.tileLevel +'</span>');
							}
						}
				}
			}
		};

		KOCFIA.map.explore = function( coordX, coordY, rangeMin, rangeMax ){
			if( KOCFIA.map.searching ) return;
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore function');

			/* deferred functions */
				//display the partialExplore results, while merging them with previous results
				var parseResults = function( dfd, coordX, coordY, rangeMin, rangeMax, result ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore deferred parseResults function');

					var tiles = { cities: [], barbarians: [], darkForests: [], wilderness: [] },
						coords = {};

					var id, tile, range, user, alliance, name, label, might, userId, a, w, b, pad = '000';
					for( id in result.data ){
						if( result.data.hasOwnProperty(id) ){
							tile = result.data[id];
							range = Shared.getDistance(coordX, coordY, tile.xCoord, tile.yCoord);
							if( range >= rangeMin && range <= rangeMax ){
								if( !coords.hasOwnProperty( tile.xCoord +','+ tile.yCoord ) ){
									//city
										if( tile.tileType == 51 ){
											if( tile.tileCityId !== null ){
												user = result.userInfo['u'+ tile.tileUserId];
												alliance = (result.allianceNames.hasOwnProperty('a' + user.a) ? result.allianceNames['a' + user.a] : '');
												name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;

												tiles.cities.push({
													id: parseInt(pad.substring(0, pad.length - tile.xCoord.length) + tile.xCoord + pad.substring(0, pad.length - tile.yCoord.length) + tile.yCoord, 10),
													range: range,
													coords: tile.xCoord + ',' + tile.yCoord,
													might: user.m,
													playerId: tile.tileUserId,
													player: name,
													playerStatus: Shared.playerStatusLink(tile.tileUserId),
													guild: alliance,
													diplomacy: user.a,
													city: tile.cityName,
													level: tile.tileLevel,
													mist: 0
												});

												coords[ tile.xCoord +','+ tile.yCoord ] = 1;
											} else {
									//barbarian
												tiles.barbarians.push({
													id: parseInt(pad.substring(0, pad.length - tile.xCoord.length) + tile.xCoord + pad.substring(0, pad.length - tile.yCoord.length) + tile.yCoord, 10),
													range: range,
													coords: tile.xCoord + ',' + tile.yCoord,
													level: tile.tileLevel
												});

												coords[ tile.xCoord +','+ tile.yCoord ] = 1;
											}
									//city
										} else if( tile.tileType == 53 ){
											tiles.cities.push({
												id: parseInt(pad.substring(0, pad.length - tile.xCoord.length) + tile.xCoord + pad.substring(0, pad.length - tile.yCoord.length) + tile.yCoord, 10),
												range: range,
												coords: tile.xCoord + ',' + tile.yCoord,
												might: '?',
												playerId: null,
												playerStatus: '? - ?',
												player: '?',
												guild: '?',
												diplomacy: null,
												city: '?',
												level: 0,
												mist: 1
											});

											coords[ tile.xCoord +','+ tile.yCoord ] = 1;
									//dark forest
										} else if( tile.tileType == 54 ){
											tiles.darkForests.push({
												id: parseInt(pad.substring(0, pad.length - tile.xCoord.length) + tile.xCoord + pad.substring(0, pad.length - tile.yCoord.length) + tile.yCoord, 10),
												range: range,
												coords: tile.xCoord + ',' + tile.yCoord,
												level: tile.tileLevel
											});

											coords[ tile.xCoord +','+ tile.yCoord ] = 1;
									//wilderness (swamp tileType = 0)
										} else if( tile.tileType >= 10 && tile.tileType <= 50 ){
											label = '';

											if( tile.tileType == 10 ) label = 'Prairie';
											else if( tile.tileType == 11 ) label = 'Lac';
											else if( tile.tileType == 20 ) label = 'Forêt';
											else if( tile.tileType == 30 ) label = 'Colline';
											else if( tile.tileType == 40 ) label = 'Montagne';
											else if( tile.tileType == 50 ) label = 'Plaine';

											user = null;
											userId = null;
											a = null;
											might = '';
											name = '';
											alliance = '';

											if( tile.tileUserId !== null ){
												if( tile.tileUserId == "0" || tile.misted ){
													might = '?';
													name = '?';
													alliance = '?';
													a = '?';
												} else {
													user = result.userInfo['u'+ tile.tileUserId];
													name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;
													might = Shared.format(user.m);
													if( result.allianceNames.hasOwnProperty('a' + user.a) ){
														alliance = result.allianceNames['a' + user.a];
														a = user.a;
													} else {
														a = '';
													}
													userId = tile.tileUserId;
												}
											}

											tiles.wilderness.push({
												id: parseInt(pad.substring(0, pad.length - tile.xCoord.length) + tile.xCoord + pad.substring(0, pad.length - tile.yCoord.length) + tile.yCoord, 10),
												range: range,
												coords: tile.xCoord + ',' + tile.yCoord,
												type: label,
												might: might,
												playerId: userId,
												player: name,
												playerStatus: Shared.playerStatusLink(userId),
												guild: alliance,
												diplomacy: a,
												level: tile.tileLevel
											});

											coords[ tile.xCoord +','+ tile.yCoord ] = 1;
										}
								}
							}
						}
					}

					KOCFIA.map.displayResults( tiles );

					if( !loop ) return dfd.resolve();
					else {
						start += 50;
						end += 50;
						return dfd.pipe( partialExplore(dfd, 3) );
					}
				};

				//split the full coordinates search in small requests of 100 coordinates
				var partialExplore = function(dfd, attempts){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore deferred partialExplore function', start, end, length);

					if( !KOCFIA.map.searching ){
						return dfd.reject();
					}

					loop = true;
					if( end > length ){
						end = length;
						loop = false;
					}

					KOCFIA.map.$status.html('Recherche des coordonnées ' + start + ' à ' + end + ' sur ' + length + '.');

					if( start == end ) end += 1; //avoid the start = end case with the slice which need a difference
					params.blocks = blocks.slice(start, end).join(',');
					KOCFIA.map.xhr = $.ajax({
							url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(result){
							if( result.ok && result.data ){
								if( start === 0 ){
									var chosenCityIndex = $('#kocfia-map-city-coord')[0].selectedIndex;
									if( chosenCityIndex ){
										$('#kocfia-map-city-save').prop('selectedIndex', chosenCityIndex);
									}
								}

								return dfd.pipe( parseResults( dfd, coordX, coordY, rangeMin, rangeMax, result ) );
							} else {
								attempts -= 1;
								if( attempts > 0 ){
									return dfd.pipe( partialExplore(dfd, attempts) );
								} else {
									return dfd.reject();
								}
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( partialExplore(dfd, attempts) );
							} else {
								return dfd.reject();
							}
						});
				};

				var searchSequence = function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map explore deferred searchSequence function');
					return $.Deferred(function(dfd){
						return dfd.pipe( partialExplore(dfd, 3) );
					}).promise();
				};

			KOCFIA.map.searching = true;

			KOCFIA.map.$status[0].innerHTML = '';

			KOCFIA.map.$resultsCities.jqGrid('clearGridData'); //.clearGridData(true) //for footer clearing
			KOCFIA.map.$resultsBarbarians.jqGrid('clearGridData');
			KOCFIA.map.$resultsWilderness.jqGrid('clearGridData');
			KOCFIA.map.$resultsDarkForests.jqGrid('clearGridData');

			KOCFIA.map.selection.cities = {};
			KOCFIA.map.selection.barbarians = {};
			KOCFIA.map.selection.wilderness = {};
			KOCFIA.map.selection.darkForests = {};

			KOCFIA.map.data.cities = [];
			KOCFIA.map.data.barbarians = [];
			KOCFIA.map.data.wilderness = [];
			KOCFIA.map.data.darkForests = [];

			var params = $.extend({}, window.g_ajaxparams),
				blocks = [];

			//get all the coordinates within a circle of rangeMax diameter,
			//omiting the coordinates under rangeMin
			var x = 0,
				y = rangeMax,
				rangeMaxSquare = Math.pow(rangeMax, 2),
				rangeMinSquare = Math.pow(rangeMin, 2),
				i, j, r, coords = {}, sorted = [];

			for( x = 0; x < y; x += 1 ){
				for( i = coordX - x; i <= coordX + x; i += 1 ){
					j = coordY + y;
					r = Shared.getDistance(coordX, coordY, i, j);
					if( r >= rangeMin ){
						coords[ i +','+ j ] = {x: i, y: j, r: r};
					}
				}
				for( i = coordX - x; i <= coordX + x; i += 1 ){
					j = coordY - y;
					r = Shared.getDistance(coordX, coordY, i, j);
					if( r >= rangeMin ){
						if( j <= 0 ) j = 750 - j;
						coords[ i +','+ j ] = {x: i, y: j, r: r};
					}
				}
				for( i = coordX - y; i <= coordX + y; i += 1 ){
					j = coordY + x;
					r = Shared.getDistance(coordX, coordY, i, j);
					if( r >= rangeMin ){
						coords[ i +','+ j ] = {x: i, y: j, r: r};
					}
				}
				for( i = coordX - y; i <= coordX + y; i += 1 ){
					j = coordY - x;
					r = Shared.getDistance(coordX, coordY, i, j);
					if( r >= rangeMin ){
						coords[ i +','+ j ] = {x: i, y: j, r: r};
					}
				}

				if( Math.abs( Math.pow(x, 2) + Math.pow(y, 2) - rangeMaxSquare ) > Math.abs( Math.pow(x, 2) + Math.pow(y - 1, 2) - rangeMaxSquare )
					|| Math.pow(x + 1, 2) + Math.pow(y, 2) > rangeMaxSquare
				){
					y -= 1;
				}
			}

			//for one coord, kabam return 25 coordinates
			//the given coord is the top left corner of a 5x5 square
			var returned = {}, c, g;
			for( c in coords ){
				if( coords.hasOwnProperty(c) && !returned.hasOwnProperty(c) ){
					g = coords[c];
					for( i = g.x; i <= g.x + 5; i += 1 ){
						for( j = g.y; j <= g.y + 5; j += 1 ){
							returned[ i+','+j ] = 1;
						}
					}
					sorted.push(g);
				}
			}

			coords = null;

			//sorting coords to quickend the display
			coords = sorted.sort(function(a, b){ return a.r - b.r; });

			for( i = 0; i < coords.length; i += 1 ){
				if( coords[ i ].x < 0 ) coords[ i ].x = 750 + coords[ i ].x;
				else if( coords[ i ].x >= 750 ) coords[ i ].x = coords[ i ].x - 750;

				if( coords[ i ].y < 0 ) coords[ i ].y = 750 + coords[ i ].y;
				else if( coords[ i ].y >= 750 ) coords[ i ].y = coords[ i ].y - 750;

				blocks.push("bl_" + coords[ i ].x + "_bt_" + coords[ i ].y);
			}

			var loop, start = 0, end = 49, length = blocks.length;
			$.when( searchSequence() )
				.done(function(){
					KOCFIA.map.$status.html('Recherche finie.');
				})
				.fail(function(){
					KOCFIA.map.$status.html('Recherche stoppée ou échouée avant la fin.');
				})
				.always(function(){
					KOCFIA.map.$save.show();
					KOCFIA.map.$search.find('.go').removeClass('danger').html('Rechercher');
					KOCFIA.map.searching = false;
				});
		};

		KOCFIA.map.displayResults = function( tiles ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map displayResults function');
			$('.tipsy').remove();

			if( tiles.cities.length > 0 ){
				KOCFIA.map.data.cities = KOCFIA.map.data.cities.concat(tiles.cities);
				KOCFIA.map.$resultsCities.jqGrid('setGridParam', {data: KOCFIA.map.data.cities}).trigger('reloadGrid');
			}
			if( tiles.barbarians.length > 0 ){
				KOCFIA.map.data.barbarians = KOCFIA.map.data.barbarians.concat(tiles.barbarians);
				KOCFIA.map.$resultsBarbarians.jqGrid('setGridParam', {data: KOCFIA.map.data.barbarians}).trigger('reloadGrid');
			}
			if( tiles.wilderness.length > 0 ){
				KOCFIA.map.data.wilderness = KOCFIA.map.data.wilderness.concat(tiles.wilderness);
				KOCFIA.map.$resultsWilderness.jqGrid('setGridParam', {data: KOCFIA.map.data.wilderness}).trigger('reloadGrid');
			}
			if( tiles.darkForests.length > 0 ){
				KOCFIA.map.data.darkForests = KOCFIA.map.data.darkForests.concat(tiles.darkForests);
				KOCFIA.map.$resultsDarkForests.jqGrid('setGridParam', {data: KOCFIA.map.data.darkForests}).trigger('reloadGrid');
			}
		};

		KOCFIA.map.setQuickMarch = function( type, coord ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map setQuickMarch function', type, coord);

			KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$='+ to +']').trigger('click');

			KOCFIA.quickMarch.$form
				.find('.type').find('kocfia-quickMarch-type-'+ type).prop('checked', true).end()
				.find('.coord').val( coord ).trigger('change');
		};

		KOCFIA.map.exportSelection = function( from, to ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map exportSelection function', from, to);
			if( KOCFIA.conf[ to ].on ){
				KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$='+ to +']').trigger('click');

				var valid = true,
					message, coord, info;
				switch( to ){
					case 'barbarian':
							//only one level
							var level = -1;
							for( coord in KOCFIA.map.selection[ from ] ){
								if( KOCFIA.map.selection[ from ].hasOwnProperty(coord) ){
									info = KOCFIA.map.selection[ from ][ coord ];
									if( level == -1 ) level = info.level;
									else if( level !== info.level ){
										valid = false;
										break;
									}
								}
							}

							message = 'Un seul niveau de camp barbare est permi par configuration d\'attaque de camps barbare.';
						break;
					case 'plunder':
							//only one player
							var playerId = -1;
							for( coord in KOCFIA.map.selection[ from ] ){
								if( KOCFIA.map.selection[ from ].hasOwnProperty(coord) ){
									info = KOCFIA.map.selection[ from ][ coord ];
									if( playerId == -1 ) playerId = info.playerId;
									else if( playerId !== info.playerId ){
										valid = false;
										break;
									}
								}
							}

							message = 'Un seul joueur est permi par configuration de pillage de villes.';
						break;
					default:
						break;
				}

				if( !valid ){
					Shared.notify(message);
					return false;
				}

				var index = KOCFIA.map.$coordsList[0].options.selectedIndex;
				if( index > 0 ) index -= 1;

				switch( to ){
					case 'barbarian':
					case 'wilderness':
					case 'plunder':
							$('#kocfia-'+ to)
								.find('.ui-accordion').accordion('activate', 0).end()
								.find('.attack-form')
									.find('.city-choice').eq(index).prop('checked', true).trigger('change').end()
									.find('textarea').html(function(index, current){ return current + KOCFIA.map.selection[ from ].keys().join('\n'); });
						break;
					case 'scout':
							$('#kocfia-'+ to)
								.find('.ui-accordion').accordion('activate', 0).end()
								.find('.attack-form')
									.find('textarea').val(function(index, current){ return current + KOCFIA.map.selection[ from ].keys().join('\n'); });
						break;
					case 'notepad':
							$('#kocfia-notepad').show()
								.find('textarea').html(function(index, current){ return current + KOCFIA.map.selection[ from ].keys().join('\n'); });
						break;
					default:
							Shared.notify('Erreur durant l\'export, destination manquante.');
						break;
				}

				if( to != 'notepad' ){
					KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href="#kocfia-'+ to +'"]').trigger('click');
				}
			} else {
				alert('L\'onglet '+ KOCFIA.tabLabel[ to ] +' n\'est pas actif.');
			}
		};

		KOCFIA.map.setPlayerStatus = function( playerId, status ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('map') ) console.info('KOCFIA map setPlayerStatus function');

			var targets = ['cities', 'wilderness'],
				i, j, target, info,
				modified = {};
			for( i = 0; i < targets.length; i += 1 ){
				target = targets[ i ];
				modified[ target ] = false;
				if( KOCFIA.map.data.hasOwnProperty(target) ){
					for( j = 0; j < KOCFIA.map.data[ target ].length; j += 1 ){
						info = KOCFIA.map.data.cities[ j ];
						if( info.playerId == playerId ){
							info.playerStatus = status;
							modifier[ target ] = true;
						}
					}
				}
			}

			if( modified.cities === true ) KOCFIA.map.$resultsCities.jqGrid('setGridParam', {data: KOCFIA.map.data.cities}).trigger('reloadGrid');
			if( modified.wilderness === true ) KOCFIA.map.$resultsWilderness.jqGrid('setGridParam', {data: KOCFIA.map.data.wilderness}).trigger('reloadGrid');
		};

	/* FORMATION */
		KOCFIA.formation = {
			options: {
				active: 1,
				automatic: 0,
				minPercentage: 0.75
			},
			stored: ['rules', 'savedRules'],
			rules: {}, //by city id
			savedRules: {} //by name
		};

		KOCFIA.formation.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.formation +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('formation', 'active', 'Activer', KOCFIA.conf.formation.active);
			code += Shared.generateCheckbox('formation', 'automatic', 'Lancer les formations automatiques', KOCFIA.conf.formation.automatic);
			code += Shared.generateSelect('formation', 'minPercentage', 'Pourcentage du maximum pour calculer la quantité minimum d\'une formation', KOCFIA.conf.formation.minPercentage, {labels: ['0%', '25%', '50%', '75%', '90%', '100%'], values: [0, 0.25, 0.5, 0.75, 0.9, 1]});
			code += Shared.generateButton('formation', 'deleteAllRules', 'Supprimer toutes les configurations de formation enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.formation.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-formation').html('');

			var form = '<div class="infos">';
			form += '<span class="buttonset"><input type="checkbox" id="formation-panel-automatic" '+ (KOCFIA.conf.formation.automatic ? 'checked' : '') +' autocomplete="off" />';
			form += '<label for="formation-panel-automatic">formations automatiques</label></span>';
			form += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			form += '</div><h3>Configurations</h3>';
			form += '<div class="forms">';

			//automatic formation form
				form += '<h3>Formations automatiques</h3>';
				form += '<div class="automatic-train-form">';
				form += '<div class="cf">';
				form += '<button class="save button modify">Enregistrer</button>';
				form += '<label for="kocfia-formation-rule-name">Nom de la configuration : </label>';
				form += '<input type="text" id="kocfia-formation-rule-name" autocomplete="off">';
				form += '</div>';

				var i, j, u, d, f, res,
					cLength = KOCFIA.citiesKey.length,
					cityKey, city,
					rule, units, defenses, availableUnits;
				//by city
				for( i = 0; i < cLength; i += 1 ){
					if( KOCFIA.cities.hasOwnProperty(KOCFIA.citiesKey[i]) ){
						form += KOCFIA.formation.getFieldset( KOCFIA.citiesKey[i], true );
					}
				}

				form += '<div class="cf"><button class="save button modify">Enregistrer</button></div>';
				form += '</div>';

			//automatic formation rules save / charge form
				form += '<h3>Configurations enregistrées</h3>';
				form += '<div class="rule-switch-form">';
				form += '<select id="kocfia-formation-rule-switch">';
				form += '<option value="">Choisir</option>';
				for( var ruleName in KOCFIA.formation.savedRules ){
					if( KOCFIA.formation.savedRules.hasOwnProperty( ruleName ) ){
						form += '<option value="'+ ruleName +'">'+ ruleName +'</option>';
					}
				}
				form += '</select>';
				form += '<button class="button modifiy train-rule-load">Activer</button>';
				form += '<button class="button danger train-rule-delete">Supprimer</button>';
				form += '</div>';

			//manual formation form
				form += '<h3>Formations manuelles</h3>';
				form += '<div class="manual-train-form">';
				form += '<fieldset>';

				form += '<select id="kocfia-formation-city" class="train-city" required>';
				form += '<option value="">Villes</option>';
				for( i = 0; i < cLength; i += 1 ){
					cityKey = KOCFIA.citiesKey[i];
					if( KOCFIA.cities.hasOwnProperty(cityKey) ){
						city = KOCFIA.cities[cityKey];
						form += '<option value="'+ cityKey +'">'+ city.label +'</option>';
					}
				}
				form += '</select>';
				form += '<div class="dynamic"></div>';
				form += '<button class="launch button modify">Former</button>';
				form += '<button class="reset button danger">Annuler</button>';
				form += '</fieldset>';
				form += '</div>';

			form += '</div>';

			//formations list
				var onGoing = '<h3>Formations en cours';
				onGoing += '<span class="nextIteration" title="Horaire de la prochaine tentative de formation"></span>';
				onGoing += '<button class="button secondary history-toggle" title="Historique des formations" rel="unit"><span>Historique</span></button>';
				onGoing += '</h3><div class="formation-list ongoing">';
				var cels = '', headers = '', toggles = '';
				for( i = 0; i < cLength; i += 1 ){
					cityKey = KOCFIA.citiesKey[i];
					if( KOCFIA.cities.hasOwnProperty(cityKey) ){
						city = KOCFIA.cities[cityKey];

						toggles += '<input type="checkbox" value="'+ cityKey +'" id="kocfia-formation-ongoing-unit-'+ cityKey +'" checked>';
						toggles += '<label for="kocfia-formation-ongoing-unit-'+ cityKey +'" title="Cacher la colonne de '+ city.label +'">'+ city.label +'</label>';
						headers += '<th data-city="'+ cityKey +'">'+ city.roman +'</th>';
						cels += '<td data-city="'+ cityKey +'"></td>';
					}
				}
				onGoing += '<div class="unit-toggles buttonset">Afficher : '+ toggles +'</div>';
				onGoing += '<table class="unit"><thead><tr>'+ headers +'<th>Suivi</th></tr></thead>';
				onGoing += '<tbody><tr>'+ cels +'<td class="info"></td></tr></tbody></table></div>';

				onGoing += '<h3>Fortifications en cours';
				onGoing += '<button class="button secondary history-toggle" title="Historique des fortifications" rel="fort"><span>Historique</span></button>';
				onGoing += '</h3><div class="formation-list ongoing">';
				onGoing += '<div class="fort-toggles buttonset">Afficher : '+ toggles +'</div>';
				onGoing += '<table class="fort"><thead><tr>'+ headers +'<th>Suivi</th></tr></thead>';
				onGoing += '<tbody><tr>'+ cels +'<td class="info"></td></tr></tbody></table></div>';

			var help = KOCFIA.formation.getHelp();
			var history = '<div id="kocfia-formation-history-unit" class="history unit" title="Historique des formations"></div>';
			history += '<div id="kocfia-formation-history-fort" class="history fort" title="Historique des fortifications"></div>';

			$section.html( form + onGoing + help + history );

			KOCFIA.formation.addSectionListeners();

			KOCFIA.formation.$forms = $section.find('.forms');
			KOCFIA.formation.$autoForm = $section.find('.automatic-train-form');
			KOCFIA.formation.$manualForm = $section.find('.manual-train-form');
			KOCFIA.formation.$ongoing = $section.find('.formation-list.ongoing');
			KOCFIA.formation.$ruleSwitch = $section.find('#kocfia-formation-rule-switch');
			KOCFIA.formation.$ruleName = $section.find('#kocfia-formation-rule-name');
			KOCFIA.formation.$nextTrainBar = $section.find('.nextIteration');
			KOCFIA.formation.$unitHistory = $section.find('.history.unit');
			KOCFIA.formation.$fortHistory = $section.find('.history.fort');
			KOCFIA.formation.$unitInfo = KOCFIA.formation.$ongoing.find('.unit').find('.info');
			KOCFIA.formation.$fortInfo = KOCFIA.formation.$ongoing.find('.fort').find('.info');

			KOCFIA.formation.$autoForm.find('.train-max, .train-quantity, .train-recalc').trigger('change');

			KOCFIA.formation.$forms.accordion({
				collapsible: true,
				autoHeight: false,
				animated: false,
				change: function(event, ui){
					KOCFIA.$confPanelWrapper[0].scrollTop = 0;
					KOCFIA.$confPanelWrapper[0].scrollLeft = 0;
				}
			})
			.accordion('activate', false);
		};

		KOCFIA.formation.addSectionListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation modPanel function');
			KOCFIA.$confPanel.find('#kocfia-formation')
				.on('change', '#formation-panel-automatic', function(){
					$('#formation-automatic').prop('checked', $(this).prop('checked')).change();
				})
				//save auto formation
				.on('click', '.save', function(){
					var result = KOCFIA.formation.planAutomaticRules();
					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						KOCFIA.formation.rules = result.rules;
						KOCFIA.formation.storeRules();

						var name = $.trim( KOCFIA.formation.$ruleName.val() ),
							code = '<option value="">Choisir</option>',
							ruleName;
						if( name !== '' ){
							var saveAndUpdateDropdown = function(){
								KOCFIA.formation.savedRules[ name ] = $.extend({}, KOCFIA.formation.rules);
								KOCFIA.formation.storeSavedRules();

								Shared.success( null );

								for( ruleName in KOCFIA.formation.savedRules ){
									if( KOCFIA.formation.savedRules.hasOwnProperty( ruleName ) ){
										code += '<option value="'+ ruleName +'">'+ ruleName +'</option>';
									}
								}
								KOCFIA.formation.$ruleSwitch[0].innerHTML = code;
							};

							if( KOCFIA.formation.savedRules.hasOwnProperty( name ) ){
								if( confirm('Ecraser la configuration portant ce nom ?') ){
									saveAndUpdateDropdown();
								}
							} else {
								saveAndUpdateDropdown();
							}
						} else {
							Shared.success( null );
						}
					}
				})
				//city change in manual formation
				.on('change', '#kocfia-formation-city', function(){
					var $this = $(this),
						$fieldset = $this.closest('fieldset'),
						$dynamic = $fieldset.find('.dynamic'),
						cityKey = $this.val();
					if( cityKey === '' ){
						//saving the form values
						$fieldset.data('values', $dynamic.find(':input').serializeArray());
						$dynamic.html('');
						$fieldset.find('.launch, .reset').hide();
					} else {
						$dynamic.html( KOCFIA.formation.getFieldset(cityKey, false) );
						$fieldset.find('.launch, .reset').show();
						var data = $fieldset.data('values'),
							$inputs = $dynamic.find(':input'),
							field;
						if( data ){
							for( var i = 0; i < data.length; i += 1 ){
								field = data[i];
								$inputs.filter('[name="'+ field.name +'"]').val( field.value );
							}
							$inputs.find('.train-max, .train-quantity').trigger('change');
						}
					}
				})
				//save manual formation
				.on('click', '.launch', function(){
					var result = KOCFIA.formation.planRule();
					if( result.errors.length ){
						Shared.notify( result.errors );
					} else {
						Shared.success( null );
						KOCFIA.formation.launchFormations( result.rule );
					}
				})
				//reset manual form
				.on('click', '.reset', function(){
					$(this).closest('.ui-accordion-content').find('.kocfia-error, .kocfia-success').remove();

					$fieldset.find('.launch, .reset').hide();
					var $inputs = KOCFIA.formation.$manualForm.find('input');
					inputs.filter('[type="checkbox"]').prop('checked', false);
					inputs.filter('[type="text"]').val('');

					KOCFIA.formation.$manualForm.find('select').val('');
				})
				//unit train max change affect duration
				.on('keyup change', '.train-max', function(){
					var $fieldset = $(this).closest('fieldset');

					var unit = $fieldset.find('.train-unit').val(),
						max = $fieldset.find('.train-max').val(),
						speed = $fieldset.find('.train-speed').val(),
						$output = $fieldset.find('.unit-duration');

					if( unit === '' || max === '' ){
						$output.html('');
						return;
					}

					var cityKey = $fieldset.find('.train-city').val();

					var time = KOCFIA.formation.unitTrainDuration( cityKey, unit, max, speed );

					//if speed != 0 readableDuration returns a range of two times
					if( Array.isArray(time) ){
						$output.html( Shared.readableDuration(time[0]) +' - '+ Shared.readableDuration(time[1]) );
					} else $output.html( Shared.readableDuration(time) );
				})
				//fortification quantity change affect duration
				.on('keyup change', '.train-quantity', function(){
					var $fieldset = $(this).closest('fieldset');

					var def = $fieldset.find('.train-defense').val(),
						qty = $fieldset.find('.train-quantity').val(),
						$output = $fieldset.find('.def-duration');

					if( def === '' || qty === '' ){
						$output.html('');
						return;
					}

					var cityKey = $fieldset.find('.train-city').val();

					var time = KOCFIA.formation.defenseTrainDuration( cityKey, def, qty );

					$output.html( Shared.readableDuration(time) );
				})
				.on('change', '.train-recalc', function(e){
					var $this = $(this),
						$fieldset = $(this).closest('fieldset'),
						$minmax = $fieldset.find('.train-min, .train-max');

					if( $this.prop('checked') ){
						$fieldset.find('.train-unit-max').trigger('click');
						$minmax.attr('readonly', 'readonly');
					} else {
						$minmax.removeAttr('readonly');
					}
				})
				//calc max trainable units
				.on('click', '.train-unit-max', function(){
					var $fieldset = $(this).closest('fieldset');

					var unit = $fieldset.find('.train-unit').val(),
						$max = $fieldset.find('.train-max'),
						$min = $fieldset.find('.train-min');

					if( unit === '' ){
						$max.val('').attr('title', '').trigger('change');
						return;
					}

					var speed = $fieldset.find('.train-speed').val(),
						workforce = $fieldset.find('.train-workforce').val(),
						cityKey = $fieldset.find('.train-city').val();

					var max = KOCFIA.formation.calcMaxUnit( cityKey, unit, speed, workforce, true ),
						min = Math.floor(max * KOCFIA.conf.formation.minPercentage);

					$min.val( Shared.format(min) || 0 ).attr('title', Shared.readable(min) || 0).trigger('change');
					$max.val( Shared.format(max) || 0 ).attr('title', Shared.readable(max) || 0).trigger('change');
				})
				//calc max fortifications
				.on('click', '.train-defense-max', function(){
					var $fieldset = $(this).closest('fieldset');

					var def = $fieldset.find('.train-defense').val(),
						$qty = $fieldset.find('.train-quantity');

					if( def === '' ){
						$qty.val('').attr('title', '');
						return;
					}

					var cityKey = $fieldset.find('.train-city').val();

					var nb = KOCFIA.formation.calcMaxDefense( cityKey, def );

					$qty.val( Shared.format(nb) || 0 ).attr('title', nb || 0).trigger('change');
				})
				//unit change, affect max unit
				.on('change', '.train-unit', function(){
					var $fieldset = $(this).closest('fieldset');

					var unit = $fieldset.find('.train-unit').val(),
						$max = $fieldset.find('.train-max');
					if( unit === '' ){
						$max.val('').attr('title', '');
						return;
					} else {
						//will call the duration update
						$max.trigger('change');
					}
				})
				//speed change, affect max unit
				.on('change', '.train-speed', function(){
					var $fieldset = $(this).closest('fieldset');

					var unit = $fieldset.find('.train-unit').val(),
						$max = $fieldset.find('.train-max');
					if( unit === '' ){
						$max.val('').attr('title', '');
						return;
					} else {
						//will call the duration update
						$max.trigger('change');
					}
				})
				//defense change, affect quantity
				.on('change', '.train-defense', function(){
					var $fieldset = $(this).closest('fieldset');

					var defense = $fieldset.find('.train-defense').val(),
						$qty = $fieldset.find('.train-quantity');
					if( defense === '' ){
						$qty.val('').attr('title', '');
						return;
					} else {
						//will call the duration update
						$qty.trigger('change');
					}
				})
				//training and fortification cancel
				.on('click', '.ongoing .unit .ui-icon-trash, .ongoing .unit .recursive', function(){
					var $this = $(this),
						cityKey = $this.closest('tbody').data('city'),
						$info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city="'+ cityKey +'"]').find('.info');
					if( $this.hasClass('recursive') ){
						var cancelSequence = function(){
							return $.Deferred(function(dfd){
								KOCFIA.formation.cancelTraining(dfd, cityKey, i, null, 3);
							}).promise();
						};

						var i = window.seed.queue_unt[cityKey].length;

						$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation des formations en masse en cours.</div>');

						$.when( cancelSequence() )
							.done(function(){
								$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation des formations en masse finies.</div>');
							})
							.fail(function(){
								$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation des formations en masse échouée.</div>');
							})
							.always(function(){
								KOCFIA.formation.listCityFormations( cityKey );
							});
					} else {
						$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation d\'une formation en cours.</div>');
						KOCFIA.formation.cancelTraining( null, null, null, $this.attr('rel'), 3 );
					}
				})
				.on('click', '.ongoing .fort .ui-icon-trash, .ongoing .fort .recursive', function(){
					var $this = $(this),
						cityKey = $this.closest('tbody').data('city'),
						$info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city="'+ cityKey +'"]').find('.info');

					if( $this.hasClass('recursive') ){
						var cancelSequence = function(){
							return $.Deferred(function(dfd){
								KOCFIA.formation.cancelFortification(dfd, cityKey, i, null, 3);
							}).promise();
						};

						var i = window.seed.queue_frt[cityKey].length;

						$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation des fortifications en masse en cours.</div>');

						$.when( cancelSequence() )
							.done(function(){
								$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation des fortifications en masse finie.</div>');
							})
							.fail(function(){
								$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation des fortifications en masse échouée.</div>');
							})
							.always(function(){
								KOCFIA.formation.listCityFormations( cityKey );
							});
					} else {
						$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation d\'une fortification en cours.</div>');
						KOCFIA.formation.cancelFortification( null, null, null, $this.attr('rel'), 3 );
					}
				})
				//keep values copy accross fieldsets
				.on('click', '.copy', function(){
					var $this = $(this),
						$fieldset = $this.closest('fieldset'),
						$other = $fieldset.siblings('fieldset'),
						rel = $this.attr('rel');
					if( rel == 'keep' ){
						var keeps = $fieldset.find('.train-keep').find('input').map(function(){ return this.value; }).get();

						$other.each(function(){
							$(this).find('.train-keep').find('input').each(function(j, field){
								field.value = keeps[j];
							});
						});
					} else if( rel == 'unit' ){
						var units = $fieldset.find('.unit').find('input, select').map(function(){ return this.value; }).get(),
							recalc = $fieldset.find('.train-recalc').prop('checked');

						if( recalc ){
							$other.find('.train-recalc').prop('checked', recalc).trigger('change');
						} else {
							$other.each(function(){
								$(this).find('.unit').find('input, select').each(function(j){
									var $field = $(this);
									if( $field.hasClass('train-unit') ){
										if( $field.find('option').filter('[value="'+ units[j] +'"]').length ){
											$field.val(units[j]);
										} else {
											$field.val('');
										}
									} else {
										$field.val(units[j]);
									}
								});
							});

							$other.find('.train-max').trigger('change');
						}
					} else if( rel == 'defense' ){
						var defenses = $fieldset.find('.defense').find('input, select').map(function(){ return this.value; }).get();

						$other.each(function(){
							$(this).find('.defense').find('input, select').each(function(j){
								var $field = $(this);
								if( $field.hasClass('train-defense') ){
									if( $field.find('option').filter('[value="'+ defenses[j] +'"]').length ){
										$field.val(defenses[j]);
									} else {
										$field.val('');
									}
								} else {
									$field.val(defenses[j]);
								}
							});
						});

						$other.find('.train-quantity').trigger('change');
					}
				})
				//saved rule load
				.on('click', '.train-rule-load', function(){
					var choice = KOCFIA.formation.$ruleSwitch.val(),
						code = '', i;
					if( choice !== '' && KOCFIA.formation.savedRules.hasOwnProperty( choice ) ){
						KOCFIA.formation.rules = $.extend({}, KOCFIA.formation.savedRules[ choice ]);

						KOCFIA.formation.$autoForm.find('fieldset').remove();
						for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
							code += KOCFIA.formation.getFieldset( KOCFIA.citiesKey[i], true );
						}

						KOCFIA.formation.$autoForm.find('div').eq(0).after( code );

						KOCFIA.formation.$forms.accordion('activate', false).accordion('activate', 0);

						KOCFIA.formation.$form.find('#kocfia-formation-rule-name').val( choice );

						KOCFIA.formation.$ruleSwitch.val('');
						KOCFIA.formation.storeRules();
					} else {
						Shared.notify('Choix non valide');
					}
				})
				//saved rule delete
				.on('click', '.train-rule-delete', function(){
					var choice = KOCFIA.formation.$ruleSwitch.val(),
						code = '', i;

					if( choice !== '' && KOCFIA.formation.savedRules.hasOwnProperty( choice ) ){
						if( confirm('Etes-vous sûr ?') ){
							delete KOCFIA.formation.savedRules[ choice ];

							KOCFIA.formation.$ruleSwitch.find('option').filter('[value="'+ choice +'"]').remove();
							KOCFIA.formation.$ruleSwitch.val('');

							KOCFIA.formation.storeSavedRules();

							Shared.success('Suppression réussie');
						}
					}
				})
				//city toggles
				.on('change', '.unit-toggles input, .fort-toggles input', function(){
					var $this = $(this),
						cityKey = $this.val(),
						checked = $this.prop('checked'),
						target = ($this.closest('div').hasClass('unit-toggles') ? '.unit' : '.fort'),
						$table = KOCFIA.formation.$ongoing.find(target);

					$table.find('th, td').filter('[data-city="'+ cityKey +'"]').toggle( checked );
				});
		};

		KOCFIA.formation.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation on function');

			KOCFIA.formation.getTrainingGamble( 3 );

			var delayed = function(i){
				window.setTimeout(function(){
					if( KOCFIA.cities.hasOwnProperty(KOCFIA.citiesKey[i]) ){
						KOCFIA.formation.listCityFormations( KOCFIA.citiesKey[i] );
					}
				}, i * 100 + 500);
			};

			var i, length = KOCFIA.citiesKey.length;
			for( i = 0; i < length; i += 1 ){
				delayed(i);
			}

			if( KOCFIA.conf.formation.automatic ){
				KOCFIA.formation.automaticOn();
			}
		};

		KOCFIA.formation.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation off function');

			KOCFIA.formation.automaticOff();
		};

		KOCFIA.formation.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation automaticOn function');
			$('#formation-panel-automatic').prop('checked', true);

			//recursive call every 12 minutes
			Shared.nextIteration( KOCFIA.formation.$nextTrainBar, 12 * 60 );
			autoFormationInterval = window.setInterval(function(){
				Shared.nextIteration( KOCFIA.formation.$nextTrainBar, 12 * 60 );
				KOCFIA.formation.launchAutomaticFormations();
			}, 12 * 60 * 1000);

			KOCFIA.formation.launchAutomaticFormations();
		};

		KOCFIA.formation.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation automaticOff function');
			$('#formation-panel-automatic').prop('checked', false);

			window.clearInterval( autoFormationInterval );
			//Shared.stopProgress( KOCFIA.formation.$nextTrainBar );
		};

		KOCFIA.formation.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getHelp function');
			var help = '<div id="kocfia-formation-help" class="help" title="Aide formation">';
			help += '<h4>Formation automatique</h4><ul>';
			help += '<li>La configuration automatique en cours peut être sauvegardée en lui attribuant un nom</li>';
			help += '<li>Cocher les villes ou la formation automatique sera utilisée</li>';
			help += '<li>Une ville décochée sera omise lors des tentatives de formations automatique</li>';
			help += '<li>Choisir une unité ou une fortification ou les deux</li>';
			help += '<li>Spécifier une quantité de troupe minimum et maximum</li>';
			help += '<li>(optionel) Activer l\'option de recalcul du minimum et maximum à chaque tentative de formation.</li>';
			help += '<li>Spécifier une vitesse (optionnel, par défaut vitesse de base)</li>';
			help += '<li>Choisir le pourcentage de travailleurs utilisables (optionnel, par défaut 0%)</li>';
			help += '<li>Spécifier une quantité de fortification</li>';
			help += '<li>Spécifier les quantités de ressources à conserver (optionnel)</li>';
			help += '<li>Les quantités peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2m pour deux millions, 3g pour trois milliards)</li>';
			help += '<li>Cliquer sur enregistrer</li>';
			help += '<li>Si les formations automatiques sont actives, la modification sera prise en compte dès la prochaine tentative de formation</li>';
			help += '<li>Douze minutes entre chaque tentative</li>';
			help += '</ul><h4>Configurations enregistrées</h4><ul>';
			help += '<li>Une configuration sauvegardée peut être chargée ou supprimée</li>';
			help += '<li>Une configuration chargée sera prise en compte à la prochaine tentative de formation (pour les villes cochées)</li>';
			help += '<li>Une configuration supprimée n\'affecte pas la configuration en cours</li>';
			help += '</ul><h4>Formation manuelle</h4><ul>';
			help += '<li>Choisir une ville</li>';
			help += '<li>Le remplissage du formulaire se fait comme pour les formations automatiques</li>';
			help += '<li>Cliquer sur Former</li>';
			help += '<li>La file d\'attente sera remplie jusqu\'à ne plus avoir de place dans les casernes ou d\'avoir une erreur</li>';
			help += '<li>20 secondes entre chaque tentative</li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.formation.getFieldset = function( cityKey, withWrapper ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getFieldset function', cityKey, withWrapper);
			var city = KOCFIA.cities[ cityKey ],
				rule = KOCFIA.formation.rules[ cityKey ],
				units = KOCFIA.formation.getTrainableUnits( cityKey ),
				defenses = KOCFIA.formation.getTrainableDefenses( cityKey ),
				rLength = KOCFIA.resources.length;

			var form = '';
			if( withWrapper ){
				form += '<fieldset>';
				form += '<legend class="buttonset">';
				form += '<input type="checkbox" class="train-city" id="kocfia-formation-auto-'+ cityKey +'" ';
				form += ( rule && rule.active ? 'checked' : '' ) +' value="'+ cityKey +'" autocomplete="off" required>';
				form += '<label for="kocfia-formation-auto-'+ cityKey +'">'+ city.label +'</label></legend>';
			}

			form += '<p class="unit">';
			//choose unit (check building requirements and tech requirements)
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-unit">Unités&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-unit" class="train-unit" name="unit" autocomplete="off">';
				form += '<option value=""></option>';

				for( u in units ){
					if( units.hasOwnProperty(u) ){
						var name = window.unitcost[u][0];
						if( name == 'Unité de Ravitaillement' ) name = 'Ravitailleur';
						else if( name == 'Wagon de Ravitaillement' ) name = 'Wagon';

						form += '<option value="'+ u +'" '+ ( withWrapper && rule && rule.troop == u ? 'selected' : '' ) +'>'+ name +'</option>';
					}
				}
				form += '</select>';

			//choose pack min and max size
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-min">Min&nbsp;:&nbsp;</label>';
				form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-min" name="min" class="train-min" pattern="'+ Shared.numberRegExp +'" placeholder="1.2k" ';
				form += 'autocomplete="off" value="'+ ( withWrapper && rule && rule.min >= 0 ? Shared.format(rule.min) : '' ) +'">';
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-max">Max&nbsp;:&nbsp;</label>';
				form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-max" name="max" class="train-max" pattern="'+ Shared.numberRegExp +'" placeholder="1.2k" ';
				form += 'autocomplete="off" value="'+ ( withWrapper && rule && rule.max >= 0 ? Shared.format(rule.max) : '' ) +'">';
				form += '<button class="train-unit-max button secondary">Maximum</button>';
				if( withWrapper ){
					form += '<span class="buttonset">';
					form += '<input type="checkbox" id="kocfia-formation-auto-'+ cityKey +'-recalc" class="train-recalc" "'+ (rule && rule.recalc ? 'checked' : '') +'">';
					form += '<label for="kocfia-formation-auto-'+ cityKey +'-recalc" title="Recalcul du minimum et maximum à chaque tentative">Recalcul</label>';
					form += '</span>';
				}

			//choose speed
				form += '<br /><label for="kocfia-formation-auto-'+ cityKey +'-speed">Vitesse&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-speed" name="speed" class="train-speed" autocomplete="off">';
				form += '<option value="0">Normal</option>';
				form += '<option value="1"'+ ( withWrapper && rule && rule.speed == 1 ? 'selected' : '' ) +'>5-15% (coût x2)</option>';
				form += '<option value="2"'+ ( withWrapper && rule && rule.speed == 2 ? 'selected' : '' ) +'>10-25% (coût x4)</option>';
				form += '</select>';

			//choose boost
			// /!\ boost incompatible avec speed
			/*
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-item">Objet ?</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-item" name="item" autocomplete="off">';
				form += '<option value="">Non</option>';
				form += '<option value="36">"+ window.itemlist.i36.name + '(' + (window.seed.items.i36 ? window.seed.items.i36 : 0) + ')</option>';
				form += '<option value="37">"+ window.itemlist.i37.name + '(' + (window.seed.items.i37 ? window.seed.items.i37 : 0) + ')</option>';
				form += '<option value="38">"+ window.itemlist.i38.name + '(' + (window.seed.items.i38 ? window.seed.items.i38 : 0) + ')</option>';
				form += '</select>';
			*/

			//choose workforce percentage
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-workforce">Travailleurs&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-workforce" name="workforce" class="train-workforce" autocomplete="off">';
				form += '<option value="0">0%</option>';
				form += '<option value="0.25" '+ ( withWrapper && rule && rule.workforce == 0.25 ? 'selected' : '' ) +'>25%</option>';
				form += '<option value="0.50" '+ ( withWrapper && rule && rule.workforce == 0.50 ? 'selected' : '' ) +'>50%</option>';
				form += '<option value="0.75" '+ ( withWrapper && rule && rule.workforce == 0.75 ? 'selected' : '' ) +'>75%</option>';
				form += '<option value="1"'+ ( withWrapper && rule && rule.workforce == 1 ? 'selected' : '' ) +'>100%</option>';
				form += '</select>';

			//duration
				form += '<label>Durée&nbsp;:&nbsp;</label>';
				form += '<output class="unit-duration"></output>';
			form += '</p>';

			//defenses
				form += '<p class="defense">';
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-defense">Défenses&nbsp;:&nbsp;</label>';
				form += '<select id="kocfia-formation-auto-'+ cityKey +'-defense" name="defense" class="train-defense" autocomplete="off">';
				form += '<option value=""></option>';
				for( d in defenses ){
					if( defenses.hasOwnProperty(d) ){
						f = d.replace(/frt/, 'fort');
						form += '<option value="'+ d +'" '+ ( withWrapper && rule && rule.defense == d ? 'selected' : '' ) +'>';
						form += window.fortcost[d][0] +'</option>';
					}
				}
				form += '</select>';
				form += '<label for="kocfia-formation-auto-'+ cityKey +'-qty">Quantité&nbsp;:&nbsp;</label>';
				form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-quantity" name="quantity" class="train-quantity" pattern="'+ Shared.numberRegExp +'" placeholder="1.2k" ';
				form += 'autocomplete="off" value="'+ ( withWrapper && rule && rule.quantity >= 0 ? rule.quantity : '' ) +'">';
				form += '<button class="button secondary train-defense-max">Maximum</button>';
				form += '<label>Durée&nbsp;:&nbsp;</label>';
				form += '<output class="def-duration"></output>';
				form += '</p>';

			//keep resources ? (in easy format, with validation)
				form += '<p class="train-keep">';
				form += '<label>Conserver&nbsp;:&nbsp;</label>';
				for( j = 0; j < rLength; j += 1 ){
					res = KOCFIA.resources[j];
					if( res.name != 'resource5' ){
						form += '<label for="kocfia-formation-auto-'+ cityKey +'-keep-'+ res.name +'">';
						form += '<img src="'+ res.icon +'" title="'+ res.label +'">';
						form += '</label>';
						form += '<input type="text" id="kocfia-formation-auto-'+ cityKey +'-keep-'+ res.name +'" ';
						form += 'name="'+ res.key +'" autocomplete="off" pattern="'+ Shared.numberRegExp +'" placeholder="1.2k" ';
						form += 'value="'+ ( withWrapper && rule && rule.keep[ res.key ] >= 0 ? Shared.format(rule.keep[ res.key ]) : '' ) +'">';
					}
				}
			form += '</p>';
			if( withWrapper ){
				form += '<div class="cf">';
				form += 'Appliquer les réglages suivant dans les autres villes : ';
				form += '<button class="copy button secondary" rel="unit"><span>Unités</span></button>';
				form += '<button class="copy button secondary" rel="defense"><span>Défenses</span></button>';
				form += '<button class="copy button secondary" rel="keep"><span>Conservation</span></button>';
				form += '</div>';
				form += '</fieldset>';
			}

			return form;
		};

		KOCFIA.formation.storeRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation storeRules function');
			localStorage.setObject('kocfia_formation_rules_' + KOCFIA.storeUniqueId, KOCFIA.formation.rules);
		};

		KOCFIA.formation.storeSavedRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation storeSavedRules function');
			localStorage.setObject('kocfia_formation_savedRules_' + KOCFIA.storeUniqueId, KOCFIA.formation.savedRules);
		};

		KOCFIA.formation.deleteAllRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation deleteAllRules function');
			localStorage.removeItem('kocfia_formation_rules_' + KOCFIA.storeUniqueId);
			localStorage.removeItem('kocfia_formation_savedRules_' + KOCFIA.storeUniqueId);

			KOCFIA.formation.rules = {};
			KOCFIA.formation.savedRules = {};
			KOCFIA.formation.$ruleSwitch.find('option').filter(':gt(0)').remove();
		};

		KOCFIA.formation.getTrainingGamble = function( attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getTrainingGamble function');
			var params = $.extend({}, window.g_ajaxparams);

			$.ajax({
				url: window.g_ajaxpath + "ajax/getTroopGambles.php" + window.g_ajaxsuffix,
				type: 'post',
				data: params,
				dataType: 'json',
				timeout: 10000
			})
			.done(function(result){
				var min1 = result["1"].min,
					max1 = result["1"].max,
					cost1 = result["1"].cost,
					min2 = result["2"].min,
					max2 = result["2"].max,
					cost2 = result["2"].cost;

				window.gambleOptionResults1 = [min1, max1, cost1];
				window.gambleOptionResults2 = [min2, max2, cost2];
			})
			.fail(function(){
				attempts -= 1;
				if( attempts > 0 ){
					KOCFIA.formation.getTrainingGamble( attempts );
				}
			});
		};

		KOCFIA.formation.planAutomaticRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation planAutomaticRules function');
			var rules = {},
				errors = [],
				$fieldsets = KOCFIA.formation.$autoForm.find('fieldset'),
				rule, nbErr, hasTroop, hasDef, cityLabel, $city, troop, defense, min, max, quantity, $res, rkeep;

			$fieldsets.each(function(){
				var $fieldset = $(this),
				rule = {};
				nbErr = 0;
				hasTroop = false;
				hasDef = false;
				$city = $fieldset.find('.train-city');
				cityLabel = $.trim( $fieldset.find('legend').text() );
				//city
				rule.cityKey = $city.val();
				rule.active = $city.prop('checked') ? 1 : 0;

				//check troop
				troop = $fieldset.find('.train-unit').val();
				if( troop !== '' ){
					hasTroop = true;
					rule.troop = troop;

					//check min and max
					min = Shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
					max = Shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

					if( min !== false && max !== false && min >= 1 && max >= min ){
						rule.min = min;
						rule.max = max;
					} else {
						errors.push('Quantités de troupes invalide pour '+ cityLabel +'.');
						nbErr += 1;
					}

					//optional recompute of maximum at each formation try
					rule.recalc = $fieldset.find('.train-recalc').prop('checked');

					//speed
					rule.speed = $fieldset.find('.train-speed').val();

					//workforce
					rule.workforce = parseFloat( $fieldset.find('.train-workforce').val() );
				}

				//check defense
				defense = $fieldset.find('.train-defense').val();
				if( defense !== '' ){
					hasDef = false;
					rule.defense = defense;

					//check quantity
					quantity = Shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
					if( qty !== false && qty >= 1 ){
						rule.qty = qty;
					}
				}

				//check keep
				rule.keep = {};
				if( hasTroop || hasDef ){
					$fieldset.find('.train-keep').find('input').each(function(){
						res = $.trim( this.value );
						if( res !== '' ){
							res = Shared.decodeFormat( res );
							if( res === false ){
								nbErr += 1;
								errors.push('Au moins une des quantité de ressources à conserver est invalide pour '+ cityLabel +'.');
							} else {
								rule.keep[ this.name ] = res;
							}
						}
					});
				}

				if( nbErr === 0 && (hasTroop || hasDef) ){
					rules[ rule.cityKey ] = rule;
				}
			});

			return {rules: rules, errors: errors};
		};

		KOCFIA.formation.planRule = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation planRule function');
			var rule = {},
				errors = [],
				$fieldset = KOCFIA.formation.$manualForm.find('fieldset'),
				nbErr, hasTroop, hasDef, cityLabel = '', $city, troop,
				defense, min, max, quantity, $res, res, rkeep;

			nbErr = 0;
			hasTroop = false;
			hasDef = false;
			$city = $fieldset.find('.train-city');

			//city
			rule.cityKey = $city.val();

			if( rule.cityKey === '' ){
				errors.push('Ville invalide.');
			}

			//check troop
			troop = $fieldset.find('.train-unit').val();
			if( troop !== '' ){
				hasTroop = true;
				rule.troop = troop;

				//check min and max
				min = Shared.decodeFormat( $.trim( $fieldset.find('.train-min').val() ) );
				max = Shared.decodeFormat( $.trim( $fieldset.find('.train-max').val() ) );

				if( min !== false && max !== false && min >= 1 && max >= min ){
					rule.min = min;
					rule.max = max;
				} else {
					errors.push('Quantités de troupes invalide.');
					nbErr += 1;
				}

				//speed
				rule.speed = $fieldset.find('.train-speed').val();

				//workforce
				rule.workforce = parseFloat( $fieldset.find('.train-workforce').val() );
			}

			//check defense
			defense = $fieldset.find('.train-defense').val();
			if( defense !== '' ){
				hasDef = false;
				rule.defense = defense;

				//check quantity
				quantity = Shared.decodeFormat( $.trim( $fieldset.find('.train-quantity').val() ) );
				if( qty !== false && qty > 1 ){
					rule.qty = qty;
				}
			}

			//check keep
			rule.keep = {};
			$fieldset.find('.train-keep').find('input').each(function(){
				res = $.trim( this.value );
				if( res !== '' ){
					res = Shared.decodeFormat( res );
					if( res !== false && res > 1 ){
						rule.keep[ this.name ] = res;
					} else {
						nbErr += 1;
						errors.push('Au moins une des quantité de ressources à conserver est invalide.');
					}
				}
			});

			if( !hasTroop && !hasDef ){
				errors.push('Aucune troupe et aucune fortification, configuration non prise en compte.');
			}

			return {rule: rule, errors: errors};
		};

		KOCFIA.formation.launchAutomaticFormations = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation launchAutomaticFormations function');
			if( !KOCFIA.conf.formation.active || !KOCFIA.conf.formation.automatic ){
				return;
			}

			var delayedTrain = function(i, rule){
				window.setTimeout(function(){
					KOCFIA.formation.addToQueue( rule, null );
				}, i * 12000);
			};

			var cityKey, rule, i = 0;
			for( cityKey in KOCFIA.formation.rules ){
				if( KOCFIA.formation.rules.hasOwnProperty(cityKey) ){
					rule = KOCFIA.formation.rules[ cityKey ];
					if( rule.active ){
						delayedTrain( i, rule );
						i += 1;
					}
				}
			}
		};

		KOCFIA.formation.launchFormations = function( rule ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation launchFormations function');
			if( !KOCFIA.conf.formation.active ){
				return;
			}

			KOCFIA.formation.fillQueue( rule );
		};

		KOCFIA.formation.listCityFormations = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation listCityFormations function', cityKey);
			if( KOCFIA.formation.hasOwnProperty('$ongoing') ){
				var $unit = KOCFIA.formation.$ongoing.find('.unit'),
					$unitTh = $unit.find('th').filter('[data-city="'+ cityKey +'"]'),
					$unitTd = $unit.find('td').filter('[data-city="'+ cityKey +'"]'),
					$fort = KOCFIA.formation.$ongoing.find('.fort'),
					$fortTh = $fort.find('th').filter('[data-city="'+ cityKey +'"]'),
					$fortTd = $fort.find('td').filter('[data-city="'+ cityKey +'"]'),
					code = '', formations = '', fortifications = '',
					i, formation, unit, queue, duration, smallDuration,
					timestamp = Date.timestamp();
				//array of [tid, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]

				//troops
				queue = window.seed.queue_unt[ cityKey ];
				if( queue.length > 0 ){
					formations += '<div class="global"><button class="button danger recursive" title="Supprimer les formations de cette ville à partir de la deuxième incluse">';
					formations += '<span>Supprimer &ge; 2e</span></button></div>';
				}
				formations += '<ol class="formations">';
				for( i = 0; i < queue.length; i += 1 ){
					formation = queue[i];
					unit = KOCFIA.unitInfo[ 'unt' + formation[0] ];

					formations += '<li title="'+ unit.label +' - '+ Shared.readable( formation[1] ) +' - '+ Shared.readableDuration(parseFloat(formation[3]) - parseFloat(formation[2])) +'">';
					formations += '<span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityKey.replace(/city/, '') +','+ formation[0] +','+ formation[1] +','+ formation[3] +','+ formation[2] +','+ formation[5] +'" title="Annuler cette formation"></span>&nbsp;';
					formations += '<img src="'+ unit.icon +'" alt="'+ unit.label +'"> ';
					formations += '<span class="unit">'+ Shared.format( formation[1] ) +'</span></li>';
				}
				if( queue.length > 0 ){
					duration = Shared.readableDuration( parseFloat(formation[3]) - timestamp );
					smallDuration = duration.split(' ');
					if( smallDuration.length >= 2 ) smallDuration = smallDuration.slice(0, 2).join(' ');
					else smallDuration = duration;

					$unitTh.attr('title', duration).find('span').remove().end().append('<span>'+ smallDuration +'</span>');
				} else $unitTh.attr('title', '').find('span').remove();
				$unitTd.html( formations );
				formations += '</ol>';

				//defenses
				queue = window.seed.queue_fort[cityKey];
				if( queue.length > 0 ){
					fortifications += '<div class="global"><button class="button danger recursive" title="Supprimer les formations de cette ville à partir de la deuxième incluse">';
					fortifications += '<span>Supprimer &ge; 2e</span></button></div>';
				}
				fortifications += '<ol class="defenses">';
				for( i = 0; i < queue.length; i += 1 ){
					formation = queue[i];
					unit = KOCFIA.fortInfo[ 'frt' + formation[0] ];

					fortifications += '<li title="'+ unit.label +' - '+ Shared.readable( formation[1] ) +' - '+ Shared.readableDuration(parseFloat(formation[3]) - parseFloat(formation[2])) +'">';
					fortifications += '<span class="ui-icon ui-icon-trash" rel="'+ i +','+ cityKey.replace(/city/, '') +','+ unit[0] +','+ unit[1] +','+ unit[3] +','+ unit[2] +','+ unit[5] +','+ unit[6] +'" title="Annuler cette fortification"></span>&nbsp;';
					fortifications += '<img src="'+ unit.icon +'" alt="'+ unit.label +'"> ';
					fortifications += '<span class="unit">'+ Shared.format( formation[1] ) +'</span></li>';
				}
				if( queue.length > 0 ){
					duration = Shared.readableDuration( parseFloat(formation[3]) - timestamp );
					smallDuration = duration.split(' ');
					if( smallDuration.length >= 2 ) smallDuration = smallDuration.slice(0, 2).join(' ');
					else smallDuration = duration;

					$fortTh.attr('title', duration).find('span').remove().end().append('<span>'+ smallDuration +'</span>');
				} else $fortTh.attr('title', '').find('span').remove();
				$fortTd.html( fortifications );
				fortifications += '</ol>';
			}
		};

		KOCFIA.formation.getTrainableUnits = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getTrainableUnits function', cityKey);

			var units = {}, u, unitc, building, tech, b, t;

			for( u in window.unitcost ){
				if( window.unitcost.hasOwnProperty(u) ){
					unitc = window.unitcost[u];
					//check building requirement
						b = true;
						if( typeof unitc[8] == 'object' && !$.isArray(unitc[8]) && !$.isEmptyObject(unitc[8]) ){
							b = false;
							for( building in unitc[8] ){
								if( unitc[8].hasOwnProperty( building ) ){
									if( Shared.buildingHighestLevel( cityKey, building.substr(1) ) >= unitc[8][building][1] ){
										b = true;
									}
								}
							}
						}

					//check tech requirement
						t = true;
						if( typeof unitc[9] == 'object' && !$.isArray(unitc[9]) && !$.isEmptyObject(unitc[9]) ){
							t = false;
							for( tech in unitc[9] ){
								if( unitc[9].hasOwnProperty( tech ) ){
									if( window.seed.tech[ 'tch' + tech.substr(1) ] >= unitc[9][tech][1] ){
										t = true;
									}
								}
							}
						}

					if( b && t ) units[ u ] = unitc.name;
				}
			}
			return units;
		};

		KOCFIA.formation.getTrainableDefenses = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getTrainableDefenses function', cityKey);

			var forts = {}, f, fortc, building, tech, b, t;

			for( f in window.fortcost ){
				if( window.fortcost.hasOwnProperty(f) ){
					fortc = window.fortcost[f];
					//check building requirement
						b = true;
						if( typeof fortc[8] == 'object' ){
							b = false;
							for( building in fortc[8] ){
								if( fortc[8].hasOwnProperty( building ) ){
									if( Shared.buildingHighestLevel( cityKey, building.substr(1) ) >= fortc[8][building][1] ){
										b = true;
									}
								}
							}
						}
					//check tech requirement
						t = true;
						if( typeof fortc[9] == 'object' ){
							t = false;
							for( tech in fortc[9] ){
								if( fortc[9].hasOwnProperty( tech ) ){
									if( window.seed.tech[ 'tch' + tech.substr(1) ] >= fortc[9][tech][1] ){
										t = true;
									}
								}
							}
						}

					if( b && t ) forts[ f ] = fortc.name;
				}
			}
			return forts;
		};

		KOCFIA.formation.calcMaxUnit = function( cityKey, unit, speed, workforce, popOnly ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation calcMaxUnit function', cityKey, unit, speed, workforce);

			var mod, i, nb, cost = [], res = [],
				unitcost = window.unitcost[ unit ],
				resources = window.seed.resources[ cityKey ],
				cityStat = window.seed.citystats[ cityKey ];

			if( speed == '0' ){
				mod = 1;
			} else if( speed == '1' ){
				mod = ~~ (1 * window.gambleOptionResults1[2]);
			} else if( speed == '2' ){
				mod = ~~ (1 * window.gambleOptionResults2[2]);
			}

			for( i = 1; i < 5; i += 1 ){
				cost.push( parseInt(unitcost[i], 10) * 3600 * mod );
				res.push( parseInt(resources["rec" + i][0], 10) );
			}

			if( popOnly ){
				cost.push( parseInt(unitcost[5], 10) * mod );
				res.push( parseInt(cityStat.gold[0], 10) );
			}

			cost.push( parseInt(unitcost[6], 10) );
			res.push( parseInt(cityStat.pop[0], 10) - parseInt(cityStat.pop[3], 10) + parseInt(cityStat.pop[3], 10) * workforce );

			nb = res[0] / cost[0];
			if( popOnly ){
				for( i = 1; i < cost.length; i += 1 ){
					if( cost[i] !== 0 ){
						nb = Math.min(nb, res[i] / cost[i]);
					}
				}
			}

			return nb;
		};

		KOCFIA.formation.calcMaxDefense = function( cityKey, def ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation calcMaxDefense function');
			var mod, i, d, nb, check, slot, cost = [], res = [],
				fortcost = window.fortcost[def],
				resources = window.seed.resources[cityKey],
				buildings = window.seed.buildings[cityKey];

			for( i = 1; i < 5; i += 1 ){
				cost.push( parseInt(fortcost[i], 10) * 3600 );
				res.push( parseInt(resources["rec" + i][0], 10) );
			}

			nb = res[0] / cost[0];
			for( i = 1; i < cost.length; i += 1 ){
				nb = Math.min(nb, res[i] / cost[i]);
			}

			nb = parseInt(nb, 10);

			mod = 0;
			wallLevel = parseInt(buildings.pos1[1], 10);
			for( i = 1; i < (wallLevel + 1); i += 1 ){
				mod += (i * 1000);
			}

			mod = mod / 2;

			slot = KOCFIA.formation.getWallSlots(cityKey, true);
			check = 0;
			def = def.replace(/frt/, '');
			if( def < 60 ){
				check = parseInt((mod - slot[0]) / parseInt(window.fortstats["unt" + def][5], 10), 10);
			} else {
				check = parseInt((mod - slot[1]) / parseInt(window.fortstats["unt" + def][5], 10), 10);
			}

			if( check < nb ){
				nb = check;
			}

			return nb;
		};

		KOCFIA.formation.unitTrainDuration = function( cityKey, unit, qty, speed ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation unitTrainDuration function');
			if( unit.indexOf('unt') == -1 ){
				unit = 'unt' + unit;
			}

			qty = Shared.decodeFormat( qty );

			var time = parseInt(window.unitcost[unit][7], 10) * qty,
				stat = KOCFIA.dataAndStats.stats[ cityKey ],
				u = parseInt(unit.replace(/unt/, ''), 10);

			modifier = stat.infantryBonus;
			if( u > 8 ) modifier = stat.cavaleryBonus;
			else if( u > 6 ) modifier = stat.cavaleryBonus;

			modifier = modifier * (1 + (window.cm.ThroneController.effectBonus(77) / 100));
			if( window.cm.WorldSettings.isOn("GUARDIAN_MARCH_EFFECT") ){
				modifier = modifier * (1 + Shared.getGuardianBonus( cityKey, 'train' ));
			}

			if( speed == '0' ){
				return Math.max(1, Math.ceil(time / modifier));
			} else if( speed == '1' ){
				return [Math.ceil((100 - window.gambleOptionResults1[1]) / 100 * time), Math.ceil((100 - window.gambleOptionResults1[0]) / 100 * time)];
			} else if( speed == '2' ){
				return [Math.ceil((100 - window.gambleOptionResults2[1]) / 100 * time), Math.ceil((100 - window.gambleOptionResults2[0]) / 100 * time)];
			}
		};

		KOCFIA.formation.defenseTrainDuration = function( cityKey, fort, qty ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation defenseTrainDuration function');
			if( fort.indexOf('frt') == -1 ){
				fort = 'frt' + fort;
			}

			qty = Shared.decodeFormat( qty );

			var time = parseInt(window.fortcost[fort][7], 10) * qty,
				stat = KOCFIA.dataAndStats.stats[ cityKey ],
				modifier = stat.defenseBonus;

			time = Math.max(1, Math.ceil(time / modifier));

			time = Math.round(time / (1 + (window.cm.ThroneController.effectBonus(78) / 100)));

			return time;
		};

		KOCFIA.formation.getWallSlots = function(cityKey, withQueue ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation getWallSlots function');
			var fortifications = window.seed.fortifications[cityKey],
				result = [0, 0],
				f, def, fortification;
			for( f in fortifications ){
				if( fortifications.hasOwnProperty(f) ){
					fortification = fortifications[f];
					def = f.replace(/fort/, '');

					if( def < 60 ){
						result[0] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(fortification, 10);
					} else {
						result[1] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(fortification, 10);
					}
				}
			}

			if( withQueue ){
				var queue = window.seed.queue_fort[cityKey];
				for( var i = 0; i < queue.length; i += 1 ){
					def = parseInt(queue[i][0], 10);
					if( def < 60 ){
						result[0] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(queue[i][1], 10);
					} else {
						result[1] += parseInt(window.fortstats["unt" + def][5], 10) * parseInt(queue[i][1], 10);
					}
				}
			}

			return result;
		};

		KOCFIA.formation.cancelTraining = function( dfd, cityKey, i, info, attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation cancelTraining function');
			var j, totalReturn,
				params = $.extend({}, window.g_ajaxparams);

			if( dfd ){
				if( i === 0 || i > window.seed.queue_unt.length ) return dfd.resolve();

				info = window.seed.queue_unt[cityKey][i];
			} else {
				info = info.split(',');
				cityKey = 'city' + info[1];
			}

			var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city="'+ cityKey +'"]').find('.info');

			params.requestType = "CANCEL_TRAINING";
			params.cityId = info[1];
			params.typetrn = info[2];
			params.numtrptrn = info[3];
			params.trnETA = info[4];
			params.trnTmp = info[5];
			params.trnNeeded = info[6];

			$.ajax({
					url: window.g_ajaxpath + 'ajax/cancelTraining.php' + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function( result ){
					if( result.ok ){
						window.update_seed_ajax(true, function(){
							for( var k = 1; k < 5; k += 1 ){
								totalReturn = parseInt(window.unitcost["unt" + info[1]][k], 10) * parseInt(info[2], 10) * 3600 / 2;
								window.seed.resources[cityKey]["rec" + k][0] = parseInt(window.seed.resources[cityKey]["rec" + k][0], 10) + totalReturn;
							}
						});

						var j = 0, k;
						for( k = 0; k < window.seed.queue_unt[cityKey].length; k += 1 ){
							if( k > info[0] ){
								window.seed.queue_unt[cityKey][k][2] = parseInt(result.dateTraining[j]["start"], 10);
								window.seed.queue_unt[cityKey][k][3] = parseInt(result.dateTraining[j]["end"], 10);
								j += 1;
							}
						}
						//remove canceled training
						window.seed.queue_unt[cityKey].splice(info[0], 1);

						if( dfd === null ){
							KOCFIA.formation.listCityFormations( cityKey );
							$info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation réussie.</div>');
						} else {
							return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i - 1, null, 3) );
						}
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							if( dfd ) return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i, null, attempts) );
							else KOCFIA.formation.cancelTraining( null, null, null, info, attempts );
						} else {
							if( dfd ) return dfd.reject();
							else $info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation de formation échouée (erreur serveur).</div>');
						}
					}
				}).fail(function(){
					//network or server error
					attempts -= 1;
					if( attempts > 0 ){
						if( dfd ) return dfd.pipe( KOCFIA.formation.cancelTraining(dfd, cityKey, i, null, attempts) );
						else KOCFIA.formation.cancelTraining( null, null, null, info, attempts );
					} else {
						if( dfd ) return dfd.reject();
						else $info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation de formation échouée (erreur internet).</div>');
					}
				});
		};

		KOCFIA.formation.cancelFortification = function( dfd, cityKey, i, info, attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation cancelFortification function');
			var j, totalReturn,
				params = $.extend({}, window.g_ajaxparams);

			if( dfd ){
				if( i === 0 || i > window.seed.queue_frt.length ) return dfd.resolve();

				info = window.seed.queue_frt[cityKey][i];
			} else {
				info = info.split(',');
				cityKey = 'city' + info[1];
			}

			var $info = KOCFIA.formation.$ongoing.find('tbody').filter('[data-city="'+ cityKey +'"]').find('.info');

			params.requestType = "CANCEL_FORTIFICATIONS";
			params.cityId = info[1];
			params.typefrt = info[2];
			params.numtrpfrt = info[3];
			params.frtETA = info[4];
			params.frtTmp = info[5];
			params.frtNeeded = info[6];
			params.frtid = info[0];

			$.ajax({
					url: window.g_ajaxpath + 'ajax/cancelFortifications.php' + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function( result ){
					if( result.ok ){
						window.update_seed_ajax(true, function(){
							j = 0;
							for( var i = 0; i < window.seed.queue_unt[cityKey].length; i++ ){
								if( i > info[0] ){
									window.seed.queue_fort[cityKey][i][2] = parseInt(result.dateFortifications[j]["start"], 10);
									window.seed.queue_fort[cityKey][i][3] = parseInt(result.dateFortifications[j]["end"], 10);
									j += 1;
								}
							}
							//remove canceled fortification
							window.seed.queue_fort[cityKey].splice(info[0], 1);

							for( i = 1; i < 5; i += 1 ){
								totalReturn = parseInt(window.fortcost["frt" + info[1]][i], 10) * parseInt(info[2], 10) * 3600 / 2;
								window.seed.resources[cityKey]["rec" + i][0] = parseInt(window.seed.resources[cityKey]["rec" + i][0], 10) + totalReturn;
							}
							if( dfd !== null ) KOCFIA.formation.listCityFormations( info[1] );
						});

						if( dfd !== null ){
							return dfd.pipe( KOCFIA.formation.cancelFortification(dfd, cityKey, i-1, null, 3) );
						}
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							if( dfd ) return dfd.pipe( KOCFIA.formation.cancelFortification(dfd, cityKey, i-1, null, attempts) );
							else KOCFIA.formation.cancelFortification( null, null, null, info, attempts );
						} else {
							if( dfd ) return dfd.reject();
							else $info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation de fortification échouée (erreur serveur).</div>');
						}
					}
				}).fail(function(){
					//network or server error
					attempts -= 1;
					if( attempts > 0 ){
						if( dfd ) return dfd.pipe( KOCFIA.formation.cancelFortification(dfd, cityKey, i-1, null, attempts) );
						else KOCFIA.formation.cancelFortification( null, null, null, info, attempts );
					} else {
						if( dfd ) return dfd.reject();
						else $info.append('<div data-timestamp="'+ Date.timestamp() +'">Annulation de fortification échouée (erreur internet).</div>');
					}
				});
		};

		KOCFIA.formation.addToQueue = function( rule, dfd ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue function', rule);
			//automatic launch, will add one formation to the queue according to the rule parameters
			//called by fillQueue with a deferred object, pipe on self until queue is filled or adding is not possible

			//step 1 of 3 for trainUnitSequence
			var checkUnitRequirements = function( udfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkUnitRequirements function');
				var modifier = 1;
				if( rule.speed == 1 ) modifier = 2;
				else if( rule.speed == 2 ) modifier = 4;

				var costs = window.unitcost[rule.troop],
					res = window.seed.resources[rule.cityKey],
					stats = window.seed.citystats[rule.cityKey];

				if( typeof costs[8] == 'object' && !$.isArray(costs[8]) && !$.isEmptyObject(costs[8]) ){
					var k, level;
					for( k in costs[8] ){ // check building requirement
						if( costs[8].hasOwnProperty(k) ){
							level = Shared.buildingHighestLevel( rule.cityKey, k.substr(1) );
							if( level < costs[8][k][1] ){
								msgUnit.push(city.label +': cette unité ne peut être entraînée dans cette ville (niveau de bâtiment requis trop bas).');
								return udfd.resolve();
							}
						}
					}
				}

				if( typeof costs[9] == 'object' && !$.isArray(costs[9]) && !$.isEmptyObject(costs[9]) ){
					var t;
					for( t in costs[9] ){ // check tech requirement
						if( costs[9].hasOwnProperty(t) ){
							if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < costs[9][t][1] ){
								msgUnit.push(city.label +': cette unité ne peut être entraînée (niveau de recherche trop bas).');
								return udfd.resolve();
							}
						}
					}
				}

				//resources
				var keep;
				for( r = 1; r < 5; r += 1 ){
					resNeeded.push( parseInt(costs[r], 10) * 3600 * modifier );

					//take into account the rule keep parameter
					keep = (rule.keep.hasOwnProperty( 'rec' + r ) ? rule.keep['rec' + r] : 0);
					resAvailable.push( parseInt(res["rec" + r][0], 10) - keep );
				}

				//gold
				resNeeded.push( parseInt(costs[5], 10) * modifier );
				keep = (rule.keep.hasOwnProperty( 'rec0' ) ? rule.keep['rec0'] : 0);
				resAvailable.push( parseInt(stats.gold[0], 10) - keep );

				//population
				resNeeded.push( parseInt(costs[6], 10) );

				var pop = parseInt(stats.pop[0], 10) - parseInt(stats.pop[3], 10);
				if( rule.workforce > 0 ){
					pop += parseInt(stats.pop[3], 10) * rule.workforce;
				}
				resAvailable.push( pop );

				qty = resAvailable[0] / resNeeded[0];
				for( i = 1; i < resNeeded.length; i += 1 ){
					if( resNeeded[i] !== 0 ){
						qty = Math.min(qty, resAvailable[i] / resNeeded[i]);
					}
				}

				if( qty < rule.min ){
					msgUnit.push(city.label +': pas assez de population ou de ressources disponible (unité).');
					return udfd.resolve();
				}

				//recompute maximum
				if( rule.hasOwnProperty('recalc') && rule.relcal ){
					var max = KOCFIA.formation.calcMaxUnit( rule.cityKey, rule.troop, rule.speed, rule.workforce, true );
					if( isNaN(max) ){
						msgUnit.push(city.label +': minimum et maximum invalides après recalcul.');
						return udfd.resolve();
					}
					var min = Math.floor(max * KOCFIA.conf.formation.minPercentage);

					rule.min = min;
					rule.max = max;
				}

				if( qty > rule.max ) qty = rule.max;

				return udfd.pipe( checkBarracks(udfd) );
			};

			//step 2 of 3 for trainUnitSequence
			var checkBarracks = function( udfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkBarracks function');
				var barracksCount = Shared.barracksCount( rule.cityKey ),
					queue = window.seed.queue_unt[ rule.cityKey ],
					slotsUsed = queue.length || 0;
				if( barracksCount - slotsUsed > 0 ){
					return udfd.pipe( train(udfd) );
				} else {
					msgUnit.push(city.label +': pas de caserne disponible.');
					return udfd.resolve();
				}
			};

			//step 3 of 3 for trainUnitSequence
			var train = function( udfd ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred train function');
				var wParams = $.extend({}, baseParams);
				wParams.type = rule.troop.replace(/unt/, '');
				wParams.quant = qty;
				wParams.items = '';
				wParams.gambleId = rule.speed;
				wParams.apothecary = false;

				$.ajax({
						url: window.g_ajaxpath + "ajax/train.php" + window.g_ajaxsuffix,
						type: 'post',
						data: wParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function( result ){
						if( result.ok ){
							var resourceFactors = [],
								resourceLost, r, unit;

							for( r = 1; r < 5; r += 1 ){
								resourceFactors.push( result.gamble ? result.gamble[i] : 1 );
								resourceLost = parseInt(window.unitcost[rule.troop][i], 10) * 3600 * qty * resourceFactors[i - 1];
								window.seed.resources[rule.cityKey]["rec" + r][0] = parseInt(window.seed.resources[rule.cityKey]["rec" + r][0], 10) - resourceLost;
							}
							window.seed.citystats[rule.cityKey].gold[0] = parseInt(window.seed.citystats[rule.cityKey].gold[0], 10) - parseInt(window.unitcost[rule.troop][5], 10) * qty;
							window.seed.citystats[rule.cityKey].pop[0] = parseInt(window.seed.citystats[rule.cityKey].pop[0], 10) - parseInt(window.unitcost[rule.troop][6], 10) * qty;

							window.seed.queue_unt[rule.cityKey].push([rule.troop.replace(/unt/, ''), qty, result.initTS, parseInt(result.initTS, 10) + result.timeNeeded, 0, result.timeNeeded, null]);

							/*
							seed.items["i" + iid] = Number(seed.items["i" + iid]) - 1;
							ksoItems[iid].subtract();
							*/

							unit = KOCFIA.unitInfo[ rule.troop ];
							msgUnit.push(city.label +': lancement de '+ Shared.format( qty ) +' <img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />.');

							return udfd.resolve();
						} else {
							if( result.msg ){
								msgUnit.push(city.label +': formation refusée ('+ result.msg +').');
								return udfd.resolve();
							} else {
								trainAttempts -= 1;
								if( trainAttempts > 0 ){
									window.setTimeout(function(){ return udfd.pipe( train(udfd) ); }, 10000);
								} else {
									msgUnit.push(city.label +': formation refusée.');
									return udfd.resolve();
								}
							}
						}
					})
					.fail(function(){
						//network or server error
						trainAttempts -= 1;
						if( trainAttempts > 0 ){
							window.setTimeout(function(){ return udfd.pipe( train(udfd) ); }, 10000);
						} else {
							msgUnit.push(city.label +': formation refusée (erreur internet).');
							return udfd.resolve();
						}
					});
			};

			//units training sequence
			var trainUnitSequence = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred trainUnitSequence function');
				return $.Deferred(function( udfd ){
					if( rule.troop ){ //units
						return udfd.pipe( checkUnitRequirements(udfd) );
					} else return udfd.resolve();
				}).promise();
			};

			//step 1 of 3 for buildFortificationSequence
			var checkFortificationRequirements = function(fdfd){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkFortificationRequirements function');
				var costs = window.fortcost[rule.defense],
					res = window.seed.resources[rule.cityKey];

				if( !$.emptyObject(costs[8]) ){
					var k, level;
					for( k in costs[8] ){ // check building requirement
						if( costs[8].hasOwnProperty(k) ){
							level = Shared.buildingHighestLevel( rule.cityKey, k.substr(1) );
							if( level < costs[8][k][1] ){
								msgFort.push(city.label +': cette fortification ne peut être construite dans cette ville (niveau de bâtiment requis trop bas).');
								return fdfd.resolve();
							}
						}
					}
				}

				if( !$.emptyObject(costs[9]) ){
					var t;
					for( t in costs[9] ){ // check tech requirement
						if( costs[9].hasOwnProperty(t) ){
							if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < costs[9][t][1] ){
								msgFort.push(city.label +': cette fortification ne peut être construite (niveau de recherche trop bas).');
								return fdfd.resolve();
							}
						}
					}
				}

				//resources
				for( r = 1; r < 5; r += 1 ){
					resNeeded.push( parseInt(costs[r], 10) * 3600 );

					//take into account the rule keep parameter
					resAvailable.push( parseInt(res["rec" + r][0], 10) - rule.keep[r] );
				}

				resNeeded.push( parseInt(costs[5], 10) * modifier );
				resAvailable.push( parseInt(stats.gold[0], 10) );

				qty = resAvailable[0] / resNeeded[0];
				for( i = 1; i < resNeeded.length; i += 1 ){
					if( resNeeded[i] !== 0 ){
						num = Math.min(num, resAvailable[i] / resNeeded[i]);
					}
				}

				if( qty < rule.min ){
					msgFort.push(city.label +': pas assez de ressources disponible (fortifications).');
					return fdfd.resolve();
				}

				if( qty > rule.max ) qty = rule.max;

				return fdfd.pipe( checkWall(fdfd) );
			};

			//step 2 of 3 for buildFortificationSequence
			var checkWall = function(fdfd){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred checkWall function');
				var i, wallSlots = KOCFIA.formation.getWallSlots(rule.cityKey, false),
					queue = window.seed.queue_fort[ rule.cityKey ],
					slotsUsed = queue.length || 0;

				if( wallSlots - slotsUsed > 0 ){
					return fdfd.pipe( build(fdfd) );
				} else {
					msgFort.push(city.label +': rempart déjà occupé (queue pleine).');
					return fdfd.resolve();
				}
			};

			//step 3 of 3 for buildFortificationSequence
			var build = function(fdfd){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred build function');
				var wParams = $.extend({}, baseParams),
					def = rule.defense.replace(/frt/, '');
				wParams.type = def;
				wParams.quant = qty;
				wParams.items = '';

				$.ajax({
						url: window.g_ajaxpath + "ajax/fortify.php" + window.g_ajaxsuffix,
						type: 'post',
						data: wParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function( result ){
						if( result.ok ){
							var r, unit,
								fortcost = window.fortcost[ rule.defense ],
								time = KOCFIA.formation.defenseTrainDuration(rule.cityKey, rule.defense, qty);

							/*
							if(iid == 26) {
								time = parseInt(time * 0.7)
								window.seed.items.i26 = parseInt(window.seed.items.i26) - 1;
								window.ksoItems[26].subtract()
							}
							*/
							for( r = 1; r < 5; r += 1 ){
								window.seed.resources[rule.cityKey]["rec" + r][0] = parseInt(resources["rec" + r][0], 10) - parseInt(fortcost[i], 10) * 3600 * qty;
							}
							window.seed.citystats[rule.cityKey].gold[0] = parseInt(window.seed.citystats[rule.cityKey].gold[0], 10) - parseInt(fortcost[5], 10) * qty;
							window.seed.citystats[rule.cityKey].pop[0] = parseInt(window.seed.citystats[rule.cityKey].pop[0], 10) - parseInt(fortcost[6], 10) * qty;

							window.seed.queue_fort[rule.cityKey].push([def, qty, result.initTS, parseInt(result.initTS, 10) + time, 0, time, result.fortifyId]);

							unit = KOCFIA.fortInfo[ rule.defense ];
							msgFort.push(city.label +': lancement de '+ Shared.format( qty ) +' <img src="'+ unit.icon +'" alt="'+ unit.label[0] +'" title="'+ unit.label[0] +'" />.');

							return fdfd.resolve();
						} else {
							if( result.msg ){
								msgFort.push(city.label +': formation refusée ('+ result.msg +').');
								return fdfd.resolve();
							} else {
								trainAttempts -= 1;
								if( trainAttempts > 0 ){
									window.setTimeout(function(){ return fdfd.pipe( train(fdfd) ); }, 10000);
								} else {
									msgFort.push(city.label +': formation refusée.');
									return fdfd.resolve();
								}
							}
						}
					})
					.fail(function(){
						//network or server error
						trainAttempts -= 1;
						if( trainAttempts > 0 ){
							window.setTimeout(function(){ return fdfd.pipe( train(fdfd) ); }, 10000);
						} else {
							msgFort.push(city.label +': formation refusée (requête KO).');
							return fdfd.resolve();
						}
					});
			};

			//fortifications building sequence
			var buildFortificationSequence = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation addToQueue deferred buildFortificationSequence function');
				return $.Deferred(function( fdfd ){
					if( rule.defense ){
						return fdfd.pipe( checkFortificationRequirements(fdfd) );
					} else return fdfd.resolve();
				}).promise();
			};

			var qty, r,
				msgUnit = [],
				msgFort = [],
				resNeeded = [],
				resAvailable = [],
				trainAttempts = 3,
				city = KOCFIA.cities[ rule.cityKey ];

			var baseParams = jQuery.extend(true, {}, window.g_ajaxparams);
			if( $.isEmptyObject(baseParams) ){
				alert('Paramètres ajax manquant. Raffraîchissez la page.');
				return;
			}
			baseParams.cid = rule.cityKey.replace(/city/, '');

			$.when( trainUnitSequence(), buildFortificationSequence() )
				.always(function(){
					//clean old messages
					var m = '', i;

					$msgUnit = KOCFIA.formation.$unitInfo.find('div');
					if( $msgUnit.length > 15 ) $msgUnit.filter(':lt(15)').appendTo( KOCFIA.formation.$unitHistory );
					if( msgUnit.length ){
						for( i = 0; i < msgUnit.length; i += 1 ){
							m += '<div>'+ msgUnit[i] +'</div>';
						}
						KOCFIA.formation.$unitInfo.append( m );
					}

					$msgFort = KOCFIA.formation.$fortInfo.find('div');
					if( $msgFort.length > 15 ) $msgFort.filter(':lt(15)').appendTo( KOCFIA.formation.$fortHistory );
					if( msgFort.length ){
						for( i = 0; i < msgFort.length; i += 1 ){
							m += '<div>'+ msgFort[i] +'</div>';
						}
						KOCFIA.formation.$fortInfo.append( m );
					}

					//manual launch
					if( dfd ){
						if( msgUnit.length > 0 || msgFort.length > 0 ){
							return dfd.reject();
						} else {
							KOCFIA.formation.listCityFormations( rule.cityKey );
							window.setTimeout(function(){ return dfd.pipe( KOCFIA.formation.addToQueue(rule, dfd) ); }, 15000);
						}
					} else {
						KOCFIA.formation.listCityFormations( rule.cityKey );
					}
				});
		};

		KOCFIA.formation.fillQueue = function( rule ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('formation') ) console.info('KOCFIA formation fillQueue function', rule);
			//manual launch, will fill the training queue according to the rule parameters

			var fillSequence = function(){
				return $.Deferred(function( dfd ){
					return dfd.pipe( KOCFIA.formation.addToQueue(rule, dfd) );
				}).promise();
			};

			$.when( fillSequence() )
				.always(function(){
					//user information by city
					KOCFIA.formation.$ongoing.find('.unit').find('.info').append('<div>'+ city.label +': lancement des formations fini.</div>');
					KOCFIA.formation.$ongoing.find('.fort').find('.info').append('<div>'+ city.label +': lancement des fortifications fini.</div>');
					KOCFIA.formation.listCityFormations( rule.cityKey );
				});
		};

	/* TRANSPORT */
		KOCFIA.transport = {
			options: {
				active: 1,
				//automatic: 0,
				automaticPileUp: 0,
				automaticSupply: 0,
				priority: {
					pileUp: ['rec4', 'rec3', 'rec2', 'rec1', 'rec0', 'rec5'],
					supply:['rec2', 'rec4', 'rec3', 'rec1', 'rec0', 'rec5']
				}
			},
			stored: ['pileUp', 'supply'],
			pileUp: {},
			supply: {}
		};

		KOCFIA.transport.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.transport +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('transport', 'active', 'Activer', KOCFIA.conf.transport.active);
			//code += Shared.generateCheckbox('transport', 'automatic', 'Activer les transports automatiques', KOCFIA.conf.transport.automatic);
			code += Shared.generateCheckbox('transport', 'automaticPileUp', 'Lancer les stockages automatiques', KOCFIA.conf.transport.automaticPileUp);
			code += Shared.generateCheckbox('transport', 'automaticSupply', 'Lancer les approvisionnements automatiques', KOCFIA.conf.transport.automaticSupply);
			code += Shared.generateButton('transport', 'deleteSupply', 'Supprimer toutes les configurations d\'approvisionnement enregistrées');
			code += Shared.generateButton('transport', 'deletePileUp', 'Supprimer toutes les configurations de stockage enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.transport.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-transport').html('');

			var pileUpForm = KOCFIA.transport.getAutoForm('pileUp'),
				supplyForm = KOCFIA.transport.getAutoForm('supply'),
				onGoing = KOCFIA.transport.getListsTemplate(),
				help = KOCFIA.transport.getHelp();

			var code = '<div class="infos">';
			//code += '<span class="buttonset"><input type="checkbox" id="transport-panel-automatic" '+ (KOCFIA.conf.transport.automatic ? 'checked' : '') +' autocomplete="off" />';
			//code += '<label for="formation-panel-automatic">transports automatiques</label></span>';
			code += '<span class="buttonset"><input type="checkbox" id="transport-panel-automatic-pileUp" '+ (KOCFIA.conf.transport.automaticPileUp ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="transport-panel-automatic-pileUp">Stockages automatiques</label>';
			code += '<input type="checkbox" id="transport-panel-automatic-supply" '+ (KOCFIA.conf.transport.automaticSupply ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="transport-panel-automatic-supply">Approvisionnements automatiques</label></span>';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div><h3>Configurations</h3>';
			code += '<div class="accordion">';
			code += pileUpForm + supplyForm;
			code += '</div><div>'+ onGoing +'</div>';
			code += help;
			code += '<div id="kocfia-transport-history-pileUp" class="history pileUp" title="Historique des stockages"></div>';
			code += '<div id="kocfia-transport-history-supply" class="history supply" title="Historique des approvisionnements"></div>';

			code += '<div id="kocfia-transport-priority-pileUp" class="priority-list" title="Priorité des resources lors des stockages">';
			code += '<ol rel="pileUp">';
			var resKey, resInfo, i, l;
			for( i = 0, l = KOCFIA.conf.transport.priority.pileUp.length; i < l; i += 1 ){
				resKey = KOCFIA.conf.transport.priority.pileUp[i];
				resInfo = KOCFIA.resourceInfo[ resKey ];
				code += '<li rel="'+ resKey +'"><img src="'+ resInfo.icon +'">'+ resInfo.label +'</li>';
			}
			code += '</ol></div>';

			code += '<div id="kocfia-transport-priority-supply" class="priority-list" title="Priorité des resources lors des approvisionnements">';
			code += '<ol rel="supply">';
			for( i = 0, l = KOCFIA.conf.transport.priority.supply.length; i < l; i += 1 ){
				resKey = KOCFIA.conf.transport.priority.supply[i];
				resInfo = KOCFIA.resourceInfo[ resKey ];
				code += '<li rel="'+ resKey +'"><img src="'+ resInfo.icon +'">'+ resInfo.label +'</li>';
			}
			code += '</ol></div>';


			$section.append( code )
			//listener
				/*.on('change', '#transport-panel-automatic', function(){
					$('#transport-automatic').prop('checked', $(this).prop('checked')).change();
				})*/
				.on('change', '#transport-panel-automatic-pileUp', function(){
					$('#transport-automaticPileUp').prop('checked', $(this).prop('checked')).change();
				})
				.on('change', '#transport-panel-automatic-supply', function(){
					$('#transport-automaticSupply').prop('checked', $(this).prop('checked')).change();
				})
				.on('click', '.priority', function(){
					var rel = $(this).attr('rel');
					$('#kocfia-transport-priority-'+ rel).dialog('open');
				});

			KOCFIA.transport.$autoForms = $section.find('.transport-form');
			KOCFIA.transport.$pileUpForm = KOCFIA.transport.$autoForms.filter('pileUp');
			KOCFIA.transport.$supplyForm = KOCFIA.transport.$autoForms.filter('supply');
			KOCFIA.transport.$ongoingPileUp = $section.find('.ongoing.pileUp');
			KOCFIA.transport.$ongoingSupply = $section.find('.ongoing.supply');
			KOCFIA.transport.$nextPileUpBar = $section.find('.nextIteration.pileUp');
			KOCFIA.transport.$nextSupplyBar = $section.find('.nextIteration.supply');
			KOCFIA.transport.$pileUpHistory = $section.find('.history.pileUp');
			KOCFIA.transport.$supplyHistory = $section.find('.history.supply');

			$section.find('.accordion').accordion({
				collapsible: true,
				autoHeight: false,
				animated: false,
				change: function(event, ui){
					KOCFIA.$confPanelWrapper[0].scrollTop = 0;
					KOCFIA.$confPanelWrapper[0].scrollLeft = 0;
				}
			})
			.accordion('activate', false);

			$section
				.find('.priority-list')
				.dialog({autoOpen: false, height: 300, width: 400, zIndex: 100001 })
				.find('ol').sortable({
					zIndex: 100002,
					update: function(event, ui){
						var $list = $(event.target),
							rel = $list.attr('rel'),
							list = $list.find('li').map(function(){ return $(this).attr('rel'); }).get();

						KOCFIA.conf.transport.priority[ rel ] = list;
						Shared.storeConf();
					}
				});

			KOCFIA.transport.addAutoFormListeners();

			KOCFIA.transport.loadAutoRuleset('pileUp');
			KOCFIA.transport.loadAutoRuleset('supply');
		};

		KOCFIA.transport.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport on function');

			/*if( KOCFIA.conf.transport.automatic ){
				KOCFIA.transport.automaticOn();
			}*/

			if( KOCFIA.conf.transport.automaticPileUp ) KOCFIA.transport.automaticPileUpOn();

			if( KOCFIA.conf.transport.automaticSupply ) KOCFIA.transport.automaticSupplyOn();
		};

		KOCFIA.transport.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport off function');

			//KOCFIA.transport.automaticOff();

			KOCFIA.transport.automaticPileUpOff();
			KOCFIA.transport.automaticSupplyOff();
		};

		/*KOCFIA.transport.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticOn function');
			$('#transport-panel-automatic').prop('checked', true);

			if( KOCFIA.conf.transport.pileUp ) KOCFIA.transport.pileUpOn();
			if( KOCFIA.conf.transport.supply ) KOCFIA.transport.supplyOn();
		};*/

		/*KOCFIA.transport.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticOff function');

			KOCFIA.transport.pileUpOff();
			KOCFIA.transport.supplyOff();
		};*/

		KOCFIA.transport.automaticPileUpOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticPileUpOn function');
			$('#transport-panel-automatic-pileUp').prop('checked', true);

			Shared.nextIteration( KOCFIA.transport.$nextPileUpBar, 45 );
			window.setTimeout(function(){
				Shared.nextIteration( KOCFIA.transport.$nextPileUpBar, 18 * 60 );
				KOCFIA.transport.launchAutomaticTransport('pileUp');
			}, 45 * 1000);

			//recursive call every 18 minutes
			autoPileUpInterval = window.setInterval(function(){
				Shared.nextIteration( KOCFIA.transport.$nextPileUpBar, 18 * 60 );
				KOCFIA.transport.launchAutomaticTransport('pileUp');
			}, 18 * 60 * 1000);
		};

		KOCFIA.transport.automaticPileUpOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticPileUpOff function');

			window.clearInterval(autoPileUpInterval);

			KOCFIA.transport.$nextPileUpBar.html('');
		};

		KOCFIA.transport.automaticSupplyOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticSupplyOn function');
			$('#transport-panel-automatic-supply').prop('checked', true);

			Shared.nextIteration( KOCFIA.transport.$nextSupplyBar, 30 );
			window.setTimeout(function(){
				Shared.nextIteration( KOCFIA.transport.$nextSupplyBar, 15 * 60 );
				KOCFIA.transport.launchAutomaticTransport('supply');
			}, 30 * 1000);

			//recursive call every 15 minutes
			autoSupplyInterval = window.setInterval(function(){
				Shared.nextIteration( KOCFIA.transport.$nextSupplyBar, 15 * 60 );
				KOCFIA.transport.launchAutomaticTransport('supply');
			}, 15 * 60 * 1000);
		};

		KOCFIA.transport.automaticSupplyOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport automaticSupplyOff function');

			window.clearInterval(autoSupplyInterval);

			KOCFIA.transport.$nextSupplyBar.html('');
		};

		KOCFIA.transport.storeSupply = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport storeSupply function');
			localStorage.setObject('kocfia_transport_supply_' + KOCFIA.storeUniqueId, KOCFIA.transport.supply);
		};

		KOCFIA.transport.deleteSupply = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport deleteSupply function');
			localStorage.removeItem('kocfia_transport_supply_' + KOCFIA.storeUniqueId);

			KOCFIA.transport.supply = {};
		};

		KOCFIA.transport.storePileUp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport storePileUp function');
			localStorage.setObject('kocfia_transport_pileUp_' + KOCFIA.storeUniqueId, KOCFIA.transport.pileUp);
		};

		KOCFIA.transport.deletePileUp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport deletePileUp function');
			localStorage.removeItem('kocfia_transport_pileUp_' + KOCFIA.storeUniqueId);

			KOCFIA.transport.pileUp = {};
		};

		KOCFIA.transport.getListsTemplate = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getListsTemplate function');

			var form = '<h3>Suivi Stockage';
			form += '<span class="nextIteration pileUp" title="Horaire de la prochaine tentative de stockage"></span>';
			form += '<button class="button secondary history-toggle" rel="pileUp" title="Historique des stockages"><span>Historique</span></button>';
			form += '<button class="button priority" rel="pileUp" title="Priorité des ressources pour le stockage"><span>Priorité</span></button>';
			form += '</h3>';
			form += '<div class="ongoing pileUp"></div>';
			form += '<h3>Suivi Approvisionnement';
			form += '<span class="nextIteration supply" title="Horaire de la prochaine tentative d\'approvisionnement"></span>';
			form += '<button class="button secondary history-toggle" rel="supply" title="Historique des approvisionnements"><span>Historique</span></button>';
			form += '<button class="button priority" rel="supply" title="Priorité des ressources pour l\'approvisionnement"><span>Priorité</span></button>';
			form += '</h3>';
			form += '<div class="ongoing supply"></div>';

			return form;
		};

		KOCFIA.transport.refreshOnGoing = function(msg, type){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport refreshOnGoing function');

			//clean old messages
			var timestamp = Date.timestamp(),
				obsolete = 5 * 60 * 1000,
				msgTimestamp, $div, $m;

			if( type == 'pileUp' ){
				$div = KOCFIA.transport.$ongoingPileUp;
			} else {
				$div = KOCFIA.transport.$ongoingSupply;
			}

			$div.find('div').each(function(){
				$m = $(this);
				msgTimestamp = $m.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					$m.appendTo( (type == 'pileUp' ? KOCFIA.transport.$pileUpHistory : KOCFIA.transport.supplyHistory) );
				}
			});

			if( !$.isEmptyObject(msg) ){
				$div.append( '<div data-timestamp="'+ timestamp+'">'+ msg +'</div>' );
			}
		};

		KOCFIA.transport.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getHelp function');
			var help = '<div id="kocfia-transport-help" class="help" title="Aide transport">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '<li>Les quantités peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2m pour deux millions, 3g pour trois milliards)</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '<li>Pour chaque transport, les quantités de troupes et ressources seront limitées par les quantités disponible et la capacité de chaque marche en fonction du niveau du point de ralliement (tiens compte des boosts en cours et des bonus de la salle du trône)</li>';
			help += '</ul><h4>Transports automatiques</h4><ul>';
			help += '<li>Pour chaque ressource vous pouvez ajouter des configurations de transport</li>';
			help += '<li>Vous devrez choisir une ville expéditrice, une destination (ville ou coordonnée)</li>';
			help += '<li>Vous devrez choisir une quantité de la ressource et la troupe servant au transport</li>';
			help += '<li>Pour chaque transport, la quantité minimum de troupe à utiliser sera calculée en fonction de la quantité de ressources que contiendra le transport</li>';
			help += '<li>Pour chaque transport, la quantité minimum de ressources pour valider le transport est 100k</li>';
			help += '<li>Pour un stockage, si la ressource dépasse la quantité le surplus sera envoyé à la destination après vérifications (point de ralliement, troupes)</li>';
			help += '<li>Pour un approvisionnement, si la ressource dans la ville de destination est en deça de la quantité la différence sera envoyé à la destination après vérifications (point de ralliement, troupes)</li>';
			help += '<li>Pour chaque couple expéditeur / destinataire il y aura autant de marches que de troupes différentes (3 configurations avec wagon, 4 avec cavalerie équivaut à 2 marches)</li>';
			help += '<li>Utiliser la fonction de copie au niveau d\'une configuration va l\'ajouter pour toutes les villes manquantes (ormis la destination) pour la ressource</li>';
			help += '<li>Utiliser la fonction de copie dans la colonne ressource va prendre les configurations de la ressource et les ajouter dans les autres ressources en écrasant celles déjà présentes</li>';
			help += '<li>Les approvisionnements sont fait toutes les 15 minutes</li>';
			help += '<li>Les stockages sont fait toutes les 18 minutes</li>';
			help += '<li>Si les transports automatiques sont actifs, les modifications seront prises en compte dès la prochaine tentative de transport</li>';
			help += '</ul><h4>Transport manuel :</h4><ul>';
			help += '<li>Les troupes listées sont celles de la ville de départ choisie</li>';
			help += '<li>Quand la ville ou coordonnée de destination est choisie, le temps de la marche est affichée pour chaque troupe <small>(tiens compte des boosts en cours, choisis et des bonus de salle du trone)</small></li>';
			help += '<li>La quantité d\'une unité est limitée à la quantité disponible et à la limitation du point de ralliement <small>(tiens compte des boosts en cours, choisis et des bonus de salle du trone)</small></li>';
			help += '<li>Le bouton "Minimiser" permet de réduire la quantité de l\'unité choisie par rapport aux quantités de ressources spécifiées <small>(tiens compte des boosts en cours, choisis et des bonus de salle du trone)</small></li>';
			help += '<li>Les ressources listées sont celles de la ville de départ choisie</li>';
			help += '<li>La quantité d\'une ressource est limitée à la quantité disponible</li>';
			help += '<li>Le bouton "Maximiser" permet d\'accroître la quantité de la ressource choisie par rapport aux quantités d\'unités spécifiées <small>(tiens compte des boosts en cours, choisis et des bonus de salle du trone)</small></li>';
			help += '<li>Seuls les objets présents dans votre inventaire sont listés</li>';
			help += '<li>Certains objets ne peuvent être utilisés en même temps (même effet mais durée différente)</li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.transport.getAutoForm = function(type){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport getAutoForm function', type);
			var i, res;

			var form = '<h3>'+ (type == 'pileUp' ? 'Stockage' : 'Approvisionnement') +' Automatique</h3>';
			form += '<div class="'+ type +' transport-form">';
			form += '<div class="buttons">';
			form += '<button class="save button modify"><span>Enregistrer</span></button>';
			form += '<button class="reset button danger" title="Vide le formulaire"><span>Annuler</span></button>';
			form += '<button class="reload button danger" title="Recharge le formulaire avec les configurations sauvegardées"><span>Recharger</span></button>';
			form += '</div>';
			form += '<table><thead><tr>';
			form += '<th>Ressources</th><th>Configurations</th>';
			form += '</tr></thead><tbody>';

			for( i = 0; i < KOCFIA.resources.length; i += 1 ){
				res = KOCFIA.resources[i];
				form += '<tr data-res="'+ res.key +'"><td class="res">';
				form += '<img src="'+ res.icon +'" alt="'+ res.label +'"><br>';
				form += '<button class="button secondary addRule" title="Ajouter une configuration pour cette ressource"><span>Ajouter</span></button>';
				form += '</td><td class="rules"></td></tr>';
			}

			form += '</tbody></table>';
			form += '<div class="buttons">';
			form += '<button class="save button modify"><span>Enregistrer</span></button>';
			form += '<button class="reset button danger" title="Vide le formulaire"><span>Annuler</span></button>';
			form += '<button class="reload button danger" title="Recharge le formulaire avec les configurations sauvegardées"><span>Recharger</span></button>';
			form += '</div>';
			form += '</div>';

			return form;
		};

		KOCFIA.transport.addAutoFormListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport addAutoFormListerners function');

			var i, city, unit, cityKey,
				citiesSelect = '<select class="target"><option value="">Choisir</option>',
				troopsSelect = '<select class="troop"><option value="">Choisir</option>';

			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];
					citiesSelect += '<option value="'+ cityKey +'">'+ city.label +'</option>';
				}
			}
			citiesSelect += '</select>';

			for( i = 0; i < KOCFIA.troops.length; i += 1 ){
				troopsSelect += '<option value="'+ KOCFIA.troops[ i ].name +'">'+ KOCFIA.troops[ i ].label +'</option>';
			}
			troopsSelect += '</select>';

			KOCFIA.transport.$autoForms
				.on('click', '.addRule', function(){
					var $form = $(this).closest('.transport-form');

					var code = '<div class="rule">';
					code += '<div><input type="checkbox" class="active" title="Activer cette configuration">&nbsp;';
					code += 'Depuis&nbsp;:&nbsp;'+ citiesSelect.replace(/target/, 'from');
					code += ' Vers&nbsp;:&nbsp;'+ citiesSelect.replace(/target/, 'to');
					if( $form.hasClass('pileUp') ){
						code += ' ou <input type="text" class="coord">';
					}
					code += '</div><div>';
					if( $form.hasClass('pileUp') ){
						code += 'Envoyer&nbsp;au&nbsp;dessus&nbsp;de&nbsp;:&nbsp;';
					} else {
						code += 'Approvisionner&nbsp;en&nbsp;dessous&nbsp;de&nbsp;:&nbsp;';
					}
					code += '<input type="text" class="quantity" value="0">';
					code += ' avec&nbsp;:&nbsp;';
					code += troopsSelect;
					code += '<button class="remove button danger"><span>Supprimer</span></button>';
					code += '<button class="duplicate button secondary" title="Copie ou applique dans cette ressource cette configuration pour vos autres villes"><span>Copier</span></button>';
					code += '</div></div>';

					$(this).closest('td').siblings('.rules').append( code );
				})
				.on('click', '.reset', function(){
					$(this).closest('.transport-form').find('.rule').remove();
				})
				.on('click', '.reload', function(){
					var $this = $(this),
						type = ($this.closest('.transport-form').hasClass('pileUp') ? 'pileUp' : 'supply');
					$this.closest('.transport-form').find('.rule').remove();

					KOCFIA.transport.loadAutoRuleset( type );
				})
				.on('click', '.remove', function(){
					$(this).closest('.rule').remove();
					$('.tipsy').remove();
				})
				.on('click', '.duplicate', function(){
					var $this = $(this),
						$form = $this.closest('.transport-form'),
						isPileUp = $form.hasClass('pileUp'),
						$rules = $this.closest('.rules'),
						$rule = $this.closest('.rule'),
						$sib = $rule.siblings('.rule'),
						sender = $rule.find('.from').val(),
						receiver = $rule.find('.to').val(),
						coord = $rule.find('.coord').val(),
						quantity = $rule.find('.quantity').val(),
						troop = $rule.find('.troop').val(),
						active = $rule.find('.active').prop('checked'),
						senders = {}, i, $clone, cityKey, $div;

					if( sender !== '' ) senders[ sender ] = 1;
					if( receiver !== '' ) senders[ receiver ] = 1;

					if( isPileUp ){
						$sib.find('.from').each(function(){
							if( this.value !== '' ) senders[ this.value ] = 1;
						});
					} else {
						$sib.find('.to').each(function(){
							if( this.value !== '' ) senders[ this.value ] = 1;
						});
					}

					for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						if( !senders.hasOwnProperty( cityKey ) ){
							$clone = $rule.clone();
							if( isPileUp ){
								$clone.find('.from').val( cityKey );
								$clone.find('.to').val( receiver );
							} else {
								$clone.find('.from').val( sender );
								$clone.find('.to').val( cityKey );
							}
							$clone.find('.coord').val( coord );
							$clone.find('.quantity').val( quantity );
							$clone.find('.troop').val( troop );
							$clone.find('.active').prop('checked', active);

							$clone.css('display', 'none');

							$rules.append( $clone );
						} else if( sender != cityKey && receiver != cityKey ){
							if( isPileUp ){
								$sib.find('.from').each(function(){
									if( this.value == cityKey ){
										$div = $(this).closest('.rule');
										$div.find('.coord').val( coord );
										$div.find('.quantity').val( quantity );
										$div.find('.troop').val( troop );
										$div.find('.active').prop('checked', active);
										return false; //break
									}
								});
							} else {
								$sib.find('.to').each(function(){
									if( this.value == cityKey ){
										$div = $(this).closest('.rule');
										$div.find('.coord').val( coord );
										$div.find('.quantity').val( quantity );
										$div.find('.troop').val( troop );
										$div.find('.active').prop('checked', active);
										return false; //break
									}
								});
							}
						}
					}

					$rules.find('.rule').css('display', '');
				})
				/*.on('click', '.copyRules', function(){
					var $tr = $(this).closest('tr'),
						$rules = $tr.find('.rules'),
						$inputs = $rules.find('input, select'),
						$rulesSiblings = $tr.siblings().find('.rules');

					$rulesSiblings.each(function(){
						var $clone = $rules.clone();

						$clone.find('input, select').each(function(i){
							var $el = $(this);
							if( $el.is(':checkbox') ){
								$el.prop('checked', $inputs.eq(i).prop('checked'));
							} else $el.val( $inputs.eq(i).val() );
						});

						$(this).replaceWith( $clone );
					});
				})*/
				.on('click', '.save', function(){
					var type = ($(this).closest('.transport-form').hasClass('pileUp') ? 'pileUp' : 'supply'),
						result = KOCFIA.transport.planAutomaticTransport( type );
					if( result.errors.length ){
						Shared.notify( result.errors.unique() );
					} else {
						KOCFIA.transport[ type ] = result.plan;

						if( type == 'pileUp' ){
							KOCFIA.transport.storePileUp();
						} else {
							KOCFIA.transport.storeSupply();
						}

						Shared.success( null );
					}
				});
		};

		KOCFIA.transport.loadAutoRuleset = function(type){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport loadAutoRuleset function', type);
			if( !$.isEmptyObject( KOCFIA.transport[ type ] ) ){
				var r, resourceRules, cityKey, dest, to, coord, $tr, $addRule, $rules,
					$resources = KOCFIA.transport.$autoForms.filter('.'+ type).find('tbody').find('tr');

				for( cityKey in KOCFIA.transport[ type ] ){
					if( KOCFIA.transport[ type ].hasOwnProperty( cityKey ) ){
						destinations = KOCFIA.transport[ type ][ cityKey ];
						for( dest in destinations ){
							if( destinations.hasOwnProperty(dest) ){
								if( dest.indexOf('city') > -1 ){
									to = dest;
									coord = '';
								} else {
									to = '';
									coord = dest;
								}
								resourceRules = destinations[ dest ];
								if( !$.isEmptyObject( resourceRules ) ){
									for( r in resourceRules ){
										if( resourceRules.hasOwnProperty( r ) ){
											$tr = $resources.filter('[data-res="'+ r +'"]');
											$addRule = $tr.find('.addRule');
											$rules = $tr.find('.rules');

											rule = resourceRules[ r ];
											$addRule.trigger('click');
											$rule = $rules.find('.rule').filter(':last');

											$rule.find('.active').prop('checked', rule.active);
											$rule.find('.from').val( cityKey );
											$rule.find('.to').val( to );
											$rule.find('.coord').val( coord );
											$rule.find('.quantity').val( Shared.format(rule.quantity) );
											$rule.find('.troop').val( rule.troop );
										}
									}
								}
							}
						}
					}
				}
			} else {
				KOCFIA.transport.$autoForms.filter('.'+ type).find('.addRule').eq(0).trigger('click');
			}
		};

		KOCFIA.transport.planAutomaticTransport = function(type){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport planAutomaticTransport function', type);

			var $resources = KOCFIA.transport.$autoForms.filter('.'+ type).find('tbody').find('tr'),
				$tr, city, i, unit, $rule, r, res, rule, from, to, qty, coord, label, tmp, receiver,
				senderCoord = null,
				receiverCoord = null,
				plan = {},
				errors = [],
				isPileUp = (type == 'pileUp'),
				regexp = /[^0-9,]/;

			$resources.each(function(){
				$tr = $(this);
				r = $tr.data('res');
				plan[ r ] = {};
				res = KOCFIA.resourceInfo[ r ];
				i = 0;

				$tr.find('.rule').each(function(i){
					label = 'pour '+ res.label +' '+ (i === 0 ? '1ère' : (i + 1) +'ème') +' configuration';
					$rule = $(this);
					from = $rule.find('.from').val();
					to = $rule.find('.to').val();
					coord = $.trim( $rule.find('.coord').val() );
					qty = $.trim( $rule.find('.quantity').val() );
					unit = $rule.find('.troop').val();
					tmp = {};

					if( from !== '' ){
						city = KOCFIA.cities[ from ];
						if( isPileUp ){
							plan[ r ][ from ] = {};
						} else if( !plan[ r ].hasOwnProperty(from) ){
							plan[ r ][ from ] = {};
						}

						senderCoord = city.coords.x +','+ city.coords.y;
					} else {
						errors.push('Vous devez spécifier une ville de départ '+ label);
					}

					if( to !== '' ){
						if( isPileUp ){
							plan[ r ][ from ].to = to;
							plan[ r ][ from ].coord = null;
						} else if( !plan[ r ][ from ].hasOwnProperty( to ) ){
							receiver = to;
							plan[ r ][ from ][ receiver ] = {};
						}
						city = KOCFIA.cities[ to ];
						receiverCoord = city.coords.x +','+ city.coords.y;
					} else if( coord !== '' ){
						if( regexp.test( coord ) ){
							errors.push('Pour les coordonnées, veuillez respecter le format x,y '+ label);
						} else {
							coord = Shared.checkCoord( coord );
							if( coord !== false ){
								receiverCoord = coord.x +','+ coord.y;
								if( isPileUp ){
									plan[ r ][ from ].to = null;
									plan[ r ][ from ].coord = coord;
								} else if( !plan[ r ][ from ].hasOwnProperty( receiverCoord ) ){
									receiver = receiverCoord;
									plan[ r ][ from ][ receiver ] = {};
								}
							} else {
								errors.push('Mauvais format de coordonnée pour la destination (x,y) '+ label);
							}
						}
					} else {
						errors.push('Vous devez spécifier une ville ou coordonnée de destination pour '+ label);
					}

					if( senderCoord !== null && receiverCoord !== null && senderCoord == receiverCoord ){
						errors.push('La ville de départ doit être différente de la ville de destination '+ label);
					}

					if( qty === '' ) qty = 0;
					else qty = Shared.decodeFormat( qty );

					if( qty === false ){
						errors.push('Vous devez spécifier une quantité valide '+ label);
					} else {
						if( isPileUp ){
							plan[ r ][ from ].qty = qty;
						} else {
							plan[ r ][ from ][ receiver ].qty = qty;
						}
					}

					if( unit !== '' ){
						if( isPileUp ){
							plan[ r ][ from ].unit = unit;
						} else {
							plan[ r ][ from ][ receiver ].unit = unit;
						}
					} else {
						errors.push('Vous devez spécifier une unité '+ label);
					}

					if( isPileUp ){
						plan[ r ][ from ].active = $rule.find('.active').prop('checked');
					} else {
						plan[ r ][ from ][ receiver ].active = $rule.find('.active').prop('checked');
					}

					i += 1;
				});
			});

			//reorder by city [from] [to] [res]
			var finalPlan = {};
			for( r in plan ){
				if( plan.hasOwnProperty(r) ){
					for( from in plan[ r ] ){
						if( plan[ r ].hasOwnProperty( from ) ){
							if( !finalPlan.hasOwnProperty( from ) ) finalPlan[ from ] = {};

							if( isPileUp ){
								to = (plan[ r ][from].to === null ? plan[ r ][from].coord.x +','+ plan[ r ][from].coord.y : plan[ r ][ from ].to);
								if( !finalPlan[ from ].hasOwnProperty( to ) ) finalPlan[ from ][ to ] = {};

								finalPlan[ from ][ to ][ r ] = {
									active: plan[ r ][ from ].active,
									quantity: plan[ r ][ from ].qty,
									troop: plan[ r ][ from ].unit
								};
							} else {
								for( receiver in plan[ r ][ from ] ){
									if( plan[ r ][ from ].hasOwnProperty(receiver) ){
										if( !finalPlan[ from ].hasOwnProperty( receiver ) ) finalPlan[ from ][ receiver ] = {};

										finalPlan[ from ][ receiver ][ r ] = {
											active: plan[ r ][ from ][ receiver ].active,
											quantity: plan[ r ][ from ][ receiver ].qty,
											troop: plan[ r ][ from ][ receiver ].unit
										};
									}
								}
							}
						}
					}
				}
			}

			return {plan: finalPlan, errors: errors};
		};

		KOCFIA.transport.launchAutomaticTransport = function(type){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport function', type, KOCFIA.transport[ type ]);

			if( type == 'pileUp' ){
				KOCFIA.transport.$ongoingPileUp.find('div').appendTo( KOCFIA.transport.$pileUpHistory );
				KOCFIA.transport.$ongoingPileUp[0].innerHTML = '';
			} else {
				KOCFIA.transport.$ongoingSupply.find('div').appendTo( KOCFIA.transport.$supplyHistory );
				KOCFIA.transport.$ongoingSupply[0].innerHTML = '';
			}

			if( KOCFIA.captchaDetected ){
				KOCFIA.transport.refreshOnGoing((type == 'pileUp' ? 'Stockage' : 'Approvisionnement') +' en pause pour cause de captcha.', type);
				return false;
			}

			if( !$.isEmptyObject( KOCFIA.transport[ type ] ) ){
				var i, j, d, timestamp, r, u;

				//from
				var cityKey, city;
				//to
				var destinations, currentDestination, destinationsKey, destKey;
				//rules
				var rules, rule;
				//units
				var units, currentUnit, unitQuantity, availableUnit, unitInfo, unitSummary,
					maxUnitPerSlot, unitLeft, maxLoad, minTroop;
				//resources
				var resourcesQuantity, resInfo, resKey, resourcesSummary, availableResource,
					supplierResource, destResource , transportQuantity, totalResources;
				//request
				var params, unitsArr, resources;
				//loops index
				var unitIndex = 0,
					cityIndex = 0,
					destinationIndex = 0;

				//start the transport sequence
				var sequence = function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport deferred sequence function', KOCFIA.transport[ type ]);
					KOCFIA.transport.refreshOnGoing('Tentative '+ (type == 'pileUp' ? 'de stockage' : 'd\'approvisionnement') + '.', type);
					return $.Deferred(function(dfd){
						return dfd.pipe( fromCity(dfd) );
					}).promise();
				};

				//step 1 - find the sender
				var fromCity = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport deferred fromCity function', cityIndex);

					//sender loop finished
					if( cityIndex >= KOCFIA.citiesKey.length ){
						return dfd.resolve();
					}

					cityKey = KOCFIA.citiesKey[ cityIndex ];
					city = KOCFIA.cities[ cityKey ];

					if( !KOCFIA.transport[ type ].hasOwnProperty( cityKey ) ){
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoTransport && KOCFIA.alarm.underAttack.hasOwnPropery( cityKey ) ){
						KOCFIA.transport.refreshOnGoing(city.label +' est attaquée, transport annulé.', type);
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					//no need to parse the rules for a city with no free slots
					if( Shared.getRallyPointSlots( cityKey ) === 0 ){
						KOCFIA.transport.refreshOnGoing('Pas de place dans le point de ralliement de '+ city.label +'.', type);
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					//recipients
					destinations = KOCFIA.transport[ type ][ cityKey ];
					//get the keys of destination, for easier looping
					destinationsKeys = Object.keys(destinations);
					destinationIndex = 0;

					//requests parameters base
					params = $.extend({}, window.g_ajaxparams);
					params.cid = cityKey.replace(/city/, '');
					params.type = 1;//cm.MARCH_TYPES.MARCH_TYPE_TRANSPORT: 1
					params.kid = 0;

					return dfd.pipe( toCity(dfd) );
				};

				//step 2 - loop the recipient
				var toCity = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport deferred toCity function', destinationIndex, destinationsKeys, destinations);
					//recipients loop finished
					if( destinationIndex >= destinationsKeys.length ){
						KOCFIA.transport.refreshOnGoing('Vérifications pour '+ city.label +' finies.', type);
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					destKey = destinationsKeys[ destinationIndex ];

					//get info on recipient
					if( destKey.indexOf('city') > -1 ){
						d = KOCFIA.cities[ destKey ];
						currentDestination = d.label;

						if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoTransport && KOCFIA.alarm.underAttack.hasOwnPropery( destKey ) ){
							KOCFIA.transport.refreshOnGoing(currentDestination +' est attaquée, transport annulé.', type);
							destinationIndex += 1;
							return dfd.pipe( toCity(dfd) );
						}

						params.xcoord = d.coords.x;
						params.ycoord = d.coords.y;
					} else {
						currentDestination = destKey; //xxx,yyy
						d = destKey.split(',');
						params.xcoord = d[0];
						params.ycoord = d[1];
					}

					//rules of the sender - recipient pair
					rules = destinations[ destKey ];

					//reset the units array by sender, will be used for looping in step 3
					units = [];
					unitIndex = 0;

					return dfd.pipe( getUnits(dfd) );
				};

				//step 3 - loop on rules unit to find how many request have to be done for the destination
				var getUnits = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport deferred getUnits function', unitIndex, units, rules);
					//get the rules units
					if( units.length === 0 ){
						units = {};
						for( j = 0; j < KOCFIA.conf.transport.priority[ type ].length; j += 1 ){
							res = KOCFIA.resourceInfo[ KOCFIA.conf.transport.priority[ type ][ j ] ];
							resKey = res.key;

							if( rules.hasOwnProperty( resKey ) ){
								rule = rules[ resKey ];

								if( !rule.active ) continue;

								units[ rule.troop ] = 1;
							}
						}

						//get the units key array for easier looping
						units = Object.keys(units);
					}

					//units loop finished
					if( unitIndex >= units.length ){
						destinationIndex += 1;
						return dfd.pipe( toCity(dfd) );
					}

					//reset the request parameters for the units
					for( j = 0; j < units.length; j += 1 ){
						params[ units[j].replace(/nt/, '') ] = 0;
					}

					currentUnit = units[unitIndex];

					//delete 'out of mist' warning
					if( params.hasOwnProperty('marchWarning') ) delete params.marchWarning;

					return dfd.pipe( checkRules(dfd) );
				};

				//step 4 - check the rule (resource, unit)
				var checkRules = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport deferred checkRules function', currentUnit);

					//reset request variables
					unitsArr = {};
					resources = [0, 0, 0, 0, 0, 0];
					totalResources = 0;

					var timestamp = Date.timestamp(),
						loadBoost = false;

					//reset the request parameters for resources
					params.gold = 0;
					params.r1 = 0;
					params.r2 = 0;
					params.r3 = 0;
					params.r4 = 0;
					params.r5 = 0;

					//check if there is enough of currentUnit
					availableUnit = parseInt(window.seed.units[ cityKey ][ currentUnit ], 10);
					unitInfo = KOCFIA.unitInfo[ currentUnit ];
					if( isNaN(availableUnit) || availableUnit === 0 ){
						KOCFIA.transport.refreshOnGoing('Pas '+ unitInfo.labelBis + unitInfo.label +' disponible dans '+ city.label +'.', type);
						unitIndex += 1;
						return dfd.pipe( getUnits(dfd) );
					}

					//max troop per rally point slot
					maxUnitPerSlot = Shared.getUnitLimit( cityKey, false, false, false, false );

					//load boost active ?
					if( window.seed.playerEffects.loadExpire > timestamp ) loadBoost = true;

					u = currentUnit.replace(/nt/, '');
					var uId = currentUnit.replace(/unt/, '');
					unitsArr[ uId ] = 0;
					params[ u ] = 0;

					//loop each resource to find a corresponding active rule using currentUnit
					for( j = 0; j < KOCFIA.conf.transport.priority[ type ].length; j += 1 ){
						res = KOCFIA.resourceInfo[ KOCFIA.conf.transport.priority[ type ][ j ] ];
						resKey = res.key;
						if( rules.hasOwnProperty( resKey ) ){
							rule = rules[ resKey ];
							//rule not active or wrong unit
							if( !rule.active || rule.troop != currentUnit ) continue;

							if( resKey == 'rec0' ) r = 'gold';
							else r = resKey.replace(/ec/, '');

							resInfo = KOCFIA.resourceInfo[ resKey ];

							if( type == 'pileUp' ){
								//get available resource
								if( r == 'gold' ){
									availableResource = parseInt(window.seed.citystats[ cityKey ][ r ][0], 10);
									if( isNaN(availableResource) ) continue;
								} else {
									availableResource = parseInt(window.seed.resources[ cityKey ][ resKey ], 10);
									if( isNaN(availableResource) ) continue;
									else if( resInfo.name.indexOf('x3600') > -1 ) availableResource /= 3600;
								}

								//how much need to be stocked
								transportQuantity = parseInt(availableResource - rule.quantity, 10);
								if( transportQuantity <= 0 ){
									KOCFIA.transport.refreshOnGoing('Pas de surplus de '+ resInfo.label +' dans '+ city.label +'.', type);
									continue;
								}
							} else {
								//get available resource
								if( r == 'gold' ){
									supplierResource = parseInt(window.seed.citystats[ cityKey ][ r ][0], 10);
									destResource = parseInt(window.seed.citystats[ destKey ][ r ][0], 10);

									if( isNaN(supplierResource) ) continue;
									if( isNaN(destResource) ) continue;
								} else {
									supplierResource = parseInt(window.seed.resources[ cityKey ][ resKey ], 10);
									destResource = parseInt(window.seed.resources[ destKey ][ resKey ], 10);

									if( isNaN(supplierResource) ) continue;
									if( isNaN(destResource) ) continue;

									if( resInfo.name.indexOf('x3600') > -1 ){
										supplierResource /= 3600;
										destResource /= 3600;
									}
								}

								//how much need to be supplied
								if( destResource < rule.quantity ){
									transportQuantity = parseInt(rule.quantity - destResource, 10);

									//has the supplier enough resource ?
									if( transportQuantity > supplierResource ){
										KOCFIA.transport.refreshOnGoing('Pas assez '+ resInfo.labelBis + resInfo.label +' dans '+ city.label +' pour approvisionner '+ currentDestination +'.', type);
										continue;
									}
								} else {
									KOCFIA.transport.refreshOnGoing('Pas d\'approvisionnement '+ resInfo.labelBis + resInfo.label +' nécessaire depuis '+ city.label +' vers '+ currentDestination +'.', type);
									continue;
								}
							}

							//get how many of currentUnit are available taking into account previous rules and the rally point limitation
							unitLeft = (availableUnit > maxUnitPerSlot ? maxUnitPerSlot : availableUnit) - unitsArr[ uId ];
							if( unitLeft > maxUnitPerSlot ) unitLeft = maxUnitPerSlot;

							//find the minimum quantity of currentUnit needed for the transport
							minTroop = parseInt(KOCFIA.quickMarch.getTroopQuantityForLoad( [{id: currentUnit, qty: 1}], (resKey == 'rec5' ? transportQuantity * 5 : transportQuantity), loadBoost ), 10);

							if( minTroop === false ){
								KOCFIA.transport.refreshOnGoing('Problème de calcul du minimum '+ unitInfo.labelBis + unitInfo.label +' nécessaires pour un transport '+ resInfo.labelBis + resInfo.label +' depuis '+ city.label +' vers '+ currentDestination +'.', type);
								continue;
							}

							if( minTroop > unitLeft ){
								//not enough units, update the resource quantity with the load capacity
								resourcesQuantity = parseInt(KOCFIA.quickMarch.getLoadCapacity( [{id: currentUnit, qty: unitLeft}], loadBoost ), 10);
								if( resKey == 'rec5' ) resourcesQuantity = parseInt(resourcesQuantity / 5, 10);
								unitQuantity = unitLeft;
							} else {
								resourcesQuantity = transportQuantity;
								unitQuantity = minTroop;
							}

							if( resourcesQuantity === false ){
								KOCFIA.transport.refreshOnGoing('Problème de calcul du maximum '+ resInfo.labelBis + resInfo.label +' transportable depuis '+ city.label +' vers '+ currentDestination +'.', type);
								continue;
							}

							//update the request parameters and variables
							params[ r ] += resourcesQuantity;
							resources[ parseInt(resKey.replace(/rec/, ''), 10) ] += resourcesQuantity;
							totalResources += resourcesQuantity;

							params[ u ] += unitQuantity;
							unitsArr[ uId ] += unitQuantity;

							//all available units used or slot capicity reached
							if( availableUnit - unitsArr[ uId ] === 0 || unitsArr[ uId ] == maxUnitPerSlot ) break;
						}
					}

					//is a transport needed ?
					if( unitsArr[ uId ] > 0 && totalResources > 100000 ){ //minimum 100k resource to confirm launch
						//compute the transport units and resources for display
						resourcesSummary = [];
						for( j = 0; j < resources.length; j += 1 ){
							if( resources[j] > 0 ){
								resInfo = KOCFIA.resourceInfo[ 'rec'+ j ];
								resourcesSummary.push('<img src="'+ resInfo.icon +'" alt="'+ resInfo.label +'" title="'+ resInfo.label +' '+ Shared.readable( resources[j] ) +'"> '+ Shared.format( resources[j] ));
							}
						}

						unitInfo = KOCFIA.unitInfo[ currentUnit ];
						unitSummary = '<img src="'+ unitInfo.icon +'" alt="'+ unitInfo.label +'" title="'+ unitInfo.label +' '+ Shared.readable( unitsArr[ uId ] ) +'"> '+ Shared.format( unitsArr[ uId ] );

						return dfd.pipe( launch(dfd, params, 3) );
					} else if( totalResources > 0 ){
						if( type == 'pileUp' ){
							KOCFIA.transport.refreshOnGoing('Minimum requis non atteint depuis '+ city.label +'.', type);
						} else {
							KOCFIA.transport.refreshOnGoing('Minimum requis non atteint depuis '+ city.label +' vers '+ currentDestination +'.', type);
						}
					} else {
						if( type == 'pileUp' ){
							KOCFIA.transport.refreshOnGoing('Rien à stocker via '+ unitInfo.label +' depuis '+ city.label +'.', type);
						} else {
							KOCFIA.transport.refreshOnGoing('Rien à approvisionner via '+ unitInfo.label +' depuis '+ city.label +' vers '+ currentDestination +'.', type);
						}
					}

					unitIndex += 1;
					return dfd.pipe( getUnits(dfd) );
				};

				//step 5 - try to launch the march
				var launch = function( dfd, tParams, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('kocfia transport launchAutomaticTransport deferred launch function', tParams, attempts, unitsArr, resources);
					$.ajax({
						url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
						type: 'post',
						data: tParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							var timediff = parseInt(data.eta, 10) - parseInt(data.initTS, 10),
								ts = Date.timestamp();

							KOCFIA.transport.refreshOnGoing('Transport envoyé : '+ resourcesSummary.join(', ') +' avec '+ unitSummary +' depuis '+ city.label +' vers '+ currentDestination +'.', type);

								window.attach_addoutgoingmarch(data.marchId, data.marchUnixTime, ts + timediff, tParams.xcoord, tParams.ycoord, unitsArr, tParams.type, tParams.kid, resources, data.tileId, data.tileType, data.tileLevel, tParams.cid, true);

								window.updateBoosts(data);
								if( data.liftFog ){
									window.update_boosts();
									window.seed.playerEffects.fogExpire = 0;
									//window.g_mapObject.getMoreSlots();
								}

								//any free slot left ?
								if( Shared.getRallyPointSlots( cityKey ) === 0 ){
									KOCFIA.transport.refreshOnGoing('Vérifications pour '+ city.label +' finies.', type);
									window.setTimeout(function(){
										cityIndex += 1;
										return dfd.pipe( fromCity(dfd) );
									}, 5000);
								} else {
									window.setTimeout(function(){
										unitIndex += 1;
										return dfd.pipe( getUnits(dfd) );
									}, 5000);
								}

							} else if( data.user_action ){
								if( data.user_action == 'marchWarning' ){
									window.setTimeout(function(){
										tParams.marchWarning = 1;
										return dfd.pipe( launch(dfd, tParams, 3) );
									}, 5000);
								} else if( data.user_action == 'marchCaptcha' ){
									KOCFIA.transport.refreshOnGoing('Captcha détecté, transport annulé.', type);
									Shared.manageCaptcha('Transport automatique');
									return dfd.reject();
								} else {
									attempts -= 1;
									if( attempts > 0 ) dfd.pipe( launch(dfd, tParams, attempts) );
									else {
										KOCFIA.transport.refreshOnGoing('Transport refusé (serveur, action utilisateur requise) : '+ resourcesSummary.join(', ') +' avec '+ unitSummary +' depuis '+ city.label +' vers '+ currentDestination +'.', type);
										window.setTimeout(function(){
											unitIndex += 1;
											return dfd.pipe( getUnits(dfd) );
										}, 5000);
									}
								}
							} else if( data.msg ){
								//{"ok":false,"error_code":4,"feedback":"3-7-0","msg":"Unable to dispatch march. Not enough units"}
								KOCFIA.transport.refreshOnGoing('Transport refusé ('+ data.msg +') : '+ resourcesSummary.join(', ') +' avec '+ unitSummary +' depuis '+ city.label +' vers '+ currentDestination +'.', type);
								//detect message to pipe to the correct function (not enough units, not enough resource, PR full, ...)
								window.setTimeout(function(){
									unitIndex += 1;
									return dfd.pipe( getUnits(dfd) );
								}, 5000);
							} else {
								console.error(data);
								KOCFIA.transport.refreshOnGoing('Transport refusé (serveur) : '+ resourcesSummary.join(', ') +' avec '+ unitSummary +' depuis '+ city.label +' vers '+ currentDestination +'.', type);
								window.setTimeout(function(){
									unitIndex += 1;
									return dfd.pipe( getUnits(dfd) );
								}, 5000);
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( launch(dfd, tParams, attempts) );
							else {
								KOCFIA.transport.refreshOnGoing('Transport refusé (internet) : '+ resourcesSummary.join(', ') +' avec '+ unitSummary +' depuis '+ city.label +' vers '+ currentDestination +'.', type);
								window.setTimeout(function(){
									unitIndex += 1;
									return dfd.pipe( getUnits(dfd) );
								}, 5000);
							}
						});
				};

				$.when( sequence() )
					.always(function(){
						KOCFIA.transport.refreshOnGoing((type == 'pileUp' ? 'Stockage' : 'Approvisionnement') + ' fini.', type);
					});
			}
		};

	/* REASSIGN */
		KOCFIA.reassign = {
			options: {
				active: 1,
				automatic: 0
			},
			stored: ['rules'],
			rules: {}
		};

		KOCFIA.reassign.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.reassign +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('reassign', 'active', 'Activer', KOCFIA.conf.reassign.active);
			code += Shared.generateCheckbox('reassign', 'automatic', 'Activer les réassignements automatiques', KOCFIA.conf.reassign.automatic);
			code += Shared.generateButton('reassign', 'deleteRules', 'Supprimer toutes les configurations enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.reassign.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-reassign').html('');

			var automaticForm = KOCFIA.reassign.getAutoForm(),
				onGoing = KOCFIA.reassign.getListsTemplate(),
				help = KOCFIA.reassign.getHelp();

			var code = '<div class="infos">';
			code += '<span class="buttonset"><input type="checkbox" id="reassign-panel-automatic" '+ (KOCFIA.conf.reassign.automatic ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="reassign-panel-automatic">réassignements automatiques</label></span>';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div><h3>Configurations</h3>';
			code += '<div class="accordion">';
			code += automaticForm;
			code += '</div><div>'+ onGoing +'</div>';
			code += help;
			code += '<div id="kocfia-reassign-history" class="history" title="Historique des réassignements"></div>';

			$section.append( code )
			//listener
				.on('change', '#reassign-panel-automatic', function(){
					$('#reassign-automatic').prop('checked', $(this).prop('checked')).change();
				});

			KOCFIA.reassign.$autoForm = $section.find('.reassign-form');
			KOCFIA.reassign.$ongoing = $section.find('.ongoing');
			KOCFIA.reassign.$nextBar = $section.find('.nextIteration');
			KOCFIA.reassign.$history = $section.find('.history');

			$section.find('.accordion').accordion({
				collapsible: true,
				autoHeight: false,
				animated: false,
				change: function(event, ui){
					KOCFIA.$confPanelWrapper[0].scrollTop = 0;
					KOCFIA.$confPanelWrapper[0].scrollLeft = 0;
				}
			})
			.accordion('activate', false);

			KOCFIA.reassign.addAutoFormListeners();

			KOCFIA.reassign.loadAutoRuleset();
		};

		KOCFIA.reassign.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign on function');

			if( KOCFIA.conf.reassign.automatic ){
				KOCFIA.reassign.automaticOn();
			}
		};

		KOCFIA.reassign.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign off function');

			KOCFIA.reassign.automaticOff();
		};

		KOCFIA.reassign.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign automaticOn function');
			$('#reassign-panel-automatic').prop('checked', true);

			Shared.nextIteration( KOCFIA.reassign.$nextBar, 60 );
			window.setTimeout(function(){
				Shared.nextIteration( KOCFIA.reassign.$nextBar, 60 * 60 );
				KOCFIA.reassign.launchAutomaticReassign();
			}, 60 * 1000);

			//recursive call every 60 minutes
			autoReassignInterval = window.setInterval(function(){
				Shared.nextIteration( KOCFIA.reassign.$nextBar, 60 * 60 );
				KOCFIA.reassign.launchAutomaticReassign();
			}, 60 * 60 * 1000);
		};

		KOCFIA.reassign.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign automaticOff function');

			window.clearInterval(autoReassignInterval);

			KOCFIA.reassign.$nextBar.html('');
		};

		KOCFIA.reassign.storeRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign storeRules function');
			localStorage.setObject('kocfia_reassign_rules_' + KOCFIA.storeUniqueId, KOCFIA.reassign.rules);
		};

		KOCFIA.reassign.deleteRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign deleteRules function');
			localStorage.removeItem('kocfia_reassign_rules_' + KOCFIA.storeUniqueId);

			KOCFIA.reassign.rules = {};
		};

		KOCFIA.reassign.getListsTemplate = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign getListsTemplate function');

			var code = '<h3>Suivi Réassignements';
			code += '<span class="nextIteration" title="Horaire de la prochaine tentative de réassignement"></span>';
			code += '<button class="button secondary history-toggle" title="Historique des réassignements"><span>Historique</span></button>';
			code += '</h3>';
			code += '<div class="ongoing"></div>';

			return code;
		};

		KOCFIA.reassign.refreshOnGoing = function(msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign refreshOnGoing function');

			//clean old messages
			var timestamp = Date.timestamp(),
				obsolete = 5 * 60 * 1000,
				msgTimestamp, $div, $m;

			$div = KOCFIA.reassign.$ongoing;

			$div.find('div').each(function(){
				$m = $(this);
				msgTimestamp = $m.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					$m.appendTo( KOCFIA.reassign.$history );
				}
			});

			if( !$.isEmptyObject(msg) ){
				$div.append( '<div data-timestamp="'+ timestamp+'">'+ msg +'</div>' );
			}
		};

		KOCFIA.reassign.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign getHelp function');
			var help = '<div id="kocfia-reassign-help" class="help" title="Aide Réassignements">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '<li>Les quantités peuvent être spécifiées via un nombre ou un abréviation (ex. 1k pour un milliers, 1.5k pour 1500, 2m pour deux millions, 3g pour trois milliards)</li>';
			help += '<li>Chaque requête au serveur est exécutée au maximum 3 fois lors de problème réseau ou serveur</li>';
			help += '</ul><h4>Réassignement automatiques</h4><ul>';
			help += '<li>Pour chaque unité vous pouvez ajouter des configurations de réassignement</li>';
			help += '<li>Vous devrez choisir une ville de départ et une de destination</li>';
			help += '<li>Vous devrez choisir une quantité de l\'unité</li>';
			help += '<li>(optionel) Vous pouvez spécifier que le réassignement peut transporter des ressources. Dans ce cas les règles automatiques de transport sont utilisées.</li>';
			help += '<li>Utiliser la fonction de copie au niveau d\'une configuration va l\'ajouter pour toutes les villes manquantes (ormis la destination) pour l\'unité</li>';
			help += '<li>Utiliser la fonction de copie dans la colonne unité va prendre les configurations de l\'unité et les ajouter dans les autres unités en écrasant celles déjà présentes</li>';
			help += '<li>Les réassignement sont fait toutes les heures</li>';
			help += '<li>Si les réassignement automatiques sont actifs, les modifications seront prises en compte dès la prochaine tentative de réassignement</li>';
			help += '</ul><h4>Transport manuel :</h4><ul>';
			help += '<li>Les troupes listées sont celles de la ville de départ choisie</li>';
			help += '<li>Quand la ville de destination est choisie, le temps de la marche est affichée pour chaque troupe <small>(tiens compte des boosts en cours, choisis et des bonus de salle du trone)</small></li>';
			help += '<li>La quantité d\'une unité est limitée à la quantité disponible et à la limitation du point de ralliement <small>(tiens compte des boosts en cours, choisis et des bonus de salle du trone)</small></li>';
			help += '<li>Les chevaliers listés sont ceux étant disponible dans la ville de départ choisie</li>';
			help += '<li>(optionel) Vous pouvez spécifier des ressources à transporter</li>';
			help += '<li>Seuls les objets présents dans votre inventaire sont listés</li>';
			help += '<li>Certains objets ne peuvent être utilisés en même temps (même effet mais durée différente)</li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.reassign.getAutoForm = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign getAutoForm function');
			var i, res;

			var form = '<h3>Réassignement Automatique</h3>';
			form += '<div class="reassign-form">';
			form += '<div class="buttons">';
			form += '<button class="save button modify">Enregistrer</button>';
			form += '<button class="reset button secondary">Annuler</button>';
			form += '</div>';
			form += '<table><thead><tr>';
			form += '<th>Unité</th><th>Configurations</th>';
			form += '</tr></thead><tbody>';

			for( i = 0; i < KOCFIA.troops.length; i += 1 ){
				unit = KOCFIA.troops[i];
				form += '<tr data-unit="'+ unit.name +'"><td class="unit">';
				form += '<img src="'+ unit.icon +'" alt="'+ unit.label +'"><br>';
				form += '<button class="button secondary addRule" title="Ajouter une configuration pour cette unité"><span>Ajouter</span></button>';
				form += '<button class="button secondary activate" title="Activer toutes les règles de cette unité"><span>Activer</span></button>';
				form += '<button class="button danger deactivate" title="Désactiver toutes les règles de cette unité"><span>Désactiver</span></button>';
				form += '</td><td class="rules"></td></tr>';
			}

			form += '</tbody></table>';
			form += '<div class="buttons">';
			form += '<button class="save button modify">Enregistrer</button>';
			form += '<button class="reset button secondary">Annuler</button>';
			form += '</div>';
			form += '</div>';

			return form;
		};

		KOCFIA.reassign.addAutoFormListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('KOCFIA reassign addAutoFormListerners function');

			var i, city, unit, cityKey,
				citiesSelect = '<select class="target"><option value="">Choisir</option>';

			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];
					citiesSelect += '<option value="'+ cityKey +'">'+ city.label +'</option>';
				}
			}
			citiesSelect += '</select>';

			KOCFIA.reassign.$autoForm
				.on('click', '.addRule', function(){
					var $form = $(this).closest('.reassign-form');

					var code = '<div class="rule">';
					code += '<div><input type="checkbox" class="active" title="Activer cette configuration">&nbsp;';
					code += 'Depuis&nbsp;:&nbsp;'+ citiesSelect.replace(/target/, 'from');
					code += ' Vers&nbsp;:&nbsp;'+ citiesSelect.replace(/target/, 'to');
					code += '</div><div>Envoyer&nbsp;au&nbsp;dessus&nbsp;de&nbsp;:&nbsp;';
					code += '<input type="text" class="quantity" value="0">';
					code += '<input type="checkbox" class="transport"><label title="Si possible les troupes réassignées transporteront des ressources en se basant sur les règles de transport automatique">avec resources</label>';
					code += '<button class="remove button danger"><span>Supprimer</span></button>';
					code += '<button class="duplicate button secondary" title="Copie ou applique pour cette unité cette configuration pour vos autres villes"><span>Copier</span></button>';
					code += '</div></div>';

					$(this).closest('td').siblings('.rules').append( code );
				})
				.on('click', '.reset', function(){
					$(this).closest('.reassign-form').find('.rule').remove();
				})
				.on('click', '.remove', function(){
					$(this).closest('.rule').remove();
					$('.tipsy').remove();
				})
				.on('click', '.duplicate', function(){
					var $this = $(this),
						$form = $(this).closest('.reassign-form'),
						$rules = $this.closest('.rules'),
						$rule = $this.closest('.rule'),
						$sib = $rule.siblings('.rule'),
						sender = $rule.find('.from').val(),
						receiver = $rule.find('.to').val(),
						quantity = $rule.find('.quantity').val(),
						active = $rule.find('.active').prop('checked'),
						senders = {}, i, $clone, cityKey, $div;

					if( sender !== '' ) senders[ sender ] = 1;
					if( receiver !== '' ) senders[ receiver ] = 1;

					$sib.find('.from').each(function(){
						if( this.value !== '' ) senders[ this.value ] = 1;
					});

					for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						if( !senders.hasOwnProperty( cityKey ) ){
							$clone = $rule.clone();
							$clone.find('.from').val( cityKey );
							$clone.find('.to').val( receiver );
							$clone.find('.quantity').val( quantity );
							$clone.find('.active').prop('checked', active);

							$clone.css('display', 'none');

							$rules.append( $clone );
						} else if( sender != cityKey && receiver != cityKey ){
							$sib.find('.from').each(function(){
								if( this.value == cityKey ){
									$div = $(this).closest('.rule');
									$div.find('.quantity').val( quantity );
									$div.find('.active').prop('checked', active);
									return false; //break
								}
							});
						}
					}

					$rules.find('.rule').css('display', '');
				})
				.on('click', '.activate, .deactivate', function(){
					var $this = $(this);
					$this.closest('tr').find('.rules').find('.active').prop('checked', $this.hasClass('activate'));
				})
				.on('click', '.save', function(){
					var result = KOCFIA.reassign.planAutomaticReassign();
					if( result.errors.length ){
						Shared.notify( result.errors.unique() );
					} else {
						KOCFIA.reassign.rules = result.plan;

						KOCFIA.reassign.storeRules();

						Shared.success( null );
					}
				});
		};

		KOCFIA.reassign.loadAutoRuleset = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign loadAutoRuleset function');
			if( !$.isEmptyObject( KOCFIA.reassign.rules ) ){
				var u, unitRules, cityKey, dest, $tr, $addRule, $rules,
					$units = KOCFIA.reassign.$autoForm.find('tbody').find('tr');

				for( cityKey in KOCFIA.reassign.rules ){
					if( KOCFIA.reassign.rules.hasOwnProperty( cityKey ) ){
						destinations = KOCFIA.reassign.rules[ cityKey ];
						for( dest in destinations ){
							if( destinations.hasOwnProperty(dest) ){
								unitRules = destinations[ dest ];
								if( !$.isEmptyObject( unitRules ) ){
									for( u in unitRules ){
										if( unitRules.hasOwnProperty( u ) ){
											$tr = $units.filter('[data-unit="'+ u +'"]');
											$addRule = $tr.find('.addRule');
											$rules = $tr.find('.rules');

											rule = unitRules[ u ];
											$addRule.trigger('click');
											$rule = $rules.find('.rule').filter(':last');

											$rule.find('.active').prop('checked', rule.active);
											$rule.find('.transport').prop('checked', rule.transport);
											$rule.find('.from').val( cityKey );
											$rule.find('.to').val( dest );
											$rule.find('.quantity').val( Shared.format(rule.quantity) );
										}
									}
								}
							}
						}
					}
				}
			} else {
				KOCFIA.reassign.$autoForm.find('.addRule').eq(0).trigger('click');
			}
		};

		KOCFIA.reassign.planAutomaticReassign = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign planAutomaticReassign function');

			var $units = KOCFIA.reassign.$autoForm.find('tbody').find('tr'),
				$tr, city, i, unit, $rule, u, rule, from, to, qty, label,
				senderCoord = null,
				receiverCoord = null,
				plan = {},
				errors = [],
				regexp = /[^0-9,]/;

			$units.each(function(){
				$tr = $(this);
				u = $tr.data('unit');
				plan[ u ] = {};
				unit = KOCFIA.unitInfo[ u ];
				i = 0;

				$tr.find('.rule').each(function(i){
					label = 'pour '+ unit.label +' '+ (i === 0 ? '1ère' : (i + 1) +'ème') +' configuration';
					$rule = $(this);
					from = $rule.find('.from').val();
					to = $rule.find('.to').val();
					qty = $.trim( $rule.find('.quantity').val() );
					tmp = {};

					if( from !== '' ){
						plan[ u ][ from ] = {};
						city = KOCFIA.cities[ from ];
						senderCoord = city.coords.x +','+ city.coords.y;
					} else {
						errors.push('Vous devez spécifier une ville départ '+ label);
					}

					if( to !== '' ){
						plan[ u ][ from ].to = to;
						city = KOCFIA.cities[ to ];
						receiverCoord = city.coords.x +','+ city.coords.y;
					} else {
						errors.push('Vous devez spécifier une ville ou coordonnée de destination pour '+ label);
					}

					if( senderCoord !== null && receiverCoord !== null && senderCoord == receiverCoord ){
						errors.push('La ville de départ doit être différente de la ville de destination '+ label);
					}

					if( qty === '' ) qty = 0;
					else qty = Shared.decodeFormat( qty );

					if( qty === false ){
						errors.push('Vous devez spécifier une quantité valide '+ label);
					} else {
						plan[ u ][ from ].qty = qty;
					}

					plan[ u ][ from ].active = $rule.find('.active').prop('checked');

					plan[ u ][ from ].transport = $rule.find('.transport').prop('checked');

					i += 1;
				});
			});

			//reorder by city [from] [to] [res]
			var finalPlan = {};
			for( u in plan ){
				if( plan.hasOwnProperty(u) ){
					for( from in plan[ u ] ){
						if( plan[ u ].hasOwnProperty( from ) ){
							if( !finalPlan.hasOwnProperty( from ) ) finalPlan[ from ] = {};

							to = plan[ u ][ from ].to;
							if( !finalPlan[ from ].hasOwnProperty( to ) ) finalPlan[ from ][ to ] = {};

							finalPlan[ from ][ to ][ u ] = {
								active: plan[ u ][ from ].active,
								transport: plan[ u ][ from ].transport,
								quantity: plan[ u ][ from ].qty
							};
						}
					}
				}
			}

			return {plan: finalPlan, errors: errors};
		};

		KOCFIA.reassign.launchAutomaticReassign = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign launchAutomaticReassign function', KOCFIA.reassign.rules);

			KOCFIA.reassign.$ongoing.find('div').appendTo( KOCFIA.reassign.$history );
			KOCFIA.reassign.$ongoing[0].innerHTML = '';

			if( KOCFIA.captchaDetected ){
				KOCFIA.reassign.refreshOnGoing('Réassignement en pause pour cause de captcha.');
				return false;
			}

			if( !$.isEmptyObject( KOCFIA.reassign.rules ) ){
				//from
				var cityKey, city;
				//to
				var d, destinations, currentDestination, destinationsKey, destKey;
				//rules
				var rules, rule;
				//units
				var unitQuantity, availableUnit, unitInfo, unitsSummary, maxUnitPerSlot, totalUnits;
				//resources
				var j, r, resourceInfo, resourcesSummary, res, resKey, units, loadCapacity, resRules;
				//request
				var params, unitsArr, resources;
				//loops index
				var cityIndex = 0,
					destinationIndex = 0;

				//start the reassign sequence
				var sequence = function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign launchAutomaticReassign deferred sequence function');
					KOCFIA.reassign.refreshOnGoing('Tentative de réassignement.');
					return $.Deferred(function(dfd){
						return dfd.pipe( fromCity(dfd) );
					}).promise();
				};

				//step 1 - find the sender
				var fromCity = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign launchAutomaticReassign deferred fromCity function', cityIndex);

					//sender loop finished
					if( cityIndex >= KOCFIA.citiesKey.length ){
						return dfd.resolve();
					}

					cityKey = KOCFIA.citiesKey[ cityIndex ];
					city = KOCFIA.cities[ cityKey ];

					if( !KOCFIA.reassign.rules.hasOwnProperty( cityKey ) ){
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoReassign && KOCFIA.alarm.underAttack.hasOwnPropery( cityKey ) ){
						KOCFIA.reassign.refreshOnGoing(city.label +' est attaquée, réassignement annulé.');
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					//no need to parse the rules for a city with no free slots
					if( Shared.getRallyPointSlots( cityKey ) === 0 ){
						KOCFIA.reassign.refreshOnGoing('Pas de place dans le point de ralliement de '+ city.label +'.');
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					//recipients
					destinations = KOCFIA.reassign.rules[ cityKey ];
					//get the keys of destination, for easier looping
					destinationsKeys = Object.keys(destinations);
					destinationIndex = 0;

					return dfd.pipe( toCity(dfd) );
				};

				//step 2 - loop the recipient
				var toCity = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign launchAutomaticReassign deferred toCity function', destinationIndex, destinationsKeys, destinations);
					//recipients loop finished
					if( destinationIndex >= destinationsKeys.length ){
						KOCFIA.reassign.refreshOnGoing('Vérifications pour '+ city.label +' finies.');
						cityIndex += 1;
						return dfd.pipe( fromCity(dfd) );
					}

					destKey = destinationsKeys[ destinationIndex ];

					d = KOCFIA.cities[ destKey ];
					currentDestination = d.label;

					if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoReassign && KOCFIA.alarm.underAttack.hasOwnPropery( destKey ) ){
						KOCFIA.reassign.refreshOnGoing(currentDestination +' est attaquée, réassignement annulé.');
						destinationIndex += 1;
						return dfd.pipe( toCity(dfd) );
					}

					//requests parameters base
					params = $.extend({}, window.g_ajaxparams);
					params.cid = cityKey.replace(/city/, '');
					params.type = 5;//cm.MARCH_TYPES.MARCH_TYPE_REASSIGN: 5
					params.kid = 0;
					params.xcoord = d.coords.x;
					params.ycoord = d.coords.y;

					//rules of the sender - recipient pair
					rules = destinations[ destKey ];

					return dfd.pipe( checkRules(dfd) );
				};

				//step 3 - check the rule (resource, unit)
				var checkRules = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign launchAutomaticreassign deferred checkRules function');

					//reset request variables
					unitsArr = {};
					resources = [0, 0, 0, 0, 0, 0];
					totalUnits = 0;

					//reset the request parameters for resources
					params.gold = 0;
					params.r1 = 0;
					params.r2 = 0;
					params.r3 = 0;
					params.r4 = 0;
					params.r5 = 0;

					//max troop per rally point slot
					maxUnitPerSlot = Shared.getUnitLimit( cityKey, false, false, false, false );

					//loop each units to find a corresponding active rule
					for( unitKey in rules ){
						if( rules.hasOwnProperty( unitKey ) ){
							rule = rules[ unitKey ];
							//rule not active or wrong unit
							if( !rule.active ) continue;

							unitInfo = KOCFIA.unitInfo[ unitKey ];

							//get available resource
							availableUnit = parseInt(window.seed.units[ cityKey ][ unitKey ], 10);
							if( isNaN(availableUnit) ) continue;

							//how much need to be reassigned
							unitQuantity = availableUnit - rule.quantity;
							if( unitQuantity <= 0 ){
								KOCFIA.reassign.refreshOnGoing('Pas de surplus '+ unitInfo.labelBis + unitInfo.label +' dans '+ city.label +'.');
								continue;
							}

							//check maxUnitPerSlot limitation
							if( unitQuantity + totalUnits > maxUnitPerSlot ){
								unitQuantity = maxUnitPerSlot - totalUnits;
							}

							//update the request parameters and variables
							params[ unitKey.replace(/nt/, '') ] = unitQuantity;
							unitsArr[ unitKey.replace(/unt/, '') ] = unitQuantity;
							totalUnits += unitQuantity;

							//all available units used or slot capicity reached
							if( totalUnits == maxUnitPerSlot ) break;
						}
					}

					//is a reassign needed ?
					if( totalUnits > 0 ){
						//compute the reassign units and resources for display
						unitsSummary = [];
						for( unit in unitsArr ){
							if( unitsArr.hasOwnProperty(unit) && unitsArr[ unit ] > 0 ){
								unitInfo = KOCFIA.unitInfo[ 'unt'+ unit ];
								unitsSummary.push('<img src="'+ unitInfo.icon +'" alt="'+ unitInfo.label +'" title="'+ unitInfo.label +' '+ Shared.readable( unitsArr[ unit ] ) +'"> '+ Shared.format( unitsArr[ unit ] ));
							}
						}

						resourcesSummary = [];
						//do reassign include resources transport ?
						if( rule.transport ){
							//check if rule exists for the sender / recipient pair in automatic transport rules
							if( KOCFIA.transport.pileUp.hasOwnProperty( cityKey )
								&& KOCFIA.transport.pileUp[ cityKey ].hasOwnProperty( destKey )
							){
								resRules = KOCFIA.transport.pileUp[ cityKey ][ destKey ];

								units = [];
								for( unit in unitsArr ){
									if( unitsArr.hasOwnProperty(unit) && unitsArr[ unit ] > 0 ){
										unitInfo = KOCFIA.unitInfo[ 'unt'+ unit ];
										units.push({id: unitInfo.key, qty: unitsArr[ unit ]});
									}
								}
								loadCapacity = KOCFIA.quickMarch.getLoadCapacity( units, null );

								//loop each resource
								for( j = 0; j < KOCFIA.conf.transport.priority.pileUp.length; j += 1 ){
									res = KOCFIA.resourceInfo[ KOCFIA.conf.transport.priority.pileUp[ j ] ];
									resKey = res.key;
									if( resKey == 'rec0' ) r = 'gold';
									else r = resKey.replace(/ec/, '');

									resInfo = KOCFIA.resourceInfo[ resKey ];

									if( resRules.hasOwnProperty(resKey) && resRules[ resKey ].active ){
										//get available resource
										if( r == 'gold' ){
											availableResource = parseInt(window.seed.citystats[ cityKey ][ r ][0], 10);
											if( isNaN(availableResource) ) continue;
										} else {
											availableResource = parseInt(window.seed.resources[ cityKey ][ resKey ], 10);
											if( isNaN(availableResource) ) continue;
											else if( resInfo.name.indexOf('x3600') > -1 ) availableResource /= 3600;
										}

										//how much need to be stocked
										transportQuantity = parseInt(availableResource - resRules[ resKey ].quantity, 10);
										if( transportQuantity <= 0 ){
											continue;
										}
									}

									if( transportQuantity > loadCapacity ){
										params[ r ] = loadCapacity;
										resources[ parseInt(resKey.replace(/rec/, ''), 10) ] = loadCapacity;

										break;
									} else {
										params[ r ] = transportQuantity;
										resources[ parseInt(resKey.replace(/rec/, ''), 10) ] = transportQuantity;

										loadCapacity -= transportQuantity;
									}
								}
							}

							//compute the transport units and resources for display
							for( j = 0; j < resources.length; j += 1 ){
								if( resources[j] > 0 ){
									resInfo = KOCFIA.resourceInfo[ 'rec'+ j ];
									resourcesSummary.push('<img src="'+ resInfo.icon +'" alt="'+ resInfo.label +'" title="'+ resInfo.label +' '+ Shared.readable( resources[j] ) +'"> '+ Shared.format( resources[j] ));
								}
							}
						}

						return dfd.pipe( launch(dfd, params, 3) );
					} else {
						KOCFIA.reassign.refreshOnGoing('Aucun réassignement nécessaire depuis '+ city.label +'.');
						destinationIndex += 1;
						return dfd.pipe( toCity(dfd) );
					}
				};

				//step 4 - try to launch the march
				var launch = function( dfd, tParams, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reassign') ) console.info('kocfia reassign launchAutomaticReassign deferred launch function', tParams, attempts, unitsArr);
					$.ajax({
						url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
						type: 'post',
						data: tParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							var timediff = parseInt(data.eta, 10) - parseInt(data.initTS, 10),
								ts = Date.timestamp();

							KOCFIA.reassign.refreshOnGoing('Réassignement envoyé : '+ unitsSummary.join(', ') +' depuis '+ city.label +' vers '+ currentDestination +'.'+ (resourcesSummary.length > 0 ? ' Avec '+ resourcesSummary.join(', ') : ''));

								window.attach_addoutgoingmarch(data.marchId, data.marchUnixTime, ts + timediff, tParams.xcoord, tParams.ycoord, unitsArr, tParams.type, tParams.kid, resources, data.tileId, data.tileType, data.tileLevel, tParams.cid, true);

								window.updateBoosts(data);
								if( data.liftFog ){
									window.update_boosts();
									window.seed.playerEffects.fogExpire = 0;
									//window.g_mapObject.getMoreSlots();
								}

								//any free slot left ?
								if( Shared.getRallyPointSlots( cityKey ) === 0 ){
									KOCFIA.reassign.refreshOnGoing('Vérifications pour '+ city.label +' finies.');
									cityIndex += 1;
									return dfd.pipe( fromCity(dfd) );
								}

								destinationIndex += 1;
								return dfd.pipe( toCity(dfd) );

							} else if( data.user_action ){
								if( data.user_action == 'marchWarning' ){
									tParams.marchWarning = 1;
									return dfd.pipe( launch(dfd, tParams, 3) );
								} else if( data.user_action == 'marchCaptcha' ){
									KOCFIA.reassign.refreshOnGoing('Captcha détecté, réassignement annulé.');
									Shared.manageCaptcha('Réassignement automatique');
									return dfd.reject();
								} else {
									attempts -= 1;
									if( attempts > 0 ) return dfd.pipe( launch(dfd, tParams, attempts) );
									else {
										KOCFIA.reassign.refreshOnGoing('Réassignement refusé (serveur, action utilisateur requise) : '+ unitsSummary.join(', ') +' depuis '+ city.label +' vers '+ currentDestination +'.');
										destinationIndex += 1;
										return dfd.pipe( toCity(dfd) );
									}
								}
							} else if( data.msg ){
								//{"ok":false,"error_code":4,"feedback":"3-7-0","msg":"Unable to dispatch march. Not enough units"}
								KOCFIA.reassign.refreshOnGoing('Réassignement refusé ('+ data.msg +') : '+ unitsSummary.join(', ') +' depuis '+ city.label +' vers '+ currentDestination +'.');
								//detect message to pipe to the correct function (not enough units, not enough resource, PR full, ...)
								destinationIndex += 1;
								return dfd.pipe( toCity(dfd) );
							} else {
								KOCFIA.reassign.refreshOnGoing('Réassignement refusé (serveur) : '+ unitsSummary.join(', ') +' depuis '+ city.label +' vers '+ currentDestination +'.');
								destinationIndex += 1;
								return dfd.pipe( toCity(dfd) );
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( launch(dfd, tParams, attempts) );
							else {
								KOCFIA.reassign.refreshOnGoing('Réassignement refusé (internet) : '+ unitsSummary.join(', ') +' depuis '+ city.label +' vers '+ currentDestination +'.');
								destinationIndex += 1;
								return dfd.pipe( toCity(dfd) );
							}
						});
				};

				$.when( sequence() )
					.always(function(){
						KOCFIA.reassign.refreshOnGoing('Réassignement fini.');
					});
			}
		};

	/* MAP VISUALISATION WITH CANVAS */
		KOCFIA.canvas = {
			options: {
				active: 1
			}
		};

			/*
			provinces: [
				{name: 'Tintagel', x: 75, y: 75},
				{name: 'Cornouailles', x: 225, y: 75},
				{name: 'Astolat', x: 375, y: 75},
				{name: 'Lyonesse', x: 525, y: 75},
				{name: 'Corbenic', x: 625, y: 75},
				{name: 'Paimpont', x: 75, y: 225},
				{name: 'Caméliard', x: 225, y: 225},
				{name: 'Sarras', x: 375, y: 225},
				{name: 'Canoel', x: 525, y: 225},
				{name: 'Avalon', x: 625, y: 225},
				{name: 'Carmathen', x: 75, y: 375},
				{name: 'Shallot', x: 225, y: 375},
				{name: '-------', x: 375, y: 375},
				{name: 'Cadbury', x: 525, y: 375},
				{name: 'Glaston Bury', x: 625, y: 375},
				{name: 'Camlann', x: 75, y: 525},
				{name: 'Orkney', x: 225, y: 525},
				{name: 'Dore', x: 375, y: 525},
				{name: 'Loegrie', x: 525, y: 525},
				{name: 'Caerleon', x: 625, y: 525},
				{name: 'Parménie', x: 75, y: 675},
				{name: 'Bodmin Moor', x: 225, y: 675},
				{name: 'Celwig', x: 375, y: 675},
				{name: 'Listenoise', x: 525, y: 675},
				{name: 'Albion', x: 625, y: 675},
			],
			*/

		KOCFIA.canvas.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.canvas +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('canvas', 'active', 'Activer', KOCFIA.conf.canvas.active);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.canvas.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-canvas').html(''),
				code = '<canvas id="kocfia-map-canvas" width="375" height="375"></canvas>';

			$section.append( code );

			KOCFIA.canvas.cv = $('#kocfia-map-canvas')[0];
			KOCFIA.canvas.ctx = KOCFIA.canvas.cv.getContext('2d');

			KOCFIA.canvas.grid();
		};

		KOCFIA.canvas.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA formation on function');
		};

		KOCFIA.canvas.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA formation off function');
		};

		KOCFIA.canvas.grid = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas grid function');
			var width = 375, height = 375, size = 75, x;

			//clear the canvas
			KOCFIA.canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
			KOCFIA.canvas.ctx.clearRect(0, 0, KOCFIA.canvas.cv.width, KOCFIA.canvas.cv.height);

			for( x = 0; x <= width; x += size ){
				KOCFIA.canvas.ctx.moveTo(0 + x, 0);
				KOCFIA.canvas.ctx.lineTo(0 + x, height);
			}

			for( x = 0; x <= height; x += size ){
				KOCFIA.canvas.ctx.moveTo(0, 0 + x);
				KOCFIA.canvas.ctx.lineTo(width, 0 + x);
			}

			KOCFIA.canvas.ctx.strokeStyle = '#ede55a';
			KOCFIA.canvas.ctx.stroke();

			var coords = [], i, city;
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				city = KOCFIA.cities[ KOCFIA.citiesKey[i] ];

				coords.push( city.coords );
			}

			KOCFIA.canvas.drawCoords( coords );
		};

		KOCFIA.canvas.drawCoords = function( coords ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('canvas') ) console.info('KOCFIA canvas drawCoords function');
			if( !Array.isArray( coords ) ) coords = [ coords ];

			var size = KOCFIA.canvas.cv.width,
				scale = size / 750,
				i, x, y, c;
			KOCFIA.canvas.ctx.fillStyle = '#fa501a';
			for( i = 0; i < coords.length; i += 1 ){
				c = coords[i];
				x = c.x * scale;
				y = c.y * scale;

				KOCFIA.canvas.ctx.fillRect(x, y, x, y);
			}
		};

	/* ALARM */
		/* &Psi; = kocfia code | &alpha; = attack | &epsilon; = scout | &omega; = canceled | &rho; = reinforcement | &phi; = food */
		KOCFIA.alarm = {
			options: {
				active: 1,
				stopAutoAttack: 0,
				stopAutoTransport: 0,
				stopAutoReassign: 0,
				stopRaids: 0,
				postToAllianceChat: 0,
				watchAllianceReports: 0,
				HQ: '',
				minTroopOnHQ: 0,
				minTroopOnOther: 0,
				autonomy: 0,
				playSoundForAttack: 0,
				playSoundForScout: 0,
				playSoundForAutonomy: 0,
				playSoundForAllianceReport: 0,
				attackColor: '#FFC6A0',
				scoutColor: '#FFF8A0',
				autonomyColor: '#DEDEDE',
				attackSoundUrl: 'http://kocfia.kapok.fr/attack.ogg',
				scoutSoundUrl: 'http://kocfia.kapok.fr/scout.ogg',
				autonomySoundUrl: 'http://kocfia.kapok.fr/autonomy.ogg',
				allianceSoundUrl: 'http://kocfia.kapok.fr/alliance.ogg'
			},
			sounds: {
				attack: {$tag: null, playing: false},
				scout: {$tag: null, playing: false},
				autonomy: {$tag: null, playing: false},
				alliance: {$tag: null, playing: false}
			},
			underAttack: {}, //city keys
			incomings: {}, //march ids
			lastScanned: {},
			summary: {}, //march ids
			stored: ['incomings', 'summary']
		};

		/* grid related */
		KOCFIA.alarm.gridRowActions = function( cellValue, options, rowObject ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm gridRowActions function', cellValue, options, rowObject);
			var code = '';

			if( rowObject.type == 'attack' || rowObject.type == 'scout' ){
				//code += '<span class="ui-icon ui-icon-trash remove" data-arrival="'+ cellValue +'" title="Supprimer"></span>';

				code += '<span class="ui-icon ui-icon-cart attack-shortcut" data-coords="'+ rowObject.targetCoords +'" title="Renforcer"></span>';

				if( rowObject.fromCoords !== '' ){
					code += '<span class="ui-icon ui-icon-note attack-shortcut" data-coords="'+ rowObject.fromCoords +'" title="Contre-Attaquer"></span>';
					code += '<span class="ui-icon ui-icon-note scout-shortcut" data-coords="'+ rowObject.fromCoords +'" title="Contre-Eclairer"></span>';
				}

				code += '<span class="ui-icon ui-icon-person player-search" data-player="'+ rowObject.attacker +'" title="Recherche du joueur"></span>';

				if( rowObject.alliance !== '') code += '<span class="ui-icon ui-icon-contact alliance-search" data-alliance="'+ rowObject.alliance +'" title="Recherche de l\'alliance"></span>';
			} else if( type == 'reinforce' ){
				//code += '<span class="ui-icon ui-icon-refresh reinforce-refresh" title="Raffraîchir les troupes"></span>';
				if( rowObject.cityKey !== '' ){
					code += '<span class="ui-icon ui-icon-arrowreturn-1-e reinforce-kickout" data-marchKey="'+ rowObject.marchKey +'" data-cityKey="'+ rowObject.cityKey +'" title="Renvoyer"></span>';
				}
			}


			return code;
		};

		KOCFIA.alarm.selection = {};

		KOCFIA.map.gridParams = {
			datatype: 'local',
			loadui: 'disable',
			rowNum: 20,
			rowList: [20, 50, 100],
			sortname: 'arrival',
			sortorder: 'asc',
			altRows: true,
			altclass: 'zebra',
			height: 'auto',
			autowidth: true,
			viewrecords: true, //total in pager
			gridview: true, //speed boost
			hiddengrid: true,
			multiselect: true,
			multiboxonly: true,
			multikey: 'shiftKey',
			shrinkToFit: true,
			colNames: ['', '', 'Type', 'Joueur', 'Cible', 'ETA', 'Proche', 'Durées', 'Attaquant', 'Alliance', 'Depuis', 'Troupes', 'Statut', 'Empennage', 'Trône', 'Maréchal', 'Autorenforts', 'Renforts'],
			colModel: [
				{name: 'marchKey', index: 'marchKey', sortable: false, search: false, formatter: KOCFIA.alarm.gridRowActions, width: 40},
				{name: 'cityKey', index: 'cityKey', sortable: false, search: false, hidedlg: true, hidden: true},
				{name: 'type', index: 'type', formatter: function( cellValue, options, rowObject ){ if( cellValue == 'attack' ){ return 'attaque'; } else if( cellValue == 'scout' ){ return 'éclairage'; } else if( cellValue == 'reinforce' ){ return 'renfort'; } else return '?'; }, width: 60},
				{name: 'player', index: 'player', width: 100},
				{name: 'target', index: 'target', width: 60},
				{name: 'targetCoords', index: 'targetCoords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
				{name: 'eta', index: 'eta', width: 60},
				{name: 'near', index: 'near', width: 60},
				{name: 'durations', index: 'durations', width: 60},
				{name: 'attacker', index: 'attacker', width: 60},
				{name: 'alliance', index: 'alliance', width: 60},
				{name: 'fromCoords', index: 'fromCoords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
				{name: 'troops', index: 'troops', width: 60},
				{name: 'status', index: 'status', width: 60},
				{name: 'empennage', index: 'empennage', width: 60},
				{name: 'throne', index: 'throne', width: 60},
				{name: 'marshall', index: 'marshall', width: 60},
				{name: 'selfReinforcement', index: 'selfReinforcement', width: 60},
				{name: 'reinforcement', index: 'reinforcement', width: 60}
			],
			caption: '',
			pager: '#kocfia-alarm-pager',
			onSelectRow: function(key, checked){
				if( checked ){
					KOCFIA.alarm.selection[ key ] = KOCFIA.map.$resultsCities.jqGrid('getRowData', key);
				} else {
					delete KOCFIA.alarm.selection[ key ];
				}
			}
		};

		KOCFIA.alarm.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.alarm +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('alarm', 'active', 'Activer', KOCFIA.conf.alarm.active);
			code += '<br>';
			code += Shared.generateCheckbox('alarm', 'attack', 'Alerter en cas d\'attaque', KOCFIA.conf.alarm.attack);
			code += Shared.generateCheckbox('alarm', 'scout', 'Alerter en cas d\'éclairage', KOCFIA.conf.alarm.scout);

			code += '<br>';
			code += Shared.generateCheckbox('alarm', 'postToAllianceChat', 'Mettre les alarmes dans le chat alliance', KOCFIA.conf.alarm.postToAllianceChat);
			var labels = $.map(KOCFIA.citiesKey, function(cityKey){ return KOCFIA.cities[ cityKey ].label; }),
				values = KOCFIA.citiesKey.slice(); //independant copy
			labels.unshift('Choisissez');
			values.unshift('');
			code += Shared.generateSelect('alarm', 'HQ', 'Spécifier le quartier général', KOCFIA.conf.alarm.HQ, {labels: labels, values: values});
			code += Shared.generateInput('alarm', 'minTroopOnHQ', 'Minimum de troupe pour poster les alertes relatives quartier général', KOCFIA.conf.alarm.minTroopOnHQ);
			code += Shared.generateInput('alarm', 'minTroopOnOther', 'Seuil de troupe pour poster les alertes relatives aux autres villes', KOCFIA.conf.alarm.minTroopOnOther);

			code += '<br>';
			//attacks
			code += Shared.generateCheckbox('alarm', 'playSoundForAttack', 'Jouer un son pour les attaques', KOCFIA.conf.alarm.playSoundForAttack);
			code += Shared.generateAudioInput('alarm', 'attackSoundUrl', 'Adresse web du son à jouer pour les attaques <small>(wave, vorbis, ogg, webm)</small>', KOCFIA.conf.alarm.attackSoundUrl, 'attack');
			code += '<p><label for="kocfia-alarm-attackColor">Couleur des attaques&nbsp;:&nbsp;</label><input type="text" id="kocfia-alarm-attackColor" name="attackColor" class="alarmColors">';

			//scouts
			code += '<br><br>'+ Shared.generateCheckbox('alarm', 'playSoundForScout', 'Jouer un son pour les éclairages', KOCFIA.conf.alarm.playSoundForScout);
			code += Shared.generateAudioInput('alarm', 'scoutSoundUrl', 'Adresse web du son à jouer pour les éclairages <small>(wave, vorbis, ogg, webm)</small>', KOCFIA.conf.alarm.scoutSoundUrl, 'scout');
			code += '<p><label for="kocfia-alarm-scoutColor">Couleur des éclairages&nbsp;:&nbsp;</label><input type="text" id="kocfia-alarm-scoutColor" name="scoutColor" class="alarmColors">';

			//autonomy
			code += '<br><br>'+ Shared.generateCheckbox('alarm', 'playSoundForAutonomy', 'Jouer un son pour les autonomies', KOCFIA.conf.alarm.playSoundForAutonomy);
			code += Shared.generateAudioInput('alarm', 'autonomySoundUrl', 'Adresse web du son à jouer pour les alertes d\'autonomie <small>(wave, vorbis, ogg, webm)</small>', KOCFIA.conf.alarm.autonomySoundUrl, 'autonomy');
			code += '<p><label for="kocfia-alarm-autonomyColor">Couleur des attaques&nbsp;:&nbsp;</label><input type="text" id="kocfia-alarm-autonomyColor" name="autonomyColor" class="alarmColors">';

			//alliance reports
			code += '<br><br>'+ Shared.generateCheckbox('alarm', 'playSoundForAllianceReport', 'Jouer un son pour les rapports d\'alliance', KOCFIA.conf.alarm.playSoundForAllianceReport);
			code += Shared.generateAudioInput('alarm', 'autonomySoundUrl', 'Adresse web du son à jouer pour les alertes de rapports d\'alliance <small>(wave, vorbis, ogg, webm)</small>', KOCFIA.conf.alarm.allianceSoundUrl, 'alliance');

			code += '<br><br><p>Les transports, attaques et raids seront bloqués tant que la ville est attaquée</p>';
			code += Shared.generateCheckbox('alarm', 'stopAutoAttack', 'Bloquer les attaques automatiques en cas d\'attaque (pour la ville attaquée, CB, TS, FO, Eclairages)', KOCFIA.conf.alarm.stopAutoAttack);
			code += Shared.generateCheckbox('alarm', 'stopAutoTransport', 'Bloquer les transports automatiques en cas d\'attaque (pour la ville attaquée, expéditrice ou destinatrice)', KOCFIA.conf.alarm.stopAutoTransport);
			code += Shared.generateCheckbox('alarm', 'stopAutoReassign', 'Bloquer les réassignements automatiques en cas d\'attaque (pour la ville attaquée, expéditrice ou destinatrice)', KOCFIA.conf.alarm.stopAutoReassign);
			//code += Shared.generateCheckbox('alarm', 'stopRaids', 'Bloquer les raids barbares (pour la ville attaquée)', KOCFIA.conf.alarm.stopRaids);
			code += '<br>';
			code += Shared.generateCheckbox('alarm', 'watchAllianceReports', 'Scanner les rapports d\'alliance (pas de post)', KOCFIA.conf.alarm.watchAllianceReports);
			code += '<br>';
			code += Shared.generateCheckbox('alarm', 'autonomy', 'Alerter pour les autonomies inférieure à 24h', KOCFIA.conf.alarm.autonomy);

			code += '<br><br>';
			code += '<button class="fakeAttacks button secondary" rel="'+ window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK +',0"><span>Fausse attaque de ville</span></button>';
			code += '<button class="fakeAttacks button secondary" rel="'+ window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK +',1"><span>Fausse attaque de terre sauvage</span></button>';
			code += '<button class="fakeAttacks button secondary" rel="'+ window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT +',0"><span>Faux éclairage de ville</span></button>';
			code += '<button class="fakeAttacks button secondary" rel="'+ window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT +',1"><span>Faux éclairage de terre sauvage</span></button>';
			code += '<button class="fakeAttacks button secondary" rel="'+ window.cm.MARCH_TYPES.MARCH_TYPE_REINFORCE +',0"><span>Faux renfort de ville</span></button>';
			code += '</div>';

			$section.append( code )
				.on('change', '.alarmColors', function(){
					KOCFIA.conf.alarm[ this.name ] = $(this).miniColors('value');

					if( KOCFIA.conf.alarm.active ){
						$('#kocfia-chat-highlight-alarm').remove();

						var css = chatHighlightAlarmCss;
						css = css.replace(/%attackColor%/, KOCFIA.conf.alarm.attackColor);
						css = css.replace(/%scoutColor%/, KOCFIA.conf.alarm.scoutColor);
						css = css.replace(/%autonomyColor%/, KOCFIA.conf.alarm.autonomyColor);

						$head.append( $('<style id="kocfia-chat-highlight-alarm">').html(css) );
					}

					Shared.storeConf();
				})
				.on('click', '.fakeAttacks', function(){
					var $this = $(this),
						params = $this.attr('rel').split(',');

					KOCFIA.alarm.generateFake(params[0], params[1]);
					KOCFIA.alarm.checkIncoming();
				});

			$section.find('.alarmColors').miniColors().each(function(){
				$(this).miniColors('value', KOCFIA.conf.alarm[ this.name ]);
			});
		};

		KOCFIA.alarm.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm on function');

			var $soundAttack = $('<audio id="kocfia-sound-attack" src="'+ KOCFIA.conf.alarm.attackSoundUrl +'" preload="auto">'),
				$soundScout = $('<audio id="kocfia-sound-scout" src="'+ KOCFIA.conf.alarm.scoutSoundUrl +'" preload="auto">'),
				$soundAutonomy = $('<audio id="kocfia-sound-autonomy" src="'+ KOCFIA.conf.alarm.autonomySoundUrl +'" preload="auto">');
				$soundAlliance = $('<audio id="kocfia-sound-alliance" src="'+ KOCFIA.conf.alarm.allianceSoundUrl +'" preload="auto">');

			$body.append( $soundAttack )
				.append( $soundScout )
				.append( $soundAutonomy )
				.append( $soundAlliance );

			KOCFIA.alarm.sounds.attack.$tag = $soundAttack;
			KOCFIA.alarm.sounds.scout.$tag = $soundScout;
			KOCFIA.alarm.sounds.autonomy.$tag = $soundAutonomy;
			KOCFIA.alarm.sounds.alliance.$tag = $soundAlliance;

			$('#kocfia-chat-highlight-alarm').remove();

			var css = chatHighlightAlarmCss;
			css = css.replace(/%attackColor%/, KOCFIA.conf.alarm.attackColor);
			css = css.replace(/%scoutColor%/, KOCFIA.conf.alarm.scoutColor);
			css = css.replace(/%autonomyColor%/, KOCFIA.conf.alarm.autonomyColor);

			$head.append( $('<style id="kocfia-chat-highlight-alarm">').html(css) );

			if( KOCFIA.conf.alarm.watchAllianceReports ){
				KOCFIA.alarm.watchAllianceReportsOn();
			}
		};

		KOCFIA.alarm.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm off function');
			if( KOCFIA.conf.alarm.watchAllianceReports ){
				KOCFIA.alarm.watchReportsIntervalOff();
			}

			$('#kocfia-chat-highlight-alarm').remove();

			KOCFIA.alarm.sounds.attack.$tag.remove();
			KOCFIA.alarm.sounds.scout.$tag.remove();
			KOCFIA.alarm.sounds.autonomy.$tag.remove();
			KOCFIA.alarm.sounds.alliance.$tag.remove();

			KOCFIA.alarm.sounds.attack.$tag = null;
			KOCFIA.alarm.sounds.scout.$tag = null;
			KOCFIA.alarm.sounds.autonomy.$tag = null;
			KOCFIA.alarm.sounds.alliance.$tag = null;
		};

		KOCFIA.alarm.watchAllianceReportsOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm watchAllianceReportsOn function');

			watchReportsInterval = window.setInterval(function(){
				KOCFIA.alarm.scanReports();
			}, 2 * 60 * 1000);
		};

		KOCFIA.alarm.watchAllianceReportsOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm watchAllianceReportsOff function');
			if( watchReportsInterval ){
				window.cleanInterval( watchReportsInterval );
			}
		};

		KOCFIA.alarm.storeIncomings = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('kocfia alarm storeIncomings function');
			localStorage.setObject('kocfia_alarm_incomings_' + KOCFIA.storeUniqueId, KOCFIA.alarm.incomings);
		};

		KOCFIA.alarm.deleteIncomings = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('transport') ) console.info('KOCFIA transport deleteIncomings function');
			localStorage.removeItem('kocfia_alarm_incomings_' + KOCFIA.storeUniqueId);

			KOCFIA.alarm.incomings = {};
		};

		KOCFIA.alarm.checkIncoming = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm checkIncoming function');

			if( KOCFIA.conf.alarm.active ){
				if( !Array.isArray(window.seed.queue_atkinc) ){
					var m, march, cityKey,
						changed = false,
						timestamp = Date.timestamp();

					KOCFIA.alarm.underAttack = {};

					for( m in window.seed.queue_atkinc ){
						if( window.seed.queue_atkinc.hasOwnProperty(m) ){
							march = window.seed.queue_atkinc[ m ];
							if( (march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK || march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT) ){
								if( parseInt(march.arrivalTime, 10) > timestamp ){
									cityKey = 'city'+ march.toCityId;
									KOCFIA.alarm.underAttack[ cityKey ] = 1;

									if( !KOCFIA.alarm.incomings.hasOwnProperty(m) ){
										changed = true;
										KOCFIA.alarm.incomings[ m ] = march;
										KOCFIA.alarm.incomings[ m ].added = timestamp;

										KOCFIA.alarm.react((march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK ? 'attack' : 'scout'), cityKey, march);
									}
								} else if( KOCFIA.alarm.incomings.hasOwnProperty(m) ){
									changed = true;
									delete KOCFIA.alarm.incomings[ m ];
								}
							} else if( march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REINFORCE ){
								cityKey = 'city'+ march.toCityId;

								if( !KOCFIA.alarm.incomings.hasOwnProperty(m) ){
									changed = true;
									KOCFIA.alarm.incomings[ m ] = march;
									KOCFIA.alarm.incomings[ m ].added = timestamp;

									KOCFIA.alarm.react('reinforcement', cityKey, march);
								}
							}
						}
					}

					for( m in KOCFIA.alarm.incomings ){
						if( KOCFIA.alarm.incomings.hasOwnProperty(m) ){
							if( window.seed.queue_atkinc.hasOwnProperty(m) ){
								//attack arrived
								march = window.seed.queue_atkinc[ m ];
								if( parseInt(march.arrivalTime, 10) > timestamp ){
									changed = true;
									delete KOCFIA.alarm.incomings[ m ];
								}
							} else {
								march = KOCFIA.alarm.incomings[ m ];
								//add message for canceled attacks
								if( march.marchType != window.cm.MARCH_TYPES.MARCH_TYPE_REINFORCE && parseInt(march.arrivalTime, 10) < timestamp ){
									KOCFIA.alarm.react('canceled', 'city'+ march.toCityId, march);
									changed = true;
									delete KOCFIA.alarm.incomings[ m ];
								}
							}
						}
					}
				//no incoming (attack, scout, reinforcement), reset variables
				} else if( !$.isEmptyObject(KOCFIA.alarm.underAttack) || !$.isEmptyObject(KOCFIA.alarm.incomings) ){
					changed = true;
					KOCFIA.alarm.underAttack = {};
					KOCFIA.alarm.incomings = {};
				}

				if( changed ) KOCFIA.alarm.storeIncomings();
			}
		};

		KOCFIA.alarm.react = function(type, city, info){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm react function', type, city, info);

			if( KOCFIA.conf.alarm.postToAllianceChat ){
				var message,
					noPost = false; //on summarize for attack with total troop below thresold
				switch( type ){
					case 'autonomy':
							city = KOCFIA.cities[ cityKey ];
							var resInfo = KOCFIA.resourceInfo[ info.res ];
							message = '&Psi;&phi;'+ city.name +' '+ Shared.mapLink(city.coords.x +','+ city.coords.y) +' a besoin '+ resInfo.labelBis + resInfo.label +' ! ';
							message += 'Autonomie : '+ Shared.readableDuration( info.time ) +', consommation : -'+ Shared.readable( info.conso ) +'/h';
						break;
					case 'attack':
					case 'scout':
					case 'canceled':
					case 'reinforcement':
							city = KOCFIA.cities[ cityKey ];
							console.log(city.tileId, info.toTileId, city);

							var target, targetText;
							if( city.tileId == info.toTileId ){
								targetText = city.name;
								target = city.name;
							} else {
								targetText = 'TS';
								target = 'TS';
							}
							targetText += ' &rArr;('+ info.toXCoord +','+ info.toYCoord +')';

							//troops
							var troops = '',
								i = 0,
								uId,
								total = 0,
								hasInfantry = false,
								hasRanged = false,
								hasHorsed = false,
								hasSiege = false;
							for( u in info.unts ){
								if( info.unts.hasOwnProperty(u) ){
									nb = parseInt(info.unts[u], 10);
									if( nb > 0 ){
										if( i > 0 ) troops += ', ';
										uId = parseInt(u.replace(/u/, ''), 10);
										unitInfo = KOCFIA.unitInfo[ 'unt'+ uId ];

										if( uId == 6 ){
											hasRanged = true;
										} else if( uId < 6 ){
											hasInfantry = true;
										} else if( uId > 6 && uId < 9 ){
											hasHorsed = true;
										} else if( uId > 8 ){
											hasSiege = true;
										}

										total += nb;

										troops += Shared.format( nb ) +' '+ unitInfo.label;
										i += 1;
									}
								}
							}

							//alarm conf limitation
							if( (cityKey == KOCFIA.conf.alarm.HQ && total < KOCFIA.conf.alarm.minTroopOnHQ)
								|| (cityKey != KOCFIA.conf.alarm.HQ && total < KOCFIA.conf.alarm.minTroopOnOther)
							){
								noPost = true;
							}

							//marshall
							var knights = window.seed.knights[ cityKey ],
								marshallId = window.seed.leaders[ cityKey ].combatKnightId,
								marshallMsg = '',
								atk, def = 0;

							if( type != 'scout' && knights && marshallId ){
								var marshall = knights[ 'knt'+ marshallId ],
									timestamp = Date.timestamp();
								def = marshall.combat; //for reinforcements knight display check

								marshallMsg += 'maréchal '+ def;

								//defense boost
								if( window.seed.playerEffects.defExpire > timestamp ){
									marshallMsg += ', def +20%';
								}
								if( window.seed.playerEffects.def2Expire > timestamp ){
									marshallMsg += ', def +50%';
								}
							}

							//attacker
							var attacker = '',
								player = (window.seed.players.hasOwnProperty('u' + info.pid) ? window.seed.players['u' + info.pid] : (info.hasOwnProperty('players') && info.players.hasOwnProperty('u' + info.pid) ? info.players['u' + info.pid] : null )),
								playerName = '',
								alliance = '';
							if( player ){
								attacker += 'par &oplus;('+ player.n +') ('+ Shared.format( parseInt(player.m, 10) ) +')';

								playerName = player.n;

								var allianceId = player.a;
								if( window.seed.allianceNames.hasOwnProperty('a'+ allianceId) ){
									alliance = window.seed.allianceNames[ 'a'+ allianceId ];
									attacker += ' - &forall;('+ alliance +')';
								}
							}

							var fromCoords = '';
							if( info.hasOwnProperty('fromXCoord') ){
								attacker += ' depuis &Xi;('+ info.fromXCoord +','+ info.fromYCoord +')';
								fromCoords = info.fromXCoord +','+ info.fromYCoord;
							}

							if( type != 'scout' && info.hasOwnProperty('knt') && info.knt.hasOwnProperty('cbt') ){
								atk = parseInt(info.knt.cbt, 10);
								if( !isNaN(atk) ){
									attacker += ' (chevalier '+ atk +')';
								}
							}

							//ETA
							var arrival = new Date();
							arrival.setTime( parseInt(info.arrivalTime, 10) * 1000 );
							var eta = arrival.getHours() +':'+ arrival.getMinutes() +':'+ arrival.getSeconds();
							eta += ' ('+ Shared.readableDuration( info.arrivalTime - Date.timestamp() ) +')';

							if( type == 'attack' || type == 'scout' ){
								var reinforcements = '',
									autoReinforcements = '';
								if( city.tileId == info.toTileId ){
									var lvl = Shared.buildingHighestLevel(cityKey, 8);
									var slots = lvl,
										sUnits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
										s = 0, //self
										o = 0, //other
										slot = 1, r, c, k, n;

									for( m in window.seed.queue_atkinc ){
										if( window.seed.queue_atkinc.hasOwnProperty(m) ){
											march = window.seed.queue_atkinc[ m ];
											if( march.marchType == 2 && ('city'+ march.toCityId) == cityKey ){
												if( KOCFIA.cities.hasOwnProperty('city'+ march.fromCityId ) ){ //self reinforcements
													if( type == 'scout' ){ //only summing scouts
														r = parseInt(march['unit3Return'], 10) || 0;
														c = parseInt(march['unit3Count'], 10) || 0;
														if( r > 0 && r != c ){
															sUnits[3] += r;
														} else {
															sUnits[3] += c;
														}
													} else {
														//only need sum for auto reinforcements
														for( i = 1; i < 13; i += 1 ){
															r = parseInt(march['unit' + i + 'Return'], 10) || 0;
															c = parseInt(march['unit' + i + 'Count'], 10) || 0;
															if( r > 0 && r != c ){
																sUnits[i] += r;
															} else {
																sUnits[i] += c;
															}
														}
													}
												} else {
													slots -= 1;

													if( type == 'scout' ){
														n = '';
														if( window.seed.players.hasOwnProperty('u'+ info.fromPlayerId) ) n = window.seed.players[ 'u'+ info.fromPlayerId ].n +' ';

														r = parseInt(march['unit3Return'], 10) || 0;
														c = parseInt(march['unit3Count'], 10) || 0;
														if( r > 0 && r != c ){
															reinforcements += (o > 0 ? ', ': '') + n + Shared.format(r) +' '+ KOCFIA.unitInfo.unt3.label;
															o += 1;
														} else {
															reinforcements += (o > 0 ? ', ': '') + n + Shared.format(c) +' '+ KOCFIA.unitInfo.unt3.label;
															o += 1;
														}
													} else {
														if( slot > 1 ) reinforcements += ', ';

														reinforcements += slot +' ';
														if( window.seed.players.hasOwnProperty('u'+ info.fromPlayerId) ) reinforcements += window.seed.players[ 'u'+ info.fromPlayerId ].n +' ';

														k = parseInt(march.knightCombat, 10);
														if( k > 0 && k > def ) reinforcements += ' (chevalier '+ k +')';

														for( i = 1; i < 13; i += 1 ){
															r = parseInt(march['unit' + i + 'Return'], 10) || 0;
															c = parseInt(march['unit' + i + 'Count'], 10) || 0;
															if( r > 0 && r != c ){
																reinforcements += (o > 0 ? ', ': '') + Shared.format(r) +' '+ KOCFIA.unitInfo[ 'unt'+ i ].label;
																o += 1;
															} else {
																reinforcements += (o > 0 ? ', ': '') + Shared.format(c) +' '+ KOCFIA.unitInfo[ 'unt'+ i ].label;
																o += 1;
															}
														}
													}

													slot += 1;
												}
											}
										}
									}
								}

								if( type == 'scout' ){
									if( sUnits[i] > 3 ) autoReinforcements += 'auto-renforts ' + shared.format( sUnits[3] ) +' '+ KOCFIA.unitInfo.unt3.label;
								} else {
									for( i = 1; i < sUnits.length; i += 1 ){
										if( sUnits[i] > 0 ){
											if( s === 0 ) autoReinforcements += 'auto-renforts ';
											else autoReinforcements += ', ';

											autoReinforcements += shared.format( sUnits[i] ) +' '+ KOCFIA.unitInfo[ 'unt'+ i ].label;
											s += 1;
										}
									}
								}

								if( reinforcements !== '' ) reinforcements += 'renforts '+ slots +'/'+ lvl +' : ' + reinforcements;
								else if( lvl === 0 ) reinforcements += 'pas d\'ambassade';
							}

							if( type == 'attack' || type == 'scout' ){
								//throne bonus
								var throneBonus = KOCFIA.throne.getSetBonus( window.seed.throne.activeSlot ),
									bonusText = '',
									ranges = [0, 0, 0], //range, ranged range, siege range
									debuffs = [0, 0, 0]; //range debuff, ranged range debuff, siege range debuff
								if( !$.isEmptyObject(throneBonus) ){
									//generic bonus
									if( throneBonus[5] ) ranges[0] = throneBonus[5].percent; //range
									if( throneBonus[21] ) debuffs[0] = throneBonus[21].percent; //range debuff

									//specific bonus
									if( hasRanged ){
										if( throneBonus[37] ) ranges[1] = throneBonus[37].percent; //ranged range
										if( throneBonus[42] ) debuffs[1] = throneBonus[42].percent; //ranged range
									}

									if( hasSiege ){
										if( throneBonus[58] ) ranges[2] = throneBonus[58].percent; //siege range
										if( throneBonus[63] ) debuffs[2] = throneBonus[63].percent; //siege range
									}
								}

								bonusText = 'range '+ ranges[0] +'%';
								if( ranges[1] > 0 || ranges[2] > 0 ){
									bonusText += ' (';
									if( ranges[1] > 0 ) bonusText += 'A '+ ranges[1];
									if( ranges[2] > 0 ){
										if( ranges[1] > 0 ) bonusText += ', ';
										bonusText += 'A '+ ranges[1];
									}
									bonusText += ')';
								}

								bonusText = 'debuff '+ debuffs[0] +'%';
								if( debuffs[1] > 0 || debuffs[2] > 0 ){
									bonusText += ' (';
									if( debuffs[1] > 0 ) bonusText += 'A '+ debuffs[1];
									if( debuffs[2] > 0 ){
										if( debuffs[1] > 0 ) bonusText += ', ';
										bonusText += 'A '+ debuffs[1];
									}
									bonusText += ')';
								}
							}

							if( type == 'attack' || type == 'scout' ){
								var status = (parseInt(window.seed.citystats[ cityKey ].gate, 10) === 1 ? 'défense' : 'sanctuaire');
							}

							message = '&Psi;&';
							if( type == 'scout' ) message += 'epsilon';
							else if( type == 'attack' ) message += 'alpha';
							else if( type == 'canceled' ) message += 'omega';
							else if( type == 'reinforce' ) message += 'rho';
							message += '; '+ targetText +' ';

							if( type == 'scout' ) message += 'éclairée';
							else if( type == 'attack' ) message += 'attaquée';
							else if( type == 'reinforce' ) message += 'renforcée';
							else if( type == 'canceled' ) message += (info.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT ? 'éclairage annulé' : 'attaque annulée');

							if( type == 'attack' || type == 'scout' ){
								message += ' | '+ eta;
								message += ' | '+ attacker;
								message += ' | '+ troops;
								message += ' | '+ status;
								message += ' | empennage '+ parseInt(window.seed.tech.tch13, 10);
								message += ' | trône '+ bonusText;
								message += ' | '+ marshallMsg;
								message += ' | '+ autoReinforcements;
								message += ' | '+ reinforcements;

								KOCFIA.alarms.generateSummaryForAttack([message, info.marchId, info.arrivalTime], window.seed.player.name);

								KOCFIA.alarm.summarize();
							} else if( type == 'reinforce' ){
								message += ' | '+ eta;
								message += ' | '+ attacker;
								message += ' | '+ troops;

								KOCFIA.alarms.generateSummaryForAttack([message, info.marchId, info.arrivalTime], window.seed.player.name);

								KOCFIA.alarm.summarize();
							} else {
								message += attacker;

								if( KOCFIA.alarm.summary.hasOwnProperty(info.marchId) ){
									delete KOCFIA.alarm.summary[ info.marchId ];
									KOCFIA.alarm.summarize();
								}
							}

							message += '#'+ info.marchId +'#'+ info.arrivalTime +'#';
						break;
					default:
						return false;
				}

				if( !noPost ) KOCFIA.alarm.postToChat( type, message );
			}
		};

		KOCFIA.alarm.postToChat = function(type, message){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm postToChat function', type, message);

			if( KOCFIA.conf.alarm[ 'playSoundFor'+ type.capitalize ] && !KOCFIA.alarm.sounds[ type ].playing ){
				KOCFIA.alarm.sounds[ type ].playing = true;
				KOCFIA.alarm.sounds[ type ].$tag[0].play();
				window.setTimeout(function(){
					KOCFIA.alarm.sounds[ type ].playing = false;
				}, 10 * 1000);
			}

			KOCFIA.chat.$chatInput.val('/a'+ message);
			window.Chat.sendChat();
		};

		KOCFIA.alarm.scanReports = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm scanReports function');

			var params = $.extend({}, window.g_ajaxparams),
				found = false,
				scanning = {},
				messages = [];

			params.group = 'a';
			params.pageNo = 1;

			var request = function( attempts ){
				$.ajax({
					url: window.g_ajaxpath + "ajax/listReports.php" + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function(result){
					if( result.ok ){
						if( result.hasOwnProperty('arReports') && !$.isEmptyObject(result.arReports) ){
							var r, report, msg, timestamp = Date.timestamp();
							for( r in result.arReports ){
								if( result.arReports.hasOwnProperty(r) ){
									report = result.arReports[ r ];

									if( KOCFIA.alarm.lastScanned.hasOwnProperty(report.reportId) ){
										found = true;
										break;
									}

									scanning[ report.reportId ] = 1;

									elapsed = parseInt(report.reportUnixTime, 10) - timestamp;

									//MARCH_TYPE_SCOUT 3, MARCH_TYPE_ATTACK 4
									if( (report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT || report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK)
										&& elapsed > 0 && elapsed < 5 * 60 //&& report.marchTypeState == 1
									){
										//"side0XCoord":"66", "side0YCoord":"586", "side0TileType":"51", "side0TileLevel":"9", "side0CityId":"47364", "side0PlayerId":"10496374", "side0AllianceId":"0",
										//"side1XCoord":"9", "side1YCoord":"623", "side1CityId":"73864", "side1PlayerId":"12657181", "side1AllianceId":"769"

										//side 0 defender
										//side 1 attacker

										msg = result.arPlayerNames[ report.side0PlayerId ];
										msg += ' a été '+ (report.marchType == 3 ? 'éclairé' : 'attaqué');
										msg += ' par '+ result.arPlayerNames[ report.side1PlayerId ];
										msg += ' '+ result.arAllianceNames[ report.side1AllianceId ];
										msg += ' sur '+ result.arCityNames[ 'c'+ report.side0CityId ];
										msg += ' '+ Shared.mapLink(report.side0XCoord +','+ report.side0YCoord) + (report.side0TileType != '51' ? ' (TS)' : '');
										msg += ' depuis '+ result.arCityNames[ 'c'+ report.side1CityId ];

										messages.push('<div>'+ msg +'</div>');
									}
								}
							}

							if( !found ){
								params.pageNo += 1;
								return request(3);
							} else {
								KOCFIA.alarm.lastScanned = scanning;
								return displayMessages();
							}
						}

						return displayMessages();
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							return request( attempts );
						} else {
							return displayMessages();
						}
					}
				})
				.fail(function(){
					attempts -= 1;
					if( attempts > 0 ){
						return request( attempts );
					} else {
						return displayMessages();
					}
				});
			};

			var displayMessages = function(){
				if( messages.length > 0 ){
					if( !KOCFIA.alarm.hasOwnProperty('$warning') ){
						var $div = $('<div id="kocfia-alarm-alliance-warning" class="ui-widget ui-widget-content ui-corner-all">');

						var code = '<h3 class="title">Résumé des alertes pour les rapports d\'alliance</h3><div class="wrap"></div>';

						$div
							.append( '<span class="ui-icon ui-icon-close"></span>' )
							.append( code )
							.append( moveHandles )
							.draggable({
								handle: 'h3, .move-handle',
								scroll: true,
								distance: 20
							})
							.resizable({
								minWidth: 200,
								minHeight: 200,
								handles: 'n, e, s, w, ne, se, sw, nw',
								resize: function(event, ui){
									var wrapH = size.height - KOCFIA.alarm.$warning.find('.title').outerHeight(true) - 10; /* wrap bottom margin */
									KOCFIA.alarm.$warning.find('.wrap').css('height', wrapH);
								}
							})
							.css({
								top: 100,
								left: 100,
								width: 250,
								height: 250
							})
							.on('click', '.ui-icon-close', function(){
								KOCFIA.alarm.$warning.hide();
							});

						$body.append( $div );

						KOCFIA.alarm.$warning = $('#kocfia-alarm-alliance-warning');

						var $allianceWarningToggle = $('<button id="kocfia-alliance-warning-toggle" class="button warning">').append( '<span>Alliance attaquée !</span>' );
						$allianceWarningToggle.click(function(){
							KOCFIA.alarm.$warning.toggle();
						});

						KOCFIA.$buttons.append($allianceWarningToggle);
					}

					KOCFIA.alarm.$warning.find('.wrap').prepend( messages.join('') );

					if( KOCFIA.conf.alarm.playSoundForAllianceReport && !KOCFIA.alarm.sounds.alliance.playing ){
						KOCFIA.alarm.sounds.alliance.playing = true;
						KOCFIA.alarm.sounds.alliance.$tag[0].play();
						window.setTimeout(function(){
							KOCFIA.alarm.sounds.alliance.playing = false;
						}, 10 * 1000);
					}
				}
			};

			request(3);
		};

		KOCFIA.alarm.scanChat = function( nbMsg ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm scanChat function');
			if( KOCFIA.conf.alarm.active ){
				var $messages = KOCFIA.chat.$chatAlliance.find('.chatwrap');
				if( nbMsg > 0 ){
					$messages.filter(':lt('+ nbMsg +')');
				}

				$messages.find('.tx').each(function(){
					var $this = $(this),
						text = $this.html(),
						formatted = '',
						end, i,
						flag = text.slice(0, 4);

					text = text.replace(/&rArr;\((.*)\)/, '<span class="mapLink">$1</span> <span class="ui-icon ui-icon-wrench reinforce" title="Renforce" rel="$1"></span>')
								.replace(/&oplus;\((.*)\)/, '$1 <span class="ui-icon ui-icon-person research player" title="Recherche" rel="$1"></span>')
								.replace(/&forall;\((.*)\)/, '$1 <span class="ui-icon ui-icon-person research alliance" title="Recherche" rel="$1"></span>')
								.replace(/&Xi;\((.*)\)/, '<span class="mapLink">$1</span> <span class="ui-icon ui-icon-note scout" title="Éclaire" rel="$1"></span><span class="ui-icon ui-icon-flag attack" title="Attaque" rel="$1"></span>');

					if( flag.indexOf('&Psi;') > -1 ){
						var type,
							$chatwrap = $this.closest('.chatwrap');

						flag = text.slice(5, 14);
						if( flag.indexOf('&alpha;') > -1 ){
							type = 'attack';
							$chatwrap.addClass('attack');

							flag = text.split('#');

							KOCFIA.alarms.generateSummaryForAttack(flag, $chatwrap.find('.nm').text());

							flag = flag[0].substring(('&Psi;&alpha;').length, flag[0].length);
							flag = flag.split['|'];
							for( i = 0; i < flag.length; i += 1 ){
								if( i === 0 ){
									formatted += $.trim( flag[i] );
								} else {
									if( i === 1 ){
										formatted += '<span class="ui-icon ui-icon-triangle-1-se reduceToggle"></span><div class="reduce">';
									}

									formatted += '<div>'+ $.trim( flag[i] ) +'</div>';

									if( i + 1 == flag.length ){
										formatted += '</div>';
									}
								}
							}

							$this.html( formatted );

							KOCFIA.alarm.summarize();
						} else if( flag.indexOf('&epsilon;') > -1 ){
							type = 'scout';
							$chatwrap.addClass('scout');

							flag = text.split('#');

							KOCFIA.alarms.generateSummaryForAttack(flag, $chatwrap.find('.nm').text());

							flag = flag[0].substring(('&Psi;&epsilon;').length, flag[0].length);
							flag = flag.split['|'];
							for( i = 0; i < flag.length; i += 1 ){
								if( i === 0 ){
									formatted += $.trim( flag[i] );
								} else {
									if( i === 1 ){
										formatted += '<span class="ui-icon ui-icon-triangle-1-se reduceToggle"></span><div class="reduce">';
									}

									formatted += '<div>'+ $.trim( flag[i] ) +'</div>';

									if( i + 1 == flag.length ){
										formatted += '</div>';
									}
								}
							}

							$this.html( formatted );

							KOCFIA.alarm.summarize();
						} else if( flag.indexOf('&omega;') > -1 ){
							type = 'canceled';

							flag = text.split('#');

							formatted = flag[0].substring(('&Psi;&omega;').length, flag[0].length);
							$this.html( formatted );

							if( KOCFIA.alarm.summary.hasOwnProperty(flag[1]) ) delete KOCFIA.alarm.summary[ flag[1] ];
							KOCFIA.alarm.summarize();
						} else if( flag.indexOf('&phi;') > -1 ){
							type = 'autonomy';
							$this.closest('.chatwrap').addClass('autonomy');

							formatted = text.substring(('&Psi;&phi;').length, text.length);
							$this.html( '<span class="ui-icon ui-icon-suitcase food"></span>'+ formatted );
						}

						if( type && KOCFIA.conf.alarm[ 'playSoundFor'+ type.capitalize() ] && !KOCFIA.alarm.sounds[ type ].playing ){
							KOCFIA.alarm.sounds[ type ].playing = true;
							KOCFIA.alarm.sounds[ type ].$tag[0].play();
							window.setTimeout(function(){
								KOCFIA.alarm.sounds[ type ].playing = false;
							}, 10 * 1000);
						}
					}
				});
			}
		};

		KOCFIA.alarm.generateFake = function(type, isWild){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('kocfia alarm generateFake function');

			var timestamp = Date.timestamp(),
				marchId = 'm'+ timestamp,
				march = {},
				cityKey = KOCFIA.citiesKey[0],
				city = KOCFIA.cities[ cityKey ],
				w, i, playerKey;

			if( Array.isArray( window.seed.queue_atkinc ) ){
				window.seed.queue_atkinc = {};
			}

			march.kocfiaAlarmFake = 1;
			march.marchType = type;

			march.toCityId = city.id;
			if( isWild ){
				for( w in window.seed.wilderness[ cityKey ] ){
					if( window.seed.wilderness[ cityKey ].hasOwnProperty(w) ){
						march.toTileId = window.seed.wilderness[ cityKey ][ w ].tileId;
						break;
					}
				}
			} else {
				march.toTileId = city.tileId;
			}

			march.arrivalTime = timestamp + 10000;
			march.departureTime = timestamp - 10000;
			march.unts = {};
			if( type == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT ){
				for( i = 0; i < 12; i += 1 ){
					march.unts[ 'u'+ (i+1) ] = 0;
				}
				march.unts.u3 = 10000;
			} else {
				for( i = 0; i < 12; i += 1 ){
					march.unts[ 'u'+ (i+1) ] = 10000 + (i * 1234);
				}
			}

			march.pid = timestamp;
			playerKey = 'u'+ timestamp;
			march.score = 9;
			march.knt = {cbt: 255};
			march.mid = marchId.substr(1);
			march.players = {};
			march.players[ playerKey ] = {
				n: 'kocfiaAlarmTest',
				t: 60,
				m: timestamp,
				s: 'M',
				//w: 1,
				//i: 5,
				a: (window.seed.allianceDiplomacies.hasOwnProperty('allianceId') ? window.seed.allianceDiplomacies.allianceId : 0)
			};

			window.seed.queue_atkinc[ marchId ] = march;
		};

		KOCFIA.alarm.generateSummaryForAttack = function( message, player ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('kocfia alarm generateSummaryForAttack function', message, player);
			var type;
			if( message.indexOf('&Psi;&alpha;') > -1 ){
				type = 'attack';
				message = message.substring(('&Psi;&alpha;').length, message.length);
			} else if( message.indexOf('&Psi;&epsilon;') > -1 ){
				type = 'scout';
				message = message.substring(('&Psi;&epsilon;').length, message.length);
			} else if( message.indexOf('&Psi;&rho;') > -1 ){
				type = 'reinforce';
				message = message.substring(('&Psi;&rho;').length, message.length);
			}

			var infos = message[0].split(' | '),
				toX, toY, tmp, i, city, unitInfo, d, distance, min,
				units = ['unt3, unt4, unt6, unt7, unt8, unt11, unt12'],
				closest = null,
				targetCoords = message[0].match(/&rArr;\((.*)\)/),
				attacker = message[0].match(/&oplus;\((.*)\)/),
				alliance = message[0].match(/&forall;\((.*)\)/),
				fromCoords = message[0].match(/&Xi;\((.*)\)/),
				near = '',
				durations = '',
				cityKey = '';

			if( targetCoords !== null ){
				targetCoords = targetCoords[1];
				if( type != 'reinforce' && targetCoords.indexOf(',') > 0 ){
					tmp = targetCoords.split(',');
					toX = tmp[0];
					toY = tmp[1];

					min = 999;
					for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						city = KOCFIA.cities[ KOCFIA.citiesKey[i] ];

						if( toX == city.cood.x && toY == city.coord.y ){
							cityKey = KOCFIA.citiesKey[i];
						}

						distance = Shared.getDistance( city.coord.x, city.coord.y, toX, toY );
						if( distance < min ){
							min = distance;
							closest = KOCFIA.citiesKey[i];
						}
					}

					if( closest !== null ){
						near = closest.label;

						for( i = 0; i < units.length; i += 1 ){
							if( i > 0 ) durations += ', ';

							d = Shared.getDuration( closest, null, targetCoords, units[i], 'reinforce' );
							if( d !== '' ){
								unitInfo = KOCFIA.unitInfo[ units[i] ];
								durations += '<img src="'+ unitInfo.icon +'">&nbsp;'+ Shared.readableDuration( d );
							}
						}

						if( KOCFIA.conf.alarms.HQ !== '' && closest != KOCFIA.conf.alarms.HQ && KOCFIA.cities.hasOwnProperty(KOCFIA.conf.alarms.HQ) ){
							city = KOCFIA.cities[ KOCFIA.conf.alarms.HQ ];

							//no need if the target is the HQ
							if( city.coords.x != toX && city.coords.y != toY ){
								durations += '<br>Depuis '+ city.label +' :<br>';

								for( i = 0; i < units.length; i += 1 ){
									if( i > 0 ) durations += ', ';

									d = Shared.getDuration( KOCFIA.conf.alarms.HQ, null, targetCoords, units[i], 'reinforce' );
									if( d !== '' ){
										unitInfo = KOCFIA.unitInfo[ units[i] ];
										durations += '<img src="'+ unitInfo.icon +'">&nbsp;'+ Shared.readableDuration( d );
									}
								}
							}
						}
					}
				}
			}

			KOCFIA.alarm.summary[ message[1] ] = {
				marchKey:			message[1],
				cityKey:			cityKey,
				type:				type,
				player:				player,
				arrival:			message[2],
				target:				$.trim( infos[0] ).replace(/&rArr;\(.*\)/, ''),
				targetCoords:		targetCoords,
				eta:				$.trim( infos[1] ),
				near:				near,
				durations:			durations,
				attacker:			(attacker !== null ? attacker[1] : ''),
				alliance:			(alliance !== null ? alliance[1] : ''),
				fromCoords:			(fromCoords !== null ? fromCoords[1] : ''),
				troops:				(infos[3] ? $.trim( infos[3] ) : ''),
				status:				(infos[4] ? $.trim( infos[4] ) : ''),
				fletching:			(infos[5] ? $.trim( infos[5] ) : ''),
				throne:				(infos[6] ? $.trim( infos[6] ) : ''),
				marshall:			(infos[7] ? $.trim( infos[7] ) : ''),
				selfReinforcements:	(infos[8] ? $.trim( infos[8] ) : ''),
				reinforcements:		(infos[9] ? $.trim( infos[9] ) : '')
			};
		};

		KOCFIA.alarm.summarize = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('alarm') ) console.info('KOCFIA alarm summarize function');
			if( !$.isEmptyObject( KOCFIA.alarm.summary ) ){
				if( !KOCFIA.alarm.hasOwnProperty('$summary') ){
					var $div = $('<div id="kocfia-alarm-summary" class="ui-widget ui-widget-content ui-corner-all">');

					var code = '<h3 class="title">Récapitulatif des attaques et éclairages</h3><div class="wrap">';
					code += '<table id="kocfia-alarm-grid" class="search-results"></table>';
					code += '<div id="kocfia-alarm-pager" class="search-pager"></div>';
					code += '</div>';

					$div
						.append( '<span class="ui-icon ui-icon-close"></span>' )
						.append( code )
						.append( moveHandles )
						.draggable({
							handle: 'h3, .move-handle',
							scroll: true,
							distance: 20
						})
						.resizable({
							minWidth: 200,
							minHeight: 200,
							handles: 'n, e, s, w, ne, se, sw, nw',
							resize: function(event, ui){
								var wrapH = size.height - KOCFIA.alarm.$summary.find('.title').outerHeight(true) - 10; /* wrap bottom margin */
								KOCFIA.alarm.$summary.find('.wrap').css('height', wrapH);
							},
							stop: function(event, ui){
								var size = KOCFIA.alarm.$summary.find('h3').innerWidth() + 1;
								KOCFIA.alarm.$grid.jqGrid('setGridWidth', size);
							}
						})
						.css({
							top: 100,
							left: 100,
							width: 250,
							height: 250
						})
						.on('click', '.ui-icon-close', function(){
							KOCFIA.alarm.$summary.hide();
						});

					$body.append( $div );

					KOCFIA.alarm.$summary = $('#kocfia-alarm-summary');

					KOCFIA.alarm.$grid = KOCFIA.alarm.$summary.find('#kocfia-alarm-grid')
						.jqGrid( KOCFIA.alarm.gridParams )
						.jqGrid('navGrid', '#kocfia-alarm-pager', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
						.jqGrid('navButtonAdd', '#kocfia-alarm-pager', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.alarm.grid[0].toggleToolbar(); }, position: 'last'})
						.jqGrid('navButtonAdd','#kocfia-alarm-pager', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.alarm.grid[0].clearToolbar(); }, position: 'last'})
						.jqGrid('navButtonAdd', '#kocfia-alarm-pager', {caption: '', title: "Supprimer les lignes sélectionnées", buttonicon: 'ui-icon-trash', onClickButton: function(){ KOCFIA.alarm.removeSelection(); }, position: 'last'})
						.jqGrid('filterToolbar');

					KOCFIA.alarm.$grid
						.on('click', '.reinforce-kickout', function(){
							var $this = $(this);
							KOCFIA.marches.kickoutReinforcements( $this.attr('data-marchkey'), $this.attr('data-cityKey') );
						})
						.on('click', '.attack-shortcut, .scout-shortcut', function(){
							if( KOCFIA.conf.quickMarch.on ){
								var $this = $(this),
									type = $this.hasClass('attack-shortcut') ? 'attack' : 'scout';

								KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$="quickMarch"]').trigger('click');

								$('#kocfia-quickMarch')
									.find('.type').find('#kocfia-quickMarch-type-'+ type).prop('checked').end()
									.find('.coord').val( $this.attr('data-coord') ).trigger('change');
							} else {
								alert('L\'onglet marche simplifées n\'est pas actif.');
							}
						})
						.on('click', '.ui-jqgrid-titlebar', function(){
							$(this).find('.ui-jqgrid-titlebar-close').trigger('click');
						});

					var $alarmSummaryToggle = $('<button id="kocfia-alarm-summary-toggle" class="button warning">').append( '<span>Récapitulatif</span>' );
					$alarmSummaryToggle.click(function(){
						KOCFIA.alarm.$summary.toggle();
					});

					KOCFIA.$buttons.append( $alarmSummaryToggle );
				}

				KOCFIA.alarm.$summary.find('.wrap').html( list );
			} else {
				//fill the grid with the updated data
				KOCFIA.alarm.$summaryGrid.jqGrid('setGridParam', {data: KOCFIA.alarms.summary}).trigger('reloadGrid');
			}
		};

	/* KNIGHTS */
		KOCFIA.knights = {
			options: {
				active: 1
			},
			buttons: {},
			jobs: {} //by cityKey
		};

		KOCFIA.knights.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.knights +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('knights', 'active', 'Activer', KOCFIA.conf.knights.active);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.knights.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-knights').html('');

			var i, l, cityKey, city, knights, marshall, alchemystic, foreman, steward,
				lvl, skillPointsLeft,
				timestamp = Date.timestamp();

			KOCFIA.knights.buttons.promote = '<button class="promote button secondary"><span>Assigne</span></button>';
			KOCFIA.knights.buttons.unpromote = '<button class="unpromote button danger"><span>Révoque</span></button>';
			KOCFIA.knights.buttons.fire = '<button class=" button danger"><span>Licencie</span></button>';

			var header = '<div class="infos">';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div><h3>'+ KOCFIA.modulesLabel.knights +'</h3>';
			header += '<div class="buttonset">Afficher : ';

			var code = '<table><thead><tr>';
			code += '<th><button class="button update" title="Met à jour les informations sur les chevaliers"><span>Raffraîchir</span></button></th>';
			code += '<th>Nom</th>';
			/*code += '<th title="Niveau du chevalier">Niv</th>';
			code += '<th>Coût</th>';*/
			code += '<th title="Point restant à attribuer">Points</th>';
			code += '<th title="Politique">Pol</th>';
			code += '<th title="Combativité">Com</th>';
			code += '<th title="Intelligence">Int</th>';
			code += '<th title="Ingéniosité">Ing</th>';
			code += '<th>Actions</th>';
			code += '<th colspan="2">Boosts</th>';
			code += '</tr></thead>';

			for( i = 0, l = KOCFIA.citiesKey.length; i < l; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];

					header += '<input type="checkbox" id="kocfia-knight-'+ cityKey +'" value="'+ cityKey +'" checked>';
					header += '<label for="kocfia-knight-'+ cityKey +'">'+ city.label +'</label>';

					code += KOCFIA.knights.byCity( cityKey );
				}
			}

			header += '</div>';
			code += '</table>';

			var help = KOCFIA.knights.getHelp();

			$section.append( header + code + help )
				.on('change', '.buttonset input', function(){
					KOCFIA.knights.$tbodies.filter('[data-city="'+ this.value +'"]').toggle( $(this).prop('checked') );
				})
				.on('click', '.update', function(){
					KOCFIA.knights.update();
				})
				.on('click', '.promote, .unpromote', function(){
					var $this = $(this),
						$tr = $this.closest('tr'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						knightKey = $tr.data('knight'),
						position = parseInt( $this.siblings('select').val(), 10),
						flag = $this.hasClass('promote');

					if( flag === true && isNaN(position) ) return;

					Shared.working();
					$.when( KOCFIA.knights.promote(cityKey, knightKey, position, flag) )
						.done(function(){
							Shared.success( null );
							$('.tipsy').remove();
							$tbody.html( $(KOCFIA.knights.byCity(cityKey)).html() );
						})
						.fail(function(){
							Shared.notify('Erreur');
						});
				})
				.on('click', '.fire', function(){
					var $this = $(this),
						$tr = $this.closest('tr'),
						$tbody = $tr.closest('tbody'),
						cityKey = $this.closest('tbody').data('city'),
						knightKey = $tr.data('knight');

					Shared.working();
					$.when( KOCFIA.knights.dismiss(cityKey, knightKey) )
						.done(function(){
							Shared.success( null );
							$('.tipsy').remove();
							$tbody.html( $(KOCFIA.knights.byCity(cityKey)).html() );
						})
						.fail(function(){
							Shared.notify('Erreur');
						});
				})
				.on('click', '.stats', function(){
					var $this = $(this),
						$tr = $this.closest('tr'),
						$tds = $tr.find('td'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tr.closest('tbody').data('city'),
						knightKey = $tr.data('knight'),
						points = parseInt($tds.eq(2).html(), 10),
						knight = window.seed.knights[ cityKey ][ knightKey ],
						stats, index;

					if( knight ){
						stats = [
							parseInt(knight.politics, 10),
							parseInt(knight.combat, 10),
							parseInt(knight.intelligence, 10),
							parseInt(knight.resourcefulness, 10)
						];
					} else {
						Shared.notify('Chevalier introuvable');
						return false;
					}

					if( $this.hasClass('p') ) index = 0;
					else if( $this.hasClass('c') ) index = 1;
					else if( $this.hasClass('i') ) index = 2;
					else if( $this.hasClass('r') ) index = 3;

					if( stats[ index ] == 255 ){
						Shared.notify('Impossible de monter une compétence au-delà de 255');
						return false;
					}
					stats[ index ] += points;
					if( stats[ index ] > 255 ) stats[ index ] = 255;

					Shared.working();
					$.when( KOCFIA.knights.skillUp(cityKey, knightKey, stats, points) )
						.done(function(){
							Shared.success(null);
							$('.tipsy').remove();
							$tbody.html( $( KOCFIA.knights.byCity(cityKey) ).html() );
						})
						.fail(function(){
							Shared.notify('Erreur');
						});
				})
				.on('click', '.boost', function(){
					var $this = $(this),
						$tr = $this.closest('tr'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tr.closest('tbody').data('city'),
						knightKey = $tr.data('knight'),
						itemKey = $this.attr('rel');

					Shared.working();
					$.when( KOCFIA.knights.boost(cityKey, knightKey, itemKey, ($this.hasClass('xp') ? 'xp' : 'stat')) )
						.done(function(){
							Shared.success( null );
							$('.tipsy').remove();
							KOCFIA.knights.update();
						})
						.fail(function(){
							Shared.notify('Erreur');
						});
				});

			KOCFIA.knights.$tbodies = $('#kocfia-knights').find('tbody');
		};

		KOCFIA.knights.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights on function');
		};

		KOCFIA.knights.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights off function');
		};

		KOCFIA.knights.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights getHelp function');
			var help = '<div id="kocfia-knights-help" class="help" title="Aide gestion des '+ KOCFIA.modulesLabel.knights +'">';
			help += '<h4>Gestion des chevaliers</h4><ul>';
			help += '<li>Seuls les chevaliers en ville peuvent être gérés</li>';
			help += '<li>Les listes des chevaliers ne sont pas mises à jour tout le temps lors d\'autre action externe à l\'onglet</li>';
			help += '<li>Un bouton "Raffraîchir" permet de mettre à jour la liste d\'une ville</li>';
			help += '<li>Pour attribuer des points à un chevalier, cliquer sur la compétence voulue (par exemple le score de combat)</li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.knights.update = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights update function');

			var cityKey, $code;

			for( i = 0, l = KOCFIA.citiesKey.length; i < l; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];

				$code = $( KOCFIA.knights.byCity( cityKey ) );
				KOCFIA.knights.$tbodies.filter('[data-city="'+ cityKey +'"]').html( $code.html() );
			}
		};

		KOCFIA.knights.byCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights byCity function');
			var code = '<tbody data-city="'+ cityKey +'">',
				knights = window.seed.knights[ cityKey ],
				leaders = window.seed.leaders[ cityKey ],
				options = '', k;

			code += '<tr><th colspan="12">'+ KOCFIA.cities[ cityKey ].label +'</th></tr>';

			if( leaders.politicsKnightId ){
				if( leaders.politicsKnightId != '0' ){
					code += KOCFIA.knights.byKnight( cityKey, 'knt'+ leaders.politicsKnightId );
				} else {
					options += '<option value="12">Contremaître</option>';
				}
			}

			if( leaders.combatKnightId ){
				if( leaders.combatKnightId != '0' ){
					code += KOCFIA.knights.byKnight( cityKey, 'knt'+ leaders.combatKnightId );
				} else {
					options += '<option value="13">Maréchal</option>';
				}
			}

			if( leaders.intelligenceKnightId ){
				if( leaders.intelligenceKnightId != '0' ){
					code += KOCFIA.knights.byKnight( cityKey, 'knt'+ leaders.intelligenceKnightId );
				} else {
					options += '<option value="14">Alchimiste</option>';
				}
			}

			if( leaders.resourcefulnessKnightId ){
				if( leaders.resourcefulnessKnightId != '0' ){
					code += KOCFIA.knights.byKnight( cityKey, 'knt'+ leaders.resourcefulnessKnightId );
				} else {
					options += '<option value="11">Régisseur</option>';
				}
			}

			if( options.length > 0 ){
				KOCFIA.knights.jobs[ cityKey ] = '<select class="jobs"><option value="">Postes</option>'+ options +'</select>';
			} else {
				KOCFIA.knights.jobs[ cityKey ] = '';
			}

			var combatOrdered = [];
			for( k in knights ){
				if( knights.hasOwnProperty(k) ){
					knight = knights[ k ];
					if( knight.knightId != leaders.politicsKnightId
						&& knight.knightId != leaders.combatKnightId
						&& knight.knightId != leaders.intelligenceKnightId
						&& knight.knightId != leaders.resourcefulnessKnightId
					){
						combatOrdered.push({key: k, combat: parseInt(knight.combat, 10)});
					}
				}
			}

			combatOrdered.sort(function(a, b){ return b.combat - a.combat; });

			for( var i = 0, l = combatOrdered.length; i < l; i += 1 ){
				code += KOCFIA.knights.byKnight( cityKey, combatOrdered[ i ].key ); //k = 'kntXXXX'
			}

			code += '</tbody>';

			return code;
		};

		KOCFIA.knights.byKnight = function( cityKey, knightKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights byKnight function');

			var knight = window.seed.knights[ cityKey ][ knightKey ],
				leaders = window.seed.leaders[ cityKey ],
				lvl = window.convertKnightExpToLvl(knight.experience),
				skillPointsLeft = lvl - parseInt(knight.skillPointsApplied, 10),
				isLeader = false,
				timestamp = Date.timestamp(),
				//stats
				p = parseInt(knight.politics, 10),
				c = parseInt(knight.combat, 10),
				i = parseInt(knight.intelligence, 10),
				r = parseInt(knight.resourcefulness, 10),
				max = Math.max(p, c, i, r),
				pc = '', cc = '', ic = '', rc = '', //stats css class then boosted
				pt, ct, it, rt, //time left on boost
				isMarching = (knight.knightStatus == 10);

			ct = parseInt(knight.combatBoostExpireUnixtime, 10) - timestamp;
			if( ct > 0 ){
				c = parseInt(c * 1.25, 10);
				cc = 'boosted';
			}

			it = parseInt(knight.intelligenceBoostExpireUnixtime, 10) - timestamp;
			if( it > 0 ){
				i = parseInt(i * 1.25, 10);
				ic = 'boosted';
			}

			pt = parseInt(knight.politicsBoostExpireUnixtime, 10) - timestamp;
			if( pt > 0 ){
				p = parseInt(p * 1.25, 10);
				pc = 'boosted';
			}

			rt = parseInt(knight.resourcefulnessBoostExpireUnixtime, 10) - timestamp;
			if( rt > 0 ){
				r = parseInt(r * 1.25, 10);
				rc = 'boosted';
			}

			var code = '<tr class="'+ (skillPointsLeft > 0 ? 'skillPointsLeft' : '' ) +'" data-knight="'+ knightKey +'">';
			code += '<td>';

			if( knight.knightId == leaders.politicsKnightId ){
				code += 'Contremaître';
				isLeader = true;
			} else if( knight.knightId == leaders.combatKnightId ){
				code += 'Maréchal';
				isLeader = true;
			} else if( knight.knightId == leaders.intelligenceKnightId ){
				code += 'Alchimiste';
				isLeader = true;
			} else if( knight.knightId == leaders.resourcefulnessKnightId ){
				code += 'Régisseur';
				isLeader = true;
			} else if( isMarching ) code += 'en marche';
			else code += '&nbsp;';

			code += '</td>';
			code += '<td>'+ knight.knightName +'</td>'; //name
			/*code += '<td>'+ lvl +'</td>'; //level
			code += '<td>'+ Shared.readable((parseInt(knight.skillPointsApplied, 10) + 1) * 20) +'</td>'; //salary*/
			code += '<td>'+ skillPointsLeft +'</td>';

			code += '<td class="p '+ (isMarching ? '' : 'stats') +' '+ pc +' '+ (max == knight.politics ? 'primary' : '') +'" '+ (pt > 0 ? 'title="Boost 25% - reste '+ Shared.readableDuration(pt) +'"' : '') +'>'+ p +'</td>'; //politic
			code += '<td class="c '+ (isMarching ? '' : 'stats') +' '+ cc +' '+ (max == knight.combat ? 'primary' : '') +'" '+ (ct > 0 ? 'title="Boost 25% - reste '+ Shared.readableDuration(ct) +'"' : '') +'>'+ c +'</td>'; //combat
			code += '<td class="i '+ (isMarching ? '' : 'stats') +' '+ ic +' '+ (max == knight.intelligence ? 'primary' : '') +'" '+ (it > 0 ? 'title="Boost 25% - reste '+ Shared.readableDuration(it) +'"' : '') +'>'+ i +'</td>'; //intelligence
			code += '<td class="r '+ (isMarching ? '' : 'stats') +' '+ rc +' '+ (max == knight.resourcefulness ? 'primary' : '') +'" '+ (rt > 0 ? 'title="Boost 25% - reste '+ Shared.readableDuration(rt) +'"' : '') +'>'+ r +'</td>'; //resourcefulness

			code += '<td>'; //actions
			if( knight.knightStatus != 10 ){
				if( isLeader ){
					code += KOCFIA.knights.buttons.unpromote;
				} else {
					if( KOCFIA.knights.jobs[ cityKey ] !== '' ){
						code += KOCFIA.knights.jobs[ cityKey ];
						code += KOCFIA.knights.buttons.promote;
					}
					code += KOCFIA.knights.buttons.fire;
				}
			}
			code += '</td>';

			if( knight.knightStatus == 10 ){
				code += '<td></td><td></td>';
			} else {
				code += '<td>'; //boosts

				var items = [361, 362, 363], //xp boost
					info, key, nb;
				for( i = 0; i < items.length; i += 1 ){
					key = 'i' + items[i];
					nb = parseInt(window.seed.items[ key ], 10);
					if( nb > 1 ){
						info = window.itemlist[ key ];
						code += '<span class="boost xp" rel="'+ key +'" data-count="'+ nb +'"';
						code += ' title="'+ info.name +' ('+ nb +') - '+ info.description +'">';
						code += '<img src="'+ window.stimgUrl +'img/items/70/'+ items[i] +'.jpg"></span>';
					}
				}

				code += '</td><td>';

				items = [211, 221, 231, 241]; //stat boost
				for( i = 0; i < items.length; i += 1 ){
					key = 'i' + items[i];
					nb = parseInt(window.seed.items[ key ], 10);
					if( nb > 1 ){
						info = window.itemlist[ key ];
						code += '<span class="boost stat" rel="'+ key +'" data-count="'+ nb +'"';
						code += ' title="'+ info.name +' ('+ nb +') - '+ info.description +'">';
						code += '<img src="'+ window.stimgUrl +'img/items/70/'+ items[i] +'.jpg"></span>';
					}
				}

				code += '</td>';
			}
			code += '</tr>';

			return code;
		};

		KOCFIA.knights.skillUp = function(cityKey, knightKey, stats, points){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights skillUp function', cityKey, knightKey, stats, points);
			return $.Deferred(function(dfd){
				var params = $.extend({}, window.g_ajaxparams),
					knightId = knightKey.replace(/knt/, '');

				params.cid = cityKey.replace(/city/, '');
				params.kid = knightId;
				params.p = stats[0];
				params.c = stats[1];
				params.i = stats[2];
				params.r = stats[3];

				var request = function( attempts ){
					$.ajax({
						url: window.g_ajaxpath + "ajax/skillupKnight.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							window.seed.knights[ cityKey ][ knightKey ].politics = stats[0];
							window.seed.knights[ cityKey ][ knightKey ].combat = stats[1];
							window.seed.knights[ cityKey ][ knightKey ].intelligence = stats[2];
							window.seed.knights[ cityKey ][ knightKey ].resourcefulness = stats[3];
							window.seed.knights[ cityKey ][ knightKey ].skillPointsApplied = (parseInt(window.seed.knights[ cityKey ][ knightKey ].skillPointsApplied, 10) + points).toString();

							return dfd.resolve();
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								request( attempts );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							request( attempts );
						} else {
							return dfd.reject();
						}
					});
				};

				request(3);
			}).promise();
		};

		KOCFIA.knights.promote = function(cityKey, knightKey, position, flag){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights promote function', cityKey, knightKey, position, flag);
			return $.Deferred(function(dfd){
				var params = $.extend({}, window.g_ajaxparams),
					knightId = knightKey.replace(/knt/, '');
				params.cid = cityKey.replace(/city/, '');
				params.pos = position;
				params.kid = (flag ? parseInt(knightId, 10) : 0);

				var request = function( attempts ){
					$.ajax({
						url: window.g_ajaxpath + "ajax/assignknight.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							if( position == 11 ) window.seed.leaders[cityKey].resourcefulnessKnightId = (flag ? knightId : '0');
							else if( position == 12 ) window.seed.leaders[cityKey].politicsKnightId = (flag ? knightId : '0');
							else if( position == 13 ) window.seed.leaders[cityKey].combatKnightId = (flag ? knightId : '0');
							else if( position == 14 ) window.seed.leaders[cityKey].intelligenceKnightId = (flag ? knightId : '0');

							return dfd.resolve();
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( request( attempts ) );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( request( attempts ) );
						} else {
							return dfd.reject();
						}
					});
				};

				return dfd.pipe( request(3) );
			}).promise();
		};

		KOCFIA.knights.dismiss = function(cityKey, knightKey){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights dismiss function', cityKey, knightKey);
			return $.Deferred(function(dfd){
				var params = $.extend({}, window.g_ajaxparams),
					knightId = knightKey.replace(/knt/, '');
				params.cid = cityKey.replace(/city/, '');
				params.kid = knightId;

				var request = function( attempts ){
					$.ajax({
						url: window.g_ajaxpath + "ajax/fireKnight.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							delete window.seed.knights[cityKey][knightKey];
							return dfd.resolve();
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( request( attempts ) );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( request( attempts ) );
						} else {
							return dfd.reject();
						}
					});
				};

				return dfd.pipe( request(3) );
			}).promise();
		};

		KOCFIA.knights.boost = function(cityKey, knightKey, itemKey, type){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA knights boost function', cityKey, knightKey, itemKey, type);
			return $.Deferred(function(dfd){
				var params = $.extend({}, window.g_ajaxparams),
					knightId = knightKey.replace(/knt/, ''),
					itemId = itemKey.replace(/i/, '');
				params.cid = cityKey.replace(/city/, '');
				params.kid = knightId;
				params.iid = itemId;

				var request = function( attempts ){
					console.log('request', params, attempts);
					$.ajax({
						url: window.g_ajaxpath +'ajax/'+ (type == 'xp' ? 'experienceKnight' : 'boostKnight') +'.php'+ window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							if( type == 'stat' ){
								if( itemKey == 'i211' ) window.seed.knights[ cityKey ][ knightKey ].politicsBoostExpireUnixtime = data.expiration.toString();
								else if( itemKey == 'i221' ) window.seed.knights[ cityKey ][ knightKey ].combatBoostExpireUnixtime = data.expiration.toString();
								else if( itemKey == 'i231' ) window.seed.knights[ cityKey ][ knightKey ].intelligenceBoostExpireUnixtime = data.expiration.toString();
								else if( itemKey == 'i241' ) window.seed.knights[ cityKey ][ knightKey ].resourcefulnessBoostExpireUnixtime = data.expiration.toString();
							} else {
								window.seed.knights[ cityKey ][ knightKey ].experience = data.experience;
							}

							window.seed.items[ itemKey ] = parseInt(window.seed.items[ itemKey ], 10) - 1;
							window.ksoItems[ itemId ].subtract();
							window.cm.MixPanelTracker.track("item_use", {
								item: window.itemlist[ itemKey ].name,
								usr_gen: window.seed.player.g,
								usr_byr: window.seed.player.y,
								usr_ttl: titlenames[window.seed.player.title],
								distinct_id: window.tvuid
							});

							return dfd.resolve();
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( request( attempts ) );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( request( attempts ) );
						} else {
							return dfd.reject();
						}
					});
				};

				return dfd.pipe( request(3) );
			}).promise();
		};

	/* ESTATES */
		KOCFIA.estates = {
			options: {
				active: 1
			},
			mercenaryCost: [0, 200, 400, 1000],
			current: {}, //current defenses by cityKey and tileKey
			modifications: {} //user modifications by cityKey and tileKey
		};

		KOCFIA.estates.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.estates +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('estates', 'active', 'Activer', KOCFIA.conf.estates.active);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.estates.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-estates').html('');

			var i, cityKey, city;

			var header = '<div class="infos">';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div><h3>'+ KOCFIA.modulesLabel.estates +'</h3>';
			header += '<div class="buttonset">Afficher : ';
			header += '<input type="radio" name="kocfia-estates-city-toggles" id="kocfia-estates-all" value="all" checked>';
			header += '<label for="kocfia-estates-all">Toutes</label>';

			var code = '<table><thead><tr>';
			code += '<th>Actions</th>';
			code += '<th>Coordonnées</th>';
			code += '<th>Type</th>';
			code += '<th colspan="2">Défenses</th>';
			code += '</tr></thead>';

			for( i = 0, l = KOCFIA.citiesKey.length; i < l; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];

					header += '<input type="radio" name="kocfia-estates-city-toggles" id="kocfia-estates-'+ cityKey +'" value="'+ cityKey +'">';
					header += '<label for="kocfia-estates-'+ cityKey +'">'+ city.label +'</label>';

					code += KOCFIA.estates.byCity( cityKey );
				}
			}

			header += '</div>';
			code += '</table>';

			var help = KOCFIA.estates.getHelp();

			$section.append( header + code + help )
				.on('change', '.buttonset input', function(){
					if( this.value == 'all' ){
						KOCFIA.estates.$tbodies.show();
					} else {
						KOCFIA.estates.$tbodies.hide().filter('[data-city="'+ this.value +'"]').show();
					}
				})
				.on('click', '.update', function(){
					var $tbody = $(this).closest('tbody'),
						cityKey = $tbody.data('city'),
						$code = $( KOCFIA.estates.byCity(cityKey) );

						$tbody.html( $code.html() );
						$('.tipsy').remove();
				})
				.on('click', '.abandon', function(){
					var $this = $(this),
						tileKey = $this.attr('rel'),
						$tbody = $this.closest('tbody'),
						cityKey = $tbody.data('city');

					Shared.working();
					$.when( KOCFIA.estates.abandon( cityKey, tileKey ) )
						.done(function(){
							Shared.success( null );
							var $code = $( KOCFIA.estates.byCity( cityKey ) );
							$tbody.html( $code.html() );
							$('.tipsy').remove();
						})
						.fail(function(){
							Shared.notify('Erreur');
						});
				})
				.on('click', '.max', function(){
					var $this = $(this),
						max = parseInt($this.attr('data-max'), 10),
						$tr = $this.closest('tr'),
						tileKey = $tr.data('tile'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						$cost = $tbody.find('.cost'),
						$input = $this.siblings('input'),
						t, cost = 0;

					$input.val( Shared.readable( max ) );

					if( !KOCFIA.estates.modifications.hasOwnProperty( cityKey ) ){
						KOCFIA.estates.modifications[ cityKey ] = {};
					}

					if( !KOCFIA.estates.modifications[ cityKey ].hasOwnProperty( tileKey ) ){
						KOCFIA.estates.modifications[ cityKey ][ tileKey ] = {};
					}

					KOCFIA.estates.modifications[ cityKey ][ tileKey ].traps = max;

					for( t in KOCFIA.estates.modifications[ cityKey ] ){
						if( KOCFIA.estates.modifications[ cityKey ].hasOwnProperty(t) ){
							if( KOCFIA.estates.modifications[ cityKey ][ t ].hasOwnProperty('traps') ){
								cost += KOCFIA.estates.modifications[ cityKey ][ t ]['traps'] * 200;
							}
							if( KOCFIA.estates.modifications[ cityKey ][ t ].hasOwnProperty('mercenary') ){
								cost += KOCFIA.estates.mercenaryCost[ KOCFIA.estates.modifications[ cityKey ][ t ]['mercenaries'] ];
							}
						}
					}

					$cost.html( Shared.format( cost ) )
						.attr('title', Shared.readable( cost ))
						.removeAttr('original-title');
				})
				.on('keyup', '.traps', function(){
					var $this = $(this),
						$max = $this.siblings('.button'),
						max = parseInt($max.attr('data-max'), 10),
						$tr = $this.closest('tr'),
						tileKey = $tr.data('tile'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						$cost = $tbody.find('.cost'),
						value, cost = 0, t;

					value = (this.checkValidity() ? Shared.decode( this.value ) || 0 : 0);
					if( value > max ){
						value = max;
						$this.val( Shared.format( max ) );
					}

					if( !KOCFIA.estates.modifications.hasOwnProperty( cityKey ) ){
						KOCFIA.estates.modifications[ cityKey ] = {};
					}

					if( !KOCFIA.estates.modifications[ cityKey ].hasOwnProperty( tileKey ) ){
						KOCFIA.estates.modifications[ cityKey ][ tileKey ] = {};
					}

					KOCFIA.estates.modifications[ cityKey ][ tileKey ].traps = value;

					for( t in KOCFIA.estates.modifications[ cityKey ] ){
						if( KOCFIA.estates.modifications[ cityKey ].hasOwnProperty(t) ){
							if( KOCFIA.estates.modifications[ cityKey ][ t ].hasOwnProperty('traps') ){
								cost += KOCFIA.estates.modifications[ cityKey ][ t ]['traps'] * 200;
							}
							if( KOCFIA.estates.modifications[ cityKey ][ t ].hasOwnProperty('mercenary') ){
								cost += KOCFIA.estates.mercenaryCost[ KOCFIA.estates.modifications[ cityKey ][ t ]['mercenaries'] ];
							}
						}
					}

					$cost.html( Shared.format( cost ) )
						.attr('title', Shared.readable( cost ))
						.removeAttr('original-title');
				})
				.on('change', '.mercenaries', function(){
					var $this = $(this),
						index = parseInt($this.val(), 10),
						$tr = $this.closest('tr'),
						tileKey = $tr.data('tile'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						$cost = $tbody.find('.cost'),
						cost = 0, t;

					if( !KOCFIA.estates.modifications.hasOwnProperty( cityKey ) ){
						KOCFIA.estates.modifications[ cityKey ] = {};
					}

					if( !KOCFIA.estates.modifications[ cityKey ].hasOwnProperty( tileKey ) ){
						KOCFIA.estates.modifications[ cityKey ][ tileKey ] = {};
					}

					KOCFIA.estates.modifications[ cityKey ][ tileKey ].mercenaries = index;

					for( t in KOCFIA.estates.modifications[ cityKey ] ){
						if( KOCFIA.estates.modifications[ cityKey ].hasOwnProperty(t) ){
							if( KOCFIA.estates.modifications[ cityKey ][ t ].hasOwnProperty('traps') ){
								cost += KOCFIA.estates.modifications[ cityKey ][ t ]['traps'] * 200;
							}
							if( KOCFIA.estates.modifications[ cityKey ][ t ].hasOwnProperty('mercenaries') ){
								cost += KOCFIA.estates.mercenaryCost[ KOCFIA.estates.modifications[ cityKey ][ t ]['mercenaries'] ];
							}
						}
					}

					$cost.html( Shared.format( cost ) )
						.attr('title', Shared.readable( cost ))
						.removeAttr('original-title');
				})
				.on('click', '.defend', function(){
					var $this = $(this),
						$tbody = $this.closest('tbody'),
						cityKey = $tbody.data('city');

					Shared.working();
					$.when( KOCFIA.estates.defend( cityKey ) )
						.done(function(){
							Shared.success( null );
						})
						.fail(function(){
							Shared.notify('Erreur');
						})
						.always(function(){
							var $code = $( KOCFIA.estates.byCity( cityKey ) );
							$tbody.html( $code.html() );
							$('.tipsy').remove();
						});
				});

			KOCFIA.estates.$tbodies = $('#kocfia-estates').find('tbody');
		};

		KOCFIA.estates.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates on function');
		};

		KOCFIA.estates.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates off function');
		};

		KOCFIA.estates.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA estates getHelp function');
			var help = '<div id="kocfia-estates-help" class="help" title="Aide gestion des '+ KOCFIA.modulesLabel.estates +'">';
			help += '<h4>Ajouter des défenses à une terre sauvage conquise</h4><ul>';
			help += '<li>Les terres conquises ne sont pas mises à jour automatiquement lors d\'une conquête ou toute autre action externe à l\'onglet</li>';
			help += '<li>Un bouton "Raffraîchir" permet de mettre à jour la liste d\'une ville</li>';
			help += '<li>Les mercenaires sont payés à l\'heure</li>';
			help += '<li>Le coût est de 200 pour des novices, 400 pour des intermédiaires et 1000 pour des vétérans</li>';
			help += '<li>Le coût de chaque piège est de 200</li>';
			help += '<li>Chaque terre peut contenir 100 pièges par niveau</li>';
			help += '<li>Cliquer sur le bouton appliquer pour construire les pièges et engager les mercenaires configurés</li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.estates.update = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates update function');
			var cityKey, i, l;

			for( i = 0, l = KOCFIA.citiesKey.length; i < l; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];

				KOCFIA.estates.$tbodies.filter('[data-city="'+ cityKey +'"]')[0].innerHTML = KOCFIA.estates.byCity( cityKey );
			}
		};

		KOCFIA.estates.byCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates byCity function');
			var code = '<tbody data-city="'+ cityKey +'">',
				estates = window.seed.wilderness[ cityKey ],
				e, estate, maxTraps, ownedTraps, mercenaryIndex, hasMaxTraps,
				types = KOCFIA.tilesTypes,
				nb = 0, max = window.seed.buildings[ cityKey ]['pos0'][1];

			if( max == 11 ) max = 12;
			else if( max == 12 ) max = 14;

			for( e in estates ){
				if( estates.hasOwnProperty(e) ) nb += 1;
			}

			code += '<tr>';
			code += '<th><button class="button secondary update" title="Met à jour les informations sur les terres sauvages conquises de cette ville"><span>Raffraîchir</span></button></th>';
			code += '<th>'+ KOCFIA.cities[ cityKey ].label +'</th>';
			code += '<th>'+ nb +'/'+ max +'</th>';
			code += '<th colspan="2">Coût <img src="'+ KOCFIA.resourceInfo.gold.icon +'" title="'+ KOCFIA.resourceInfo.gold.label +'">: ';
			code += '<span class="cost" title="0">0</span> / <span title="'+ Shared.readable( window.seed.citystats[ cityKey ].gold[0] ) +'">';
			code += Shared.format( window.seed.citystats[ cityKey ].gold[0] ) + '</span>';
			code += '<button class="button modify defend" title="Construit les pièges et engages des mercenaires paramétrés pour les terres sauvages conquises de cette ville"><span>Appliquer</span></button></th>';
			code += '</tr>';

			if( KOCFIA.estates.modifications.hasOwnProperty(cityKey) ) delete KOCFIA.estates.modifications[ cityKey ];
			if( !KOCFIA.estates.current.hasOwnProperty(cityKey) ) KOCFIA.estates.current[ cityKey ] = {};

			for( e in estates ){
				if( estates.hasOwnProperty(e) ){
					estate = estates[e];

					maxTraps = parseInt(estate.tileLevel, 10) * 100;
					if( window.seed.wildDef.hasOwnProperty(e) ){
						ownedTraps = parseInt(window.seed.wildDef[ e ].fort60Count, 10) || 0;
						mercenaryIndex = parseInt(window.seed.wildDef[ e ].mercLevel, 10) || 0;
					} else {
						ownedTraps = 0;
						mercenaryIndex = 0;
					}
					if( mercenaryIndex == 90 ) mercenaryIndex = 0;
					hasMaxTraps = (ownedTraps == maxTraps);

					KOCFIA.estates.current[ cityKey ][ e ] = {traps: ownedTraps, mercenaries: mercenaryIndex};

					code += '<tr data-tile="'+ e +'">';
					code += '<td><button class="button danger abandon" rel="t'+ estate.tileId +'"><span>Abandonne</span></button></td>';
					code += '<td>'+ Shared.mapLink( estate.xCoord +','+ estate.yCoord ) +'</td>';
					code += '<td>'+ types[ estate.tileType ] +' '+ estate.tileLevel +'</td>';
					code += '<td>';
					code += '<label for="kocfia-estates-'+ cityKey +'-'+ e +'-traps">Pièges :</label>';
					code += '<input type="text" id="kocfia-estates-'+ cityKey +'-'+ e +'-traps" class="traps" value="'+ Shared.format( ownedTraps ) +'" pattern="'+ Shared.numberRegExp +'" '+ (hasMaxTraps ? 'readonly disabled' : '') +'>';
					if( !hasMaxTraps ) code += '<button class="button secondary max" data-max="'+ maxTraps +'"><span>Maximum</span></button>';
					code += '</td><td>';
					code += '<label for="kocfia-estates-'+ cityKey +'-'+ e +'-mercenaries">Mercenaires :</label>';
					code += '<select class="mercenaries" id="kocfia-estates-'+ cityKey +'-'+ e +'-mercenaries">';
					code += '<option value="0" '+ (mercenaryIndex === 0 ? 'selected' : '') +'>Aucun</option>';
					code += '<option value="1" '+ (mercenaryIndex === 1 ? 'selected' : '') +'>Novices</option>';
					code += '<option value="2" '+ (mercenaryIndex === 2 ? 'selected' : '') +'>Intermédiaires</option>';
					code += '<option value="3" '+ (mercenaryIndex === 3 ? 'selected' : '') +'>Vétérans</option>';
					code += '</select></td>';
					code += '</tr>';
				}
			}

			code += '</tbody>';

			return code;
		};

		KOCFIA.estates.abandon = function( cityKey, tileKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates abandon function');
			return $.Deferred(function(dfd){
				var params = $.extend({}, window.g_ajaxparams),
					estate = window.seed.wilderness[ cityKey ][ tileKey ];
				params.cid = cityKey.replace(/city/, '');
				params.tid = estate.tileId;
				params.x = estate.xCoord;
				params.y = estate.yCoord;
				//var cityKey = cityKey;

				var abandon = function( attempts ){
					$.ajax({
						url: window.g_ajaxpath + "ajax/abandonWilderness.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							delete window.seed.wilderness[ cityKey ][ tileKey ];
							if( $.isEmptyObject(window.seed.wilderness[ cityKey ]) ){
								window.seed.wilderness[ cityKey ] = [];
							}

							if( data.returningMarches && !Array.isArray( data.returningMarches ) ){
								var c, march, marchKey, marchTime, timestamp = Date.timestamp();
								for( c in data.returningMarches ){
									if( data.returningMarches.hasOwnProperty(c) ){
										for( j = 0; j < data.returningMarches[ c ].length; j += 1 ){
											marchKey = 'm'+ data.returningMarches[ c ][ j ];
											march = window.seed.queue_atkp[ c ][ marchKey ];
											if( march ){
												marchTime = Math.abs(parseInt(march.destinationUnixTime, 10) - parseInt(march.marchUnixTime, 10));
												window.seed.queue_atkp[ c ][ marchKey ].destinationUnixTime = timetstamp;
												window.seed.queue_atkp[ c ][ marchKey ].marchUnixTime = timetstamp - marchTime;
												window.seed.queue_atkp[ c ][ marchKey ].returnUnixTime = timetstamp + marchTime;
												window.seed.queue_atkp[ c ][ marchKey ].marchStatus = 8;
											}
										}
									}
								}
							}

							if( data.updateSeed ){
								window.update_seed( data.updateSeed );
							}

							return dfd.resolve();
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( abandon( attempts ) );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( abandon( attempts ) );
						} else {
							return dfd.reject();
						}
					});
				};

				return dfd.pipe( abandon(3) );
			}).promise();
		};

		KOCFIA.estates.defend = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('estates') ) console.info('KOCFIA estates defend function');
			return $.Deferred(function(dfd){
				var params = $.extend({}, window.g_ajaxparams);
				params.cid = cityKey.replace(/city/, '');

				if( !KOCFIA.estates.modifications.hasOwnProperty( cityKey ) || $.isEmptyObject(KOCFIA.estates.modifications[ cityKey ]) ){
					Shared.notify('Aucune modification trouvée');
					return dfd.reject();
				}

				var modificationsIndex = 0,
					modifiedTiles = Object.keys(KOCFIA.estates.modifications[ cityKey ]),
					length = modifiedTiles.length,
					tileKey, modification;

				var loop = function(){
					if( modificationsIndex > length ){
						return dfd.resolve();
					}

					if( !KOCFIA.estates.modifications[ cityKey ].hasOwnProperty( modifiedTiles[ modificationsIndex ] ) ){
						modificationsIndex += 1;
						return dfd.pipe( loop() );
					}

					tileKey = modifiedTiles[ modificationsIndex ];

					modification = KOCFIA.estates.modifications[ cityKey ][ tileKey ];

					params.tid = parseInt(tileKey.replace(/t/, ''), 10);

					return dfd.pipe( traps(3) );
				};

				var traps = function( attempts ){
					if( !modification.hasOwnProperty('traps') ){
						return dfd.pipe( mercenaries(3) );
					}

					tParams = $.extend({}, params);
					tParams.quant = modification.traps;

					$.ajax({
						url: window.g_ajaxpath + "ajax/buyWildTraps.php" + window.g_ajaxsuffix,
						type: 'post',
						data: tParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							if( !window.seed.wildDef.hasOwnProperty(tileKey) ) window.seed.wildDef[ tileKey ] = {};
							window.seed.wildDef[ tileKey ].fort60Count = (window.seed.wildDef.hasOwnProperty(tileKey) ? parseInt(window.seed.wildDef[ tileKey ].fort60Count, 10) || 0 : 0) + parseInt(modification.traps, 10);
							delete KOCFIA.estates.modifications[ cityKey ][ tileKey ].traps;

							if( data.updateSeed ){
								window.update_seed( data.updateSeed );
							}

							return dfd.pipe( mercenaries(3) );
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( traps( attempts ) );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( traps( attempts ) );
						} else {
							return dfd.reject();
						}
					});
				};

				var mercenaries = function( attempts ){
					if( !modification.hasOwnProperty('mercenaries') ){
						modificationsIndex += 1;
						return dfd.pipe( loop() );
					}

					mParams = $.extend({}, params);
					mParams.lv = modification.mercenaries;
					mParams.olv = KOCFIA.estates.current[ cityKey ][ tileKey ].mercenaries;

					$.ajax({
						url: window.g_ajaxpath + "ajax/hireWildMerc.php" + window.g_ajaxsuffix,
						type: 'post',
						data: mParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							window.seed.wildDef[ tileKey ].mercLevel = modification.mercenaries;
							delete KOCFIA.estates.modifications[ cityKey ][ tileKey ].mercenaries;

							if( data.updateSeed ){
								window.update_seed( data.updateSeed );
							}

							modificationsIndex += 1;
							return dfd.pipe( loop() );
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( traps( attempts ) );
							} else {
								return dfd.reject();
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( traps( attempts ) );
						} else {
							return dfd.reject();
						}
					});
				};

				return dfd.pipe( loop() );
			}).promise();
		};

	/* DATA AND STATS */
		KOCFIA.dataAndStats = {
			options: {
				active: 1
			},
			stats: {}, //by cityKey
			sums: {},
			calculator: {
				population: 38000,
				barrack: 9,
				nbBarracks: 14,
				sumLvlBarracks: 14 * 9,
				workshop: 9,
				stable: 9,
				blacksmith: 9,
				combat: 255,
				geometry: 9,
				trainingSpeed: 0
			},
			stored: ['calculator']
		};

		KOCFIA.dataAndStats.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.dataAndStats +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('dataAndStats', 'active', 'Activer', KOCFIA.conf.dataAndStats.active);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.dataAndStats.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats on function');
		};

		KOCFIA.dataAndStats.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats off function');
		};

		KOCFIA.dataAndStats.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-dataAndStats').html('').off('click');

			var header = '<div class="infos">';
			header += '<button class="button secondary refresh"><span>Raffraîchir</span></button>';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div><h3>'+ KOCFIA.modulesLabel.dataAndStats +'</h3>';

			var data = '<table class="costsAndAbilities"><thead><tr>';
			data += '<th rowspan="2">&nbsp;</th>';
			data += '<th colspan="7">Coûts</th>';
			data += '<th colspan="6">Compétences (*)</th>';
			data += '</tr><tr>';
			data += '<th title="'+ KOCFIA.resourceInfo.rec0.label +'"><img src="'+ KOCFIA.resourceInfo.rec0.icon +'"></th>';
			data += '<th title="'+ KOCFIA.resourceInfo.rec1.label +'"><img src="'+ KOCFIA.resourceInfo.rec1.icon +'"></th>';
			data += '<th title="'+ KOCFIA.resourceInfo.rec2.label +'"><img src="'+ KOCFIA.resourceInfo.rec2.icon +'"></th>';
			data += '<th title="'+ KOCFIA.resourceInfo.rec3.label +'"><img src="'+ KOCFIA.resourceInfo.rec3.icon +'"></th>';
			data += '<th title="'+ KOCFIA.resourceInfo.rec4.label +'"><img src="'+ KOCFIA.resourceInfo.rec4.icon +'"></th>';
			data += '<th title="'+ KOCFIA.population[0].label[0] +'"><img src="'+ KOCFIA.population[0].icon +'"></th>';
			data += '<th>Durée</th>';
			data += '<th>Vie</th>';
			data += '<th>Attaque</th>';
			data += '<th>Défense</th>';
			data += '<th>Vitesse</th>';
			data += '<th>Portée</th>';
			data += '<th>Charge</th>';
			data += '</tr></thead><tbody>';

			var i, unitKey, fortKey, unit, u,
				fortmight = {
					frt53: "4",
					frt55: "7",
					frt60: "1",
					frt61: "2",
					frt62: "3"
				};
			for( i = 0; i < KOCFIA.troops.length; i += 1 ){
				unit = KOCFIA.troops[i];
				unitKey = unit.name;

				data += '<tr data-unit="'+ unitKey +'">';
				data += '<th title="'+ unit.label +'"><img src="'+ unit.icon +'"></th>';
				data += '<td>'+ Shared.readable(window.unitcost[ unitKey ][5]) +'</td>';
				data += '<td>'+ Shared.readable(window.unitcost[ unitKey ][1]) +'</td>';
				data += '<td>'+ Shared.readable(window.unitcost[ unitKey ][2]) +'</td>';
				data += '<td>'+ Shared.readable(window.unitcost[ unitKey ][3]) +'</td>';
				data += '<td>'+ Shared.readable(window.unitcost[ unitKey ][4]) +'</td>';
				data += '<td>'+ Shared.readable(window.unitcost[ unitKey ][6]) +'</td>';
				data += '<td>'+ window.unitcost[ unitKey ][7] / 1000 +'s</td>';
				data += '<td class="stat"></td>';
				data += '<td class="stat"></td>';
				data += '<td class="stat"></td>';
				data += '<td class="stat"></td>';
				data += '<td class="stat"></td>';
				data += '<td class="stat"></td>';
				data += '</tr>';
			}

			for( i = 0; i < KOCFIA.defenses.length; i += 1 ){
				unit = KOCFIA.defenses[i];
				fortKey = unit.frt;
				unitKey = fortKey.replace(/frt/, 'unt');

				data += '<tr>';
				data += '<th title="'+ unit.label +'"><img src="'+ unit.icon +'"></th>';
				data += '<td>'+ Shared.readable( window.fortcost[ fortKey ][5])  +'</td>';
				data += '<td>'+ Shared.readable( window.fortcost[ fortKey ][1] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortcost[ fortKey ][2] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortcost[ fortKey ][3] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortcost[ fortKey ][4] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortcost[ fortKey ][6] ) +'</td>';
				data += '<td>'+ Shared.readableDuration( window.fortcost[ fortKey ][7] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortstats[ unitKey ][0] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortstats[ unitKey ][1] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortstats[ unitKey ][2] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortstats[ unitKey ][3] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortstats[ unitKey ][4] ) +'</td>';
				data += '<td>'+ Shared.readable( window.fortstats[ unitKey ][5] ) +'</td>';
				data += '</tr>';
			}
			data += '</tbody></table>';
			data += '<small>* <u>Estimations</u> avec bonus de trône et technologies, ne prend pas en compte les bonus de gardien, ni les bonus de sorts, ni le bonus du chevalier.</small>';

			data += '<table class="might"><thead><tr><th colspan="5">Entretien et Puissance</th>';
			data += '</tr><tr>';
			data += '<th>&nbsp;</th>';
			data += '<th title="'+ KOCFIA.resourceInfo.rec0.label +'"><img src="'+ KOCFIA.resourceInfo.rec0.icon +'"></th>';
			data += '<th>Puissance</th>';
			data += '<th title="Temps pour former en secondes">Durée</th>';
			data += '<th>Puissance / h</th>';
			data += '</tr><thead><tbody>';
			for( i = 0; i < KOCFIA.troops.length; i += 1 ){
				unit = KOCFIA.troops[i];
				unitKey = unit.name;
				u = unitKey.replace(/unt/, '');

				data += '<tr>';
				data += '<th title="'+ unit.label +'"><img src="'+ unit.icon +'"></th>';
				data += '<td>'+ window.unitupkeeps[ u ] +'</td>';
				data += '<td>'+ window.unitmight[ unitKey ] +'</td>';
				data += '<td class="stat">'+ window.unitcost[ unitKey ][7] / 1000 +'s</td>';
				data += '<td class="stat">'+ Shared.readable(3600 / window.unitcost[ unitKey ][7] * window.unitmight[ unitKey ]) +'</td>';
				data += '</tr>';
			}
			data += '</tbody></table>';

			var stats = '<table class="stats"><thead>';
			stats += '<tr><th>&nbsp;</th>';
			var cels = '<td></td>';
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				if( KOCFIA.cities.hasOwnProperty(KOCFIA.citiesKey[ i ]) ){
					stats += '<th>'+ KOCFIA.cities[ KOCFIA.citiesKey[ i ] ].label + '</th>';
					cels += '<td></td>';
				}
			}
			stats += '<th>Calculateur</th>';
			cels += '<td class="sum"></td>';
			stats += '<th>Total (*)</th></tr></thead><tbody>';
			stats += '<tr><th>Population</th>'+ cels +'</tr>';
			stats += '<tr><th>Maison</th>'+ cels +'</tr>';
			stats += '<tr><th>Caserne</th>'+ cels +'</tr>';
			stats += '<tr><th title="Somme du niveau des casernes">Total</th>'+ cels +'</tr>';
			stats += '<tr><th>Contremaître</th>'+ cels +'</tr>';
			stats += '<tr><th>Maréchal</th>'+ cels +'</tr>';
			stats += '<tr><th>Écurie</th>'+ cels +'</tr>';
			stats += '<tr><th>Atelier</th>'+ cels +'</tr>';
			stats += '<tr><th>Forgeron</th>'+ cels +'</tr>';
			stats += '</tbody><thead><th colspan="'+ (KOCFIA.citiesKey.length + 3) +'">Entraînable par heure et différence</th></thead><tbody>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt1.label +'"><img src="'+ KOCFIA.unitInfo.unt1.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt2.label +'"><img src="'+ KOCFIA.unitInfo.unt2.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt3.label +'"><img src="'+ KOCFIA.unitInfo.unt3.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt4.label +'"><img src="'+ KOCFIA.unitInfo.unt4.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt5.label +'"><img src="'+ KOCFIA.unitInfo.unt5.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt6.label +'"><img src="'+ KOCFIA.unitInfo.unt6.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt7.label +'"><img src="'+ KOCFIA.unitInfo.unt7.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt8.label +'"><img src="'+ KOCFIA.unitInfo.unt8.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt9.label +'"><img src="'+ KOCFIA.unitInfo.unt9.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt10.label +'"><img src="'+ KOCFIA.unitInfo.unt10.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt11.label +'"><img src="'+ KOCFIA.unitInfo.unt11.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.unitInfo.unt12.label +'"><img src="'+ KOCFIA.unitInfo.unt12.icon +'"></th>'+ cels +'</tr>';
			stats += '</tbody><thead><th colspan="'+ (KOCFIA.citiesKey.length + 3) +'">Construisible par heure</th></thead><tbody>';
			stats += '<tr><th title="'+ KOCFIA.fortInfo.frt53.label +'"><img src="'+ KOCFIA.fortInfo.frt53.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.fortInfo.frt55.label +'"><img src="'+ KOCFIA.fortInfo.frt55.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.fortInfo.frt60.label +'"><img src="'+ KOCFIA.fortInfo.frt60.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.fortInfo.frt61.label +'"><img src="'+ KOCFIA.fortInfo.frt61.icon +'"></th>'+ cels +'</tr>';
			stats += '<tr><th title="'+ KOCFIA.fortInfo.frt62.label +'"><img src="'+ KOCFIA.fortInfo.frt62.icon +'"></th>'+ cels +'</tr>';
			stats += '</tbody></table>';
			stats += '<small>* Ne tiens pas compte de la colonne du calculateur.</small>';

			//unit training and delta calculator
			stats += '<fieldset class="calculator">';
			stats += '<legend><span class="ui-icon ui-icon-triangle-1-e toggle"></span>Calculateur</legend>';
			//population, nbBarracks, sumLvlBarracks, workshop, stable, blacksmith, combat, geometry, training speed
			stats += '<dl>';
			stats += '<dt><label for="calculator-population">Population :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-population" name="population" value="'+ KOCFIA.dataAndStats.calculator.population +'"></dd>';
			stats += '<dt><label for="calculator-barrack">Niveau de la caserne :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-barracks" name="barrack" value="'+ KOCFIA.dataAndStats.calculator.barrack +'"></dd>';
			stats += '<dt><label for="calculator-nbBarracks">Nombre de casernes :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-nbBarracks" name="nbBarracks" value="'+ KOCFIA.dataAndStats.calculator.nbBarracks +'"></dd>';
			stats += '<dt><label for="calculator-sumLvlBarracks">Somme du niveau des casernes :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-sumLvlBarracks" name="sumLvlBarracks" value="'+ KOCFIA.dataAndStats.calculator.sumLvlBarracks +'"></dd>';
			stats += '<dt><label for="calculator-workshop">Niveau de l\'atelier :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-workshop" name="workshop" value="'+ KOCFIA.dataAndStats.calculator.workshop +'"></dd>';
			stats += '<dt><label for="calculator-stable">Niveau de l\'écurie :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-stable" name="stable" value="'+ KOCFIA.dataAndStats.calculator.stable +'"></dd>';
			stats += '<dt><label for="calculator-blacksmith">Niveau de la forge :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-blacksmith" name="blacksmith" value="'+ KOCFIA.dataAndStats.calculator.blacksmith +'"></dd>';
			stats += '<dt><label for="calculator-combat">Score de combat du maréchal :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-combat" name="combat" value="'+ KOCFIA.dataAndStats.calculator.combat +'"></dd>';
			stats += '<dt><label for="calculator-geometry">'+ window.techcost.tch5[0] +'</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-geometry" name="geometry" value="'+ KOCFIA.dataAndStats.calculator.geometry +'"></dd>';
			stats += '<dt><label for="calculator-trainingSpeed">Training Speed :</label></dt>';
			stats += '<dd><input type="number" min="0" id="calculator-trainingSpeed" name="trainingSpeed" value="'+ KOCFIA.dataAndStats.calculator.trainingSpeed +'"> %</dd>';
			stats += '<dt></dt><dd><button class="button secondary calc"><span>Appliquer</span></button></dd>';
			stats += '</dl></fieldset>';

			$section.append( header + data + stats + KOCFIA.dataAndStats.getHelp() )
				.on('click', '.refresh', function(){
					KOCFIA.dataAndStats.compute();
					KOCFIA.dataAndStats.update();
				})
				.on('click', '.update', function(){
					KOCFIA.dataAndStats.modPanel(); //reset the whole panel
				})
				.on('click', 'legend', function(){
					$(this)
						.find('.ui-icon').toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-se').end()
						.closest('.calculator').find('dl').stop(true, true).slideToggle();
				})
				.on('click', '.calc', function(){
					$(this).closest('.calculator').find('input').each(function(){
						if( this.checkValidity() ){
							var v = parseInt(this.value, 10);
							if( isNaN(v) ) v = 0;
							KOCFIA.dataAndStats.calculator[ this.name ] = v;
						} else {
							KOCFIA.dataAndStats.calculator[ this.name ] = 0;
						}
					});

					KOCFIA.dataAndStats.storeCalculator();

					KOCFIA.dataAndStats.compute();
					KOCFIA.dataAndStats.update();
				});

			KOCFIA.dataAndStats.$abilitiesTrs = $section.find('.costsAndAbilities').find('tbody').find('tr');

			KOCFIA.dataAndStats.$tds = $section.find('.stats').find('tbody').find('td').filter(':not(.sum)');
			KOCFIA.dataAndStats.$sums = $section.find('.stats').find('tbody').find('.sum');

			KOCFIA.dataAndStats.update();
		};

		KOCFIA.dataAndStats.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats getHelp function');
			var help = '<div id="kocfia-dataAndStats-help" class="help" title="Aide Infos & Stats">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '<li></li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.dataAndStats.update = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats update function');

			//thone bonuses
			var throneBonus = KOCFIA.throne.getSetBonus( window.seed.throne.activeSlot ),
				i, unit, unitKey, $unitStatsTds, stats,
				lifeBase, attackBase, defenseBase, speedBase, rangeBase, loadBase,
				life, attack, defense, speed, range, load,
				lifePct, attackPct, defensePct, speedPct, rangePct, loadPct;

			for( i = 0; i < KOCFIA.troops.length; i += 1 ){
				unit = KOCFIA.troops[i];
				unitKey = unit.name;

				lifePct = 0;
				attackPct = 0;
				defensePct = 0;
				speedPct = 0;
				rangePct = 0;
				loadPct = 0;
				durationPct = 0;

				stats = window.unitstats[ unitKey ];

				if( throneBonus[1] ) attackPct  += throneBonus[1].percent; //attack
				if( throneBonus[2] ) defensePct += throneBonus[2].percent; //defense
				if( throneBonus[3] ) lifePct    += throneBonus[3].percent; //life
				if( throneBonus[4] ) speedPct   += throneBonus[4].percent; //speed
				if( throneBonus[5] ) rangePct   += throneBonus[5].percent; //range
				if( throneBonus[6] ) loadPct    += throneBonus[6].percent; //load

				//getting unit type specific bonus
				if( window.cm.unitFrontendType[ unitKey ] == 'infantry' ){
					if( throneBonus[24] ) attackPct  += throneBonus[24].percent; //infantry attack
					if( throneBonus[25] ) defensePct += throneBonus[25].percent; //infantry defense
					if( throneBonus[26] ) lifePct    += throneBonus[26].percent; //infantry life
					if( throneBonus[27] ) speedPct   += throneBonus[27].percent; //infantry speed
				} else if( window.cm.unitFrontendType[ unitKey ] == 'ranged' ){
					if( throneBonus[34] ) attackPct  += throneBonus[34].percent; //ranged attack
					if( throneBonus[35] ) defensePct += throneBonus[35].percent; //ranged defense
					if( throneBonus[36] ) lifePct    += throneBonus[36].percent; //ranged life
					if( throneBonus[37] ) rangePct   += throneBonus[37].percent; //ranged range
				} else if( window.cm.unitFrontendType[ unitKey ] == 'horsed' ){
					if( throneBonus[44] ) attackPct  += throneBonus[44].percent; //horsed attack
					if( throneBonus[45] ) defensePct += throneBonus[45].percent; //horsed defense
					if( throneBonus[46] ) lifePct    += throneBonus[46].percent; //horsed life
					if( throneBonus[47] ) speedPct   += throneBonus[47].percent; //horsed speed
					if( throneBonus[48] ) loadPct    += throneBonus[48].percent; //horsed load
				} else if( window.cm.unitFrontendType[ unitKey ] == 'siege' ){
					if( throneBonus[56] ) attackPct  += throneBonus[56].percent; //siege attack
					if( throneBonus[57] ) speedPct   += throneBonus[57].percent; //siege speed
					if( throneBonus[58] ) rangePct   += throneBonus[58].percent; //siege range
					if( throneBonus[59] ) loadPct    += throneBonus[59].percent; //siege load
				}

				lifeBase = parseInt(stats[0], 10);
				life = lifeBase + lifeBase * (parseInt(window.seed.tech.tch15, 10) * 5) / 100 + lifeBase * lifePct / 100;

				attackBase = parseInt(stats[1], 10);
				attack = attackBase + attackBase * (parseInt(window.seed.tech.tch8, 10) * 5) / 100 + attackBase * (parseInt(window.seed.tech.tch15, 10) * 5 / 100) + attackBase * attackPct / 100;

				defenseBase = parseInt(stats[2], 10);
				defense = defenseBase + defenseBase * (parseInt(window.seed.tech.tch9, 10) * 5) / 100 + defenseBase * defensePct / 100;

				speedBase = parseInt(stats[3], 10);
				speed = speedBase + speedBase * speedPct / 100;

				rangeBase = parseInt(stats[4], 10);
				range = rangeBase + rangeBase * (parseInt(window.seed.tech.tch13, 10) * 10) / 100 + rangeBase * rangePct / 100;

				loadBase = parseInt(stats[5], 10);
				load = loadBase + loadBase * (parseInt(window.seed.tech.tch10, 10) * 10) / 100 + loadBase * loadPct / 100;

				$unitStatsTds = KOCFIA.dataAndStats.$abilitiesTrs.filter('[data-unit="'+ unitKey +'"]').find('.stat');
				$unitStatsTds.eq(0).html( Shared.readable(lifeBase) +'<br>'+ Shared.readable(life) );
				$unitStatsTds.eq(1).html( Shared.readable(attackBase) +'<br>'+ Shared.readable(attack) );
				$unitStatsTds.eq(2).html( Shared.readable(defenseBase) +'<br>'+ Shared.readable(defense) );
				$unitStatsTds.eq(3).html( Shared.readable(speedBase) +'<br>'+ Shared.readable(speed) );
				$unitStatsTds.eq(4).html( Shared.readable(rangeBase) +'<br>'+ Shared.readable(range) );
				$unitStatsTds.eq(5).html( Shared.readable(loadBase) +'<br>'+ Shared.readable(load) );
			}

			//cities and troops data
			KOCFIA.dataAndStats.compute();

			var cityKey, stat, length,
				cities = KOCFIA.citiesKey.slice(); //copy

			cities.push('calculator');
			length = cities.length;
			for( i = 0; i < length; i += 1 ){
				cityKey = cities[ i ];
				if( cityKey == 'calculator' || KOCFIA.cities.hasOwnProperty(cityKey) ){
					stat = KOCFIA.dataAndStats.stats[ cityKey ];

					KOCFIA.dataAndStats.$tds.eq(i + length * 0).html( stat.population );
					KOCFIA.dataAndStats.$tds.eq(i + length * 1).html( stat.nbHouses );
					KOCFIA.dataAndStats.$tds.eq(i + length * 2).html( stat.nbBarracks );
					KOCFIA.dataAndStats.$tds.eq(i + length * 3).html( stat.sumLvlBarracks );
					KOCFIA.dataAndStats.$tds.eq(i + length * 4).html( stat.politic );
					KOCFIA.dataAndStats.$tds.eq(i + length * 5).html( stat.combat );
					KOCFIA.dataAndStats.$tds.eq(i + length * 6).html( stat.stable );
					KOCFIA.dataAndStats.$tds.eq(i + length * 7).html( stat.workshop );
					KOCFIA.dataAndStats.$tds.eq(i + length * 8).html( stat.blacksmith );
					KOCFIA.dataAndStats.$tds.eq(i + length * 9).html( Shared.readable(stat.unit1PerHour) +'<br>'+ Shared.readable(stat.unit1Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 10).html( Shared.readable(stat.unit2PerHour) +'<br>'+ Shared.readable(stat.unit2Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 11).html( Shared.readable(stat.unit3PerHour) +'<br>'+ Shared.readable(stat.unit3Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 12).html( Shared.readable(stat.unit4PerHour) +'<br>'+ Shared.readable(stat.unit4Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 13).html( Shared.readable(stat.unit5PerHour) +'<br>'+ Shared.readable(stat.unit5Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 14).html( Shared.readable(stat.unit6PerHour) +'<br>'+ Shared.readable(stat.unit6Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 15).html( Shared.readable(stat.unit7PerHour) +'<br>'+ Shared.readable(stat.unit7Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 16).html( Shared.readable(stat.unit8PerHour) +'<br>'+ Shared.readable(stat.unit8Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 17).html( Shared.readable(stat.unit9PerHour) +'<br>'+ Shared.readable(stat.unit9Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 18).html( Shared.readable(stat.unit10PerHour) +'<br>'+ Shared.readable(stat.unit10Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 19).html( Shared.readable(stat.unit11PerHour) +'<br>'+ Shared.readable(stat.unit11Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 20).html( Shared.readable(stat.unit12PerHour) +'<br>'+ Shared.readable(stat.unit12Delta) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 21).html( Shared.readable(stat.fort53PerHour) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 22).html( Shared.readable(stat.fort55PerHour) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 23).html( Shared.readable(stat.fort60PerHour) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 24).html( Shared.readable(stat.fort61PerHour) );
					KOCFIA.dataAndStats.$tds.eq(i + length * 25).html( Shared.readable(stat.fort62PerHour) );
				}
			}

			KOCFIA.dataAndStats.$sums.eq(0).html( Shared.readable(KOCFIA.dataAndStats.sums.population) );
			KOCFIA.dataAndStats.$sums.eq(1).html( Shared.readable(KOCFIA.dataAndStats.sums.nbHouses) );
			KOCFIA.dataAndStats.$sums.eq(2).html( Shared.readable(KOCFIA.dataAndStats.sums.nbBarracks) );
			KOCFIA.dataAndStats.$sums.eq(3).html( Shared.readable(KOCFIA.dataAndStats.sums.sumLvlBarracks) );
			KOCFIA.dataAndStats.$sums.eq(4).html( Shared.readable(KOCFIA.dataAndStats.sums.politic) );
			KOCFIA.dataAndStats.$sums.eq(5).html( Shared.readable(KOCFIA.dataAndStats.sums.combat) );
			KOCFIA.dataAndStats.$sums.eq(6).html( Shared.readable(KOCFIA.dataAndStats.sums.stable) );
			KOCFIA.dataAndStats.$sums.eq(7).html( Shared.readable(KOCFIA.dataAndStats.sums.workshop) );
			KOCFIA.dataAndStats.$sums.eq(8).html( Shared.readable(KOCFIA.dataAndStats.sums.blacksmith) );
			KOCFIA.dataAndStats.$sums.eq(9).html( Shared.readable(KOCFIA.dataAndStats.sums.unit1PerHour) );
			KOCFIA.dataAndStats.$sums.eq(10).html( Shared.readable(KOCFIA.dataAndStats.sums.unit2PerHour) );
			KOCFIA.dataAndStats.$sums.eq(11).html( Shared.readable(KOCFIA.dataAndStats.sums.unit3PerHour) );
			KOCFIA.dataAndStats.$sums.eq(12).html( Shared.readable(KOCFIA.dataAndStats.sums.unit4PerHour) );
			KOCFIA.dataAndStats.$sums.eq(13).html( Shared.readable(KOCFIA.dataAndStats.sums.unit5PerHour) );
			KOCFIA.dataAndStats.$sums.eq(14).html( Shared.readable(KOCFIA.dataAndStats.sums.unit6PerHour) );
			KOCFIA.dataAndStats.$sums.eq(15).html( Shared.readable(KOCFIA.dataAndStats.sums.unit7PerHour) );
			KOCFIA.dataAndStats.$sums.eq(16).html( Shared.readable(KOCFIA.dataAndStats.sums.unit8PerHour) );
			KOCFIA.dataAndStats.$sums.eq(17).html( Shared.readable(KOCFIA.dataAndStats.sums.unit9PerHour) );
			KOCFIA.dataAndStats.$sums.eq(18).html( Shared.readable(KOCFIA.dataAndStats.sums.unit10PerHour) );
			KOCFIA.dataAndStats.$sums.eq(19).html( Shared.readable(KOCFIA.dataAndStats.sums.unit11PerHour) );
			KOCFIA.dataAndStats.$sums.eq(20).html( Shared.readable(KOCFIA.dataAndStats.sums.unit12PerHour) );
			KOCFIA.dataAndStats.$sums.eq(21).html( Shared.readable(KOCFIA.dataAndStats.sums.fort53PerHour) );
			KOCFIA.dataAndStats.$sums.eq(22).html( Shared.readable(KOCFIA.dataAndStats.sums.fort55PerHour) );
			KOCFIA.dataAndStats.$sums.eq(23).html( Shared.readable(KOCFIA.dataAndStats.sums.fort60PerHour) );
			KOCFIA.dataAndStats.$sums.eq(24).html( Shared.readable(KOCFIA.dataAndStats.sums.fort61PerHour) );
			KOCFIA.dataAndStats.$sums.eq(25).html( Shared.readable(KOCFIA.dataAndStats.sums.fort62PerHour) );
		};

		KOCFIA.dataAndStats.compute = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats compute function');

			var cityKey, city, i, b, stat, building,
				timestamp = Date.timestamp(),
				marshall, foreman, boost, popPerHour,
				cities = KOCFIA.citiesKey.slice(), //copy
				isCalculator;

			var sums = {
				population: 0,
				nbHouses: 0,
				combat: 0,
				politic: 0,
				nbBarracks: 0,
				sumLvlBarracks: 0,
				workshop: 0,
				stable: 0,
				blacksmith: 0,
				unit1PerHour: 0,
				unit2PerHour: 0,
				unit3PerHour: 0,
				unit4PerHour: 0,
				unit5PerHour: 0,
				unit6PerHour: 0,
				unit7PerHour: 0,
				unit8PerHour: 0,
				unit9PerHour: 0,
				unit10PerHour: 0,
				unit11PerHour: 0,
				unit12PerHour: 0,
				fort53PerHour: 0,
				fort55PerHour: 0,
				fort60PerHour: 0,
				fort61PerHour: 0,
				fort62PerHour: 0
			};

			cities.push('calculator');

			for( i = 0; i < cities.length; i += 1 ){
				isCalculator = (cities[i] == 'calculator');
				cityKey = (!isCalculator ? cities[ i ] : null);

				if( isCalculator || KOCFIA.cities.hasOwnProperty(cityKey) ){
					if( !isCalculator ) city = KOCFIA.cities[ cityKey ];

					stat = {
						population: 0,
						nbHouses: 0,
						nbBarracks: 0,
						barrack: 0,
						sumLvlBarracks: 0,
						blacksmith: 0,
						stable: 0,
						workshop: 0,
						wall: 0,
						embassy: 0,
						rallypoint: 0
					};

					if( !isCalculator ){
						stat.population = parseInt(window.seed.citystats[ cityKey ].pop[0], 10);

						//parse buildings list
						for( b in window.seed.buildings[ cityKey ] ){
							if( window.seed.buildings[ cityKey ].hasOwnProperty(b) ){
								building = window.seed.buildings[ cityKey ][ b ];

								if( building[0] == 8 ){
									stat.embassy = parseInt(building[1], 10);
								} else if( building[0] == 5 ){
									stat.nbHouses++;
								} else if( building[0] == 12 ){
									stat.rallypoint = parseInt(building[1], 10);
								} else if( building[0] == 13 ){
									stat.nbBarracks++;
									lvl = parseInt(building[1], 10);
									stat.sumLvlBarracks += lvl;
									if( lvl > stat.barrack ) stat.barrack = lvl;
								} else if( building[0] == 16 ){
									stat.workshop = parseInt(building[1], 10);
								} else if( building[0] == 15 ){
									stat.blacksmith = parseInt(building[1], 10);
								} else if( building[0] == 17 ){
									stat.stable = parseInt(building[1], 10);
								} else if( building[0] == 19 ){
									stat.wall = parseInt(building[1], 10);
								}
							}
						}

						sums.population += stat.population;
						sums.nbHouses += stat.nbHouses;
						sums.nbBarracks += stat.nbBarracks;
						sums.sumLvlBarracks += stat.sumLvlBarracks;
						sums.workshop += stat.workshop;
						sums.stable += stat.stable;
						sums.blacksmith += stat.blacksmith;

						stat.combat = 0;
						stat.politic = 0;
						knights = window.seed.knights[ cityKey ];
						if( knights ){
							marshall = knights[ 'knt'+ window.seed.leaders[ cityKey ].combatKnightId ];
							if( marshall ){
								stat.combat = parseInt(marshall.combat, 10);
								if( marshall.combatBoostExpireUnixtime > timestamp ){
									stat.combat *= 1.25;
								}
							}

							foreman = knights[ 'knt'+ window.seed.leaders[ cityKey ].politicsKnightId ];
							if( foreman ){
								stat.politic = parseInt(foreman.politics, 10);
								if( foreman.politicsBoostExpireUnixtime > timestamp ){
									stat.politic *= 1.25;
								}
							}
						}

						sums.combat += stat.combat;
						sums.politic += stat.politic;

						stat.logging = parseInt(window.seed.tech.tch2, 10);
						stat.geometry = parseInt(window.seed.tech.tch5, 10);
						stat.eagleEyes = parseInt(window.seed.tech.tch6, 10);
						stat.poisonedEdge = parseInt(window.seed.tech.tch8, 10);
						stat.metalAlloys = parseInt(window.seed.tech.tch9, 10);
						stat.featherweightPowder = parseInt(window.seed.tech.tch10, 10);
						stat.alloyHorseshoes = parseInt(window.seed.tech.tch12, 10);
						stat.fletching = parseInt(window.seed.tech.tch13, 10);
						stat.giantsStrength = parseInt(window.seed.tech.tch16, 10);
					} else {
						//population, nbBarracks, sumLvlBarracks, workshop, stable, blacksmith, combat, geometry, training speed
						stat = $.extend({}, stat, KOCFIA.dataAndStats.calculator);

						stat.logging = parseInt(window.seed.tech.tch2, 10);
						stat.eagleEyes = parseInt(window.seed.tech.tch6, 10);
						stat.poisonedEdge = parseInt(window.seed.tech.tch8, 10);
						stat.metalAlloys = parseInt(window.seed.tech.tch9, 10);
						stat.featherweightPowder = parseInt(window.seed.tech.tch10, 10);
						stat.alloyHorseshoes = parseInt(window.seed.tech.tch12, 10);
						stat.fletching = parseInt(window.seed.tech.tch13, 10);
						stat.giantsStrength = parseInt(window.seed.tech.tch16, 10);
					}

					stat.barrackMod = stat.nbBarracks + 0.1 * (stat.sumLvlBarracks - stat.nbBarracks);
					stat.combatMod = stat.combat / 200;
					stat.geometryMod = stat.geometry / 10;
					stat.stableMod = stat.stable / 10;
					stat.workshopMod = stat.workshop / 10;
					stat.infantryBonus = stat.barrackMod * (1 + stat.combatMod + stat.geometryMod);
					stat.cavaleryBonus = stat.barrackMod * (1 + stat.combatMod + stat.geometryMod + stat.stableMod);
					stat.siegeBonus = stat.barrackMod * (1 + stat.combatMod + stat.geometryMod + stat.stableMod + stat.workshopMod);

					if( !isCalculator ){
						boost = 1 + (window.cm.ThroneController.effectBonus(77) / 100);
					} else {
						boost = 1 + (KOCFIA.dataAndStats.calculator.trainingSpeed / 100);
					}

					stat.unit1Time = (stat.barrack > 0 ? parseFloat(window.unitcost.unt1[7]) / boost / stat.infantryBonus : 0);
					stat.unit2Time = (stat.barrack > 0 ? parseFloat(window.unitcost.unt2[7]) / boost / stat.infantryBonus : 0);
					stat.unit3Time = (stat.barrack > 1 && stat.eagleEyes > 0 ? parseFloat(window.unitcost.unt3[7]) / boost / stat.infantryBonus : 0);
					stat.unit4Time = (stat.barrack > 1 && stat.poisonedEdge > 0 ? parseFloat(window.unitcost.unt4[7]) / boost / stat.infantryBonus : 0);
					stat.unit5Time = (stat.barrack > 2 && stat.blacksmith > 0 && stat.metalAlloys > 0 ? parseFloat(window.unitcost.unt5[7]) / boost / stat.infantryBonus : 0);
					stat.unit6Time = (stat.barrack > 3 && stat.fletching > 0 ? parseFloat(window.unitcost.unt6[7]) / boost / stat.infantryBonus : 0);
					stat.unit7Time = (stat.barrack > 4 && stat.stable > 0 && stat.alloyHorseshoes > 0 ? parseFloat(window.unitcost.unt7[7]) / boost / stat.cavaleryBonus : 0);
					stat.unit8Time = (stat.barrack > 6 && stat.blacksmith > 4 && stat.stable > 4 && stat.alloyHorseshoes > 4 ? parseFloat(window.unitcost.unt8[7]) / boost / stat.cavaleryBonus : 0);
					stat.unit9Time = (stat.barrack > 5 && stat.stable > 0 && stat.workshop > 2 && stat.featherweightPowder > 0 ? parseFloat(window.unitcost.unt9[7]) / boost / stat.siegeBonus : 0);
					stat.unit10Time = (stat.barrack > 7 && stat.stable > 1 && stat.workshop > 4 && stat.geometry > 4 && stat.fletching > 5 ? parseFloat(window.unitcost.unt10[7]) / boost / stat.siegeBonus : 0);
					stat.unit11Time = (stat.barrack > 8 && stat.workshop > 4 && stat.stable > 2 && stat.blacksmith > 6 && stat.metalAlloys > 7 && stat.geometry > 6 ? parseFloat(window.unitcost.unt11[7]) / boost / stat.siegeBonus : 0);
					stat.unit12Time = (stat.barrack > 9 && stat.stable > 1 && stat.workshop > 8 && stat.geometry > 9 && stat.fletching > 9 ? parseFloat(window.unitcost.unt12[7]) / boost / stat.siegeBonus : 0);

					stat.unit1PerHour = stat.unit1Time > 0 ? 3600 / stat.unit1Time : 0;
					stat.unit2PerHour = stat.unit2Time > 0 ? 3600 / stat.unit2Time : 0;
					stat.unit3PerHour = stat.unit3Time > 0 ? 3600 / stat.unit3Time : 0;
					stat.unit4PerHour = stat.unit4Time > 0 ? 3600 / stat.unit4Time : 0;
					stat.unit5PerHour = stat.unit5Time > 0 ? 3600 / stat.unit5Time : 0;
					stat.unit6PerHour = stat.unit6Time > 0 ? 3600 / stat.unit6Time : 0;
					stat.unit7PerHour = stat.unit7Time > 0 ? 3600 / stat.unit7Time : 0;
					stat.unit8PerHour = stat.unit8Time > 0 ? 3600 / stat.unit8Time : 0;
					stat.unit9PerHour = stat.unit9Time > 0 ? 3600 / stat.unit9Time : 0;
					stat.unit10PerHour = stat.unit10Time > 0 ? 3600 / stat.unit10Time : 0;
					stat.unit11PerHour = stat.unit11Time > 0 ? 3600 / stat.unit11Time : 0;
					stat.unit12PerHour = stat.unit12Time > 0 ? 3600 / stat.unit12Time : 0;

					if( !isCalculator ){
						//the population is repleanished every two hours (5% per 6 minutes)
						popPerHour = parseInt(window.seed.citystats[ cityKey ].pop[1], 10) / 2; //population limit
					} else {
						popPerHour = KOCFIA.dataAndStats.calculator.population / 2; //full population, no field or workforce modifiers
					}

					stat.unit1Delta = (stat.unit1PerHour > 0 ? popPerHour - stat.unit1PerHour * parseInt(window.unitcost.unt1[6], 10) : 0);
					stat.unit2Delta = (stat.unit2PerHour > 0 ? popPerHour - stat.unit2PerHour * parseInt(window.unitcost.unt2[6], 10) : 0);
					stat.unit3Delta = (stat.unit3PerHour > 0 ? popPerHour - stat.unit3PerHour * parseInt(window.unitcost.unt3[6], 10) : 0);
					stat.unit4Delta = (stat.unit4PerHour > 0 ? popPerHour - stat.unit4PerHour * parseInt(window.unitcost.unt4[6], 10) : 0);
					stat.unit5Delta = (stat.unit5PerHour > 0 ? popPerHour - stat.unit5PerHour * parseInt(window.unitcost.unt5[6], 10) : 0);
					stat.unit6Delta = (stat.unit6PerHour > 0 ? popPerHour - stat.unit6PerHour * parseInt(window.unitcost.unt6[6], 10) : 0);
					stat.unit7Delta = (stat.unit7PerHour > 0 ? popPerHour - stat.unit7PerHour * parseInt(window.unitcost.unt7[6], 10) : 0);
					stat.unit8Delta = (stat.unit8PerHour > 0 ? popPerHour - stat.unit8PerHour * parseInt(window.unitcost.unt8[6], 10) : 0);
					stat.unit9Delta = (stat.unit9PerHour > 0 ? popPerHour - stat.unit9PerHour * parseInt(window.unitcost.unt9[6], 10) : 0);
					stat.unit10Delta = (stat.unit10PerHour > 0 ? popPerHour - stat.unit10PerHour * parseInt(window.unitcost.unt10[6], 10) : 0);
					stat.unit11Delta = (stat.unit11PerHour > 0 ? popPerHour - stat.unit11PerHour * parseInt(window.unitcost.unt11[6], 10) : 0);
					stat.unit12Delta = (stat.unit12PerHour > 0 ? popPerHour - stat.unit12PerHour * parseInt(window.unitcost.unt12[6], 10) : 0);

					if( !isCalculator ){
						sums.unit1PerHour += stat.unit1PerHour;
						sums.unit2PerHour += stat.unit2PerHour;
						sums.unit3PerHour += stat.unit3PerHour;
						sums.unit4PerHour += stat.unit4PerHour;
						sums.unit5PerHour += stat.unit5PerHour;
						sums.unit6PerHour += stat.unit6PerHour;
						sums.unit7PerHour += stat.unit7PerHour;
						sums.unit8PerHour += stat.unit8PerHour;
						sums.unit9PerHour += stat.unit9PerHour;
						sums.unit10PerHour += stat.unit10PerHour;
						sums.unit11PerHour += stat.unit11PerHour;
						sums.unit12PerHour += stat.unit12PerHour;
					}

					stat.politicMod = stat.politic / 200;
					stat.giantStrenghtMod = stat.giantsStrength / 10;
					stat.defenseBonus = 1 + stat.politicMod + stat.giantStrenghtMod;
					boost = 1 + (window.cm.ThroneController.effectBonus(78) / 100);

					stat.fort53Time = (stat.wall > 5 && stat.blacksmith > 5 && stat.fletching > 4 ? parseFloat(window.fortcost.frt53[7]) / boost / stat.defenseBonus : 0);
					stat.fort55Time = (stat.wall > 7 && stat.blacksmith > 7 && stat.fletching > 6 && stat.geometry > 6 ? parseFloat(window.fortcost.frt55[7])/ boost / stat.defenseBonus : 0);
					stat.fort60Time = (stat.wall > 3 && stat.blacksmith > 3 && stat.poisonedEdge > 1 ? parseFloat(window.fortcost.frt60[7]) / boost / stat.defenseBonus : 0);
					stat.fort61Time = (stat.wall > 0 && stat.metalAlloys > 0 ? parseFloat(window.fortcost.frt61[7]) / boost / stat.defenseBonus : 0);
					stat.fort62Time = (stat.wall > 1 && stat.blacksmith > 1 && stat.logging > 1 ? parseFloat(window.fortcost.frt62[7]) / boost / stat.defenseBonus : 0);

					stat.fort53PerHour = stat.fort53Time > 0 ? 3600 / stat.fort53Time : 0;
					stat.fort55PerHour = stat.fort55Time > 0 ? 3600 / stat.fort55Time : 0;
					stat.fort60PerHour = stat.fort60Time > 0 ? 3600 / stat.fort60Time : 0;
					stat.fort61PerHour = stat.fort61Time > 0 ? 3600 / stat.fort61Time : 0;
					stat.fort62PerHour = stat.fort62Time > 0 ? 3600 / stat.fort62Time : 0;

					if( !isCalculator ){
						sums.fort53PerHour += stat.fort53PerHour;
						sums.fort55PerHour += stat.fort55PerHour;
						sums.fort60PerHour += stat.fort60PerHour;
						sums.fort61PerHour += stat.fort61PerHour;
						sums.fort62PerHour += stat.fort62PerHour;
					}

					if( !isCalculator ) KOCFIA.dataAndStats.stats[ cityKey ] = stat;
					else KOCFIA.dataAndStats.stats['calculator'] = stat;
				}
			}

			KOCFIA.dataAndStats.sums = sums;
		};

		KOCFIA.dataAndStats.storeCalculator = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('kocfia dataAndStats storeCalculator function');
			localStorage.setObject('kocfia_dataAndStats_calculator_' + KOCFIA.storeUniqueId, KOCFIA.dataAndStats.calculator);
		};

		KOCFIA.dataAndStats.deleteCalculator = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('dataAndStats') ) console.info('KOCFIA dataAndStats deleteCalculator function');
			localStorage.removeItem('kocfia_dataAndStats_calculator_' + KOCFIA.storeUniqueId);

			KOCFIA.dataAndStats.calculator = {
				population: 38000,
				nbBarracks: 14,
				sumLvlBarracks: 14 * 9,
				workshop: 9,
				stable: 9,
				blacksmith: 9,
				combat: 255,
				geometry: 9,
				trainingSpeed: 0
			};
		};

	/* BUILD */
		KOCFIA.build = {
			options: {
				active: 1,
				automatic: 0
			},
			stored: ['queues', 'chronology'],
			chronology: {},
			queues: {} //by citiesKey
			/*buildingsLabel: {
				1: {single: '', plural: ''}
			},*/
		};
		//Construction :
			//- mise en place de la ville (à détailler)
				//- positionnement
				//- nombre
			//- file d'attente des construction par ville
				//- modifiable (suppression, insertion, ordre)
			//- gestion des erreurs
		//fill fields with
		//upgrade fields to 9
		//upgrade barracks to 9
		//build x houses
		//add to queue by clicking
		//add visual info on queued level for buildings
		//advancement for tasks (x / y, remaining time)

		KOCFIA.build.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.build +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('build', 'active', 'Activer', KOCFIA.conf.build.active);
			code += Shared.generateCheckbox('build', 'automatic', 'Activer les constructions automatiques', KOCFIA.conf.build.automatic);
			code += Shared.generateButton('build', 'deleteQueues', 'Supprimer toutes les files d\'attente enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.build.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build on function');

			window.cm.CitySwitch.addEventListener(window.cm.CitySwitchEvent.CITY_CHANGED, KOCFIA.build.addBuildingsVisualInfo);
			window.cm.CitySwitch.addEventListener(window.cm.CitySwitchEvent.VIEW_CHANGED, KOCFIA.build.addBuildingsVisualInfo);

			if( KOCFIA.build.automatic ){
				KOCFIA.build.automaticOn();
			}
		};

		KOCFIA.build.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build off function');
		};

		KOCFIA.build.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build automaticOn function');
			$('#build-panel-automatic').prop('checked', true);

			window.setTimeout(function(){
				KOCFIA.build.launchAutomaticBuild();
			}, 60 * 1000);

			//recursive call every 5 minutes
			autoBuildInterval = window.setInterval(function(){
				KOCFIA.build.launchAutomaticBuild();
			}, 5 * 60 * 1000);
		};

		KOCFIA.build.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build automaticOff function');

			window.clearInterval(autoBuildInterval);
		};

		KOCFIA.build.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-build').html('');

			var header = '<div class="infos">';
			header += '<span class="buttonset">';
			header += '<input type="checkbox" id="plan-mode-toggle" autocomplete="off" />';
			header += '<label for="plan-mode-toggle">Mode planification</label>';
			header += '<input type="checkbox" id="build-panel-automatic" '+ (KOCFIA.conf.build.automatic ? 'checked' : '') +' autocomplete="off" />';
			header += '<label for="build-panel-automatic">constructions automatiques</label>';
			header += '</span>';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div><h3>'+ KOCFIA.modulesLabel.build +'</h3>';

			var help = KOCFIA.build.getHelp();

			var queues = '<ul class="cf">',
				i, j, l, cityKey, city, duration;
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];

					queues += '<li>';
					queues += '<h4>'+ city.label +'</h4>';
					queues += '<div id="kocfia-build-'+ cityKey +'-duration">';
					if( KOCFIA.build.queues.hasOwnProperty( cityKey ) ){
						duration = KOCFIA.build.getCityQueueDuration( cityKey );
						queues += Shared.readableDuration( duration );
					}
					queues += '</div>';
					/*
					queues += '<div class="current">Tâche en cours : ';
					if( KOCFIA.build.currents.hasOwnProperty(cityKey) ){
						queues += KOCFIA.build.getTaskLabel( KOCFIA.build.currents[ cityKey ] );
						queues += '<div>';
						queues += '<button class="button secondary requeue" title="Remettre à la fin de la liste d\'attente"><span>Rempiler</span></button>';
						queues += '<button class="button danger remove" title="Supprimer la tâche en cours"><span>Supprimer</span></button>';
						queues += '</div>';
					} else {
						queues += 'aucune';
					}
					queues += '</div>';
					*/
					queues += '<button class="button secondary queue-toggle" rel="'+ cityKey +'"><span>Liste d\'attente</span></button>';
					queues += '<button class="button danger queue-reset" rel="'+ cityKey +'" title="Vider la liste d\'attente de cette ville"><span>Vider</span></button>';
					queues += '<div id="kocfia-build-queue-'+ cityKey +'" class="queue-list" title="Liste d\'attente pour '+ city.label +'">';
					queues += '<ol rel="'+ cityKey +'">';
					queues += KOCFIA.build.generateQueueForCity( cityKey );
					queues += '</ol></div></li>';
				}
			}
			queues += '</ul>';


			$section.append( header + queues + help )
				.find('.queue-list')
				.dialog({autoOpen: false, height: 'auto', width: 400, zIndex: 100001, position: ['center', 'top'] })
				.find('ol').sortable({
					zIndex: 100002,
					update: function(event, ui){
						var $list = $(event.target),
							rel = $list.attr('rel'),
							list = $list.find('li').map(function(){ return $(this).attr('rel'); }).get();

						KOCFIA.build.queues[ rel ] = list;
						KOCFIA.build.storeQueue();
					}
				});

			KOCFIA.build.addSectionListeners();

			KOCFIA.build.generateBuildMenu();
		};

		KOCFIA.build.generateBuildMenu = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build generateBuildMenu function');

			var buildMenu = '<div class="kocfia-build-menu ui-widget ui-widget-content ui-corner-all buttonset"><section id="hover">';

			//destroy
			buildMenu += '<span class="ui-icon ui-icon-close close"></span>';
			buildMenu += '<input type="checkbox" class="destroy" id="kocfia-build-destroy"><label for="kocfia-build-destroy">Détruire</label>';

			//building list
			buildMenu += '<div class="buildings"><h3>Bâtiments :</h3>';
			for( i = 5; i < 22; i+= 1 ){
				if( window.buildingcost['bdg'+ i] ){
					buildMenu += '<input type="radio" name="kocfia-build-buildings" id="kocfia-build-buildings-bdg'+ i +'" value="'+ i +'">';
					buildMenu += '<label for="kocfia-build-buildings-bdg'+ i +'">'+ window.buildingcost['bdg'+ i][0] +'</label>';
				}
			}
			buildMenu += '<button class="button secondary none"><span>Aucun</span></button>';
			buildMenu += '</div>';

			//bulwark list
			buildMenu += '<div class="bulwarks"><h3>Remparts :</h3>';
			for( i = 19; i <= 19; i+= 1 ){
				if( window.buildingcost['bdg'+ i] ){
					buildMenu += '<input type="radio" name="kocfia-build-buildings" id="kocfia-build-buildings-bdg'+ i +'" value="'+ i +'">';
					buildMenu += '<label for="kocfia-build-buildings-bdg'+ i +'">'+ window.buildingcost['bdg'+ i][0] +'</label>';
				}
			}
			buildMenu += '<button class="button secondary none"><span>Aucun</span></button>';
			buildMenu += '</div>';

			//guardians list
			buildMenu += '<div class="guardians"><h3>Gardiens :</h3>';
			for( i = 50; i < 55; i+= 1 ){
				if( window.buildingcost['bdg'+ i] ){
					buildMenu += '<input type="radio" name="kocfia-build-buildings" id="kocfia-build-buildings-bdg'+ i +'" value="'+ i +'">';
					buildMenu += '<label for="kocfia-build-buildings-bdg'+ i +'">'+ window.buildingcost['bdg'+ i][0] +'</label>';
				}
			}
			buildMenu += '<button class="button secondary none"><span>Aucun</span></button>';
			buildMenu += '</div>';

			//fields list
			buildMenu += '<div class="fields"><h3>Champs :</h3>';
			for( i = 1; i < 5; i+= 1 ){
				if( window.buildingcost['bdg'+ i] ){
					buildMenu += '<input type="radio" name="kocfia-build-buildings" id="kocfia-build-buildings-bdg'+ i +'" value="'+ i +'">';
					buildMenu += '<label for="kocfia-build-buildings-bdg'+ i +'">'+ window.buildingcost['bdg'+ i][0] +'</label>';
				}
			}
			buildMenu += '<button class="button secondary none"><span>Aucun</span></button>';
			buildMenu += '</div>';

			//levels list
			buildMenu += '<div class="levels"><h3>Niveau :</h3>';
			var ltClasses = '';
			for( i = 9; i > 0; i -= 1){
				if( i < 9 ) ltClasses += ' lt'+ (i + 1);
				buildMenu += '<input type="radio" id="kocfia-build-level'+ i +'" class="upgrade" value="'+ i +'">';
				buildMenu += '<label for="kocfia-build-level'+ i +'" title="Améliore jusqu\'au niveau '+ i +'" class="'+ ltClasses +'">'+ i +'</label>';
			}
			buildMenu += '<button class="button secondary none"><span>Aucun</span></button>';
			buildMenu += '</div>';

			buildMenu += '<div class="planned"><h3>Tâches plannifiées :</h3><ol></ol></div>';

			buildMenu += '<div class="messages"></div>';
			buildMenu += '<div class="buttons">';
			buildMenu += '<button class="button apply" title="Sauvegarde les tâches plannifiées pour ce bâtiment"><span>Appliquer</span></button>';
			buildMenu += '<button class="button secondary cancel" title="Annule les modifications (mais pas les tâches déjà plannifiées) pour ce bâtiment"><span>Annuler</span></button>';
			buildMenu += '<button class="button danger delete" title="Supprimer les tâches plannifiées pour ce bâtiment"><span>Supprimer</span></button>';
			buildMenu += '</div>';
			buildMenu += '</section></div>';

			KOCFIA.build.$buildMenu = $(buildMenu);

			KOCFIA.build.$buildMenu
				.tipsy({delegate: '[title], [original-title]', html: true})
				.appendTo( $body )
				.on('click', '.close, .cancel', function(){
					$('.tipsy').remove();
					KOCFIA.build.$buildMenu.removeClass('dirty').hide();
				})
				.on('click', '.none', function(){
					$(this).closest('div').find('input').prop('checked', false);

					if( KOCFIA.build.$buildMenu.find('input').filter(':checked').length === 0 ){
						KOCFIA.build.$buildMenu.removeClass('dirty');
					}
				})
				.on('change', 'input', function(){
					KOCFIA.build.$buildMenu.addClass('dirty');
				})
				.on('click', '.apply', function(){
					var $slot = KOCFIA.build.$hover,
						slotId = $slot.attr('id'),
						slotClass = $slot.attr('class'),
						$level = KOCFIA.build.$buildMenu.find('.levels').find('input').filter(':checked'),
						$building = KOCFIA.build.$buildMenu.find('.buildings').find('input').filter(':checked'),
						$bulwark = KOCFIA.build.$buildMenu.find('.bulwarks').find('input').filter(':checked'),
						$guardian = KOCFIA.build.$buildMenu.find('.guardians').find('input').filter(':checked'),
						$field = KOCFIA.build.$buildMenu.find('.fields').find('input').filter(':checked'),
						isDestroy = KOCFIA.build.$buildMenu.find('.destroy').prop('checked'),
						cityKey = 'city'+ window.currentcityid,
						buildingType = null,
						currentBuildingType, buildingInfo,
						fromLevel, toLevel,
						isGuardian = false,
						isNew = KOCFIA.build.$buildMenu.find('#hover').hasClass('.-blank-'),
						messages = [],
						errors = false,
						needReset = false;

					console.log('$slot ', $slot);
					console.log('slotId ',slotId, ' slotClass ', slotClass);
					console.log('$level ', $level);
					console.log('$building ', $building);
					console.log('$bulwark ', $bulwark);
					console.log('$guardian ', $guardian);
					console.log('$field ', $field);
					console.log('isDestroy ', isDestroy);

					if( !KOCFIA.build.queues.hasOwnProperty(cityKey) ){
						KOCFIA.build.queues[ cityKey ] = {};
					}

					if( $building.length ){
						buildingType = $building.val();
					} else if( $bulwark.length ){
						buildingType = $bulwark.val();
					} else if( $guardian.length ){
						buildingType = $guardian.val();
					} else if( $field.length ){
						buildingType = $field.val();
					}
					console.log('buildingType ', buildingType);

					if( KOCFIA.build.$buildMenu.find('#hover').hasClass('.-guardianContainer-') ){
						isGuardian = true;
						var guardian = Shared.getGuardian( cityKey );
						if( guardian === false && buildingType === null ){
							KOCFIA.build.$buildMenu.find('.guardians').addClass('required');
							messages.push('Type de gardien à construire manquant.');
							errors = true;
						}
						slotId = 'slot_500';
					}

					if( !errors && ( (isGuardian && buildingType !== null) || isNew ) ){
						if( buildingType !== null ){
							fromLevel = 1;
							if( $level.length ){
								toLevel = $level.val();
							} else {
								toLevel = 1;
							}
						} else {
							//needed building choice
							messages.push('Bâtiment à construire manquant.');
							errors = true;
						}
					} else if( isGuardian ){
						fromLevel = parseInt(guardian.level, 10);
						if( $level.length ){
							toLevel = $level.val();
						} else {
							toLevel = 1;
						}
					} else {
						slotClass = slotClass.split('_');
						//buildingType = parseInt(slotClass[1], 10);
						fromLevel = parseInt(slotClass[2], 10);

						if( isDestroy ){
							toLevel = 0;
						}
					}
					console.log('fromLevel ', fromLevel, ' toLevel ', toLevel);

					if( !errors && !isNew ){
						buildingInfo = window.seed.buildings[ cityKey ]['pos'+ slotId.replace(/slot_/, '')];
						if( buildingInfo ) currentBuildingType = buildingInfo[0];
						else {
							messages.push('Type du bâtiment actuel introuvable.');
							errors = true;
						}
					}
					console.log('currentBuildingType ', currentBuildingType);

					if( !errors ){
						if( !KOCFIA.build.queues[ cityKey ].hasOwnProperty(slotId) ){
							KOCFIA.build.queues[ cityKey ][ slotId ] = [];
						}

						if( isDestroy ){
							//reset tasks
							KOCFIA.build.queues[ cityKey ][ slotId ] = [{buildingType: currentBuildingType, fromLevel: fromLevel, toLevel: toLevel}];
							needReset = true;
						}

						//new construction
						if( isNew || (buildingType !== null && currentBuildingType != buildingType) ){
							fromLevel = 0;

							if( $level.length ){
								toLevel = $level.val();
							} else {
								toLevel = 1;
							}

							//var durations = KOCFIA.build.getDuration( cityKey, buildingType, fromLevel, toLevel );

							for( var i = fromLevel + 1; i <= toLevel; i += 1 ){
								KOCFIA.build.queues[ cityKey ][ slotId ].push( {buildingType: buildingType, fromLevel: i - 1, toLevel: i} );
							}
						} else {
							toLevel = $level.val();

							//update the task
							for( var i = fromLevel + 1; i <= toLevel; i += 1 ){
								KOCFIA.build.queues[ cityKey ][ slotId ].push( {buildingType: currentBuildingType, fromLevel: i - 1, toLevel: i} );
							}
						}

						KOCFIA.build.$buildMenu.removeClass('dirty');

						console.log(KOCFIA.build.queues[ cityKey ][ slotId ]);

						KOCFIA.build.$buildMenu.trigger('updateTasksList');

						KOCFIA.build.updateCityChronology( cityKey, slotId, needReset );
						KOCFIA.build.updateCityQueueDuration( cityKey );
					} else {
						KOCFIA.build.$buildMenu.find('.messages').html( messages.join('<br>') );
					}
				})
				.on('click', '.delete', function(){
					var slotId = KOCFIA.build.$hover.attr('id'),
						cityKey = 'city'+ window.currentcityid;

					//planned tasks
					KOCFIA.build.$buildMenu.find('.planned').removeClass('hasTasks').find('ol').html('');

					//remove queue entries for slot
					delete KOCFIA.build.queues[ cityKey ][ slotId ];

					KOCFIA.build.updateCityChronology( cityKey, slotId, true );
					KOCFIA.build.updateCityQueueDuration( cityKey );
				})
				.on('updateTasksList', function(){
					var cityKey = 'city'+ window.currentcityid;
					if( KOCFIA.build.queues.hasOwnProperty(cityKey)
						&& KOCFIA.build.queues[ cityKey ].hasOwnProperty( KOCFIA.build.$hover.attr('id') )
					){
						var tasks = KOCFIA.build.queues[ cityKey ][ KOCFIA.build.$hover.attr('id') ],
							code = '', i;
						for( i = 0; i < tasks.length; i += 1 ){
							code += '<li>';
							code += window.buildingcost[ 'bdg'+ tasks[i].buildingType ][0];
							if( tasks[i].toLevel === 0 ){
								code += ' destruction';
							} else {
								code += ' '+ tasks[i].fromLevel +' &rarr; '+ tasks[i].toLevel;
							}
							code += '</li>';
						}

						KOCFIA.build.$buildMenu.find('.planned').addClass('hasTasks').find('ol').html( code );
					} else {
						KOCFIA.build.$buildMenu.find('.planned').removeClass('hasTasks').find('ol').html('');
					}
				});
		};

		KOCFIA.build.addSectionListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build addSectionListeners function');
			KOCFIA.$confPanel.find('#kocfia-build')
				.on('change', '#build-panel-automatic', function(){
					$('#build-automatic').prop('checked', $(this).prop('checked')).change();
				})
				.on('change', '#plan-mode-toggle', function(){
					if( $(this).prop('checked') ){
						//slot listerners
						$('#maparea_city, #maparea_fields')
							.on('mouseenter', 'a[id^="slot_"], .guardianHover', function(e){
								if( !KOCFIA.build.$buildMenu.hasClass('dirty') ){
									var $this = $(this);
									KOCFIA.build.$hover = $this;

									//reset menu
									KOCFIA.build.$buildMenu
										.find('#hover').attr('class', $this.attr('id') +' '+ $.map($this.attr('class').split(' '), function(c){ return '-'+ c +'-'; }).join(' ') +' '+ $this.closest('.maparea_main').attr('id'))
										.find('input').prop('checked', false).end()
										.find('.messages').html('').end()
										.find('.planned').removeClass('hasTasks').find('ol').html('').end();

									KOCFIA.build.$buildMenu.show().position({my: 'left top', at: 'bottom right', of: $this, offset: '10 10',  collision: 'fit'});

									var cityKey = 'city'+ window.currentcityid;
									if( KOCFIA.build.queues.hasOwnProperty(cityKey)
										&& KOCFIA.build.queues[ cityKey ].hasOwnProperty( this.id )
									){
										KOCFIA.build.$buildMenu.trigger('updateTasksList');
									}
								}
							});
					} else {
						$('#maparea_city, #maparea_fields').off('mouseenter mouseleave', 'a[id^="slot_"], .guardianHover');
						KOCFIA.build.$buildMenu.hide();
					}
				})
				.on('click', '.queue-toggle', function(){
					var cityKey = $(this).attr('rel');
					$('#kocfia-build-queue-'+ cityKey)
						.find('ol').html( KOCFIA.build.generateQueueForCity( cityKey ) ).end()
						.dialog('open');
				})
				.on('click', '.queue-reset', function(){
					if( confirm('Êtes-vous sûr ?') ){
						var $this = $(this),
							cityKey = $this.attr('rel');
						KOCFIA.build.deleteQueueByCity( cityKey );
						$this.parent().find('ol')[0].innerHTML = '';

						KOCFIA.build.updateCityQueueDuration( cityKey );
					}
				})
				.on('click', '.requeue', function(){
					//requeue the current task at the end of the queue
				})
				.on('click', '.remove', function(){
					if( confirm('Êtes-vous sûr ?') ){
						//delete slot task
						var $this = $(this),
							cityKey = $this.attr('data-city'),
							slotId = $this.attr('data-slot');

						if( KOCFIA.build.queues.hasOwnProperty( cityKey )
							&& KOCFIA.build.queues[ cityKey ].hasOwnProperty( slotId )
						){
							//remove queue entries for slot
							delete KOCFIA.build.queues[ cityKey ][ slotId ];

							KOCFIA.build.updateCityChronology( cityKey, slotId, true );
							KOCFIA.build.updateCityQueueDuration( cityKey );
						}
					}
				});
		};

		/*KOCFIA.build.getTaskLabel = function( task ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build getTaskLabel function', task);

			var label = '';

			//task, target, level
			if( task.hasOwnProperty('task') ){
				if( task.task == 'upgrade' ){
					label += 'Amélioration ';
				} else {
					label += 'Destruction ';
				}

				label += KOCFIA.build.buildingsLabel[ task.target ].plural;
			} else {
				label += KOCFIA.build.buildingsLabel[ task.target ].single;
			}

			label += '&rarr; ' + task.level;

			return label;
		};*/

		KOCFIA.build.generateQueueForCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build generateQueueForCity function', cityKey);

			var code = '', task, slot, j, buildingKey;
			if( KOCFIA.build.queues.hasOwnProperty(cityKey) ){
				for( slot in KOCFIA.build.queues[cityKey] ){
					if( KOCFIA.build.queues[ cityKey ].hasOwnProperty(slot) ){
						for( j = 0; j < KOCFIA.build.queues[ cityKey ][ slot ].length; j += 1 ){
							task = KOCFIA.build.queues[ cityKey ][ slot ][ j ];

							code += '<li rel="'+ slot +'_'+ j +'">';
							code += window.buildingcost[ 'bdg'+ tasks[i].buildingType ][0];
							if( tasks[i].toLevel === 0 ){
								code += ' destruction';
							} else {
								code += ' '+ tasks[i].fromLevel +' &rarr; '+ tasks[i].toLevel;
							}
							code += '</li>';
						}
					}
				}
			}

			return code;
		};

		KOCFIA.build.updateCityQueueDuration = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build updateCityQueueDuration function', cityKey);

			var duration = KOCFIA.build.getCityQueueDuration(cityKey);

			$('#kocfia-build-'+ cityKey +'-duration').html( Shared.readableDuration( duration ) );
		};

		KOCFIA.build.getCityQueueDuration = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build getCityQueueDuration function', cityKey);

			var knights = window.seed.knights[ cityKey ],
				throneBonus = parseFloat(window.cm.ThroneController.effectBonus(78)),
				techBonus = parseInt(window.seed.tech.tch16, 10),
				politicsModifier = 0,
				total = 0,
				buildingKey, buildingType, baseBuildingTime,
				time, levelModifier, i, j, task, isDestruction;

			if( knights ){
				var foreman = knights['knt'+ window.seed.leaders[cityKey].politicsKnightId];
				if( foreman ){
					politicsModifier = parseInt(foreman.politics, 10);
					if( parseInt(foreman.politicsBoostExpireUnixtime, 10) > Date.timestamp() ){
						politicsModifier = parseInt(politicsModifier * 1.25, 10);
					}
				}
			}

			if( KOCFIA.build.queues.hasOwnProperty(cityKey) ){
				for( slot in KOCFIA.build.queues[cityKey] ){
					if( KOCFIA.build.queues[ cityKey ].hasOwnProperty(slot) ){
						for( j = 0; j < KOCFIA.build.queues[ cityKey ][ slot ].length; j += 1 ){
							task = KOCFIA.build.queues[ cityKey ][ slot ][ j ];
							buildingKey = 'bdg'+ task.buildingType;
							baseBuildingTime = parseInt(window.buildingcost[ buildingKey ][7], 10);
							isDestruction = (task.toLevel === 0);

							levelModifier = Math.pow(2, (isDestruction ? task.fromLevel - 1 : task.fromLevel));
							if( task.buildingType < 6 && task.buildingType > 0 && levelModifier === 1 ){
								time = 15;
							} else {
								time = baseBuildingTime * levelModifier;
							}
							time = parseInt(time / (1 + 0.005 * politicsModifier + 0.1 * techBonus), 10);

							if( isDestruction ) time = Math.round(time / (1 + (throneBonus / 100)));

							total += time;
						}
					}
				}
			}

			return total;
		};

		KOCFIA.build.getDuration = function(cityKey, buildingType, fromLevel, toLevel){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build getDuration function', cityKey, buildingType, fromLevel, toLevel);

			var buildingKey = 'bdg'+ buildingType,
				knights = seed.knights[ cityKey ],
				throneBonus = cm.ThroneController.effectBonus(78),
				techBonus = parseInt(window.seed.tech.tch16, 10),
				baseBuildingTime = parseInt(window.buildingcost[ buildingKey ][7], 10),
				politicsModifier = 0;
			if( knights ){
				var foreman = knights['knt'+ window.seed.leaders[cityKey].politicsKnightId];
				if( foreman ){
					politicsModifier = parseInt(foreman.politics, 10);
					if( parseInt(foreman.politicsBoostExpireUnixtime, 10) > Date.timestamp() ){
						politicsModifier = parseInt(politicsModifier * 1.25, 10);
					}
				}
			}

			var total = 0,
				time,
				timeByLevel= {},
				levelModifier;

			if( toLevel === 0 ){ //destruction
				levelModifier = Math.pow(2, fromLevel - 1);
				if( buildingType < 6 && buildingType > 0 && levelModifier === 1 ){
					time = 15;
				} else {
					time = baseBuildingTime * levelModifier;
				}
				time = parseInt(time / (1 + 0.005 * politicsModifier + 0.1 * techBonus), 10);

				return time;
			} else {
				for( var i = fromLevel + 1; i <= toLevel; i += 1 ){
					levelModifier = Math.pow(2, i);
					if( buildingType < 6 && buildingType > 0 && levelModifier === 1 ){
						time = 15;
					} else {
						time = baseBuildingTime * levelModifier;
					}
					time = parseInt(time / (1 + 0.005 * politicsModifier + 0.1 * techBonus), 10);
					time = Math.round(time / (1 + (throneBonus / 100)));

					timeByLevel[ i ] = time;
					total += time;
				}
			}

			return {total: total, byLevel: timeByLevel};
		};

		KOCFIA.build.addBuildingsVisualInfo = function( event ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build addVisualInfo function');

			if( KOCFIA.conf.build.active ){
				$('#maparea_city, #maparea_fields').filter(':visible').find('a').filter('[id^="slot_"]').each(function(){
					KOCFIA.build.addBuildingVisualInfo( this );
				});

				//the guardian is not a <a>
				$('#maparea_city').filter(':visible').find('#guardianContainer').each(function(){
					KOCFIA.build.addBuildingVisualInfo( this );
				});

				KOCFIA.build.$buildMenu.removeClass('dirty').hide();
			}
		};

		KOCFIA.build.addBuildingVisualInfo = function( slot ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build addBuildingVisualInfo function');
			if( KOCFIA.build.queues.hasOwnProperty(cityKey)
				&& KOCFIA.build.queues[ cityKey ].hasOwnProperty( slot.id )
			){
				var tasks = KOCFIA.build.queues[ cityKey ][ slot.id ];
				if( tasks.length > 0 ){
					var $slot = $(slot),
						content = '';
					if( tasks[0].toLevel === 0 ){
						$slot.addClass('destroy');
						if( tasks.length > 1 ){
							content += window.buildingcost['bdg'+ tasks[1].buildingType][0].substr(0, 2);
						}
					}

					if( tasks.length > 1 ){
						content += tasks[ tasks.length - 1 ].toLevel;
					}

					if( content.length > 0 ){
						$slot.addAttr('data-build', content);
					}
				}
			}
		};

		KOCFIA.build.updateCityChronology = function( cityKey, slotId, needReset ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build updateCityChronology function', cityKey, slotId, needReset);

			if( !KOCFIA.build.queues.hasOwnProperty( cityKey ) ){
				KOCFIA.build.queues[ cityKey ] = {};
			}

			if( !KOCFIA.build.chronology.hasOwnProperty( cityKey ) ){
				KOCFIA.build.chronology[ cityKey ] = [];
			}

			if( needReset || !KOCFIA.build.queues[ cityKey ].hasOwnProperty( slotId ) ){
				var pointer, i,
					target = slotId +'_';
				for( i = KOCFIA.build.chronology[ cityKey ].length - 1; i > 0; i -= 1 ){
					pointer = KOCFIA.build.chronology[ cityKey ][ i ];
					if( pointer.indexOf(target) > -1 ) KOCFIA.build.chronology[ cityKey ].splice(i, 1);
				}
			}

			if( KOCFIA.build.queues[ cityKey ].hasOwnProperty( slotId ) ){
				var tasks = KOCFIA.build.queues[ cityKey ][ slotId ],
					i;
				for( i = 0; i < tasks.length; i += 1 ){
					if( $.inArray(slotId + '_' + i) == -1 ){
						KOCFIA.build.chronology[ cityKey ].push(slotId + '_' + i);
					}
				}
			}

			KOCFIA.build.storeQueues();
		};

		KOCFIA.build.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build getHelp function');
			var help = '<div id="kocfia-build-help" class="help" title="Aide Construction">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '<li></li>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.build.storeQueues = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build storeQueues function');
			localStorage.setObject('kocfia_build_queues_' + KOCFIA.storeUniqueId, KOCFIA.build.queues);
			localStorage.setObject('kocfia_build_chronology_' + KOCFIA.storeUniqueId, KOCFIA.build.chronology);
		};

		KOCFIA.build.deleteQueues = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build deleteQueues function');
			localStorage.removeItem('kocfia_build_queues_' + KOCFIA.storeUniqueId);
			localStorage.removeItem('kocfia_build_chronology_' + KOCFIA.storeUniqueId);

			KOCFIA.build.chronology = {};
			KOCFIA.build.queues = {};
		};

		KOCFIA.build.deleteQueueByCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build deleteQueues function');
			if( KOCFIA.build.queues.hasOwnProperty( cityKey ) ){
				delete KOCFIA.build.queues[ cityKey ];
				delete KOCFIA.build.chronology[ cityKey ];
				KOCFIA.build.storeQueues();
			}
		};

		KOCFIA.build.launchAutomaticBuild = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('KOCFIA build deleteCurrents function');

			if( !$.isEmptyObject( KOCFIA.build.chronology ) && !$.isEmptyObject( KOCFIA.build.queues ) ){
				var cityKey, city,
					task, pointer, slotId, taskIndex, type, isDestruct,
					con, res, stats, costs, current,
					i, l, b, t,
					level, req, need, tech,
					resNeeded, resAvailable, modifier,
					neededItemKey, guardian, guardianType, isGuardian,
					enough, attempts;

				//request
				var params, option;

				//loops index
				var cityIndex = 0,
					chronologyIndex = 0;

				//informations
				var msg = [];

				//start the build sequence
				var sequence = function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build launchAutomaticBuild deferred sequence function');
					return $.Deferred(function(dfd){
						return dfd.pipe( byCity(dfd) );
					}).promise();
				};

				//step 1
				var byCity = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build launchAutomaticBuild deferred byCity function');

					if( msg.length > 0 ){
						//display messages
						msg = msg.unique();
					}

					if( cityIndex >= KOCFIA.citiesKey.length ){
						return dfd.resolve();
					}

					cityKey = KOCFIA.citiesKey[ cityIndex ];
					city = KOCFIA.cities[ cityKey ];

					msg = [];

					//is constructing ?
					if( window.seed.queue_con.hasOwnProperty( cityKey ) ){
						con = window.seed.queue_con[ cityKey ];
						if( Array.isArray(con) && con.length > 0 ){
							if( con[0][4] > Date.timestamp() ){ //unfinished construction
								msg.push(city.label +': construction en cours');
								cityIndex += 1;
								return dfd.pipe( byCity(dfd) );
							}
						}
					}

					//TODO
					//try detecting building destruction

					//has tasks ?
					if( !KOCFIA.build.chronology.hasOwnProperty( cityKey ) ){
						msg.push(city.label +': aucunes tâches plannifiées');
						cityIndex += 1;
						return dfd.pipe( byCity(dfd) );
					}

					city = KOCFIA.cities[ cityKey ];
					res = window.seed.resources[ cityKey ];
					stats = window.seed.citystats[ cityKey ];

					return dfd.pipe( checkTask(dfd) );
				};

				//step 2 - check next construction task
				var checkTask = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build launchAutomaticBuild deferred checkTask function');

					if( chronologyIndex >= KOCFIA.build.chronology[ cityKey ].length ){
						msg.push(city.label +': vérification des tâches terminée');
						cityIndex += 1;
						return dfd.pipe( byCity(dfd) );
					}

					attempts = 3;
					pointer = KOCFIA.build.chronology[ cityKey ][ chronologyIndex ];
					pointer = pointer.split('_');
					slotId = pointer[0];
					taskIndex = parseInt(pointer[1], 10);
					task = KOCFIA.build.queues[ cityKey ][ slotId ].tasks[ taskIndex ];
					if( task && Object.isObject(task) ){
						//format {buildingType: buildingType, fromLevel: i - 1, toLevel: i}

						type = task.buildingType.replace(/bdg/, '');
						guardian = null;
						neededItemKey = null;

						isGuardian = task.slotId == 'guardianContainer';
						isDestruct = task.toLevel === 0;

						costs = window.buildingcost[ task.buildingType ];
						if( costs ){
							//["Château", 200, 3000, 2500, 100, 0, 0, 900, {"b19": [0, -2]}, [], ""]

							if( isDestruct ){
								if( type == "20"
									&& window.seed.queue_craft.hasOwnProperty(cityKey)
									&& Array.isArray(window.seed.queue_craft[ cityKey ])
									&& window.seed.queue_craft[ cityKey ].length > 0
								){
									msg.push(city.label +': Ne peut détruire '+ costs[0] +', fabrication en cours');
									chronologyIndex += 1;
									return dfd.pipe( checkTask(dfd) );
								}
							}

							//check current level
							/*current = window.seed.buildings[ cityKes ]['pos' + slotId];
							if( current && current[1] != task.fromLevel && current[1] < task.toLevel ){

							}*/

							//new building, is slot empty ?
							if( task.toLevel === 1
								&& !$.isEmptyObject( window.seed.buildings[ cityKey ]['pos'+ slotId] )
							){
								msg.push(city.label +': Ne peut construire '+ costs[0] +', emplacement non libre');
								chronologyIndex += 1;
								return dfd.pipe( checkTask(dfd) );
							}

							if( Object.isObject(costs[8]) && !$.isArray(costs[8]) && !$.isEmptyObject(costs[8]) ){
								for( b in costs[8] ){ // check building requirement
									if( costs[8].hasOwnProperty(b) ){
										level = Shared.buildingHighestLevel( cityKey, b.substr(1) );
										need = costs[8][k][1];
										if( need < 0 ) need = task.toLevel + need;
										if( level < need ){
											req = window.buildingcost[k];
											msg.push(city.label +': '+ costs[0] +' '+ task.toLevel +' requiert '+ req[0] +' '+ need);
											chronologyIndex += 1;
											return dfd.pipe( checkTask(dfd) );
										}
									}
								}
							}

							if( Object.isObject(costs[9]) && !$.isArray(costs[9]) && !$.isEmptyObject(costs[9]) ){
								for( t in costs[9] ){ // check tech requirement
									if( costs[9].hasOwnProperty(t) ){
										need = costs[9][t][1];
										if( need === 0 ) need = task.toLevel;
										if( parseInt(window.seed.tech['tch' + t.substr(1)], 10) < need ){
											tech = window.techcost["tch" + t.substr(1)];
											msg.push(city.label +': '+ costs[0] +' '+ task.toLevel +' requiert '+ tech[0] +' '+ need);
											chronologyIndex += 1;
											return dfd.pipe( checkTask(dfd) );
										}
									}
								}
							}

							//resources
							modifier = Math.pow(2, (task.toLevel - 1));
							for( r = 1; r < 5; r += 1 ){
								resNeeded.push( parseInt(costs[r], 10) * 3600 * modifier );

								//take into account the rule keep parameter
								resAvailable.push( parseInt(res["rec" + r][0], 10) );
							}

							//gold
							resNeeded.push( parseInt(costs[5], 10) * modifier );
							resAvailable.push( parseInt(stats.gold[0], 10) );

							enough = true;
							for( i = 0; i < resNeeded.length; i += 1 ){
								if( resNeeded[ i ] !== 0 && resAvailable[ i ] < resNeeded[ i ] ){
									enough = false;
									break;
								}
							}

							if( !enough ){
								msg.push(city.label +': Pas assez de ressources pour '+ costs[0] +' '+ task.toLevel);
								chronologyIndex += 1;
								return dfd.pipe( checkTask(dfd) );
							}

							//guardian of different type need summoning
							if( task.slotId == 'guardianContainer' ){
								guardian = Shared.getGuardian( cityKey );

								if( guardian === false ){
									guardian = { type: 'none' };
								}

								//summoning or unlocking the task guardian
								if( window.cm.guardianConst.bdgTypes[ guardian.type ] != type ){ //false when no guardian unlocked
									if( guardian.cityGuardianLevels.hasOwnProperty( type ) ){
										//guardian already unlocked
										return dfd.pipe( summonGuardian(dfd, attempts) );
									} else {
										//need an item to unlock ?
										if( window.cm.guardianConst.unlockItem[ type ] ){
											neededItemKey = 'i'+ window.cm.guardianConst.unlockItem[ type ];

											if( !window.seed.items.hasOwnProperty( neededItemKey ) || window.seed.items[ neededItemKey ] < 1 ){
												msg.push(city.label +': Object manquant ('+ window.itemlist[ neededItemKey ].name +') pour débloquer le gardien');
												chronologyIndex += 1;
												return dfd.pipe( checkTask(dfd) );
											}
										}

										return dfd.pipe( unlockGuardian(dfd, attempts) );
									}
								}
							}

							return dfd.pipe( build(dfd, attempts) );
						} else {
							msg.push(city.label +': Aucun coût trouvé');
							chronologyIndex += 1;
							return dfd.pipe( checkTask(dfd) );
						}
					} else {
						msg.push(city.label +': tâche non trouvée');
						chronologyIndex += 1;
						return dfd.pipe( checkTask(dfd) );
					}
				};

				//step 2a, only for guardians
				var summonGuardian = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build launchAutomaticBuild deferred summonGuardian function');

					params = $.extend({}, window.g_ajaxparams);
					params.ctrl = 'Guardian';
					params.action = 'summon';
					params.cityId = city.id;
					params.tvuid = window.tvuid;
					params.type = type;

					$.ajax({
							url: window.g_ajaxpath + "ajax/_dispatch.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(result){
							if( result.ok ){
								if( Array.isArray(window.seed.guardian) && window.seed.guardian.length > 0 ){
									for( i = 0, l = window.seed.guardian.length; i < l; i += 1 ){
										guardian = window.seed.guardian[ i ];
										if( Object.isObject(guardian) && !$.isEmptyObject(guardian) ){
											if( guardian.city == city.id ){
												guardianType = window.cm.guardianConst.numTypes[ type ];
												window.seed.guardian[ i ].timeLeft = 0;
												window.seed.guardian[ i ].level = guardian.cityGuardianLevels[ guardianType ];
												window.seed.guardian[ i ].type = guardianType;

												window.cm.guardianCity.rerender(true);
											}
										}
									}
								}

								attempts = 3;
								return dfd.pipe( build(dfd) );
							} else {
								if( result.msg ){
									msg.push(city.label +': invocation de gardien refusée ('+ result.msg +').');

									cityIndex += 1;
									return dfd.pipe( byCity(dfd) );
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										window.setTimeout(function(){ return dfd.pipe( summonGuardian(udfd) ); }, 10000);
									} else {
										msgUnit.push(city.label +': invocation de gardien refusée.');

										cityIndex += 1;
										return dfd.pipe( byCity(dfd) );
									}
								}
							}
						})
						.fail(function(){
							//network or server error
							attempts -= 1;
							if( attempts > 0 ){
								window.setTimeout(function(){ return dfd.pipe( summonGuardian(udfd) ); }, 10000);
							} else {
								msg.push(city.label +': invocation de gardien refusée (erreur internet).');

								cityIndex += 1;
								return dfd.pipe( byCity(dfd) );
							}
						});
				};

				//step 2b, only for guardian
				var unlockGuardian = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build launchAutomaticBuild deferred summonGuardian function');

					params = $.extend({}, window.g_ajaxparams);
					params.ctrl = 'Guardian';
					params.action = 'unlock';
					params.cityId = city.id;
					params.tvuid = window.tvuid;
					params.type = type;

					$.ajax({
							url: window.g_ajaxpath + "ajax/_dispatch.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(result){
							if( result.ok ){
								window.seed.items[ neededItemKey ] -= 1;
								window.ksoItems[ parseInt(neededItemKey.substr(1), 10) ].subtract();

								if( Array.isArray(window.seed.guardian) && window.seed.guardian.length > 0 ){
									for( i = 0, l = window.seed.guardian.length; i < l; i += 1 ){
										guardian = window.seed.guardian[ i ];
										if( Object.isObject(guardian) && !$.isEmptyObject(guardian) ){
											if( guardian.city == city.id ){
												guardianType = window.cm.guardianConst.numTypes[ type ];
												window.seed.guardian[ i ].level = 0;
												window.seed.guardian[ i ].type = guardianType;
												window.seed.guardian[ i ].cityGuardianLevels[ guardianType ] = 0;

												window.cm.guardianCity.rerender(true);
											}
										}
									}
								}

								attempts = 3;
								return dfd.pipe( build(dfd) );
							} else {
								if( result.msg ){
									msg.push(city.label +': déblocage de gardien refusé ('+ result.msg +').');

									cityIndex += 1;
									return dfd.pipe( byCity(dfd) );
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										window.setTimeout(function(){ return dfd.pipe( unlockGuardian(udfd) ); }, 10000);
									} else {
										msgUnit.push(city.label +': déblocage de gardien refusé.');

										cityIndex += 1;
										return dfd.pipe( byCity(dfd) );
									}
								}
							}
						})
						.fail(function(){
							//network or server error
							attempts -= 1;
							if( attempts > 0 ){
								window.setTimeout(function(){ return dfd.pipe( unlockGuardian(udfd) ); }, 10000);
							} else {
								msg.push(city.label +': déblocage de gardien refusé (erreur internet).');

								cityIndex += 1;
								return dfd.pipe( byCity(dfd) );
							}
						});
				};

				//step 3
				var build = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('build') ) console.info('kocfia build launchAutomaticBuild deferred checkTask function');

					params = $.extend({}, window.g_ajaxparams);

					if( isDestruct ){
						params.cid = city.id;
						params.bid = "";
						params.pos = slotId;
						params.lv = task.fromLevel - 1;
						if( task.fromLevel > 0 ){
							params.bid = window.seed.buildings[ cityKey ]['pos'+ slotId][3];
						}
						params.type = type;

						options = {
							url: window.g_ajaxpath + "ajax/destruct.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						};
					} else if( !isGuardian ){
						params.cid = city.id;
						params.bid = "";
						params.pos = slotId;
						params.lv = task.toLevel;
						if( params.lv > 1 ){
							params.bid = window.seed.buildings[ cityKey ]['pos'+ slotId][3];
						}
						params.type = type;
						params.permission = 0; //no automatic 10+ construction

						options = {
							url: window.g_ajaxpath + "ajax/construct.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						};
					} else {
						slotId = 500;

						params.ctrl = 'Guardian';
						params.action = 'build';
						params.cityId = city.id;
						params.tvuid = window.tvuid;
						params.type = type;
						params.permission = 0; //no automatic 10+ construction

						options = {
							url: window.g_ajaxpath + "ajax/_dispatch.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						};
					}

					$.ajax( options )
						.done(function(result){
							if( !isGuardian && !isDestruct && result.ok ){
								window.seed.resources[ cityKey ].rec1[0] -= resNeeded[0];
								window.seed.resources[ cityKey ].rec2[0] -= resNeeded[1];
								window.seed.resources[ cityKey ].rec3[0] -= resNeeded[2];
								window.seed.resources[ cityKey ].rec4[0] -= resNeeded[3];
								window.seed.citystats[ cityKey ].gold[0] -= resNeeded[4];

								var ts = Date.timestamp(),
									duration = parseInt(result.timeNeeded, 10);
								window.seed.queue_con[ cityKey ].push([type, task.toLevel, parseInt(result.buildingId, 10), ts, ts + duration, 0, duration, slotId]);

								if( task.fromLevel === 0 ){
									window.seed.buildings[ cityKey ]['pos'+ slotId] = [type, 0, slotId, result.buildingId];
								}

								window.update_bdg();

								window.build_gethelp(result.buildingId);

								if( result.updateSeed ){
									window.update_seed(result.updateSeed);
								}

								msg.push(city.label +': construction lancée ('+ costs[0] +')');

								KOCFIA.build.chronology[ cityKey ].splice(chronologyIndex, 1);

								cityIndex += 1;
								return dfd.pipe( byCity(dfd) );
							} else if( isDestruct && result.ok ){
								var ts = Date.timestamp(),
									duration = parseInt(result.timeNeeded, 10);
								window.seed.queue_con[ cityKey ].push([type, 0, parseInt(result.buildingId, 10), ts, ts + duration, 0, ts, slotId]);

								window.update_bdg();

								if( result.updateSeed ){
									window.update_seed(result.updateSeed);
								}

								msg.push(city.label +': destruction lancée ('+ costs[0] +')');

								KOCFIA.build.chronology[ cityKey ].splice(chronologyIndex, 1);

								//instant destruction for level 1 building
								if( task.fromLevel === 1 ){
									chronologyIndex += 1;
									return dfd.pipe( checkTask(dfd) );
								} else {
									cityIndex += 1;
									return dfd.pipe( byCity(dfd) );
								}
							} else if( isGuardian && result.time ){
								window.seed.resources[ cityKey ].rec1[0] -= resNeeded[0];
								window.seed.resources[ cityKey ].rec2[0] -= resNeeded[1];
								window.seed.resources[ cityKey ].rec3[0] -= resNeeded[2];
								window.seed.resources[ cityKey ].rec4[0] -= resNeeded[3];
								window.seed.citystats[ cityKey ].gold[0] -= resNeeded[4];

								var ts = Date.timestamp(),
									duration = parseInt(result.time, 10);
								window.seed.queue_con[ cityKey ].push([type, task.toLevel, parseInt(result.buildingId, 10), ts, ts + duration, 0, duration, slotId]);

								//set upgrading to true
								if( Array.isArray(window.seed.guardian) && window.seed.guardian.length > 0 ){
									for( i = 0, l = window.seed.guardian.length; i < l; i += 1 ){
										guardian = window.seed.guardian[ i ];
										if( Object.isObject(guardian) && !$.isEmptyObject(guardian) ){
											if( guardian.city == city.id ){
												window.seed.guardian[ i ].updating = true;
											}
										}
									}
								}

								msg.push(city.label +': construction lancée (gardien)');

								KOCFIA.build.chronology[ cityKey ].splice(chronologyIndex, 1);

								if( city.id == window.currentcityid ){
									if( result.guardian ){
										window.cm.guardianModalModel.setDynamics( result.guardian );
									}

									window.cm.guardianCity.rerender(true);
								}
							} else {
								if( result.msg ){
									msg.push(city.label +': construction refusée ('+ result.msg +').');

									cityIndex += 1;
									return dfd.pipe( byCity(dfd) );
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										window.setTimeout(function(){ return dfd.pipe( build(udfd) ); }, 10000);
									} else {
										msgUnit.push(city.label +': construction refusée.');

										cityIndex += 1;
										return dfd.pipe( byCity(dfd) );
									}
								}
							}
						})
						.fail(function(){
							//network or server error
							attempts -= 1;
							if( attempts > 0 ){
								window.setTimeout(function(){ return dfd.pipe( build(udfd) ); }, 10000);
							} else {
								msg.push(city.label +': construction refusée (erreur internet).');

								cityIndex += 1;
								return dfd.pipe( byCity(dfd) );
							}
						});
				};

				$.when( sequence() );
			}
		};

	/* MARCHES */
		KOCFIA.marches = {
			options: {
				active: 1
			},
			recallTimeouts: {} //by cityKey and march
		};

		KOCFIA.marches.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.marches +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('marches', 'active', 'Activer', KOCFIA.conf.marches.active);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.marches.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-marches').html('');

			var i, cityKey, city;

			var header = '<div class="infos">';
			header += '<span class="buttonset"><input type="checkbox" class="raid-toggle" name="kocfia-marches-raid-toggle" id="kocfia-marches-raid-toggle">';
			header += '<label for="kocfia-marches-raid-toggle">Masquer les raids</label></span>';
			header += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			header += '</div><h3>'+ KOCFIA.modulesLabel.marches +'</h3>';
			header += '<div class="buttonset">Afficher : ';
			header += '<input type="radio" name="kocfia-marches-city-toggles" class="city-toggle" id="kocfia-marches-all" value="all" checked>';
			header += '<label for="kocfia-marches-all">Toutes</label>';

			var code = '<table><thead><tr>';
			code += '<th>Actions</th>';
			code += '<th>Status</th>';
			code += '<th>Coordonnées</th>';
			code += '<th>Type</th>';
			code += '<th>Troupes</th>';
			code += '<th>Butin</th>';
			code += '</tr></thead>';

			for( i = 0, l = KOCFIA.citiesKey.length; i < l; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];

					header += '<input type="radio" name="kocfia-marches-city-toggles" id="kocfia-marches-'+ cityKey +'" class="city-toggle" value="'+ cityKey +'">';
					header += '<label for="kocfia-marches-'+ cityKey +'">'+ city.label +'</label>';

					code += KOCFIA.marches.refreshByCity( cityKey );
				}
			}

			header += '</div>';

			code += '</table>';

			var help = KOCFIA.marches.getHelp();

			$section.append( header + code + help )
				.on('change', '.city-toggle', function(){
					if( this.value == 'all' ){
						KOCFIA.marches.$tbodies.show();
					} else {
						KOCFIA.marches.$tbodies.hide().filter('[data-city="'+ this.value +'"]').show();
					}
				})
				.on('change', '#kocfia-marches-raid-toggle', function(){
					//toggle raid marches <tr> and raid buttons in city header <tr>
					KOCFIA.marches.$tbodies.find('.raid').toggle( !$(this).prop('checked') );
				})
				.on('click', '.update', function(){
					var $tbody = $(this).closest('tbody'),
						cityKey = $tbody.data('city'),
						city = KOCFIA.cities[ cityKey ];

					Shared.working('Mise à jour de chaque marche de '+ city.label +' en cours');

					var update = function(){
						return $.Deferred(function(dfd){
							return dfd.pipe( Shared.refreshMarchByCity( cityKey, true, dfd ) );
						}).promise();
					};

					$.when( update() )
						.fail(function(){
							Shared.notify('Erreur durant la mise à jour des marches');
						})
						.done(function(){
							Shared.success('Mise à jour des marches finie');
						})
						.always(function(){
							$tbody.replaceWith( KOCFIA.marches.refreshByCity(cityKey) );
							$('.tipsy').remove();
						});
				})
				.on('click', '.refresh', function(){
					var $tbody = $(this).closest('tbody'),
						cityKey = $tbody.data('city');

						$tbody.replaceWith( KOCFIA.marches.refreshByCity(cityKey) );
						$('.tipsy').remove();
				})
				.on('click', '.recall, .undefend', function(){
					var $this = $(this),
						$tr = $this.closest('tr'),
						marchKey = $tr.attr('data-march'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						type = ($this.hasClass('undefend') ? 1 : 2);

					var recall = function(){
						return $.Deferred(function(dfd){
							return dfd.pipe( Shared.cancelMarch( marchKey, cityKey, type, 3, dfd ) );
						}).promise();
					};

					$.when( recall() )
						.fail(function(){
							Shared.notify('Erreur durant le rappel de la marche');
						})
						.done(function(){
							$this.remove();

							if( KOCFIA.marches.recallTimeouts.hasOwnProperty(cityKey) && KOCFIA.marches.recallTimeouts[ cityKey ].hasOwnProperty(marchKey) ){
								if( KOCFIA.marches.recallTimeouts[ cityKey ][ marchKey ] ) window.clearTimeout(KOCFIA.marches.recallTimeouts[ cityKey ][ marchKey ]);
								delete KOCFIA.marches.recallTimeouts[ cityKey ][ marchKey ];
							}

							Shared.success('Rappel effectué');
						})
						.always(function(){
							$('.tipsy').remove();
						});
				})
				.on('click', '.resume, .stop, .resumeCityRaids, .stopCityRaids', function(){
					var $this = $(this),
						$tr = $this.closest('tr'),
						marchKey = $tr.attr('data-march'),
						$tbody = $tr.closest('tbody'),
						cityKey = $tbody.data('city'),
						type = $this.hasClass('resume') || $this.hasClass('resumeCityRaids') ? 'resumeMarch' : 'stopMarch',
						isForWholeCity = $this.hasClass('resumeCityRaids') || $this.hasClass('stopCityRaids');

					//city wide action, force marchKey reset
					if( isForWholeCity ){
						marchKey = null;
						var city = KOCFIA.cities[ cityKey ];
					}

					var action = function(){
						return $.Deferred(function(dfd){
							return dfd.pipe( KOCFIA.marches.botAction( marchKey, cityKey, type, 3, dfd ) );
						}).promise();
					};

					$.when( action() )
						.fail(function(){
							Shared.notify('Erreur durant la demande '+ (type == 'resumeMarch' ? 'de reprise' : 'd\'arrêt') + (isForWholeCity ? ' des raids de '+ city.label : ' du raid'));
						})
						.done(function(){
							$this.remove();

							Shared.success((type == 'resumeMarch' ? 'Reprise' : 'Arrêt') + (isForWholeCity ? ' des raids de '+ city.label : ' du raid') +' demandé');
						})
						.always(function(){
							$('.tipsy').remove();
						});
				});

			KOCFIA.marches.$div = $('#kocfia-marches');
			KOCFIA.marches.$tbodies = KOCFIA.marches.$div.find('tbody');
		};

		KOCFIA.marches.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches on function');
		};

		KOCFIA.marches.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches off function');
		};

		KOCFIA.marches.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('knights') ) console.info('KOCFIA marches getHelp function');
			var help = '<div id="kocfia-marches-help" class="help" title="Aide gestion des '+ KOCFIA.modulesLabel.marches +'">';
			help += '<h4>Gestion des déplacements de troupes (marches)</h4><ul>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.marches.update = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches update function');
			var cityKey, i, l;

			for( i = 0, l = KOCFIA.citiesKey.length; i < l; i += 1 ){
				cityKey = KOCFIA.citiesKey[ i ];

				KOCFIA.marches.$tbodies.filter('[data-city="'+ cityKey +'"]').replaceWith( KOCFIA.marches.refreshByCity( cityKey ) );
			}
		};

		KOCFIA.marches.removeRecall = function( cityKey, marchKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches removeRecall function', cityKey, marchKey);
			if( marchKey.toString().indexOf('m') == -1 ) marchKey = 'm' + marchKey;

			KOCFIA.marches.$tbodies.filter('[data-city="'+ cityKey +'"]')
				.find('tr').filter('[data-march="'+ marchKey +'"]')
				.find('.recall').remove();
		};

		KOCFIA.marches.refreshByCity = function( cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches refreshByCity function');
			var code = '',
				marches = window.seed.queue_atkp[ cityKey ],
				m, march, ts, info, eta, type, city, player,
				timeDestination, timeReturn, hours, minutes, seconds, time,
				hasBot = false,
				nb = 0,
				max = Shared.buildingHighestLevel(cityKey, 12);

			if( max == 12 ) max -= 1;

			for( m in marches ){
				if( marches.hasOwnProperty(m) ) nb += 1;
			}

			code += '<tr class="header">';
			code += '<th>'+ nb +'/'+ max +'</th>';
			code += '<th>'+ KOCFIA.cities[ cityKey ].label +'</th>';
			code += '<th colspan="4">';
			code += '<button class="button secondary update" title="Met à jour les informations sur les marches de cette ville"><span>Met à jour</span></button>';
			code += '<button class="button secondary refresh" title="Raffraîchit la liste des marches de cette ville"><span>Raffraîchir</span></button>';
			code += '<button class="button danger raid stopCityRaids" title="Arrête les raids automatiques de cette ville"><span>Arrêt</span></button>';
			code += '<button class="button secondary raid resumeCityRaids" title="Relance les raids automatiques de cette ville"><span>Reprise</span></button>';
			code += '</th></tr>';

			/*cm.BOT_STATUS = {
				BOT_MARCH_UNDEFINED: 0,
				BOT_MARCH_MARCHING: 1,
				BOT_MARCH_RETURNING: 2,
				BOT_MARCH_STOPPED: 3,
				BOT_MARCH_INSUFFICIENT_TROOPS: 4,
				BOT_MARCH_MAX_RAIDS_EXCEEDED: 5,
				BOT_MARCH_TIMED_OUT: 6,
				BOT_MARCH_RESTING: 7,
				BOT_MARCH_UNAVAILABLE_KNIGHT: 8,
				BOT_MARCH_RALLY_POINT_LIMIT_REACHED: 9,
				BOT_MARCH_STOPPING: 200
			};*/
			/*cm.MARCH_STATUS = {
				MARCH_STATUS_INACTIVE: 0,
				MARCH_STATUS_OUTBOUND: 1,
				MARCH_STATUS_DEFENDING: 2,
				MARCH_STATUS_STOPPED: 10,
				MARCH_STATUS_RESTING: 4,
				MARCH_STATUS_UNKNOWN: 5,
				MARCH_STATUS_SITUATIONCHANGED: 7,
				MARCH_STATUS_RETURNING: 8,
				MARCH_STATUS_ABORTING: 9
			};*/
			/*cm.MARCH_TYPES = {
				MARCH_TYPE_NONE: 0,
				MARCH_TYPE_TRANSPORT: 1,
				MARCH_TYPE_REINFORCE: 2,
				MARCH_TYPE_SCOUT: 3,
				MARCH_TYPE_ATTACK: 4,
				MARCH_TYPE_REASSIGN: 5,
				MARCH_TYPE_BARBARIAN: 6,
				MARCH_TYPE_MERCENARY: 7,
				MARCH_TYPE_BARBARIAN_REINFORCE: 8,
				MARCH_TYPE_BOT_BARBARIAN: 9,
				MARCH_TYPE_DARK_FOREST: 10,
				MARCH_TYPE_DARK_FOREST_SCOUT: 11
			};*/

			/*"m41191": {
				"marchUnixTime": "1321209180",
				"destinationUnixTime": "1321209383",
				"returnUnixTime": "1321209586",
				"lastUpdatedUnixTime": "1321209390",
				"marchId": "41191",
				"playerId": "16273562",
				"cityId": "60115",
				"botSettingsId": "13396",
				"botMarchStatus": "2",
				"botState": "1",
				"modalState": "0",
				"restPeriod": "3194",
				"fromPlayerId": "16273562",
				"fromCityId": "60115",
				"fromAllianceId": "769",
				"fromXCoord": "95",
				"fromYCoord": "538",
				"toPlayerId": "0",
				"toCityId": "0",
				"toTileId": "328883",
				"toAllianceId": "0",
				"toXCoord": "92",
				"toYCoord": "532",
				"toTileType": "51",
				"toTileLevel": "5",
				"marchType": "9",
				"marchStatus": "8",
				"marchTimestamp": "2011-11-13 10:33:00",
				"destinationEta": "2011-11-13 10:36:23",
				"returnEta": "2011-11-13 10:39:46",
				"gold": "5000",
				"resource1": "500000",
				"resource2": "50000",
				"resource3": "5000",
				"resource4": "500",
				"unit0Count": "0",
				"unit1Count": "0",
				"unit2Count": "0",
				"unit3Count": "0",
				"unit4Count": "0",
				"unit5Count": "0",
				"unit6Count": "16000",
				"unit7Count": "0",
				"unit8Count": "0",
				"unit9Count": "0",
				"unit10Count": "0",
				"unit11Count": "0",
				"unit12Count": "0",
				"unit0Return": "0",
				"unit1Return": "0",
				"unit2Return": "0",
				"unit3Return": "0",
				"unit4Return": "0",
				"unit5Return": "0",
				"unit6Return": "16000",
				"unit7Return": "0",
				"unit8Return": "0",
				"unit9Return": "0",
				"unit10Return": "0",
				"unit11Return": "0",
				"unit12Return": "0",
				"speed": "425",
				"knightId": "189764",
				"knightCombat": "67",
				"knightCombatBoostExpiration": "0000-00-00 00:00:00",
				"knightLevel": "1",
				"knightSkillPointsApplied": "12",
				"fromInformatics": "6",
				"fromLoadTech": "8",
				"lastUpdated": "2011-11-13 10:36:30"
			},*/

			ts = Date.timestamp();
			hasBot = false;
			for( m in marches ){
				if( marches.hasOwnProperty(m) ){
					march = marches[m];

					if( KOCFIA.marches.recallTimeouts.hasOwnProperty(cityKey) && KOCFIA.marches.recallTimeouts[ cityKey ].hasOwnProperty(m) ){
						if( KOCFIA.marches.recallTimeouts[ cityKey ][ m ] ) window.clearTimeout(KOCFIA.marches.recallTimeouts[ cityKey ][ m ]);
						delete KOCFIA.marches.recallTimeouts[ cityKey ][ m ];
					}

					code += '<tr data-march="'+ m +'" class="';
					if( march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN ) code += 'raid ';
					if( march.marchType == window.cm.MARCH_STATUS.MARCH_STATUS_DEFENDING ) code += 'reinforcement ';
					code += '">';
					//actions
					code += '<td>';
					if( march.marchType != window.cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN ){
						if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_OUTBOUND && ts + 60 < march.destinationUnixTime ){
							code += '<button class="button danger recall"><span>Rappel</span></button>';
						} else if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_DEFENDING ){
							code += '<button class="button danger undefend"><span>Rappel</span></button>';
						}
					} else {
						hasBot = true;

						//barbarian automatic raid
						if( march.botMarchStatus == window.cm.BOT_STATUS.BOT_MARCH_STOPPED ){
							code += '<button class="button danger resume"><span>Relance</span></button>';
						} else if( march.botMarchStatus != window.cm.BOT_STATUS.BOT_MARCH_STOPPING ){
							code += '<button class="button danger stop"><span>Stop</span></button>';
						}
					}
					code += '</td>';

					//status
					code += '<td>';
					code += '<img src="'+ window.stimgUrl + 'img/';
					eta = 0;
					status = '';
					if( march.hasOwnProperty('destinationUnixTime') ){
						if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_STOPPED ){
							eta = 0;
						} else if( ts < parseInt(march.destinationUnixTime, 10) ){
							eta = parseInt(march.destinationUnixTime, 10) - ts;
						} else if( march.marchStatus != window.cm.MARCH_STATUS.MARCH_STATUS_DEFENDING ){
							eta = parseInt(march.returnUnixTime, 10) - ts;
						}
					}

					if( eta > 0 && march.marchStatus != window.cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN ){
						if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_RETURNING ){
							code += 'returning.jpg';
						} else if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN
								|| march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_DEFENDING
								|| march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REINFORCE
						){
							code += 'reinforce.jpg';
						} else if( march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT
								|| march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_DARK_FOREST_SCOUT
						){
							code += 'scouting.jpg';
						} else if( march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_TRANSPORT
								|| march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REASSIGN
						){
							code += 'transporting.jpg';
						} else {
							code += 'attacking.jpg';
						}
					} else {
						if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_STOPPED ){
							code += 'autoAttack/raid_stopped_desat.png';
						} else if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_RESTING
								|| (
									(march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN
									|| march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_RETURNING)
									&& march.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN
									&& ts >= parseInt(march.returnUnixTime, 10)
								)
						){
							code += 'autoAttack/raid_resting.png';
						} else {
							code += 'reinforce.jpg';
						}
					}
					code += '">';

					//timers
					timeReturn = null;
					timeDestination = null;
					if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_RETURNING ){
						if( march.hasOwnProperty('returnUnixTime') && march.returnUnixTime !== '' ) timeReturn = new Date( parseInt(march.returnUnixTime, 10) * 1000 );
						else if( march.hasOwnProperty('returnEta') && march.returnEta !== '' ){
							tmp = reggie.exec(march.returnEta);
							timeReturn = new Date(parseInt(tmp[1], 10), parseInt(tmp[2], 10) - 1, parseInt(tmp[3], 10), parseInt(tmp[4], 10), parseInt(tmp[5], 10), parseInt(tmp[6], 10));
						}
					} else if( march.marchStatus != window.cm.MARCH_STATUS.MARCH_STATUS_STOPPED
						&& march.marchStatus != window.cm.MARCH_STATUS.MARCH_STATUS_UNKNOWN
						&& march.marchStatus != window.cm.MARCH_STATUS.MARCH_STATUS_RESTING
					){
						if( march.hasOwnProperty('destinationUnixTime') && march.destinationUnixTime !== '' ) timeDestination = new Date( parseInt(march.destinationUnixTime, 10) * 1000 );
						else if( march.hasOwnProperty('destinationEta') && march.destinationEta !== '' ){
							tmp = reggie.exec(march.destinationEta);
							timeDestination = new Date(parseInt(tmp[1], 10), parseInt(tmp[2], 10) - 1, parseInt(tmp[3], 10), parseInt(tmp[4], 10), parseInt(tmp[5], 10), parseInt(tmp[6], 10));

							time = timeDestination.getTime() * 1000 - ts;
							if( time > 61 ){
								KOCFIA.marches.recallTimeouts[ cityKey ][ m ] = window.setTimeout(function(){
									KOCFIA.marches.removeRecall( cityKey, marchKey );
								}, time - 60);
							}
						}

						if( march.hasOwnProperty('returnUnixTime') && march.returnUnixTime !== '' ) timeReturn = new Date( parseInt(march.returnUnixTime, 10) * 1000 );
						else if( march.hasOwnProperty('returnEta') && march.returnEta !== '' ){
							tmp = reggie.exec(march.returnEta);
							timeReturn = new Date(parseInt(tmp[1], 10), parseInt(tmp[2], 10) - 1, parseInt(tmp[3], 10), parseInt(tmp[4], 10), parseInt(tmp[5], 10), parseInt(tmp[6], 10));
						}
					}

					if( timeDestination !== null ){
						hours = timeDestination.getHours();
						minutes = timeDestination.getMinutes();
						seconds = timeDestination.getSeconds();

						time = (hours < 10 ? '0'+ hours : hours) +':'+ (minutes < 10 ? '0'+ minutes : minutes) +':'+ (seconds < 10 ? '0'+ seconds : seconds);
						code += 'Arrivée '+ time +' ';
					}

					if( timeReturn !== null ){
						hours = timeReturn.getHours();
						minutes = timeReturn.getMinutes();
						seconds = timeReturn.getSeconds();

						time = (hours < 10 ? '0'+ hours : hours) +':'+ (minutes < 10 ? '0'+ minutes : minutes) +':'+ (seconds < 10 ? '0'+ seconds : seconds);
						code += 'Retour '+ time;
					}

					code += '</td>';

					//coordinates
					code += '<td>'+ Shared.mapLink( march.toXCoord +','+ march.toYCoord ) +'</td>';

					//type
					code += '<td>';
					if( march.toTileType == 51 ){
						if( parseInt(march.toCityId, 10) > 0 ){
							march.toTileType = 511; //city
						} else {
							march.toTileType = 512; //barbarian
						}
					}

					player = '';
					city = null;
					if( parseInt(march.toPlayerId, 10) > 0 ){
						player = window.seed.players['u'+ march.toPlayerId] || 'inconnu';

						if( KOCFIA.kabamuid == march.toPlayerId && KOCFIA.cities.hasOwnProperty('city'+ march.toCityId) ){
							player = ''; //no need of self name...
							city = KOCFIA.cities['city'+ march.toCityId] || null;
						}
					}

					code += (KOCFIA.marchesTypes[ march.marchType ] || '?') +' ';
					if( player.length > 0 ) code += player +' ';
					if( city ) code += city.label +' ';
					code += (KOCFIA.tilesTypes[ march.toTileType ] || '?') +' ';
					code += march.toTileLevel;
					code += '</td>';

					//troops
					code += '<td><ul>';
					if( march.marchStatus == window.cm.MARCH_STATUS.MARCH_STATUS_OUTBOUND ){
						for( i = 0; i <= 12; i += 1 ){
							if( march['unit'+ i +'Count'] > 0 ){
								info = KOCFIA.unitInfo['unt'+ i];
								code += '<li><img src="'+ info.icon +'" title="'+ info.label +'">&nbsp;<span title="'+ Shared.readable(march['unit'+ i +'Count']) +'">'+ Shared.format(march['unit'+ i +'Count']) +'</span></li>';
							}
						}
					} else { //returning troops
						for( i = 0; i <= 12; i += 1 ){
							if( march['unit'+ i +'Count'] > 0 ){
								info = KOCFIA.unitInfo['unt'+ i];
								code += '<li><img src="'+ info.icon +'" title="'+ info.label +'">&nbsp;<span title="'+ Shared.readable(march['unit'+ i +'Return']) +'">'+ Shared.format(march['unit'+ i +'Return']) +'</span>&nbsp;(<span title="'+ Shared.readable(march['unit'+ i +'Count']) +'">'+ Shared.format(march['unit'+ i +'Count']) +'</span>)</li>';
							}
						}
					}
					code += '</ul></td>';

					//booty
					code += '<td><ul>';
					for( i = 0; i < KOCFIA.resources.length; i += 1 ){
						res = KOCFIA.resources[ i ];
						amount = march[ res.name.replace(/x3600/, '') ];
						if( amount > 0 ){
							code += '<li><img src="'+ res.icon +'" title="'+ res.label +'">&nbsp;<span title="'+ Shared.readable(amount) +'">'+ Shared.format(amount) +'</span></li>';
						}
					}
					code += '</ul></td>';
					code += '</tr>';
				}
			}

			code = '<tbody data-city="'+ cityKey +'" class="'+ (hasBot ? 'withBot' : '') +'">'+ code +'</tbody>';

			return code;
		};

		KOCFIA.marches.botAction = function( marchKey, cityKey, type, attempts, dfd ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches botAction function');

			var params = $.extend({}, window.g_ajaxparams);

			params.ctrl = 'BotManager';
			params.action = type;
			params.settings = {};
			params.settings.cityId = cityKey.replace(/city/, '');
			if( marchKey !== null ){
				params.settings.marchId = marchKey.replace(/m/, '');
			}

			$.ajax({
				url: window.g_ajaxpath + "ajax/_dispatch.php" + window.g_ajaxsuffix,
				type: 'post',
				data: params,
				dataType: 'json',
				timeout: 10000
			})
			.done(function( result ){
				if( result.ok ){
					return dfd.resolve();
				} else {
					attempts -= 1;
					if( attempts > 0 ){
						return dfd.pipe( KOCFIA.marches.botAction( marchKey, cityKey, type, attempts, dfd ) );
					}
				}
			})
			.fail(function(){
				attempts -= 1;
				if( attempts > 0 ){
					return dfd.pipe( KOCFIA.marches.botAction( marchKey, cityKey, type, attempts, dfd ) );
				}
			});
		};

		KOCFIA.marches.kickoutReinforcements = function( marchKey, cityKey ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('marches') ) console.info('KOCFIA marches kickoutReinforcements function');

			var params = $.extend({}, window.g_ajaxparams),
				march = window.seed.queue_atkinc[ marchKey ];

			if( march ){
				params.mid = marchKey.replace(/m/, '');
				params.cid = cityKey.replace(/city/, '');
				params.fromUid = march.fromCityId;
				params.fromCid = march.toCityId;

				$.ajax({
					url: window.g_ajaxpath + "ajax/kickoutReinforcements.php" + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function( result ){
					if( result.ok ){
						var upkeep = 0, unitKey, unit;
						for( unitKey in window.cm.UNIT_TYPES ){
							if( window.cm.UNIT_TYPES.hasOwnProperty(unitKey) ){
								unit = cm.UNIT_TYPES[unitKey];
								upkeep += parseInt(march["unit"+ unit +"Return"], 10) * parseInt(window.unitupkeeps[ unit ], 10);
							}
						}

						window.seed.resources[ cityKey ].rec1[3] = parseInt(window.seed.resources["city" + currentcityid].rec1[3], 10) - upkeep;

						if( parseInt(march.fromUid, 10) == parseInt(window.tvuid, 10) ){
							var curmarch = window.seed.queue_atkp['city' + march.fromCityId][ marchKey ];
							var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime, 10) - parseInt(curmarch.eventUnixTime, 10));
							curmarch.returnUnixTime = Date.timestamp() + marchtime;
							curmarch.marchStatus = 8;
						}

						delete window.seed.queue_atkinc[ marchKey ];

						if( KOCFIA.conf.alarm.on ){
							delete KOCFIA.alarm.incomings[ marchKey ];
							delete KOCFIA.alarm.summary[ marchKey ];
							KOCFIA.alarm.summarize();
						}
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( KOCFIA.marches.botAction( marchKey, cityKey, type, attempts, dfd ) );
						}
					}
				})
				.fail(function(){
					attempts -= 1;
					if( attempts > 0 ){
						return dfd.pipe( KOCFIA.marches.botAction( marchKey, cityKey, type, attempts, dfd ) );
					}
				});
			}
		};

	/* QUICK MARCH */
		KOCFIA.quickMarch = {
			options: {
				active: 0
			},
			stored: []
		};

		KOCFIA.quickMarch.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.quickMarch +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('quickMarch', 'active', 'Activer', KOCFIA.conf.quickMarch.active);
			code += '</div>';

			$section.append( code );

			KOCFIA.quickMarch.$form = $section.find('.form');
		};

		KOCFIA.quickMarch.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-quickMarch').html('');

			$section.html( KOCFIA.quickMarch.getForm() );

			KOCFIA.quickMarch.$form = $section.find('.form');

			KOCFIA.quickMarch.formListeners();
		};

		KOCFIA.quickMarch.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch on function');
		};

		KOCFIA.quickMarch.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch off function');
		};

		KOCFIA.quickMarch.getUnits = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getUnits function');
			var cityKeyFrom = KOCFIA.quickMarch.$form.find('.from').find('input').filter(':checked').val(),
				units = window.seed.units[ cityKeyFrom ],
				cityKeyTo = KOCFIA.quickMarch.$form.find('.to').find('input').filter(':checked').val(),
				coord = $.trim( KOCFIA.quickMarch.$form.find('.coord').val() ),
				code = '',
				n, i, u, d, info;

			if( units ){
				for( u in units ){
					if( units.hasOwnProperty(u) ){
						n = parseInt(units[ u ], 10);
						if( n > 0 ){
							info = KOCFIA.unitInfo[u];
							d = Shared.getDuration( cityKeyFrom, cityKeyTo, coord, u, KOCFIA.quickMarch.$form.find('.type').find('input').filter(':checked').val() || 'transport' );
							code += '<button class="button secondary" rel="'+ u +'" title="'+ info.label + ' - ' + Shared.readable(n) +' - '+ (d !== '' ? Shared.readableDuration( d ) : '') +'">';
							code += '<img src="'+ info.icon +'">';
							code += '<span>'+ Shared.format(n);
							code += (d !== '' ? '<br>'+ Shared.readableDuration( d ) : '');
							code += '</span>';
							code += '</button>';
						}
					}
				}
			}

			return code;
		};

		KOCFIA.quickMarch.getLoadCapacity = function( units, itemBoost ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getLoadCapacity function');
			var load = 0, i, l, u,
				loadBoost,
				techLoadBoost = parseInt(window.seed.tech.tch10, 10) * 0.1,
				loadEffectBoost = 0,
				ts = Date.timestamp();

			if( window.seed.playerEffects.loadExpire > ts || itemBoost ){
				loadEffectBoost = 0.25;
			}
			var loadBoostBase = (window.cm.ThroneController.effectBonus(6) * 0.01) + loadEffectBoost + techLoadBoost;

			for( i = 0; i < units.length; i += 1 ){
				u = units[i];
				if( window.unitstats.hasOwnProperty(u.id) ){
					loadBoost = loadBoostBase;
					if( window.cm.unitFrontendType[ u.id ] == 'siege' ){
						loadBoost += (window.cm.ThroneController.effectBonus(59) * 0.01);
					} else if( window.cm.unitFrontendType[ u.id ] == 'horsed' ){
						loadBoost += (window.cm.ThroneController.effectBonus(48) * 0.01);
					}
					load += u.qty * parseInt(window.unitstats[u.id][5], 10) * (1 + loadBoost);
				}
			}
			load = parseInt(load, 10);
			if( isNaN(load) ) load = false;
			return load;
		};

		KOCFIA.quickMarch.getTroopQuantityForLoad = function( units, quantity, itemBoost ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getTroopQuantityForLoad function');
			var load = 0, i, l, u,
				loadBoost,
				techLoadBoost = parseInt(window.seed.tech.tch10, 10) * 0.1,
				loadEffectBoost = 0,
				ts = Date.timestamp();

			if( window.seed.playerEffects.loadExpire > ts || itemBoost ){
				loadEffectBoost = 0.25;
			}
			var loadBoostBase = (cm.ThroneController.effectBonus(6) * 0.01) + loadEffectBoost + techLoadBoost;

			for( i = 0; i < units.length; i += 1 ){
				u = units[i];
				if( window.unitstats.hasOwnProperty(u.id) ){
					loadBoost = loadBoostBase;
					if( window.cm.unitFrontendType[ u.id ] == 'siege' ){
						loadBoost += (window.cm.ThroneController.effectBonus(59) * 0.01);
					} else if( window.cm.unitFrontendType[ u.id ] == 'horsed' ){
						loadBoost += (window.cm.ThroneController.effectBonus(48) * 0.01);
					}

					load += u.qty * parseInt(window.unitstats[u.id][5], 10) * (1 + loadBoost);
				}
			}
			load = parseInt(load, 10);
			if( isNaN(load) ) return false;
			if( load === 0 ) return false;

			return Math.ceil( quantity / load );
		};

		KOCFIA.quickMarch.getResources = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getResources function');
			var cityKey = KOCFIA.quickMarch.$form.find('.from').find('input').filter(':checked').val(),
				code = '', i, type, inSeed, n,
				res = window.seed.resources[ cityKey ],
				gold = window.seed.citystats[ cityKey ].gold;

			for( i = 0; i < KOCFIA.resources.length; i += 1 ){
				type = KOCFIA.resources[i];
				inSeed = KOCFIA.inSeed.resources[ type.name ];

				if( inSeed ){
					if( inSeed.hasOwnProperty('type') ){
						n = parseFloat( res[ inSeed.type ][ inSeed.index ] );
					} else {
						n = parseFloat( gold[ inSeed.index ] );
					}

					if( n > 0 ){
						if( type.name.indexOf('x3600') > -1 ) n = n / 3600;

						code += '<button class="button secondary" rel="'+ type.key +'" title="'+ type.label +' - '+ Shared.readable(n) +'">';
						code += '<img src="'+ type.icon +'" alt="'+ type.label +'">';
						code += '<span>'+ Shared.format(n) +'</span>';
						code += '</button>';
					}
				}
			}

			return code;
		};

		KOCFIA.quickMarch.getResourcesSum = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getResourcesSum function');

			var sum = 0, nb;
			KOCFIA.quickMarch.$form.find('.resource').find('.chosen').find('input').each(function(){
				nb = $.trim( this.value );
				nb = Shared.decodeFormat(nb);
				if( nb !== false ){
					if( this.name == 'rec5' ){
						sum += nb * 5;
					} else sum += nb;
				}
			});

			return sum;
		};

		KOCFIA.quickMarch.getResourcesMax = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getResourcesMax function');

			//list units
			var units = [], nb;
			KOCFIA.quickMarch.$form.find('.troop').find('.chosen').find('input').each(function(){
				nb = $.trim( this.value );
				nb = Shared.decodeFormat(nb);
				if( nb !== false ){
					units.push({id: this.name, qty: nb});
				}
			});

			//get total load capacity
			var maxLoad = KOCFIA.quickMarch.getLoadCapacity( units, null );
			if( maxLoad === false ) maxLoad = 0;

			return maxLoad;
		};

		KOCFIA.quickMarch.checkTarget = function(coord, attempts){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch checkTarget function', coord);
			var cParams = jQuery.extend(true, {}, window.g_ajaxparams);

			KOCFIA.quickMarch.$form.find('.info').css('visibility', 'hidden').html('');

			//check if quickMarch level has changed
			cParams.blocks = "bl_" + coord.x + "_bt_" + coord.y;
			$.ajax({
				url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
				type: 'post',
				data: cParams,
				dataType: 'json',
				timeout: 10000
			})
			.done(function(result){
				if( result.data ){
					var tile = result.data['l_'+ coord[0] +'_t_'+ coord[1]],
						user, info = {};
					if( tile ){
						//city
							if( tile.tileType == 51 ){
								if( tile.tileCityId !== null ){
									user = result.userInfo['u'+ tile.tileUserId];

									info.id = tile.tileUserId;
									info.name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;
									info.label = 'Ville '+ tile.tileLevel;

								} else {
						//barbarian
									info.label = 'Camp barbare '+ tile.tileLevel;
								}
						//city
							} else if( tile.tileType == 53 ){
								info.label = 'Ville sous brumes';
						//dark forest
							} else if( tile.tileType == 54 ){
								info.label = 'Forêt obscure '+ tile.tileLevel;
						//bog
							} else if( tile.tileType === 0 ){
								info.label = 'Marais '+ tile.tileLevel;
						//wilderness
							} else if( tile.tileType >= 10 && tile.tileType <= 50 ){
								info.label = 'Terre sauvage '+ tile.tileLevel;

								if( tile.tileUserId !== null ){
									if( tile.tileUserId != "0" ){
										user = result.userInfo['u'+ tile.tileUserId];
										info.id = tile.tileUserId;
										info.name = (user.s == 'M' ? 'Lord' : 'Lady') + ' ' + user.n;
									}
								}
							}

						var code = info.label;
						if( info.hasOwnProperty(id) ){
							code += ' - '+ info.name +' <span class="status" rel="'+ info.id +'"></span>';
						}
						KOCFIA.quickMarch.$form.find('.info').show().html( code ).find('.status').trigger('click');
					}
				} else {
					attempts -= 1;
					if( attempts > 0 ){
						KOCFIA.quickMarch.checkTarget(coord, attempts);
					}
				}
			})
			.fail(function(){
				attempts -= 1;
				if( attempts > 0 ){
					KOCFIA.quickMarch.checkTarget(coord, attempts);
				}
			});
		};

		KOCFIA.quickMarch.getForm = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch getForm function');
			var c, city;

			var form = '<h3>Marche manuelle</h3>';
			form += '<div class="form">';

			form += '<label>Type&nbsp;:&nbsp;</label><div class="buttonset type">';
			form += '<input type="radio" name="type" value="4" id="kocfia-quickMarch-type-attack" required>';
			form += '<label for="kocfia-quickMarch-type-attack">Attaque</label>';
			form += '<input type="radio" name="type" value="3" id="kocfia-quickMarch-type-scout" required>';
			form += '<label for="kocfia-quickMarch-type-scout">Éclairage</label>';
			form += '<input type="radio" name="type" value="2" id="kocfia-quickMarch-type-reinforce" checked required>';
			form += '<label for="kocfia-quickMarch-type-reinforce">Renfort</label>';
			form += '<input type="radio" name="type" value="1" id="kocfia-quickMarch-type-transport" required>';
			form += '<label for="kocfia-quickMarch-type-transport">Transport</label>';
			form += '<input type="radio" name="type" value="5" id="kocfia-quickMarch-type-reassign" required>';
			form += '<label for="kocfia-quickMarch-type-reassign">Réassignement</label>';
			form += '</div>';

			form += '<br><br><label>Depuis&nbsp;:&nbsp;</label><div class="from buttonset">';
			for( c in KOCFIA.cities ){
				if( KOCFIA.cities.hasOwnProperty(c) ){
					city = KOCFIA.cities[ c ];
					form += '<input type="radio" name="from" value="'+ c +'" id="kocfia-quickMarch-manual-from-'+ c +'" required autocomplete="off">';
					form += '<label for="kocfia-quickMarch-manual-from-'+ c +'">'+ city.label +'</label>';
				}
			}
			form += '</div>';

			form += '<br><br><label>Vers&nbsp;:&nbsp;</label>';
			form += '<input type="text" name="coord" class="coord" pattern="'+ Shared.coordRegExp +'">';
			form += '&nbsp;ou&nbsp;<div class="to buttonset">';
			for( c in KOCFIA.cities ){
				if( KOCFIA.cities.hasOwnProperty(c) ){
					city = KOCFIA.cities[ c ];
					form += '<input type="radio" name="to" value="'+ c +'" id="kocfia-quickMarch-manual-to-'+ c +'" required autocomplete="off">';
					form += '<label for="kocfia-quickMarch-manual-to-'+ c +'">'+ city.label +'</label>';
				}
			}
			form += '</div>';

			form += '<div class="info"></div>'; //for target info when using coordinates

			form += '<div class="troop">';
			form += '<span class="ui-icon ui-icon-refresh refresh" title="Recharge les troupes disponible"></span>';
			form += '<label>Troupes&nbsp;:&nbsp;</label>';
			form += '<div class="available"></div>';
			form += '<div class="chosen"></div>';
			form += '</div>';

			form += '<div class="resource">';
			form += '<span class="ui-icon ui-icon-refresh refresh" title="Recharge les ressources disponible"></span>';
			form += '<label>Ressources&nbsp;:&nbsp;</label>';
			form += '<div class="available"></div>';
			form += '<div class="sums"><output class="sum"></output> / <output class="max"></output></div>';
			form += '<div class="chosen"></div>';
			form += '</div>';

			form += '<div class="knight">';
			form += '<span class="ui-icon ui-icon-refresh refresh" title="Recharge les chevaliers disponible"></span>';
			form += '<label>Chevaliers&nbsp;:&nbsp;</label>';
			form += '<select class="available"></select>';
			form += '</div>';

			form += '<span class="ui-icon ui-icon-refresh refresh" title="Recharge les objets disponible"></span>';
			form += '<label>Boosts&nbsp;:&nbsp;</label>';
			form += '<div class="items buttonset"></div>';

			form += '<div class="buttons">';
			form += '<button class="launch button">Envoyer</button>';
			form += '<button class="reset button danger">Annuler</button>';
			form += '</div>';

			form += '</div>';

			return form;
		};

		KOCFIA.quickMarch.formListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch addManualFormListeners function');

			var unitLimit;

			var $troop = KOCFIA.quickMarch.$form.find('.troop'),
				$resource = KOCFIA.quickMarch.$form.find('.resource'),
				$knight = KOCFIA.quickMarch.$form.find('.knight'),
				$from = KOCFIA.quickMarch.$form.find('.from').find('input'),
				$to = KOCFIA.quickMarch.$form.find('.to').find('input'),
				$coord = KOCFIA.quickMarch.$form.find('.coord');

			KOCFIA.quickMarch.$form
				//march type
				.on('change', '.type input', function(){
					KOCFIA.quickMarch.$form.trigger('getAndSetTroops');
				})
				//city from and to
				.on('change', '.from input, .to input', function(){
					$('.tipsy').remove();
					KOCFIA.quickMarch.$form.trigger('getAndSetTroops');
					KOCFIA.quickMarch.$form.trigger('getAndSetResources');
					KOCFIA.quickMarch.$form.trigger('getAndSetKnights');
					KOCFIA.quickMarch.$form.trigger('getAndSetClosestFrom');
				})
				.on('change', '.from input', function(){
					KOCFIA.quickMarch.$form.trigger('getItems');
					KOCFIA.quickMarch.$form.trigger('updateLimit');
				})
				.on('change', '.to input', function(){
					$coord.val('');
				})
				.on('keyup, change', '.coord', function(){
					$('.tipsy').remove();
					$to.prop('checked', false);
					if( $from.filter(':checked').length ){
						KOCFIA.quickMarch.$form.trigger('getAndSetTroops');
					}
					KOCFIA.quickMarch.$form.trigger('getAndSetClosestFrom');

					var coord = Shared.checkCoord( $(this).val() );
					if( coord !== false ){
						KOCFIA.quickMarch.checkTarget( coord, 3 );
					}
				})
				.on('getAndSetKnights', function(){
					var cityKey = $from.filter(':checked').val(),
						knights = Shared.getAvailableKnights( cityKey ),
						$available = $knight.find('.available').show();

					if( knights.length ){
						var current = $available.val(),
							code = '<option value="">Choisir (optionnel)</option>',
							sorted = [], i, c, knight,
							timestamp = Date.timestamp();

						for( i = 0; i < knights.length; i += 1 ){
							c = parseInt(knights[i].combat, 10);
							if( parseInt(knights[i].combatBoostExpireUnixtime, 10) > timestamp ) c = c * 1.25;

							sorted.push({knight: knights[i], combat: c});
						}

						sorted.sort(function(a, b){ return b.combat - a.combat; });

						for( i = 0; i < sorted.length; i += 1 ){
							knight = sorted[i].knight;
							code += '<option value="k'+ knight.knightId +'">'+ knight.knightName +' ('+ Shared.getKnightStatText(knight) +')</option>';
						}

						$available.removeAttr('disabled').html( code );
					} else {
						$available.attr('disabled', 'disabled').html('<option value="">Aucun chevalier disponible</option>');
					}
				})
				.on('getAndSetTroops', function(){
					$troop.find('.available').html( KOCFIA.quickMarch.getUnits() );
				})
				.on('getAndSetResources', function(){
					$resource.find('.available').html( KOCFIA.quickMarch.getResources() );

					KOCFIA.quickMarch.$form.trigger('updateResourcesMaxAndSum');
				})
				.on('updateResourcesMaxAndSum', function(){
					var sum = KOCFIA.quickMarch.getResourcesSum(),
						max = KOCFIA.quickMarch.getResourcesMax();

					$resource.find('.sums').show().toggleClass('warning', sum > max)
							.find('.sum').html( Shared.format( sum ) ).attr('title', Shared.readable( sum )).end()
							.find('.max').html( Shared.format( max ) ).attr('title', Shared.readable( max ));
				})
				.on('getAndSetClosestFrom', function(){
					var toCityKey = $to.filter(':checked').val(),
						coord = $.trim( $coord.val() ),
						toX, toY, city, i, min, closest, distance;

					$from.removeClass('closest');
					if( toCityKey !== null ){
						city = KOCFIA.cities[ toCityKey ];
						toX = city.coords.x;
						toY = city.coords.y;

					} else if( coord !== '' ){
						coord = Shared.checkCoord( coord );
						if( coord !== false ){
							toX = coord.x;
							toY = coord.y;
						}
					}

					if( toX !== null && toY !== null ){
						min = 999;
						for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
							city = KOCFIA.cities[ KOCFIA.citiesKey[i] ];

							distance = Shared.getDistance( city.coord.x, city.coord.y, toX, toY );
							if( distance < min ){
								min = distance;
								closest = KOCFIA.citiesKey[i];
							}
						}

						if( closest !== null ) $('#kocfia-quickMarch-manual-from-'+ closest).addClass('closest');
					}
				})
				.on('updateLimit', function(){
					var hasAuraBoost = $('#kocfia-quickMarch-item-285').prop('checked') || false,
						hasAura2Boost = $('#kocfia-quickMarch-item-286').prop('checked') || false,
						hasMarchBoost = $('#kocfia-quickMarch-item-931').prop('checked') || false,
						hasMarch2Boost = $('#kocfia-quickMarch-item-932').prop('checked') || false;

					unitLimit = Shared.getUnitLimit( $from.filter(':checked').val(), hasAuraBoost, hasAura2Boost, hasMarchBoost, hasMarch2Boost );
				})
				.on('getItems', function(){
					var items = [55, 57, 931, 932, 276, 277, 278, 285, 286], //speed, load, unit number limit boosts
						info, key, i, code = '', nb;
					for( i = 0; i < items.length; i += 1 ){
						key = 'i' + items[i];
						nb = parseInt(window.seed.items[ key ], 10);
						if( nb > 1 ){
							info = window.itemlist[ key ];
							code += '<input type="checkbox" value="'+ items[i] +'" id="kocfia-quickMarch-item-'+ items[i] +'">';
							code += '<label for="kocfia-quickMarch-item-'+ items[i] +'" data-count="'+ nb +'" title="'+ info.name +' ('+ nb +') - '+ info.description +'">';
							code += '<img src="'+ window.stimgUrl +'img/items/70/'+ items[i] +'.jpg">';
							code += '</label>';
						}
					}

					KOCFIA.quickMarch.$form.find('.items').html( code );
				})
				.on('click', '.refresh', function(){
					if( $from.filter(':checked').length ){
						KOCFIA.quickMarch.$form.trigger('getAndSetTroops');
						KOCFIA.quickMarch.$form.trigger('getAndSetResources');
						KOCFIA.quickMarch.$form.trigger('getAndSetKnights');
					}
					KOCFIA.quickMarch.$form.trigger('getItems');
					KOCFIA.quickMarch.$form.trigger('updateLimit');
				})
				//revert radios or select for troops change
				.on('click', '.troop .available button', function(){
					var rel = $(this).attr('rel'),
						$chosen = $troop.find('.chosen'),
						$input = $chosen.find('input').filter('[name="'+ rel +'"]');

					if( $input.length ) $input.focus();
					else {
						var code = '', info;
						info = KOCFIA.unitInfo[ rel ];
						code += '<div class="tro">';
						code += '<span class="ui-icon ui-icon-trash remove"></span>';
						code += '<label title="'+ info.label +'"><img src="'+ info.icon +'"></label>&nbsp;';
						code += '<input type="text" name="'+ rel +'" value="" required pattern="'+ Shared.numberRegExp +'">';
						code += '<button class="minTroop button secondary" title="Calculer le minimum de cette troupe nécessaire pour transporter les ressources définies">Minimum</buton>';
						code += '<button class="maxTroop button secondary" title="Calculer la quantité maximum de cette troupe">Maximum</buton>';
						code += '</div>';

						$chosen.append( code );
					}

					KOCFIA.quickMarch.$form.find('.buttons').show();
				})
				//unit change, force max at available
				.on('keyup', '.chosen .tro input', function(){
					var unit = this.name,
						quantity = $.trim( this.value );

					if( quantity !== '' ) quantity = Shared.decodeFormat( quantity );
					if( quantity === false ) return;

					if( quantity > unitLimit ){
						quantity = unitLimit;
						this.value = Shared.readable( quantity );
					}

					var cityKey = $from.filter(':checked').val(),
						available = 0;
					if( cityKey ){
						available = parseInt(window.seed.units[ cityKey ][ unit ], 10);
						if( isNaN(available) ) available = false;
					}

					if( available && available <= quantity ){
						this.value = Shared.readable( available );
					} else {
						this.value = 0;
					}
				})
				//resources
				.on('click', '.resources .available button', function(){
					var $this = $(this).blur(),
						rel = $this.attr('rel'),
						$chosen = $res.find('.chosen'),
						$input = $chosen.find('input').filter('[name="'+ rel +'"]');

					if( $input.length ) $input.focus();
					else {
						var code = '', info;
						info = KOCFIA.resourceInfo[ rel ];
						code += '<div class="res">';
						code += '<span class="ui-icon ui-icon-trash remove"></span>';
						code += '<label title="'+ info.label +'"><img src="'+ info.icon +'"></label>&nbsp;';
						code += '<input type="text" name="'+ rel +'" value="" required pattern="'+ Shared.numberRegExp +'">';
						code += '<button class="maxLoad button secondary" title="Calculer le maximum transportable de cette ressource pour les troupes définies">Maximum</buton>';
						code += '</div>';

						$chosen.append( code );
					}
				})
				//chosen removal
				.on('click', '.remove', function(){
					$(this).closest('div').remove();

					KOCFIA.quickMarch.$form.trigger('updateResourcesMaxAndSum');
				})
				//maximise unit quantity
				.on('click', '.maxTroop', function(){
					var troops = 0,
						nb, quantity,
						$unitChosen = $troop.find('.chosen').find('input'),
						units = [],
						$input = $(this).siblings('input'),
						currentUnit = $input.attr('name');

					$unitChosen.each(function(){
						if( this.name != currentUnit ){
							nb = $.trim( this.value );
							nb = Shared.decodeFormat(nb);
							if( nb !== false ){
								troops += nb;
							}
						}
					});

					quantity = unitLimit - troops;

					if( quantity > 0 ){
						var cityKey = $from.filter(':checked').val(),
							available = 0;
						if( cityKey ){
							available = parseInt(window.seed.units[ cityKey ][ currentUnit ], 10);
							if( isNaN(available) ) available = false;
						}

						if( available && available <= quantity ){
							$input.val( Shared.readable( available ) );
						} else {
							$input.val( 0 );
						}
					} else {
						$input.val( 0 );
					}
				})
				//minimise unit quantity
				.on('click', '.minTroop', function(){
					var $resChosen = $resource.find('.chosen').find('input'),
						resources = 0,
						troops = 0,
						nb,
						$unitChosen = $troop.find('.chosen').find('input'),
						units = [],
						loadBoost = false,
						$input = $(this).siblings('input'),
						currentUnit = $input.attr('name'),
						currentQty = Shared.decodeFormat( $.trim( $input.val() ) ),
						timestamp = Date.timestamp();

					if( window.seed.playerEffects.loadExpire > timestamp ){
						loadBoost = true;
					} else if( $('#kocfia-quickMarch-item-276').prop('checked')
							|| $('#kocfia-quickMarch-item-277').prop('checked')
							|| $('#kocfia-quickMarch-item-278').prop('checked')
					){
						loadBoost = true;
					}

					if( $unitChosen.length === 1 ){
						units.push({id: currentUnit, qty: 1});
					} else {
						$unitChosen.each(function(){
							if( this.name != currentUnit ){
								nb = $.trim( this.value );
								nb = Shared.decodeFormat(nb);
								if( nb !== false ){
									troops += nb;
									units.push({id: this.name, qty: nb});
								}
							}
						});
					}

					$resChosen.each(function(){
						nb = $.trim( this.value );
						nb = Shared.decodeFormat(nb);
						if( nb !== false ){
							if( this.name == 'rec5' ) nb *= 5; //ether stone
							resources += nb;
						}
					});

					if( currentQty === false ) currentQty = 0;
					if( $unitChosen.length === 1 ){
						currentQty = 0;
						troops = 0;
					}
					resources = resources - currentQty;

					var needed = KOCFIA.quickMarch.getTroopQuantityForLoad( units, resources, loadBoost );
					if( needed !== false ){
						needed -= troops;
						if( needed > unitLimit ) needed = unitLimit;

						$input.val( Shared.readable( needed ) ).trigger('keyup');
					}
				})
				//maximise load
				.on('click', '.maxLoad', function(){
					var $resChosen = $res.find('.chosen').find('input'),
						resources = 0, troops = 0, nb,
						$unitChosen = $troop.find('.chosen').find('input'),
						units = [],
						loadBoost = false,
						$input = $(this).siblings('input'),
						currentRes = $input.attr('name'),
						currentQty = Shared.decodeFormat( $.trim( $input.val() ) ),
						timestamp = Date.timestamp();

					if( window.seed.playerEffects.loadExpire > timestamp ){
						loadBoost = true;
					} else if( $('#kocfia-quickMarch-item-276').prop('checked')
							|| $('#kocfia-quickMarch-item-277').prop('checked')
							|| $('#kocfia-quickMarch-item-278').prop('checked')
					){
						loadBoost = true;
					}

					$unitChosen.each(function(){
						nb = $.trim( this.value );
						nb = Shared.decodeFormat(nb);
						if( nb !== false ){
							troops += nb;
							units.push({id: this.name, qty: nb});
						}
					});

					if( $resChosen.length === 1 ){
						resources = 0;
					} else {
						$resChosen.each(function(){
							if( this.name != currentQty ){
								nb = $.trim( this.value );
								nb = Shared.decodeFormat(nb);
								if( nb !== false ){
									if( this.name == 'rec5' ) nb *= 5; //ether stone
									resources += nb;
								}
							}
						});
					}

					if( currentQty === false ) currentQty = 0;
					if( $resChosen.length === 1 ){
						currentQty = 0;
						resources = 0;
					}
					resources = resources - currentQty;

					var maxLoad = KOCFIA.quickMarch.getLoadCapacity( units, loadBoost );
					if( maxLoad !== false ){
						maxLoad -= resources;
						if( $input.attr('name') == 'rec5' ) maxLoad /= 5;
						$input.val( Shared.readable( Math.ceil(maxLoad) ) ).trigger('keyup');
					}
				})
				//items
				.on('change', '.items input', function(){
					var val = this.value;
					//march time
					if( val == '55' ){
						$('#kocfia-quickMarch-item-57').prop('checked', false);
					} else if( val == '57' ){
						$('#kocfia-quickMarch-item-55').prop('checked', false);
					}

					//load boosts
					if( val == '276' ){
						$('#kocfia-quickMarch-item-277').prop('checked', false);
						$('#kocfia-quickMarch-item-278').prop('checked', false);
					} else if( val == '277' ){
						$('#kocfia-quickMarch-item-276').prop('checked', false);
						$('#kocfia-quickMarch-item-278').prop('checked', false);
					} else if( val == '278' ){
						$('#kocfia-quickMarch-item-276').prop('checked', false);
						$('#kocfia-quickMarch-item-277').prop('checked', false);
					}

					//unit quantity limit
					if( val == '285' ){
						$('#kocfia-reassign-item-286').prop('checked', false);
						$('#kocfia-reassign-item-931').prop('checked', false);
						$('#kocfia-reassign-item-932').prop('checked', false);
					} else if( val == '286' ){
						$('#kocfia-reassign-item-285').prop('checked', false);
						$('#kocfia-reassign-item-931').prop('checked', false);
						$('#kocfia-reassign-item-932').prop('checked', false);
					} else if( val == '931' ){
						$('#kocfia-reassign-item-285').prop('checked', false);
						$('#kocfia-reassign-item-286').prop('checked', false);
						$('#kocfia-reassign-item-932').prop('checked', false);
					} else if( val == '932' ){
						$('#kocfia-reassign-item-285').prop('checked', false);
						$('#kocfia-reassign-item-286').prop('checked', false);
						$('#kocfia-reassign-item-931').prop('checked', false);
					}

					if( val == '55' || val == '57' ){
						KOCFIA.quickMarch.$manualForm.trigger('getAndSetTroops');
					}

					if( val == '285' || val == '286' || val == '931' || val == '932' ){
						KOCFIA.quickMarch.$manualForm.trigger('updateLimit');
					}

					KOCFIA.quickMarch.$form.trigger('updateResourcesMaxAndSum');
				})
				//target user online status
				.on('click', '.status', function(){
					Shared.getPlayerInfo( $(this).attr('rel'), this );
				})
				//form reset
				.on('click', '.reset', function(){
					KOCFIA.quickMarch.$form
						.find('.troop, .resource').find('.available, .chosen').html('').end()
						.find('.knight').find('.available').html('').hide().end()
						.find('.items').hide().html('').end()
						.find('.buttons').hide().end()
						.find('.info').css('visibility', 'hidden').html('').end()
						.find('.type, .from, .to').find('input')
							.filter('[type="radio"]').prop('checked', false).end()
							.filter('.coord').val('');
				})
				//form submit
				.on('click', '.launch', function(){
					var result = KOCFIA.quickMarch.planMarch();
					if( result.errors.length ){
						Shared.notify( result.errors.unique() );
					} else {
						Shared.success('Configuration de la marche validé');
						KOCFIA.quickMarch.launchMarch( result.plan );
					}
				});
		};

		KOCFIA.quickMarch.planMarch = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch planMarch function');
			var plan = {},
				errors = [],
				city, nb, res, unit, label,
				gpsFrom = null,
				gpsTo = null;

			//type
			var $type = KOCFIA.quickMarch.$form.find('.type').find('input').filter(':checked');
			if( $type.length ){
				plan.type = $type.val();
			} else {
				errors.push('Vous devez spécifier un type de marche');
			}

			//from
			var $from = KOCFIA.quickMarch.$form.find('.from').find('input').filter(':checked');
			if( $from.length ){
				plan.from = $from.val();
				city = KOCFIA.cities[ plan.from ];
				gpsFrom = city.coords.x +','+ city.coords.y;
			} else {
				errors.push('Vous devez spécifier une ville de départ');
			}

			//to
			var $to = KOCFIA.quickMarch.$form.find('.to').find('input').filter(':checked'),
				coord = $.trim( KOCFIA.quickMarch.$form.find('.coord').val() );
			plan.to = {};
			if( $to.length ){
				city = KOCFIA.cities[ $to.val() ];
				plan.to.x = city.coords.x;
				plan.to.y = city.coords.y;

				gpsTo = plan.to.x +','+ plan.to.y;
			} else if( coord !== '' ){
				var regexp = /[^0-9,]/;
				if( regexp.test( coord ) ){
					errors.push('Pour les coordonnées, veuillez respecter le format x,y');
				} else {
					coord = Shared.checkCoord( coord );
					if( coord !== false ){
						plan.to.x = coord.x;
						plan.to.y = coord.y;
						gpsTo = plan.to.x +','+ plan.to.y;
					} else {
						errors.push('Mauvais format de coordonnée pour la destination (x,y)');
					}
				}
			} else {
				errors.push('Vous devez spécifier une ville ou coordonnée de destination');
			}

			if( gpsFrom !== null && gpsTo !== null && gpsFrom == gpsTo ){
				errors.push('Les coordonnées de départ et de destination doivent être différentes');
			}

			//troop
			var $units = KOCFIA.quickMarch.$form.find('.troop').find('.chosen').find('input');
			if( $units.length ){
				plan.units = [];
				$units.each(function(){
					nb = $.trim( this.value );
					unit = this.name;
					label = KOCFIA.unitInfo[ unit ].labelBis + KOCFIA.unitInfo[ unit ].label;

					if( nb === '' ){
						errors.push('Vous devez spécifier la quantité '+ label +' pour le réassignement');
					} else {
						nb = Shared.decodeFormat( nb );
						if( nb === false ) errors.push('Quantité incorrecte '+ label +' pour le réassignement');
						else if( nb === 0 ) errors.push('Vous devez spécifier la quantité '+ label +' pour le réassignement');
						else plan.units.push({ id: unit, qty: nb });
					}
				});
			} else {
				errors.push('Vous devez spécifier au moins une unité pour le réassignement');
			}

			//knight
			var knight = KOCFIA.quickMarch.$form.find('.knight').find('.available').val();
			if( knight !== '' ){
				plan.knight = knight;
			}

			//resource
			var $resources = KOCFIA.quickMarch.$form.find('.resource').find('.chosen').find('input');
			if( $resources.length ){
				plan.resources = [];
				$resources.each(function(){
					nb = $.trim( this.value );
					res = this.name;
					label = KOCFIA.resourceInfo[ res ].labelBis + KOCFIA.resourceInfo[ res ].label;

					if( nb === '' ){
						errors.push('Vous devez spécifier la quantité '+ label +' pour le réassignement');
					} else {
						nb = Shared.decodeFormat( nb );
						if( nb === false ) errors.push('Quantité incorrecte '+ label +' pour le réassignement');
						else if( nb === 0 ) errors.push('Vous devez spécifier la quantité '+ label +' pour le réassignement');
						else plan.resources.push({ id: res, qty: nb });
					}
				});
			} else {
				errors.push('Vous devez spécifier au moins une unité pour le réassignement');
			}

			var knight = KOCFIA.quickMarch.$form.find('.knight').find('.available').val();
			if( knight !== '' ){
				plan.knight = knight;
			}

			//items
			var $items = KOCFIA.quickMarch.$form.find('.items').find('input').filter(':checked');
			plan.items = [];
			if( $items.length ){
				$items.each(function(){ plan.items.push( this.value ); });
			}

			return {plan: plan, errors: errors};
		};

		KOCFIA.quickMarch.launchMarch = function( plan ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('quickMarch') ) console.info('KOCFIA quickMarch launchMarch function');

			var tParams = $.extend({}, window.g_ajaxparams),
				unitsArr = {},
				resources = [0, 0, 0, 0, 0, 0],
				unitId = null,
				attempts = 3,
				i, key, u;

			tParams.cid = plan.from.replace(/city/, '');
			tParams.type = plan.type;
			tParams.kid = (plan.hasOwnProperty('knight') ? parseInt(plan.knight.replace(/k/, ''), 10) : 0);
			tParams.xcoord = plan.to.x;
			tParams.ycoord = plan.to.y;

			for( u in window.unitstats ){
				if( window.unitstats.hasOwnProperty(u) ){
					unitsArr[ u.replace(/unt/, '') ] = 0;
				}
			}

			for( i = 0; i < plan.units.length; i += 1 ){
				key = plan.units[i].id.replace(/nt/, '');
				tParams[ key ] = plan.units[i].qty;
				unitsArr[ key.replace(/u/, '') ] = plan.units[i].qty;
			}

			tParams.gold = 0;
			tParams.r1 = 0;
			tParams.r2 = 0;
			tParams.r3 = 0;
			tParams.r4 = 0;
			tParams.r5 = 0;

			for( i = 0; i < plan.resources.length; i += 1 ){
				if( plan.resources[i].id == 'rec0' ) key = 'gold';
				else key = plan.resources[i].id.replace(/ec/, '');
				tParams[ key ] = plan.resources[i].qty;
				resources[ parseInt(plan.resources[i].idreplace(/rec/, ''), 10) ] = plan.resources[i].qty;
			}

			tParams.items = plan.items.join(",");

			var launch = function(){
				$.ajax({
					url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
					type: 'post',
					data: tParams,
					dataType: 'json',
					timeout: 10000
				})
				.done(function(data){
					if( data.ok ){
						var eta = parseInt(data.eta, 10),
							timediff = eta - parseInt(data.initTS, 10),
							ts = Date.timestamp();

						window.attach_addoutgoingmarch(data.marchId, data.marchUnixTime, ts + timediff, tParams.xcoord, tParams.ycoord, unitsArr, tParams.type, tParams.kid, resources, data.tileId, data.tileType, data.tileLevel, tParams.cid, true);

						window.updateBoosts(data);
						if( data.liftFog ){
							window.update_boosts();
							window.seed.playerEffects.fogExpire = 0;
							//window.g_mapObject.getMoreSlots();
						}

						for( var i = 0; i < plan.items.length; i += 1 ){
							window.seed.items[ 'i' + plan.items[i] ] = parseInt(window.seed.items[ 'i' + plan.items[i] ], 10) - 1;
							window.ksoItems[ plan.items[i] ].subtract();
						}

						Shared.success('Marche lancée');

						//update the form
						window.setTimeout(function(){
							KOCFIA.quickMarch.$form
								.trigger('getItems')
								.trigger('updateLimit')
								.trigger('getAndSetTroops')
								.trigger('getAndSetResources');
						}, 50);

						//force march update after arriving at destination
						var attack = {};
						attack.cityKey = plan.from;
						attack.marching = [ data.marchId ];
						window.setTimeout(function(){
							Shared.forceMarchUpdate(attack, false, dfd);
						}, eta + 10000);
					} else if( data.user_action ){
						if( data.user_action == 'marchWarning' ){
							tParams.marchWarning = 1;
							launch();
						} else if( data.user_action == 'marchCaptcha' ){
							Shared.notify('Lancement échoué (captcha)');
							Shared.manageCaptcha('Marche rapide');
						} else {
							Shared.notify('Lancement échoué (action)');
						}
					} else if( data.msg ){
						Shared.notify('Lancement refusé ('+ data.msg +')');
					} else {
						Shared.notify('Lancement refusé (serveur)');
					}
				})
				.fail(function(){
					attempts -= 1;
					if( attempts > 0 ) launch();
					else {
						Shared.notify('Lancement refusé (erreur internet)');
					}
				});
			};

			launch();
		};

	/* THRONE */
		KOCFIA.throne = {
			options: {
				active: 0,
				automatic: 0
			},
			maxItems: 60,
			stored: ['improvements'],
			improvements: {}
		};

		//favoris
		//appartient à tel set
		//rééquipage auto
		//améliorations auto (upgrade -> qualité (nombre de bonus), enhance -> niveau (puissance des bonus))

		KOCFIA.throne.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.throne +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('throne', 'active', 'Activer', KOCFIA.conf.throne.active);
			code += Shared.generateCheckbox('throne', 'automatic', 'Activer les améliorations automatiques', KOCFIA.conf.throne.automatic);
			code += Shared.generateButton('throne', 'deleteImprovements', 'Supprimer la liste d\'attente des améliorations d\'objets enregistrée');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.throne.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-throne').html('');

			var items = '',
				improvements = '',
				help = KOCFIA.throne.getHelp();

			var code = '<div class="infos">';
			code += '<span class="buttonset"><input type="checkbox" id="throne-panel-automatic" '+ (KOCFIA.conf.throne.automatic ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="throne-panel-automatic">Améliorations automatiques</label></span>';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div><h3>Configurations</h3>';
			code += '<div class="accordion">';
			code += items + improvements;
			code += '</div>';
			code += help;

			$section.append( code )
			//listener
				.on('change', '#throne-panel-automatic', function(){
					$('#throne-automatic').prop('checked', $(this).prop('checked')).change();
				});

			KOCFIA.throne.$itemList = $section.find('.item-list');
			KOCFIA.throne.$improvements = $section.find('.improvement-form');
			KOCFIA.throne.$history = $section.find('.history');

			$section.find('.accordion').accordion({
				collapsible: true,
				autoHeight: false,
				animated: false,
				change: function(event, ui){
					KOCFIA.$confPanelWrapper[0].scrollTop = 0;
					KOCFIA.$confPanelWrapper[0].scrollLeft = 0;
				}
			})
			.accordion('activate', false);

			KOCFIA.throne.addListeners();

			KOCFIA.throne.setCounter();
		};

		KOCFIA.throne.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne on function');

			if( KOCFIA.conf.throne.automatic ){
				KOCFIA.throne.automaticOn();
			}
		};

		KOCFIA.throne.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne off function');

			KOCFIA.throne.automaticOff();
		};

		KOCFIA.throne.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne automaticOn function');
			$('#throne-panel-automatic').prop('checked', true);

			KOCFIA.throne.launchAutomaticImprovements();
		};

		KOCFIA.throne.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne automaticOff function');
		};

		KOCFIA.throne.storeImprovements = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('kocfia throne storeImprovements function');
			localStorage.setObject('kocfia_throne_improvements_' + KOCFIA.storeUniqueId, KOCFIA.throne.improvements);
		};

		KOCFIA.throne.deleteImprovements = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne deleteImprovements function');
			localStorage.removeItem('kocfia_throne_improvements_' + KOCFIA.storeUniqueId);

			KOCFIA.throne.improvements = {};
		};

		KOCFIA.throne.setCounter = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('kocfia throne setCounter function');

			KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs')
				.find('a').filter('[href$="throne"]')
				.append('&nbsp;<output id="kocfia-throne-counter">'+ window.seed.throne.totalItems +'</output>/'+ KOCFIA.throne.maxItems);

			KOCFIA.throne.$counter = $('#kocfia-throne-counter');
		};

		KOCFIA.throne.updateCounter = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('kocfia throne updateCount function');

			KOCFIA.throne.$counter.val( window.seed.throne.totalItems );
		};

		KOCFIA.throne.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne getHelp function');
			var help = '<div id="kocfia-throne-help" class="help" title="Aide Améliorations Salle du Trône">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.throne.addListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne addListeners function');
		};

		KOCFIA.throne.getSetBonus = function( setNum ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('throne') ) console.info('KOCFIA throne getActiveBonus function');

			var setItems = window.seed.throne.slotEquip[ setNum ],
				summary = {},
				itemId, item,
				slot, effect,
				effectRank, effectInfo, tierInfo, bonus;

			if( setItems !== null && Object.isObject(setItems) && !$.isEmptyObject(setItems) ){
				for( itemId in setItems ){
					if( setItems.hasOwnProperty(itemId) ){
						item = window.seed.throne.inventory[ itemId ];
						if( item && Object.isObject(item) ){
							if( !item.isBrocken ){
								for( slot in item.effects ){
									if( item.effects.hasOwnProperty(slot) ){
										effect = item.effects[ slot ];
										effectRank = parseInt(slot.replace(/slot/, ''), 10);
										if( effectRank <= item.quality ){
											tierInfo = window.cm.thronestats.tiers[ effect.id ][ effect.tier ];
											bonus = parseInt(tierInfo.base, 10) + (item.level * item.level + item.level) * parseInt(tierInfo.growth, 10) / 2;

											if( !summary.hasOwnProperty(effect.id) ){
												effectInfo = window.cm.thronestats.effects[ effect.id ];
												summary[ effect.id ] = {
													label: effectInfo[1],
													percent: bonus
												};
											} else {
												summary[ effect.id ].percent += bonus;
											}
										}
									}
								}
							}
						}
					}
				}
			}

			return summary;
		};

	/* REPORTS */
		KOCFIA.reports = {
			options: {
				active: 0,
				automatic: 0,
				autoWilderness: 0,
				autoBarbarian: 0,
				autoDarkForest: 0,
				autoPlunder: 0,
				reassign: 0,
				reinforceMe: 0,
				reinforceOther: 0,
				scoutMe: 0,
				scoutOther: 0,
				barbarian: 0,
				darkForest: 0,
				transportSelf: 0,
				transportForMe: 0,
				transportForOther: 0
			},
			stored: [],
			fetching: {
				mine: false,
				alliance: false
			}
		};

		/* grid related */
		KOCFIA.reports.gridRowActions = function( cellValue, options, rowObject ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports gridRowActions function', cellValue, options, rowObject);
			var code = '<span class="ui-icon ui-icon-trash delete" data-id="'+ rowObject.reportId +'" title="Supprimer ce rapport"></span>';

			if( rowObject.isMine ){
				code += '<span class="ui-icon ui-icon-mail-open open" data-id="'+ rowObject.reportId +'" title="Afficher ce rapport"></span>';
			}

			if( rowObject.isPvP ){
				if( rowObject.guildMateDefending ){
					code += '<span class="ui-icon ui-icon-cart attack" data-coords="'+ rowObject.attackerCoords +'" title="Attaquer"></span>';
					code += '<span class="ui-icon ui-icon-note scout" data-coords="'+ rowObject.attackerCoords +'" title="Eclairer"></span>';
					code += '<span class="ui-icon ui-icon-wrench reinforce" data-coords="'+ rowObject.defenderCoords +'" title="Renforcer"></span>';
				} else {
					code += '<span class="ui-icon ui-icon-cart attack" data-coords="'+ rowObject.defenderCoords +'" title="Attaquer"></span>';
					code += '<span class="ui-icon ui-icon-note scout" data-coords="'+ rowObject.defenderCoords +'" title="Eclairer"></span>';
				}
			} else if( rowObject.isAttack ) {
				code += '<span class="ui-icon ui-icon-cart attack" data-coords="'+ rowObject.defenderCoords +'" title="Attaquer"></span>';
				code += '<span class="ui-icon ui-icon-note scout" data-coords="'+ rowObject.defenderCoords +'" title="Eclairer"></span>';
			}

			return code;
		};

		KOCFIA.reports.data = {
			mine: [],
			alliance: []
		};

		KOCFIA.map.selection = {
			mine: {},
			alliance: {}
		};

		KOCFIA.reports.gridParams = {
			shared: {
				datatype: 'local',
				loadui: 'disable',
				rowNum: 20,
				rowList: [20, 50, 100],
				sortname: 'date',
				sortorder: 'desc',
				altRows: true,
				altclass: 'zebra',
				height: 'auto',
				autowidth: true,
				viewrecords: true, //total in pager
				gridview: true, //speed boost
				hiddengrid: true,
				multiselect: true,
				multiboxonly: true,
				multikey: 'shiftKey',
				shrinkToFit: true
			},
			mine: {
				colNames: ['', 'Date', 'Type', 'Attacker', 'Alliance', 'From', 'Defender', 'Alliance', 'To', 'Target', '', '', '', ''],
				colModel: [
					{name: 'actions', sortable: false, search: false, formatter: KOCFIA.map.gridRowActions, width: 40},
					{name: 'date', index: 'date', formatter: function( cellValue, options, rowObject ){ return window.formatDateByUnixTime( cellValue ); }, width: 100},
					{name: 'type', index: 'type', width: 100},
					{name: 'attacker', index: 'attacker', width: 100},
					{name: 'attackerGuild', index: 'attackerGuild', width: 100},
					{name: 'attackerCoords', index: 'attackerCoords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
					{name: 'defender', index: 'defender', width: 100},
					{name: 'defenderGuild', index: 'defenderGuild', width: 100},
					{name: 'defenderCoords', index: 'defenderCoords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
					{name: 'target', index: 'target', width: 100},
					{name: 'isMine', index: 'isMine', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'isAttack', index: 'isAttack', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'isPvP', index: 'isPvP', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'isGuildMateDefending', index: 'isGuildMateDefending', hidedlg: true, hidden: true, search: false, sortable: false}
				],
				caption: 'Rapports du Joueur',
				pager: '#kocfia-reports-pager-mine',
				onSelectRow: function(key, checked){
					//xxxyyy -> xxx,yyy with padded 0 cleaned
					if( checked ){
						KOCFIA.reports.selection.mine[ key ] = key;
					} else {
						delete KOCFIA.reports.selection.mine[ key ];
					}
				}
			},
			alliance: {
				colNames: ['', 'Date', 'Type', 'Attacker', 'Alliance', 'From', 'Defender', 'Alliance', 'To', 'Target', '', '', '', ''],
				colModel: [
					{name: 'actions', sortable: false, search: false, formatter: KOCFIA.map.gridRowActions, width: 40},
					{name: 'date', index: 'date', formatter: function( cellValue, options, rowObject ){ return window.formatDateByUnixTime( cellValue ); }, width: 100},
					{name: 'type', index: 'type', width: 100},
					{name: 'attacker', index: 'attacker', width: 100},
					{name: 'attackerGuild', index: 'attackerGuild', width: 100},
					{name: 'attackerCoords', index: 'attackerCoords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
					{name: 'defender', index: 'defender', width: 100},
					{name: 'defenderGuild', index: 'defenderGuild', width: 100},
					{name: 'defenderCoords', index: 'defenderCoords', align: 'center', sortable: false, search: false, formatter: function( cellValue, options, rowObject ){ return Shared.mapLink(cellValue); }, width: 60},
					{name: 'target', index: 'target', width: 100},
					{name: 'isMine', index: 'isMine', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'isAttack', index: 'isAttack', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'isPvP', index: 'isPvP', hidedlg: true, hidden: true, search: false, sortable: false},
					{name: 'isGuildMateDefending', index: 'isGuildMateDefending', hidedlg: true, hidden: true, search: false, sortable: false}
				],
				caption: 'Rapports de l\'Alliance',
				pager: '#kocfia-reports-pager-mine',
				onSelectRow: function(key, checked){
					//xxxyyy -> xxx,yyy with padded 0 cleaned
					if( checked ){
						KOCFIA.reports.selection.mine[ key ] = key;
					} else {
						delete KOCFIA.reports.selection.mine[ key ];
					}
				}
			}
		};

		KOCFIA.reports.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.reports +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('reports', 'active', 'Activer', KOCFIA.conf.reports.active);
			code += Shared.generateCheckbox('reports', 'automatic', 'Activer la suppression automatique de rapport', KOCFIA.conf.reports.automatic);
			code += '<div class="indent">';
			code += 'Supprimera les rapports suivant :';
			code += '<br><small>La détection est basée sur les coordonnées configurées dans les différents onglets</small>';
			code += Shared.generateCheckbox('reports', 'autoWilderness', 'Terres sauvages automatiques', KOCFIA.conf.reports.autoWilderness);
			code += Shared.generateCheckbox('reports', 'autoBarbarian', 'Camps barbares automatiques', KOCFIA.conf.reports.autoBarbarian);
			code += Shared.generateCheckbox('reports', 'autoDarkForest', 'Forêts obscures automatiques', KOCFIA.conf.reports.autoDarkForest);
			code += Shared.generateCheckbox('reports', 'autoPlunder', 'Pillages automatiques', KOCFIA.conf.reports.autoPlunder);
			code += '</div>';
			code += '<br><div class="indent">';
			code += 'Supprimera les rapports suivant :';
			code += '<br><small>La détection est basée sur le type de marche, l\'expéditeur et le destinataire</small>';
			code += Shared.generateCheckbox('reports', 'reassign', 'Réassignements', KOCFIA.conf.reports.reassign);
			code += Shared.generateCheckbox('reports', 'reinforceMe', 'Renforts d\'une de vos villes', KOCFIA.conf.reports.reinforceMe);
			code += Shared.generateCheckbox('reports', 'reinforceOther', 'Renforts d\'une ville d\'un autre joueur', KOCFIA.conf.reports.reinforceOther);
			code += Shared.generateCheckbox('reports', 'scoutMe', 'Éclairage d\'une de vos villes', KOCFIA.conf.reports.scoutMe);
			code += Shared.generateCheckbox('reports', 'scoutOther', 'Éclairage d\'une ville d\'un autre joueur', KOCFIA.conf.reports.scoutOther);
			code += Shared.generateCheckbox('reports', 'barbarian', 'Camps barbares', KOCFIA.conf.reports.barbarian);
			code += Shared.generateCheckbox('reports', 'darkForest', 'Forêts obscures', KOCFIA.conf.reports.darkForest);
			code += Shared.generateCheckbox('reports', 'transportSelf', 'Transport entre vos villes', KOCFIA.conf.reports.transportSelf);
			code += Shared.generateCheckbox('reports', 'transportForMe', 'Transport vers une de vos villes par un autre joueur', KOCFIA.conf.reports.transporFortMe);
			code += Shared.generateCheckbox('reports', 'transportForOther', 'Transport vers une ville d\'un autre joueur', KOCFIA.conf.reports.transportForOther);
			code += '</div>';
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.reports.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-reports').html('');

			var code = '<div class="infos">';
			code += '<span class="buttonset"><input type="checkbox" id="reports-panel-automatic" '+ (KOCFIA.conf.reports.automatic ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="reports-panel-automatic">Suppressions automatiques</label></span>';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div>';
			code += KOCFIA.reports.getHelp();

			//grids
			code += '<div>';
			code += '<label for="kocfia-reports-reportId">Rapport numéro&nbsp;:&nbsp;</label>';
			code += '<input type="number" id="kocfia-reports-reportId">';
			code += '<button class="button secondary detail"><span>Ouvrir</span></button>';
			code += '</div>';
			code += '<fieldset class="boundary mine">';
			code += '<legend>Vos rapports</legend>';
			code += '<label>Page&nbsp;:&nbsp;</label><input type="number" class="min" value="1" min="1" required>';
			code += '<label>&nbsp;à&nbsp;:&nbsp;</label><input type="number" class="max" value="2" min="1" required>';
			code += '<button class="button secondary load"><span>Charger</span></button>';
			code += '</fieldset>';
			code += '<table id="kocfia-reports-mine" class="reports-results"></table>';
			code += '<div id="kocfia-reports-pager-mine" class="reports-pager"></div>';
			code += '<fieldset class="boundary alliance">';
			code += '<legend>Rapports d\'Alliance</legend>';
			code += '<label>Page&nbsp;:&nbsp;</label><input type="number" class="min" value="1" min="1" required>';
			code += '<label>&nbsp;à&nbsp;:&nbsp;</label><input type="number" class="max" value="2" min="1" required>';
			code += '<button class="button secondary load"><span>Charger</span></button>';
			code += '</fieldset>';
			code += '<table id="kocfia-reports-alliance" class="reports-results"></table>';
			code += '<div id="kocfia-reports-pager-alliance" class="reports-pager"></div>';


			$section.append( code )
			//listener
				.on('change', '#reports-panel-automatic', function(){
					$('#reports-automatic').prop('checked', $(this).prop('checked')).change();
				})
				.on('click', '.detail', function(){
					var id = $.trim( $('#kocfia-reports-repordId').val() );
					if( id !== '' && parseInt(id, 10) > 0 ){
						KOCFIA.reports.getReport(id);
					}
				});

			//grids
			KOCFIA.reports.$resultsMine = $section.find('#kocfia-reports-mine')
				.jqGrid( $.extend({}, KOCFIA.reports.gridParams.shared, KOCFIA.reports.gridParams.mine) )
				.jqGrid('navGrid', '#kocfia-reports-pager-mine', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
				.jqGrid('navButtonAdd', '#kocfia-reports-pager-mine', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.reports.$resultsMine[0].toggleToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd','#kocfia-reports-pager-mine', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.reports.$resultsMine[0].clearToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-reports-pager-mine', {caption: '', title: "Supprimer les rapports sélectionnés", buttonicon: 'ui-icon-trash', onClickButton: function(){ KOCFIA.reports.removeSelection('mine'); }, position: 'last'})
				.jqGrid('filterToolbar');

			KOCFIA.reports.$resultsAlliance = $section.find('#kocfia-reports-alliance')
				.jqGrid( $.extend({}, KOCFIA.reports.gridParams.shared, KOCFIA.reports.gridParams.alliance) )
				.jqGrid('navGrid', '#kocfia-reports-pager-alliance', {edit: false, add: false, del: false, refresh: false}, {}, {}, {}, {multipleSearch: true})
				.jqGrid('navButtonAdd', '#kocfia-reports-pager-alliance', {caption: '', title: 'Filtre rapide', buttonicon: 'ui-icon-pin-s', onClickButton: function(){ KOCFIA.reports.$resultsAlliance[0].toggleToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd','#kocfia-reports-pager-alliance', {caption: '', title: 'Vider les filtres', buttonicon: 'ui-icon-refresh', onClickButton: function(){ KOCFIA.reports.$resultsAlliance[0].clearToolbar(); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-reports-pager-alliance', {caption: '', title: "Supprimer les rapports sélectionnés", buttonicon: 'ui-icon-trash', onClickButton: function(){ KOCFIA.reports.removeSelection('alliance'); }, position: 'last'})
				.jqGrid('navButtonAdd', '#kocfia-reports-pager-alliance', {caption: '', title: "Compilation des rapports sélectionnés", buttonicon: 'ui-icon-script', onClickButton: function(){ KOCFIA.reports.summarize('alliance'); }, position: 'last'})
				.jqGrid('filterToolbar');


			//grid listeners
			$section
				.on('click', '.attack, .scout, .reinforce', function(){
					if( KOCFIA.conf.quickMarch.on ){
						var $this = $(this),
							type = 'attack';

						if( $this.hasClass('attack') ) type = 'attack';
						else if( $this.hasClass('scout')) type = 'scout';
						else if( $this.hasClass('reinforce')) type = 'reinforce';

						KOCFIA.$confPanel.find('#kocfia-conf-panel-tabs').find('a').filter('[href$="quickMarch"]').trigger('click');

						$('#kocfia-quickMarch')
							.find('.type').find('#kocfia-quickMarch-type-'+ type).prop('checked').end()
							.find('.coord').val( $this.attr('data-coord') ).trigger('change');
					} else {
						alert('L\'onglet marche simplifées n\'est pas actif.');
					}
				})
				.on('click', '.load', function(){
					var $this = $(this),
						$fieldset = $this.closest('.boundary'),
						min = $.trim($fieldset.find('.min')),
						max = $.trim($fieldset.find('.max')),
						type = $fieldset.hasClass('mine') ? 'mine' : 'alliance';

					if( min === '' || max === '' ){
						Shared.notify('Besoin des pages minimum et maximum à afficher.');
						return false;
					}

					min = parseInt(min, 10);
					max = parseInt(max, 10);

					if( isNaN(min) || isNaN(max) ){
						Shared.notify('Au moins une des bornes des pages à afficher est incorrecte.');
						return false;
					}

					if( min >= 1 && max >= 1 ){
						Shared.notify('Les numéros des pages à afficher doivent être supérieurs ou égaux à 1.');
						return false;
					}

					$this.removeClass('load secondary').addClass('stop danger').find('span').html('Arrêter');

					KOCFIA.reports.fetching[ type ] = true;

					KOCFIA.reports.load(min, max, type);
				})
				.on('click', '.stop', function(){
					var $this = $(this),
						type = $this.closest('.boundary').hasClass('mine') ? 'mine' : 'alliance';

					$this.removeClass('stop danger').addClass('load secondary').find('span').html('Charger');

					KOCFIA.reports.fetching[ type ] = false;
				})
				.on('click', '.ui-jqgrid-titlebar', function(){
					$(this).find('.ui-jqgrid-titlebar-close').trigger('click');
				})
				.find('.ui-jqgrid-titlebar-close').click(function(e){
					e.stopPropagation();

					console.log(this, $(this));

					$(this)
						.filter('.ui-icon-circle-triangle-s') //grid was closed ?
						.closest('.ui-jqgrid-view').siblings('.ui-jqgrid-view') //get other grids
						.find('.ui-icon-circle-triangle-n').parent().trigger('click'); //close them
				})
				;

			KOCFIA.$confPanel.on('resizestop', function(){
				var size = KOCFIA.reports.$div.find('.boundary.mine').innerWidth() + 1;
				KOCFIA.reports.$resultsMine.jqGrid('setGridWidth', size);
				KOCFIA.reports.$resultsAlliance.jqGrid('setGridWidth', size);
			});

			KOCFIA.reports.$div = KOCFIA.$confPanel.find('#kocfia-reports');
		};

		KOCFIA.reports.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports on function');

			if( KOCFIA.conf.reports.automatic ){
				KOCFIA.reports.automaticOn();
			}
		};

		KOCFIA.reports.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports off function');

			KOCFIA.reports.automaticOff();
		};

		KOCFIA.reports.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticOn function');
			$('#reports-panel-automatic').prop('checked', true);

			autoReportsCleanUpInterval = window.setInterval(function(){
				KOCFIA.reports.automaticCleanUp();
			}, 5 * 60 * 1000);

			window.setTimeout(function(){ KOCFIA.reports.automaticCleanUp(); }, 10 * 1000);
		};

		KOCFIA.reports.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticOff function');

			window.clearInterval( autoReportsCleanUpInterval );
		};

		KOCFIA.reports.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports getHelp function');
			var help = '<div id="kocfia-reports-help" class="help" title="Aide Rapports">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.reports.automaticCleanUp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticCleanUp function');

			if( KOCFIA.conf.reports.automatic ){
				var page = 0,
					total = 0,
					nothingToDelete = 0,
					unread = {},
					idsToDelete0 = {},
					idsToDelete1 = {},
					autoAttackCoords = { wilderness: null, barbarian: null, plunder: null, darkForest: null };

				var isSelf = function( id ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticCleanUp isSelf function', id);
					return window.tvuid == id;
				};

				var isAutoAttackCoord = function( coord, type ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticCleanUp isAutoAttackCoord function', coord, type);
					if( autoAttackCoords[ type ] !== null ){
						return autoAttackCoords[ type ].hasOwnProperty(coord);
					} else {
						if( $.isEmptyObject(KOCFIA[ type ].attacks) ){
							return false;
						} else if( type != 'darkForest' ){
							var cityKey, attackId, i;
							for( cityKey in KOCFIA[ type ].attacks ){
								if( KOCFIA[ type ].attacks.hasOwnProperty(cityKey) ){
									for( attackId in KOCFIA[ type ].attacks[ cityKey ] ){
										if( KOCFIA[ type ].attacks[ cityKey ].hasOwnProperty(attackId) ){
											for( i = 0; i < KOCFIA[ type ].attacks[ cityKey ][ attackId ].coords.length; i += 1 ){
												autoAttackCoords[ type ][ KOCFIA[ type ].attacks[ cityKey ][ attackId ].coords[i] ] = 1;
											}
										}
									}
								}
							}
							return autoAttackCoords[ type ].hasOwnProperty(coord);
						} else {
							if( $.isEmptyObject(KOCFIA.darkForest.coords) || !KOCFIA.darkForest.coords.hasOwnProperty('list') || $.isEmptyObject(KOCFIA.darkForest.coords.list) ){
								return false;
							} else {
								return $.inArray(coord, KOCFIA.darkForest.coords.list) > -1;
							}
						}
					}

					return false;
				};

				var fetchPage = function( dfd, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticCleanUp fetchPage function', attempts);
					var params = $.extend({}, window.g_ajaxparams);
					if(page > 1) params.pageNo = page;

					var toDelete = 0;

					$.ajax({
							url: window.g_ajaxpath + "ajax/listReports.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(data){
							if( data.ok ){
								var reports = data.arReports;
								total = data.totalPages;
								if( Object.isObject(reports) && !$.isEmptyObject(reports) ){
									var key, report, coord;
									for( key in reports ){
										if( reports.hasOwnProperty(key) ){
											report = reports[ key ];
											if( Object.isObject(report) && !$.isEmptyObject(report) ){
												//dark forest
												if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_DARK_FOREST ){
													if( KOCFIA.conf.reports.darkForest ){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													} else if( KOCFIA.conf.reports.autoDarkForest && isAutoAttackCoord(report.side0XCoord +','+ report.side0YCoord, 'darkForest') ){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

												//transport
												} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_TRANSPORT ){
													if( KOCFIA.conf.reports.transportSelf
														&& report.hasOwnProperty('side0PlayerId') && isSelf( report.side0PlayerId )
														&& report.hasOwnProperty('side1PlayerId') && isSelf( report.side1PlayerId )
													){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

													if( KOCFIA.conf.reports.transportForMe
														&& report.hasOwnProperty('side0PlayerId') && isSelf( report.side0PlayerId )
														&& report.hasOwnProperty('side1PlayerId') && !isSelf( report.side1PlayerId )
													){
														idsToDelete0[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

													if( KOCFIA.conf.reports.transportForOther
														&& report.hasOwnProperty('side0PlayerId') && !isSelf( report.side0PlayerId )
														&& report.hasOwnProperty('side1PlayerId') && isSelf( report.side1PlayerId )
													){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

												//reinforce
												} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REINFORCE ){
													if( KOCFIA.conf.reports.reinforceMe
														&& report.hasOwnProperty('side0PlayerId') && isSelf( report.side0PlayerId )
														//&& report.hasOwnProperty(side1PlayerId) && !isSelf( report.side1PlayerId )
													){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

												//scout
												} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT ){
													if( KOCFIA.conf.reports.scoutMe
														&& report.hasOwnProperty('side0PlayerId') && isSelf( report.side0PlayerId )
													){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

													if( KOCFIA.conf.reports.scoutOther
														&& report.hasOwnProperty('side1PlayerId') && isSelf( report.side1PlayerId )
													){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

												//reassign
												} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REASSIGN ){
													if( KOCFIA.conf.reports.reassign ){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

												//barbarian raid
												} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN ){
													if( KOCFIA.conf.reports.barbarian ){
														idsToDelete1[ report.reportId ] = 1;
														if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
														toDelete++;
														continue;
													}

												//attack
												} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK ){
													if( report.hasOwnProperty('side0PlayerId') && !isSelf( report.side0PlayerId ) ){ //not a defense
														coord = report.side0XCoord +','+ report.side0YCoord;

														//dark forest
														if( (report.side0TileType == 54 || report.side0TileType === 0) ){
															if( KOCFIA.conf.reports.darkForest ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															} else if( KOCFIA.conf.reports.autoDarkForest && isAutoAttackCoord(coord, 'darkForest') ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															}

														//barbarian
														} else if( report.side0TileType == 51 && (report.side0CityId === null || report.side0CityId === '' || report.side0CityId == '0') ){
															if( KOCFIA.conf.reports.barbarian ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															} else if( KOCFIA.conf.reports.autoBarbarian && isAutoAttackCoord(coord, 'barbarian') ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															}

														//wilderness
														} else if( report.side0TileType >= 10 && report.side0CityId <= 50 ){
															if( KOCFIA.conf.reports.wilderness ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															} else if( KOCFIA.conf.reports.autoWilderness && isAutoAttackCoord(coord, 'wilderness') ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															}

														//plunder
														} else if( report.side0TileType >= 10 && report.side0CityId <= 50 ){
															if( KOCFIA.conf.reports.autoPlunder && isAutoAttackCoord(coord, 'plunder') ){
																idsToDelete1[ report.reportId ] = 1;
																if( report.reportStatus == 2 ) unread[ report.reportId ] = 1;
																toDelete++;
																continue;
															}
														}
													}
												}
											}
										}
									}
								}

								page += 1;

								//at 3 continuous pages with nothing to delete, stop
								if( toDelete === 0 ){
									nothingToDelete++;
								} else {
									nothingToDelete = 0;
								}

								if( nothingToDelete > 2 ){
									return dfd.pipe( deleteReports(dfd, 3) );
								} else if( page <= total ){
									return dfd.pipe( fetchPage(dfd, 3) );
								} else {
									return dfd.pipe( deleteReports(dfd, 3) );
								}
							} else {
								if( data.msg ){
									console.log( data.msg );
									return dfd.pipe( deleteReports(dfd, 3) );
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										window.setTimeout(function(){ return dfd.pipe( fetchPage(dfd, attempts) ); }, 5000);
									} else {
										return dfd.pipe( deleteReports(dfd, 3) );
									}
								}
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ){
								window.setTimeout(function(){ return dfd.pipe( fetchPage(dfd, attempts) ); }, 5000);
							} else {
								return dfd.pipe( deleteReports(dfd, 3) );
							}
						});
				};

				var deleteReports = function( dfd, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports automaticCleanUp deleteReports function', attempts);
					if( $.isEmptyObject(idsToDelete0) && $.isEmptyObject(idsToDelete1) ){
						return dfd.resolve();
					} else {
						var params = $.extend({}, window.g_ajaxparams);
						params.s0rids = Object.keys(idsToDelete0).join(",");
						params.s1rids = Object.keys(idsToDelete1).join(",");
						params.cityrids = '';

						$.ajax({
								url: window.g_ajaxpath + "ajax/deleteCheckedReports.php" + window.g_ajaxsuffix,
								type: 'post',
								data: params,
								dataType: 'json',
								timeout: 10000
							})
							.done(function(data){
								if( data.ok ){
									var nb = Object.keys(unread).length;
									window.seed.newReportCount = parseInt(window.seed.newReportCount, 10) - nb;
								} else {
									if( data.msg ){
										console.log( data.msg );
										return dfd.reject();
									} else {
										attempts -= 1;
										if( attempts > 0 ){
											window.setTimeout(function(){ return dfd.pipe( deleteReports(dfd, attempts) ); }, 5000);
										} else {
											return dfd.reject();
										}
									}
								}
							})
							.fail(function(){
								attempts -= 1;
								if( attempts > 0 ){
									window.setTimeout(function(){ return dfd.pipe( deleteReports(dfd, attempts) ); }, 5000);
								} else {
									return dfd.reject();
								}
							});
					}
				};

				var cleanSequence = function(){
					return $.Deferred(function( dfd ){
						return dfd.pipe( fetchPage(dfd, 3) );
					}).promise();
				};

				$.when( cleanSequence() )
					.always(function(){

					});
			}
		};

		KOCFIA.reports.load = function( min, max, type ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports load function', min, max, type);

			var isSelf = function( id ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports load isSelf function', id);
				return window.tvuid == id;
			};

			var isAutoAttackCoord = function( coord, type ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports load isAutoAttackCoord function', coord, type);
				if( autoAttackCoords[ type ] !== null ){
					return autoAttackCoords[ type ].hasOwnProperty(coord);
				} else {
					if( $.isEmptyObject(KOCFIA[ type ].attacks) ){
						return false;
					} else if( type != 'darkForest' ){
						var cityKey, attackId, i;
						for( cityKey in KOCFIA[ type ].attacks ){
							if( KOCFIA[ type ].attacks.hasOwnProperty(cityKey) ){
								for( attackId in KOCFIA[ type ].attacks[ cityKey ] ){
									if( KOCFIA[ type ].attacks[ cityKey ].hasOwnProperty(attackId) ){
										for( i = 0; i < KOCFIA[ type ].attacks[ cityKey ][ attackId ].coords.length; i += 1 ){
											autoAttackCoords[ type ][ KOCFIA[ type ].attacks[ cityKey ][ attackId ].coords[i] ] = 1;
										}
									}
								}
							}
						}
						return autoAttackCoords[ type ].hasOwnProperty(coord);
					} else {
						if( $.isEmptyObject(KOCFIA.darkForest.coords) || !KOCFIA.darkForest.coords.hasOwnProperty('list') || $.isEmptyObject(KOCFIA.darkForest.coords.list) ){
							return false;
						} else {
							return $.inArray(coord, KOCFIA.darkForest.coords.list) > -1;
						}
					}
				}

				return false;
			};

			var displayResults = function( dfd, info ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports load deferred displayResults function');
				if( !KOCFIA.reports.fetching[ type ] ){
					return dfd.resolve();
				}

				$('.tipsy').remove();

				if( info.length > 0 ){
					KOCFIA.reports.data[ type ] = KOCFIA.reports.data[ type ].concat(tiles.cities);
					if( type == 'mine' ){
						KOCFIA.reports.$resultsMine.jqGrid('setGridParam', {data: KOCFIA.report.data.mine}).trigger('reloadGrid');
					} else {
						KOCFIA.reports.$resultsalliance.jqGrid('setGridParam', {data: KOCFIA.report.data.alliance}).trigger('reloadGrid');
					}
				}
			};

			var fetchPage = function( dfd, attempts ){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports load deferred checkPages function');
				if( !KOCFIA.reports.fetching[ type ] ){
					return dfd.resolve();
				}

				if( page > max ){
					return dfd.resolve();
				}

				params.pageNo = page;

				$.ajax({
						url: window.g_ajaxpath + "ajax/listReports.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function( data ){
						if( !KOCFIA.reports.fetching[ type ] ){
							return dfd.resolve();
						}

						if( data.ok ){
							total = data.totalPages;
							if( total < max ) max = total; //prevent useless server requests

							var reports = data.arReports,
								computed,
								info = [];
							if( Object.isObject(reports) && !$.isEmptyObject(reports) ){
								var key, report, coord;
								for( key in reports ){
									if( !KOCFIA.reports.fetching[ type ] ){
										return dfd.resolve();
									}

									if( reports.hasOwnProperty(key) ){
										report = reports[ key ];
										if( Object.isObject(report) && !$.isEmptyObject(report) ){
											/*"reportType":"0",
											  "reportId":"37281141",
											  "reportUnixTime":"1336645459",
											  "side0XCoord":"554",
											  "side0YCoord":"350",
											  "side0TileType":"54",
											  "side0TileLevel":"1",
											  "side0CityId":"0",
											  "side0PlayerId":"0",
											  "side0AllianceId":"0",
											  "side1XCoord":"521",
											  "side1YCoord":"363",
											  "side1CityId":"75103",
											  "side1PlayerId":"13262860",
											  "side1AllianceId":"2979",
											  "marchType":"10",
											  "marchTypeState":"1",
											  "userId":"13262860",
											  "eventType":"0",
											  "subType":"0",
											  "reportStatus":"2",
											  "reportDetailId":"0"*/

											computed = {
												id: report.reportId,
												date: new Date(report.reportUnixTime * 1000),
												type: null,
												attacker: null,
												attackerGuild: null,
												attackerCoords: report.side1XCoord +','+ report.side1YCoord,
												defender: null,
												defenderGuild: null,
												defenderCoords: report.side0XCoord +','+ report.side0YCoord,
												target: null,
												isMine: false,
												isAttack: false,
												isPvP: 0,
												isGuildMateDefending: false
											};

											//attacker
												if( report.side1PlayerId !== '' && parseInt(report.side1PlayerId, 10) > 0 ){
													computed.attacker = data.arPlayerNames['p'+ report.side1PlayerId];

													if( report.side1AllianceId !== '' && parseInt(report.side1AllianceId, 10) > 0 ){
														computed.attackerGuild = data.arAllianceNames['a'+ report.side1AllianceId];
													}

													if( isSelf(report.side1PlayerId) ){
														computed.isMine = true;
													}

													computed.isPvP += 1;
												}

											//defender
												if( report.side0PlayerId !== '' && parseInt(report.side0PlayerId, 10) > 0 ){
													computed.defender = data.arPlayerNames['p'+ report.side0PlayerId];

													if( report.side0AllianceId !== '' && parseInt(report.side0AllianceId, 10) > 0 ){
														computed.defenderGuild = data.arAllianceNames['a'+ report.side0AllianceId];
													}

													if( isSelf(report.side0PlayerId) ){
														computed.isMine = true;
													}

													computed.isPvP += 1;
												}

											//PvP ?
											if( computed.isPvP == 2 ){
												computed.isPvP = true;

												if( isSelf(report.side0PlayerId) || Shared.getDiplomacy(report.side0AllianceId) == 'allié' ){
													computed.isGuildMateDefending = true;
												}
											}

											//dark forest
											if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_DARK_FOREST ){
												computed.type = 'Attaque';
												computed.target= 'FO'+ report.side0TileLevel;

											//transport
											} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_TRANSPORT ){
												computed.type = 'Transport';
												computed.target = '';

												if( isSelf( report.side1PlayerId ) && KOCFIA.cities.hasOwnProperty('city'+ report.side1CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side1CityId].label;
												} else {
													computed.target += 'Ville'+ report.side1TileLevel;
												}

												computed.target += ' &rArr; ';

												if( isSelf( report.side0PlayerId ) && KOCFIA.cities.hasOwnProperty('city'+ report.side0CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side0CityId].label;
												} else {
													computed.target += 'Ville'+ report.side0TileLevel;
												}

											//reinforce
											} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REINFORCE ){
												computed.type = 'Renfort';
												computed.target = '';

												if( isSelf( report.side1PlayerId ) && KOCFIA.cities.hasOwnProperty('city'+ report.side1CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side1CityId].label;
												} else {
													computed.target += 'Ville'+ report.side1TileLevel;
												}

												computed.target += ' &rArr; ';

												if( isSelf( report.side0PlayerId ) && KOCFIA.cities.hasOwnProperty('city'+ report.side0CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side0CityId].label;
												} else {
													computed.target += 'Ville'+ report.side0TileLevel;
												}

											//scout
											} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_SCOUT ){
												computed.type = 'Eclairage';
												computed.target = '';

												if( isSelf( report.side1PlayerId ) && KOCFIA.cities.hasOwnProperty('city'+ report.side1CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side1CityId].label;
													computed.isAttack = true;
												} else {
													computed.target += 'Ville'+ report.side1TileLevel;
												}

												computed.target += ' &rArr; ';

												if( isSelf( report.side0PlayerId ) && KOCFIA.cities.hasOwnProperty('city'+ report.side0CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side0CityId].label;
												} else {
													computed.target += 'Ville'+ report.side0TileLevel;
												}

											//reassign
											} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_REASSIGN ){
												computed.type = 'Réassignement';
												computed.target = '';

												if( KOCFIA.cities.hasOwnProperty('city'+ report.side1CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side1CityId].label;
												} else {
													computed.target += 'Ville'+ report.side1TileLevel;
												}

												computed.target += ' &rArr; ';

												if( KOCFIA.cities.hasOwnProperty('city'+ report.side0CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side0CityId].label;
												} else {
													computed.target += 'Ville'+ report.side0TileLevel;
												}

											//barbarian raids
											} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_BOT_BARBARIAN ){
												computed.type = 'Raid Barbare';
												computed.target = '';

												if( KOCFIA.cities.hasOwnProperty('city'+ report.side1CityId) ){
													computed.target += KOCFIA.cities['city'+ report.side1CityId].label;
												} else {
													computed.target += 'Ville'+ report.side1TileLevel;
												}

												computed.target += ' &rArr; ';

												computed.target += 'CB'+ report.side0TileLevel;

											//attacks
											} else if( report.marchType == window.cm.MARCH_TYPES.MARCH_TYPE_ATTACK ){
												if( report.hasOwnProperty('side0PlayerId') && !isSelf( report.side0PlayerId ) ){ //not a defense
													computed.target = '';

													if( KOCFIA.cities.hasOwnProperty('city'+ report.side1CityId) ){
														computed.target += KOCFIA.cities['city'+ report.side1CityId].label;
													} else {
														computed.target += 'Ville'+ report.side1TileLevel;
													}

													computed.target += ' &rArr; ';

													//dark forest
													if( (report.side0TileType == 54 || report.side0TileType === 0) ){
														if( isAutoAttackCoord(computed.defenderCoords, 'darkForest') ){
															computed.type = 'FO auto';
														} else {
															computed.type = 'Attaque';
														}

														computed.target += 'FO'+ report.side0TileLevel;

													//barbarian
													} else if( report.side0TileType == 51 && (report.side0CityId === null || report.side0CityId === '' || report.side0CityId == '0') ){
														if( isAutoAttackCoord(computed.defenderCoords, 'barbarian') ){
															computed.type = 'CB auto';
														} else {
															computed.type = 'Attaque';
														}

														computed.target += 'CB'+ report.side0TileLevel;

													//wilderness
													} else if( report.side0TileType >= 10 && report.side0CityId <= 50 ){
														if( isAutoAttackCoord(computed.defenderCoords, 'wilderness') ){
															computed.type = 'TS auto';
														} else {
															computed.type = 'Attaque';
														}

														if( KOCFIA.tilesTypes.hasOwnProperty(report.side0TileType) ){
															computed.target += KOCFIA.tilesTypes[ report.side0TileType ] + report.side0TileLevel;
														} else {
															computed.target += 'TS'+ report.side0TileLevel;
														}

													//plunder
													} else if( report.side0TileType >= 10 && report.side0CityId <= 50 ){
														if( isAutoAttackCoord(computed.defenderCoords, 'plunder') ){
															computed.type = 'Pillage';
														} else {
															computed.type = 'Attaque';
														}

														computed.target += 'Ville'+ report.side0TileLevel;
													}
												}
											}
										}
									}

									info.push( computed );
								}

								return dfd.pipe( displayResults(dfd, info) );
							} else {
								//empty page
								return dfd.resolve();
							}

							page += 1;

							return dfd.pipe( displayResults(dfd) );
						} else {
							if( data.msg ){
								console.log( data.msg );
								return dfd.fail();
							} else {
								attempts -= 1;
								if( attempts > 0 ){
									window.setTimeout(function(){ return dfd.pipe( fetchPage(dfd, attempts) ); }, 5000);
								} else {
									return dfd.fail();
								}
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							window.setTimeout(function(){ return dfd.pipe( fetchPage(dfd, attempts) ); }, 5000);
						} else {
							return dfd.fail();
						}
					});
			};

			var sequence = function(){
				if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports load deferred sequence function');
				return $.Deferred(function( dfd ){
					return dfd.pipe( fetchPage(dfd) );
				}).promise();
			};

			var params = $.extend({}, window.g_ajaxparams),
				autoAttackCoords = { wilderness: null, barbarian: null, plunder: null, darkForest: null };

			if( type == 'alliance' ){
				params.group = 'a';
			}

			if( min > max ){
				var tmp = min;
				min = max;
				max = tmp;
			}

			page = min;

			$.when( sequence() )
				.fail(function(){
					Shared.notify('Erreur durant le chargement des pages '+ (type == 'mine' ? 'de vos rapports' : 'des rapports de l\'alliance'));
				})
				.always(function(){
					KOCFIA.reports.$div
						.find('.boundary').filter('.'+ type)
						.find('.button').removeClass('danger stop').addClass('secondary load')
						.find('span').html('Charger');

					KOCFIA.reports.fetching[ type ] = false;
				});
		};

		KOCFIA.reports.summarize = function( type ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports summarize function', type);

			if( !$.isEmptyObject(KOCFIA.selection[ type ]) ){

			}
		};

		KOCFIA.reports.getReport = function( id ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports getReport function', ids);

		};

		KOCFIA.reports.removeSelection = function( type ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('reports') ) console.info('KOCFIA reports removeSelection function', type);

			if( !$.isEmptyObject(KOCFIA.selection[ type ]) ){

			}
		};

	/* HOSPITAL */
		KOCFIA.hospital = {
			options: {
				active: 1,
				automatic: 0,
				priority: ['unt1', 'unt2', 'unt3', 'unt4', 'unt5', 'unt6', 'unt7', 'unt8', 'unt9', 'unt10', 'unt11', 'unt12'],
				keep: 0
			},
			stored: ['rules'],
			rules: {} //by unit key and city key
		};

		KOCFIA.hospital.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.hospital +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('hospital', 'active', 'Activer', KOCFIA.conf.hospital.active);
			code += Shared.generateCheckbox('hospital', 'automatic', 'Lancer les soins automatiques', KOCFIA.conf.hospital.automatic);
			code += Shared.generateButton('hospital', 'deleteRules', 'Supprimer les configurations de soin enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.hospital.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-hospital').html('');

			var code = '<div class="infos">';
			code += '<span class="buttonset"><input type="checkbox" id="hospital-panel-automatic" '+ (KOCFIA.conf.hospital.automatic ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="hospital-panel-automatic">Soins automatiques</label></span>';
			code += '<button class="button priority" title="Priorité des unités pour les soins"><span>Priorité</span></button>';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div><div class="accordion">';
			code += '<h3>Configurations</h3>';

			//automatic heal form
				code += '<div class="hospital-form">';
				code += '<div class="buttons">';
				code += '<button class="save button modify"><span>Enregistrer</span></button>';
				code += '<button class="reset button danger" title="Vide le codeulaire"><span>Annuler</span></button>';
				code += '<button class="reload button danger" title="Recharge le forumlaire avec les configurations enregistrées"><span>Recharger</span></button>';
				code += '</div>';
				code += '<div>';
				code += 'Conserver : <input type="text" class="keep" value="0" required> <img src="'+ KOCFIA.resourceInfo.gold.icon +'" alt="'+ KOCFIA.resourceInfo.gold.label +'" title="'+ KOCFIA.resourceInfo.gold.label +'">';
				code += '</div>';
				code += '<table><thead><tr>';
				code += '<th>Troupe</th><th>Configurations</th>';
				code += '</tr></thead><tbody>';

				var i, unit;
				for( i = 0; i < KOCFIA.troops.length; i += 1 ){
					unit = KOCFIA.troops[i];
					code += '<tr data-unit="'+ unit.key +'"><td class="unit">';
					code += '<img src="'+ unit.icon +'" alt="'+ unit.label +'"><br>';
					code += '<button class="button secondary addRule" title="Ajouter une configuration pour cette unité"><span>Ajouter</span></button>';
					code += '</td><td class="rules"></td></tr>';
				}

				code += '</tbody></table>';
				code += '<div class="buttons">';
				code += '<button class="save button modify"><span>Enregistrer</span></button>';
				code += '<button class="reset button danger" title="Vide le codeulaire"><span>Annuler</span></button>';
				code += '<button class="reload button danger" title="Recharge le forumlaire avec les configurations enregistrées"><span>Recharger</span></button>';
				code += '</div>';
				code += '</div>';

			//ongoing healing list
				code += '<h3>Soins en cours et quantités de blessés</h3>';
				code += '<div class="hospital-list ongoing"></div>';
				code += '</div>';

			//priority list
				code += '<div id="kocfia-hospital-priority" class="priority-list" title="Priorité des unités lors des soins">';
				code += '<ol>';
				var unitKey, unitInfo, i, l;
				for( i = 0, l = KOCFIA.conf.hospital.priority.length; i < l; i += 1 ){
					unitKey = KOCFIA.conf.hospital.priority[ i ];
					unitInfo = KOCFIA.unitInfo[ unitKey ];
					code += '<li rel="'+ unitKey +'"><img src="'+ unitInfo.icon +'">'+ unitInfo.label +'</li>';
				}
				code += '</ol></div>';

			var help = KOCFIA.hospital.getHelp();

			$section.append( code + help );

			$section
				.find('.priority-list')
				.dialog({autoOpen: false, height: 300, width: 400, zIndex: 100001 })
				.find('ol').sortable({
					zIndex: 100002,
					update: function(event, ui){
						var $list = $(event.target),
							list = $list.find('li').map(function(){ return $(this).attr('rel'); }).get();

						KOCFIA.conf.hospital.priority = list;
						Shared.storeConf();
					}
				});

			KOCFIA.hospital.$autoForm = $section.find('.hospital-form');
			KOCFIA.hospital.$ongoing = $section.find('.hospital-list.ongoing');

			KOCFIA.hospital.addSectionListeners();

			$section.find('.accordion').accordion({
					collapsible: true,
					autoHeight: false,
					animated: false,
					change: function(event, ui){
						KOCFIA.$confPanelWrapper[0].scrollTop = 0;
						KOCFIA.$confPanelWrapper[0].scrollLeft = 0;
					}
				})
				.accordion('activate', false);

			window.setTimeout(function(){
				KOCFIA.hospital.loadAutoRuleset();
				KOCFIA.hospital.refreshOnGoing();
			}, 10000);
		};

		KOCFIA.hospital.refreshOnGoing = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital refreshOnGoing function');
			var onGoing = '',
				i, j, unit, queue,
				units = '',
				text, wounded, timestamp, finish,
				healing = '<th><button class="button secondary refresh" title="Raffraîchir les données affichées"><span>Raffraîchir</span></button></th>',
				headers = '<th>En cours</th>';
			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[cityKey];

					headers += '<th>'+ city.label +'</th>';

					//ongoing healing
					queue = window.seed.queue_revive[ cityKey ];
					if( queue && Array.isArray(queue) && queue.length > 0 ){
						unit = KOCFIA.unitInfo['unt'+ queue[0][0]];
						wounded = queue[0][1];

						text = '<span title="'+ unit.label +' - '+ Shared.readable(wounded) +'"><img src="'+ unit.icon +'" alt="'+ unit.label +'">'+ Shared.format(wounded) +'</span>';

						timestamp = Date.timestamp();
						finish = parseInt(queue[0][3], 10);
						if( finish > timestamp ){
							text += '<br>'+ Shared.readableDuration( finish - timestamp );
						}
					} else text = '&nbsp;';

					healing += '<td>'+ text +'</td>';
				}
			}

			for( i = 0; i < KOCFIA.troops.length; i += 1 ){
				unit = KOCFIA.troops[ i ];

				units += '<tr><th></th>';

				for( j = 0; j < KOCFIA.citiesKey.length; j += 1 ){
					cityKey = KOCFIA.citiesKey[j];

					//wounded
					wounded = 0;
					if( window.seed.hasOwnProperty('woundedUnits') && window.seed.woundedUnits.hasOwnProperty(cityKey) && window.seed.woundedUnits[ cityKey ].hasOwnProperty(unit.key) ){
						wounded = parseInt(window.seed.woundedUnits[ cityKey ][ unit.key ], 10);
						if( isNaN(wounded) ) wounded = 0;
					}
					units += '<td title="'+ Shared.readable( wounded ) +'">'+ Shared.format( wounded ) +'</td>';
				}

				units += '</tr>';
			}

			onGoing += '<table><thead><tr>'+ headers +'</tr></thead><tbody><tr>'+ healing +'</tr>'+ units +'</tbody></table>';

			KOCFIA.hospital.$ongoing[0].innerHTML = onGoing;
		};

		KOCFIA.hospital.addSectionListeners = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital modPanel function');
			KOCFIA.$confPanel.find('#kocfia-hospital')
				.on('change', '#hospital-panel-automatic', function(){
					$('#hospital-automatic').prop('checked', $(this).prop('checked')).change();
				})
				.on('click', '.priority', function(){
					$('#kocfia-hospital-priority').dialog('open');
				})
				.on('click', '.refresh', function(){
					KOCFIA.hospital.refreshOnGoing();
				});

			//form
			var i, city, cityKey,
				citiesSelect = '<select class="city"><option value="">Choisir</option>';

			for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
				cityKey = KOCFIA.citiesKey[i];
				if( KOCFIA.cities.hasOwnProperty(cityKey) ){
					city = KOCFIA.cities[ cityKey ];
					citiesSelect += '<option value="'+ cityKey +'">'+ city.label +'</option>';
				}
			}
			citiesSelect += '</select>';

			KOCFIA.hospital.$autoForm
				.on('click', '.addRule', function(){
					var $form = $(this).closest('.hospital-form');

					var code = '<div class="rule">';
					code += '<div><input type="checkbox" class="active" title="Activer cette configuration">&nbsp;';
					code += 'Ville&nbsp;:&nbsp;'+ citiesSelect;
					code += 'À&nbsp;partir&nbsp;de&nbsp;<input type="text" class="quantity-min" value="0">';
					code += 'Par&nbsp;paquet&nbsp;de&nbsp;maximum&nbsp;<input type="text" class="quantity-pack" value="1">';
					code += '&nbsp;<output class="duration"></output>';
					code += '<button class="remove button danger"><span>Supprimer</span></button>';
					code += '<button class="duplicate button secondary" title="Copie ou applique dans cette unité cette configuration pour vos autres villes"><span>Copier</span></button>';
					code += '</div></div>';

					$(this).closest('td').siblings('.rules').append( code );
				})
				.on('click', '.reset', function(){
					$(this).closest('.hospital-form').find('.rule').remove();
				})
				.on('click', '.reload', function(){
					$(this).closest('.hospital-form').find('.rule').remove();

					KOCFIA.hospital.loadAutoRuleset();
				})
				.on('click', '.remove', function(){
					$(this).closest('.rule').remove();
					$('.tipsy').remove();
				})
				.on('click', '.duplicate', function(){
					var $this = $(this),
						$form = $this.closest('.hospital-form'),
						$rules = $this.closest('.rules'),
						$rule = $this.closest('.rule'),
						$sib = $rule.siblings('.rule'),
						city = $rule.find('.city').val(),
						min = $rule.find('.quantity-min').val(),
						pack = $rule.find('.quantity-pack').val(),
						active = $rule.find('.active').prop('checked'),
						cities = {}, i, $clone, cityKey, $div;

					if( city !== '' ) cities[ city ] = 1;

					$sib.find('.city').each(function(){
						if( this.value !== '' ) cities[ this.value ] = 1;
					});

					for( i = 0; i < KOCFIA.citiesKey.length; i += 1 ){
						cityKey = KOCFIA.citiesKey[i];
						if( !cities.hasOwnProperty( cityKey ) ){
							$clone = $rule.clone();
							$clone.find('.city').val( cityKey );
							$clone.find('.quantity-min').val( min );
							$clone.find('.quantity-pack').val( pack );
							$clone.find('.active').prop('checked', active);

							$clone.css('display', 'none');

							$rules.append( $clone );
						} else if( city != cityKey ){
							$sib.find('.city').each(function(){
								if( this.value == cityKey ){
									$div = $(this).closest('.rule');
									$div.find('.quantity-min').val( min );
									$div.find('.quantity-pack').val( pack );
									$div.find('.active').prop('checked', active);
									return false; //break
								}
							});
						}
					}

					$rules.find('.rule').css('display', '');
				})
				.on('keyup, change', '.quantity-pack', function(){
					var $this = $(this),
						$duration = $this.siblings('.duration'),
						quantity = Shared.decodeFormat( $.trim(this.value) ),
						cityKey = $this.siblings('.city').val(),
						unitKey = $this.closest('tr').attr('data-unit');

					$duration.html( Shared.readableDuration( KOCFIA.hospital.getDuration( cityKey, unitKey, quantity ) ) );
				})
				.on('click', '.save', function(){
					var result = KOCFIA.hospital.planAutomaticRules();
					if( result.errors.length ){
						Shared.notify( result.errors.unique() );
					} else {
						KOCFIA.hospital.rules = result.plan;
						KOCFIA.hospital.storeRules();

						KOCFIA.conf.hospital.keep = result.keep;
						Shared.storeConf();

						Shared.success( null );
					}
				});
		};

		KOCFIA.hospital.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital on function');

			if( KOCFIA.conf.hospital.automatic ){
				KOCFIA.hospital.automaticOn();
			}
		};

		KOCFIA.hospital.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital off function');

			KOCFIA.hospital.automaticOff();
		};

		KOCFIA.hospital.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital automaticOn function');
			$('#hospital-panel-automatic').prop('checked', true);

			window.setTimeout(function(){
				KOCFIA.hospital.launchAutomaticRules();
			}, 45 * 1000);

			//recursive call every 5 minutes
			autoHospitalInterval = window.setInterval(function(){
				KOCFIA.hospital.launchAutomaticRules();
			}, 5 * 60 * 1000);
		};

		KOCFIA.hospital.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital automaticOff function');
			$('#hospital-panel-automatic').prop('checked', false);

			if( autoHospitalInterval ) window.clearInterval( autoHospitalInterval );
		};

		KOCFIA.hospital.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital getHelp function');
			var help = '<div id="kocfia-hospital-help" class="help" title="Aide Hôpital">';
			help += '<h4>Informations et limitations</h4><ul>';
			help += '</ul></div>';

			return help;
		};

		KOCFIA.hospital.storeRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital storeRules function');
			localStorage.setObject('kocfia_hospital_rules_' + KOCFIA.storeUniqueId, KOCFIA.hospital.rules);
		};

		KOCFIA.hospital.deleteRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital deleteRules function');
			localStorage.removeItem('kocfia_hospital_rules_' + KOCFIA.storeUniqueId);

			KOCFIA.hospital.rules = {};
		};

		KOCFIA.hospital.getDuration = function( cityKey, unitKey, quantity ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('KOCFIA hospital getDuration function');

			var factor = parseFloat(window.cm.WorldSettings.getSetting("APOTHECARY_TIME_FACTOR")),
				time = '';

			if( !isNaN(factor) && quantity !== false ){
				time = parseInt(window.unitcost[ unitKey ][7], 10) * quantity / factor;
				if( time < 5 ) time = 5;
				if( quantity === 0 ) time = '';
			}

			return time;
		};

		KOCFIA.hospital.loadAutoRuleset = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital loadAutoRuleset function');
			if( !$.isEmptyObject( KOCFIA.hospital.rules ) ){
				var u, unitRules, cityKey, city, $tr, $addRule, $rules,
					$units = KOCFIA.hospital.$autoForm.find('tbody').find('tr');

				KOCFIA.hospital.$autoForm.find('.keep').val( Shared.format(KOCFIA.conf.hospital.keep) );

				for( cityKey in KOCFIA.hospital.rules ){
					if( KOCFIA.hospital.rules.hasOwnProperty( cityKey ) ){
						unitRules = KOCFIA.hospital.rules[ cityKey ];
						if( !$.isEmptyObject( unitRules ) ){
							for( u in unitRules ){
								if( unitRules.hasOwnProperty( u ) ){
									$tr = $units.filter('[data-unit="'+ u +'"]');
									$addRule = $tr.find('.addRule');
									$rules = $tr.find('.rules');

									rule = unitRules[ u ];
									$addRule.trigger('click');
									$rule = $rules.find('.rule').filter(':last');

									$rule.find('.active').prop('checked', rule.active);
									$rule.find('.city').val( cityKey );
									$rule.find('.quantity-min').val( Shared.format(rule.min) );
									$rule.find('.quantity-pack').val( Shared.format(rule.pack) ).trigger('change');
								}
							}
						}
					}
				}
			} else {
				KOCFIA.hospital.$autoForm.find('.addRule').eq(0).trigger('click');
			}
		};

		KOCFIA.hospital.planAutomaticRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital planAutomaticRules function');
			var $units = KOCFIA.hospital.$autoForm.find('tbody').find('tr'),
				$tr, i, u, cityKey, city, unitInfo, min, pack, keep,
				plan = {},
				errors = [],
				$regexp = /[^0-9,]/;

			keep = $.trim( KOCFIA.hospital.$autoForm.find('.keep').val() );
			if( keep === '' ) keep = 0;
			else keep = Shared.decodeFormat( keep );
			if( keep === false ){
				errors.push('Vous devez spécifier une quantité d\'or à conserver');
			}

			$units.each(function(){
				$tr = $(this);
				u = $tr.data('unit');
				plan[ u ] = {};
				unitInfo = KOCFIA.unitInfo[ u ];
				i = 0;

				$tr.find('.rule').each(function(i){
					label = 'pour '+ unitInfo.label +' '+ (i === 0 ? '1ère' : (i + 1) +'ème') +' configuration';
					$rule = $(this);
					cityKey = $rule.find('.city').val();
					min = $.trim( $rule.find('.quantity-min').val() );
					pack = $.trim( $rule.find('.pack').val() );
					tmp = {};

					if( city !== '' ){
						city = KOCFIA.cities[ cityKey ];
						plan[ u ][ cityKey ] = {};
					} else {
						errors.push('Vous devez spécifier une ville '+ label);
					}

					if( min === '' ) min = 0;
					else min = Shared.decodeFormat( min );

					if( min === false ){
						errors.push('Vous devez spécifier une quantité d\'activation valide '+ label);
					} else {
						plan[ u ][ cityKey ].min = min;
					}

					if( pack === '' ) pack = 1000;
					else pack = Shared.decodeFormat( pack );
					if( pack === false ){
						errors.push('Vous devez spécifier une quantité de paquet valide '+ label);
					} else {
						plan[ u ][ cityKey ].pack = pack;
					}

					plan[ u ][ cityKey ].active = $rule.find('.active').prop('checked');

					i += 1;
				});
			});

			//reorder by city [from] [to] [res]
			var finalPlan = {};
			for( u in plan ){
				if( plan.hasOwnProperty(u) ){
					for( cityKey in plan[ u ] ){
						if( plan[ u ].hasOwnProperty( cityKey ) ){
							if( !finalPlan.hasOwnProperty( cityKey ) ) finalPlan[ cityKey ] = {};

							finalPlan[ cityKey ][ u ] = {
								active: plan[ u ][ cityKey ].active,
								min: plan[ u ][ cityKey ].min,
								pack: plan[ u ][ cityKey ].pack
							};
						}
					}
				}
			}

			return {plan: finalPlan, keep: keep, errors: errors};
		};

		KOCFIA.hospital.launchAutomaticRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital launchAutomaticRules function', KOCFIA.hospital.rules);

			if( !$.isEmptyObject( KOCFIA.hospital.rules ) ){
				var cityIndex = 0, city, cityKey, unitsKey, unitsIndex,
					params, unitKey, rules, rule, wounded, rule, gold,
					available, quantity, cost, time;

				//start the hospital sequence
				var sequence = function(){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital launchAutomaticRules deferred sequence function');
					return $.Deferred(function(dfd){
						return dfd.pipe( fromCity(dfd) );
					}).promise();
				};

				//step 1 - find the sender
				var byCity = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital launchAutomaticRules deferred fromCity function', cityIndex);

					//sender loop finished
					if( cityIndex >= KOCFIA.citiesKey.length ){
						return dfd.resolve();
					}

					cityKey = KOCFIA.citiesKey[ cityIndex ];
					city = KOCFIA.cities[ cityKey ];

					if( !KOCFIA.hospital.rules.hasOwnProperty( cityKey ) ){
						cityIndex += 1;
						return dfd.pipe( byCity(dfd) );
					}

					//no need to parse the rules for a city with an ongoing healing
					if( window.seed.queue_revive.hasOwnProperty(cityKey)
						&& Array.isArray(window.seed.queue_revive[ cityKey ])
						&& window.seed.queue_revive[ cityKey ].length > 0
					){
						cityIndex += 1;
						return dfd.pipe( byCity(dfd) );
					}

					//units
					units = KOCFIA.hospital.rules[ cityKey ];
					//use the priority list for looping
					unitsKeys = KOCFIA.conf.hospital.priority;
					unitsIndex = 0;

					//requests parameters base
					params = $.extend({}, window.g_ajaxparams);
					params.cid = cityKey.replace(/city/, '');

					return dfd.pipe( byUnit(dfd) );
				};

				//step 2 - loop the units
				var byUnit = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital launchAutomaticRules deferred toCity function', unitsIndex, unitsKeys, units);
					//units loop finished
					if( unitsIndex >= unitsKeys.length ){
						cityIndex += 1;
						return dfd.pipe( byCity(dfd) );
					}

					unitKey = unitsKeys[ unitsIndex ];
					unitId = unitKey.replace(/unt/, ''); //u1

					wounded = 0;
					if( window.seed.woundedUnits && seed.woundedUnits.hasOwnProperty(cityKey) && window.seed.wondedUnits[ cityKey ].hasOwnProperty(unitId) ){
						wounded = parseInt(window.seed.wondedUnits[ cityKey ][ unitId ], 10);
						if( isNaN(wounded) ) wounded = 0;
					}

					//no wounded for this unit, continue
					if( wounded === 0 ){
						unitIndex += 1;
						return dfd.pipe( byUnit(dfd) );
					}

					//rules of the unit
					rule = destinations[ destKey ];

					//not enough wounded
					if( rule.min <= wounded ){
						unitIndex += 1;
						return dfd.pipe( byUnit(dfd) );
					}

					return dfd.pipe( checkRule(dfd) );
				};

				//step 3 - check the rule
				var checkRule = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital launchAutomaticRules deferred checkRule function', rule);

					available = wounded - rule.min;
					if( available < rule.pack ) quantity = available;
					else if( available > rule.pack ) quantity = rule.pack;

					//check cost
					cost = cm.WorldSettings.getSettingAsObject("APOTHECARY_COST");
					if( Object.isObject(cost) && cost.hasOwnProperty(unitId) ){
						cost = parseFloat( cost[ unitId ]['Cost'] );
						if( isNaN(cost) ) return dfd.reject();
					} else cost = 2000;

					cost *= quantity;

					gold = parseInt(window.seed.citystats[ cityKey ].gold[0], 10);

					if( cost > gold - KOCFIA.conf.hospital.keep ){
						cityIndex += 1;
						return dfd.pipe( byCity(dfd) );
					}

					params.type = unitId;
					params.quant = quantity;
					params.items = '';
					params.gambleId = 0;
					params.apothecary = true;

					time = KOCFIA.hospital.getDuration( cityKey, unitKey, quantity );

					return dfd.pipe( launch(dfd, params, 3) );
				};

				//step 4 - try to launch the march
				var launch = function( dfd, tParams, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('hospital') ) console.info('kocfia hospital launchAutomaticRules deferred launch function', tParams, attempts);
					$.ajax({
							url: window.g_ajaxpath + "ajax/train.php" + window.g_ajaxsuffix,
							type: 'post',
							data: tParams,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(data){
							if( data.ok ){
								if( window.seed.queue_revive ){
									if( !window.seed.queue_revive.hasOwnProperty(cityKey) ) window.seed.queue_revive[ cityKey ] = [];

									if (!data.initTS) {
										data.initTS = Date.timestamp() - 1;
									}

									window.seed.queue_revive[ cityKey ].push([unitId, quantity, data.initTS, parseInt(data.initTS, 10) + time, 0, time, null]);

									window.seed.citystats[ cityKey ].gold[0] -= cost;
									update_gold();

									window.seed.woundedUnits[ cityKey ][ unitId ] = parseInt(window.seed.woundedUnits[ cityKey ][ unitId ], 10) - quantity;
								}
							} else {
								if( data.msg ){
									cityIndex += 1;
									return dfd.pipe( byCity(dfd) );
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										window.setTimeout(function(){ return dfd.pipe( launch(dfd, tParams, attempts) ); }, 5000);
									} else {
										cityIndex += 1;
										return dfd.pipe( byCity(dfd) );
									}
								}
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( launch(dfd, tParams, attempts) );
							else {
								window.setTimeout(function(){
									cityIndex += 1;
									return dfd.pipe( byCity(dfd) );
								}, 5000);
							}
						});
				};

				$.when( sequence() );
			}
		};

	/* PLAYERS OR ALLIANCES SEARCH */
		KOCFIA.search = {
			options: {
				active: 0
			},
			stored: []
		};

		KOCFIA.search.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('search') ) console.info('KOCFIA search confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.search +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('search', 'active', 'Activer', KOCFIA.conf.search.active);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.search.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('search') ) console.info('KOCFIA search modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-search').html('');
		};

		KOCFIA.search.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('search') ) console.info('KOCFIA search on function');
		};

		KOCFIA.search.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('search') ) console.info('KOCFIA search off function');
		};

	/* GIFTS */
		KOCFIA.gifts = {
			options: {
				active: 1
			},
			stored: ['players'],
			players: []
		};

		KOCFIA.gifts.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('gifts') ) console.info('KOCFIA gifts confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.gifts +'</h3>';
			code += '<div>';
			code += '<p>Séléctionne automatiquement les joueurs précédemment sélectionnés pour l\'envoie de cadeaux</p>';
			code += Shared.generateCheckbox('gifts', 'active', 'Activer', KOCFIA.conf.gifts.active);
			code += Shared.generateButton('gifts', 'deletePlayers', 'Supprimer la liste des joueurs');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.gifts.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('gifts') ) console.info('KOCFIA gifts on function');

			$body.delegate('click', '#chooseFriendContainer #sendAllianceGift', function(){
				var list = $('#chooseFriendContainer').find('input').filter(':checked').map(function(){ return this.id; }).get();

				if( Array.isArray(list) && list.length > 0 ){
					KOCFIA.gifts.players = list;
					KOCFIA.gifts.storePlayers();
				}
			});
		};

		KOCFIA.gifts.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('gifts') ) console.info('KOCFIA gifts off function');

			$body.undelegate('click', '#chooseFriendContainer #sendAllianceGift');
		};

		KOCFIA.gifts.selectPlayers = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('gifts') ) console.info('KOCFIA gifts selectPlayers function');

			if( KOCFIA.conf.gifts.active && KOCFIA.gifts.players.length > 0 ){
				$('#chooseFriendContainer').find('input').prop('checked', false).each(function(){
					if( $.inArray(this.id, KOCFIA.gifts.players) > -1 ){
						$(this).prop('checked', true);
					}
				});
			}
		};

		KOCFIA.gifts.storePlayers = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('gifts') ) console.info('KOCFIA gifts storePlayers function');

			localStorage.setObject('kocfia_gifts_players_' + KOCFIA.storeUniqueId, KOCIFA.gifts.players);
		};

		KOCFIA.gifts.deletePlayers = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('gifts') ) console.info('KOCFIA gifts deletePlayers function');

			localStorage.setObject('kocfia_gifts_players_' + KOCFIA.storeUniqueId, '');
		};

	/* TOURNAMENT */
		KOCFIA.tournament = {
			options: {
				active: 0,
				refresh: 0,
				monitor: 0,
				soundUrl: 'http://kocfia.kapok.fr/alliance.ogg',
				onGoing: 0
			},
			stored: []
		};

		KOCFIA.tournament.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.tournament +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('tournament', 'active', 'Activer', KOCFIA.conf.tournament.active);
			code += Shared.generateCheckbox('tournament', 'monitor', 'Vérifier le lancement de tournoi', KOCFIA.conf.tournament.monitor);
			code += Shared.generateAudioInput('tournament', 'soundUrl', 'Adresse web du son à jouer pour le démarrage d\'un tournoi <small>(wave, vorbis, ogg, webm)</small>', KOCFIA.conf.tournament.soundUrl, '');
			code += Shared.generateCheckbox('tournament', 'refresh', 'Raffraîchir automatiquement le classement', KOCFIA.conf.tournament.refresh);
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.tournament.tournamentPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament tournamentPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-tournament').html('');

			var help = KOCFIA.tournament.getHelp();

			var code = '<div class="infos">';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div><h3>Classement</h3>';
			code += help;

			$section.append( code );
		};

		KOCFIA.tournament.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament on function');

			if( KOCFIA.conf.tournament.monitor ){
				KOCFIA.tournament.monitor();
			}
		};

		KOCFIA.tournament.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament off function');

			KOCFIA.tournament.automaticOff();
		};

		KOCFIA.tournament.monitor = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament monitor function');

			if( KOCFIA.conf.tournament.monitor ){
				tournamentMonitorInterval = window.setInterval(function(){
					KOCFIA.tournament.checkTournament(3);
				}, 5 * 60 * 1000);
			} else {
				window.clearInterval( tournamentMonitorInterval );
			}
		};

		KOCFIA.tournament.checkTournament = function( attempts ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament checkTournament function');
				var params = $.extend({}, window.g_ajaxparams);
				params.format = 2;
				params.tournyPos = 0;

				$.ajax({
					url: window.g_ajaxpath + "ajax/getLeaderboard.php" + window.g_ajaxsuffix,
					type: 'post',
					data: params,
					dataType: 'json',
					timeout: 10000
				})
				.done(function( result ){
					if( result.ok ){
						if( result.data ){
							if( !KOCFIA.conf.tournament.onGoing ){
								KOCFIA.conf.tournament.onGoing = 1;
								Shared.storeConf();

								var $soundTournament = $('<audio id="kocfia-sound-tournament" src="'+ KOCFIA.conf.tournament.soundUrl +'" preload="auto">');

								$body.append( $soundTournament );
								$soundTournament[0].play();

								window.setTimeout(function(){ $soundTournament.remove(); }, 30000);
							}
						} else if( KOCFIA.conf.tournament.onGoing ){
							KOCFIA.conf.tournament.onGoing = 1;
							Shared.storeConf();
						}
					} else {
						attempts -= 1;
						if( attempts > 0 ){
							KOCFIA.tournament.checkTournament( attempts );
						}
					}
				})
				.fail(function(){
					attempts -= 1;
					if( attempts > 0 ){
						KOCFIA.tournament.checkTournament( attempts );
					}
				});
		};

		KOCFIA.tournament.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('tournament') ) console.info('KOCFIA tournament getHelp function');
			var help = '<div id="kocfia-tournament-help" class="help" title="Aide tournament">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '</ul></div>';

			return help;
		};

	/* CHECK AND LAUNCH ATTACK */
		KOCFIA.checkAndLaunchAttack = function( attack ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack function', attack);

			//manage bad attack plans
			if( !attack.hasOwnProperty('category') ) return false;

			var mod = attack.category,
				label = (attack.type != 'scout' ? 'attaque' : 'eclairage'),
				stopped = false,
				status,
				check = KOCFIA.conf[ mod ] && KOCFIA.conf[ mod ].hasOwnProperty('active') && KOCFIA.conf[ mod ].active;
			if( !check ){
				KOCFIA[ mod ].refreshOngoingInfo(attack, true, (mod == 'scout' ? 'Eclairages automatiques stoppés' : 'Attaques automatiques stoppées.'));
				return false;
			}

			if( KOCFIA.captchaDetected ){
				KOCFIA[ mod ].refreshOngoingInfo(attack, true, (mod == 'scout' ? 'Eclairages automatiques ' : 'Attaques automatiques ') +' en pause pour cause de captcha.');
				return false;
			}

			var $tr = null;
			if( mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder' ){
				$tr = KOCFIA[ mod ].$ongoing.find('tbody').filter('[data-city="'+ attack.cityKey +'"]').find('tr').filter('[data-attack="'+ attack.id +'"]');
			} else if( mod == 'darkForest' ){
				$tr = KOCFIA[ mod ].$ongoing.find('tbody').find('tr');
			} else if( mod == 'scout' ){
				$tr = KOCFIA[ mod ].$ongoing.find('tbody').find('tr').filter('[data-attack="'+ attack.id +'"]');
			}

			var stop = function(){
				stopped = true;
				KOCFIA[ mod ].refreshOngoingInfo(attack, true, (mod == 'scout' ? 'Eclairage stoppé' : 'Attaque stoppée') +' sur demande.');

				if( attack.marching.length ) Shared.recallWaves( attack );

				if( $tr !== null ) $tr.find('.charge').show();
			};

			if( $tr.data('stop') ){
				stop();
				return false;
			}

			KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Tentative de lancement en cours.');

			//coords
			if( mod == 'darkForest' ){
				var darkForestCoords = KOCFIA[ mod ].getCoords();
				if( darkForestCoords === false ){
					KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Récupération des coordonnées.');

					//launch the search for coords
					$.when( KOCFIA.darkForest.search( $tr ) )
						.always(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						});
					return false;
				} else if( darkForestCoords.status == 'outdated' ){
					KOCFIA[ mod ].coords = {};
					//launch the search for coords
					$.when( KOCFIA.darkForest.search( $tr ) )
						.always(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						});
					return false;
				} else if( darkForestCoords.status != 'complete' ){
					var timestamp = Date.timestamp() - 5 * 60 ;
					//wait 5 min for each step
					if( darkForestCoords.timestamp < timestamp ){
						KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Récupération des coordonnées.');

						//launch the search for coords
						$.when( KOCFIA.darkForest.search( $tr ) )
							.always(function(){
								KOCFIA.checkAndLaunchAttack( attack );
							});
						return false;
					}
					KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Liste de coordonnées partielles trouvées.');

					coords = darkForestCoords.list;
				} else {
					coords = darkForestCoords.list;
				}
			} else {
				coords = attack.coords;
			}
			coordsLength = coords.length;

			//security, defining missing properties
			if( !attack.hasOwnProperty('marching') ) attack.marching = [];
			if( !attack.hasOwnProperty('coordIndex') ) attack.coordIndex = 0;
			if( attack.hasOwnProperty('timeout') ) delete attack.timeout;

			var coordsLength, coords, waveIndex,
				cloneIndex, time, city,
				cloning = false,
				bunch = [], bunchLength;

			/** sequences
			 * wilderness & barbarian & plunder
			 *		previousMarchingCheck
			 *		resetTracks
			 *		checkRallyPoint
			 *		(plunder) checkPlayerOnlineStatus
			 *		checkCoords (recursive on coords list)
			 *			checkCoord
			 *		checkAndLaunchWaves
			 *			findLostKnights
			 *			checkKnight
			 *			checkUnits
			 *			launchWave
			 *			clone last wave if setted
			 *
			 * scout
			 *		previousMarchingCheck
			 *		resetTracks
			 *		checkRallyPoint (for all cities, at least a slot free, counting keep free slot parameter)
			 *		checkCoords (recursive on coords list)
			 *			checkCoord
			 *				use the closest city with a slot free in rally point (not via checkRallyPoint)
			 *		checkAndLaunchWaves
			 *			findLostKnights
			 *			checkKnight
			 *			checkUnits
			 *			launchWave
			 *
			 * darkForest
			 *		previousMarchingCheck
			 *		resetTracks
			 *		checkRallyPoint (for all cities, at least a slot free, counting keep free slot parameter)
			 *		checkCoords (recursive on coords list)
			 *			checkCoordByGroup ( do 10 coords at a time )
			 *				groupedCheck
			 *					if a dark forest is found
			 *					for each active cities, is there a matching active rule
			 *						check rallypoint, knight, troops
			 *						launch
			 */

			/* deferred attack functions */
				//check previous marches for "away without leave" troops
				var previousMarchingCheck = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred previousMarchingCheck function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					if( mod == 'darkForest' && !attack.hasOwnProperty('marchingCoords') ) attack.marchingCoords = [];

					var marches = [],
						marchesCoord = [];

					var checkMarch = function(dfd, i, attempts){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkMarch function');

						if( mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder' ){
							march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
						} else {
							march = null;
							for( j = 0; j < attack.cities.length; j+= 1 ){
								if( window.seed.queue_atkp[ attack.cities[j] ] ){
									attack.cityKey = attack.cities[j];
									march = window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ];
									if( march ){
										break;
									}
								}
							}

							if( march === null ){
								i += 1;
								if( i >= mLength ){
									attack.marching = marches;
									return dfd.pipe( resetTracks(dfd) );
								} else {
									return dfd.pipe( checkMarch(dfd, i) );
								}
							}
						}

						if( march ){
							marches.push( attack.marching[i] );
							if( mod != 'wilderness' && mod != 'barbarian' && mod != 'plunder' ) marchesCoord.push( march.toXCoord +','+ march.toYCoord );
						}

						if( march && !march.hasOwnProperty('kocfiaUpdated') ){
							var mParams = $.extend(true, {}, window.g_ajaxparams);
							mParams.rid = attack.marching[i];
							$.ajax({
								url: window.g_ajaxpath + "ajax/fetchMarch.php" + window.g_ajaxsuffix,
								type: 'post',
								data: mParams,
								dataType: 'json',
								timeout: 10000
							})
							.done(function(data){
								if( data.ok ){
									//set the units Return value
									for( j = 1; j < 13; j += 1 ){
										if( data.march['unit'+ j +'Return'] ){
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['unit'+ j +'Return'] = data.march['unit'+ j +'Return'];
										}
									}

									for( j = 1; j < 6; j += 1 ){
										if( data.march['resource' + j] ){
											window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ]['resource' + j] = data.march['resource' + j];
										}
									}

									window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].marchStatus = data.march.marchStatus;
									window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].hasUpdated = true;

									window.seed.queue_atkp[ attack.cityKey ][ 'm' + attack.marching[i] ].kocfiaUpdated = true;

									if( data.march.marchStatus == 2 ){ //MARCH_STATUS_DEFENDING
										window.attack_recall(attack.marching[i], 1, attack.cityKey);
									}

									i += 1;
									attempts = 3;
									if( i >= mLength ){
										attack.marching = marches;
										if( mod != 'wilderness' && mod != 'barbarian' && mod != 'plunder' ) attack.marchingCoords = marchesCoord;
										return dfd.pipe( resetTracks(dfd) );
									} else {
										return dfd.pipe( checkMarch(dfd, i) );
									}
								} else {
									attempts -= 1;
									if( attempts > 0 ){
										return dfd.pipe( checkMarch(dfd, i) );
									} else {
										i += 1;
										if( i >= mLength ){
											attack.marching = marches;
											if( mod != 'wilderness' && mod != 'barbarian' && mod != 'plunder' ) attack.marchingCoords = marchesCoord;
											return dfd.pipe( resetTracks(dfd) );
										} else {
											return dfd.pipe( checkMarch(dfd, i) );
										}
									}
								}
							})
							.fail(function(){
								//network or server error
								attempts -= 1;
								if( attempts > 0 ){
									return dfd.pipe( checkMarch(dfd, i) );
								} else {
									i += 1;
									if( i >= mLength ){
										attack.marching = marches;
										if( mod != 'wilderness' && mod != 'barbarian' && mod != 'plunder' ) attack.marchingCoords = marchesCoord;
										return dfd.pipe( resetTracks(dfd) );
									} else {
										return dfd.pipe( checkMarch(dfd, i) );
									}
								}
							});
						} else {
							i += 1;
							if( i >= mLength ){
								attack.marching = marches;
								if( mod != 'wilderness' && mod != 'barbarian' && mod != 'plunder' ) attack.marchingCoords = marchesCoord;
								return dfd.pipe( resetTracks(dfd) );
							} else {
								return dfd.pipe( checkMarch(dfd, i) );
							}
						}
					};

					var mParams = $.extend({}, window.g_ajaxparams),
						i = 0, j, march,
						mLength = attack.marching.length;
					if( mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder' ){
						if( window.seed.queue_atkp[ attack.cityKey ] ){
							if( mLength === 0 ){
								return dfd.pipe( resetTracks(dfd) );
							}

							return dfd.pipe( checkMarch(dfd, i, 3) );
						} else {
							return dfd.pipe( resetTracks(dfd) );
						}
					} else {
						//attack.marching is shared by all cities
						if( mLength === 0 ){
							return dfd.pipe( resetTracks(dfd) );
						} else {
							return dfd.pipe( checkMarch(dfd, i, 3) );
						}
					}
				};

				//attack tracking arrays reset
				var resetTracks = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred resetTracks function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					//force refresh of attack queue for current city with march from the attack
					if( attack.marching.length ){
						window.attack_generatequeue();
					}

					return dfd.pipe(checkRallyPoint(dfd));
				};

				//check rally point slots
				var checkRallyPoint = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkRallyPoint function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					var i, slots, keepFree;
					if( mod == 'darkForest' ){
						//at least a slot is needed in an "active" city
						for( i = 0; i < attack.cities.length; i += 1 ){
							if( attack.info[ attack.cities[i] ].active ){
								slots = Shared.getRallyPointSlots( attack.cities[i] );
								keepFree = attack.hasOwnProperty('rpSlot') ? parseInt(attack.rpSlot, 10) : 0;
								if( slots - keepFree > 0 ){
									return dfd.pipe( checkCoords(dfd) );
								}
							}
						}

						KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de place dans le point de ralliement pour les villes actives.');
						return dfd.reject();
					} else if( mod == 'scout' ){
						//at least a slot is needed in a city
						for( i = 0; i < attack.cities.length; i += 1 ){
							slots = Shared.getRallyPointSlots( attack.cities[i] );
							keepFree = attack.hasOwnProperty('rpSlot') ? parseInt(attack.rpSlot, 10) : 0;
							if( slots - keepFree > 0 ){
								return dfd.pipe( checkCoords(dfd) );
							}
						}

						KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de place dans le point de ralliement pour les villes actives.');
						return dfd.reject();
					} else {
						slots = Shared.getRallyPointSlots( attack.cityKey );
						keepFree = attack.hasOwnProperty('rpSlot') ? parseInt(attack.rpSlot, 10) : 0;
						if( slots - keepFree <= 0 || slots - keepFree < attack.waves.length ){
							KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de place dans le point de ralliement.');
							return dfd.reject();
						}
					}

					if( mod == 'plunder' ){
						return dfd.pipe( checkPlayerOnlineStatus(dfd, 3) );
					} else {
						return dfd.pipe( checkCoords(dfd) );
					}
				};

				//plunder only - online status check for targetted player
				var checkPlayerOnlineStatus = function(dfd, attempts){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkPlayerOnlineStatus function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					if( attack.hasOwnProperty('targetUserId') ){
						//get user id for targetted player
						var name = attack.targetName.replace(/\'/g, '_'),
							params = $.extend(true, {}, window.g_ajaxparams);
						params.searchName = name;
						params.subType = "ALLIANCE_INVITE";

						$.ajax({
							url: window.g_ajaxpath + "ajax/searchPlayers.php" + window.g_ajaxsuffix,
							type: 'post',
							data: params,
							dataType: 'json',
							timeout: 10000
						})
						.done(function(data){
							if( data.ok ){
								if( data.matchedUsers && !$.isEmptyObject(data.matchedUsers) && data.matchedUsers.hasOwnProperty(name) ){
									attack.targetUserId = data.matchedUsers[ name ].userId;
									//now get the online status
									return dfd.pipe(checkPlayerOnlineStatus(dfd, 3));
								}

								KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Joueur '+ attack.targetName +' non trouvé ou non unique, attaque annulée.');
								return dfd.reject();
							} else {
								attempts -= 1;
								if( attempts > 0 ) return dfd.pipe( checkPlayerOnlineStatus(dfd, attempts) );
								else dfd.reject();
							}
						})
						.fail(function(){
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( checkPlayerOnlineStatus(dfd, attempts) );
							else dfd.reject();
						});
					}

					var params = $.extend(true, {}, window.g_ajaxparams);
					params.pid = attack.targetUserId;

					$.ajax({
						url: window.g_ajaxpath + "ajax/getOnline.php" + window.g_ajaxsuffix,
						type: 'post',
						data: params,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(data){
						if( data.ok ){
							if( !$.isEmptyObject(data.data) && data.data[ userId ] === true ){
								return dfd.pipe( checkCoords(dfd) );
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Joueur '+ attack.targetName +' connecté, attaque annulée.');
								return dfd.reject();
							}
						} else {
							attempts -= 1;
							if( attempts > 0 ) return dfd.pipe( checkPlayerOnlineStatus(dfd, attempts) );
							else dfd.reject();
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ) return dfd.pipe( checkPlayerOnlineStatus(dfd, attempts) );
						else dfd.reject();
					});
				};

				//loop function for checking each coords until one valid is found, use deferred.pipe() to iterate
				var checkCoords = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkCoords function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					if( mod != 'darkForest' ){
						return dfd.pipe( checkCoord(dfd, 3) );
					} else {
						return dfd.pipe( checkCoordByGroup(dfd, 3) );
					}
				};

				//check one coord and return the result using the deferred object in parameter
				var checkCoord = function( dfd, attempts ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkCoord function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					KOCFIA[ mod ].refreshOngoingInfo(attack, false);

					if( attack.coordIndex >= coordsLength ){
						KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Aucune coordonnée validée pour l\''+ label +'.');
						return dfd.reject();
					}

					var gps = coords[ attack.coordIndex ].split(','),
						cParams = $.extend(true, {}, window.g_ajaxparams);

					//check claim on the target
					cParams.blocks = "bl_" + gps[0] + "_bt_" + gps[1];
					$.ajax({
						url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
						type: 'post',
						data: cParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(result){
						if( result.data ){
							var info = result.data['l_'+ gps[0] +'_t_'+ gps[1]];
							if( info ){
								var type = parseInt(info.tileType, 10);
								if( mod == 'wilderness' ){
									if( type <= 0 || type > 50 ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) n\'est pas une terre sauvage.');
										attack.coordIndex += 1;

										return dfd.pipe( checkCoord(dfd, 3) );

									} else if( (info.tileUserId !== null && parseInt(info.tileUserId, 10) !== 0) || (info.tileCityId !== null && parseInt(info.tileCityId, 10) !== 0) || info.misted ){ //"0" -> under mists, "xxx" -> no mists
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) occupées.');
										attack.coordIndex += 1;
										return dfd.pipe( checkCoord(dfd, 3) );

									} else {
										baseParams.xcoord = gps[0];
										baseParams.ycoord = gps[1];
										return dfd.pipe( checkAndLaunchWaves(dfd) );
									}
								} else if( mod == 'barbarian' ){
									if( type != 51 || info.tileCityId !== null ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) n\'est pas un camp barbare.');
										attack.coordIndex += 1;

										return dfd.pipe( checkCoord(dfd, 3) );

									} else {
										baseParams.xcoord = gps[0];
										baseParams.ycoord = gps[1];
										return dfd.pipe( checkAndLaunchWaves(dfd) );
									}
								} else if( mod == 'plunder' ){
									if( type != 51 || info.tileCityId === null ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) n\'est pas une ville.');
										attack.coordIndex += 1;

										return dfd.pipe( checkCoord(dfd, 3) );

									} else {
										baseParams.xcoord = gps[0];
										baseParams.ycoord = gps[1];
										return dfd.pipe( checkAndLaunchWaves(dfd) );
									}
								} else if( mod == 'scout' ){
									var closest = '', range = 999, r;
									for( i = 0; i < attack.cities.length; i += 1 ){
										attack.cityKey = attack.cities[i];
										city = KOCFIA.cities[ attack.cityKey ];

										if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoAttack && KOCFIA.alarm.underAttack.hasOwnPropery( attack.cityKey ) ){
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, city.label +' attaquée, ville suivante.');
											continue;
										}

										var slots = Shared.getRallyPointSlots( attack.cityKey ),
											keepFree = parseInt(attack.rpSlot, 10) || 0;
										if( slots - keepFree > 0 ){
											//check units
											if( parseInt(window.seed.units[ attack.cityKey ].unt3, 10) === 0 ){
												KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez '+ KOCFIA.unitInfo.unt3.labelBis + KOCFIA.unitInfo.unt3.label +' dans '+ city.label +'.');
												continue;
											}

											r = Shared.getDistance(city.coords.x, city.coords.y, gps[0], gps[1]);
											if( r < range ){
												range = r;
												closest = attack.cityKey;
											}
										} else {
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de place dans le point de ralliement de '+ city.label +'.');
											continue;
										}
									}

									if( closest !== '' ){
										attack.cityKey = closest;
										city = KOCFIA.cities[ attack.cityKey ];
										baseParams.cid = attack.cityKey.replace(/city/, '');
									} else {
										//all cities have no slots left
										return dfd.reject();
									}

									baseParams.xcoord = gps[0];
									baseParams.ycoord = gps[1];
									return dfd.pipe( checkAndLaunchWaves(dfd) );
								}
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Informations sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e) manquantes.');

								attack.coordIndex += 1;

								return dfd.pipe( checkCoord(dfd, 3) );
							}
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( checkCoord(dfd, attempts) );
							} else {
								attack.coordIndex += 1;

								return dfd.pipe( checkCoord(dfd, 3) );
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( checkCoord(dfd, attempts) );
						} else {
							attack.coordIndex += 1;

							return dfd.pipe( checkCoord(dfd, 3) );
						}
					});
				};

				//check severals coords at a time
				var checkCoordByGroup = function(dfd, attempts){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkCoordByGroup function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					KOCFIA[ mod ].refreshOngoingInfo(attack, false);

					if( attack.coordIndex >= coordsLength ){
						KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Parcours des coordonnées fini.');
						return dfd.reject();
					}

					var cParams = jQuery.extend(true, {}, window.g_ajaxparams),
						i, gps, blocks = [];

					bunch = [];
					for( i = 0; i < 50; i += 1 ){
						if( attack.coordIndex + i >= coordsLength ){
							break;
						}
						gps = coords[ attack.coordIndex + i ].split(',');
						bunch.push( gps );

						blocks.push("bl_" + gps[0] + "_bt_" + gps[1]);
					}
					bunchLength = bunch.length;

					cParams.blocks = blocks.join(',');

					$.ajax({
						url: window.g_ajaxpath + "ajax/fetchMapTiles.php" + window.g_ajaxsuffix,
						type: 'post',
						data: cParams,
						dataType: 'json',
						timeout: 10000
					})
					.done(function(result){
						if( result.data ){
							return dfd.pipe( groupedCheck(dfd, result.data) );
						} else {
							attempts -= 1;
							if( attempts > 0 ){
								return dfd.pipe( checkCoordByGroup(dfd, attempts) );
							} else {
								attack.coordIndex += 1;
								return dfd.pipe( checkCoordByGroup(dfd, 3) );
							}
						}
					})
					.fail(function(){
						attempts -= 1;
						if( attempts > 0 ){
							return dfd.pipe( checkCoordByGroup(dfd, attempts) );
						} else {
							attack.coordIndex += 1;

							return dfd.pipe( checkCoordByGroup(dfd, 3) );
						}
					});
				};

				var groupedCheck = function(dfd, data){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred groupedCheck function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}
					var bunchIndex = 0;

					KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Vérifications '+ (attack.coordIndex + 1) +' à '+ (attack.coordIndex + bunchLength ) +' sur '+ coordsLength +'.');

					var bunchSequence = function(){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred bunchSequence function');
						return $.Deferred(function(bdfd){
							return bdfd.pipe( bunchCheck(bdfd, data) );
						}).promise();
					};

					var bunchCheck = function(bdfd){
						if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred bunchCheck function');
						if( $tr.data('stop') ){
							stop();
							return dfd.reject();
						}

						if( bunchIndex >= bunch.length ){
							return bdfd.resolve();
						}

						var info = data['l_'+ bunch[ bunchIndex ][0] +'_t_'+ bunch[ bunchIndex ][1]],
							gps = bunch[ bunchIndex ];
						if( info ){
							var type = parseInt(info.tileType, 10);
							if( type != 54 && type !== 0 ){
								//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + bunchIndex + 1) +'e / '+ coordsLength +') n\'est pas une forêt sombre ou un marais.');
								//will force the update of coords on next checkAndLaunchAttack call
								KOCFIA[ mod ].coords.status = 'outdated';
								bunchIndex += 1;
								return bdfd.pipe( bunchCheck(bdfd) );
							} else if( type === 0 ){
								//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + bunchIndex + 1) +'e / '+ coordsLength +') est un marais.');
								bunchIndex += 1;
								return bdfd.pipe( bunchCheck(bdfd) );
							} else if( $.inArray(coords[ attack.coordIndex + bunchIndex ], attack.marchingCoords) > -1 ){
								//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + bunchIndex + 1) +'e / '+ coordsLength +') déjà attaquée.');
								bunchIndex += 1;
								return bdfd.pipe( bunchCheck(bdfd) );
							} else {
								//check if the coord level correspond to an "active" city with an "active" rule
								var found = false, level, i, j, k, wave, enoughUnits,
									units, unit, unitKey, qty, available,
									keep, slots, keepFree, knights, highest, lowest;

								//order cities by range
								var rangeOrder = [], r;
								for( i = 0; i < attack.cities.length; i += 1 ){
									if( attack.info[ attack.cities[i] ].active ){
										city = KOCFIA.cities[ attack.cities[i] ];
										r = Shared.getDistance(city.coords.x, city.coords.y, gps[0], gps[1]);
										if( r < 100 ){
											rangeOrder.push( attack.cities[i] );
										}
									}
								}
								rangeOrder.sort(function(a, b){ return a - b; });

								for( i = 0; i < rangeOrder.length; i += 1 ){
									attack.cityKey = rangeOrder[i];
									if( attack.info[ attack.cityKey ].active ){
										if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoAttack && KOCFIA.alarm.underAttack.hasOwnPropery( attack.cityKey ) ){
											//KOCFIA[ mod ].refreshOngoingInfo(attack, false, city.label +' attaquée, ville suivante.');
											continue;
										}

										city = KOCFIA.cities[ attack.cityKey ];

										//has the city a corresponding active rule
										if( attack.levels[ attack.cityKey ].hasOwnProperty( info.tileLevel ) && attack.levels[ attack.cityKey ][ info.tileLevel ].active ){
											//set the attack for on wave launch
												attack.rpSlot = attack.info[ attack.cityKey ].rps;
												level = attack.levels[ attack.cityKey ][ info.tileLevel ];

											//check rally point slot
												slots = Shared.getRallyPointSlots( attack.cityKey );
												keepFree = parseInt(attack.rpSlot, 10) || 0;
												if( slots - keepFree <= 0 || slots - keepFree < level.waves.length ){
													//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de place dans le point de ralliement de '+ city.label +'.');
													continue;
												}

											//check knight
												Shared.freeKnights( attack.cityKey );
												knights = Shared.getAvailableKnights( attack.cityKey );
												if( knights.length < level.waves.length ){
													//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de chevalier'+ (level.waves.length > 1 ? 's' : '') +' disponible'+ (level.waves.length > 1 ? 's' : '') +' pour lancer '+ (level.waves.length > 1 ? 'les '+ level.waves.length +' vagues' : 'la vague') +' depuis '+ city.label +'.');
													continue;
												}

												if( level.knightPriority === '' ){
													knight = knights[0].knightId;
												} else if( level.knightPriority == 'highest' ){
													highest = 0;
													for( k = 0; k < knights.length; k += 1 ){
														if( parseFloat(knights[k].combat) > highest ){
															knight = knights[k].knightId;
														}
													}
													if( knight === null ){
														//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Chevalier indisponible dans '+ city.label +'.');
														continue;
													}
												} else if( level.knightPriority == 'lowest' ){
													lowest = 0;
													for( k = 0; k < knights.length; k += 1 ){
														if( knights.hasOwnProperty(k) && parseFloat(knights[k].combat) < lowest ){
															knight = knights[k].knightId;
														}
													}
													if( knight === null ){
														//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Chevalier indisponible dans '+ city.label +'.');
														continue;
													}
												}
												baseParams.kid = knight;

											//transform darkForest keep and waves into attack keep and waves format
												attack.waves = level.waves;

												attack.keep = attack.info[ attack.cityKey ].keep;

											//check units
												units = window.seed.units[ attack.cityKey ];
												enoughUnits = true;
												for( w = 0; w < attack.waves.length; w += 1 ){
													if( !enoughUnits ) continue;
													wave = attack.waves[w];
													for( unit in wave ){
														if( wave.hasOwnProperty(unit) && unit.indexOf('knight') == -1 ){
															unitKey = unit.replace(/nt/, '');
															qty = parseFloat( wave[ unit ] );

															available = parseFloat(units[ unit ]);
															if( available < qty ){
																//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de troupe ('+ window.unitcost[ unit ][0] +') dans '+ city.label +'.');
																enoughUnits = false;
															} else {
																if( attack.keep.hasOwnProperty(unit) ){
																	keep = parseFloat( attack.keep[ unit ] );
																	if( available - qty < keep ){
																		//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de troupe ('+ window.unitcost[ unit ][0] +') (conservation) dans '+ city.label +'.');
																		enoughUnits = false;
																	}
																}
															}
														}
													}
												}
												if( !enoughUnits ) continue;

											baseParams.cid = attack.cityKey.replace(/city/, '');

											//for the city all checks are ok
											found = true;
											break;
										}
									}
								}

								if( !found ){
									//KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Coordonnées '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) +'e / '+ coordsLength +') n\'est pas du bon niveau ('+ info.tileLevel +').');
									bunchIndex += 1;
									return bdfd.pipe( bunchCheck(bdfd) );
								}

								baseParams.xcoord = gps[0];
								baseParams.ycoord = gps[1];
								bunchIndex += 1;
								return bdfd.pipe( checkAndLaunchWaves(bdfd) );
							}
						}
					};

					$.when( bunchSequence() )
						.always(function(){
							attack.coordIndex += bunchIndex;
							return dfd.pipe( checkCoordByGroup(dfd, 3) );
						});
				};

				//loop function for checking and launching each wave, use deferred.pipe() to iterate
				var checkAndLaunchWaves = function(dfd){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkAndLaunchWaves function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					waveIndex = 0;
					return dfd.pipe(checkAndLaunchWave(dfd));
				};

				//check wave integrity (knight, troops, keep) and launch the wave
				var checkAndLaunchWave = function( dfd ){
					if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkAndLaunchWave function');
					if( $tr.data('stop') ){
						stop();
						return dfd.reject();
					}

					/* deferred wave specific functions */
						//first in wave sequence, will pipe the deferred resolution to checkKnight function
						var findLostKnights = function(wdfd){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred findLostKnights function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							Shared.freeKnights( attack.cityKey );
							return wdfd.pipe( checkKnight(wdfd) );
						};

						//second in wave sequence, will pipe the deferred resolution to checkUnits function
						var checkKnight = function(wdfd){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkKnight function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							var knights = Shared.getAvailableKnights( attack.cityKey ),
								k;

							if( waveIndex === 0 && attack.waves.length > 1 && knights.length < attack.waves.length ){
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Pas assez de chevalier disponible pour lancer les '+ attack.waves.length +' vagues.');
								return wdfd.reject();
							}

							if( knights.length === 0 ){
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Aucun chevalier disponible.');
								return wdfd.reject();
							}

							if( wave.knight === '' ){
								knight = knights[0].knightId;
							} else {
								for( k in knights ){
									if( knights.hasOwnProperty(k) ){
										if( wave.knight == knights[k].knightId ){
											knight = knights[k].knightId;
											break;
										}
									}
								}
								if( knight === null ){
									KOCFIA[ mod ].refreshOngoingInfo(attack, false, 'Chevalier indisponible.');
									return wdfd.reject();
								}
							}

							wParams.kid = knight;
							return wdfd.pipe( checkUnits(wdfd) );
						};

						//third in wave sequence, will pipe the deferred resolution to launchWave function
						var checkUnits = function(wdfd){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred checkUnits function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							var unit, unitKey, unitNum, qty, available, keep;
							for( unit in wave ){
								if( wave.hasOwnProperty(unit) && unit.indexOf('knight') == -1 ){
									unitKey = unit.replace(/nt/, '');
									qty = parseFloat( wave[ unit ] );
									wParams[ unitKey ] = qty;
									unitsArr[ unit.replace(/unt/, '') ] = qty;

									available = parseFloat(units[ unit ]);
									if( available < qty ){
										KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? city.label + ' ' : '') +'Pas assez de troupe ('+ KOCFIA.unitInfo[ unit ].label +').');
										return wdfd.reject();
									} else {
										if( attack.keep.hasOwnProperty(unit) ){
											keep = parseFloat( attack.keep[ unit ] );
											if( available - qty < keep ){
												KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? city.label + ' ' : '') +'Pas assez de troupe ('+ KOCFIA.unitInfo[ unit ].label +') (conservation).');
												return wdfd.reject();
											}
										}
									}
								}
							}
							return wdfd.pipe( launchWave(wdfd, 3) );
						};

						//fourth and last in wave sequence
						var launchWave = function(wdfd, launchAttempts){
							if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('checkAndLaunchAttack') ) console.info('KOCFIA checkAndLaunchAttack deferred launchWave function');
							if( $tr.data('stop') ){
								stop();
								return dfd.reject();
							}

							if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoAttack && KOCFIA.alarm.underAttack.hasOwnPropery( attack.cityKey ) ){
								return wdfd.resolve();
							}

							var p = wParams; //params is redefined in $.ajax, need for attach_addoutgoingmarch call
							$.ajax({
									url: window.g_ajaxpath + "ajax/march.php" + window.g_ajaxsuffix,
									type: 'post',
									data: wParams,
									dataType: 'json',
									timeout: 10000
								})
								.done(function( result ){
									if( result.ok ){
										attack.marching.push( result.marchId );
										if( mod == 'darkForest' ){
											attack.marchingCoords.push( p.xcoord +','+ p.ycoord );
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? 'Eclairage' : 'Attaque') +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +')'+ (mod != 'wilderness' && mod != 'barbarian' && mod != 'plunder' ? ' depuis '+ city.label : '') +'.');
										}

										var timediff = parseInt(result.eta, 10) - parseInt(result.initTS, 10),
											ts = Date.timestamp();
										time = timediff; //for the wait before next attack

										window.attach_addoutgoingmarch(result.marchId, result.marchUnixTime, ts + timediff, p.xcoord, p.ycoord, unitsArr, p.type, p.kid, resources, result.tileId, result.tileType, result.tileLevel, p.cid, true);

										//force the status of a knight to avoid reusing it on next wave
										if( p.kid !== 0 ){
											window.seed.knights[ 'city' + p.cid ][ 'knt' + p.kid ].knightStatus = 10;
										}

										window.updateBoosts( result );
										if( result.liftFog ){
											window.update_boosts();
											window.seed.playerEffects.fogExpire = 0;
											window.g_mapObject.getMoreSlots();
										}

										if( mod == 'darkForest' ){
											window.setTimeout(function(){
												KOCFIA.darkForest.checkTarget(result.marchId, attack.cityKey, [p.xcoord, p.ycoord], result.tileLevel, 3);
											}, ts + timediff - 1.5 * 60 * 1000); //eta - 1m30
										}

										return wdfd.resolve();
									} else {
										if( result.msg ){
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +') refusé ('+ result.msg + (result.msg.indexOf('marais') > -1 ? ' (le serveur a retourné un type de coordonnées pas à jour)' : '') +').');
											//sometimes the checkCoord find a dark forest that is in fact a swamp with an incorrect tileType
											if( mod == 'darkForest' && result.msg.indexOf('marais') > -1 ){
												attack.coordIndex += 1;
											} else if( result.msg.indexOf('Point de Ralliement') > -1 || result.msg.indexOf('Rally') > -1 ){
												window.setTimeout(function(){
													Shared.refreshMarchByCity( attack.cityKey, false, null );
												}, 300);

												//cloned waves are optionnal, so no recall of previous waves if one fail
												if( cloning ){
													return wdfd.resolve();
												}
											} else if( result.error_code == 206 ){
												attack.coordIndex += 1;
											}
											return wdfd.reject();
										} else if( result.user_action == 'marchCaptcha' ){
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +') refusé (captcha !).');
											Shared.manageCaptcha(KOCFIA.modulesLabel[ mod ] +' automatique');
											return wdfd.reject();
										} else if( result.user_action == 'marchWarning' ){
											wParams.marchWarning = 1;
											launchAttempts -= 1;
											if( launchAttempts > 0 ){
												return wdfd.pipe( launchWave(wdfd, launchAttempts) );
											} else {
												return wdfd.reject();
											}
										} else {
											KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +') refusé (erreur serveur).');
											launchAttempts -= 1;
											if( launchAttempts > 0 ){
												return wdfd.pipe( launchWave(wdfd, launchAttempts) );
											} else {
												return wdfd.reject();
											}
										}
									}
								})
								.fail(function(){
									//network or server error
									KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? city.label + ' ' : '') +'Plan d\''+ label +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +') refusé (erreur internet).');

									launchAttempts -= 1;
									if( launchAttempts > 0 ){
										return wdfd.pipe( launchWave(wdfd, launchAttempts) );
									} else {
										return wdfd.reject();
									}
								});
						};

						var waveSequence = function(){
							return $.Deferred(function( wdfd ){
								//calling sequencialy findLostKnights(), checkKnight(), checkUnits(), launchWave()
								//using deferred.pipe() to iterate
								if( mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder' ){
									return wdfd.pipe( findLostKnights(wdfd) );
								} else if( mod == 'darkForest' ){
									//will recheck units and filling some need variables
									return wdfd.pipe( checkUnits(wdfd, 3) );
								} else { //scout
									//no knight for scouting, so we pipe directly to checking unit
									wParams.kid = 0;
									return wdfd.pipe( checkUnits(wdfd) );
								}
							}).promise();
						};

					var units = window.seed.units[ attack.cityKey ],
						wParams = $.extend({}, baseParams),
						resources = [0, 0, 0, 0, 0],
						unitsArr = {},
						knight = null,
						wave, kLength, u;

					for( u in window.unitstats ){
						if( window.unitstats.hasOwnProperty(u) ){
							unitsArr[ u.replace(/unt/, '') ] = 0;
						}
					}

					if( attack.category == 'scout' ){
						attack.waves = [{unt3: attack.units[ attack.cityKey ]}];
						attack.keep = [];
						if( attack.keeps.hasOwnProperty( attack.cityKey ) ){
							attack.keep = {unt3: attack.keeps[ attack.cityKey ]};
						}
					}

					wave = attack.waves[ waveIndex ];
					kLength = attack.keep.length;
					cloneIndex = (attack.hasOwnProperty('cloneLastWaveAtMost') && attack.cloneLastWaveAtMost > 0 ? attack.cloneLastWaveAtMost : 0);

					$.when( waveSequence() )
						.done(function(){
							if( KOCFIA.conf.alarm.active && KOCFIA.conf.alarm.stopAutoAttack && KOCFIA.alarm.underAttack.hasOwnPropery( attack.cityKey ) ){
								KOCFIA[ mod ].refreshOngoingInfo(attack, false, city.label +' attaquée, attaque annulée, marches en cours rappelées.');
								if( attack.marching.length ){
									Shared.recallWaves( attack );
								}
								return dfd.reject();
							}

							waveIndex += 1;
							if( waveIndex < attack.waves.length ){
								if( mod == 'wilderness' ){
									//launch next wave in 3s
									window.setTimeout(function(){
										return dfd.pipe( checkAndLaunchWave(dfd) );
									}, 3000);
								} else if( mod == 'barbarian' ){
									//launch next wave in 3s
									window.setTimeout(function(){
										return dfd.pipe( checkAndLaunchWave(dfd) );
									}, 3000);
								} else if( mod == 'plunder' ){
									//launch next wave in 3s
									window.setTimeout(function(){
										return dfd.pipe( checkAndLaunchWave(dfd) );
									}, 3000);
								} else if( mod == 'darkForest'){
									//launch next wave in 5s
									window.setTimeout(function(){
										return dfd.pipe( checkAndLaunchWave(dfd) );
									}, 5000);
								} else if( mod == 'scout'){
									//launch next wave in 5s
									window.setTimeout(function(){
										return dfd.pipe( checkAndLaunchWave(dfd) );
									}, 5000);
								}
							} else if( cloneIndex > 0 ){
								slots = Shared.getRallyPointSlots( attack.cityKey );
								if( slots - keepFree > 0 ){
									//launch a clone of the last wave in 3s
									waveIndex -= 1;
									cloneIndex -= 1;
									cloning = true;

									window.setTimeout(function(){
										return dfd.pipe( checkAndLaunchWave(dfd) );
									}, 3000);
								}
							}

							return dfd.resolve();
						})
						.fail(function(){
							if( attack.marching.length ){
								Shared.recallWaves( attack );
							}

							return dfd.reject();
						});
				};

				var attackSequence = function(){
					return $.Deferred(function( dfd ){
						if( (mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder')
							&& KOCFIA.conf.alarm.active
							&& KOCFIA.conf.alarm.stopAutoAttack
							&& KOCFIA.alarm.underAttack.hasOwnPropery( attack.cityKey )
						){
							city = KOFIA.cities[ attack.cityKey ];
							KOCFIA[ mod ].refreshOngoingInfo(attack, false, city.label +' attaquée, attaque annulée, marches en cours rappelées.');
							if( attack.marching.length ){
								Shared.recallWaves( attack );
							}
							return dfd.reject();
						}

						//using deferred.pipe() to iterate
						return dfd.pipe( previousMarchingCheck(dfd) );
					}).promise();
				};

			var baseParams = $.extend(true, {}, window.g_ajaxparams);
			if( $.isEmptyObject(baseParams) ){
				alert('Paramètres ajax manquant. Raffraîchissez la page.');
				return false;
			}

			baseParams.cid = (mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder' ? attack.cityKey.replace(/city/, '') : null);
			baseParams.type = (mod != 'scout' ? 4 : 3); //MARCH_TYPE_ATTACK 4, MARCH_TYPE_SCOUT 3
			baseParams.gold = 0;
			baseParams.r1 = 0;
			baseParams.r2 = 0;
			baseParams.r3 = 0;
			baseParams.r4 = 0;
			baseParams.r5 = 0;
			baseParams.items = '';

			//using deferred to sequentialize asynchronous tasks
			$.when( attackSequence() )
				.done(function(){
					KOCFIA[ mod ].refreshOngoingInfo(attack, false, (mod == 'scout' ? 'Eclairage lancé' : 'Attaque lancée') +' sur '+ Shared.mapLink( coords[ attack.coordIndex ] ) +' ('+ (attack.coordIndex + 1) + 'e / ' + coords.length +')' +(mod != 'wilderness' && mod != 'barbarian' ? ' depuis '+ city.label : '') +'.');

					attack.coordIndex += 1;
				})
				.fail(function(reason){
					time = 0;
					//if( mod == 'darkForest' ) time = 10 * 60;
					if( attack.marching.length ){
						Shared.recallWaves( attack );
					}
				})
				.always(function(){
					if( stopped ) return;

					//save the last coord if the attack is a stored one
					if( mod == 'wilderness' || mod == 'barbarian' || mod == 'plunder' ){
						KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ].coordIndex = attack.coordIndex;
					} else if( mod == 'scout' ){
						KOCFIA[ mod ].attacks[ attack.id ].coordIndex = attack.coordIndex;
					} else if( mod == 'darkForest' ){
						KOCFIA[ mod ].attacks.coordIndex = attack.coordIndex;
					}

					time *= 1000; //timestamp in milliseconds in javascript

					//force march update 10s after impact
					window.setTimeout(function(){
						var update = function(){
							return $.Deferred(function(dfd){
								return dfd.pipe( Shared.forceMarchUpdate(attack, true, dfd) );
							}).promise();
						};

						$.when( update() )
							.always(function(){
								if( KOCFIA.conf.marches.active ){
									KOCFIA.marches.refreshByCity( attack.cityKey );
								}
							});
					}, time + 10000);

					if( mod == 'scout' ){
						//when finished (coords), loop only in automatic mode
						if( attack.coordIndex >= coordsLength ){
							if( KOCFIA.conf[ mod ].automatic && KOCFIA[ mod ].attacks[ attack.id ] ){
								attack.coordIndex = 0;
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, true, 'Eclairage fini.');
								return;
							}
						}

						//next round
						KOCFIA[ mod ].attacks[ attack.id ].timeout = window.setTimeout(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						}, 10000);

						KOCFIA[ mod ].storeAttacks();
					} else if( mod == 'darkForest' ){
						//force refresh
						window.setTimeout(function(){
							Shared.updateSeed();
						}, time + 5000);

						//attacks loop only if in automatic mode
						if( attack.coordIndex >= coordsLength ){
							if( KOCFIA.conf[ mod ].automatic ){
								attack.coordIndex = 0;
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, true, 'Attaque finie.');
								return;
							}
						}

						//check if there is some place left in the active cities
						var i, slots, keepFree, citiesWithEmptySlot = 0;
						for( i = 0; i < attack.cities.length; i += 1 ){
							attack.cityKey = attack.cities[i];
							if( attack.info[ attack.cityKey ].active ){
								attack.rpSlot = attack.info[ attack.cityKey ].rps;
								slots = Shared.getRallyPointSlots( attack.cityKey );
								keepFree = parseInt(attack.rpSlot, 10) || 0;
								if( slots - keepFree > 1 ){
									citiesWithEmptySlot += 1;
								}
							}
						}

						//more than 2 third of the active cities have free slots
						if( citiesWithEmptySlot > 2 * attack.cities.length / 3 ){
							//next round
							Shared.nextIteration( KOCFIA[ mod ].$nextBar, 2 * 60 );
							window.setTimeout(function(){
								KOCFIA.checkAndLaunchAttack( attack );
							}, 2 * 60 * 1000);
						} else {
							//not enough places, wait 5 minutes
							Shared.nextIteration( KOCFIA[ mod ].$nextBar, 5 * 60 );
							window.setTimeout(function(){
								KOCFIA.checkAndLaunchAttack( attack );
							}, 5 * 60 * 1000);
						}

						KOCFIA[ mod ].storeAttacks();
					} else if( mod == 'wilderness' || mod == 'barbarian' ){
						time *= 2; //round-trip

						//force refresh
						window.setTimeout(function(){
							Shared.updateSeed();
						}, time + 30000);

						//attacks loop only if in automatic mode
						if( attack.coordIndex >= coordsLength ){
							if( KOCFIA.conf[ mod ].automatic && KOCFIA[ mod ].attacks[ attack.cityKey ] && KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ]){
								attack.coordIndex = 0;
							} else {
								KOCFIA[ mod ].refreshOngoingInfo(attack, true, 'Attaque finie.');
								return;
							}
						}

						//next round
						KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ].timeout = window.setTimeout(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						}, time + 45000);

						KOCFIA[ mod ].storeAttacks();
					} else if( mod == 'plunder' ){
						time *= 2; //round-trip

						//force refresh
						window.setTimeout(function(){
							Shared.updateSeed();
						}, time + 30000);

						//no attacks loop for plunders
						if( attack.coordIndex >= coordsLength ){
							KOCFIA[ mod ].refreshOngoingInfo(attack, true, 'Attaque finie.');

							return;
						}

						//next round
						KOCFIA[ mod ].attacks[ attack.cityKey ][ attack.id ].timeout = window.setTimeout(function(){
							KOCFIA.checkAndLaunchAttack( attack );
						}, time + 45000);

						KOCFIA[ mod ].storeAttacks();
					}
				});
		};

	KOCFIA.init();
})(window, document, jQuery);

});

/*
	//Construction :
	//- mise en place de la ville (à détailler)
		//- positionnement
		//- nombre
	//- file d'attente des construction par ville
		//- modifiable (suppression, insertion, ordre)
		//- gestion des erreurs

	//Entraînement :
	//- entraînement programmé (x miliciens puis y archers puis ...)

	//Recherche :
	//- file d'attente des recherches par ville

	//Exploration :
	//recherche joueur

	//Alerte :
	//- attaque
		//- plusieurs niveaux de dangerosité (éclairage, grosse attaque, vidage, ...)
	//- manque de nourriture
	//- manque de ressource (couplée avec les files d'attente)

	//Rapport :
	//- auto-suppression
	//- sauvegarde
	//- consultation simplifiée
	//- vision claire des horaires

	//Attaque :
	//- mode rainbow (1 cible, x attaques de y miliciens)

	//X Avoir des recherches de TS/CB/FS indexées par villes et mémorisées pour ne pas avoir à refaire les recherches à chaque fois qu'on passe d'une recherche sur une ville à une autre.

	//Renforcement :
	//- garder x miliciens dans la ville 1, le reste va à la ville 2
	//- prise en compte des attaques (CB, ...)
	//- envoyer de la nourriture avec les renforts

	//Coordination :
	//Si on pouvait intégrer le planificateur ce serait top (au moins les données source : récupérer tous les temps de marche des pourfendeurs connectés jusqu'à un point donné, pour un type d'unité à choisir)

	//Laboratorie :
	//-auto search
	//-liste d'attente

	//mode tournoi
		//sauvegarde puissance récurrent
		//pas de sauvegarde durant un tournois
		//donner la position avec la différence sur le plus proche avec changement de cadeau


	//paying features
		//import / export whole conf
		//teleport warning
		//programmed training
			//x archers
			//y catapultes
		//clever training (population optimisation)
		//clever building
		//occupied wilderness attack option
		//auto plunder
*/
