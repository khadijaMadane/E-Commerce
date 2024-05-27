export const base_url ="http://localhost:3000/api/";
const getTokenFromLocalStorage = () => {
    const customer = localStorage.getItem("customer");
    return customer ? JSON.parse(customer).token : null;
  };
  
  export const config = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      Accept: "application/json",
    },
  };