"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDimensions = void 0;
function productDimensions(array) {
    const values = {
        size: [],
        thickness: [],
        finish: [],
        prodNameID: 0
    };
    array.forEach((producto) => {
        const { Size, Thickness, Finish, ProdNameID } = producto;
        if (Size !== null && !values.size.includes(Size)) {
            values.size.push(Size);
        }
        if (Thickness !== null && !values.thickness.includes(Thickness)) {
            values.thickness.push(Thickness);
        }
        if (Finish !== null && !values.finish.includes(Finish)) {
            values.finish.push(Finish);
        }
        values.prodNameID = ProdNameID;
    });
    return values;
}
exports.productDimensions = productDimensions;
