// ==UserScript==
// @name			KOC
// @version			0.1
// @namespace		KOC
// @description		améliorations et automatisations diverses pour KOC
// @require			http://userscripts.org/scripts/source/68059.user.js
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require			http://koc.kapok.fr/jquery-ui-1.8.16.custom.min.js
// @include			*kingdomsofcamelot.com/*main_src.php*
// ==/UserScript==

/*
 * http://userscripts.org/scripts/source/68059.user.js -> used to run the whole script inside the page scope
 * else prototypes are not reachable (grease monkey sandbox limitation)
 */

console.log('koc start');

jQuery.noConflict(); //the iframe already have a jquery 1.4 and prototype libraries

var kocCss = "#crossPromoBarContainer, #progressBar { display: none !important; }"
		+ "\n.drag-handle { cursor: move; width: 10px; height: 20px; background-color: grey; float: left;}"
;

var kocConfPanelCss = "#koc-conf-panel-toggle { position: absolute; top: 15px; left: 10px; }"
		+ "\n#koc-conf-panel .drag-handle { height: 36px; }"
		+ "\n#koc-conf-panel .ui-icon-close { float: right; }"
		+ "\n#koc-conf-panel { display: none; position: absolute; z-index: 99999; }"
		+ "\n#koc-conf-panel-tabs { padding-left: 10px; }"
		+ "\n.koc-conf-panel-tab.on { background-color: #A5C77F; }"
		+ "\n.koc-conf-panel-tab.off { background-color: #A2ABA5; }"
;

var kocChatMoveableCss = ".kocmain .mod_comm { background: #FCF8DD; border: 1px solid #A56631; }"
		+ "\n.kocmain .mod_comm .comm_tabs { background-color: #1054A7; width: auto; top: 0; left: 10px; height: 20px; }"
		+ "\n.kocmain .mod_comm .comm_body { top: 20px; }"
		+ "\n.kocmain .mod_comm .comm_body form { height: 25px; }"
		+ "\n.kocmain .mod_comm .mod_comm_forum { padding-left: 0; }"
		+ "\n.kocmain .mod_comm .comm_global .postaction .button20 { top: 2px; }"
		+ "\n.kocmain .mod_comm .comm_global .postaction { width: auto; padding: 3px 5px; }"
		+ "\n.kocmain .mod_comm .comm_global .postaction #mod_comm_input { position: absolute; top: 5px; left: 5px; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist { width: auto; margin-left: 0; border: none; }"
		+ "\n.kocmain .mod_comm .kocMerlinSmall { float: right; padding: 4px; font-size: 10px; }"
		+ "\n.kocmain .mod_comm .seltab1 a.tab2, .kocmain .mod_comm .seltab2 a.tab1 { height: 20px; line-height: 20px; padding: 0 5px; }"
		+ "\n.kocmain .mod_comm .seltab1 a.tab1, .kocmain .mod_comm .seltab2 a.tab2 { background: #FCF8DD; height: 20px; line-height: 20px; padding-right: 5px; }"
		+ "\n.kocmain .mod_comm .seltab1 a.tab1 span, .kocmain .mod_comm .seltab2 a.tab2 span { background: none; height: 20px; line-height: 20px; padding-left: 5px; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content { width: auto; float: none; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info { width: auto; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info .nm { padding-left: 18px; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .info b { display: none; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .tx { width: auto; float: none; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap .content .flag { display: none; }"
		+ "\n.kocmain .mod_comm .comm_global .chatlist .chatwrap img { margin-right: 0; width: 15px; height: 15px; float: none; position: absolute; top: 2px; left: 2px; }"
;
var kocChatHelpCss = ".kocmain .mod_comm .comm_global .chatlist .noalliance { display: none; }";

var kocChatHightlightCss = ".kocmain .mod_comm .comm_global .chatlist .chatwrap.leader { background-color: #ACD1E9; }"
;

