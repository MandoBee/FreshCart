import axios from "axios";
import { useQuery } from "react-query";

export default function useGetAllProducts() {
  async function GetAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const response = useQuery({
    queryKey: ["products"],
    queryFn: GetAllProducts,
  });

  return response;
}
