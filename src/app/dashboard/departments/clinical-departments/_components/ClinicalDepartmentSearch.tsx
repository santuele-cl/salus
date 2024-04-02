"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Stack, TextField } from "@mui/material";

export default function ClinicalDepartmentSearch({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Stack>
      <TextField
        fullWidth
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        label={placeholder}
        InputProps={{ endAdornment: <SearchOutlinedIcon /> }}
        size="small"
      />
    </Stack>
  );
}
