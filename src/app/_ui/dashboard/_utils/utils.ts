export const generateRandomIndex = (maxIndex: number) => {
  return Math.floor(Math.random() * maxIndex);
};

export const toKebabCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
};

// export const camelCaseToTitleCase = (str: string) => {
//   // Use regular expression to find camel case words
//   const words = str.match(/[A-Z](?:[a-z]+|[A-Z]*(?=[A-Z]|$))/g);
//   // Capitalize each word and join them with space
//   if (!words) return;

//   const titleCaseStr = words
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");

//   return titleCaseStr;
// };

export const camelCaseToWords = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};
