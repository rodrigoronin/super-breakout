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
const paddleHeight: number = 10;
const paddleWidth: number = 75;
let paddleX: number = (canvas.width / 2);
let leftPressed: boolean = false;
let rightPressed: boolean = false;



//functions
function drawBall(): void {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(): void {
  ctx.beginPath();
  ctx.rect(paddleX - (paddleWidth / 2), canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function draw(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collided = false;

  drawBall();
  drawPaddle();
  y += dy;
  x += dx;

  if (leftPressed && paddleX - paddleWidth / 2 > 0) {
    paddleX -= 5;
  } else if (rightPressed && paddleX + paddleWidth / 2 < canvas.width) {
    paddleX += 5;
  }

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
function getRandomColor(): string {
  let r = Math.floor(Math.random() * 255) +1;
  let g = Math.floor(Math.random() * 255) +1;
  let b = Math.floor(Math.random() * 255) +1;

  console.log(`rgb(${r},${g},${b})`);

  return `rgb(${r},${g},${b})`;
}

function init(): void {
  const interval = setInterval(draw, 10);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

function keyUpHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

init();

//const button: HTMLButtonElement | null = document.querySelector('.play');

//if (button) {
  //button.addEventListener('click', () => {
    //init();
    //button.disabled = true;
  //});
//}
