"use client";
import { DrugSchema } from "@/app/_schemas/zod/schema";
import FormStatusText from "@/app/_ui/auth/FormStatusText";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AutoComplete from "@/app/_ui/AutoComplete";
import { DrugCategory, DrugForm } from "@prisma/client";
import { getDrugCatergories } from "@/actions/drugs/drug-category";
import { getDrugForms } from "@/actions/drugs/drug-form";
import { addDrug } from "@/actions/drugs";

const fields = Object.keys(DrugSchema.shape) as Array<
  keyof z.infer<typeof DrugSchema>
>;

export default function AddDrugForm({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<z.infer<typeof DrugSchema>>({
    resolver: zodResolver(DrugSchema),
    defaultValues: {
      id: "",
      name: "",
      drugCategoryId: "",
      drugFormId: "",
      strength: "",
      manufacturer: "",
      priceInCents: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof DrugSchema>) => {
    setPending(true);
    setError("");
    setSuccess("");
    try {
      const res = await addDrug(data);
      console.log("res", res);
      if (res?.error) {
        reset();
        setError(res.error);
      }
      if (res?.success) {
        reset();
        setSuccess(res.success);
      }
    } catch {
      setError("Something went wrong!");
    } finally {
      setPending(false);
    }
  };

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
    <Paper sx={{ p: 3, width: 450 }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h6">New Drug</Typography>
        <IconButton onClick={() => setOpen(false)} color="error" size="small">
          <CloseOutlinedIcon fontSize="medium" />
        </IconButton>
      </Stack>

      <Divider sx={{ my: 2 }} />
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <TextField
          label="Drug ID"
          {...register("id")}
          error={errors.id ? true : false}
          helperText={errors.id?.message}
          // placeholder="123456"
          disabled={isSubmitting}
        />
        <TextField
          label="Drug Name"
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          disabled={isSubmitting}
        />
        {drugCategories && drugCategories.length ? (
          <AutoComplete
            control={control}
            name="drugCategoryId"
            fieldLabel="Drug Category"
            labelIdentifier="name"
            valueIdentifier="id"
            options={drugCategories}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ border: "1px solid rgba(0,0,0,0.1)", p: 2 }}
          >
            <Typography color="gray.main">Loading</Typography>
          </Stack>
        )}
        {drugForms && drugForms.length ? (
          <AutoComplete
            control={control}
            name="drugFormId"
            fieldLabel="Drug Form"
            labelIdentifier="name"
            valueIdentifier="id"
            options={drugForms}
          />
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ border: "1px solid rgba(0,0,0,0.1)", p: 2 }}
          >
            <Typography color="gray.main">Loading</Typography>
          </Stack>
        )}

        <TextField
          label="Drug Strength"
          {...register("strength")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          disabled={isSubmitting}
        />
        <TextField
          label="Drug Manufacturer"
          {...register("manufacturer")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          disabled={isSubmitting}
        />
        <TextField
          label="Drug Price (in cents)"
          type="number"
          {...register("priceInCents")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          disabled={isSubmitting}
        />

        {error && <FormStatusText message={error} status="error" />}
        {success && <FormStatusText message={success} status="success" />}
        <Button
          variant="outlined"
          disabled={isSubmitting}
          sx={{ p: 2 }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          sx={{ p: 2 }}
        >
          Add
        </Button>
      </Stack>
    </Paper>
  );
}
