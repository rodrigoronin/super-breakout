import './style.css'

// canvas definition
const body: HTMLElement = document.getElementById('body') as HTMLElement;
let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
body.append(canvas);

canvas.width = 480;
canvas.height = 320;

let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

// variables
let x: number = canvas.width / 2;
let y: number = canvas.height -30;
let dx: number = 2;
let dy: number = -2;
let ballRadius: number = 10;
let ballColor: string = 'lightblue';
let collided: boolean = false;

//functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collided = false;

  drawBall();
  y += dy;
  x += dx;

  // change ballRadius for a 0 to give the illusion that the ball is soft
  if (y + dy < ballRadius || y +dy > canvas.height - ballRadius) {
    dy = -dy;
    collided = true;
  } 
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
    collided = true;
  }

  if (collided) {
    ballColor = getRandomColor();
  }
}

// just for fun
function getRandomColor() {
  let r = Math.floor(Math.random() * 256) +1;
  let g = Math.floor(Math.random() * 256) +1;
  let b = Math.floor(Math.random() * 256) +1;

  console.log(`rgb(${r},${g},${b})`);

  return `rgb(${r},${g},${b})`;
}

function init() {
  const interval = setInterval(draw, 10);
}

init();

//const button: HTMLButtonElement | null = document.querySelector('.play');

//if (button) {
  //button.addEventListener('click', () => {
    //init();
    //button.disabled = true;
  //});
//}
