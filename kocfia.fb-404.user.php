<?php
	$numServer = $_GET['numServer'];

	header('Content-Type: application/javascript');
	header('Content-Disposition: attachment;filename="kocfia.fb.reload_KOC'.$numServer.'_on_404.user.js"');
?>// ==UserScript==
// @name			KOCFIA-FB-404-RELOAD-<?php echo $numServer; ?>
// @version			1
// @namespace		KOCFIA
// @description		reload kingdoms of camelot on server <?php echo $numServer; ?> when facebook display the 404 page after 10 seconds
// @include			*facebook.com/404*
// ==/UserScript==

unsafeWindow.setTimeout(function(){
	unsafeWindow.location = unsafeWindow.location.protocol +'//apps.facebook.com/kingdomofcamelot/?s=<?php echo $numServer; ?>';
}, 10000);
