let hlsInstance;

const video = document.getElementById("video");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const videoControls = document.querySelector(".video-controls-container");

const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume-slider");
const fullscreenButton = document.getElementById("fullscreen");
const themeToggleButton = document.getElementById("theme-toggle");

document.getElementById("load-stream").addEventListener("click", function () {
   const hlsUrl = document.getElementById("hls-url").value;
   loadStream(hlsUrl);
});

function loadStream(hlsUrl) {
   if (Hls.isSupported()) {
      hlsInstance = new Hls();
      hlsInstance.loadSource(hlsUrl);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
         video.play();
         videoControls.style.display = "flex";
         video.style.display = "block";
      });
   } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl;
      video.addEventListener("loadedmetadata", function () {
         video.play();
         videoControls.style.display = "flex";
         video.style.display = "block";
      });
   }
}

playButton.addEventListener("click", function () {
   video.play();
});

pauseButton.addEventListener("click", function () {
   video.pause();
});

volumeSlider.addEventListener("input", function () {
   video.volume = volumeSlider.value;
   updateVolumeIcon();
});

video.addEventListener("volumechange", function () {
   volumeSlider.value = video.volume;
   updateVolumeIcon();
});

function updateVolumeIcon() {
   if (video.muted || video.volume === 0) {
      volumeIcon.classList.remove("fa-volume-up", "fa-volume-down");
      volumeIcon.classList.add("fa-volume-mute");
   } else if (video.volume > 0.5) {
      volumeIcon.classList.remove("fa-volume-mute", "fa-volume-down");
      volumeIcon.classList.add("fa-volume-up");
   } else {
      volumeIcon.classList.remove("fa-volume-mute", "fa-volume-up");
      volumeIcon.classList.add("fa-volume-down");
   }
}

volumeIcon.addEventListener("click", function () {
   video.muted = !video.muted;
   updateVolumeIcon();
});

fullscreenButton.addEventListener("click", function () {
   if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
         console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
         );
      });
   } else {
      document.exitFullscreen();
   }
});

themeToggleButton.addEventListener("click", function () {
   document.body.classList.toggle("theme-light");
});
