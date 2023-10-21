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
