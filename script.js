var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext('2d');
var teclas = {};
var bola = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    alt: 30,
    lar: 30,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 1
};
var esquerda = {
    x: 10,
    y: canvas.height / 2 - 60,
    alt: 120,
    lar: 30,
    score: 0,
    speed: 10
};

var direita = {
    x: 560,
    y: canvas.height / 2 - 60,
    alt: 120,
    lar: 30,
    score: 0,
    speed: 10
};

document.addEventListener("keydown", function (e) {
    teclas[e.keyCode] = true;
}, false);

document.addEventListener("keyup", function (e) {
    delete teclas[e.keyCode];
}, false);

function movebola() {
    if (bola.y + bola.alt >= esquerda.y && bola.y <= esquerda.y + esquerda.alt && bola.x <= esquerda.x + esquerda.lar) {
        bola.dirx = 1;
        bola.mod += 0.2;
    }
    else if (bola.y + bola.alt >= direita.y && bola.y <= direita.y + direita.alt && bola.x + bola.lar >= direita.x) {
        bola.dirx = -1;
        bola.mod += 0.2;
    };
    if (bola.y <= 0) {
        bola.diry = 1;
    }
    else if (bola.y + bola.alt >= canvas.height) {
        bola.diry = -1;
    }

    bola.x += (bola.speed + bola.mod) * bola.dirx;
    bola.y += (bola.speed + bola.mod) * bola.diry;

    if (bola.x < esquerda.x + esquerda.lar - 15) {
        newgame("player 2");
    }
    else if (bola.x + bola.lar > direita.x + 15) {
        newgame("player 1");
    }
};

function movebloco() {
    if (87 in teclas && esquerda.y > 0) {
        esquerda.y -= esquerda.speed;
    };
    if (83 in teclas && esquerda.y + esquerda.alt < canvas.height) {
        esquerda.y += esquerda.speed;
    };
    if (38 in teclas && direita.y > 0) {
        direita.y -= direita.speed;
    };
    if (40 in teclas && direita.y + direita.alt < canvas.height) {
        direita.y += direita.speed;
    };
};

function newgame(winner) {
    if (winner == "player 1") {
        ++esquerda.score;
    }
    else {
        ++direita.score;
    }
    esquerda.y = canvas.height / 2 - esquerda.alt / 2;
    direita.y = esquerda.y;
    bola.y = canvas.height / 2 - bola.alt / 2;
    bola.x = canvas.width / 2 - bola.lar / 2;
    bola.mod = 0;
};

function desenha() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movebloco();
    movebola();

    ctx.fillStyle = "white";
    ctx.fillRect(esquerda.x, esquerda.y, esquerda.lar, esquerda.alt);
    ctx.fillRect(direita.x, direita.y, direita.lar, direita.alt);
    ctx.fillRect(bola.x, bola.y, bola.lar, bola.alt);
    ctx.font = "20px Arial";
    ctx.fillText("Player 1: " + esquerda.score, 50, 20)
    ctx.fillText("Player 2: " + direita.score, canvas.width - 150, 20)
};

setInterval(desenha, 15);