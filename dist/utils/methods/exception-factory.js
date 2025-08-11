"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionFactory = void 0;
const common_1 = require("@nestjs/common");
const exceptionFactory = (errors) => {
    const errorsException = errors.reduce((acc, error) => {
        acc[error.property] = error.constraints ? Object.values(error.constraints) : ['Invalid value'];
        return acc;
    }, {});
    return new common_1.HttpException(errorsException, 422);
};
exports.exceptionFactory = exceptionFactory;
//# sourceMappingURL=exception-factory.js.map