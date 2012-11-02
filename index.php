<!DOCTYPE HTML>
<html>
	<head>
		<title>kocfia links</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	</head>
	<body>
		<h1>Script KOCFIA pour Kingdoms of Camelot</h1>
		<a href="//<?php echo $_SERVER['SERVER_NAME']; ?>/kocfia.page.user.js">script 1 - page facebook ou kabam</a> (élargissement de la zone visible, ...)
		<br>
		<a href="//<?php echo $_SERVER['SERVER_NAME']; ?>/kocfia.frame.user.js">
			script 2 - page du jeu (script principal)
		</a>
		<!--
		<br>
		<a href="//<?php echo $_SERVER['SERVER_NAME']; ?>/kocfia.fb-popup.user.js">
			script 3 - popup facebook pour les posts sur le mur (utile pour le post automatique)
		</a>
		-->

		<!--
		<h1>Envoie des cadeaux</h1>
		<ul>
			<li>Fonctionne via la page uniquement (pas la popup).</li>
			<li>Se rappelle de la sélection précédente.</li>
			<li>Sélectionne automatiquement les amis sélectionnés précédement.</li>
			<li>Vous pourrez modifier la sélection.</li>
			<li>L'envoie n'est pas automatique, vous devrez le faire.</li>
		</ul>
		<a href="//<?php echo $_SERVER['SERVER_NAME']; ?>/kocfia.send-gift.user.js">
			script 4 - envoie des cadeaux
		</a>
		-->

		<!--
		<h1>Gestion de la page d'erreur Facebook et de la page "nouveau serveur" de Kabam</h1>
		<form id="fb-404" method="get" action="//<?php echo $_SERVER['SERVER_NAME']; ?>/kocfia.fb-404.user.php">
			<label for="numServer">Numéro du serveur Kingdoms of Camelot :</label>
			<input type="number" name="numServer" id="numServer" required pattern="[0-9]+" autocomplete="off">
			<button type="submit">Générer</button><br>
			Script de rechargement du jeu au bout de 10 secondes quand facebook affiche une "page not found" ou la page "nouveau serveur" de Kabam
			<br>Raffraîchissez la page une fois le script affiché (F5) pour que grease monkey prenne en compte le script généré.
		</form>

		<h1>Gestion de la page Kabam de lancement du jeu pour les nouveaux serveurs (347, 348)</h1>
		<a href="//<?php echo $_SERVER['SERVER_NAME']; ?>//kocfia.kabam-relog.user.js">
			script de rechargement du jeu au bout de 10 secondes quand kabam affiche la page de lancement
		</a>
		<br>Requiert l'autorisation d'afficher les popups sur kabam.com.
		<br>Affichez une fois la page et attendez 10 secondes, la demande d'autorisation apparaîtra.
		-->
	</body>
</html>
