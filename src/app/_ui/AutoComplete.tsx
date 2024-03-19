import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface AutoCompleteProps {
  control: any;
  options: any;
  name: string;
  labelIdentifier: string;
  valueIdentifier: string;
  defaultValueId?: string;
  fieldLabel: string;
}

export default function AutoComplete({
  control,
  options,
  name,
  labelIdentifier,
  valueIdentifier,
  fieldLabel,
  defaultValueId,
}: AutoCompleteProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "required field",
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, onChange, ref } = field;
        return (
          <Autocomplete
            defaultValue={options.find(
              (option: any) => option[valueIdentifier] === defaultValueId
            )}
            getOptionLabel={(option) => option[labelIdentifier]}
            options={options}
            value={
              value
                ? options.find(
                    (option: any) => option[valueIdentifier] === value
                  ) ?? null
                : null
            }
            onChange={(event: any, newValue) => {
              onChange(newValue ? newValue[valueIdentifier] : null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={fieldLabel}
                inputRef={ref}
                helperText={error?.message}
                error={!!error}
              />
            )}
          />
        );
      }}
    />
  );
}
