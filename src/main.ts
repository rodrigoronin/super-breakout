import './style.css'

const body: HTMLElement = document.getElementById('body') as HTMLElement;
let canvas: HTMLCanvasElement = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
body.append(canvas);

canvas.width = 480;
canvas.height = 320;

let ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

let x: number = canvas.width / 2;
let y: number = canvas.height -30;
let dx: number = 2;
let dy: number = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'lightblue';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  y += dy;
  x += dx;
}

setInterval(draw, 10);
