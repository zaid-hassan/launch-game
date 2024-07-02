class RotationControls {
    constructor(game) {
        this.game = game;
        this.radius = 50;
        this.x = this.radius * 2;
        this.y = this.game.height - this.radius * 2;

        this.initX = this.x;
        this.initY = this.y;

        this.stickX = this.initX;
        this.stickY = this.initY;

        this.angle = 0;
    }
    drawRotationStick() {
        this.game.ctx.lineWidth = 2;
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.stroke();

        if (this.game.touch.x !== undefined && this.game.touch.y !== undefined) {
            this.angle = this.game.getAngle(this.game.touch.x, this.game.touch.y, this.x, this.y);
            // console.log(`angle: ${this.angle}`)
            this.stickX = this.x + Math.cos(this.angle) * this.radius * 0.5;
            this.stickY = this.y + Math.sin(this.angle) * this.radius * 0.5;
            // console.log(`stick: ${this.stickX},${this.stickY}`);
        }
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.stickX, this.stickY, this.radius / 2, 0, Math.PI * 2, true);
        // this.game.ctx.arc(this.x + Math.cos(this.game.getAngle(this.game.touch.x, this.game.touch.y, this.x, this.y)) * this.radius * 0.5, this.y + Math.sin(this.game.getAngle(this.game.touch.x, this.game.touch.y, this.x, this.y)) * this.radius * 0.5, this.radius / 2, 0, Math.PI * 2, true);
        this.game.ctx.stroke();
        // console.log(this.game.getAngle(this.x, this.y, this.x + Math.cos(this.game.getAngle(this.game.touch.x, this.game.touch.y, this.x, this.y)) * this.radius * 0.5, this.y + Math.sin(this.game.getAngle(this.game.touch.x, this.game.touch.y, this.x, this.y)) * this.radius * 0.5))
        // console.log(this.x, this.y);
        // console.log('draw')
    }
    // resetStickPos() {
    //     this.stickX = this.initX;
    //     this.stickY = this.initY;
    //     this.angle = 0;
    //     console.log(this.angle)
    //     console.log('reset')
    // }
}