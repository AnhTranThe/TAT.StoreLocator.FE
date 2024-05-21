import { generateRandomImageMock } from "./../utils/Utilities";
import { IStoreModel } from "../models/storeModel";
import { EReviewStatusType } from "../enums";

export const sampleListStores: IStoreModel[] = [
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
    reviews: [
      {
        id: "review-1-store-1",
        content:
          "Menu quán đa đạng từ nước ép đến sinh tố, trái cây dĩa, bánh flan.",
        ratingValue: 4,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-2-store-1",
        content: `Sinh tố 228 có không gian rộng rãi, là một lựa chọn thích hợp cho những buổi đi chơi gia đình hay tụ hợp bạn bè.
        Quán có thêm cái loại bánh - mứt - khô để có thể vừa nhâm nhi vừa trò chuyện`,
        ratingValue: 3,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-3-store-1",
        content: "Thích nhất các món nước ép ở đây, rất tươi mát và thơm ngon",
        ratingValue: 2,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-4-store-1",
        content:
          "Quán rộng rải, thoáng mát, có phòng máy lạnh cho các bạn ngồi học bài yên tỉnh, view mặt tiền đường 3/2 rất nhộn nhịp, decor cũng hài hoà dễ chịu",
        ratingValue: 5,
        status: EReviewStatusType.Approve,
      },
    ],
    galleries: [
      {
        id: "gallery-1-store-1",
        url: generateRandomImageMock(),
        isThumbnail: true,
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
        name: "product-1-store-1",
        rating: 4,
        price: 30000000,
        quantity: 10,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-1-store-1",
            url: generateRandomImageMock(),
            isThumbnail: true,
          },
          {
            id: "gallery-2-product-1-store-1",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
      {
        id: "product-2-store-1",
        name: "product-2-store-1",
        rating: 3,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-2-store-1",
            url: generateRandomImageMock(),
            isThumbnail: true,
          },
          {
            id: "gallery-2-product-2-store-1",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
          {
            id: "gallery-3-product-2-store-1",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
      {
        id: "product-3-store-1",
        name: "product-3-store-1",
        rating: 3,
        isActive: true,
        galleries: [
          {
            id: "gallery-1-product-3-store-1",
            url: generateRandomImageMock(),
            isThumbnail: true,
          },
          {
            id: "gallery-2-product-3-store-1",
            url: generateRandomImageMock(),
            isThumbnail: true,
          },
          {
            id: "gallery-3-product-3-store-1",
            url: generateRandomImageMock(),
            isThumbnail: false,
          },
        ],
      },
    ],
    wishlists: [],
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
    reviews: [
      {
        id: "review-1-store-2",
        content: `Quán chia làm 2 khu vực, tầng dưới để hẹn hò, trò chuyện và tô tượng, tầng trên là phòng yên tĩnh để chạy deadline và học bài
            `,
        ratingValue: 4,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-2-store-2",
        content: `Sinh tố 228 có không gian rộng rãi, là một lựa chọn thích hợp cho những buổi đi chơi gia đình hay tụ hợp bạn bè.
          Quán có thêm cái loại bánh - mứt - khô để có thể vừa nhâm nhi vừa trò chuyện`,
        ratingValue: 3,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-3-store-2",
        content: `Nghe tới quán đã lâu nay mới có dịp ghé, bên ngoài hơi nhỏ nhưng bên trong rất rộng, nhiều cây xanh nên mát lắm. Ấn tượng nhất với mình là cái sân khấu có thiết kế mảng tường được làm từ các vi mạch điện tử quá đẹp
        Menu nhìn chung giá hợp lý, nước ngon, bánh tạm ổn, mấy bạn nhân viên dễ thương và nhiệt tình lắm. Duy nhất một điều là hơi muỗi nha quán ơi hix còn lại đều okila`,
        ratingValue: 2,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-4-store-2",
        content: `Quán có mảng cây xanh mát
          Decor hoài cổ khá đẹp mắt
          Có tô tượng và các loại bánh ăn vặt
          Nước uống ngon`,
        ratingValue: 5,
        status: EReviewStatusType.Approve,
      },
    ],
    galleries: [
      {
        id: "gallery-1-store-2",
        url: generateRandomImageMock(),
        isThumbnail: true,
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
    wishlists: [],
  },
  {
    id: "store-3",
    name: "Siêu thị điện thoại Thế Giới Di Động",
    email: "sieuthithegioididong@gmail.com",
    phoneNumber: "1900232460",
    reviews: [
      {
        id: "review-1-store-3",
        content: `Quán nằm trong con hẻm nhỏ trên đường Ngô Quyền Q10, cách quán trang trí rất mộc mạc, cảm giác không gian rất thân thuộc, gợi nhớ những kỷ niệm ngày xưa.
              `,
        ratingValue: 4,
        status: EReviewStatusType.Approve,
      },
      {
        id: "review-2-store-3",
        content: `Nước quán làm cá nhân mình thấy ổn thôi, ko quá đặc sắc, với menu quán cũng ko đa dạng lắm, giá dễ chịu, tầm 35-50k thôi ah. Được cái quán rất yên tĩnh thoải mái, có phòng máy lạnh trên lầu nên có thể tới làm việc hoặc họp nhóm cũng ok`,
        ratingValue: 5,
        status: EReviewStatusType.Approve,
      },
    ],
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
    wishlists: [],
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
    reviews: [],
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
    wishlists: [],
  },
];
