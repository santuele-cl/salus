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
  Prisma,
  Visit,
  Vitals,
} from "@prisma/client";
import PDFDiagnoses from "./PDFDiagnoses";
import PDFPrescription from "./PDFPrescription";
import PDFLaboratoryRequest from "./PDFLaboratoryRequest";

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
    marginVertical: "8px",
  },
  subSectionHeading: {
    fontSize: "12px",
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

type PrescriptionWithDrugs = Prisma.PresciptionGetPayload<{
  include: { drugs: true; physician: true };
}>;

type LaboratoryRequestWithInclude = Prisma.LaboratoryRequestGetPayload<{
  include: {
    laboratoryProcedure: true;
    requestingPhysician: {
      include: {
        profile: {
          select: {
            employee: {
              select: {
                fname: true;
                lname: true;
                employeeRole: { select: { roleName: true } };
              };
            };
          };
        };
      };
    };
  };
}>;

type DiagnosisWithPhysician = Prisma.DiagnosisGetPayload<{
  include: {
    physician: true;
  };
}>;

type VitalsWithCheckBy = Prisma.VitalsGetPayload<{
  include: { checkedBy: true };
}>;

interface PDFFileProps {
  visit: Partial<Visit>;
  vitals?: VitalsWithCheckBy;
  prescriptions?: PrescriptionWithDrugs[];
  diagnoses?: DiagnosisWithPhysician[];
  laboratoryRequests?: LaboratoryRequestWithInclude[];
  physicalExaminations?: PhysicalExamination[];
  profile: Patient;
}

export default function PDFFile({
  visit,
  vitals,
  prescriptions,
  diagnoses,
  laboratoryRequests,
  physicalExaminations,
  profile,
}: PDFFileProps) {
  return (
    <Document title={`checkup-record-${visit.id}`}>
      <Page size="LETTER" style={styles.page}>
        <PDFHeader />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.dateText}>{`Date generated: ${dayjs().format(
            "MMMM DD, YYYY"
          )}`}</Text>
          <Text style={styles.dateText}>{`Checkup date: ${dayjs(
            visit.createdAt
          ).format("MMMM DD, YYYY")}`}</Text>
        </View>
        <View>
          <Text style={styles.sectionHeading}>Patient Information</Text>
        </View>

        <PDFProfile profile={profile} />
        <View>
          <Text style={styles.sectionHeading}>Checkup Record</Text>
        </View>
        <PDFCheckupInfo visit={visit} />
        <View>
          <Text style={styles.subSectionHeading}>Vitals Signs</Text>
        </View>
        <PDFVitals vitals={vitals} />
        <View>
          <Text style={styles.subSectionHeading}>Physical Examination</Text>
        </View>
        {physicalExaminations && physicalExaminations.length && (
          <PDFPhysicalExaminations
            physicalExaminations={physicalExaminations}
          />
        )}
        <View>
          <Text style={styles.subSectionHeading}>Diagnosis</Text>
        </View>
        {diagnoses && diagnoses.length && (
          <PDFDiagnoses diagnoses={diagnoses} />
        )}
        <View>
          <Text style={styles.subSectionHeading}>Prescription</Text>
        </View>
        {prescriptions && prescriptions.length && (
          <PDFPrescription prescriptions={prescriptions} />
        )}
        <View>
          <Text style={styles.subSectionHeading}>Laboratory Request</Text>
        </View>
        {laboratoryRequests && laboratoryRequests.length && (
          <PDFLaboratoryRequest laboratoryRequests={laboratoryRequests} />
        )}
        <View style={{ marginTop: "20px" }}>
          {/* <View>
            <Text
              style={{
                textTransform: "uppercase",
                textDecoration: "underline",
                fontSize: "11px",
                marginTop: "8px",
              }}
            >
              {vitals &&
                vitals &&
                `${vitals.checkedBy.fname} ${vitals.checkedBy.lname} `}
            </Text>
            <Text style={{ fontSize: "10px", color: "rgba(0,0,0,0.8)" }}>
              Attending nurse
            </Text>
          </View> */}
          <View>
            <Text
              style={{
                textTransform: "uppercase",
                textDecoration: "underline",
                fontSize: "11px",
                marginTop: "8px",
              }}
            >
              {diagnoses &&
                diagnoses.length &&
                `${diagnoses[0].physician?.fname} ${diagnoses[0].physician?.lname} `}
            </Text>
            <Text style={{ fontSize: "8px", color: "rgba(0,0,0,0.8)" }}>
              Attending physician
            </Text>
          </View>
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
