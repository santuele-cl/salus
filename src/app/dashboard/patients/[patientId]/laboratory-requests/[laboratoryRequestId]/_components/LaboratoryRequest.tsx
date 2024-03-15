import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import {
  Presciption,
  Diagnosis,
  Employee,
  LaboratoryRequest,
  LaboratoryProcedures,
} from "@prisma/client";
import dayjs from "dayjs";

const include: Array<keyof LaboratoryRequest> = [
  "id",
  "patientId",
  "visitId",
  "dateRequested",
  "lastUpdated",
];

const LaboratoryRequest = ({
  laboratoryRequest,
  laboratoryProcedure,
  requestingPhysician,
}: {
  laboratoryProcedure: LaboratoryProcedures;
  requestingPhysician: Employee;
  laboratoryRequest: LaboratoryRequest;
}) => {
  const fields = Object.keys(laboratoryRequest) as Array<
    keyof LaboratoryRequest
  >;

  //   TODO: Display neccessary informations

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {laboratoryRequest["patientId"] as string}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (include.includes(field)) {
            if (field === "lastUpdated" || field === "dateRequested") {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">{field}</Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    laboratoryRequest[field]
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
                  {laboratoryRequest[field] as string}
                </Typography>
              </Stack>
            );
          }
        })}
      </Stack>
    </Stack>
  );
};
export default LaboratoryRequest;
