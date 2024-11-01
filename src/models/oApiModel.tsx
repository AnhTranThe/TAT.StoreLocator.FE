/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOApiProvinceModel {
    code: number
    message: string
    data: IOApiProvinceData[]
}
export interface IOApiProvinceData {
    ProvinceID: number
    ProvinceName: string
    CountryID: number
    Code: string
    NameExtension: string[]
}
export interface IOApiDistrictModel {

    data: IOApiDistrictData[]
    code: number
    message: string
}
export interface IOApiDistrictData {
    DistrictID: number
    ProvinceID: number
    DistrictName: string
    Code: string
    Type: number
    SupportType: number
    NameExtension: string[]
}

export interface IOApiWardModel {
    data: IOApiWardData[]
    code: number
    message: string
}
export interface IOApiWardData {
    WardCode: string
    DistrictID: number
    WardName: string
    NameExtension: string[]
}
