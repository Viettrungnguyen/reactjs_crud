import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Typography } from "@mui/material";

function UserCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState([]);
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState();
  const [joinDate, setJoinDate] = useState("2022-04-17");
  const [error, setError] = useState("");

  const [listStatus, setListStatus] = useState([
    { text: "Intern", value: 0 },
    { text: "Probation", value: 1 },
    { text: "Official", value: 2 },
    { text: "Left", value: 3 },
    { text: "Ex-Official", value: 4 },
    { text: "Rm-Official", value: 5 },
  ]);
  const [listRoles, setListRoles] = useState();
  const [open, setOpen] = useState(false);

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
      .get(`http://127.0.0.1:8000/api/roles`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const roles = res.data.data.map((role) => {
          return {
            label: role.name,
            value: role.id,
          };
        });
        setListRoles(roles);
        setLoading(false);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const saveUser = () => {
    const data = {
      name,
      email,
      password,
      status,
      roles: roles.map((role) => role.value),
      join_date: joinDate,
    };
    axios
      .post(`http://127.0.0.1:8000/api/users`, data, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("create_user", true);
        setOpen(true);
        navigate("/users");
      })
      .catch((e) => {
        setError(e.response.data.message);
        setOpen(true);
      });
  };

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
      <Stack
        component="form"
        sx={{
          mt: 5,
          mx: "auto",
          width: "75ch",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h1" textAlign="center" gutterBottom>
          Create User
        </Typography>
        <TextField
          id="name"
          label="Name"
          onChange={(event) => setName(event.target.value)}
          variant="outlined"
        />
        <TextField
          id="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <Autocomplete
          multiple
          id="roles"
          options={listRoles}
          onChange={(event, newValue) => setRoles(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Role" placeholder="Choose roles" />
          )}
        />

        <FormControl>
          <FormLabel id="status">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="status"
            name="user-status"
            onChange={(event) => setStatus(event.target.value)}
          >
            {listStatus.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio />}
                  label={item.text}
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Join Date"
              value={dayjs(joinDate)}
              format="YYYY-MM-DD"
              onChange={(newValue) =>
                setJoinDate(newValue.format("YYYY-MM-DD"))
              }
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" onClick={() => saveUser()}>
          Save User
        </Button>
      </Stack>
    </>
  );
}
export default UserCreate;
