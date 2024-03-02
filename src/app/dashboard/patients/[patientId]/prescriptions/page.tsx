import { getAllergiesByPatientId } from "@/actions/patients/allergies";
import { getPrescriptionsByPatientId } from "@/actions/patients/prescriptions";

const PrescriptionsPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const prescription = await getPrescriptionsByPatientId(patientId);
  return <div>{JSON.stringify(prescription)}</div>;
};
export default PrescriptionsPage;
