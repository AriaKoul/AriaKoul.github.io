const canvas = document.getElementById('constellation-bg');
const ctx = canvas.getContext('2d');

let width, height, stars, meteors, personalConstellation;
const numStars = 200;
const numMeteors = 5;

// Personal touch: Add your initials or a meaningful symbol
const personalConstellationPoints = [
    {x: 0.2, y: 0.3}, {x: 0.3, y: 0.2},  // A
    {x: 0.4, y: 0.3}, {x: 0.5, y: 0.2},  // K
    {x: 0.5, y: 0.4}, {x: 0.4, y: 0.4}   // K
];

function init() {
    resizeCanvas();
    createStars();
    createMeteors();
    createPersonalConstellation();
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
            radius: Math.random() * 2 + 0.5,
            alpha: Math.random(),
            speed: Math.random() * 0.05
        });
    }
}

function createMeteors() {
    meteors = [];
    for (let i = 0; i < numMeteors; i++) {
        meteors.push({
            x: Math.random() * width,
            y: 0,
            length: Math.random() * 80 + 20,
            speed: Math.random() * 10 + 5,
            opacity: 0
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#0f1f3d");
    gradient.addColorStop(1, "#1a2a4a");
    ctx.fillStyle = gradient;
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

function drawConstellations() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 0.5;
    
    constellations.forEach(constellation => {
        ctx.beginPath();
        constellation.forEach((point, index) => {
            const x = point.x * width;
            const y = point.y * height;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
    });
}

function drawMeteors() {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    meteors.forEach(meteor => {
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + meteor.length, meteor.y + meteor.length);
        ctx.globalAlpha = meteor.opacity;
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        meteor.x += meteor.speed;
        meteor.y += meteor.speed;
        
        if (meteor.opacity < 0.8) {
            meteor.opacity += 0.02;
        }
        
        if (meteor.y > height) {
            meteor.x = Math.random() * width;
            meteor.y = 0;
            meteor.opacity = 0;
        }
    });
}
function createPersonalConstellation() {
    personalConstellation = personalConstellationPoints.map(point => ({
        x: point.x * width,
        y: point.y * height,
        radius: 2,
        alpha: 0,
        speed: 0.005 + Math.random() * 0.005
    }));
}

function drawPersonalConstellation() {
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.6)';  // Golden color
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    personalConstellation.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
        
        // Draw larger, pulsating stars for constellation points
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius + Math.sin(Date.now() * 0.01) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${point.alpha})`;
        ctx.fill();
        
        point.alpha += point.speed;
        if (point.alpha > 1 || point.alpha < 0) point.speed = -point.speed;
    });
    ctx.stroke();
}

function animate() {
    drawStars();
    drawMeteors();
    drawPersonalConstellation();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
    createMeteors();
});

init();