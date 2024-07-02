class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.width = canvas.width;
        this.height = canvas.height;

        this.rotationControls = new RotationControls(this);
        this.movementControls = new MovementControls(this);
        this.player = new Player(this, this.rotationControls, this.movementControls);
        this.spaceShip = new Spaceship(this, this.player);

        this.bombPool = [];
        this.numberOfBombs = 50;
        this.createBombPool();
        this.bombTimer = 0;
        this.bombInterval = 1000;

        this.mouse = {
            x: undefined,
            y: undefined,
        }
        this.touch = {
            x: undefined,
            y: undefined,
        }
        this.angle = 0;
        this.keys = [];

        this.start();

        window.addEventListener('resize', e => {
            this.resize(e.target.innerWidth, e.target.innerHeight)
        });
        window.addEventListener('mousemove', e => {
            e.preventDefault();
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        })
        // window.addEventListener('touchstart', e => {
        //     // console.log('start');
        //     // console.log(e)
        //     // e.preventDefault();
        //     // this.touch.x = e.clientX;
        //     // this.touch.y = e.clientY;
        //     // console.log(this.touch.x, this.touch.y);
        // })
        window.addEventListener('touchmove', e => {
            [...e.changedTouches].forEach(touch => {
                this.touch.x = touch.clientX;
                this.touch.y = touch.clientY;
            })
            // console.log(e.changedTouches);
        })
        // window.addEventListener('touchend', e => {
        //     console.log('end');
        //     this.rotationControls.resetStickPos();
        //     // this.rotationControls.draw()
        // })
        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        })
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index,1);
            }
        })
    }

    start() {
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
    checkCollision(circle1, circle2) {
        const dx = circle2.x - circle1.x;
        const dy = circle2.y - circle1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const sumOfRadi = circle1.radius + circle2.radius;
        if (distance <= sumOfRadi) {
            return true;
        }
        else {
            return false;
        }
    }
    getAngle(obj1X, obj1Y, obj2X, obj2Y) {
        const dx = obj1X - obj2X;
        const dy = obj1Y - obj2Y;
        this.angle = Math.atan2(dy, dx);
        // console.log(this.angle)
        return this.angle;
    }
    createBombPool() {
        for (let i = 0; i < this.numberOfBombs; i++) {
            this.bombPool.push(new Bomb(this));
        }
    }
    getBomb() {
        for (let i = 0; i < this.bombPool.length; i++) {
            if (this.bombPool[i].available) {
                return this.bombPool[i];
            }
        }
    }
    handleBomb(deltaTime) {
        if (this.bombTimer < this.bombInterval) {
            this.bombTimer += deltaTime;
        } else {
            this.bombTimer = 0;
            const bomb = this.getBomb();
            if (bomb) {
                bomb.start();
            }
        }
    }
    
    render(deltaTime) {
        this.handleBomb(deltaTime);
        this.bombPool.forEach(bomb => {
            bomb.update();
            bomb.draw();
        });
        this.player.update();
        this.player.draw();
        if (this.width < 1350 && this.width > 400) {
            this.rotationControls.drawRotationStick();
            this.movementControls.drawMovementStick();
        }
        this.spaceShip.draw();
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas, ctx);

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    animate();
})