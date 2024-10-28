import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "branches";

export type BranchesProperties = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
};

export const getBranchByName = async (name: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/name/${name}`;
  return await fetchGetRequest({ url });
};

export const getAllBranchesCount = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/count`;
  return await fetchGetRequest({ url });
};

export const getBranchesForSelect = async () => {
  let initialBranches: BranchesProperties[] = [
    {
      id: "0",
      name: "--Seleccionar una sucursal--",
    },
  ];
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  const response = await fetchGetRequest({ url });
  initialBranches = [...initialBranches, ...response];
  return initialBranches;
};

export const getBranches = async () => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}`;
  return await fetchGetRequest({ url });
};
