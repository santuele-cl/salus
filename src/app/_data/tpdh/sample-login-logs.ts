import { LoginLogs } from "@prisma/client";
import dayjs from "dayjs";

export const SAMPLE_LOGIN_LOGS: LoginLogs[] = [
  {
    id: "7da47a0d90b3b6d3",
    status: "success",
    userId: "USER2",
    logTime: dayjs("2024-03-20T12:30:45Z").toDate(),
    ipAddress: "192.168.1.100",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
  {
    id: "5d18e1c1942583b2",
    status: "success",
    userId: "USER2",
    logTime: dayjs("2024-03-20T13:15:22Z").toDate(),
    ipAddress: "192.168.1.50",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "Internal server error occurred.",
  },
  {
    id: "f1d8e4d812169ec7",
    status: "success",
    userId: "USER2",
    logTime: dayjs("2024-03-20T14:05:10Z").toDate(),
    ipAddress: "192.168.1.75",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
  {
    id: "3c356f2e2a885b59",
    status: "success",
    userId: "USER2",
    logTime: dayjs("2024-03-20T15:40:17Z").toDate(),
    ipAddress: "192.168.1.90",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
  {
    id: "871768f392471e59",
    status: "success",
    userId: "USER1",
    logTime: dayjs("2024-03-20T16:20:30Z").toDate(),
    ipAddress: "192.168.1.120",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
  {
    id: "8c36e1a30d981d74",
    status: "success",
    userId: "USER1",
    logTime: dayjs("2024-03-20T17:00:55Z").toDate(),
    ipAddress: "192.168.1.200",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "Permission denied.",
  },
  {
    id: "b251e8b1c2db4b8f",
    status: "failed",
    userId: "USER2",
    logTime: dayjs("2024-03-20T18:45:11Z").toDate(),
    ipAddress: "192.168.1.80",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
  {
    id: "fc3c0eebd73bb6d0",
    status: "failed",
    userId: "USER2",
    logTime: dayjs("2024-03-20T19:30:25Z").toDate(),
    ipAddress: "192.168.1.150",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "File not found.",
  },
  {
    id: "64359b086ba7f0b3",
    status: "failed",
    userId: "USER2",
    logTime: dayjs("2024-03-20T20:10:40Z").toDate(),
    ipAddress: "192.168.1.100",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
  {
    id: "f3fc7ad75c30d0a6",
    status: "failed",
    userId: "USER2",
    logTime: dayjs("2024-03-20T21:20:55Z").toDate(),
    ipAddress: "192.168.1.110",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36",
    errorMessage: "",
  },
];
