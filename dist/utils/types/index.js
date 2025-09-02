"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSpaceType = exports.ServiceType = exports.BusinessType = exports.UserRoleType = exports.SignInExceptions = void 0;
const business_type_1 = require("./business-type");
Object.defineProperty(exports, "BusinessType", { enumerable: true, get: function () { return business_type_1.BusinessType; } });
const service_type_1 = require("./service-type");
Object.defineProperty(exports, "ServiceType", { enumerable: true, get: function () { return service_type_1.ServiceType; } });
const space_type_1 = require("./space-type");
Object.defineProperty(exports, "UserSpaceType", { enumerable: true, get: function () { return space_type_1.UserSpaceType; } });
var SignInExceptions;
(function (SignInExceptions) {
    SignInExceptions["NO_USER"] = "No User Registered With this Email";
    SignInExceptions["INVALID_PASSWORD"] = "Password Is Incorrect";
})(SignInExceptions || (exports.SignInExceptions = SignInExceptions = {}));
var UserRoleType;
(function (UserRoleType) {
    UserRoleType["ADMIN"] = "Admin";
    UserRoleType["USER"] = "User";
})(UserRoleType || (exports.UserRoleType = UserRoleType = {}));
//# sourceMappingURL=index.js.map