import { useCallback } from "react";

export const useCreatorFieldUpdater = (
  setForm: (previousForm: any) => void,
) => {
  return useCallback(
    (field: any, value: any) => {
      setForm((previousForm: any) => ({
        ...previousForm,
        [field]: value,
      }));
    },
    [setForm],
  );
};
