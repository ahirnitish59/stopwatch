let timer;
let startTime;
let running = false;
const clickSound = document.getElementById("clickSound");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function updateDisplay(time) {
  const ms = time % 1000;
  const totalSeconds = Math.floor(time / 1000);
  const sec = totalSeconds % 60;
  const min = Math.floor((totalSeconds / 60)) % 60;
  const hr = Math.floor((totalSeconds / 3600));

  const formatted =
    `${hr.toString().padStart(2, '0')}:` +
    `${min.toString().padStart(2, '0')}:` +
    `${sec.toString().padStart(2, '0')}.` +
    `${ms.toString().padStart(3, '0')}`;

  document.getElementById("display").textContent = formatted;
}

function start() {
  playSound();
  if (!running) {
    running = true;
    startTime = Date.now() - (window.elapsedTime || 0);
    timer = setInterval(() => {
      window.elapsedTime = Date.now() - startTime;
      updateDisplay(window.elapsedTime);
    }, 10); // 🔁 Every 10 ms (for milliseconds)
  }
}

function stop() {
  playSound();
  running = false;
  clearInterval(timer);
}

function reset() {
  playSound();
  stop();
  window.elapsedTime = 0;
  updateDisplay(0);
}
