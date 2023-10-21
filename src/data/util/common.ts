export const appendToFormData = (
  formData: FormData,
  values: Record<string, Blob | string | Array<Blob | string>>
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
  objectData: Record<string, any>,
  parentKey: string
) => {
  Object.keys(objectData).forEach((key) => {
    const value = objectData[key];
    if (parentKey) {
      key = `${parentKey}[${key}]`;
    }
    if (value instanceof Object && !Array.isArray(value)) {
      return setObjectInFormData(formData, value, key);
    }
    if (Array.isArray(value)) {
      value.forEach((v, idx) => {
        if (v instanceof Object) {
          setObjectInFormData(formData, v, `${key}[${idx}]`);
        } else {
          formData.append(`${key}[${idx}]`, v);
        }
      });
    } else {
      formData.append(key, value);
    }
  });
};
