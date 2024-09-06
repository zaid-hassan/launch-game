export default class Player {
    constructor(game, rotationControl, movementControl) {
        this.game = game;
        this.rotationControl = rotationControl;
        this.movementControl = movementControl;
        this.height;
        this.width;
        this.radius = 40;
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.speedX = 5;
        this.speedY = 5;
    }
    shoot() {
        const bomb = this.game.getBomb();
        if (bomb) {
            const angle = (this.rotationControl.angle) ? this.rotationControl.angle : this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y);
            // console.log(angle)
            const speed = Math.floor(Math.random() * 2) + 1; // You can adjust the speed as needed
            const vx = speed * Math.cos(angle);
            const vy = speed * Math.sin(angle);

            bomb.start(this.x, this.y, vx, vy);
            // console.log(bomb);
            // console.log('shoot');
        }
    }
    update() {
        // Handle player rotation and shooting
        const stickX = this.rotationControl.stickX;
        const stickY = this.rotationControl.stickY;
        const centerX = this.rotationControl.x;
        const centerY = this.rotationControl.y;
        const rotationThreshold = this.rotationControl.radius / 4;
        const shootThreshold = this.rotationControl.radius / 1.5;

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
        // Handle player shooting
        if (this.game.mouse.isClicked) {
            this.shoot()
        }

        // Handle player movmentin joystick
        if (this.movementControl.stickX > this.movementControl.x + this.movementControl.radius / 1.5) this.x += this.speedX;
        if (this.movementControl.stickX < this.movementControl.x - this.movementControl.radius / 1.5) this.x -= this.speedX;
        if (this.movementControl.stickY > this.movementControl.y + this.movementControl.radius / 1.5) this.y += this.speedY;
        if (this.movementControl.stickY < this.movementControl.y - this.movementControl.radius / 1.5) this.y -= this.speedY;

        if (Math.abs(stickX - centerX) > rotationThreshold || Math.abs(stickY - centerY) > rotationThreshold) {
            // Rotate player
            this.rotationControl.angle = Math.atan2(stickY - centerY, stickX - centerX);
        }

        if (Math.abs(stickX - centerX) > shootThreshold || Math.abs(stickY - centerY) > shootThreshold) {
            // Shoot
            this.shoot();
        }
    }
    draw() {
        this.game.ctx.save();

        this.game.ctx.translate(this.x, this.y);
        const mouseAngle = this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y);
        this.game.ctx.rotate(this.rotationControl.angle || mouseAngle);
        // console.log(this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y))
        this.game.ctx.translate(-this.x, -this.y);


        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 10, Math.PI * 2, true);
        this.game.ctx.fill();

        this.game.ctx.restore();
    }
}