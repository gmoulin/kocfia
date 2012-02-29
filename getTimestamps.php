<?php
header('Content-type: application/json');

$urls = array(
	'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', //latest 1.x.x jquery
	'//'.$_SERVER['SERVER_NAME'].'/jquery-ui-1.8.17.custom.min.js',
	'//'.$_SERVER['SERVER_NAME'].'/jquery-ui-1.8.17.custom.css',
	'//'.$_SERVER['SERVER_NAME'].'/jquery.miniColors.css',
	'//'.$_SERVER['SERVER_NAME'].'/jquery.miniColors.min.js',
	'//'.$_SERVER['SERVER_NAME'].'/jquery.tipsy.css',
	'//'.$_SERVER['SERVER_NAME'].'/jquery.tipsy.min.js',
	'//'.$_SERVER['SERVER_NAME'].'/kocfia.confPanel.css?ts=' + filemtime('kocfia.confPanel.css'),
	'//'.$_SERVER['SERVER_NAME'].'/kocfia.js?ts=' + filemtime('kocfia.js')
);

echo json_encode($urls);
die;
?>
