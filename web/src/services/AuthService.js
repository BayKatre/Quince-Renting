import axios from "axios";
import { BASE_URL } from "../components/base/Constants";

export async function signIn(loginData) {
  let requestOptions = {
    method: "GET",
    url: `${BASE_URL}/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`,
    headers: {
      Authorization: "Basic cXVpbmNlOjEyMzQ=",
    },
  };
  return await axios(requestOptions)
    .then((response) => response.data)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
}

export async function register(registerData) {
  let requestOptions = {
    method: "POST",
    url: `${BASE_URL}/register`,
    headers: {
      Authorization: "Basic cXVpbmNlOjEyMzQ=",
    },
    data: registerData,
  };
  return await axios(requestOptions)
    .then((response) => response.data)
    .then((result) => {
      return result;
    })
    .catch((error) => console.log("error", error));
}
