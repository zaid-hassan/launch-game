export default class Spaceship {
    constructor(game, player) {
        this.game = game;
        this.player = player
        this.radius = 50;
        // this.x = Math.floor(Math.random() * this.game.width * 0.2) || Math.floor(Math.random() * this.game.width) + this.game.width * 0.8;
        this.x = Math.floor(Math.random() * this.game.width + 1);
        this.y = Math.floor(Math.random() * this.game.height + 1);
        this.available = true;
        
    }
    start() {
        this.available = false;
        this.x = Math.floor(Math.random() * this.game.width + 1);
        this.y = Math.floor(Math.random() * this.game.height + 1);
        
    }
    reset() {
        this.available = true;
        console.log('reset')
    }
    update() {
        if (!this.available) {
            this.game.bombPool.forEach(bomb => {
                if (!bomb.available && this.game.checkCollision(this, bomb)) {
                    bomb.reset()
                    this.reset()
                }
            })
        }
    }
    draw() {
        // this.game.ctx.beginPath();
        // this.game.ctx.fillStyle = 'blue';
        // // this.game.ctx.arc(this.x + Math.cos(this.game.getAngle(this.bomb.x, this.bomb.y, this.x, this.y)), this.y, this.radius, 10, Math.PI * 2, true);
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
        // console.log('draw ss')
    }
}