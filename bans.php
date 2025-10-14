<?php
die(http_response_code(503));

// steamid			Player's SteamID
// time				Ban time
// unban			Time before the ban expires (0 for permanent)
// reason			Ban reason
// name				Player's name
// admin			Admin who issued the ban
// modified_admin	Admin who last edited the ban
// modified_time	Time the ban was the last edited
$db = new PDO("sqlite:/run/media/romeo/programmes/SteamLibrary/steamapps/common/GarrysMod/garrysmod/sv.db");
//$db = new PDO("sqlite:/home/admin/.steam/SteamApps/common/GarrysModDS/garrysmod/sv.db");
$bans = $db->query("SELECT * FROM ulib_bans");
?>

<!DOCTYPE html>

<html>

<head>
	<title>OpenBox Bans</title>
	<link rel="stylesheet" href="style.css">
	<link rel="icon" type="image/png" href="logo.png">
</head>

<body>
	<div id="header">
		<!--<h1>OpenBox</h1>-->
		<img src="logo.png">
		<table><tr>
			<th><a href="index.html">Home</a></th>
			<th><a>Bans</a></th>
			<th><a href="links.html">Community & Contact</a></th>
		</tr></table>
	</div>

	<table id="bans">
		<tr>
			<th>Player</th>
			<th>Reason</th>
			<th>Length</th>
		</tr>
		<?php
foreach($bans as $ban) {
	$userJ = file_get_contents("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=924E7918527C77D6E38DBCBECF759211&steamids=${ban['steamid']}");
	$user = json_decode($userJ, true);
	$player = $user["response"]["players"][0];
	$profile = $player["profileurl"];
	$avatar = $player["avatar"];

	if($ban["unban"] == "0") {
		$len = "Permanent";
	}
	else {
		$lenU = $ban["unban"] - $ban["time"];
		$lenY = date("Y", $lenU) - 1970;
		$lenM = date("m", $lenU) - 1;
		$lenD = date("d", $lenU) - 1;
		$lenH = date("H", $lenU);
		$lenI = date("i", $lenU);

		$len = "";
		if($lenY > 0) { $len = $len . $lenY . " Years "; }
		if($lenM > 0) { $len = $len . $lenM . " Months "; }
		if($lenD > 0) { $len = $len . $lenD . " Days "; }
		if($lenH > 0) { $len = $len . $lenH . " Hours "; }
		if($lenI > 0) { $len = $len . $lenI . " Minutes "; }
	}

	echo "<tr>";
	echo "<td><img src=\"${avatar}\"> <a href=\"${profile}\">${ban['name']}</a></td>";
	echo "<td>${ban['reason']}</td>";
	echo "<td>${len}</td>";
	echo "</tr>";
}
		?>
	</table>
</body>

</html>