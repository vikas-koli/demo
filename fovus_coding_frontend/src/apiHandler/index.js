import axios from "axios";

export const serverUrl = "http://18.217.23.113/api";

export const getApihandler = async (endPoint) => {
    try {
      const getres = await axios.get(serverUrl + endPoint);
      return getres.data;
    } catch (error) {
      return { message: error.message, status: 400 };
    }
  };
export const postApihandler = async (endPoint, value) => {

    try {
      const postRes = await axios.post(serverUrl + endPoint, value);
       console.log("apipost=>",  postRes);
      return postRes.data;
    } catch (error) {
       console.log("error is - ", error.response);
      return { error };
    }
  };