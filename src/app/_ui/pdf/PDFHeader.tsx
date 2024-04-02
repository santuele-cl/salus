"use client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import Logo from "../../../../public/tpdh-logo.jpg";

export const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "30px",
  },
  image: {
    width: "50px",
    height: "50px",
  },
  heading: { fontWeight: 900, fontSize: "14px" },
  body: { fontSize: "10px" },
});

export default function PDFHeader() {
  console.log(Logo);
  return (
    <View style={styles.header}>
      <Image src={Logo.src} style={styles.image} />
      {/* <Text>LOGO</Text> */}
      <View>
        <Text style={styles.heading}>TAGUIG-PATEROS DISTRICT HOSPITAL</Text>
        <Text style={styles.body}>PHIC Accredited Level 1 Hospital</Text>
        <Text style={styles.body}>
          East Service Road, Western Bicutan, Taguig City
        </Text>
        <Text style={styles.body}>Tel No. 8838-3485</Text>
      </View>
    </View>
  );
}
