import CryptoJS, { AES } from "crypto-js";
import { env } from "process";

interface Obj {
  [key: string]: string;
}
export function encryptData(data: string) {
  const encryptedData = AES.encrypt(data, env.AES_KEY!).toString();
  return encryptedData;
}

export function decryptData(data: any) {
  const dencryptedData = AES.decrypt(data, env.AES_KEY!).toString(
    CryptoJS.enc.Utf8
  );
  return dencryptedData;
}

export function encryptObjectData(data: any) {
  const encryptedObject: Obj = {};
  const encryptedData = Object.keys(data).forEach((item) => {
    const encryptedValue = encryptData(JSON.stringify(data[item]));
    encryptedObject[item] = encryptedValue;
  });
  return encryptedObject;
}

export function decryptObjectData(data: any) {
  //   const dencryptedData = AES.decrypt(data, env.AES_KEY!).toString(
  //     CryptoJS.enc.Utf8
  //   );
  //   return dencryptedData;
  const decryptedObject: Obj = {};
  const decryptedData = Object.keys(data).forEach((item) => {
    const decryptedValue = JSON.parse(decryptData(JSON.stringify(data[item])));
    decryptedObject[item] = decryptedValue;
  });
  return decryptedObject;
}
