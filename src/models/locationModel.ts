export interface IReverseGeolocationResponseModel {
  place_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    road: string;
    quarter: string;
    suburb: string;
    city: string;
    postcode: string;
    country: string;
    country_code: string;
  };
}
