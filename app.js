document.getElementById("calculate").addEventListener("click", calculate);

function calculate() {

    const layout = {

        pallet: document.getElementById("pallet").value,

        length: Number(document.getElementById("length").value),

        width: Number(document.getElementById("width").value),

        height: Number(document.getElementById("height").value),

        weight: Number(document.getElementById("weight").value),

        maxHeight: Number(document.getElementById("maxHeight").value)

    };

    if (
        !layout.length ||
        !layout.width ||
        !layout.height ||
        !layout.maxHeight
    ) {
        alert("Bitte alle Maße eingeben.");
        return;
    }

    const result = optimize(layout)[0];

    const palletHeight =
        layout.pallet === "industry" ? 144 : 144;

    const layers = Math.floor(
        (layout.maxHeight - palletHeight) / layout.height
    );

    const total = result.total * layers;

    document.getElementById("layer").textContent = result.total;
    document.getElementById("layers").textContent = layers;
    document.getElementById("total").textContent = total;
    document.getElementById("utilization").textContent =
        result.utilization.toFixed(1) + " %";
        drawPalette(result, 1);

    // Das Zeichnen bauen wir im nächsten Schritt ein.
}
