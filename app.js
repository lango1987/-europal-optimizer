let currentPattern = null;
let currentLayer = 1;
let patterns = [];

document.getElementById("calculate").addEventListener("click", () => {

    const length = Number(document.getElementById("length").value);
    const width = Number(document.getElementById("width").value);
    const height = Number(document.getElementById("height").value);
    const maxHeight = Number(document.getElementById("maxHeight").value);

    if (!length || !width || !height || !maxHeight) {
        alert("Bitte alle Maße eingeben.");
        return;
    }

    patterns = optimize(length, width);

    currentPattern = patterns[0];

    const layers = Math.floor((maxHeight - 144) / height);
    const total = currentPattern.cartons * layers;

    document.getElementById("layer").textContent = currentPattern.cartons;
    document.getElementById("layers").textContent = layers;
    document.getElementById("total").textContent = total;

    // Auslastung direkt aus optimizer.js übernehmen
    document.getElementById("utilization").textContent =
        currentPattern.utilization + " %";

    currentLayer = 1;

    drawPalette(currentPattern, currentLayer);

    showVariants();

});

function showVariants() {

    const list = document.getElementById("variantList");
    list.innerHTML = "";

    patterns.forEach((pattern, index) => {

        const button = document.createElement("button");

        button.className = "variantButton";

        if (index === 0) {
            button.style.background = "#2E7D32";
        }

        button.innerHTML = `
            <strong>${pattern.type}</strong><br>
            📦 ${pattern.cartons} Kartons<br>
            📐 ${pattern.cols} × ${pattern.rows}<br>
            📊 ${pattern.utilization} %
        `;

        button.onclick = () => {

            currentPattern = pattern;

            document.getElementById("layer").textContent = currentPattern.cartons;
            document.getElementById("utilization").textContent =
                currentPattern.utilization + " %";

            drawPalette(currentPattern, currentLayer);

        };

        list.appendChild(button);

    });

}

document.getElementById("layer1").addEventListener("click", () => {

    currentLayer = 1;

    if (currentPattern) {
        drawPalette(currentPattern, currentLayer);
    }

});

document.getElementById("layer2").addEventListener("click", () => {

    currentLayer = 2;

    if (currentPattern) {
        drawPalette(currentPattern, currentLayer);
    }

});
