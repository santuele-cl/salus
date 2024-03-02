import { getAllergiesByPatientId } from "@/actions/patients/allergies";

const AllergiesPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const allergies = await getAllergiesByPatientId(patientId);
  console.log("allergies page ", patientId);
  return <div>{JSON.stringify(allergies)}</div>;
};
export default AllergiesPage;
