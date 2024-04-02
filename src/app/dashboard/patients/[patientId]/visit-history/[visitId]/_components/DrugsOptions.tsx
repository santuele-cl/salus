import { Autocomplete, TextField } from "@mui/material";

const DrugsOptions = ({ options }: { options: any }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Drugs" />}
    />
  );
};
export default DrugsOptions;
