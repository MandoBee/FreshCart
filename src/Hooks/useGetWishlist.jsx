import axios from "axios";
import { useQuery } from "react-query";

export default function useGetWishlist() {
  async function GetUserWishlist() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  const response = useQuery({
    queryKey: ["userWishlist"],
    queryFn: GetUserWishlist,
  });

  return response;
  ;
   
}
