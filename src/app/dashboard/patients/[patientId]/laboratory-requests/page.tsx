import { getLaboratoryResultsByPatientId } from "@/actions/patients/laboratory-results";

const LaboratoryRequestsPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const labResults = await getLaboratoryResultsByPatientId(patientId);
  return <div>{JSON.stringify(labResults)}</div>;
};
export default LaboratoryRequestsPage;
