"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumObjects = sumObjects;
function sumObjects(data) {
    const result = data.reduce((acc, obj) => {
        for (const key in obj) {
            if (typeof obj[key] === 'number') {
                acc[key] = (acc[key] || 0) + obj[key];
            }
            else if (acc[key] === undefined) {
                acc[key] = obj[key];
            }
        }
        return acc;
    }, {});
    return result;
}
//# sourceMappingURL=aggregated-stats.js.map