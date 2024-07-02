class Spaceship {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.radius = 50;
        this.x = Math.floor(Math.random() * this.game.width * 0.2) || Math.floor(Math.random() * this.game.width) + this.game.width * 0.8;
        this.y = Math.floor(Math.random() * this.game.height + 1);
        this.available = true;

    }
    start() {
        this.available = false;
    }
    reset() {

    }
    update() {
        
    }
    draw() {
        // this.game.ctx.beginPath();
        // this.game.ctx.fillStyle = 'blue';
        // // this.game.ctx.arc(this.x + Math.cos(this.game.getAngle(this.player.x, this.player.y, this.x, this.y)), this.y, this.radius, 10, Math.PI * 2, true);
        // this.game.ctx.arc(this.x, this.y, this.radius, 10, Math.PI * 2, true);
        // this.game.ctx.fill();

        this.game.ctx.save();
        
        this.game.ctx.translate(this.x, this.y);
        this.game.ctx.rotate(this.game.getAngle(this.player.x, this.player.y, this.x, this.y));
        this.game.ctx.translate(-this.x, -this.y);


        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.arc(this.x, this.y, this.radius, 10, Math.PI * 2, true);
        this.game.ctx.fill();

        this.game.ctx.restore();
    }
}