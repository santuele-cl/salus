import { getDiagnosisByDiagnosisId } from "@/actions/patients/diagnosis";

const DiagnosisPage = async ({
  params: { diagnosisId },
}: {
  params: { diagnosisId: string };
}) => {
  const diagnosis = await getDiagnosisByDiagnosisId(diagnosisId);
  console.log(diagnosis.data);
  return <div>{JSON.stringify(diagnosis.data)}</div>;
};
export default DiagnosisPage;
