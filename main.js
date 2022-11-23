const canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 600;
const ctx = canvas.getContext("2d");

ctx.rect(0, 0, canvas.width, canvas.height);

const Snake = (direction, x, y) => ({
  x,
  y,
  w: 20,
  h: 20,
  mov: 20,
  color: "green",
  draw(d) {
    ctx.fillStyle = this.color;
    if (d === "top") {
      this.y = this.y - this.mov;
    } else if (d === "down") {
      this.y = this.y + this.mov;
    } else if (d === "left") {
      this.x = this.x - this.mov;
    } else if (d === "right") {
      this.x = this.x + this.mov;
    }
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
  posicion() {
    let pos = [];
    pos.push(this.x);
    pos.push(this.y);
    return pos;
  },
});

const Comida = () => ({
  w: 20,
  h: 20,
  x: 0,
  y: 0,
  color: "red",
  new() {
    ctx.fillStyle = this.color;
    this.x = Math.floor(Math.random() * 590);
    while (this.x % 20 !== 0) {
      this.x = Math.floor(Math.random() * 590);
    }
    this.y = Math.floor(Math.random() * 590);
    while (this.y % 20 !== 0) {
      this.y = Math.floor(Math.random() * 590);
    }
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
  posicion() {
    let pos = [];
    pos.push(this.x);
    pos.push(this.y);
    return pos;
  },
});

const eventos = () => {
  document.onkeydown = checkKey;
  let x;
  function checkKey(e, x) {
    e = e || window.event;

    if (e.keyCode == "38") {
      x = 1;
    } else if (e.keyCode == "40") {
      x = 2;
    } else if (e.keyCode == "37") {
      x = 3;
    } else if (e.keyCode == "39") {
      x = 4;
    }
  }
  return x;
};

function checkKey(e) {
  const key = e.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  let posS = [];
  let posC = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    switch (true) {
      case key == LEFT:
        posS = [];
        posC = [];
        snake[i].draw("left");
        posS = snake[i].posicion();
        posC = comida.posicion();
        comida.draw();
        if (posS[0] == posC[0] && posS[1] == posC[1]) {
          comida.new();
          comida.draw();
          snake[i].draw();
          let s = Snake(snake[i].x - 20, snake[i].y - 20);
          snake.push(s);
        }
        break;
      case key == UP:
        posS = [];
        posC = [];
        snake[i].draw("top");
        posS = snake[i].posicion();
        posC = comida.posicion();
        comida.draw();
        if (posS[0] == posC[0] && posS[1] == posC[1]) {
          comida.new();
          comida.draw();
          snake[i].draw();
        }
        break;
      case key == RIGHT:
        posS = [];
        posC = [];
        snake[i].draw("right");
        posS = snake[i].posicion();
        posC = comida.posicion();
        comida.draw();
        if (posS[0] == posC[0] && posS[1] == posC[1]) {
          comida.new();
          comida.draw();
          snake[i].draw();
        }
        break;
      case key == DOWN:
        posS = [];
        posC = [];
        snake[i].draw("down");
        posS = snake[i].posicion();
        posC = comida.posicion();
        comida.draw();
        if (posS[0] == posC[0] && posS[1] == posC[1]) {
          comida.new();
          comida.draw();
          snake[i].draw();
        }
        break;
    }
  }
  rellenar();
}

function rellenar() {
  for (let i = 0; i < snake.length; i++) {
    snake[i] = document.addEventListener("keydown", checkKey);
  }
}
const comida = Comida();
comida.new();
let snake = [];
snake[0] = Snake("", 0, 0);
snake[0].draw();
