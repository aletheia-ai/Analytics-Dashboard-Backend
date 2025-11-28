import { Store } from './store-type';
export interface TrackRecordType {
    track_id: number;
    dwell_time: number;
}
export interface HeatmapItemType {
    store: Store | string;
    camera_id: string;
    timestamp: number;
    grid_count: number[];
    zone_count: Record<string, number>;
    zone_tracks: Record<string, TrackRecordType[]>;
}
