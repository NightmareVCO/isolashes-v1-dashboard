import { buildUrl } from "@utils/buidlUrl";
import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "orders";

type getProductsParameters = {
  id: string;
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

export const getOrders = async (parameters: getProductsParameters) => {
  const endpoint = ENDPOINT;
  const { id } = parameters;
  const url = buildUrl({ parameters, endpoint });
  const headers = { "user-id": id };
  return await fetchGetRequest({ url, headers, noStore: true });
};

export const getAllOrdersCount = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/count`;
  return await fetchGetRequest({ url });
};
