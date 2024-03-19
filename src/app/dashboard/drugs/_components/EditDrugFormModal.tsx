"use client";
import { IconButton, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { DrugCategory, DrugForm, Drugs, Prisma } from "@prisma/client";
import EditDrugForm from "./EditDrugForm";
import { getDrugCatergories } from "@/actions/drugs/drug-category";
import { getDrugForms } from "@/actions/drugs/drug-form";

type DrugWithFormAndCategory = Prisma.DrugsGetPayload<{
  include: { drugForm: true; drugCategory: true };
}>;

export default function EditDrugFormModal({
  drug,
}: {
  drug: DrugWithFormAndCategory;
}) {
  const [open, setOpen] = useState(false);

  const [drugCategories, setDrugCategories] = useState<DrugCategory[]>();
  const [drugForms, setDrugForms] = useState<DrugForm[]>();

  useEffect(() => {
    async function fetchDrugCategores() {
      const response = await getDrugCatergories();
      if (response.data) setDrugCategories(response.data);
    }

    async function fetchDrugForms() {
      const response = await getDrugForms();
      if (response.data) setDrugForms(response.data);
    }

    fetchDrugCategores();
    fetchDrugForms();
  }, []);

  return (
    <Stack>
      <IconButton onClick={() => setOpen(true)}>
        <ModeEditOutlinedIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          {drugForms &&
          drugCategories &&
          drugForms.length &&
          drugCategories.length ? (
            <EditDrugForm
              setOpen={setOpen}
              drug={drug}
              drugCategories={drugCategories}
              drugForms={drugForms}
            />
          ) : (
            <Typography>Loading</Typography>
          )}
          {/* <EditServiceDepartmentForm
            setOpen={setOpen}
            serviceDepartment={serviceDepartment}
          /> */}
        </Stack>
      </Modal>
    </Stack>
  );
}
