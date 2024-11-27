export default class Bullet {
    constructor(game) {
        this.game = game;
        this.radius = 5;
        this.x;
        this.y;
        this.speedX;
        // this.speedY = Math.floor(Math.random() * 3) + 1;
        this.speedY;
        this.available = true;
    }
    start(x, y, speedX, speedY) {
        this.available = false;
        this.x = x;
        this.y = y;
        this.speedX = speedX * 400;
        this.speedY = speedY * 400;
        // console.log(this.x, this.y)
    }
    reset() {
        this.available = true;
        // console.log('Bullet reset')
    }
    update(deltaTime) {
        if (!this.available) {
            this.x += this.speedX * deltaTime / 1000;
            this.y += this.speedY * deltaTime / 1000;
            if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
            }
            
            if (this.y > this.game.height || this.x > this.game.width || this.x < 0 || this.y < 0) {
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

