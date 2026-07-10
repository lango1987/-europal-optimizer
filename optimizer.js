function optimize(boxLength, boxWidth) {

    const pallet = getSelectedPallet();
    const variants = [];

    getPatterns().forEach(pattern => {

        let length = boxLength;
        let width = boxWidth;

        if (pattern.id === "rotated") {
            length = boxWidth;
            width = boxLength;
        }

        variants.push(
            createPattern(pattern, pallet, length, width)
        );

    });

    variants.sort((a, b) => b.cartons - a.cartons);

    return variants;
}

function createPattern(pattern, pallet, boxLength, boxWidth) {

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

    const cartons = boxes.length;
    const palletArea = pallet.length * pallet.width;
    const usedArea = cartons * boxLength * boxWidth;

    return {

        id: pattern.id,
        type: pattern.name,

        pallet,

        cartons,
        cols,
        rows,

        boxLength,
        boxWidth,

        utilization: Number(
            (usedArea / palletArea * 100).toFixed(1)
        ),

        boxes

    };

}
