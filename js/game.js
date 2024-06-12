class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
        this.bomb1 = new Bomb(this);
        this.bombPool = [];
        this.numberOfBombs = 50;
        console.log(this.bombPool)
        this.createBombPool();
        this.bombTimer = 0;
        this.bombInterval = 1000;


        this.start();

        window.addEventListener('resize', e => {
            this.resize(e.target.innerWidth, e.target.innerHeight)
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
    createBombPool() {
        for(let i = 0; i < this.numberOfBombs; i++) {
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
                console.log(bomb)
            }
        }
    }
    render(deltaTime) {
        this.handleBomb(deltaTime);
        this.bombPool.forEach(bomb => {
            bomb.update();
            bomb.draw();
        })
    }
}

window.addEventListener('load', () =>  {
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