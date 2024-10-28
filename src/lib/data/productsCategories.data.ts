import { fetchGetRequest } from "@/utils/fetchRequest";

export const ENDPOINT = "product-category";

export const getProductsCategories = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}?order=updatedAt&orderDirection=desc`;
  return await fetchGetRequest({ url });
};
