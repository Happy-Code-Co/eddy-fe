import { useDispatch, useSelector } from "react-redux";
import axiosRequest, { ENDPOINTS } from "../axiosInterceptor";

import { setAccountInfo } from "../redux/slices/AuthSlice";
import { setStoreInfo } from "../redux/slices/StoreSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const accountInfo = useSelector((state) => state.auth.accountInfo);

  // Checks if the user is authenticated by verifying accountInfo or pinging /auth/me
  const isAuthenticated = async () => {
    // If accountInfo is present in Redux, consider authenticated
    if (accountInfo && Object.keys(accountInfo).length > 0) return true;
    // Otherwise, ping the backend to check session
    try {
      const response = await axiosRequest.get("/auth/me", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setAccountInfo(data));
        dispatch(setStoreInfo(data));
        return true;
      }
    } catch (e) {
      // Not authenticated
    }
    return false;
  };

  const register = async (userData) => {
    try {
      // Call API to register user, expect backend to set HttpOnly cookie
      const response = await axiosRequest.post(ENDPOINTS.SIGNUP, userData, {
        withCredentials: true,
      });
      if (response.status === 201) {
        const { data } = response.data;
        dispatch(setAccountInfo(data));
        dispatch(setStoreInfo(data.store));
        return { success: true };
      } else {
        return { success: false, error: "Invalid response from server" };
      }
    } catch (error) {
      const errorMessage = `Registration failed: ${error}`;
      console.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const login = async (credentials) => {
    try {
      // Call API to authenticate user, expect backend to set HttpOnly cookie
      const response = await axiosRequest.post(ENDPOINTS.SIGNIN, credentials, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const { data } = response.data;
        console.log(data);

        dispatch(setAccountInfo(data));
        dispatch(setStoreInfo(data));
        return { success: true };
      } else {
        return { success: false, error: "Invalid response from server" };
      }
    } catch (error) {
      const errorMessage = `Authentication failed: ${error}`;
      console.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await axiosRequest.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      // Optionally handle error
    }
    /* dispatch(setAccountInfo({}));
    dispatch(setStoreInfo({})); */
  };

  return {
    accountInfo,
    isAuthenticated,
    login,
    logout,
    register,
  };
};

export default useAuth;
