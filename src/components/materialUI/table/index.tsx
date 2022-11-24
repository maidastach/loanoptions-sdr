import { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Zoom from "@mui/material/Zoom";
import Container from "@mui/material/Container";
import { TableData } from "../../../interfaces";
import { theme } from "../theme";

const HEAD_CELLS = [
  "Name",
  "State-Province",
  "Country",
  "Domains",
  "Web Pages",
  "Alpha Two Code",
];

export const CustomMaterialTable = ({ rows }: { rows: TableData[] }) => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(false);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage((prev) => 0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setChecked(false);
    setPage(newPage);
  };

  useEffect(() => {
    if (tableRef.current) tableRef.current.scrollIntoView();
    setChecked(true);
  }, [page, rowsPerPage]);

  return (
    <Zoom in={true} style={{ transitionDelay: "0", transitionDuration: "2s" }}>
      <Container disableGutters={true}>
        <TableContainer
          sx={{
            "&::-webkit-scrollbar": {
              width: 10,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#ff8a00",
              borderRadius: 2,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.secondary.dark,
              borderRadius: 2,
            },
            height: "70vh",
          }}
          component={Paper}
        >
          <Table stickyHeader aria-label="sticky table" ref={tableRef}>
            <TableHead>
              <TableRow>
                {HEAD_CELLS.map((cell, idx) => (
                  <TableCell
                    align={!!idx ? "right" : "left"}
                    key={cell}
                    sx={{
                      backgroundColor: "black",
                      color: theme.palette.warning.dark,
                      fontWeight: !idx ? "bold" : "lighter",
                      left: 0,
                      position: "sticky",
                      zIndex: !idx ? 3 : 2,
                    }}
                  >
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
                      key={name + idx}
                    >
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            backgroundColor: theme.palette.primary.dark,
                            color: theme.palette.secondary.dark,
                            fontWeight: "bold",
                            left: 0,
                            position: "sticky",
                            zIndex: 2,
                          }}
                          component="th"
                          scope="row"
                        >
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
      </Container>
    </Zoom>
  );
};
