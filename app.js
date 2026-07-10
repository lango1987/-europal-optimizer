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

    document.getElementById("layer").textContent = currentPattern.cartons;
    document.getElementById("layers").textContent = layers;
    document.getElementById("total").textContent =
        currentPattern.cartons * layers;

    drawPalette(currentPattern, 1);

    showVariants();
});

function showVariants() {

    const list = document.getElementById("variantList");

    list.innerHTML = "";

    patterns.forEach((pattern, index) => {

        const button = document.createElement("button");

        button.className = "variantButton";

        button.innerHTML = `
    <strong>${pattern.type}</strong><br>
    📦 ${pattern.cartons} Kartons<br>
    📐 ${pattern.cols} × ${pattern.rows}
`;

        button.onclick = () => {

            currentPattern = pattern;

            drawPalette(currentPattern, currentLayer);

        };

        list.appendChild(button);

    });

}

document.getElementById("layer1").onclick = () => {

    currentLayer = 1;

    if(currentPattern){

        drawPalette(currentPattern,1);

    }

}

document.getElementById("layer2").onclick = () => {

    currentLayer = 2;

    if(currentPattern){

        drawPalette(currentPattern,2);

    }

}
