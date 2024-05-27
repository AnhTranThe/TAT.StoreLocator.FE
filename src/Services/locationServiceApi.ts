import axios from "axios";

const locationIqAccesToken = import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN;
if (!locationIqAccesToken) {
  throw new Error(
    "VITE_LOCATIONIQ_ACCESS_TOKEN is not defined in the environment variables."
  );
}
const locationIqUrl = "https://us1.locationiq.com/v1/";
const apiService = axios.create({
  baseURL: locationIqUrl,
  timeout: 5000, // Adjust timeout as needed
});
export const getReverseGeocodingService = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  try {
    const res = await apiService.get("/reverse", {
      params: {
        key: locationIqAccesToken,
        lat: latitude,
        lon: longitude,
        format: "json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
