import { getFamilyMedicalHistoriesByPatientID } from "@/actions/patients/family-medical-history";
import GeneralTable from "../_components/GeneralTable";

const FamilyMedicalHistories = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const familyMedicalHistory = await getFamilyMedicalHistoriesByPatientID(patientId);
  const columns = [
    { id: "ageOfOnset", label: "Age of on set" },
    { id: "condition", label: "Condition"},
    { id: "createdAt", label: "Created on", type: "date"},
    { id: "updatedAt", label: "Last updated", type: "date"},
  ];

  return (
    <div>
      <GeneralTable
        columns={columns}
        data={familyMedicalHistory.data}
        baseUrl={`/dashboard/patients/${patientId}/family-medical-histories`}
      />
    </div>
  );
};
export default FamilyMedicalHistories;
