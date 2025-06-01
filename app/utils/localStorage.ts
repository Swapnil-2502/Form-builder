import { FormField } from "../slices/formBuilderSlice";

export const saveToLocalStorage = (
        fields: FormField[],
        steps: unknown[],
        currentStepIndex: number
    ) => {
        if (typeof window === "undefined") return;
        const data = {
            fields,
            steps,
            currentStepIndex,
        };
    localStorage.setItem("formBuilderFields", JSON.stringify(data));
}

export const loadFromLocalStorage = () => {
    if (typeof window === "undefined") return;
  const saved = localStorage.getItem("formBuilderFields");
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
};

export const clearStorage = () => {
    localStorage.removeItem("formBuilderFields")
}