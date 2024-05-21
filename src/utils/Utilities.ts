import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

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
    "/public/imgs/Avatars/andy-davis-min.webp",
    "/public/imgs/Avatars/buzz-lightyear-min.webp",
    "/public/imgs/Avatars/emperor-zurg-min.webp",
    "/public/imgs/Avatars/jessie-min.webp",
    "/public/imgs/Avatars/little-green-men-min.webp",
    "/public/imgs/Avatars/mr-potato-min.webp",
    "/public/imgs/Avatars/ms-potato-min.webp",
    "/public/imgs/Avatars/woody-min.webp",
  ];
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];

  // const randomNumber = Math.floor(Math.random() * 1000);
  // return `https://picsum.photos/id/${randomNumber}/200/200.jpg`;
};

export const generateRandomImageProject = () => {
  const imagePaths = [
    "/public/imgs/Projects/1.svg",
    "/public/imgs/Projects/2.svg",
    "/public/imgs/Projects/3.svg",
    "/public/imgs/Projects/4.svg",
    "/public/imgs/Projects/5.svg",
    "/public/imgs/Projects/6.svg",
    "/public/imgs/Projects/7.svg",
    "/public/imgs/Projects/8.svg",
    "/public/imgs/Projects/9.svg",
    "/public/imgs/Projects/10.svg",
    "/public/imgs/Projects/11.svg",
    "/public/imgs/Projects/12.svg",
    "/public/imgs/Projects/13.svg",
    "/public/imgs/Projects/14.svg",
    "/public/imgs/Projects/15.svg",
    "/public/imgs/Projects/16.svg",
    "/public/imgs/Projects/17.svg",
    "/public/imgs/Projects/18.svg",
    "/public/imgs/Projects/19.svg",
    "/public/imgs/Projects/20.svg",
    "/public/imgs/Projects/21.svg",
    "/public/imgs/Projects/22.svg",
    "/public/imgs/Projects/23.svg",
    "/public/imgs/Projects/24.svg",
    "/public/imgs/Projects/25.svg",
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
