import { Diagnosis } from "@prisma/client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  itemContainer: {
    padding: "4px",
    gap: "3px",
  },
  physicalExamBox: { display: "flex", flexDirection: "row", gap: "8px" },
  partBox: { flex: "1 0 30%" },
  contextBox: { flex: "1 1 70%" },
  item: {
    fontSize: "10px",
    color: "rgba(0,0,0,0.8)",
    textTransform: "uppercase",
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: "9px",
  },
});
export default function PDFDiagnoses({
  diagnoses,
}: {
  diagnoses: Diagnosis[];
}) {
  return (
    <View>
      {diagnoses &&
        diagnoses.map((diagnosis) => {
          const { condition, treatment, diagnosisDate, id } = diagnosis;
          return (
            <View style={styles.itemContainer} key={id}>
              <View style={styles.physicalExamBox}>
                <View style={styles.partBox}>
                  <Text style={styles.itemHeading}>Condition</Text>
                  <Text style={styles.item}>{condition}</Text>
                </View>
                <View style={styles.contextBox}>
                  <Text style={styles.itemHeading}>treatment</Text>
                  <Text style={styles.item}>{treatment}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
}
