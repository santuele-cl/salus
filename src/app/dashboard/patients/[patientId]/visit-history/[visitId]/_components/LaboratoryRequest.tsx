import { camelCaseToWords } from "@/app/_utils/utils";
import { Stack, Typography } from "@mui/material";
import {
  Employee,
  LaboratoryProcedures,
  LaboratoryRequest,
} from "@prisma/client";
import dayjs from "dayjs";

const laboratoryRequestSelectedFields: Array<keyof LaboratoryRequest> = [
  "status",
  "dateRequested",
  "lastUpdated",
];

const LaboratoryRequest = ({
  laboratoryRequest,
  laboratoryProcedure,
  requestingPhysician,
}: {
  laboratoryRequest: LaboratoryRequest;
  laboratoryProcedure: LaboratoryProcedures;
  requestingPhysician: Employee;
}) => {
  const fields = Object.keys(laboratoryRequest) as Array<
    keyof LaboratoryRequest
  >;

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {laboratoryProcedure["procedureName"]}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (laboratoryRequestSelectedFields.includes(field)) {
            if (field === "dateRequested" || field === "lastUpdated") {
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
                  {laboratoryRequest[field]}
                </Typography>
              </Stack>
            );
          }
          return;
        })}
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Requesting by</Typography>
          <Typography sx={{ color: "success.main" }}>
            {`${requestingPhysician.fname} ${requestingPhysician.lname} `}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default LaboratoryRequest;
