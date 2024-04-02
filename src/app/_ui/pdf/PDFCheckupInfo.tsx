import { Visit } from "@prisma/client";
import { StyleSheet, Text, View } from "@react-pdf/renderer";
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
    flex: "1 0 50%",
    gap: "3px",
    border: "1px solid gray",
  },

  heading: { fontWeight: 900, fontSize: "10px" },
  body: {
    fontSize: "8px",
    color: "rgba(0,0,0,0.8)",
    textTransform: "uppercase",
  },
});

export default function PDFCheckupInfo({ visit }: { visit: Partial<Visit> }) {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.heading}>Checkup Date</Text>
        <Text style={styles.body}>
          {visit.createdAt ? dayjs(visit.createdAt).format("MMM DD, YYYY") : ""}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.heading}>Chief Complaint</Text>
        <Text style={styles.body}>{visit.chiefComplaint}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.heading}>HPI</Text>
        <Text
          style={{
            fontSize: "8px",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          {visit.hpi}
        </Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.heading}>Accompanied By</Text>
        <Text style={styles.body}>{visit.accompaniedBy}</Text>
      </View>
    </View>
  );
}
