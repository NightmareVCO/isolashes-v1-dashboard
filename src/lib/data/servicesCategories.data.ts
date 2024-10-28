import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "service-category";

export type ServicesCategoriesProperties = {
  id: string;
  name: string;
  description?: string;
};

export const getServicesCategoriesForSelect = async () => {
  let initialServices: ServicesCategoriesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar una categoría--",
    },
  ];

  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  const response = await fetchGetRequest({ url });
  initialServices = [...initialServices, ...response];
  return initialServices;
};

export const getServicesCategories = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}?order=updatedAt&orderDirection=desc`;
  return await fetchGetRequest({ url });
};
