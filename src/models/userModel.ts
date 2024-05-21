import { EGenderType } from "../enums";

export interface IUserModel {
  Id: string;
  FullName: string;
  Email: string;
  IsActive: boolean;
  Gender: EGenderType;
  Dob: string;
  UserName: string;
  WishlistProductsCount: number;
  WishlistStoresCount: number;
  ReviewProductsCount: number;
  AccessToken: string;
  RefreshToken: string;
  Roles: string[] | null;
}
