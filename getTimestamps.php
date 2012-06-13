<?php
header('Content-type: application/json');

$urls = array(
	'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', //latest 1.x.x jquery
	'http://'.$_SERVER['SERVER_NAME'].'/jquery-ui-1.8.18.custom.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/jquery-ui-1.8.18.custom.css',
	'http://'.$_SERVER['SERVER_NAME'].'/font-awesome.css',
	'http://'.$_SERVER['SERVER_NAME'].'/jquery.miniColors.css',
	'http://'.$_SERVER['SERVER_NAME'].'/jquery.miniColors.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/jquery.tipsy.css',
	'http://'.$_SERVER['SERVER_NAME'].'/jquery.tipsy.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/ui.jqgrid.css',
	'http://'.$_SERVER['SERVER_NAME'].'/grid.locale-fr.js',
	'http://'.$_SERVER['SERVER_NAME'].'/jquery.jqGrid.min.js',
	'http://'.$_SERVER['SERVER_NAME'].'/kocfia.confPanel.css?ts='.filemtime('kocfia.confPanel.css'),
	'http://'.$_SERVER['SERVER_NAME'].'/kocfia.js?ts='.filemtime('kocfia.js')
);

echo json_encode($urls);
die;
?>
