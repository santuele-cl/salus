import { getAllergyByAllergyId } from "@/actions/patients/allergies";

const AllergyPage = async ({
  params: { allergyId },
}: {
  params: { allergyId: string };
}) => {
  const allergy = await getAllergyByAllergyId(allergyId);
  return <div>{JSON.stringify(allergy.data)}</div>;
};
export default AllergyPage;
