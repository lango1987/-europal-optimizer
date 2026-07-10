const PALLETS = {
    euro: { length: 1200, width: 800, height: 144 }
};

function optimize(boxLength, boxWidth) {

    const pallet = PALLETS.euro;

    const variants = [];

    variants.push(createPattern("Standard", pallet, boxLength, boxWidth));
    variants.push(createPattern("Gedreht", pallet, boxWidth, boxLength));

    variants.sort((a, b) => b.cartons - a.cartons);

    return variants;
}

function createPattern(name, pallet, l, w) {

    const cols = Math.floor(pallet.length / l);
    const rows = Math.floor(pallet.width / w);

    return {
        name,
        cols,
        rows,
        cartons: cols * rows,
        boxLength: l,
        boxWidth: w
    };
}
