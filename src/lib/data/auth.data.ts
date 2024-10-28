import { auth } from "@lib/auth/auth";
import { fetchGetRequest } from "@utils/fetchRequest";

const ENDPOINT = "auth";

export const getUser = async (id: string, noStore: boolean = false) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/user/${id}`;
  return await fetchGetRequest({ url, noStore });
};

export const getSessionUser = async () => {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;

  return session.user;
};
