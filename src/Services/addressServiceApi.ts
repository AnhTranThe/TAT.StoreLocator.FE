import axios from "axios";

const oApiUrl = "https://open.oapi.vn/location";
const apiService = axios.create({
  baseURL: oApiUrl,
  timeout: 10000, // Adjust timeout as needed
});

export const getListProvincesService = async () => {
  try {
    const res = await apiService.get("/provinces", {
      params: { page: 0, size: 100 },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getListDistrictsService = async (provinceId: number) => {
  try {
    const res = await apiService.get("/districts", {
      params: { provinceId, page: 0, size: 100 },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
export const getListWardsService = async (districtId: number) => {
  try {
    const res = await apiService.get("/wards", {
      params: { districtId, page: 0, size: 100 },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
