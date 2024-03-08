import { getSocialHistoriesByPatientId } from "@/actions/patients/social-history";

const SocialHistories = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const response = await getSocialHistoriesByPatientId(patientId);
  const socialHistories = response.data;

  return <div>{JSON.stringify(socialHistories)}</div>;
};
export default SocialHistories;
