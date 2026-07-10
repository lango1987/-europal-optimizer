document.addEventListener("DOMContentLoaded", () => {

    let currentPattern = null;
    let currentLayer = 1;

    document.getElementById("calculate").addEventListener("click", () => {

        const length = Number(document.getElementById("length").value);
        const width = Number(document.getElementById("width").value);
        const height = Number(document.getElementById("height").value);
        const maxHeight = Number(document.getElementById("maxHeight").value);

        if (!length || !width || !height || !maxHeight) {
            alert("Bitte alle Werte eingeben.");
            return;
        }

        const patterns = optimize(length, width);
        currentPattern = patterns[0];

        const palletHeight = 144;
        const layers = Math.floor((maxHeight - palletHeight) / height);
        const total = currentPattern.cartons * layers;

        document.getElementById("layer").textContent = currentPattern.cartons;
        document.getElementById("layers").textContent = layers;
        document.getElementById("total").textContent = total;

        const palletArea = 1200 * 800;
        const usedArea = currentPattern.cartons * length * width;
        const utilization = ((usedArea / palletArea) * 100).toFixed(1);

        document.getElementById("utilization").textContent = utilization + " %";

        currentLayer = 1;
        drawPalette(currentPattern, currentLayer);

    });

    document.getElementById("layer1").addEventListener("click", () => {
        if (currentPattern) {
            currentLayer = 1;
            drawPalette(currentPattern, currentLayer);
        }
    });

    document.getElementById("layer2").addEventListener("click", () => {
        if (currentPattern) {
            currentLayer = 2;
            drawPalette(currentPattern, currentLayer);
        }
    });

});
