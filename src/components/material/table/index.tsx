import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Zoom from "@mui/material/Zoom";
import { TableData } from "../../../interfaces";

const HEAD_CELLS = [
  "Name",
  "State-Province",
  "Country",
  "Domains",
  "Web Pages",
  "Alpha Two Code",
];

export const CustomMaterialTable = ({ rows }: { rows: TableData[] }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setChecked(false);
    setPage(newPage);
  };

  useEffect(() => {
    setChecked(true);
  }, [page]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {HEAD_CELLS.map((cell, idx) => (
                <TableCell align={!!idx ? "right" : "left"} key={cell}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (
                  {
                    name,
                    alpha_two_code,
                    country,
                    domains,
                    web_pages,
                    "state-province": state_province,
                  },
                  idx
                ) => (
                  <Zoom
                    in={checked}
                    style={{ transitionDelay: `${idx * 5}0ms` }}
                  >
                    <TableRow
                      key={name + idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell align="right">{`${state_province}`}</TableCell>
                      <TableCell align="right">{country}</TableCell>
                      <TableCell align="right">
                        {domains.map((d) => (
                          <p key={d}>{d}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">
                        {web_pages.map((wp) => (
                          <p key={wp}>{wp}</p>
                        ))}
                      </TableCell>
                      <TableCell align="right">{alpha_two_code}</TableCell>
                    </TableRow>
                  </Zoom>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 10 ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 40, rows.length]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
};
