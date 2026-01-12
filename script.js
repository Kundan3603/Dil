const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const words = "HAPPY BIRTHDAY TO YOU";
const letters = words.split("");
let balloons = [];

class Balloon {
    constructor(letter, x, y) {
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.speedY = Math.random() * 1.5 + 0.5; // Upward speed
        this.speedX = Math.random() * 2 - 1;     // Slight horizontal drift
    }

    draw() {
        // Draw the balloon string
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x, this.y + this.radius + 40);
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        // Draw balloon body
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Draw the letter inside
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.letter, this.x, this.y);
    }

    update() {
        this.y -= this.speedY; // Move up
        this.x += this.speedX; // Drift side to side
        
        // Reset balloon to bottom if it goes off screen
        if (this.y + this.radius < 0) {
            this.y = canvas.height + this.radius + Math.random() * 100;
            this.x = Math.random() * canvas.width;
        }
    }
}

function init() {
    balloons = [];
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] === " ") continue;
        let x = (canvas.width / letters.length) * i + 50;
        let y = canvas.height + Math.random() * 500;
        balloons.push(new Balloon(letters[i], x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach(balloon => {
        balloon.update();
        balloon.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate();
