import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Diagnosis, Employee } from "@prisma/client";
import DiagnosisPage from "../../../diagnoses/page";
import dayjs from "dayjs";

const diagnosisSelectedFields: Array<keyof Diagnosis> = [
  "condition",
  "diagnosisDate",
  "treatment",
  "createdAt",
  "updatedAt",
];

const Diagnosis = ({ diagnosis }: { diagnosis: Diagnosis }) => {
  const fields = Object.keys(diagnosis) as Array<keyof Diagnosis>;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {diagnosis["condition"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
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
        })}
      </Stack>
    </Stack>
  );
};
export default Diagnosis;
