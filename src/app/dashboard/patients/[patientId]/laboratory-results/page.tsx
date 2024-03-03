import { getLaboratoryResultsByPatientId } from "@/actions/patients/laboratory-results";

const LaboratoryResults = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const labResults = await getLaboratoryResultsByPatientId(patientId);
  return <div>{JSON.stringify(labResults)}</div>;
};
export default LaboratoryResults;
