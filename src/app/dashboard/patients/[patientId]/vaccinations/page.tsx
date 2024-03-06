import { getVaccinationsByPatientId } from "@/actions/patients/vaccinations";
import GeneralTable from "../_components/GeneralTable";

const VaccinationsPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const allergies = await getVaccinationsByPatientId(patientId);
  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "vaccine", label: "Vaccine name" },
    { id: "dosage", label: "dosage"}
  ];
  return (
    <div>
      <GeneralTable
        columns={columns}
        data={allergies.data}
        baseUrl={`/dashboard/patients/${patientId}/vaccinations`}
      />
    </div>
  );
};
export default VaccinationsPage;
