$(document).ready(function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let painting = false;
    let currentColor = '#000000';
    let lastX = 0;
    let lastY = 0;

    // Set up canvas for drawing
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mouseout', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
        painting = true;
    });

    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchcancel', endPosition);
    canvas.addEventListener('touchmove', function(e) {
        if (!painting) return;
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const currentX = touch.clientX - rect.left;
        const currentY = touch.clientY - rect.top;
        drawLine(lastX, lastY, currentX, currentY);
        lastX = currentX;
        lastY = currentY;
    });

    function startPosition(e) {
        painting = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        drawLine(lastX, lastY, e.offsetX, e.offsetY);
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function drawLine(x1, y1, x2, y2) {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    // Handle color selection
    $('.color-btn').click(function() {
        currentColor = $(this).data('color');
        $('.color-btn').removeClass('active');
        $(this).addClass('active');
    });

    // Initialize first color as active
    $('.color-btn').first().addClass('active');

});