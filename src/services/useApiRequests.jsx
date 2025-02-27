import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

import React from "react";

const useApiRequests = () => {
  const navigate = useNavigate();

  const login = async (userData) => {
    
    const BASE_URL = "https://10001.fullstack.clarusway.com";
    try {
      const data = await axios.post(`${BASE_URL}/auth/login`, userData);
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
