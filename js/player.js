class Player {
    constructor(game, rotationControls, movementControls) {
        this.game = game;
        this.rotationControls = rotationControls;
        this.movementControls = movementControls;
        this.height;
        this.width;
        this.radius = 40;
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.speedX = 5;
        this.speedY = 5;
    }
    update() {
        // Bound player movement
        if (this.x > this.game.width - this.radius) this.x = this.game.width - this.radius;
        if (this.x < this.radius) this.x = this.radius;
        if (this.y > this.game.height - this.radius) this.y = this.game.height - this.radius;
        if (this.y < this.radius) this.y = this.radius;

        // Handle player movement
        if (this.game.keys.includes('ArrowUp')) this.y -= this.speedY;
        if (this.game.keys.includes('ArrowDown')) this.y += this.speedY;
        if (this.game.keys.includes('ArrowLeft')) this.x -= this.speedX;
        if (this.game.keys.includes('ArrowRight')) this.x += this.speedX;

        // Handle player movmentin joystick
        if (this.movementControls.stickX > this.movementControls.x + this.movementControls.radius / 1.5) this.x += this.speedX;
        if (this.movementControls.stickX < this.movementControls.x - this.movementControls.radius / 1.5) this.x -= this.speedX;
        if (this.movementControls.stickY > this.movementControls.y + this.movementControls.radius / 1.5) this.y += this.speedY;
        if (this.movementControls.stickY < this.movementControls.y - this.movementControls.radius / 1.5) this.y -= this.speedY;
    }
    draw() {
        this.game.ctx.save();

        this.game.ctx.translate(this.x, this.y);
        this.game.ctx.rotate(this.rotationControls.angle);
        this.game.ctx.translate(-this.x, -this.y);


        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 10, Math.PI * 2, true);
        this.game.ctx.fill();

        this.game.ctx.restore();
    }
}