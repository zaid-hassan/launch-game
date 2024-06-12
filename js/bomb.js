class Bomb {
    constructor(game) {
        this.game = game;
        this.radius = 50;
        this.x = Math.floor(Math.random() * this.game.width);
        this.y = -this.radius;
        this.dx = 0;
        this.dy = 1;
        this.available = true;
    }
    start() {
        this.available = false;
        this.y = -this.height;
        this.x = Math.floor(Math.random() * this.game.width);
    }
    reset() {
        this.available = true;
    }
    update() {
        if (!this.available) {
            this.x += this.dx;
            this.y += this.dy;
            if (this.y > this.game.height) {
                this.reset();
            }
        }
    }
    draw() {
        if (!this.available) {
            this.game.ctx.beginPath();
            this.game.ctx.fillStyle = 'red';
            this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            this.game.ctx.fill();
        }
    }
}

