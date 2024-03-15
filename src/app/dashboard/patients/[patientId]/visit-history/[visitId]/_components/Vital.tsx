import { Box, Stack, Typography } from "@mui/material";
import { Drugs, Presciption, Vitals } from "@prisma/client";
import dayjs from "dayjs";

interface VitalsField {
  label: string;
  type?: string;
  id: keyof Vitals;
}

const vitalsField: VitalsField[] = [
  { label: "Height", id: "heightInCm" },
  { label: "Weight", id: "weightInKg" },
  { label: "BP", id: "bloodPressure" },
  { label: "Pulse Rate", id: "pulseRate" },
  { label: "Respiratory Rate", id: "respiratoryRate" },
  { label: "Body Temparature", id: "bodyTemperatureInCelsius" },
  { label: "Oxygen Saturation", id: "oxygenSaturation" },
  { label: "Date checked", id: "createdAt", type: "date" },
];

const Vital = ({ vitals }: { vitals: Vitals }) => {
  return (
    <Stack
      sx={{
        gap: 1,
      }}
    >
      <Stack>
        {vitalsField.map(({ id, label, type = "" }) => {
          let content;

          if (type === "date") {
            content = (
              <Box sx={{ marginLeft: "auto", fontStyle: "italic" }}>{`${dayjs(
                vitals[id]
              ).format("MMMM d, YYYY h:mm a")}`}</Box>
            );
          } else {
            content = (
              <Box
                sx={{
                  marginLeft: "auto",
                  color: "success.main",
                  fontWeight: "bold",
                }}
              >
                {vitals[id] as string}
              </Box>
            );
          }

          return (
            <Stack
              key={id}
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="subtitle2">{label}</Typography>
              {content}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
export default Vital;
