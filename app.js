alert("app.js geladen");

const PALLET_LENGTH = 1200;
const PALLET_WIDTH = 800;
const PALLET_HEIGHT = 144;

function calculate() {

    const length = Number(document.getElementById("length").value);
    const width = Number(document.getElementById("width").value);
    const height = Number(document.getElementById("height").value);
    const maxHeight = Number(document.getElementById("maxHeight").value);

    if (!length || !width || !height || !maxHeight) {
        alert("Bitte alle Werte eingeben.");
        return;
    }

    const normal =
        Math.floor(PALLET_LENGTH / length) *
        Math.floor(PALLET_WIDTH / width);

    const rotated =
        Math.floor(PALLET_LENGTH / width) *
        Math.floor(PALLET_WIDTH / length);

    let cartonsPerLayer;
    let boxLength;
    let boxWidth;

    if (rotated > normal) {
        cartonsPerLayer = rotated;
        boxLength = width;
        boxWidth = length;
    } else {
        cartonsPerLayer = normal;
        boxLength = length;
        boxWidth = width;
    }

    const layers = Math.floor((maxHeight - PALLET_HEIGHT) / height);

    const total = cartonsPerLayer * layers;

    const totalHeight = layers * height + PALLET_HEIGHT;

    document.getElementById("layer").textContent = cartonsPerLayer;
    document.getElementById("layers").textContent = layers;
    document.getElementById("total").textContent = total;
    document.getElementById("totalHeight").textContent = totalHeight + " mm";

    draw(boxLength, boxWidth);
}

function draw(boxLength, boxWidth) {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const scale = Math.min(
        canvas.width / PALLET_LENGTH,
        canvas.height / PALLET_WIDTH
    );

    const palletW = PALLET_LENGTH * scale;
    const palletH = PALLET_WIDTH * scale;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(20,20,palletW,palletH);

    const cols = Math.floor(PALLET_LENGTH / boxLength);
    const rows = Math.floor(PALLET_WIDTH / boxWidth);

    const bw = boxLength * scale;
    const bh = boxWidth * scale;

    ctx.fillStyle = "#4CAF50";

    for(let y=0;y<rows;y++){

        for(let x=0;x<cols;x++){

            ctx.fillRect(
                20 + x*bw,
                20 + y*bh,
                bw-2,
                bh-2
            );

        }

    }

}