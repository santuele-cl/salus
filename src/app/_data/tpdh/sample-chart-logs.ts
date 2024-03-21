import { ChartLogs } from "@prisma/client";
import dayjs from "dayjs";

export const SAMPLE_CHART_LOGS: ChartLogs[] = [
  {
    id: "1Sdz6gDqPcjfGw3p",
    action: "Login",
    logTime: dayjs("2024-03-21T08:15:32Z").toDate(),
    logDescription: "User logged in successfully.",
    ipAddress: "192.168.1.10",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.9000.0 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "2Ane7wGfXt9mKp5z",
    action: "Update",
    logTime: dayjs("2024-03-21T09:30:45Z").toDate(),
    logDescription: "Updated patient information.",
    ipAddress: "192.168.1.15",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "3Jtm8nHwLq4zNc6b",
    action: "Delete",
    logTime: dayjs("2024-03-21T10:45:20Z").toDate(),
    logDescription: "Deleted patient record.",
    ipAddress: "192.168.1.20",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "4Pqs9dLfTr3xKw7y",
    action: "Logout",
    logTime: dayjs("2024-03-21T11:55:10Z").toDate(),
    logDescription: "User logged out.",
    ipAddress: "192.168.1.25",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "5Gmr4uVxYh8kNs1o",
    action: "Create",
    logTime: dayjs("2024-03-21T13:10:55Z").toDate(),
    logDescription: "Added new patient record.",
    ipAddress: "192.168.1.30",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "6Fpk3oVyXi1jMs9t",
    action: "Update",
    logTime: dayjs("2024-03-21T14:25:40Z").toDate(),
    logDescription: "Updated patient prescription.",
    ipAddress: "192.168.1.35",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.9000.0 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "7Liw2bZuOr9sPt6m",
    action: "Login",
    logTime: dayjs("2024-03-21T15:40:20Z").toDate(),
    logDescription: "User logged in successfully.",
    ipAddress: "192.168.1.40",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "8Czn5vXyRs2jMt7l",
    action: "Delete",
    logTime: dayjs("2024-03-21T16:55:15Z").toDate(),
    logDescription: "Deleted employee record.",
    ipAddress: "192.168.1.45",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
  {
    id: "9Jmk6sZvYx3gPt8w",
    action: "Create",
    logTime: dayjs("2024-03-21T18:10:30Z").toDate(),
    logDescription: "Added new employee record.",
    ipAddress: "192.168.1.50",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    patientId: "PATIENT2",
    employeeId: "EMP1",
    status: "failed",
  },
];
