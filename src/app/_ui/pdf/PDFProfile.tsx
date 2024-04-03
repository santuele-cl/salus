"use client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import Logo from "../../../../public/tpdh-logo.jpg";
import { Patient } from "@prisma/client";
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

export default function PDFProfile({ profile }: { profile: Patient }) {
  const {
    id,
    fname,
    mname = "",
    lname,
    nameSuffix,
    gender,
    age,
    bdate,
    bplace,
    civilStatus,
    occupation,
  } = profile;

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Patient ID</Text>
        <Text style={styles.item}>{id}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Name</Text>
        <Text style={styles.item}>{`${lname}, ${fname} ${mname} ${
          nameSuffix ? nameSuffix : ""
        }`}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Gender</Text>
        <Text style={styles.item}>{gender}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Age</Text>
        <Text style={styles.item}>{age}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Birthday</Text>
        <Text style={styles.item}>{dayjs(bdate).format("MMMM DD, YYYY")}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Birth Place</Text>
        <Text style={styles.item}>{bplace}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Civil Status</Text>
        <Text style={styles.item}>{civilStatus}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemHeading}>Occupation</Text>
        <Text style={styles.item}>{occupation}</Text>
      </View>
    </View>
  );
}
