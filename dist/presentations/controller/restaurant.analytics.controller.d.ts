import { RestaurantAnalyticsService } from '../service/restaurant-analytics.service';
import { AddEntryDto } from '../dto/restaurant-analytics';
export declare class RestaurantAnalyticsController {
    private readonly restaurantAnalyticsService;
    constructor(restaurantAnalyticsService: RestaurantAnalyticsService);
    addEntry(addEntryDto: AddEntryDto): Promise<string>;
}
