import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";

const Products = () => {
  const { category } = useParams();
  const { data } = useFetch(`http://localhost:4000/product/${category}`);
  console.log(data);

  return <div></div>;
};

export default Products;