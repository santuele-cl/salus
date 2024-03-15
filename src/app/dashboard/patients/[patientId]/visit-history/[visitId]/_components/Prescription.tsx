import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Presciption, Diagnosis, Employee } from "@prisma/client";
import dayjs from "dayjs";

const include: Array<keyof Presciption> = [
  "dosage",
  "durationInDays",
  "endDate",
  "frequencyPerDay",
  "notes",
  "startDate",
  "takenEveryHour",
];

const Prescription = ({
  prescription,
  drugName,
}: {
  prescription: Presciption;
  drugName: string;
}) => {
  const fields = Object.keys(prescription) as Array<keyof Presciption>;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {drugName}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (include.includes(field)) {
            if (
              field === "updatedAt" ||
              field === "createdAt" ||
              field === "endDate" ||
              field === "startDate"
            ) {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{field}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    prescription[field]
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
                  {prescription[field] as string}
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
