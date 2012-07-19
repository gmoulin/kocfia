<?php
/**
 * Fonction pour afficher les erreurs des blocs try catch
 * finalise la page (die)
 *
 * @param msg : le message de l'erreur
 */
function erreur( $msg ) {
	print "Error!: " . $msg->getMessage() . "<br />";
	die();
}

/**
 * Affiche les erreurs "PDOException"
 *
 * @param string $msg : le message de l'erreur
 * @param string $className : le nom de la classe où l'erreur a été détectée
 * @param string $functionName : le nom de la fonction où l'erreur a été détectée
 */
function erreur_pdo( $msg, $className, $functionName ) {
	print "erreur dans la classe ".$className.", fonction ".$functionName."<br />";
	erreur( $msg );
}

function __autoload( $class_name ){
	if( file_exists(__DIR__."/inc/class_".$class_name.".php") ){
		require_once __DIR__."/inc/class_".$class_name.".php";
		return true;
	}
	return false;
}

$oChecker = new checker(1);
$previous = $oChecker->version;

$url = 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/js/camelotmain_fr-'.$previous.'.js';
echo 'previous <a href="'.$url.'">'.$url.'</a>';

for( $i = $previous + 1; $i <= $previous + 20; $i++ ){
	//curl the javascript file and check the last-modified header against previous one stocked in database
	$url = 'https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/js/camelotmain_fr-'.$i.'.js';
	$ch = curl_init( $url );
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_NOBODY, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$response = curl_exec($ch);
	$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

	if( $code >= 200 && $code < 300 ){
		$oChecker->version = $i;
		$oChecker->save();

		echo '<br>'.$i.' => found, sending email, <a href="'.$url.'">'.$url.'</a>';
		mail('gmoulin.dev@gmail.com', 'kabam code change', 'Version from '.$previous.' to '.$i.' (<a href="'.$url.'">'.$url.'</a>)', 'From: kocfia@kapok.fr');
	} else {
		echo '<br>'.$i.' => '.$code;
	}
}
?>
