// import axios from "axios";
// import { base_url } from "../../utils/base_url";

// const login =async (userData) => {
//     const response =await axios.post(`${base_url}user/admin-login`, userData); 
//     if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }
//       return response.data;
// };
// const authService = {
//     login,
// };
// export default authService;

import axios from "axios";
// import { config } from "../../utils/axiosconfig";
// import { Base_url } from "../../utils/base_url";
const base_url = "http://localhost:3000/api/";


const getTokenFromLocalStorage =localStorage.getItem("user")
 ? JSON.parse(localStorage.getItem("user"))
 : null;


const config = {
   headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage.token} `,
      Accept: "application/json",
    },
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
//   console.log(getTokenFromLocalStorage);
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;