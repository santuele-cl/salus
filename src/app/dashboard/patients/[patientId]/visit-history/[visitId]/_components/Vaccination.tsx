import { camelCaseToWords } from "@/app/_utils/utils";
import { Stack, Typography } from "@mui/material";
import { Vaccination } from "@prisma/client";
import dayjs from "dayjs";

const vaccinationsSelectedFields: Array<keyof Vaccination> = [
  "administeredAt",
  "administeredBy",
  "dosage",
  "nextDueDate",
  "patientId",
  "vaccineName",
  "id",
];

const Vaccination = ({ vaccination }: { vaccination: Vaccination }) => {
  const fields = Object.keys(vaccination) as Array<keyof Vaccination>;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {vaccination["vaccineName"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (vaccinationsSelectedFields.includes(field)) {
            if (field === "nextDueDate" || field === "administeredAt") {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{field}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    vaccination[field]
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
                  {vaccination[field] as string}
                </Typography>
              </Stack>
            );
          }
        })}
      </Stack>
    </Stack>
  );
};
export default Vaccination;
