const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const jumpSpeed = 15;
let isJumping = false;
let position = 0;
let speed = 5;

let increaseSpeedInterval = setInterval(() => { speed += 5; }, 10000);

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function jump() {
  position = 0;
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      // down
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= jumpSpeed;
          dino.style.bottom = `${position}px`;
        }
      }, 20);
    } else {
      // up
      position += jumpSpeed;
      dino.style.bottom = `${position}px`;
    }
  }, 20);

}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 800;
  let randomTime = randomIntFromRange(2000, 4000);

  cactus.classList.add('cactus');
  cactus.style.left = `${cactusPosition}px`;
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      clearInterval(increaseSpeedInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    } else {
      cactusPosition -= speed;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function handleKeyDown(event) {
  const { keyCode } = event;
  if (keyCode == 32 && !isJumping) {
    jump();
  }
}

createCactus();
document.addEventListener('keydown', handleKeyDown);