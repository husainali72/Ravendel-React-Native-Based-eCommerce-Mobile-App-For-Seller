import axios from 'axios';
import { BASE_URL } from './helper';
import SyncStorage from 'sync-storage';

var API = axios.create({
  baseURL: BASE_URL
});

export const setToken = async () => {
  var token = await SyncStorage.get('token')
  if (token) {
    API.defaults.headers.common['Authorization'] = token;
  }
};

setToken();


export default API;

 
export const PostFetchWithFormData = async (url, formData) => {
  var token = await SyncStorage.get('token')

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  try {
    const response = fetch(`${BASE_URL}${url}`, requestOptions).then((res) => {
      return new Promise((resolve) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          res.json().then((json) =>
            resolve({
              status: res.status,
              data: json,
            })
          );
        } else {
          throw "Something went wrong";
        }
      });
    });

    return Promise.resolve(response);
  } catch (error) {
    console.log("er", error);
    return Promise.reject(error);
  }
};