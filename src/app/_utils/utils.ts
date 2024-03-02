export const generateRandomIndex = (maxIndex: number) => {
  return Math.floor(Math.random() * maxIndex);
};

export const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};
