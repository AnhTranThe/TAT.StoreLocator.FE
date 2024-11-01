import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { IMapGalleryStoreModel } from "../models/galleryModel";
import { IReviewModel } from "../models/reviewModel";

export const formatDateTime = (dateTimeOffet: string) => {
  const currentDate = dayjs(dateTimeOffet); // Get current date with dayjs
  const formattedDate = currentDate.format("DD-MM-YYYY");
  //   console.log(formatDateTime)
  return formattedDate;
};

export const generateRandomImageMock = () => {
  const imageUrls = [
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};
export const generateRandomImageAvt = () => {
  const imagePaths = [
    "/imgs/Avatars/andy-davis-min.webp",
    "/imgs/Avatars/buzz-lightyear-min.webp",
    "/imgs/Avatars/emperor-zurg-min.webp",
    "/imgs/Avatars/jessie-min.webp",
    "/imgs/Avatars/little-green-men-min.webp",
    "/imgs/Avatars/mr-potato-min.webp",
    "/imgs/Avatars/ms-potato-min.webp",
    "/imgs/Avatars/woody-min.webp",
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];

  // const randomNumber = Math.floor(Math.random() * 1000);
  // return `https://picsum.photos/id/${randomNumber}/200/200.jpg`;
};

export const generateRandomImageProject = () => {
  const imagePaths = [
    "/imgs/Projects/1.svg",
    "/imgs/Projects/2.svg",
    "/imgs/Projects/3.svg",
    "/imgs/Projects/4.svg",
    "/imgs/Projects/5.svg",
    "/imgs/Projects/6.svg",
    "/imgs/Projects/7.svg",
    "/imgs/Projects/8.svg",
    "/imgs/Projects/9.svg",
    "/imgs/Projects/10.svg",
    "/imgs/Projects/11.svg",
    "/imgs/Projects/12.svg",
    "/imgs/Projects/13.svg",
    "/imgs/Projects/14.svg",
    "/imgs/Projects/15.svg",
    "/imgs/Projects/16.svg",
    "/imgs/Projects/17.svg",
    "/imgs/Projects/18.svg",
    "/imgs/Projects/19.svg",
    "/imgs/Projects/20.svg",
    "/imgs/Projects/21.svg",
    "/imgs/Projects/22.svg",
    "/imgs/Projects/23.svg",
    "/imgs/Projects/24.svg",
    "/imgs/Projects/25.svg",
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
};

export const decodeJwtToken = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};
export const formatCurrencyPriceVnd = (price: number) => {
  const priceFormat = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return priceFormat;
};

export const convertToFileArray = async (
  galleryStores: IMapGalleryStoreModel[]
): Promise<File[]> => {
  const filePromises = galleryStores.map(async (gallery) => {
    const response = await fetch(gallery.url);
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    return new File([blob], gallery.fileName, {
      type: contentType ? contentType : "image/jpeg",
    });
  });

  return Promise.all(filePromises);
};

export const calculateAverageRating = (reviews: IReviewModel[]): number => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce(
    (sum, review) => sum + review.ratingValue,
    0
  );
  return totalRating / reviews.length;
};

export const vietnameseReplace = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str.toUpperCase();
};

export const vietnameseNotUpperReplace = (str: string) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
};

export const extractLatLonFromGoogleMapsUrl = (url: string) => {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  } else {
    return null;
  }
};
export const replaceProvincePatterns = (province: string) => {
  if (!province || typeof province !== "string") {
    return province;
  }

  // Make the string Vietnamese-friendly
  province = vietnameseNotUpperReplace(province);

  // Define the patterns to match "city", "thanh pho", and "tinh"
  const patterns = ["city", "thanh\\s*pho", "tinh"];

  // Create the regular expression pattern
  const pattern = new RegExp("\\b(?:" + patterns.join("|") + ")\\b", "gi");

  // Replace the matched patterns with an empty string
  return province.replace(pattern, "").trim();
};

export const replaceDistrictPatterns = (district: string) => {
  if (!district || typeof district !== "string") {
    return district;
  }

  // Make the string Vietnamese-friendly
  district = vietnameseNotUpperReplace(district);

  // Define the patterns to match "quan", "q.", "district", "h.", "huyen", and "thanh pho"
  const patterns = [
    "quan",
    "q\\.",
    "district",
    "h\\.",
    "huyen",
    "thanh\\s*pho",
  ];

  // Create the regular expression pattern
  const pattern = new RegExp("\\b(?:" + patterns.join("|") + ")\\b", "gi");

  // Replace the matched patterns with an empty string
  return district.replace(pattern, "").trim();
};

export const replaceWardPatterns = (ward: string) => {
  if (!ward || typeof ward !== "string") {
    return ward;
  }

  // Make the string Vietnamese-friendly
  ward = vietnameseNotUpperReplace(ward);

  // Define the pattern to match "phuong", "p.", or "ward" (case-insensitive)
  const pattern = /\b(?:phuong|p\.|ward)\b/gi;

  // Replace the matched patterns with an empty string
  return ward.replace(pattern, "").trim();
};
// export const updateStoresWithAverageRating = (
//   stores: IStoreModel[]
// ): IStoreModel[] => {
//   return stores.map((store) => ({
//     ...store,
//     averageRating: 0,

//     //store.reviews && calculateAverageRating(store.reviews),
//   }));
// };
