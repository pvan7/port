// Simple Matrix Rain Effect
function createMatrixRain() {
    console.log('Creating matrix rain...');
    
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-10';
    canvas.style.opacity = '0.15';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.body.scrollHeight, 3000);
    
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * 100;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#6366f1';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
    console.log('Matrix rain started!');
}

// Simple initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    createMatrixRain();
});
