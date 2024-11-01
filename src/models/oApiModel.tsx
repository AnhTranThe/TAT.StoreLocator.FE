/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOApiProvinceModel {
    total: number
    data: IOApiProvinceData[]
    code: string
    message: any
}
export interface IOApiProvinceData {
    id: string
    name: string
    type: number
    typeText: string
    slug: string
}
export interface IOApiDistrictModel {
    total: number
    data: IOApiDistrictData[]
    code: string
    message: any
}
export interface IOApiDistrictData {
    id: string
    name: string
    provinceId: string
    type: number
    typeText: string
}

export interface IOApiWardModel {
    total: number
    data: IOApiWardData[]
    code: string
    message: any
}
export interface IOApiWardData {
    id: string
    name: string
    districtId: string
    type: number
    typeText: string
}
