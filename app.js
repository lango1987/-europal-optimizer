let patterns = [];
let currentPattern = null;
let currentLayer = 1;

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("calculate").addEventListener("click", calculate);

    document.getElementById("layer1").addEventListener("click", () => {
        currentLayer = 1;
        if (currentPattern) drawPalette(currentPattern, currentLayer);
    });

    document.getElementById("layer2").addEventListener("click", () => {
        currentLayer = 2;
        if (currentPattern) drawPalette(currentPattern, currentLayer);
    });

});

function calculate() {

    const length = Number(document.getElementById("length").value);
    const width = Number(document.getElementById("width").value);
    const height = Number(document.getElementById("height").value);
    const maxHeight = Number(document.getElementById("maxHeight").value);

    if (!length || !width || !height || !maxHeight) {
        alert("Bitte alle Werte eingeben.");
        return;
    }

    patterns = optimize(length, width);

    if (patterns.length === 0) {
        alert("Keine Lösung gefunden.");
        return;
    }

    currentPattern = patterns[0];
    currentLayer = 1;

    const pallet = currentPattern.pallet;
    const layers = Math.floor((maxHeight - pallet.height) / height);
    const total = currentPattern.cartons * layers;

    document.getElementById("layer").textContent = currentPattern.cartons;
    document.getElementById("layers").textContent = layers;
    document.getElementById("total").textContent = total;
    document.getElementById("utilization").textContent =
        currentPattern.utilization + " %";

    drawPalette(currentPattern, currentLayer);

    showVariants();
}

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
            📊 ${pattern.utilization} % Auslastung
        `;

        button.onclick = () => {

            currentPattern = pattern;

            document.getElementById("layer").textContent = pattern.cartons;
            document.getElementById("utilization").textContent =
                pattern.utilization + " %";

            drawPalette(pattern, currentLayer);

        };

        list.appendChild(button);

    });

}
