import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import dayjs from "dayjs";

const AppointmentModal = ({
  showAppointmentModal,
  selectedDay,
  setShowAppointmentModal,
}: {
  showAppointmentModal: boolean;
  selectedDay: dayjs.Dayjs;
  setShowAppointmentModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCloseModal = () => {
    setShowAppointmentModal(false);
  };

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
          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: "auto" }}>
              Create appointment
            </Typography>
            <IconButton>
              <DeleteOutlineOutlinedIcon color="error" sx={{ fontSize: 24 }} />
            </IconButton>
            <IconButton onClick={handleCloseModal}>
              <CloseOutlinedIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack component="form" spacing={2} sx={{}}>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <BadgeOutlinedIcon sx={{ color: "gray.main" }} />
              <TextField
                // label="Patient"
                placeholder="patient id or email..."
                variant="standard"
                sx={{ flex: "1" }}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <BadgeOutlinedIcon sx={{ color: "gray.main" }} />
              <TextField
                label="Appoint to "
                placeholder="employee id or email..."
                variant="standard"
                sx={{ flex: "1" }}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <BadgeOutlinedIcon sx={{ color: "gray.main" }} />
              <TextField label="Room " variant="standard" sx={{ flex: "1" }} />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <AccessTimeOutlinedIcon sx={{ color: "gray.main" }} />
              <TextField
                label="Date"
                variant="standard"
                sx={{ flex: "1" }}
                // defaultValue={dayjs().day(selectedDay).fo}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <DescriptionOutlinedIcon sx={{ color: "gray.main" }} />
              <TextField
                label="Reason for appointment"
                variant="standard"
                sx={{ flex: "1" }}
              />
            </Stack>
            <Divider />
            <Stack>
              <Button
                //   type="submit"
                variant="contained"
                // disabled={pending}
                sx={{ marginLeft: "auto" }}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
};
export default AppointmentModal;
