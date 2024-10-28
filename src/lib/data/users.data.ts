import { buildUrl } from "@utils/buidlUrl";
import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "auth/users";

type getUsersParameters = {
  order: string;
  orderDirection: string;
  takeValue?: number;
  skipValue?: number;
  cursor: string;
  status: string;
  where: string;
  whereValue: string;
  query: string;
  adminId?: string;
};

export const getUsers = async (parameters: getUsersParameters) => {
  const { adminId } = parameters;
  const endpoint = ENDPOINT;
  const headers = { "user-id": adminId };
  const url = buildUrl({ parameters, endpoint });
  return await fetchGetRequest({ url, headers, noStore: true });
};

export const getAllUsersCount = async (userId: string) => {
  const url = `${process.env.SERVER}/auth/user/count`;
  const headers = { "user-id": userId };
  return await fetchGetRequest({ url, headers });
};

export const getUserById = async (id: string) => {
  const url = `${process.env.SERVER}/${ENDPOINT}/${id}`;
  return await fetchGetRequest({ url });
};
