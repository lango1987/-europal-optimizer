const PALLET_LENGTH = 1200;

const PALLET_WIDTH = 800;

const PALLET_HEIGHT = 144;

const length = Number(document.getElementById("length").value);

const width = Number(document.getElementById("width").value);

const height = Number(document.getElementById("height").value);

const maxHeight = Number(document.getElementById("maxHeight").value);

if (!length || !width || !height) {

    alert("Bitte alle Kartonmaße eingeben.");

    return;

}

// Variante 1

const normal =

    Math.floor(PALLET_LENGTH / length) *

    Math.floor(PALLET_WIDTH / width);

// Variante 2 (gedreht)

const rotated =

    Math.floor(PALLET_LENGTH / width) *

    Math.floor(PALLET_WIDTH / length);

let cartonsPerLayer;

let boxL;

let boxW;

if (rotated > normal) {

    cartonsPerLayer = rotated;

    boxL = width;

    boxW = length;

} else {

    cartonsPerLayer = normal;

    boxL = length;

    boxW = width;

}

const layers = Math.floor((maxHeight - PALLET_HEIGHT) / height);

const total = cartonsPerLayer * layers;

const totalHeight = layers * height + PALLET_HEIGHT;

document.getElementById("layer").textContent = cartonsPerLayer;

document.getElementById("layers").textContent = layers;

document.getElementById("total").textContent = total;

document.getElementById("totalHeight").textContent = totalHeight + " mm";

draw(boxL, boxW);