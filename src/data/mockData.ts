import { generateRandomImageMock } from "./../utils/Utilities";
import { IStoreResponseModel } from "../models/storeModel";

export const sampleListStores: IStoreResponseModel[] = [
  {
    id: "store-1",
    name: "Sinh tố 72D ",
    email: "sinhto72@gmail.com",
    phoneNumber: "0907441487",
    address: {
      id: "address-store-1",
      roadName: "72D Binh Thoi Street",
      province: "Ho Chi Minh City",
      district: "11",
      ward: "10",
      postalCode: "",
      latitude: 10.7624071,
      longitude: 106.633547,
    },
    galleries: [
      {
        id: "gallery-1-store-1",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-2-store-1",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-3-store-1",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-4-store-1",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
    ],
    products: [
      {
        id: "product-1-store-1",
        name: "",
        rating: 4,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-1-store-1",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
          {
            id: "gallery-2-product-1-store-1",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
    ],
    wislists: [],
  },
  {
    id: "store-2",
    name: "Cafe Sân Vườn Miền Thảo Mộc",
    email: "cafesanvuon@gmail.com",
    phoneNumber: "02839631068",
    address: {
      id: "address-store-2",
      roadName: "554E Minh Phụng street",
      province: "Ho Chi Minh City",
      district: "11",
      ward: "9",
      postalCode: "",
      latitude: 10.7624068,
      longitude: 106.633547,
    },
    galleries: [
      {
        id: "gallery-1-store-2",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-2-store-2",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-3-store-2",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-4-store-2",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
    ],
    products: [
      {
        id: "product-1-store-2",
        name: "",
        rating: 4,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-1-store-2",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
          {
            id: "gallery-1-product-1-store-2",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
    ],
    wislists: [],
  },
  {
    id: "store-3",
    name: "Siêu thị điện thoại Thế Giới Di Động",
    email: "sieuthithegioididong@gmail.com",
    phoneNumber: "1900232460",
    address: {
      id: "address-store-3",
      roadName: "281K Lãnh Binh Thăng Street",
      province: "Ho Chi Minh City",
      district: "11",
      ward: "8",
      postalCode: "",
      latitude: 10.7657521,
      longitude: 106.6368435,
    },
    galleries: [
      {
        id: "gallery-1-store-3",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-2-store-3",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-3-store-3",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-4-store-3",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
    ],
    products: [
      {
        id: "product-1-store-3",
        name: "",
        rating: 4,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-1-store-3",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
          {
            id: "gallery-2-product-1-store-3",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
    ],
    wislists: [],
  },
  {
    id: "store-4",
    name: "FPT Shop",
    email: "fptshop@gmail.com",
    phoneNumber: "18006601",
    address: {
      id: "address-store-4",
      roadName: "1215 3 Thang 2 Street",
      province: "Ho Chi Minh City",
      district: "11",
      ward: "6",
      postalCode: "",
      latitude: 10.3958815,
      longitude: 105.8785253,
    },
    galleries: [
      {
        id: "gallery-1-store-4",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-2-store-4",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-3-store-4",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
      {
        id: "gallery-4-store-4",
        url: generateRandomImageMock(),
        isThumbnail: false,
      },
    ],
    products: [
      {
        id: "product-1-store-4",
        name: "",
        rating: 4,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-1-store-4",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
          {
            id: "gallery-2-product-1-store-4",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
    ],
    wislists: [],
  },
];