(function($){
	try{
		/* helpers */
			/**
			 * localStorage method for caching javascript objects
			 */
			if( typeof window.Storage != "undefined" ){
				window.Storage.prototype.setObject = function(key, value){
					this.setItem(key, JSON.stringify(value));
				}

				window.Storage.prototype.getObject = function(key){
					return this.getItem(key) && JSON.parse( this.getItem(key) );
				}
			} else {
				alert('Pour utiliser ce script veuillez mettre à jour votre navigateur !')
			}

			/*
			 * jQuery each2 - v0.2 - 8/02/2010
			 * http://benalman.com/projects/jquery-misc-plugins/
			 *
			 * Inspired by James Padolsey's quickEach
			 * http://gist.github.com/500145
			 *
			 * Copyright (c) 2010 "Cowboy" Ben Alman
			 * Dual licensed under the MIT and GPL licenses.
			 * http://benalman.com/about/license/
			 */
			(function(a){var b=a([1]);a.fn.each2=function(d){var c=-1;while((b.context=b[0]=this[++c])&&d.call(b[0],c,b)!==false){}return this}})(jQuery);

			String.prototype.capitalize = function(){
				return this.charAt(0).toUpperCase() + this.slice(1);
			};

			//pointers
				var $head = $('head'),
					$body = $('body'),
					$chatInput = $('#mod_comm_input'),
					$chatAlliance = $('#mod_comm_list2'),
					$chat = $('#kocmain_bottom').find('.mod_comm');

			//shared
				var $dragHandle = $('<div class="drag-handle">');

		console.log('before KOC object declaration');
		var KOC = {
			'init': function(){
				console.log('KOC init function');

				//clean and arrange the window
					$head.append( $('<link rel="stylesheet" href="http://koc.kapok.fr/jquery-ui-1.8.16.custom.css" type="text/css">') )
								.append( $('<style>').text(kocCss) );

					var kocFrame = parent.document.getElementById('kofc_iframe_0');
					//force koc iframe to width 100%
					kocFrame.style.width = '100%';

					//force wrapping iframe to width 100%
					var style = document.createElement('style')
					style.innerHTML = 'body { margin:0; width:100% !important;}';
					kocFrame.parentNode.appendChild(style);

				//gather the default conf
					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						KOC.conf[mod] = KOC[mod].options;
					}

				//get stored conf if present
					try {
						var storedConf = localStorage.getObject('koc_conf');
						if( storedConf ){
							$.extend(true, KOC.conf, storedConf);
							console.log('used stored conf');
						}
					} catch( e ){
						alert(e);
					}
					console.log(KOC.conf);

				//ajax sniffer
					KOC.ajaxSniffer();

				//configuration panel
					KOC.confPanel();

				//modules init
					if( KOC.conf.chat.active ){
						KOC.chat.on();
					}
			},
			'storeConf': function(){
				console.log('KOC storeConf function');
				console.log(KOC.conf);
				localStorage.setObject('koc_conf', KOC.conf);
			},
			'modules': ['chat'],
			/* AJAX SNIFFER */
				'ajaxSniffer': function(){
					console.log('KOC ajaxSniffer function');
					XMLHttpRequest.prototype.oldOpen = XMLHttpRequest.prototype.open;
					var newOpen = function(method, url, async, user, password){
						var filename = url.substring(url.lastIndexOf('/')+1);
						switch(filename){
							case 'getChat.php':
								if( KOC.conf.chat.active && ( KOC.conf.chat.cleanHelp || KOC.conf.chat.highlightLeaders ) ){
									this.addEventListener("load", function(){
										var r = JSON.parse(this.responseText);
										if( r.data && r.data.newChats && r.data.newChats['2'] && r.data.newChats['2'].length > 0 ){
											KOC.chat.manageMessages(r.data.newChats[2]);
										}
									}, false);
								}
								break;
						}

						this.oldOpen(method, url, async, user, password);
					}
					XMLHttpRequest.prototype.open = newOpen;
				},
			/* CONFIGURATION PANEL */
				'confPanel': function(){
					console.log('KOC confPanel function');
					$head.append( $('<style>').text(kocConfPanelCss) );

					var $confPanel = $('<div id="koc-conf-panel">');

					var $tabs = $('<ul>'),
						$optionsSection = $('<section id="koc-options">');

					$tabs.append('<li><a href="#koc-options">Options</a></li>');

					for( var i = 0; i < KOC.modules.length; i++ ){
						var mod = KOC.modules[i];
						$tabs.append('<li class="koc-conf-panel-tab '+ (this[mod].active ? 'on' : 'off') +'"><a href="#koc-'+ mod +'">'+ mod.capitalize() +'</a></li>');
						$confPanel.append( this[mod].modPanel() );

						this[mod].confPanel( $optionsSection );
					}

					//manage the checked status change of the options
					$optionsSection
						.delegate('input', 'change', function(){
							var $this = $(this),
								infos = this.id.split('-'),
								mod = infos[0],
								func = infos[1];

							if( $this.is(':checked') ){
								if( func == 'active' ) func = 'on';
								else if( typeof KOC[ mod ][ func ] != 'function' ) func += 'On';
							} else {
								if( func == 'active' ) func = 'off';
								else if( typeof KOC[ mod ][ func ] != 'function' ) func += 'Off';
							}

							KOC[ mod ][ func ]();
						})
						.delegate('button', 'click', function(e){
							e.preventDefault();
							var $this = $(this),
								infos = $this.attr('rel').split('-');
							KOC[ infos[0] ][ infos[1] ]();
						});

					$confPanel
						.prepend( $('<nav id="koc-conf-panel-tabs">').append( $tabs ) )
						.prepend( $dragHandle.clone() )
						.prepend( '<span class="ui-icon ui-icon-close"></span>' )
						.append( $optionsSection )
						.draggable({
							'helper': "original",
							handle: '.drag-handle',
							'stop': function(event, ui){
								KOC.conf.confPanel.position = ui.position;
								KOC.storeConf();
							}
						})
						.resizable({
							minWidth: 250,
							minHeight: 250,
							handles: 'n, e, s, w, ne, se, sw, nw',
							stop: function(event, ui){
								KOC.conf.confPanel.size = ui.size;
								KOC.storeConf();
							}
						})
						.tabs({
							collapsible: true,
						})
						.css({
							'top': KOC.conf.confPanel.position.top,
							'left': KOC.conf.confPanel.position.left,
							'width': KOC.conf.confPanel.size.width,
							'height': KOC.conf.confPanel.size.height
						});

					var $kocConfPanelToggle = $('<button id="koc-conf-panel-toggle">').text('KOC');
					$kocConfPanelToggle.click(function(){
						console.log('$kocConfPanelToggle click');
						console.log($('#koc-conf-panel'));
						$('#koc-conf-panel').toggle();
					});

					$body
						.append( $kocConfPanelToggle )
						.append( $confPanel );
				},
				'generateOption': function(module, option, text, checked){
					return '<p><input type="checkbox" id="'+ module +'-'+ option +'" '+ (checked ? 'checked' : '') +' /><label for="'+ module +'-'+ option +'">'+ text +'</label></p>';
				},
				'generateButton': function(module, action, text){
					return '<p><button rel="'+ module +'-'+ action +'">'+ text +'</button></p>';
				},
			/* CHAT */
				'chat': {
					'options': {
						'active': 1,
						'moveable': 1,
						'cleanHelp': 1,
						'onRight': 1,
						'position': {'top': 0, 'left': 0},
						'size': {'width': false, 'height': false},
						'onRightPosition': {'top': '-562px', 'left': '761px'},
						'highlightLeaders': 0,
						'friendList': {},
					},
					'confPanel': function( $section ){
						console.log('KOC chat confPanel function');
						var $code = $('<p>').append( $('<h2>').text('Chat') );
						$code.append( KOC.generateOption('chat', 'active', 'Activer le module', KOC.conf.chat.active) );
						$code.append( KOC.generateOption('chat', 'moveable', 'Chat déplacable et redimensionnable', KOC.conf.chat.moveable) );
						$code.append( KOC.generateOption('chat', 'cleanHelp', 'Aider automiquement et masquer les demandes', KOC.conf.chat.cleanHelp) );
						$code.append( KOC.generateButton('chat', 'onRight', 'Repositionner le chat à droite') );
						$code.append( KOC.generateOption('chat', 'highlightLeaders', 'Mettre en avant les messages de la chancellerie', KOC.conf.chat.highlightLeaders) );

						$section.append( $code );
					},
					'modPanel': function(){
						console.log('KOC chat modPanel function');
						var $section = $('<section id="koc-chat">');
						$section.append('<h2>Liste d\'amis</h2>')
								.append(
									  '<p><label for="koc-friends-group">Alliance : </label>'
									+ '<input type="text" id="koc-friends-group" name="koc-friends-group" list="koc-friends-group-list">'
									+ '<datalist id="koc-friends-group-list"></datalist>'
									+ '<label for="koc-friend">Joueur : </label>'
									+ '<input type="text" name="koc-friend" id="koc-friend" />'
									+ '<button>Ajouter</button></p>'
								)
								.append('<ul></ul>');

						var $d = $section.find('datalist'),
							groupes = [],
							$ul = $('#koc-chat').find('ul');
						for( var groupe in KOC.conf.chat.fiendList ){
							groupes.push(groupe);
						}
						groupes.sort();
						for( var i = 0; i < groupes.length; i++ ){
							$d.append( '<option value="'+ groupes[i] +'">'+ groupes[i] +'</option>');

							var f = '';
							for(var j = 0; j < KOC.conf.chat.fiendList[ groupes[i] ].length; j++ ){
								f += '<p><a href="#">'+ KOC.conf.chat.fiendList[ groupes[i] ][j] +'</a><span class="ui-icon ui-icon-trash"></span></p>'
							}

							$ul.append(
								$('<li>').data('groupe', groupes[i]).append(f)
							);
						}

						$section
							.delegate('button', 'click', function(e){
								e.preventDefault();

								var $fields = $(this).parent().find('input'),
									grp = $fields.eq(0).val(),
									name = $fields.eq(1).val(),
									$ul = $('#koc-chat').find('ul'),
									$li = $ul.find('li').filter('[data-group='+ grp +']');

								if( $li.length ){
									$li.append('<p><a href="#">'+ name +'</a><span class="ui-icon ui-icon-trash"></span></p>');
								} else {
									$ul.append(
										$('<li>').data('groupe', grp)
											.append('<p><a href="#">'+ name +'</a><span class="ui-icon ui-icon-trash"></span></p>')
									);
								}

								KOC.chat.generateFriendList();
							})
							.delegate('.ui-icon-trash', 'click', function(){
								$(this).parent().parent().remove();
								KOC.chat.generateFriendList();
							})
							.delegate('a', 'click', function(e){
								e.preventDefault();
								$chatInput.val('@' + $(this).text() + ' ').focus();
							});

						return $section;
					},
					'on': function(){
						console.log('KOC chat on function');
						//placement
							if( KOC.conf.chat.moveable ){
								KOC.chat.moveableOn();
							}

							if( KOC.conf.chat.onRight && KOC.conf.chat.position.top == 0 ){
								KOC.chat.onRight();
							}

						//suppression du superflu (demande aide et son résultat)
							if( KOC.conf.chat.cleanHelp ){
								KOC.chat.cleanHelpOn();
							} else {
								//remove chat rules
								var removeChatRules = function(){
									var tmp = $chatAlliance.find('.noalliance');
									if( tmp.length ){
										tmp.first().remove();
									} else {
										setTimeout(removeChatRules(), 500);
									}
								};
								setTimeout(removeChatRules(), 500);
							}
					},
					'off': function(){
						console.log('KOC chat off function');
						KOC.movableOff();
					},
					'moveableOn': function(){
						console.log('KOC chat movableOn function');
						$head.append( $('<style id="koc-chat-moveable">').text(kocChatMoveableCss) );

						$chat
							.draggable({
								'helper': "original",
								handle: '.drag-handle',
								'stop': function(event, ui){
									KOC.conf.chat.position = ui.position;
									KOC.storeConf();
								}
							})
							.resizable({
								minWidth: 250,
								resize: function(event, ui){
									$chat
										.find('.comm_body')
											.css('height', function(){ return ui.size.height - 20;})
										.find('.chatlist')
											.css('height', function(){ return $(this).parent().height() - 43; });

									$chatInput
										.width(function(){ return ui.size.width - 65; })
										.siblings('.button20').css('left', function(){ return ui.size.width - 55; });
								},
								stop: function(event, ui){
									KOC.conf.chat.size = ui.size;
									KOC.storeConf();
								}
							})
							.css({
								'top': KOC.conf.chat.position.top,
								'left': KOC.conf.chat.position.left,
							})
							.prepend( $dragHandle.clone() );

						if( KOC.conf.chat.size.width ){
							$chat.css('width', KOC.conf.chat.size.width);

							$chatInput.width(function(){ return KOC.conf.chat.size.width - 65; })
								.siblings('.button20').css('left', function(){ return KOC.conf.chat.size.width - 55; });
						}

						if( KOC.conf.chat.size.height ) $chat.css('height', KOC.conf.chat.size.height);
						else $chat.css('height', $chat.parent().css('height')); //original height

						$chat
							.find('.comm_body')
								.css('height', function(){ return $chat.height() - 20;})
							.find('.chatlist')
								.css('height', function(){ return $(this).parent().height() - 43; });
						var $jeu = $chat.find('.mod_comm_mmb');
						$jeu.data('ori', $jeu.html())
							.removeClass('mod_comm_mmb').addClass('kocMerlinSmall').html('Boîtes Magiques');
					},
					'moveableOff': function(){
						console.log('KOC chat moveableOff function');
						$('#koc-chat-moveable').remove();
						$chat
							.draggable('destroy')
							.resizable('destroy')
							.find('.drag-handle').remove();
						$chat[0].style = '';
						$chatInput.css('width', '')
							.siblings('.button20').css('left', '');
						$chat
							.find('.comm_body').css('height', '')
							.find('.chatlist').css('height', '');
						var $jeu = $chat.find('.kocMerlinSmall');
							$jeu.removeClass('kocMerlinSmall').addClass('mod_comm_mmb').html( $jeu.data('ori') ).removeData('ori');
					},
					'onRight': function(){
						console.log('KOC chat onRight function');
						$chat.css({
								'top': KOC.conf.chat.onRightPosition.top,
								'left': KOC.conf.chat.onRightPosition.left
							});
					},
					'cleanHelpOn': function(){
						console.log('KOC chat cleanHelpOn function');
						$head.append( $('<style id="koc-chat-help">').text(kocChatHelpCss) );
					},
					'cleanHelpOff': function(){
						console.log('KOC chat cleanHelpOff function');
						$('#koc-chat-help').remove();
					},
					'manageMessages': function(messages){
						console.log('KOC chat manageMessages function');
							for( var i = 0; i < messages.length; i++ ){
								var msg = messages[i];
								//suppression du superflu (demande aide et son résultat)
								if( KOC.conf.chat.cleanHelp && msg[3].indexOf("__A_l_liance_Ch@tHelp__:helpType=building") == 0 ){
									setTimeout(function(){
										$chatAlliance
											.find('.chatwrap')
											.filter(':lt('+ messages.length +')')
											.find('tx').find('a')
											.filter('[onclick^=claimAllianceChatHelp]').each2(function(i, $helpLink){
												$helpLink
													.click() //clic auto sur les demandes d'aides
													.closest('.chatwrap').remove(); //et suppression de la demande d'aide
												//suppression du résultat -> masqué en css .noalliance
											});
									}, 250);
								}

								if( KOC.conf.chat.highlightLeaders ){
									setTimeout(function(){
										$chatAlliance
											.find('.chatwrap')
											.filter(':lt('+ messages.length +')')
											.find('nm').each2(function(i, $nm){
												if( $.inArray($nm.text(), KOC.chat.leaders) > -1 ){
													$nm.closest('.chatwrap').addClass('leader');
												}
											});
									}, 250);
								}
							}
					},
					'generateFriendList': function(){
						console.log('KOC chat generateFriendList function');
						var friendList = {};
						$('#koc-chat').find('li').each2(function(i, $li){
							var grp = $li.data('group');
							friendList[ grp ] = [];
							$li.find('a').each2(function(j, $a){
								friendList[ grp ].push( $a.text() );
							});
							friendList[ grp ].sort();
						});
						friendList.sort();
						KOC.conf.chat.friendList = friendList;
						KOC.storeConf();
					},
					'highlightLeadersOn': function(){
						console.log('KOC chat highlightLeadersOn function');
						KOC.chat.leaders = $('#directory_tabs_2_members').find('.nm a').map(function(){ return $(this).text(); }).get();
						$head.append( $('<style id="koc-chat-hightlight">').text(kocChatHightlightCss) );
					},
					'highlightLeadersOff': function(){
						console.log('KOC chat highlightLeadersOff function');
						$('#koc-chat-hightlight').remove();
						KOC.chat.leaders = [];
					},
				},
			/* default configuration */
			'conf': { // will contains all the modules default configuration options
				'confPanel': {
					'position': {'top': 100, 'left': 100},
					'size': {'width': 'auto', 'height': 'auto'},
				}
			}
		};

		console.log('after KOC object declaration');

		KOC.init();
	} catch (e) {
		console.log(e);
	}
})(jQuery);
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
	//- voir les villes amies
	//les villes ennemis ca serait cool aussi!!

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

	//Avoir des recherches de TS/CB/FS indexées par villes et mémorisées pour ne pas avoir à refaire les recherches à chaque fois qu'on passe d'une recherche sur une ville à une autre.

	//Renforcement :
	//- garder x miliciens dans la ville 1, le reste va à la ville 2
	//- prise en compte des attaques (CB, ...)

	//Transport Ressources :
	//- garder x minerais dans la ville 1, le reste va à la ville 2
	//- utilisation wagon ou cavalerie
	//- approvisionnement ville x à partri de ville y si ressources < z
	//- envoyez à x villes d'un joueur y ressources

	//Coordination :
	//Si on pouvait intégrer le planificateur ce serait top (au moins les données source : récupérer tous les temps de marche des pourfendeurs connectés jusqu'à un point donné, pour un type d'unité à choisir)

	//bloc note