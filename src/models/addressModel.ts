import { IBaseEntityModel } from "./baseEntityModel";

export interface IAddressModel extends IBaseEntityModel {
  roadName: string;
  province: string;
  district: string;
  ward: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface IGeolocation {
  latitude: number;
  longitude: number;
}

export interface IAddressStoreRequestModel {
  roadName: string | "";
  province: string | "";
  district: string | "";
  ward: string | "";
  postalCode: string | "";
  latitude: number | 0;
  longitude: number | 0;
}
