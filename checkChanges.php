<?php
function __autoload( $class_name ){
if( file_exists(__DIR__."/inc/class_".$class_name.".php") ){
		require_once __DIR__."/inc/class_".$class_name.".php";
		return true;
	}
	return false;
}

$oChecker = new checker(1);
$previous = $oChecker->version;
$next = $previous + 1;

//curl the javascript file and check the last-modified header against previous one stocked in database
$ch = curl_init('https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/js/camelotmain_fr-'.$next.'.js');
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_NOBODY, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if( $code >= 200 && $code < 300 ){
	$oChecker->version = $next;
	$oChecker->save();

	echo '<br>sending email';
	mail('gmoulin.dev@gmail.com', 'kabam code change', date('Y-m-d H:i:s', $lastModified), 'From: kocfia@kapok.fr');
}
?>
