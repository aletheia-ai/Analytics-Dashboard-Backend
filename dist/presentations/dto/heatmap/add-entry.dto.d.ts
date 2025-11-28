export declare class TrackRecordDto {
    track_id: number;
    dwell_time: number;
}
export declare class ZoneTracksEntryDto {
    records: TrackRecordDto[];
}
export declare class ZoneTracksDto {
    zone_tracks: Record<string, ZoneTracksEntryDto>;
}
export declare class HeatmapItemDto {
    store: string;
    camera_id: string;
    timestamp: number;
    grid_count: number[];
    zone_count: Record<string, number>;
    zone_tracks: Record<string, TrackRecordDto[]>;
}
