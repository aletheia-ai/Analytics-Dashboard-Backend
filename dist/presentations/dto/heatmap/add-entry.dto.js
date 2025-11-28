"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapItemDto = exports.ZoneTracksDto = exports.ZoneTracksEntryDto = exports.TrackRecordDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class TrackRecordDto {
    track_id;
    dwell_time;
}
exports.TrackRecordDto = TrackRecordDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TrackRecordDto.prototype, "track_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], TrackRecordDto.prototype, "dwell_time", void 0);
class ZoneTracksEntryDto {
    records;
}
exports.ZoneTracksEntryDto = ZoneTracksEntryDto;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TrackRecordDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ZoneTracksEntryDto.prototype, "records", void 0);
class ZoneTracksDto {
    zone_tracks;
}
exports.ZoneTracksDto = ZoneTracksDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ZoneTracksEntryDto),
    __metadata("design:type", Object)
], ZoneTracksDto.prototype, "zone_tracks", void 0);
class HeatmapItemDto {
    store = '68fb2ed3235867652032728c';
    camera_id;
    timestamp;
    grid_count;
    zone_count;
    zone_tracks;
}
exports.HeatmapItemDto = HeatmapItemDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], HeatmapItemDto.prototype, "store", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], HeatmapItemDto.prototype, "camera_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], HeatmapItemDto.prototype, "timestamp", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], HeatmapItemDto.prototype, "grid_count", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], HeatmapItemDto.prototype, "zone_count", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], HeatmapItemDto.prototype, "zone_tracks", void 0);
//# sourceMappingURL=add-entry.dto.js.map