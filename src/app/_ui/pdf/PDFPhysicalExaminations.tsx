"use client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import Logo from "../../../../public/tpdh-logo.jpg";
import { Patient, PhysicalExamination, Vitals } from "@prisma/client";
import dayjs from "dayjs";

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

export default function PDFPhysicalExaminations({
  physicalExaminations,
}: {
  physicalExaminations: PhysicalExamination[];
}) {
  return (
    <View>
      {physicalExaminations &&
        physicalExaminations.map((physicalExamination) => {
          const { physicalPart, isNormal, remarks, specifyIfOther, id } =
            physicalExamination;
          return (
            <View style={styles.itemContainer} key={id}>
              <View style={styles.physicalExamBox}>
                <View style={styles.partBox}>
                  <Text style={styles.itemHeading}>Part</Text>
                  <Text style={styles.item}>
                    {physicalPart ? physicalPart : specifyIfOther}
                  </Text>
                </View>
                <View style={styles.contextBox}>
                  <Text style={styles.itemHeading}>Remarks</Text>
                  <Text style={styles.item}>{`${
                    isNormal ? "Normal" : " "
                  } ${remarks}`}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
}
