export const fetcher = async ({
  url,
  userId,
}: {
  url: string;
  userId: string;
}) => {
  return await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "user-id": userId,
    },
  }).then((response) => response.json());
};
