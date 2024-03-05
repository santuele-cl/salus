import { getAllergiesByPatientId } from "@/actions/patients/allergies";
import { getPrescriptionsByPatientId } from "@/actions/patients/prescriptions";
import GeneralTable from "../_components/GeneralTable";

const PrescriptionsPage = async ({
  params: { patientId },
}: {
  params: { patientId: string };
}) => {
  const prescription = await getPrescriptionsByPatientId(patientId);
  const columns = [
    // { id: "id", label: "ID" },
    { id: "drug", label: "Drug" },
    { id: "createdAt", label: "Date diagnosed ", type: "date" },
  ];
  return (
    <div>
      <GeneralTable
        data={prescription.data}
        columns={columns}
        baseUrl={`/dashboard/patients/${patientId}/prescriptions`}
      />
    </div>
  );
};
export default PrescriptionsPage;
