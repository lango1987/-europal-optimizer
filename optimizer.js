const PALLETS = {
  euro: {
    name: "Europalette",
    length: 1200,
    width: 800,
    height: 144
  },
  industry: {
    name: "Industriepalette",
    length: 1200,
    width: 1000,
    height: 144
  }
};

function optimize(layout) {

    const pallet = PALLETS[layout.pallet];

    const variants = [];

    variants.push(createPattern(
        "Standard",
        pallet,
        layout.length,
        layout.width
    ));

    variants.push(createPattern(
        "Gedreht",
        pallet,
        layout.width,
        layout.length
    ));

    variants.sort((a,b)=>b.total-a.total);

    return variants;

}

function createPattern(name,pallet,l,w){

    const cols=Math.floor(pallet.length/l);
    const rows=Math.floor(pallet.width/w);

    const cartons=cols*rows;

    const palletArea=pallet.length*pallet.width;

    const usedArea=cartons*l*w;

    const utilization=(usedArea/palletArea)*100;

    return{

        name:name,

        cols:cols,

        rows:rows,

        total:cartons,

        utilization:utilization,

        length:l,

        width:w

    };

}
