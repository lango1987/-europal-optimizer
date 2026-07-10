const cartons = boxes.length;

const palletArea = pallet.length * pallet.width;

const usedArea = cartons * (boxLength * boxWidth);

const utilization =
    Math.round((usedArea / palletArea) * 1000) / 10;

return {

    id: pattern.id,
    type: pattern.name,

    pallet: pallet,

    cartons: cartons,
    cols: cols,
    rows: rows,

    boxLength: boxLength,
    boxWidth: boxWidth,

    utilization: utilization,

    boxes: boxes

};
