// a text like this: categoria-servicio will arrive, and we will return it as categoria servicio
export const cleanTitle = (title: string) => {
  return title.replaceAll("-", " ");
};
