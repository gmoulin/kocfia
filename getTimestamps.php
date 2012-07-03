<?php
header('Content-type: application/json');

$urls = array(
	'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery-ui-1.8.18.custom.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery-ui-1.8.18.custom.css',
	'http://'.$_SERVER['SERVER_NAME'].'/font/font-awesome.css',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery.miniColors.css',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery.miniColors.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery.tipsy.css',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery.tipsy.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/ui.jqgrid.css',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/grid.locale-fr.js',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/jquery.jqGrid.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/kocfia.css?ts='.filemtime('kocfia.css'),
	'http://'.$_SERVER['SERVER_NAME'].'/plugins/kocfia.js?ts='.filemtime('kocfia.js')
);

echo json_encode($urls);
die;
?>
