import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Presciption, Diagnosis, Employee} from "@prisma/client";
import { format } from "date-fns";

const allergiesSelectedFields: Array<keyof Presciption> = [
"createdAt",
"dosage",
"drugsId",
"durationInDays",
"endDate",
"frequencyPerDay",
"id",
"notes",
"patientId",
"physicianId",
"startDate",
"takenEveryHour",
"updatedAt",
"visitId"
];

const Prescription = ({ prescription }: { prescription: Presciption }) => {
  const fields = Object.keys(prescription) as Array<keyof Presciption>;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {prescription["patientId"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (allergiesSelectedFields.includes(field)) {
            if (
              field === "updatedAt" || field === "createdAt" || field === "endDate" || field === "startDate"
            ) {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{field}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${format(
                    prescription[field],
                    " MMMM d, yyyy"
                  )}`}</Typography>
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
                  {prescription[field]  as string}
                </Typography>
              </Stack>
            );
          }
        })}
      </Stack>
    </Stack>
  );
};
export default Prescription;
