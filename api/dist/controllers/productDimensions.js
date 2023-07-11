"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productDimensions = void 0;
function productDimensions(array) {
    const obj = {};
    array.forEach((producto) => {
        const { Size, Thickness, Finish, ProdNameID } = producto;
        const values = obj[ProdNameID] || { size: [], thickness: [], finish: [], prodNameID: ProdNameID };
        if (Size !== null && !values.size.includes(Size)) {
            values.size.push(Size);
        }
        if (Thickness !== null && !values.thickness.includes(Thickness)) {
            values.thickness.push(Thickness);
        }
        if (Finish !== null && !values.finish.includes(Finish)) {
            values.finish.push(Finish);
        }
        obj[ProdNameID] = values;
    });
    return obj;
}
exports.productDimensions = productDimensions;
