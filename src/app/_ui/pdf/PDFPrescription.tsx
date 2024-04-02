import { Diagnosis, Presciption, Prisma } from "@prisma/client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    padding: "3px",
    marginBottom: "4px",
    marginLeft: "8px",
    // borderBottom: "1px solid rgba(0,0,0,0.4)",
    borderTop: "1px solid rgba(0,0,0,0.4)",
  },
  containerItems: { flex: "1 0 100%" },
  itemHeading: {
    fontWeight: "bold",
    fontSize: "9px",
  },
  itemBody: {
    fontSize: "8px",
  },
});

type PrescriptionWithDrugs = Prisma.PresciptionGetPayload<{
  include: { drugs: true; physician: true };
}>;

export default function PDFPrescription({
  prescriptions,
}: {
  prescriptions: PrescriptionWithDrugs[];
}) {
  return (
    <View>
      {prescriptions &&
        prescriptions.map((prescription) => {
          const {
            drugs,
            dosage,
            takenEveryHour,
            frequencyPerDay,
            endDate,
            startDate,
            notes,
            id,
            physician,
          } = prescription;
          return (
            <View key={id} style={styles.container}>
              <View style={styles.containerItems}>
                <Text style={styles.itemHeading}>Drug</Text>
                <Text style={styles.itemBody}>{drugs?.name}</Text>
              </View>
              <View style={styles.containerItems}>
                <Text style={styles.itemHeading}>Dosage</Text>
                <Text style={styles.itemBody}>{`${dosage}, ${
                  frequencyPerDay
                    ? `${frequencyPerDay} a day`
                    : `every ${takenEveryHour} hr`
                }`}</Text>
              </View>
              <View style={styles.containerItems}>
                <Text style={styles.itemHeading}>Duration</Text>
                <Text style={styles.itemBody}>{`${dayjs(startDate).format(
                  "MMM DD, YYYY"
                )} - ${dayjs(endDate).format("MMM DD, YYYY")}`}</Text>
              </View>
              <View style={styles.containerItems}>
                <Text style={styles.itemHeading}>Notes</Text>
                <Text style={styles.itemBody}>{notes}</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
}
