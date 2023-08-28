import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Loading from "../components/Loading";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { Snackbar } from "@mui/material";

function User() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [createUser, setCreateUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "division", label: "Division", minWidth: 80 },
    { id: "role", label: "Role", maxWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "phone", label: "Phone", minWidth: 100 },
    { id: "action", label: "action", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCreateUser(false);
    setOpen(false);
  };

  const handleClickOpenConfirmDelete = (id, index) => {
    axios
      .post(
        `http://127.0.0.1:8000/api/users/delete`,
        { id },
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        const updatedUsers = [...users];
        updatedUsers.splice(index, 1);
        setUsers(updatedUsers);
        setOpen(true);
        setError("User deleted successfully.");
      })
      .catch((e) => {
        setOpen(true);
        setError(e.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .post(`http://127.0.0.1:8000/api/login`, {
        email: "admin@gmail.com",
        password: "123123",
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      });

    axios
      .get(`http://127.0.0.1:8000/api/users`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const users = res.data.data.data.map((user, index) => {
          return {
            id: user.id,
            name: user.name,
            division: user?.division?.name,
            role: Object.values(user.role_text).map((role, index) => {
              return (
                <span key={index} className="badge bg-success mx-1">
                  {role.substring(0, 25)}
                </span>
              );
            }),
            email: user?.email,
            phone: user?.phone_number,
            action: (
              <div key={index}>
                <Link to={`/users/${user.id}`}>
                  <Button variant="contained" color="success" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleClickOpenConfirmDelete(user.id, index)}
                >
                  Delete
                </Button>
              </div>
            ),
          };
        });
        setUsers(users);
        setLoading(false);
      });
    setCreateUser(localStorage.getItem("create_user") === "true");
    localStorage.setItem("create_user", false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Snackbar open={open} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={createUser} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Create user Success!
        </Alert>
      </Snackbar>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Grid container justifyContent="flex-end" sx={{ my: 3, mr: 5 }}>
          <Link to="/users/create">
            <Button variant="contained">Add User</Button>
          </Link>
        </Grid>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default User;
