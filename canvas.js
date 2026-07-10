function drawPalette(result, layer = 1) {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const palletLength = 1200;
    const palletWidth = 800;

    const scale = Math.min(
        (canvas.width - 40) / palletLength,
        (canvas.height - 40) / palletWidth
    );

    const offsetX = 20;
    const offsetY = 20;

    // Palette
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 3;
    ctx.strokeRect(
        offsetX,
        offsetY,
        palletLength * scale,
        palletWidth * scale
    );

    const boxW = result.length * scale;
    const boxH = result.width * scale;

    ctx.fillStyle = "#4CAF50";

    for (let row = 0; row < result.rows; row++) {

        let shift = 0;

        // Lage 2 wird versetzt dargestellt
        if (layer === 2 && row % 2 === 0) {
            shift = boxW / 2;
        }

        for (let col = 0; col < result.cols; col++) {

            ctx.fillRect(
                offsetX + shift + col * boxW,
                offsetY + row * boxH,
                boxW - 2,
                boxH - 2
            );

        }
    }
}
