/* MODULE SKELETON */
/*
		KOCFIA.mod = {
			options: {
				active: 0,			automatic: 0
			},		stored: ['rules'],		rules: {}
		};

		KOCFIA.mod.confPanel = function( $section ){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod confPanel function');
			var code = '<h3>'+ KOCFIA.modulesLabel.mod +'</h3>';
			code += '<div>';
			code += Shared.generateCheckbox('mod', 'active', 'Activer', KOCFIA.conf.mod.active);
			code += Shared.generateCheckbox('mod', 'automatic', 'Activer les mod automatiques', KOCFIA.conf.mod.automatic);
			code += Shared.generateButton('rules', 'deleteRules', 'Supprimer toutes les configurations de mod enregistrées');
			code += '</div>';

			$section.append( code );
		};

		KOCFIA.mod.modPanel = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod modPanel function');
			var $section = KOCFIA.$confPanel.find('#kocfia-mod').html('');

			var manualForm = KOCFIA.mod.getManualForm(),
				automaticForm = KOCFIA.mod.getAutoForm(),
				onGoing = KOCFIA.mod.getListsTemplate(),
				help = KOCFIA.mod.getHelp();

			var code = '<div class="infos">';
			code += '<span class="buttonset"><input type="checkbox" id="mod-panel-automatic" '+ (KOCFIA.conf.mod.automatic ? 'checked' : '') +' autocomplete="off" />';
			code += '<label for="mod-panel-automatic">mod automatiques</label></span>';
			code += '<button class="button secondary help-toggle"><span>Aide</span></button>';
			code += '</div><h3>Configurations</h3>';
			code += '<div class="accordion">';
			code +=  manualForm + automaticForm;
			code += '</div><div>'+ onGoing +'</div>';
			code += help;
			code += '<div id="kocfia-mod-history" class="history" title="Historique des mod"></div>';

			$section.append( code )
			//listener
				.on('change', '#mod-panel-automatic', function(){
					$('#mod-automatic').prop('checked', $(this).prop('checked')).change();
				});

			KOCFIA.mod.$manualForm = $section.find('.manual-form');
			KOCFIA.mod.$autoForm = $section.find('.mod-form');
			KOCFIA.mod.$ongoing = $section.find('.ongoing');
			KOCFIA.mod.$nextBar = $section.find('.nextIteration');
			KOCFIA.mod.$history = $section.find('.history');

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

			KOCFIA.mod.addManualFormListeners();
			KOCFIA.mod.addAutoFormListeners();

			KOCFIA.mod.loadAutoRuleset();
		};

		KOCFIA.mod.on = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod on function');

			if( KOCFIA.conf.mod.automatic ){
				KOCFIA.mod.automaticOn();
			}
		};

		KOCFIA.mod.off = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod off function');

			KOCFIA.mod.automaticOff();
		};

		KOCFIA.mod.automaticOn = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod automaticOn function');
			$('#mod-panel-automatic').prop('checked', true);

			Shared.nextIteration( KOCFIA.mod.$nextBar, 60 );
			window.setTimeout(function(){
				Shared.nextIteration( KOCFIA.mod.$nextBar, 60 * 60 );
				KOCFIA.mod.launchAutomaticmod();
			}, 60 * 1000);

			//recursive call every 60 minutes
			autoModInterval = window.setInterval(function(){
				Shared.nextIteration( KOCFIA.mod.$nextBar, 60 * 60 );
				KOCFIA.mod.launchAutomaticmod();
			}, 60 * 60 * 1000);
		};

		KOCFIA.mod.automaticOff = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod automaticOff function');

			window.clearInterval(autoModInterval);

			KOCFIA.mod.$nextBar.html('');
		};

		KOCFIA.mod.storeRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('kocfia mod storeRules function');
			localStorage.setObject('kocfia_mod_rules_' + KOCFIA.storeUniqueId, KOCFIA.mod.rules);
		};

		KOCFIA.mod.deleteRules = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod deleteRules function');
			localStorage.removeItem('kocfia_mod_rules_' + KOCFIA.storeUniqueId);

			KOCFIA.mod.rules = {};
		};

		KOCFIA.mod.refreshOnGoing = function(msg){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod refreshOnGoing function');

			//clean old messages
			var timestamp = Date.timestamp(),
				obsolete = 5 * 60 * 1000,
				msgTimestamp, $div, $m;

			$div = KOCFIA.mod.$ongoing;

			$div.find('div').each(function(){
				$m = $(this);
				msgTimestamp = $m.data('timestamp');
				if( msgTimestamp && timestamp - msgTimestamp > obsolete ){
					$m.appendTo( KOCFIA.mod.$history );
				}
			});

			if( !$.isEmptyObject(msg) ){
				$div.append( '<div data-timestamp="'+ timestamp+'">'+ msg +'</div>' );
			}
		};

		KOCFIA.mod.getHelp = function(){
			if( KOCFIA.debug && KOCFIA.debugWhat.hasOwnProperty('mod') ) console.info('KOCFIA mod getHelp function');
			var help = '<div id="kocfia-mod-help" class="help" title="Aide Mod">';
			help += '<h4>Informations et limitations :</h4><ul>';
			help += '</ul></div>';

			return help;
		};
*/

