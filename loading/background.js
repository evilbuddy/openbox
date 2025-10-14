const backgrounds = [
	// Old wallpapers
	/*"wallpapers/goodbye_bottom.png",
	"wallpapers/ika_musume_bottom.png",
	"wallpapers/purple_top.png",
	"wallpapers/ina.jpg",
	"wallpapers/touhou1.jpg",
	"wallpapers/touhou2.jpg",
	"wallpapers/touhou3.png",
	"wallpapers/touhou4.jpg",
	"wallpapers/touhou5.jpg",
	"wallpapers/touhou6.png",
	"wallpapers/touhou7.png",
	"wallpapers/touhou8.png"*/

	"wallpapers/touhou1.jpg",
	"wallpapers/touhou2.jpg",
	"wallpapers/touhou4.jpg",

	"wallpapers/33270782_p0.jpg",
	"wallpapers/111283885_p0.png",
	"wallpapers/113246345_p0.jpg",
	"wallpapers/118259681_p0.png",
	"wallpapers/118990129_p0.png",
	"wallpapers/122564346_p0.png",
	"wallpapers/123227513_p0.png",
	"wallpapers/125505840_p0.png",
	"wallpapers/125506673_p0.png",
	"wallpapers/125622140_p0.jpg",
];
let wallpaper = 0;

document.addEventListener("DOMContentLoaded", () => {
	const image = document.getElementById("background");
	const fader = document.getElementById("background-fade");

	wallpaper = Math.floor(Math.random() * backgrounds.length);
	image.style.backgroundImage = "url(" + backgrounds[wallpaper] + ")";

	setInterval(() => {
		wallpaper += 1;

		if(wallpaper >= backgrounds.length) {
			wallpaper = 0;
		}

		fader.style.backgroundImage = "url(" + backgrounds[wallpaper] + ")";
		image.style.opacity = 0;

		setTimeout(() => {
			image.style.backgroundImage = "url(" + backgrounds[wallpaper] + ")";
			image.style.opacity = 1;
		}, 5000);
	}, 20000);
});