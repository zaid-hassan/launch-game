class RotationControl {
    constructor(game) {
        this.game = game;
        this.radius = 50;
        this.x = this.game.width - this.radius * 2;
        this.y = this.game.height - this.radius * 2;

        this.initX = this.x;
        this.initY = this.y;

        this.stickX = this.initX;
        this.stickY = this.initY;

        this.angle = 0;

        this.touchId = null;
    }

    draw() {
        this.game.ctx.lineWidth = 2;
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.stroke();

        this.game.ctx.beginPath();
        this.game.ctx.arc(this.stickX, this.stickY, this.radius / 2, 0, Math.PI * 2, true);
        this.game.ctx.stroke();
    }

    update(touchX, touchY) {
        if (touchX && touchY) {
            this.angle = this.game.getAngle(touchX, touchY, this.x, this.y);
            this.stickX = this.x + Math.cos(this.angle) * this.radius * 0.5;
            this.stickY = this.y + Math.sin(this.angle) * this.radius * 0.5;
        }
    }

    reset() {
        this.stickX = this.initX;
        this.stickY = this.initY;
        this.touchId = null;
    }
}