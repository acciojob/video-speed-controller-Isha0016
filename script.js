const video = document.querySelector("video");
const playerButton = document.querySelector(".player__button");
const progressFilled = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
const volumeInput = document.querySelector('input[name="volume"]');
const playbackSpeedInput = document.querySelector('input[name="playbackSpeed"]');
const rewindButton = document.querySelector(".rewind");
const skipButton = document.querySelector(".skip");

// Play and pause toggle
playerButton.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playerButton.textContent = "⏸";
    } else {
        video.pause();
        playerButton.textContent = "►";
    }
});

// Update progress bar as video plays
video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.flexBasis = `${percent || 0}%`;
});

// Seek when clicking the progress bar
progress.addEventListener("click", (event) => {
    const percent = event.offsetX / progress.offsetWidth;
    video.currentTime = percent * video.duration;
});

// Control volume
volumeInput.addEventListener("input", () => {
    video.volume = Number(volumeInput.value);
});

// Control playback speed
playbackSpeedInput.addEventListener("input", () => {
    video.playbackRate = Number(playbackSpeedInput.value);
});

// Rewind 10 seconds
rewindButton.addEventListener("click", () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
});

// Skip forward 25 seconds
skipButton.addEventListener("click", () => {
    video.currentTime = Math.min(
        video.duration,
        video.currentTime + 25
    );
});