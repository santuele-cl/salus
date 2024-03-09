import {
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

const AppointmentModal = ({
  showAppointmentModal,
  setShowAppointmentModal,
}: {
  showAppointmentModal: boolean;
  setShowAppointmentModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      open={showAppointmentModal}
      hideBackdrop
      onClose={() => setShowAppointmentModal(false)}
    >
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Paper sx={{ p: 2, width: 450 }} elevation={10}>
          <Typography variant="h6">Checkup Information</Typography>
          <Divider sx={{ my: 2 }} />
          <Stack component="form" spacing={2} sx={{}}>
            <TextField label="Accompanied by" />
            <TextField label="Accompanied by" />
            <TextField label="Accompanied by" />
            <Button
              variant="outlined"
              // disabled={pending}
              // sx={{ p: 2 }}
              onClick={() => setShowAppointmentModal(false)}
            >
              Cancel
            </Button>
            <Button
            //   type="submit"
            // variant="contained"
            // disabled={pending}
            // sx={{ p: 2 }}
            >
              Add
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
};
export default AppointmentModal;
