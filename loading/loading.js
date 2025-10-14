let filesTotal = 0;
let receivedTotal = false;

function GameDetails( servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language ) {
	Array.prototype.forEach.call(document.getElementsByClassName("gmod_loading"), (container) => {
		Array.prototype.forEach.call(container.getElementsByClassName("info"), (e) => {
			e.innerText = gamemode + "/" + mapname;
		});
	});
}

function SetStatusChanged( status ) {
	Array.prototype.forEach.call(document.getElementsByClassName("gmod_loading"), (container) => {
		Array.prototype.forEach.call(container.getElementsByClassName("status"), (e) => {
			e.innerText = status;
		});
	});
}

function SetFilesTotal( total ) {
	filesTotal = total;
	receivedTotal = true;
}

function SetFilesNeeded( needed ) {
	if(receivedTotal) {
		size = (filesTotal - needed) * 100 / filesTotal;
	}
	else {
		size = 0
	}

	Array.prototype.forEach.call(document.getElementsByClassName("gmod_loading"), (container) => {
		Array.prototype.forEach.call(container.getElementsByClassName("progress"), (progress) => {
			progress.getElementsByTagName("div")[0].style.width = size + "%";
		});
	});
}