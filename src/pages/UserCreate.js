import axios from "axios";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
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

function UserCreate() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [value, setValue] = useState([]);
  const [email, setEmail] = useState();
  const [status, setStatus] = useState([
    { text: "Intern", value: 0 },
    { text: "Probation", value: 1 },
    { text: "Official", value: 2 },
    { text: "Left", value: 3 },
    { text: "Ex-Official", value: 4 },
    { text: "Rm-Official", value: 5 },
  ]);
  const [selectedValue, setSelectedValue] = useState("a");
  const [roles, setRoles] = useState();
  const [joinDate, setJoinDate] = useState(dayjs());

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
        setRoles(roles);
        setLoading(false);
      });
  }, []);

  // const handleInput2 = (e) => {
  //   console.log(e.target.);
  // };

  const saveUser = (e) => {
    e.preventDefault();
    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company,
    };

    axios.post().then();
  };

  const handleStatusChange = (event) => {
    setValue(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
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
      <TextField
        id="name"
        label="Name"
        onChange={(event) => setUser(event.target.value)}
        variant="outlined"
      />
      <TextField
        id="email"
        label="Email"
        onChange={(event) => setEmail(event.target.value)}
        variant="outlined"
      />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={roles}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
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
          onChange={(event) => setValue(event.target.value)}
        >
          {status.map((item, index) => {
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
            value={joinDate}
            onChange={(newValue) => {
              setJoinDate(newValue.format("YYYY-MM-DD"));
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button variant="contained">Save User</Button>
    </Stack>
  );
}
export default UserCreate;
