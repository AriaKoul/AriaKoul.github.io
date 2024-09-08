const canvas = document.getElementById('constellation-bg');
const ctx = canvas.getContext('2d');

let width, height, stars, akConstellation, bookConstellation;
const numStars = 500;

const akConstellationPoints = [
    {x: 0.05, y: 0.3}, {x: 0.15, y: 0.1},  // A left
    {x: 0.25, y: 0.3},                     // A right
    {x: 0.1, y: 0.2}, {x: 0.2, y: 0.2},    // A crossbar
    {x: 0.35, y: 0.1}, {x: 0.35, y: 0.3},  // K vertical
    {x: 0.35, y: 0.2}, {x: 0.45, y: 0.1},  // K upper diagonal
    {x: 0.35, y: 0.2}, {x: 0.45, y: 0.3}   // K lower diagonal
];

const bookConstellationPoints = [
    {x: 0.6, y: 0.2},   // Top left
    {x: 0.9, y: 0.2},   // Top right
    {x: 0.9, y: 0.8},   // Bottom right
    {x: 0.6, y: 0.8},   // Bottom left
    {x: 0.6, y: 0.2},   // Back to top left to close the shape
    {x: 0.65, y: 0.2},  // Spine top
    {x: 0.65, y: 0.8},  // Spine bottom
    {x: 0.7, y: 0.3},   // Page line 1
    {x: 0.85, y: 0.3},
    {x: 0.7, y: 0.4},   // Page line 2
    {x: 0.85, y: 0.4},
    {x: 0.7, y: 0.5},   // Page line 3
    {x: 0.85, y: 0.5},
    {x: 0.7, y: 0.6},   // Page line 4
    {x: 0.85, y: 0.6},
    {x: 0.7, y: 0.7},   // Page line 5
    {x: 0.85, y: 0.7}
];

function init() {
    resizeCanvas();
    createStars();
    createAKConstellation();
    createBookConstellation();
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
        radius: 2.5,
        alpha: 0.7,
        speed: 0.01 + Math.random() * 0.01
    }));
}

function createAKConstellation() {
    akConstellation = createConstellation(akConstellationPoints);
}

function createBookConstellation() {
    bookConstellation = createConstellation(bookConstellationPoints);
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#050a1c");  // Even darker blue
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
        ctx.arc(point.x, point.y, point.radius + Math.sin(Date.now() * 0.005) * 1, 0, Math.PI * 2);
        ctx.fillStyle = `${color.slice(0, -2)}${point.alpha})`;
        ctx.fill();
        
        point.alpha += point.speed;
        if (point.alpha > 1 || point.alpha < 0.7) point.speed = -point.speed;
    });
    ctx.stroke();
}

function animate() {
    drawStars();
    drawConstellation(akConstellation, 'rgba(255, 215, 0, 0.9)');  // Even brighter golden color for AK
    drawConstellation(bookConstellation, 'rgba(135, 206, 250, 0.9)');  // Even brighter light blue for book
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
    createAKConstellation();
    createBookConstellation();
});

init();