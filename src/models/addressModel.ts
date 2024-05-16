import { IBaseEntityModel } from "./baseEntityModel";

export interface IAddressResponseModel extends IBaseEntityModel {
  roadName: string;
  province: string;
  district: string;
  ward: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}
