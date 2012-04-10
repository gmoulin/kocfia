<?php
	if( filter_has_var(INPUT_GET, 'numServer') !== true ){
		header("HTTP/1.0 404 Not Found");
		die;
	}

	$numServer = filter_input(INPUT_GET, 'numServer', FILTER_SANITIZE_NUMBER_INT);

	if( filter_var($numServer, FILTER_VALIDATE_INT) === false ){
		header("HTTP/1.0 404 Not Found");
		die;
	}

	if( !file_exists('servers_scripts/kocfia.fb.reload_KOC'.$numServer.'_on_404.user.js') ){
		ob_start();
?>// ==UserScript==
// @name			KOCFIA-FB-RELOAD-KOC<?php echo $numServer; ?>-ON-404
// @version			1
// @namespace		KOCFIA
// @description		reload kingdoms of camelot on server <?php echo $numServer; ?> when facebook display the 404 page after 10 seconds
// @include			*facebook.com/4oh4.php*
// ==/UserScript==

unsafeWindow.setTimeout(function(){
	unsafeWindow.location = unsafeWindow.location.protocol +'//apps.facebook.com/kingdomofcamelot/?s=<?php echo $numServer; ?>';
}, 10000);
<?php
		$content = ob_get_contents();
		ob_end_clean();

		file_put_contents('servers_scripts/kocfia.fb.reload_KOC'.$numServer.'_on_404.user.js', $content);
	}

	header('Location: http://'.$_SERVER['SERVER_NAME'].'/servers_scripts/kocfia.fb.reload_KOC'.$numServer.'_on_404.user.js', true, 302);
?>
