"use client";
import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import AddEmployeeMultiStepForm from "./AddEmployeeMultiStepForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  borderRadius: 2,
};

const AddEmployeeFormModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <Box sx={style}>
        <AddEmployeeMultiStepForm />
      </Box>
    </Modal>
  );
};
export default AddEmployeeFormModal;
