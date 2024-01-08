export interface TripTimeInformation {
    id: number;
    trip_id: number;
    arrival_time: string;
    departure_time: string;
    stop_id: number;
    stop_sequence: number;
    pickup_type: number;
    drop_off_type: number;
    route_id: string;
    service_id: number;
    trip_headsign: string;
    trip_long_name: string;
    direction_code: string;
    shape_id: number;
    wheelchair_accessible: number;
}
