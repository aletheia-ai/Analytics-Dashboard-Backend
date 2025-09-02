"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCountingService = void 0;
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const person_stats_type_1 = require("../../utils/types/person-stats-type");
dotenv.config();
let PersonCountingService = class PersonCountingService {
    personStats = {
        maleCount: 2,
        femaleCount: 4,
        exit: 0,
        age: [8, 33, 10, 67, 45, 51],
        occupancy: 6,
        footFall: 6,
        queueStats: {
            [person_stats_type_1.QueueLocations.ALL_LOCATIONS]: { counter: 50, driveThrough: 20, seating: 19 },
            [person_stats_type_1.QueueLocations.CITY_CENTERS]: { counter: 20, driveThrough: 30, seating: 80 },
        },
    };
    async getStats() {
        try {
            return { success: true, data: this.personStats };
        }
        catch (err) {
            if (err instanceof Error) {
                return { success: false, err: err.message };
            }
            return { success: false, err: 'Something Went Wrong' };
        }
    }
};
exports.PersonCountingService = PersonCountingService;
exports.PersonCountingService = PersonCountingService = __decorate([
    (0, common_1.Injectable)()
], PersonCountingService);
//# sourceMappingURL=person-counting.service.js.map