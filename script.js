const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

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
          position -= 20;
          dino.style.bottom = `${position}px`;
        }
      }, 20);
    } else {
      // up
      position += 20;
      dino.style.bottom = `${position}px`;
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 600;
  let randomTime = Math.random() * 3000;

  cactus.classList.add('cactus');
  cactus.style.left = `${cactusPosition}px`;
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}

function handleKeyUp(event) {
  const { keyCode } = event;
  if (keyCode == 32 && !isJumping) {
    jump();
  }
}

createCactus();
document.addEventListener('keyup', handleKeyUp); 