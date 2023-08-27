import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
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

function User() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "division", label: "Division", minWidth: 80 },
    { id: "role", label: "Role", maxWidth: 100 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "phone", label: "Phone", minWidth: 100 },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = users;
  console.log(rows);

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
        const users = res.data.data.data.map((user) => {
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
          };
        });
        setUsers(users);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  // var UserDetails = "";
  // UserDetails = users.map((item, index) => {
  //   return (
  //     <tr key={index}>
  //       <td>{item.id}</td>
  //       <td>{item.name}</td>
  //       <td>{item?.division?.name}</td>
  //       <td>
  //         {Object.values(item.role_text).map((role, index) => {
  //           return (
  //             <span key={index} className="badge bg-success mx-1">
  //               {role.substring(0, 50)}
  //             </span>
  //           );
  //         })}
  //       </td>
  //       <td>{item.email}</td>
  //       <td>{item.phone_number}</td>
  //       <td>
  //         <Link to="/users/create" className="btn btn-success">
  //           Edit
  //         </Link>
  //       </td>
  //       <td>
  //         <Link to="/users/delete" className="btn btn-danger">
  //           Delete
  //         </Link>
  //       </td>
  //     </tr>
  //   );
  // });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default User;
