import { getFamilyMedicalHistoriesByPatientID } from "@/actions/patients/family-medical-history";

const FamilyMedicalHistories = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const response = await getFamilyMedicalHistoriesByPatientID(patientId);
  const familyMedicalHistories = response.data;

  return <div>{JSON.stringify(familyMedicalHistories)}</div>;
};
export default FamilyMedicalHistories;
