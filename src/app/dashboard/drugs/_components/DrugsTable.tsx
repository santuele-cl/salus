import { getDrugs } from "@/actions/drugs";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import DeleteDrug from "./DeleteDrug";
import EditClinicalDepartmentFormModal from "../../departments/clinical-departments/_components/EditClinicalDepartmentFormModal";
import EditDrugFormModal from "./EditDrugFormModal";

type DrugWithFormAndCategory = Prisma.DrugsGetPayload<{
  include: { drugForm: true; drugCategory: true };
}>;

export default async function DrugsTable() {
  const response = await getDrugs();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, overflow: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              ID
            </TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
              Drug Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Manufacturer
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Price
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Category
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Form
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="left"
            >
              Last updated
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "0.9rem" }}
              align="right"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {response && response.data && response.data.length ? (
            response.data.map((drug: DrugWithFormAndCategory) => {
              const {
                id,
                updatedAt,
                name,
                drugCategory,
                drugForm,
                manufacturer,
                priceInCents,
                strength,
              } = drug;

              return (
                <TableRow
                  key={id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {id}
                  </TableCell>
                  <TableCell align="left">{name}</TableCell>
                  <TableCell align="left">{manufacturer}</TableCell>
                  <TableCell align="left">{priceInCents}</TableCell>
                  <TableCell align="left">{drugCategory?.name}</TableCell>
                  <TableCell align="left">{drugForm?.name}</TableCell>
                  <TableCell align="left">{`${dayjs(updatedAt).format(
                    "MMMM DD, YYYY hh:mm a"
                  )}`}</TableCell>
                  <TableCell align="right">
                    <Stack
                      sx={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <DeleteDrug drugId={id} drugName={name} />
                      <EditDrugFormModal drug={drug} />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0, p: 0 },
              }}
            >
              <TableCell component="th" scope="row"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
