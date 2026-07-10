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

    const palletX = margin;
    const palletY = margin;

    // Palette zeichnen
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.strokeRect(
        palletX,
        palletY,
        palletLength * scale,
        palletWidth * scale
    );

    const boxW = pattern.boxLength * scale;
    const boxH = pattern.boxWidth * scale;

    ctx.fillStyle = "#4CAF50";
    ctx.strokeStyle = "#2E7D32";

    for (let row = 0; row < pattern.rows; row++) {

        let offset = 0;

        // Lage 2 wird versetzt dargestellt
        if (layer === 2 && row % 2 === 0) {
            offset = boxW / 2;
        }

        for (let col = 0; col < pattern.cols; col++) {

            const x = palletX + offset + col * boxW;
            const y = palletY + row * boxH;

            // Nicht über den Palettenrand zeichnen
            if (x + boxW <= palletX + palletLength * scale) {
                ctx.fillRect(x, y, boxW - 2, boxH - 2);
                ctx.strokeRect(x, y, boxW - 2, boxH - 2);
            }
        }
    }
}
