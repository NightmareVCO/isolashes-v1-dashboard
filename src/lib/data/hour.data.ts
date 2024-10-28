import { fetchGetRequest } from "@/utils/fetchRequest";

export const ENDPOINT = "hours";

export type HoursProperties = {
  id: string;
  time: string;
};

export const getHourByName = async (name: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/name/${name}`;
  return await fetchGetRequest({ url });
};

export const getHours = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  return await fetchGetRequest({ url });
};
