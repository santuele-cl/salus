import { camelCaseToWords } from "@/app/_ui/dashboard/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Allergies, Diagnosis, Employee } from "@prisma/client";
import { format } from "date-fns";

const allergiesSelectedFields: Array<keyof Allergies> = [
  "patientId",
  "description",
  "severity",
  "updatedAt",
];

const Allergy = ({ allergy }: { allergy: Allergies }) => {
  const fields = Object.keys(allergy) as Array<keyof Allergies>;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {allergy["name"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (allergiesSelectedFields.includes(field)) {
            if (field === "updatedAt") {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{field}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${format(
                    allergy[field],
                    " MMMM d, yyyy"
                  )}`}</Typography>
                </Stack>
              );
            }
            if (field === "severity") {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">
                    {camelCaseToWords(field)}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      color:
                        allergy[field] === "HIGH"
                          ? "error.main"
                          : "success.main",
                    }}
                  >
                    {allergy[field] as string}
                  </Typography>
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
                  {allergy[field] as string}
                </Typography>
              </Stack>
            );
          }
        })}
      </Stack>
    </Stack>
  );
};
export default Allergy;
