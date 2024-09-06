class Trigger {
    constructor (game, player) {
        this.game = game;
        this.player = player;
        this.radius = 20;
        this.x = this.game.width - this.radius * 8;
        this.y = this.game.height / 4;

        this.touhId = null;
    }
    update () {
        this.player.shoot();
    }
    draw () {
        this.game.ctx.lineWidth = 2;
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = 'red';
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.game.ctx.stroke();
    }
}