<?php

//curl the javascript file and check the last-modified header against previous one stocked in database
$ch = curl_init('https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/js/camelotmain_fr-499.js');
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_NOBODY, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec($ch);
$response = explode("\n", $response);

$lastModified = 0;
foreach( $response as $i => $resp ){
	if( !empty($resp) && strpos($resp, 'Last-Modified') !== false ){
		$lastModified = str_replace('Last-Modified: ', '', $resp);
		$lastModified = strtotime($lastModified);
		break;
	}
}

echo '<br>file last modified '.date('Y-m-d H:i:s', $lastModified);

if( $lastModified > 0 ){
	function __autoload( $class_name ){
		if( file_exists(__DIR__."/inc/class_".$class_name.".php") ){
			require_once __DIR__."/inc/class_".$class_name.".php";
			return true;
		}
		return false;
	}

	$oChecker = new checker(1);

	$previous = $oChecker->timestamp;
	echo '<br>previous last modified '.date('Y-m-d H:i:s', $previous);

	if( $previous != $lastModified ){
		$oChecker->timestamp = $lastModified;
		$oChecker->save();

		echo '<br>sending email';
		mail('gmoulin.dev@gmail.com', 'kabam code change', date('Y-m-d H:i:s', $lastModified), 'From: kocfia@kapok.fr');
	}
}
?>
