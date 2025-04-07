import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function useGetProduct() {
  const { id } = useParams();

  async function GetProduct() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  
  const response = useQuery({
    queryKey: ["product"],
    queryFn: GetProduct,
  });
  
  return response;
}
