import { getPrescriptionByPrescriptionId } from "@/actions/patients/prescriptions";
import { camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Drugs, Presciption, Prisma } from "@prisma/client";
import dayjs from "dayjs";

type PresciptionWithDrugName = Prisma.PresciptionGetPayload<{
  include: {
    drugs: { select: { name: true } };
  };
}>;

const prescriptionSelectedFields: Array<keyof Presciption> = [
  "dosage",
  "notes",
  "frequencyPerDay",
  "takenEveryHour",
  "durationInDays",
  "startDate",
  "endDate",
];

type KeyOfPrescription = keyof Presciption;

const Prescriptions = async ({
  prescriptionId,
}: {
  prescriptionId: string;
}) => {
  const response = await getPrescriptionByPrescriptionId(prescriptionId);

  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      {response && response.data && (
        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          {response.data.drugs?.name}
        </Typography>
      )}

      <Stack>
        {response &&
          response.data &&
          prescriptionSelectedFields.map((field, i) => {
            if (field === "startDate" || field === "endDate") {
              return (
                <Stack
                  key={field + i}
                  sx={{ flexDirection: "row", justifyContent: "space-between" }}
                >
                  <Typography variant="subtitle2">
                    {camelCaseToWords(field)}
                  </Typography>
                  <Typography sx={{ fontStyle: "italic" }}>{`${dayjs(
                    response.data[field]
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
                  {response.data[field] as string}
                </Typography>
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};
export default Prescriptions;
