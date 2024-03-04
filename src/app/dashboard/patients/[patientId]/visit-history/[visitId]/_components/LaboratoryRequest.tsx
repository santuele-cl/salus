import { camelCaseToWords } from "@/app/_utils/utils";
import { Stack, Typography } from "@mui/material";
import { Diagnosis, LaboratoryRequest } from "@prisma/client";
import { format } from "date-fns";

const laboratoryRequestSelectedFields: Array<keyof LaboratoryRequest> = [
  //   "condition",
  //   "diagnosisDate",
  //   "treatment",
  //   "createdAt",
  //   "updatedAt",
];

const LaboratoryRequest = ({
  laboratoryRequest,
}: {
  laboratoryRequest: LaboratoryRequest;
}) => {
  const fields = Object.keys(laboratoryRequest) as Array<
    keyof LaboratoryRequest
  >;

  return (
    // <Stack
    //   sx={{
    //     gap: 1,
    //   }}
    // >
    //   <Typography variant="h6" sx={{ fontStyle: "italic" }}>
    //     {laboratoryRequest["condition"] as string}
    //   </Typography>

    //   <Stack>
    //     {fields.map((field, i) => {
    //       if (laboratoryRequestSelectedFields.includes(field)) {
    //         if (
    //           field === "updatedAt" ||
    //           field === "createdAt" ||
    //           field === "diagnosisDate"
    //         ) {
    //           const label = field === "updatedAt" ? "Updated" : "Date Examined";
    //           return (
    //             <Stack
    //               key={field + i}
    //               sx={{ flexDirection: "row", justifyContent: "space-between" }}
    //             >
    //               <Typography variant="subtitle2">{label}</Typography>
    //               <Typography sx={{ fontStyle: "italic" }}>{`${format(
    //                 diagnosis[field],
    //                 " MMMM d, yyyy"
    //               )}`}</Typography>
    //             </Stack>
    //           );
    //         }
    //         return (
    //           <Stack
    //             key={field + i}
    //             sx={{ flexDirection: "row", justifyContent: "space-between" }}
    //           >
    //             <Typography variant="subtitle2">
    //               {camelCaseToWords(field)}
    //             </Typography>
    //             <Typography sx={{ color: "success.main" }}>
    //               {diagnosis[field]}
    //             </Typography>
    //           </Stack>
    //         );
    //       }
    //       return;
    //     })}
    //   </Stack>
    // </Stack>
    <Stack>klajsdkf</Stack>
  );
};
export default LaboratoryRequest;
