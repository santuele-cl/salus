import {
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Dayjs } from "dayjs";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { createAppointment } from "@/actions/appointment";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AppointmentSchema } from "@/app/_schemas/zod/schema";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import { AppointmentStatus } from "@prisma/client";

const AppointmentStatusOption = Object.keys(
  AppointmentStatus
) as Array<AppointmentStatus>;

const SelectAppointmentFormModal = ({
  showAppointmentModal,
  setShowAppointmentModal,
  selectEndDate,
  setSelectEndDate,
  selectStartDate,
  setSelectStartDate,
}: {
  showAppointmentModal: boolean;
  selectEndDate: Dayjs | null;
  setSelectEndDate: Dispatch<SetStateAction<Dayjs | null>>;
  selectStartDate: Dayjs | null;
  setSelectStartDate: Dispatch<SetStateAction<Dayjs | null>>;
  setShowAppointmentModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      title: "",
      status: AppointmentStatus.SCHEDULED as AppointmentStatus,
      room: "",
      reason: "",
      startDate: selectStartDate,
      endDate: selectEndDate,
      patientId: "",
      employeeId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof AppointmentSchema>) => {
    // console.log(data)
    // setPending(true);
    // setError("");
    // setSuccess("");
    // try {
    //   const res = await createAppointment(data);
    //   console.log("res", res);
    //   if (res?.error) {
    //     reset();
    //     setError(res.error);
    //   }
    //   if (res?.success) {
    //     reset();
    //     setSuccess(res.success);
    //     setSelectStartDate(null),
    //       setSelectEndDate(null)
    //   }
    // } catch {
    //   setError("Something went asd wrong!");
    // } finally {
    //   setPending(false);
    // }
  };

  // console.log(errors);

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
              Appointment Form
            </Typography>

            <IconButton onClick={handleCloseModal}>
              <CloseOutlinedIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack
            component="form"
            spacing={2}
            sx={{ p: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <PersonOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
              <TextField
                placeholder="Title"
                sx={{ flex: "1" }}
                size="small"
                {...register("title")}
                error={errors.title ? true : false}
                helperText={errors.title?.message}
                disabled={pending}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <PersonOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
              <TextField
                placeholder="patient id or email"
                sx={{ flex: "1" }}
                size="small"
                {...register("patientId")}
                error={errors.patientId ? true : false}
                helperText={errors.patientId?.message}
                disabled={pending}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <AssignmentIndOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
              <TextField
                placeholder="Physician id or email"
                sx={{ flex: "1" }}
                size="small"
                {...register("employeeId")}
                error={errors.employeeId ? true : false}
                helperText={errors.employeeId?.message}
                disabled={pending}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <AutorenewOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
              <TextField
                select
                fullWidth
                label="Select"
                {...register("status")}
                error={errors.status ? true : false}
                helperText={errors.status?.message}
                disabled={pending}
              >
                {AppointmentStatusOption.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <BadgeOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
              <TextField
                placeholder="room number"
                sx={{ flex: "1" }}
                {...register("room")}
                error={errors.room ? true : false}
                helperText={errors.room?.message}
                disabled={pending}
                size="small"
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <AccessTimeOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />

              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <DateTimePicker {...field} />}
              />
            </Stack>
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                justifyContent: "flex-end",
              }}
            >
              <AccessTimeOutlinedIcon
                sx={{ color: "rgba(0,0,0,0.3)", opacity: "0" }}
              />

              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <DateTimePicker {...field} />}
              />
            </Stack>
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <DescriptionOutlinedIcon sx={{ color: "rgba(0,0,0,0.3)" }} />
              <TextField
                multiline
                label="Reason for appointment"
                variant="standard"
                sx={{ flex: "1" }}
                {...register("reason")}
                error={errors.reason ? true : false}
                helperText={errors.reason?.message}
                disabled={pending}
                size="small"
              />
            </Stack>
            <Stack>
              <Button
                type="submit"
                variant="contained"
                disabled={pending}
                sx={{ marginLeft: "auto" }}
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Modal>
  );
};
export default SelectAppointmentFormModal;
