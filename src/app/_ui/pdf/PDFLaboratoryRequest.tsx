import {
  Diagnosis,
  LaboratoryRequest,
  Presciption,
  Prisma,
} from "@prisma/client";
import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    padding: "3px",
    marginLeft: "8px",
  },
  containerItems: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  itemHeading: {
    fontWeight: "bold",
    fontSize: "9px",
  },
  itemBody: {
    fontSize: "8px",
  },
  bullet: {
    fontSize: "18px",
  },
});

type LaboratoryRequestWithInclude = Prisma.LaboratoryRequestGetPayload<{
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
}>;

export default function PDFLaboratoryRequest({
  laboratoryRequests,
}: {
  laboratoryRequests: LaboratoryRequestWithInclude[];
}) {
  return (
    <View style={styles.container}>
      {laboratoryRequests &&
        laboratoryRequests.map((laboratoryRequest) => {
          const { laboratoryProcedure, id } = laboratoryRequest;
          return (
            <View key={id} style={styles.containerItems}>
              <Text style={styles.bullet}>.</Text>
              <Text style={styles.itemBody}>
                {laboratoryProcedure?.procedureName}
              </Text>
            </View>
          );
        })}
    </View>
  );
}
