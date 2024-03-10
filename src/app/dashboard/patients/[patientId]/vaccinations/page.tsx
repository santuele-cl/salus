import { getVaccinationsByPatientId } from "@/actions/patients/vaccinations";
import GeneralTable from "../_components/GeneralTable";

const VaccinationsPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const vaccination = await getVaccinationsByPatientId(patientId);
  const columns = [
    { id: "id", label: "ID" },
    { id: "vaccineName", label: "Vaccine name" },
    { id: "dosage", label: "Dosage" },
    { id: "nextDueDate", label: "Next appointment ", type: "date" },
  ];
  return (
    <div>
      <GeneralTable
        columns={columns}
        data={vaccination.data}
        baseUrl={`/dashboard/patients/${patientId}/vaccinations`}
      />
    </div>
  );
};
export default VaccinationsPage;
