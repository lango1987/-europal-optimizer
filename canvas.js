function drawPalette(pattern, layer = 1) {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const palletLength = 1200;
    const palletWidth = 800;

    const margin = 20;

    const scale = Math.min(
        (canvas.width - margin * 2) / palletLength,
        (canvas.height - margin * 2) / palletWidth
    );

    // Palette
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.strokeRect(
        margin,
        margin,
        palletLength * scale,
        palletWidth * scale
    );

    ctx.fillStyle = "#4CAF50";
    ctx.strokeStyle = "#2E7D32";

    pattern.boxes.forEach((box) => {

        let x = box.x;
        let y = box.y;

        // Lage 2 wird versetzt dargestellt
        if (layer === 2 && Math.floor(box.y / box.width) % 2 === 0) {
            x += box.length / 2;
        }

        // Nicht über Palettenrand zeichnen
        if (x + box.length <= palletLength) {

            ctx.fillRect(
                margin + x * scale,
                margin + y * scale,
                box.length * scale - 2,
                box.width * scale - 2
            );

            ctx.strokeRect(
                margin + x * scale,
                margin + y * scale,
                box.length * scale - 2,
                box.width * scale - 2
            );
        }

    });

}
