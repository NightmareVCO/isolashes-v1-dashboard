import { buildUrl } from "@utils/buidlUrl";
import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "products";

type getProductsParameters = {
  order: string;
  orderDirection: string;
  takeValue?: number;
  skipValue?: number;
  cursor: string;
  status: string;
  where: string;
  whereValue: string;
  query: string;
};

export const getProducts = async (parameters: getProductsParameters) => {
  const endpoint = ENDPOINT;
  const url = buildUrl({ parameters, endpoint });
  return await fetchGetRequest({ url, noStore: true });
};

export const getAllProductsCount = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/count`;
  return await fetchGetRequest({ url });
};

export const getProductsCount = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/count`;
  return await fetchGetRequest({ url });
};

export const getProductById = async (id: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/${id}`;
  return await fetchGetRequest({ url });
};
