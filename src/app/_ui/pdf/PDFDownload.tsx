"use client";
import PDFFile from "@/app/_ui/pdf/PDFFile";
import { Button, Stack, Typography } from "@mui/material";
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
import { PDFViewer } from "@react-pdf/renderer";
import dayjs from "dayjs";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Typography>Loading...</Typography>,
  }
);

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

type VitalsWithCheckBy = Prisma.VitalsGetPayload<{
  include: { checkedBy: true };
}>;

type DiagnosisWithPhysician = Prisma.DiagnosisGetPayload<{
  include: { physician: true };
}>;

interface PDFDownloadProps {
  visit: Partial<Visit>;
  vitals?: VitalsWithCheckBy;
  prescriptions?: PrescriptionWithDrugs[];
  diagnoses?: DiagnosisWithPhysician[];
  laboratoryRequests?: LaboratoryRequestWithInclude[];
  physicalExaminations?: PhysicalExamination[];
  profile: Patient;
}

export default function PDFDownload({
  visit,
  vitals,
  physicalExaminations,
  prescriptions,
  laboratoryRequests,
  diagnoses,
  profile,
}: PDFDownloadProps) {
  return (
    <Stack>
      {/* <PDFViewer>
        <PDFFile
          visit={visit}
          profile={profile}
          vitals={vitals}
          physicalExaminations={physicalExaminations}
          prescriptions={prescriptions}
          laboratoryRequests={laboratoryRequests}
          diagnoses={diagnoses}
        />
      </PDFViewer> */}
      <PDFDownloadLink
        document={
          <PDFFile
            visit={visit}
            profile={profile}
            vitals={vitals}
            physicalExaminations={physicalExaminations}
            prescriptions={prescriptions}
            laboratoryRequests={laboratoryRequests}
            diagnoses={diagnoses}
          />
        }
        fileName={`${profile.lname}-${profile.fname}-${dayjs(
          visit.createdAt
        ).format("MMDDYYYY")}-checkup-record`}
      >
        {({ loading }) => (
          <Button variant="contained" color="warning">
            {loading ? "Loading" : "Download PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </Stack>
  );
}
