import { getAllergiesByPatientId } from "@/actions/patients/allergies";
import GeneralTable from "../_components/GeneralTable";

const AllergiesPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const allergies = await getAllergiesByPatientId(patientId);
  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "severity", label: "Severity" },
    { id: "createdAt", label: "Date diagnosed ", type: "date" },
  ];
  return (
    <div>
      <GeneralTable
        columns={columns}
        data={allergies.data}
        baseUrl={`/dashboard/patients/${patientId}/allergies`}
      />
    </div>
  );
};
export default AllergiesPage;
