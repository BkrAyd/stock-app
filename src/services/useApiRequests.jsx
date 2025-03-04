import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

//? This custom hook is used to make API requests.
const useApiRequests = () => {
  const navigate = useNavigate();

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
  const register = async (userData) => {};

  return { login, register };
};

export default useApiRequests;
