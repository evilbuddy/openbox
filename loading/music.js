const songs = [
	{
		URL:	"music/minecraft/beta/aria_math.mp3",
		cover:	"music/minecraft/beta/cover.jpg",
		title:	"Aria Math",
		author:	"Minecraft Volume Beta",
		duration: 310
	},
	{
		URL:	"music/credits.mp3",
		cover:	"music/credits.jpg",
		title:	"credits song for my death",
		author:	"vivivivivi",
		duration: 171
	},
	{
		URL:	"music/catharsis.mp3",
		cover:	"music/viraha.jpg",
		title:	"Catharsis",
		author:	"Aether",
		duration: 245
	},
	{
		URL:	"music/flowerdance.mp3",
		cover:	"music/viraha.jpg",
		title:	"Flowerdance",
		author:	"Aether",
		duration: 216
	},
	{
		URL:	"music/dearlillie.mp3",
		cover:	"music/tbtst.jpg",
		title:	"Dear Lillie",
		author:	"Aether",
		duration: 235
	},
	{
		URL:	"music/snowfall.mp3",
		cover:	"music/snowfall.jpg",
		title:	"snowfall",
		author:	"Øneheart & reidenshi",
		duration: 124
	},
	{
		URL:	"music/schoolrooftop.mp3",
		cover:	"music/schoolrooftop.jpg",
		title:	"School Rooftop (Slowed)",
		author:	"hisohkah",
		duration: 193
	},
	{
		URL:	"music/partiallyoffline.mp3",
		cover:	"music/lullabiesofthefallen.jpg",
		title:	"Partially Offline",
		author:	"Andrea Baroni",
		duration: 125
	},

	// old breakcore songs (old/)
	/*{
		URL:	"music/right_here.mp3",
		cover:	"music/forever.jpg",
		title:	"right here",
		author:	"hkmori",
		duration: 193
	},
	{
		URL:	"music/idkhtbm.mp3",
		cover:	"music/forever.jpg",
		title:	"I don't know how to be me",
		author:	"hkmori",
		duration: 214
	},
	{
		URL:	"music/thevoicestoldmeto.mp3",
		cover:	"music/thevoicestoldmeto.jpg",
		title:	"The Voices Told Me To",
		author:	"Puhf",
		duration: 228
	},
	{
		URL:	"music/myheadhurts.mp3",
		cover:	"music/myheadhurts.jpg",
		title:	"My Head Hurts",
		author:	"strxwberrymilk",
		duration: 186
	}*/
];

function getTime(time) {
	let minutes = Math.floor(time / 60);
	let seconds = Math.floor(time - minutes * 60);

	if(minutes < 10) {
		minutes = "0" + minutes;
	}

	if(seconds < 10) {
		seconds = "0" + seconds;
	}

	return minutes + ":" + seconds;
}

function play(player, song = "auto") {
	let parent = player.parentElement;

	if(song == "auto") {
		song = songs[player.getAttribute("songID")];
	}

	player.src = song["URL"]
	player.play();

	/* update cover */
	Array.prototype.forEach.call(parent.getElementsByClassName("cover"), (e) => {
		e.src = song["cover"];
	});

	/* update title */
	Array.prototype.forEach.call(parent.getElementsByClassName("title"), (e) => {
		e.innerText = song["title"];
	});

	/* update author */
	Array.prototype.forEach.call(parent.getElementsByClassName("author"), (e) => {
		e.innerText = song["author"];
	});

	/* update duration */
	Array.prototype.forEach.call(parent.getElementsByClassName("duration"), (e) => {
		e.innerText = getTime(song["duration"]);
	});
}

/* create player(s) */
document.addEventListener("DOMContentLoaded", () => {
	Array.prototype.forEach.call(document.getElementsByClassName("music_controls"), (parent) => {
		let player = document.createElement("audio");
		parent.appendChild(player);

		player.setAttribute("songID", Math.floor(Math.random() * songs.length));
		player.volume = 0.1;
		play(player);

		/* next when song ended */
		player.onended = (e) => {
			let ID = Number(player.getAttribute("songID"));
			ID += 1;

			if(ID >= songs.length) {
				ID = 0;
			}

			player.setAttribute("songID", ID);
			play(player);
		}

		player.addEventListener("timeupdate", () => {
			/* update time */
			Array.prototype.forEach.call(parent.getElementsByClassName("time"), (e) => {
				e.innerText = getTime(player.currentTime);
			});

			/* update progress */
			Array.prototype.forEach.call(parent.getElementsByClassName("progress"), (e) => {
				e.getElementsByTagName("div")[0].style.width = player.currentTime * 100 / player.duration + "%";
			});
		});
	});
});