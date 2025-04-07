import axios from "axios";
import { useQuery } from "react-query";

export default function useGetCart() {
  async function GetUserCart() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  const response = useQuery({
    queryKey: ["userCart"],
    queryFn: GetUserCart,
  });

  return response;
   
}
