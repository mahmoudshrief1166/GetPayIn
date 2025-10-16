import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { APP_END_POINTS, BASE_URL } from "../../utils/constants/constants";
import {
  deleteProduct,
  getCategories,
  getCategoryProducts,
  getProducts,
  setCategories,
  setCategoryProducts,
  setProducts,
} from "../../utils/storage/mmKv";

interface Category{
  name:string,
  slug:string,
  url:string
}


export const useAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}${APP_END_POINTS.PRODUCT}`);
        setProducts(response.data.products);
        return response.data.products;
      } catch {
        const cached = getProducts();
        if (cached) return cached;
        throw new Error("No internet and no cached data");
      }
    },
  });
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await axios.get<Category[]>(`${BASE_URL}${APP_END_POINTS.CATEGORY}`);
        setCategories(response.data);
        return response.data;
      } catch {
        const cached = getCategories();
        if (cached) return cached;
        throw new Error("No internet and no cached data");
      }
    },
  });
};


export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      try {
        const response = await axios.get(`${BASE_URL}${APP_END_POINTS.PRODUCT_CATEGORY(category)}`);
        setCategoryProducts(category, response.data.products);
        return response.data.products;
      } catch {
        const cached = getCategoryProducts(category);
        if (cached) return cached;
        throw new Error("No internet and no cached data");
      }
    },
    enabled: !!category, 
  });
};


export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await new Promise<void>((res) => setTimeout(res, 300));
      deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['products']});
    },
  });
};
