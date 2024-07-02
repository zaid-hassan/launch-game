class Bomb {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.radius = 25;
        this.x;
        this.y;
        this.speedX = 0;
        this.speedY = Math.floor(Math.random() * 3) + 1;
        this.available = true;
    }
    start() {
        this.available = false;
        this.x = Math.floor(Math.random() * this.game.width);
        this.y = -this.radius;
    }
    reset() {
        this.available = true;
    }
    update() {
        if (!this.available) {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
            }
            
            if (this.y > this.game.height) {
                this.reset();
            }
            if (this.game.checkCollision(this, this.game.player)) {
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

