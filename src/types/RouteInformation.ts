export interface RouteInformation {
    id: number;
    route_id: string;
    agency_id: number;
    route_short_name: string;
    route_long_name: string;
    route_type: number;
    route_color: string;
    competent_authority: string;
    route_desc?: string;
}
