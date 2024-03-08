import { getFamilyMedicalHistoryByFamilyMedicalHistoryId } from "@/actions/patients/family-medical-history";

const page = async ({
  params: { familyMedicalHistoryId },
}: {
  params: { familyMedicalHistoryId: string };
}) => {
  const response = await getFamilyMedicalHistoryByFamilyMedicalHistoryId(
    familyMedicalHistoryId
  );

  const familyMedicalHistory = response.data;
  return <div>{JSON.stringify(familyMedicalHistory)}</div>;
};
export default page;
