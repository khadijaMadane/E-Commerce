import axios from "axios";
// import { Base_url } from "../../utils/baseUrl";


const Base_url = " http://localhost:3000/api/";

const getUsers = async () => {
  const response = await axios.get(`${Base_url}user/all-users`);
  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;