import axios from "axios";
import { getUserLoginInfo } from "../store/action/userAction";
import { useAppDispatch } from "../store/store";

const baseUrl = import.meta.env.VITE_BASE_URL;
if (!baseUrl) {
  throw new Error("VITE_BASE_URL is not defined in the environment variables.");
}
// Tạo một instance Axios
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

// Intercept REQUEST trước khi được gửi
axiosInstance.interceptors.request.use(
  (config) => {
    // Check hệ thống có token hay không và cập nhật Authorization header nếu có
    const tokenObject = localStorage.getItem("Token");

    if (tokenObject) {
      const parseToken = JSON.parse(tokenObject);
      config.headers.Authorization = "Bearer " + `${parseToken.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const emptyUserLoginInfo = {
  id: "",
  email: "",
  firstName: "",
  roles: "",
};
// Intercept RESPONSE khi được trả về
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check xem error trả về có phải là 401 Unauthorized không và đã thử làm mới token hay chưa ?
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Thực hiện gửi request để làm mới token
        // const currentToken = localStorage.getItem("refresh_token");
        const tokenObject = localStorage.getItem("Token");

        if (tokenObject) {
          const parseTokenObject = JSON.parse(tokenObject);
          const response = await axios({
            method: "post",
            url: `${baseUrl}/Authentication/RefreshToken`,
            data: {
              accessToken: `${parseTokenObject.token}`,
              refreshToken: `${parseTokenObject.refreshToken}`,
            },
          });
          // Cập nhật token mới và gửi lại request gốc với token mới
          const newAccessToken = response.data.data.newAccessToken;
          const newRefreshToken = response.data.data.newRefreshToken;
          parseTokenObject.token = newAccessToken;
          parseTokenObject.refreshToken = newRefreshToken;
          localStorage.setItem("Token", JSON.stringify(parseTokenObject));
          originalRequest.headers.Authorization =
            "Bearer " + `${newAccessToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        console.log(error);

        // Nếu không thể làm mới token, chuyển hướng đến trang đăng nhập hoặc xử lý lỗi khác
        // Ví dụ: window.location.href = '/login';
        const dispatch = useAppDispatch();
        dispatch(
          getUserLoginInfo(
            emptyUserLoginInfo.id,
            emptyUserLoginInfo.email,
            emptyUserLoginInfo.firstName,
            emptyUserLoginInfo.roles
          )
        );
        window.location.href = "/auth/login";
        localStorage.removeItem("Token");
        return Promise.reject(error);
      }
    }

    // Nếu không phải là lỗi 401 Unauthorized hoặc không thể làm mới token, trả về lỗi
    return Promise.reject(error);
  }
);

export default axiosInstance;
