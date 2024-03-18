import { deleteRole } from "@/actions/roles-and-permissions";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const DeleteRole = ({ id }: { id: string }) => {
  const deleteRoleWithId = deleteRole.bind(null, id);
  return (
    <form action={deleteRoleWithId}>
      <IconButton type="submit" color="error">
        <DeleteOutlineOutlinedIcon color="error" />
      </IconButton>
    </form>
  );
};

export default DeleteRole;
