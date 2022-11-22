const canvas = document.querySelector("canvas");
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext("2d");

const Snake = (direction, x, y) => ({
  x,
  y,
  w: 15,
  h: 15,
  color: "green",
  draw(d) {
    ctx.fillStyle = this.color;
    if (d === "top") {
      this.y = this.y - 15;
    } else if (d === "down") {
      this.y = this.y + 15;
    } else if (d === "left") {
      this.x = this.x - 15;
    } else if (d === "right") {
      this.x = this.x + 15;
    }
    ctx.fillRect(this.x, this.y, this.w, this.h);
  },
});

const Comida = () => ({
  w: 15,
  h: 15,
  color: "red",
  draw() {
    ctx.fillStyle = this.color;
    let x = Math.floor(Math.random() * 800);
    let y = Math.floor(Math.random() * 800);
    ctx.fillRect(x, y, this.w, this.h);
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

const snake = Snake("", 400, 400);

function checkKey(e) {
  const key = e.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
  switch (true) {
    case key == LEFT:
      snake.draw("left");
      break;
    case key == UP:
      snake.draw("top");
      break;
    case key == RIGHT:
      snake.draw("right");
      break;
    case key == DOWN:
      snake.draw("down");
      break;
  }
}

const comida = Comida();
comida.draw();
snake.draw();

function draw() {
  document.addEventListener("keydown", checkKey);
  ctx.clearRect(0,0, canvas.width, canvas.height);
}
