const video = document.querySelector("video");
const playerButton = document.querySelector(".player__button");
const progressFilled = document.querySelector(".progress__filled");
const progress = document.querySelector(".progress");
const volumeInput = document.querySelector('[name="volume"]');
const speedInput = document.querySelector('[name="playbackSpeed"]');
const rewindButton = document.querySelector(".rewind");
const skipButton = document.querySelector(".skip");

// Play and pause
playerButton.addEventListener("click", () => {
    if (video.paused) {
        video.play();
        playerButton.textContent = "Ⅱ";
    } else {
        video.pause();
        playerButton.textContent = "▶";
    }
});

// Update progress bar
video.addEventListener("timeupdate", () => {
    if (video.duration) {
        const percentage =
            (video.currentTime / video.duration) * 100;

        progressFilled.style.width = percentage + "%";
    }
});

// Seek using the progress bar
progress.addEventListener("click", (event) => {
    if (!video.duration) return;

    const rect = progress.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;

    video.currentTime = percentage * video.duration;
});

// Volume control
volumeInput.addEventListener("input", () => {
    video.volume = Number(volumeInput.value);
});

// Playback speed control
speedInput.addEventListener("input", () => {
    video.playbackRate = Number(speedInput.value);
});

// Rewind 10 seconds
rewindButton.addEventListener("click", () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
});

// Skip forward 25 seconds
skipButton.addEventListener("click", () => {
    if (video.duration) {
        video.currentTime = Math.min(
            video.duration,
            video.currentTime + 25
        );
    }
});

// Reset button when video ends
video.addEventListener("ended", () => {
    playerButton.textContent = "▶";
});