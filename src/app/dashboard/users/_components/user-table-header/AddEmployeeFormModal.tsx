"use client";
import { RegisterEmployeeSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Gender } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddEmployeeMultiStepForm from "./AddEmployeeMultiStepForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  bgcolor: "background.paper",
  //   boxShadow: 2,
  borderRadius: 2,
  //   p: 4,
};

interface EmployeeRegistrationFieldType {
  id: keyof z.infer<typeof RegisterEmployeeSchema>;
  label: string;
  type?: string;
}

const GENDER_OPTIONS = Object.keys(Gender) as Array<Gender>;

const fields: EmployeeRegistrationFieldType[] = [
  { id: "fname", label: "First Name" },
  { id: "mname", label: "Middle Name" },
  { id: "lname", label: "Last Name" },
  { id: "phone", label: "Phone number" },
  { id: "username", label: "Username" },
  { id: "email", label: "email", type: "email" },
  { id: "password", label: "Password" },
];

const AddEmployeeFormModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const session = useSession();

  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(RegisterEmployeeSchema),
    defaultValues: {
      fname: "",
      mname: "",
      lname: "",
      phone: "",
      consent: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    // console.log("values", values);
    console.log("prescription values", values);
    const parse = RegisterEmployeeSchema.safeParse(values);

    if (!parse.success) console.log("parse error");
    else console.log("parse data", parse.data);

    // setError("");
    // setSuccess("");

    // setPending(true);

    // try {
    //   const res = await addPrescription(values);
    //   if (res?.error) {
    //     reset();
    //     setError(res.error);
    //   }
    //   if (res?.success) {
    //     reset();
    //     setSuccess(res.success);
    //   }
    // } catch {
    //   setError("Something went asd wrong!");
    // } finally {
    //   setPending(false);
    // }
  };
  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <Box sx={style}>
        <AddEmployeeMultiStepForm />
      </Box>
    </Modal>
  );
};
export default AddEmployeeFormModal;
