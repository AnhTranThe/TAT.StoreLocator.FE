import axios from "axios";

// const oApiUrl = "https://open.oapi.vn/location";
const oApiUrl =
  "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data";
const token = import.meta.env.VITE_GHN_TOKEN;
const apiService = axios.create({
  baseURL: oApiUrl,
  timeout: 10000, // Adjust timeout as needed
  headers: {
    "Content-Type": "application/json",
    Token: token,
  },
});

export const getListProvincesService = async () => {
  try {
    const res = await apiService.get("/province");
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
// export const getListDistrictsService = async (provinceId: number) => {
//   try {
//     const res = await apiService.get("/districts", {
//       params: { provinceId, page: 0, size: 100 },
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// };
export const getListDistrictsService = async (provinceId: number) => {
  try {
    const res = await apiService.get("/district", {
      params: { province_id: provinceId },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getListWardsService = async (districtId: number) => {
  try {
    const res = await apiService.get("/ward", {
      params: { district_id: districtId },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
