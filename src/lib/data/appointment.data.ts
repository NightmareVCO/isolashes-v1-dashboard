import { buildUrl } from "@utils/buidlUrl";
import { fetchGetRequest } from "@utils/fetchRequest";

export const ENDPOINT = "appointments";

type getAppointmentsParameters = {
  id: string;
  order: string;
  orderDirection: string;
  takeValue: number;
  skipValue: number;
  cursor: string;
  status: string;
  branch?: any;
  service?: any;
  hour?: any;
  date: any;
  query?: any;
  noStore?: boolean;
};

export const getAppointments = async (
  parameters: getAppointmentsParameters,
) => {
  const endpoint = ENDPOINT;
  const noStore = parameters.noStore ?? false;
  const url = buildUrl({ parameters, endpoint, noStore });
  const headers = { "user-id": `${parameters.id}` };

  return fetchGetRequest({ url, headers });
};

export const getAppointmentsById = async ({
  appointmentId,
  userId,
  noStore,
}: {
  appointmentId: string;
  userId: string;
  noStore?: boolean;
}) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/${appointmentId}`;
  const headers = { "user-id": userId, noStore };

  return fetchGetRequest({ url, headers, noStore: noStore ?? false });
};

export const getAllAppointmentsCount = async (userId: string) => {
  const endpoint = ENDPOINT;
  const url = `${process.env.SERVER}/${endpoint}/count`;
  const headers = { "user-id": userId };

  return fetchGetRequest({ url, headers });
};

export const getUrlToFetch = async (parameters: getAppointmentsParameters) => {
  const endpoint = ENDPOINT;
  return buildUrl({ parameters, endpoint });
};
