import CryptoJS, { AES } from "crypto-js";
import { env } from "process";

interface Obj {
  [key: string]: string;
}

export function encryptData(data: string) {
  const encryptedData = AES.encrypt(
    JSON.stringify(data),
    env.AES_KEY!
  ).toString();
  return encryptedData;
}

export function decryptData(data: any) {
  const dencryptedData = AES.decrypt(data, env.AES_KEY!).toString(
    CryptoJS.enc.Utf8
  );
  return dencryptedData;
}

// export function encryptObjectData<T extends object>(data: T, excluded: Array<keyof Partial<T>>) {
//   const encryptedObject: Partial<T> = data;
//   const encryptedData = Object.keys(data).forEach((item) => {
//     if (!excluded.includes(item)) {
//       const encryptedValue = encryptData(JSON.stringify(data[item]));
//       encryptedObject[item] = encryptedValue;
//     } else {
//       encryptedObject[item] = data[item];
//     }
//   });
//   return encryptedObject;
// }

// function encryptObjectDat2a<T extends Record<string, any>>(data: T, excluded: Array<keyof T>): T {
//   const encryptedObject: Partial<T> = {};
//   Object.keys(data).forEach((item: keyof T) => {
//     if (!excluded.includes(item)) {
//       const encryptedValue = encryptData(JSON.stringify(data[item]));
//       encryptedObject[item] = encryptedValue;
//     } else {
//       encryptedObject[item] = data[item];
//     }
//   });
//   return encryptedObject as T;
// }

export function decryptObjectData(data: any) {
  const decryptedObject: Obj = {};
  const decryptedData = Object.keys(data).forEach((item) => {
    const decryptedValue = JSON.parse(decryptData(JSON.stringify(data[item])));
    decryptedObject[item] = decryptedValue;
  });
  return decryptedObject;
}
