const video = document.querySelector("video");
const playerButton = document.querySelector(".player__button");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");
const speedBar = document.querySelector(".speed-bar");
const inputs = document.querySelectorAll(".controls input");
const skipButtons = document.querySelectorAll("[data-skip]");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";

  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );

  if (this.name === "volume") {
    video.volume = Number(this.value);
  }

  if (this.name === "playbackSpeed") {
    video.playbackRate = Number(this.value);
    speedBar.textContent = `${this.value}×`;
  }
}

inputs.forEach(input => {
  input.addEventListener("change", handleUpdate);
  input.addEventListener("mousemove", handleUpdate);
});

playerButton.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playerButton.textContent = "Ⅱ";
  } else {
    video.pause();
    playerButton.textContent = "►";
  }
});

video.addEventListener("play", () => {
  playerButton.textContent = "Ⅱ";
});

video.addEventListener("pause", () => {
  playerButton.textContent = "►";
});

video.addEventListener("timeupdate", () => {
  const percentage = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percentage || 0}%`;
});

progress.addEventListener("click", event => {
  const rect = progress.getBoundingClientRect();
  const position = (event.clientX - rect.left) / rect.width;
  video.currentTime = position * video.duration;
});

skipButtons.forEach(button => {
  button.addEventListener("click", () => {
    video.currentTime += Number(button.dataset.skip);
  });
});