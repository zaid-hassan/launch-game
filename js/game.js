import Player from "./player.js";
import Bullet from "./bullet.js";
import Bomb from "./bomb.js";
import Spaceship from "./space-ship.js";
import MovementControl from "./controls/movement-control.js";
import RotationControl from "./controls/rotation-control.js";

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.width = canvas.width;
        this.height = canvas.height;

        this.rotationControl = new RotationControl(this);
        this.movementControl = new MovementControl(this);
        this.player = new Player(this, this.rotationControl, this.movementControl);
        // this.spaceShip = new Spaceship(this, this.bullet);

        this.spaceShipPool = [];
        this.numberOfspaceShips = 2;
        this.createSpaceShipPool();
        // console.log(this.spaceShipPool)

        this.bulletPool = [];
        this.numberOfBullets = 5;
        this.createBulletPool();
        
        this.bombPool = [];
        this.numberOfBomb = 500;
        this.createBombPool();

        this.mouse = {
            x: undefined,
            y: undefined,
            isClicked: false,
        }
        // this.touch = {
        //     x: undefined,
        //     y: undefined,
        // }
        this.touches = {};

        this.angle = 0;
        this.keys = [];

        this.start();

        // Debounced resize function
        window.addEventListener('resize', this.debounce((e) => {
            this.resize(e.target.innerWidth, e.target.innerHeight);
        }, 100));
        

        window.addEventListener('mousemove', e => {
            e.preventDefault();
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            // this.rotationControl.update(undefined, undefined, this.mouse.x, this.mouse.y)
        })
        window.addEventListener('mousedown', e => {
            e.preventDefault();
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.isClicked = true;
        })
        window.addEventListener('mouseup', (e) => {
            e.preventDefault();
            this.mouse.isClicked = false;
        })

        window.addEventListener('touchstart', e => this.handleTouchStart(e), { passive: false });
        window.addEventListener('touchmove', e => this.handleTouchMove(e), { passive: false });
        window.addEventListener('touchend', e => this.handleTouchEnd(e), { passive: false });

        window.addEventListener('keydown', e => {
            if (this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            // console.log(this.keys)
        })
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
            // console.log(this.keys)
        })

        document.querySelector('#fullScreenButton').addEventListener('click', () => {
            this.toggleFullScreen();
        })
    }


    debounce(func, delay) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    start() {
        this.resize(window.innerWidth, window.innerHeight);
    }
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        console.log('resize');
    }
    checkCollision(circle1, circle2) {
        const dx = circle2.x - circle1.x;
        const dy = circle2.y - circle1.y;
        const distance = Math.hypot(dx, dy);
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
    isInside(obj1X, obj1Y, obj2X, obj2Y, Obj2Radius) {
        const dx = obj1X - obj2X;
        const dy = obj1Y - obj2Y;
        return Math.hypot(dx, dy) < Obj2Radius;
    }
    createBulletPool() {
        for (let i = 0; i < this.numberOfBullets; i++) {
            this.bulletPool.push(new Bullet(this));
        }
    }
    createSpaceShipPool() {
        for (let i = 0; i < this.numberOfspaceShips; i++) {
            this.spaceShipPool.push(new Spaceship(this, this.player));
        }
    }
    createBombPool() {
        for (let i = 0; i < this.numberOfBomb; i++) {
            this.bombPool.push(new Bomb(this))
        }
    }
    // getbullet() {
    //     if (!this.bulletPool) {
    //         return null;
    //     } else {
    //         const foundbullet = this.bulletPool.find(bullet => bullet.available);
    //         return foundbullet ? foundbullet : undefined;

    //     }
    // }
    getbullet() {
        if (!this.bulletPool) {
            return null;
        } else {
            // Find the first available bullet
            const foundbullet = this.bulletPool.find(bullet => bullet.available);
            return foundbullet ? foundbullet : null;  // Return null if no bullets are available
        }
    }
    getSpaceShip() {
        if (!this.spaceShipPool) {
            return null;
        } else {
            const foundSpaceShip = this.spaceShipPool.find(spaceShip => spaceShip.available);
            return foundSpaceShip ? foundSpaceShip : undefined;

        }
    }
    getBomb() {
        if (!this.bombPool) {
            return null;
        } else {
            const foundBomb = this.bombPool.find(bomb => bomb.available);
            return foundBomb ? foundBomb : undefined;
        }
    }
    // handlebullet(deltaTime) {
    //     if (this.bulletTimer < this.bulletInterval) {
    //         this.bulletTimer += deltaTime;
    //     } else {
    //         this.bulletTimer = 0;
    //         const bullet = this.getbullet();
    //         if (bullet) {
    //             bullet.start();
    //         }
    //     }
    // }
    handleSpaceShip() {
        const spaceShip = this.getSpaceShip();
        if (spaceShip) spaceShip.start();
    }

    handleTouchStart(e) {
        [...e.changedTouches].forEach(touch => {
            if (this.isInside(touch.clientX, touch.clientY, this.rotationControl.x, this.rotationControl.y, this.rotationControl.radius)) {
                this.rotationControl.touchId = touch.identifier;
            } else if (this.isInside(touch.clientX, touch.clientY, this.movementControl.x, this.movementControl.y, this.movementControl.radius)) {
                this.movementControl.touchId = touch.identifier;
            }
        });
    }

    handleTouchMove(e) {
        e.preventDefault();
        [...e.changedTouches].forEach(touch => {
            if (touch.identifier === this.rotationControl.touchId) {
                this.rotationControl.update(touch.clientX, touch.clientY);
            } else if (touch.identifier === this.movementControl.touchId) {
                this.movementControl.update(touch.clientX, touch.clientY);
            }
        });
    }

    handleTouchEnd(e) {
        [...e.changedTouches].forEach(touch => {
            if (touch.identifier === this.rotationControl.touchId) {
                this.rotationControl.reset();
            } else if (touch.identifier === this.movementControl.touchId) {
                this.movementControl.reset();
            }
        });
    }
    drawStatusText() {
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black';
        this.ctx.fillText('Score', this.canvas.width / 2, 35);
        this.ctx.restore();
    }
    a
    render(deltaTime) {
        // this.handlebullet(deltaTime);
        this.handleSpaceShip()
        this.spaceShipPool.forEach(spaceShip => {
            spaceShip.update(deltaTime);
            spaceShip.draw();
            spaceShip.shoot(deltaTime)
        })
        this.bulletPool.forEach(bullet => {
            bullet.update(deltaTime);
            bullet.draw();
        });
        this.bombPool.forEach(bomb => {
            bomb.update(deltaTime);
            bomb.draw();
        })
        this.player.update(deltaTime);
        this.player.draw();
        // this.spaceShip.draw();
        this.drawStatusText()
        // this.trigger.draw()
        if (this.width < 1350 && this.width > 400) {
            this.rotationControl.draw();
            this.movementControl.draw();
        }
    }
}
