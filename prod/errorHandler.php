<?php
	function autoload( $class_name ){
		if( file_exists(__DIR__."/inc/class_".$class_name.".php") ){
			require_once __DIR__."/inc/class_".$class_name.".php";
			return true;
		}
		return false;
	}

	$oTracker = new tracker();

	$formData = $oPayment->checkAndPrepareFormData();

	$oTracker->save();

	header('Content-type: text/plain');
	echo 1;
	die;
?>
