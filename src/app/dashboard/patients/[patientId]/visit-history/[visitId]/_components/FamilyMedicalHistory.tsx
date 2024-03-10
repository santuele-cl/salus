import { camelCaseToWords } from "@/app/_ui/dashboard/_utils/utils";
import { Stack, Typography } from "@mui/material";
import { FamilyMedicalHistory } from "@prisma/client";
import { format } from "date-fns";

const include: Array<keyof FamilyMedicalHistory> = [
  "ageOfOnset",
  "relationship",
  "updatedAt",
  "createdAt",
];

const FamilyMedicalHistory = ({
  familyMedicalHistory,
}: {
  familyMedicalHistory: FamilyMedicalHistory;
}) => {
  const fields = Object.keys(familyMedicalHistory) as Array<
    keyof FamilyMedicalHistory
  >;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {familyMedicalHistory["condition"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (include.includes(field)) {
            if (field === "updatedAt" || field === "createdAt") {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{field}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${format(
                    familyMedicalHistory[field]!,
                    "MMMM d, yyyy"
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
                  {familyMedicalHistory[field] as string}
                </Typography>
              </Stack>
            );
          }
        })}
      </Stack>
    </Stack>
  );
};
export default FamilyMedicalHistory;
