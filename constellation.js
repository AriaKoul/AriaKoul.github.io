const canvas = document.getElementById('constellation-bg');
const ctx = canvas.getContext('2d');

let width, height, stars, sagittariusConstellation, bigDipperConstellation;
const numStars = 500;

const sagittariusPoints = [
    {x: 0.10, y: 0.3}, {x: 0.12, y: 0.35}, {x: 0.15, y: 0.32}, // Top of teapot
    {x: 0.18, y: 0.38}, {x: 0.22, y: 0.36}, {x: 0.25, y: 0.40}, // Handle and spout
    {x: 0.20, y: 0.45}, {x: 0.15, y: 0.48}, {x: 0.10, y: 0.45}, // Bottom of teapot
    {x: 0.05, y: 0.60}, {x: 0.15, y: 0.70}, // Bow and arrow
];

const bigDipperPoints = [
    {x: 0.70, y: 0.20}, {x: 0.75, y: 0.25}, // Top of bowl
    {x: 0.80, y: 0.30}, {x: 0.85, y: 0.35}, // Bottom of bowl
    {x: 0.90, y: 0.30}, {x: 0.93, y: 0.20}, // Handle
    {x: 0.95, y: 0.15} // End of handle
];

function init() {
    resizeCanvas();
    createStars();
    createSagittariusConstellation();
    createBigDipperConstellation();
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
            radius: Math.random() * 1 + 0.1,
            alpha: Math.random(),
            speed: Math.random() * 0.03
        });
    }
}

function createConstellation(points) {
    return points.map(point => ({
        x: point.x * width,
        y: point.y * height,
        radius: 3,
        alpha: 0.7,
        speed: 0.01 + Math.random() * 0.01
    }));
}

function createSagittariusConstellation() {
    sagittariusConstellation = createConstellation(sagittariusPoints);
}

function createBigDipperConstellation() {
    bigDipperConstellation = createConstellation(bigDipperPoints);
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#050a1c");  // Dark blue
    gradient.addColorStop(1, "#1a2a4a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
            star.speed = -star.speed;
        }
    });
}

function drawConstellation(constellation, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    
    ctx.beginPath();
    constellation.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
        
        // Draw larger, pulsating stars for constellation points
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + Math.sin(Date.now() * 0.003) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `${color.slice(0, -2)}${0.7 + Math.sin(Date.now() * 0.003) * 0.3})`;
        ctx.fill();
    });
    ctx.stroke();
}

function animate() {
    drawStars();
    drawConstellation(sagittariusConstellation, 'rgba(255, 220, 100, 0.9)');  // Golden yellow for Sagittarius
    drawConstellation(bigDipperConstellation, 'rgba(100, 220, 255, 0.9)');  // Light blue for Big Dipper
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
    createSagittariusConstellation();
    createBigDipperConstellation();
});

init();