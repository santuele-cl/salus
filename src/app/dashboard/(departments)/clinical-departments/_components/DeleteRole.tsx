import { deleteRole } from "@/actions/roles-and-permissions";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteClinicalDepartment } from "@/actions/departments/clinical-departments";

export default function DeleteClinicalDepartment({
  clinicalDepartmentId,
}: {
  clinicalDepartmentId: string;
}) {
  const deleteClinicalDepartmentWithId = deleteClinicalDepartment.bind(
    null,
    clinicalDepartmentId
  );
  return (
    <form action={deleteClinicalDepartmentWithId}>
      <IconButton type="submit" color="error">
        <DeleteOutlineOutlinedIcon color="error" />
      </IconButton>
    </form>
  );
}
