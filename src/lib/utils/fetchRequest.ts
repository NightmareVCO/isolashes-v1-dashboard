type FetchRequestProperties = {
  url: string;
  headers?: any;
  noStore?: boolean;
};

export const fetchGetRequest = async ({
  url,
  headers,
  noStore,
}: FetchRequestProperties) => {
  try {
    const response = await fetch(url, {
      headers,
      cache: noStore ? "no-store" : "default",
    });
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(`Error haciendo la petición: ${error}`);
    }
    return { error: "Failed to make request" };
  }
};

export const fetchPostRequest = async ({
  url,
  headers,
  data,
}: FetchRequestProperties & { data: any }) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    const status = response.status;

    return {
      data: json,
      status,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(`Error haciendo la petición: ${error}`);
    }
    return { error: "Failed to make request" };
  }
};

export const fetchPatchRequest = async ({
  url,
  headers,
  data,
}: FetchRequestProperties & { data: any }) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    const status = response.status;

    return {
      data: json,
      status,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(`Error haciendo la petición: ${error}`);
    }
    return { error: "Failed to make request" };
  }
};

export const fetchDeleteRequest = async ({
  url,
  headers,
}: FetchRequestProperties) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    const json = await response.json();
    const status = response.status;

    return {
      data: json,
      status,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(`Error haciendo la petición: ${error}`);
    }
    return { error: "Failed to make request" };
  }
};
