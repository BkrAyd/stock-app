import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";

//? This custom hook is used to make API requests.
const useApiRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const login = async (userData) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      );
      toastSuccessNotify("Giriş Başarılı!");
      navigate("stock");
      console.log(data);
    } catch (error) {
      toastErrorNotify("Giriş Başarısız!");
    }
  };

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axios(`${process.env.REACT_APP_BASE_URL}/auth/logout/`, {
        headers: { Authorization: `Token ${token}` },
      });
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { login, register, logout };
};

export default useApiRequests;
