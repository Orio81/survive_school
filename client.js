// Single-player top-down demo (no server)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
  x: 400,
  y: 300,
  color: '#' + Math.floor(Math.random() * 16777215).toString(16),
  size: 20
};

const speed = 3;
const keys = {};

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Simple AI enemies
const enemies = [];
for(let i = 0; i < 5; i++) {
  enemies.push({
    x: Math.random() * 800,
    y: Math.random() * 600,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    size: 20,
    speed: 1 + Math.random()
  });
}

function update() {
  if (keys['w']) player.y -= speed;
  if (keys['s']) player.y += speed;
  if (keys['a']) player.x -= speed;
  if (keys['d']) player.x += speed;

  player.x = Math.max(0, Math.min(800, player.x));
  player.y = Math.max(0, Math.min(600, player.y));

  // Move enemies randomly
  enemies.forEach(e => {
    e.x += (Math.random()-0.5)*e.speed;
    e.y += (Math.random()-0.5)*e.speed;
    e.x = Math.max(0, Math.min(800, e.x));
    e.y = Math.max(0, Math.min(600, e.y));
  });
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI*2);
  ctx.fill();

  enemies.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.size, 0, Math.PI*2);
    ctx.fill();
  });
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
Add client.js code


gameLoop();

