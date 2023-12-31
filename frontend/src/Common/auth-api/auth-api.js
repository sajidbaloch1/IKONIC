import axios from "axios";
import env from "react-dotenv";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${env.JWT_SECRET}`,
};
export const loginUser = async (credential) => {
  try {
    const response = await axios.post(
      `${env.BACKEND_API_URL}/auth/login`,
      credential,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${env.BACKEND_API_URL}/auth/register`,
      userData,
      {
        headers,
      }
    );
    if (response) {
      return response.data;
    } else {
      return console.log(response.error);
    }
  } catch (error) {
    return error.response.data;
  }
};
