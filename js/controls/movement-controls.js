class MovementControls {
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
    }
    drawMovementStick() {
        this.game.ctx.lineWidth = 2;
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.stroke();

        let touchX = this.game.touch.x !== undefined ? this.game.touch.x : this.initX;
        let touchY = this.game.touch.y !== undefined ? this.game.touch.y : this.initY;
        let dx = touchX - this.x;
        let dy = touchY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.radius) {
            let angle = Math.atan2(dy, dx);
            this.stickX = this.x + Math.cos(angle) * this.radius;
            this.stickY = this.y + Math.sin(angle) * this.radius;
        } else {
            this.stickX = touchX;
            this.stickY = touchY;
        }

        // Draw the inner arc
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.stickX, this.stickY, this.radius / 2, 0, Math.PI * 2, true);
        this.game.ctx.stroke();
        // console.log(this.x, this.stickX)
        // console.log(' ')
        // console.log(this.y, this.stickY)
    }
    // resetStickPos() {
    //     this.stickX = this.initX;
    //     this.stickY = this.initY;
    //     this.angle = 0;
    //     console.log(this.angle)
    //     console.log('reset')
    // }
}