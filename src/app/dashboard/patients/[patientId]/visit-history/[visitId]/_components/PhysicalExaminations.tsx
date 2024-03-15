import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { PhysicalExamination } from "@prisma/client";
import dayjs from "dayjs";

const physicalExaminationsSelectedFields: Array<keyof PhysicalExamination> = [
  "isNormal",
  "remarks",
  "createdAt",
  "updatedAt",
  "specifyIfOther",
];

const PhysicalExaminations = ({
  physicalExamination,
}: {
  physicalExamination: PhysicalExamination;
}) => {
  const fields = Object.keys(physicalExamination) as Array<
    keyof PhysicalExamination
  >;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {physicalExamination["physicalPart"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (physicalExaminationsSelectedFields.includes(field)) {
            if (field === "updatedAt" || field === "createdAt") {
              const label = field === "updatedAt" ? "Updated" : "Date Examined";
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{label}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    physicalExamination[field]
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
                  {typeof physicalExamination[field] === "boolean"
                    ? physicalExamination[field]
                      ? "true"
                      : "false"
                    : physicalExamination[field]}
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
export default PhysicalExaminations;
