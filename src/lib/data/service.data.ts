import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "services";

export type ServicesProperties = {
  id: string;
  name: string;
  description?: string;
};

export const getServices = async (query?: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}?order=updatedAt&orderDirection=desc&query=${query}`;
  return await fetchGetRequest({ url });
};

export const getServiceByName = async (name: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/name/${name}`;
  return await fetchGetRequest({ url });
};

export const getAllServicesCount = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/count`;
  return await fetchGetRequest({ url });
};

export const getAllServicesForSelect = async () => {
  let initialServices: ServicesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar un servicio--",
    },
  ];

  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  const response = await fetchGetRequest({ url });
  initialServices = [...initialServices, ...response];
  return initialServices;
};

export const getServicesForSelect = async (serviceCategory: string) => {
  let initialServices: ServicesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar un servicio--",
    },
  ];

  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}?where=serviceCategory&whereValue=${serviceCategory}`;
  const response = await fetchGetRequest({ url });
  initialServices = [...initialServices, ...response];
  return initialServices;
};

export const getServicesInCategory = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/in-category`;
  return await fetchGetRequest({ url });
};
