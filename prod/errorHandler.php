<?php
	// Specify domains from which requests are allowed
	header('Access-Control-Allow-Origin: *');
	// Specify which request methods are allowed
	header('Access-Control-Allow-Methods: POST, OPTIONS');
	// Additional headers which may be sent along with the CORS request
	// The X-Requested-With header allows jQuery requests to go through
	header('Access-Control-Allow-Headers: X-Requested-With');
	// Set the age to 1 day to improve speed/caching.
	header('Access-Control-Max-Age: 86400');

	// Exit early so the page isn't fully loaded for options requests
	if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
		exit();
	}

	if( $_SERVER['REQUEST_METHOD'] == 'POST' ){
		function autoload( $class_name ){
			if( file_exists(__DIR__."/inc/class_".$class_name.".php") ){
				require_once __DIR__."/inc/class_".$class_name.".php";
				return true;
			}
			return false;
		}
		print_r(__DIR__);

		$oTracker = new tracker();

		$formData = $oPayment->checkAndPrepareFormData();

		$oTracker->save();

		header('Content-type: text/plain');
		echo 1;
	}
	die;
?>
