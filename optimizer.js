const PALLETS = {
    euro: {
        length: 1200,
        width: 800,
        height: 144
    }
};

function optimize(boxLength, boxWidth) {

    const pallet = PALLETS.euro;

    const patterns = [];

    patterns.push(createPattern("standard", pallet, boxLength, boxWidth));
    patterns.push(createPattern("rotated", pallet, boxWidth, boxLength));

    patterns.sort((a, b) => b.cartons - a.cartons);

    return patterns;
}

function createPattern(type, pallet, boxLength, boxWidth) {

    const cols = Math.floor(pallet.length / boxLength);
    const rows = Math.floor(pallet.width / boxWidth);

    const boxes = [];

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            boxes.push({
                x: col * boxLength,
                y: row * boxWidth,
                length: boxLength,
                width: boxWidth,
                rotation: 0
            });

        }

    }

    return {

        type,

        cols,

        rows,

        cartons: boxes.length,

        boxes

    };

}
