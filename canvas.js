function drawPalette(pattern, layer = 1) {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const pallet = pattern.pallet;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const margin = 20;

    const scale = Math.min(
        (canvas.width - margin * 2) / pallet.length,
        (canvas.height - margin * 2) / pallet.width
    );

    // Palette
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.strokeRect(
        margin,
        margin,
        pallet.length * scale,
        pallet.width * scale
    );

    ctx.fillStyle = "#4CAF50";
    ctx.strokeStyle = "#2E7D32";
    ctx.lineWidth = 1;

    pattern.boxes.forEach(box => {

        let x = box.x;
        let y = box.y;

        // Lage 2 versetzt
        if (layer === 2 && Math.floor(box.y / box.width) % 2 === 0) {
            x += box.length / 2;
        }

        // Nur innerhalb der Palette zeichnen
        if (x + box.length <= pallet.length) {

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
