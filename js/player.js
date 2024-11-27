export default class Player {
    constructor(game, rotationControl, movementControl) {
        this.game = game;
        this.rotationControl = rotationControl;
        this.movementControl = movementControl;
        this.height;
        this.width;
        this.radius = 16;
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.speedX = 200;
        this.speedY = 200;
        this.bulletTimer = 0
        this.bulletInterval = 100;
        this.image = new Image();
        this.image.src = 'js/aim.png';
        // this.image.onload = () => {
        //     // Image is loaded, you can start drawing now
        //     this.imageLoaded = true;
        // };
        // this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
            console.log('Image loaded successfully');
        };
    
        this.image.onerror = () => {
            console.error('Failed to load image');
        };
    
        this.imageLoaded = false;
    }
    shoot(deltaTime) {

        if (this.bulletTimer < this.bulletInterval) {
            this.bulletTimer += deltaTime;
        } else {
            this.bulletTimer = 0;
            const bullet = this.game.getbullet();
            if (bullet) {
                const angle = (this.rotationControl.angle) ? this.rotationControl.angle : this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y);
                // console.log(angle)
                const speed = 2; // You can adjust the speed as needed
                const vx = speed * Math.cos(angle);
                const vy = speed * Math.sin(angle);
    
                bullet.start(this.x, this.y, vx, vy);
                console.log(bullet);
                console.log('shoot');
            }
        }
    }
    update(deltaTime) {
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
        if (this.game.keys.includes('ArrowUp')) this.y -= this.speedY * deltaTime / 1000;
        if (this.game.keys.includes('ArrowDown')) this.y += this.speedY * deltaTime / 1000;
        if (this.game.keys.includes('ArrowLeft')) this.x -= this.speedX * deltaTime / 1000;
        if (this.game.keys.includes('ArrowRight')) this.x += this.speedX * deltaTime / 1000;

        // Handle player shooting on computer
        if (this.game.mouse.isClicked) {
            this.shoot(deltaTime)
        }

        // Handle player movmentin joystick
        if (this.movementControl.stickX > this.movementControl.x + this.movementControl.radius / 1.5) this.x += this.speedX * deltaTime / 1000;
        if (this.movementControl.stickX < this.movementControl.x - this.movementControl.radius / 1.5) this.x -= this.speedX * deltaTime / 1000;
        if (this.movementControl.stickY > this.movementControl.y + this.movementControl.radius / 1.5) this.y += this.speedY * deltaTime / 1000;
        if (this.movementControl.stickY < this.movementControl.y - this.movementControl.radius / 1.5) this.y -= this.speedY * deltaTime / 1000;

        if (Math.abs(stickX - centerX) > rotationThreshold || Math.abs(stickY - centerY) > rotationThreshold) {
            // Rotate player
            this.rotationControl.angle = Math.atan2(stickY - centerY, stickX - centerX);
        }

        // Handle player shooting on mobile
        if (Math.abs(stickX - centerX) > shootThreshold || Math.abs(stickY - centerY) > shootThreshold) {
            // Shoot
            this.shoot(deltaTime);
        }
    }
    // draw() {
    //     this.game.ctx.save();

    //     this.game.ctx.translate(this.x, this.y);
    //     const mouseAngle = this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y);
    //     this.game.ctx.rotate(this.rotationControl.angle || mouseAngle);
    //     // console.log(this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y))
    //     this.game.ctx.translate(-this.x, -this.y);


    //     this.game.ctx.beginPath();
    //     // this.game.ctx.fillStyle = "green";
    //     this.game.ctx.arc(this.x, this.y, this.radius, 10, Math.PI * 2, true);
    //     // this.game.ctx.fill();
    //      this.game.ctx.clip()
    //     //  this.game.ctx.drawImage(this.image, 10, 10)

    
    //     if (this.imageLoaded) {
    //         this.game.ctx.drawImage(
    //             this.image,
    //             -this.radius, // Center the image
    //             -this.radius, // Center the image
    //             this.radius * 2, // Width
    //             this.radius * 2  // Height
    //         );
    //     } else {
    //         this.game.ctx.fillStyle = 'red'; // Placeholder color
    //         this.game.ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
    //         console.log('Image not loaded yet');
    //     }

    //     this.game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    //     this.game.ctx.restore();
    // }
    draw() {
        this.game.ctx.save();
    
        // Translate to the player's position
        this.game.ctx.translate(this.x, this.y);
    
        // Rotate the canvas based on the player's angle
        const mouseAngle = this.game.getAngle(this.game.mouse.x, this.game.mouse.y, this.x, this.y);
        this.game.ctx.rotate(this.rotationControl.angle || mouseAngle);
    
        // Begin path for clipping (optional)
        this.game.ctx.beginPath();
        this.game.ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true); // Center the circle at (0, 0) because we already translated
        this.game.ctx.clip();
    
        // If the image is loaded, draw it
        if (this.imageLoaded) {
            this.game.ctx.drawImage(
                this.image,
                -this.radius, // Center the image horizontally
                -this.radius, // Center the image vertically
                this.radius * 2, // The width of the image
                this.radius * 2  // The height of the image
            );
        } else {
            // If the image isn't loaded, draw a placeholder (a red box)
            this.game.ctx.fillStyle = 'red'; // Placeholder color
            this.game.ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
            console.log('Image not loaded yet');
        }
    
        this.game.ctx.restore();
    }
    
}