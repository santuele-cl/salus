"use server";
import { db } from "@/app/_lib/db";
import { VitalsSchema } from "@/app/_schemas/zod/schema";
import { z } from "zod";

export async function addVitals(
  visitId: string,
  values: z.infer<typeof VitalsSchema>
) {
  const parsedValues = VitalsSchema.safeParse(values);

  if (!parsedValues.success) return { error: "Parsed value invalid!" };

  const {
    heightInCm,
    weightInKg,
    bloodPressure,
    pulseRate,
    respiratoryRate,
    bodyTemperatureInCelsius,
    oxygenSaturation,
    checkedById,
  } = parsedValues.data;

  const vitals = await db.vitals.create({
    data: {
      heightInCm,
      weightInKg,
      bloodPressure,
      pulseRate,
      respiratoryRate,
      bodyTemperatureInCelsius,
      oxygenSaturation,
      checkedById,
      visitId,
    },
  });

  if (!vitals) return { error: "An error has occured. Vitals not added!" };

  return {
    sucess: "Vitals successfully added!",
    data: vitals,
  };
}
