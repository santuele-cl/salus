import { camelCaseToTitleCase, camelCaseToWords } from "@/app/_utils/utils";
import { Box, Stack, Typography } from "@mui/material";
import { Drugs, Presciption } from "@prisma/client";
import { format } from "date-fns";

const prescriptionSelectedFields: Array<keyof Presciption> = [
  "dosage",
  "notes",
  "startDate",
  "endDate",
  "frequencyPerDay",
  //   "takenEveryHour",
  "durationInDays",
];

const Prescriptions = ({
  data,
  drugs,
}: {
  data: Presciption;
  drugs: Drugs;
}) => {
  const { id } = data;
  const { name } = drugs;
  const fields = Object.keys(data) as Array<keyof Presciption>;
  return (
    // <Box>QWERTY</Box>
    <Stack
      sx={{
        // alignItems: "center",
        // justifyContent: "space-between",
        gap: 1,
        // border: "1px solid red",
      }}
    >
      <Typography variant="h6" sx={{ fontStyle: "italic" }}>
        {name}
      </Typography>

      <Stack>
        {fields.map((field, i) => {
          if (!prescriptionSelectedFields.includes(field)) return;
          if (field === "startDate" || field === "endDate") {
            // if)
            return (
              <Stack
                key={field + i}
                sx={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                {/* {camelCaseToTitleCase(field)} */}
                <Typography variant="subtitle2">
                  {camelCaseToWords(field)} :{" "}
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
              {/* {camelCaseToTitleCase(field)} */}
              <Typography variant="subtitle2">
                {camelCaseToWords(field)} :{" "}
              </Typography>
              <Typography sx={{ color: "success.main" }}>
                {data[field] as string}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
      {/* {typeof data[id] === "object" ? (
        <Box sx={{ marginLeft: "auto", fontStyle: "italic" }}>{`${format(
          data[id],
          " MMMM d, yyyy h:mm: a"
        )}`}</Box>
      ) : (
        <Box
          sx={{
            marginLeft: "auto",
            color: "success.main",
            fontWeight: "bold",
          }}
        >
          {data[id]}
        </Box>
      )} */}
    </Stack>
  );
};
export default Prescriptions;
