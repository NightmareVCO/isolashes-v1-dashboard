export const buildUrl = ({ parameters, endpoint }: any) => {
  let url = `${process.env.SERVER}/${endpoint}?`;
  for (const [key, value] of Object.entries(parameters)) {
    if (value || value === 0) {
      url += `${key}=${value}&`;
    }
  }
  // Remove the trailing "&"
  return url.slice(0, -1);
};
