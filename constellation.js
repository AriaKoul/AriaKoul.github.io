const canvas = document.getElementById('constellation-bg');
const ctx = canvas.getContext('2d');

let width, height, stars;
const numStars = 100;

function init() {
    resizeCanvas();
    createStars();
    animate();
}

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function createStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.05
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#0a0a2a';
    ctx.fillRect(0, 0, width, height);
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        
        star.alpha += star.speed;
        if (star.alpha > 1) {
            star.alpha = 0;
        }
    });
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

init();