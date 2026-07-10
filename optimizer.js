const PALLETS = {
    euro: {
        length: 1200,
        width: 800,
        height: 144
    }
};

function optimize(boxLength, boxWidth) {

    const pallet = PALLETS.euro;
    const variants = [];

    getPatterns().forEach(pattern => {

        let l = boxLength;
        let w = boxWidth;

        switch(pattern.id){

            case "rotated":
                l = boxWidth;
                w = boxLength;
                break;

            case "brick":
                l = boxLength;
                w = boxWidth;
                break;

            case "mixed":
                l = boxLength;
                w = boxWidth;
                break;

        }

        variants.push(createPattern(pattern, pallet, l, w));

    });

    variants.sort((a,b)=>b.cartons-a.cartons);

    return variants;

}

function createPattern(pattern,pallet,l,w){

    const cols=Math.floor(pallet.length/l);
    const rows=Math.floor(pallet.width/w);

    const boxes=[];

    for(let y=0;y<rows;y++){

        for(let x=0;x<cols;x++){

            boxes.push({

                x:x*l,
                y:y*w,
                length:l,
                width:w,
                rotation:0

            });

        }

    }

    return{

        id:pattern.id,
        type:pattern.name,
        cartons:boxes.length,
        cols,
        rows,
        boxLength:l,
        boxWidth:w,
        boxes

    };

}
