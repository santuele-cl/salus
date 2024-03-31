import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Diagnosis, Employee } from "@prisma/client";
import DiagnosisPage from "../../../diagnoses/page";
import dayjs from "dayjs";
import { getDiagnosisByDiagnosisId } from "@/actions/patients/diagnosis";

const diagnosisSelectedFields: Array<keyof Diagnosis> = [
  "condition",
  "diagnosisDate",
  "treatment",
  "createdAt",
  "updatedAt",
];

const Diagnosis = async ({ diagnosisId }: { diagnosisId: string }) => {
  // const fields = Object.keys(diagnosis) as Array<keyof Diagnosis>;

  const response = await getDiagnosisByDiagnosisId(diagnosisId);

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      {response && response.data && (
        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          {response.data.condition}
        </Typography>
      )}

      <Stack>
        {response &&
          response.data &&
          diagnosisSelectedFields.map((field, i) => {
            if (
              field === "createdAt" ||
              field === "updatedAt" ||
              field === "diagnosisDate"
            ) {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">
                    {camelCaseToWords(field)}
                  </Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    response.data[field]
                  ).format("MMMM DD, YYYY")}`}</Typography>
                </Stack>
              );
            }
            return (
              <Stack
                key={field + i}
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2">
                  {camelCaseToWords(field)}
                </Typography>
                <Typography sx={{ color: "success.main" }}>
                  {response.data[field] as string}
                </Typography>
              </Stack>
            );
          })}
        {/* {fields.map((field, i) => {
          if (diagnosisSelectedFields.includes(field)) {
            if (
              field === "updatedAt" ||
              field === "createdAt" ||
              field === "diagnosisDate"
            ) {
              const label = field === "updatedAt" ? "Updated" : "Date Examined";
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{label}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    diagnosis[field]
                  ).format("MMMM d, YYYY")}`}</Typography>
                </Stack>
              );
            }
            return (
              <Stack
                key={field + i}
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2">
                  {camelCaseToWords(field)}
                </Typography>
                <Typography sx={{ color: "success.main" }}>
                  {diagnosis[field]}
                </Typography>
              </Stack>
            );
          }
          return;
        })} */}
      </Stack>
    </Stack>
  );
};
export default Diagnosis;
