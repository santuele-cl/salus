"use client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import Logo from "../../../../public/tpdh-logo.jpg";
import { Patient, Prisma } from "@prisma/client";
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

type Visit = Prisma.VisitGetPayload<{
  include: {
    patient: true;
    vitals: true;
    diagnosis: {
      include: {
        physician: true;
      };
    };
    prescriptions: {
      include: { drugs: true; physician: true };
    };
    laboratoryRequest: {
      include: {
        laboratoryProcedure: true;
        requestingPhysician: {
          include: {
            profile: {
              select: {
                employee: {
                  select: {
                    fname: true;
                    lname: true;
                    employeeRole: { select: { roleName: true } };
                  };
                };
              };
            };
          };
        };
      };
    };
    physicalExamination: true;
    serviceDepartment: true;
  };
}>;

export default function PDFCheckupInfo({ visitData }: { visitData: any }) {
  return <View style={styles.container}></View>;
}
