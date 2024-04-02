"Use client";

import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import Logo from "../../../../public/next.svg";
import { Button } from "@mui/material";
import PDFHeader from "./PDFHeader";
import PDFProfile from "./PDFProfile";
import dayjs from "dayjs";
import PDFCheckupInfo from "./PDFCheckupInfo";
import PDFVitals from "./PDFVitals";
import PDFPhysicalExaminations from "./PDFPhysicalExaminations";
import {
  Diagnosis,
  LaboratoryRequest,
  Patient,
  PhysicalExamination,
  Presciption,
  Vitals,
} from "@prisma/client";
import PDFDiagnoses from "./PDFDiagnoses";

const SAMPLE_VISIT = {
  id: "g5AfWsLxA_EPMAaT",
  accompaniedBy: "Parent",
  chiefComplaint: "Fever and Cough",
  hpi: "Patient has been experiencing fever and cough for the past three days. No improvement with over-the-counter medications.",
  createdAt: dayjs("2024-03-31T05:14:25.193Z").toDate(),
  updatedAt: dayjs("2024-03-31T05:14:25.193Z").toDate(),
  serviceDepartmentId: "SD1003",
  patientId: "PATIENT2",
  patient: {
    id: "PATIENT2",
    createdAt: dayjs("2024-03-31T05:14:25.193Z").toDate(),
    updatedAt: dayjs("2024-03-31T05:14:25.193Z").toDate(),
    fname: "clyde",
    mname: "arrogante",
    lname: "santuele",
    nameSuffix: null,
    gender: "MALE",
    age: 23,
    bdate: dayjs("2023-12-27T10:48:22.000Z").toDate(),
    bplace: "makati",
    civilStatus: "SINGLE",
    occupation: "Software engineer",
    profileId: "PROFILE1",
  },
  vitals: {
    id: "pZMvWtPmFGctXgbB",
    heightInCm: 170,
    weightInKg: 70,
    bloodPressure: "120/80",
    pulseRate: "90",
    respiratoryRate: "20",
    bodyTemperatureInCelsius: 38,
    oxygenSaturation: "98%",
    createdAt: dayjs("2024-03-31T05:14:25.193Z").toDate(),
    updatedAt: dayjs("2024-03-31T05:14:25.193Z").toDate(),
    checkedById: "EMP1",
    visitId: "g5AfWsLxA_EPMAaT",
    patientId: null,
  },
  diagnosis: [[Object]],
  prescriptions: [[Object]],
  laboratoryRequest: [[Object]],
  physicalExamination: [[Object]],
  serviceDepartment: {
    id: "SD1003",
    name: "Outpatient Department",
    head: "Pascual Pattaui, MD",
    description: null,
    createdAt: dayjs("2024-03-31T05:14:25.115Z").toDate(),
    updatedAt: dayjs("2024-03-31T05:14:25.115Z").toDate(),
  },
};

export const styles = StyleSheet.create({
  page: {
    width: "1000px",
    height: "1000px",
    paddingVertical: "32px",
    paddingHorizontal: "24px",
  },
  image: { padding: "8px", width: "50px", height: "50px" },
  pageNumber: {
    color: "rgba(0,0,0,0.6)",
    position: "absolute",
    // left: 0,
    bottom: 30,
    right: 30,
    fontSize: 10,
    textAlign: "center",
  },
  sectionHeading: {
    fontSize: "14px",
    marginVertical: "6px",
  },
  dateText: {
    fontSize: "10px",
    color: "rgba(0,0,0,0.8)",
  },
  nameText: {
    fontSize: "12px",
    color: "rgba(0,0,0,0.9)",
  },
});

interface PDFFileProps {
  vitals?: Vitals;
  prescriptions?: Presciption[];
  diagnoses?: Diagnosis[];
  laboratoryRequests?: LaboratoryRequest[];
  physicalExaminations?: PhysicalExamination[];
  profile: Patient;
}

export default function PDFFile({
  vitals,
  prescriptions,
  diagnoses,
  laboratoryRequests,
  physicalExaminations,
  profile,
}: PDFFileProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Text style={styles.dateText}>{`Date generated: ${dayjs().format(
          "MMMM DD, YYYY"
        )}`}</Text>
        <View>
          <Text style={styles.sectionHeading}>Patient Information</Text>
        </View>
        <PDFProfile profile={profile} />
        <PDFCheckupInfo visitData={SAMPLE_VISIT} />
        <View>
          <Text style={styles.sectionHeading}>Vitals Signs</Text>
        </View>
        <PDFVitals vitals={vitals} />
        <View>
          <Text style={styles.sectionHeading}>Physical Examination</Text>
        </View>
        {physicalExaminations && physicalExaminations.length && (
          <PDFPhysicalExaminations
            physicalExaminations={physicalExaminations}
          />
        )}
        <View>
          <Text style={styles.sectionHeading}>Diagnosis</Text>
        </View>
        {diagnoses && diagnoses.length && (
          <PDFDiagnoses diagnoses={diagnoses} />
        )}
        <View>
          <Text>________________</Text>
          <Text style={styles.nameText}>Attending nurse</Text>
        </View>
        <View>
          <Text>________________</Text>
          <Text style={styles.nameText}>Attending physician</Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
