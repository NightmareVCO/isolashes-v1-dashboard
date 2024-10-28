export const toTitleCase = (string_: string) => {
  return string_.replaceAll(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
};
