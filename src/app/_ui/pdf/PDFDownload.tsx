"use client";
import PDFFile from "@/app/_ui/pdf/PDFFile";
import { Button, Stack, Typography } from "@mui/material";
import {
  Diagnosis,
  LaboratoryRequest,
  Patient,
  PhysicalExamination,
  Presciption,
  Vitals,
} from "@prisma/client";
import { PDFViewer } from "@react-pdf/renderer";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <Typography>Loading...</Typography>,
  }
);

interface Data {
  vitals?: Vitals;
  prescription?: Presciption[];
  diagnoses?: Diagnosis[];
  laboratoryRequest?: LaboratoryRequest[];
  physicalExaminations?: PhysicalExamination[];
}

interface PDFDownloadProps {
  vitals?: Vitals;
  prescriptions?: Presciption[];
  diagnoses?: Diagnosis[];
  laboratoryRequests?: LaboratoryRequest[];
  physicalExaminations?: PhysicalExamination[];
  profile: Patient;
}

export default function PDFDownload({
  vitals,
  physicalExaminations,
  prescriptions,
  laboratoryRequests,
  diagnoses,
  profile,
}: PDFDownloadProps) {
  return (
    <Stack>
      <PDFViewer>
        <PDFFile
          profile={profile}
          vitals={vitals}
          physicalExaminations={physicalExaminations}
          prescriptions={prescriptions}
          laboratoryRequests={laboratoryRequests}
          diagnoses={diagnoses}
        />
      </PDFViewer>
      <PDFDownloadLink
        document={
          <PDFFile
            profile={profile}
            vitals={vitals}
            physicalExaminations={physicalExaminations}
            prescriptions={prescriptions}
            laboratoryRequests={laboratoryRequests}
            diagnoses={diagnoses}
          />
        }
        fileName="sample-pdf"
      >
        {({ loading }) => (
          <Button variant="contained" color="secondary">
            {loading ? "Loading" : "Download PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </Stack>
  );
}
