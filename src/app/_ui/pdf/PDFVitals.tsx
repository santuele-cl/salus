"use client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import Logo from "../../../../public/tpdh-logo.jpg";
import { Patient, Vitals } from "@prisma/client";
import dayjs from "dayjs";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // gap: "12px",
    // marginBottom: "30px",
  },
  itemContainer: {
    padding: "4px",
    flex: "1 0 25%",
    gap: "3px",
    border: "1px solid rgba(0,0,0,0.2)",
  },
  item: {
    fontSize: "10px",
    color: "rgba(0,0,0,0.8)",
    textTransform: "uppercase",
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: "9px",
  },
  image: {
    width: "50px",
    height: "50px",
  },
  heading: { fontWeight: 900, fontSize: "14px" },
  body: { fontSize: "10px" },
});

export default function PDFVitals({ vitals }: { vitals: any }) {
  const {
    heightInCm,
    weightInKg,
    bloodPressure,
    pulseRate,
    respiratoryRate,
    bodyTemperatureInCelsius,
    oxygenSaturation,
    checkedById,
  } = vitals;
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Height</Text>
        <Text style={styles.item}>{heightInCm}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Weight</Text>
        <Text style={styles.item}>{weightInKg}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Temperature</Text>
        <Text style={styles.item}>{bodyTemperatureInCelsius}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>BP</Text>
        <Text style={styles.item}>{bloodPressure}</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Pulse Rate</Text>
        <Text style={styles.item}>{pulseRate}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Respiratory Rate</Text>
        <Text style={styles.item}>{respiratoryRate}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>O2 Sat</Text>
        <Text style={styles.item}>{oxygenSaturation}</Text>
      </View>
    </View>
  );
}
