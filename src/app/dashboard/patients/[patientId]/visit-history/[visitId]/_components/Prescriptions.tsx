import { camelCaseToWords } from "@/app/_ui/dashboard/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Drugs, Presciption } from "@prisma/client";
import { format } from "date-fns";

const prescriptionSelectedFields: Array<keyof Presciption> = [
  "dosage",
  "notes",
  "startDate",
  "endDate",
  "frequencyPerDay",
  "durationInDays",
];

const Prescriptions = ({
  data,
  drugs,
}: {
  data: Presciption;
  drugs: Drugs;
}) => {
  const { name } = drugs;
  const fields = Object.keys(data) as Array<keyof Presciption>;
  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {name}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (!prescriptionSelectedFields.includes(field)) return;
          if (field === "startDate" || field === "endDate") {
            return (
              <Stack
                key={field + i}
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Typography variant="subtitle2">
                  {camelCaseToWords(field)}
                </Typography>
                <Typography sx={{ fontStyle: "italic" }}>{`${format(
                  data[field],
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
                {data[field] as string}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
export default Prescriptions;
