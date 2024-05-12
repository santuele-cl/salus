import { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { deleteAppointment } from "@/actions/appointment";

export default function EventModal({
  showEventModal,
  setShowEventModal,
  selectedEvent,
}: {
  selectedEvent: any;
  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;
}) {
  const handleDelete = async (id: string) => {
    const response = await deleteAppointment(id);
    if (response.success) setShowEventModal(false);
  };
  return (
    <Modal
      open={showEventModal}
      hideBackdrop
      onClose={() => setShowEventModal(false)}
    >
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Paper
          sx={{ p: 4, width: 450, border: "1px solid rgba(0,0,0,0.2)" }}
          elevation={10}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: "auto" }}>
              {selectedEvent?.title}
            </Typography>

            <IconButton onClick={() => setShowEventModal(false)}>
              <CloseOutlinedIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack sx={{ borderRadius: "10px" }}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{}} component="span">
                Patient :{" "}
              </Typography>
              <Typography
                component="span"
                sx={{ textTransform: "uppercase" }}
              >{` ${selectedEvent?.patient?.fname} ${selectedEvent?.patient?.lname}`}</Typography>
            </Stack>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography sx={{}} component="span">
                {" "}
                Assign to :{" "}
              </Typography>
              <Typography
                component="span"
                sx={{ textTransform: "uppercase" }}
              >{` ${selectedEvent?.employee?.fname} ${selectedEvent?.employee?.lname}`}</Typography>
            </Stack>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography sx={{}} component="span">
                Room :
              </Typography>
              <Typography
                component="span"
                sx={{ textTransform: "uppercase" }}
              >{` ${selectedEvent?.room}`}</Typography>
            </Stack>

            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{}} component="span">
                Reason :
              </Typography>
              <Typography
                component="span"
                sx={{ textTransform: "uppercase" }}
              >{` ${selectedEvent?.reason}`}</Typography>
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{}} component="span">
                Status :
              </Typography>
              <Typography
                component="span"
                sx={{ textTransform: "uppercase" }}
              >{` ${selectedEvent?.status}`}</Typography>
            </Stack>
            <Stack sx={{ marginTop: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(selectedEvent?.id)}
                sx={{ marginLeft: "auto" }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
}
