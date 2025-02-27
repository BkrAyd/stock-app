import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const login = async (userData) => {
  const BASE_URL = "https://10001.fullstack.clarusway.com";
  try {
    const data = await axios.post(`${BASE_URL}/auth/login`, userData);
    toastSuccessNotify("Giriş Başarılı!");
    console.log(data);
  } catch (error) {
    toastErrorNotify("Giriş Başarısız!");
  }
};
