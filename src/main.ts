import './style.css'

type Bricks = {
  x: number,
  y: number,
  destroyed: number,
}

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
let y: number = canvas.height - 30;
let dx: number = 2;
let dy: number = -2;

const paddleHeight: number = 10;
const paddleWidth: number = 75;
let paddleX: number = (canvas.width - paddleWidth) / 2;
const paddleSpeed: number = 5;
let leftPressed: boolean = false;
let rightPressed: boolean = false;

let ballRadius: number = 10;
let ballColor: string = 'lightblue';

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks: Bricks[][] = [];

for (let col = 0; col < brickColumnCount; col++) {
  bricks[col] = [];

  for (let row = 0; row < brickRowCount; row++) {
    bricks[col][row] = { x: 0, y: 0, destroyed: 0 };
  }
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
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBricks(): void {
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[col][row].destroyed === 0) {
        const brickX: number = col * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY: number = row * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[col][row].x = brickX;
        bricks[col][row].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = ballColor;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection(): void {
  for (let col = 0; col < brickColumnCount; col++) {
    for (let row = 0; row < brickRowCount; row++) {
      const brick = bricks[col][row];

      if (brick.destroyed === 0) {

        if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
          dy = -dy;
          brick.destroyed = 1;
        }
      }
    }
  }
}

function draw(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  collisionDetection();
  drawBricks();

  y += dy;
  x += dx;

  if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  } else if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  }


  // change ballRadius for a 0 to give the illusion that the ball is soft
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX - (paddleWidth / 8) && x < (paddleX + paddleWidth) + paddleWidth / 8) {
      dy = -dy;
    } else {
      alert('Game Over');
      document.location.reload();
      clearInterval(interval);
    }
  } 
}

// just for fun
function getRandomColor(): string {
  let r = Math.floor(Math.random() * 255) +1;
  let g = Math.floor(Math.random() * 255) +1;
  let b = Math.floor(Math.random() * 255) +1;

  return `rgb(${r},${g},${b})`;
}

const interval = setInterval(draw, 10);

