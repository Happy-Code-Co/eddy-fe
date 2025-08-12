import { useDispatch, useSelector } from "react-redux";
import axiosRequest, { ENDPOINTS } from "../axiosInterceptor";
import { setAccountInfo } from "../redux/slices/AuthSlice";
import { setStoreInfo } from "../redux/slices/StoreSlice";

const getErrorMessage = (error) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status === 400) {
      return (
        data.message || "Datos incorrectos. Por favor verifica la información."
      );
    }
    if (status === 401) {
      return "Datos incorrectos. Por favor verifica la información.";
    }
    if (status === 403) {
      return "No tienes permiso para realizar esta acción.";
    }
    if (status === 404) {
      if (data.type === "email") {
        return "Datos incorrectos. Por favor verifica la información.";
      } else {
        return "El recurso solicitado no existe.";
      }
    }
    if (status >= 500) {
      return "Estamos teniendo problemas técnicos. Por favor intenta más tarde.";
    }
    return (
      data.message ||
      "Estamos teniendo problemas técnicos. Por favor intenta más tarde."
    );
  } else if (error.request) {
    // The request was made but no response was received
    return "Error de conexión. Por favor revisa tu internet e intenta nuevamente.";
  } else {
    return "Ocurrió un error inesperado. Por favor intenta más tarde.";
  }
};

const useAuth = () => {
  const dispatch = useDispatch();
  const accountInfo = useSelector((state) => state.auth.accountInfo);

  const isAuthenticated = async () => {
    if (accountInfo && Object.keys(accountInfo).length > 0) return true;

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
      const response = await axiosRequest.post(ENDPOINTS.SIGNUP, userData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        const { data } = response.data;
        dispatch(setAccountInfo(data));
        dispatch(setStoreInfo(data.store));
        return { success: true };
      }
      return { success: false, error: "Invalid response from server" };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
        details: error.response?.data?.details || null,
      };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axiosRequest.post(ENDPOINTS.SIGNIN, credentials, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setAccountInfo(data));
        dispatch(setStoreInfo(data));
        return { success: true };
      }
      return { success: false, error: "Invalid response from server" };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
        details: error.response?.data?.details || null,
      };
    }
  };

  const logout = async () => {
    try {
      await axiosRequest.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
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
