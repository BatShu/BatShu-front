export const appendToFormData = (
  formData: FormData,
  values: Record<string, any>
) => {
  for (const key in values) {
    const value = values[key];
    if (!value) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else formData.append(key, value);
  }
};

export const setObjectInFormData = (
  formData: FormData,
  parentKey: string,
  objectData: Record<string, any>
) => {
  Object.keys(objectData).forEach((key) => {
    const value = objectData[key];
    if (parentKey) {
      key = `${parentKey}[${key}]`;
    }
    if (value instanceof Object && !Array.isArray(value)) {
      return setObjectInFormData(formData, key, value);
    }
    if (Array.isArray(value)) {
      value.forEach((v, idx) => {
        if (v instanceof Object) {
          setObjectInFormData(formData, `${key}[${idx}]`, v);
        } else {
          formData.append(`${key}[${idx}]`, v);
        }
      });
    } else {
      formData.append(key, value);
    }
  });
};
