class Bomb {
    constructor(game) {
        this.game = game;
        this.radius = 15;
        this.x;
        this.y;
        this.speedX = 1;
        // this.speedY = Math.floor(Math.random() * 3) + 1;
        this.speedY = 1
        this.available = true;
    }
    start(x, y, speedX, speedY) {
        this.available = false;
        this.x = x;
        this.y = y;
        this.speedX = speedX * 10;
        this.speedY = speedY * 10;
        console.log(this.x, this.y)
    }
    reset() {
        this.available = true;
        console.log('bomb reset')
    }
    update() {
        if (!this.available) {
            this.x += this.speedX;
            this.y += this.speedY;
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

