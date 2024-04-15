"use client";
import React from "react";
import NavBar from "../navbar/NavBar";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Container,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function page() {
  const dataEspecialist = [
    {
      id: 1,
      descriptions: "Frontend",
    },
    {
      id: 2,
      descriptions: "Backend",
    },
    {
      id: 3,
      descriptions: "Frontend && Backend",
    },
  ];
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    rol: 0,
  });
  const { firstname, lastname, rol } = formData;

  const handleOnchange = (e) => {
    console.log([e.target.name], e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (firstname, lastname, rol) => {
    console.log(firstname, lastname, rol);
    setLoading(true);
    alert(`datos formularios:::, ${firstname}, ${lastname}, ${rol}`);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const modifyuser = () => {
    if (password == "" || repeat == "") {
      Swal.fire({
        title: "Error!",
        text: "Los campos no pueden estas vacios",
        icon: "error",
        confirmButtonText: "Cerrar",
        //timer: 3000
      });
      return true;
    } else if (password != repeat) {
      Swal.fire({
        title: "Error!",
        text: "No coicide la contraseñas",
        icon: "error",
        confirmButtonText: "Cerrar",
        timer: 3000,
      });
      //alert('No coicide la contraseñas')
      return true;
    } else if (password.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "La contraseña debe tener mas de 6 caracteres",
        icon: "error",
        confirmButtonText: "Cerrar",
        timer: 3000,
      });
      return true;
    }

    alert("modificar");
  };

  return (
    <Container>
      <NavBar />
      <div className="App">
        <header className="App-header">
          <Typography
            component="h5"
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            USUARIO
          </Typography>
          <Box my={2}>
            <Card>
              <CardContent>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      error={false}
                      label="First Name"
                      type="text"
                      name="firstname"
                      value={firstname}
                      onChange={handleOnchange}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      helperText="Campo obligatorio"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <TextField
                      error={false}
                      label="Last Name"
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={handleOnchange}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      helperText="Campo obligatorio"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">
                        Rol Develop
                      </InputLabel>
                      <Select
                        name="rol"
                        value={rol}
                        fullWidth
                        label="Rol Develop"
                        onChange={handleOnchange}
                      >
                        <MenuItem value={0}>Seleccione</MenuItem>
                        {dataEspecialist &&
                          dataEspecialist.map((d, index) => (
                            <MenuItem key={d.id} value={d.id}>
                              {d.descriptions}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box sx={{ "& > button": { m: 1 } }}>
                      <LoadingButton
                        size="small"
                        onClick={() => handleSubmit(firstname, lastname, rol)}
                        loading={loading}
                        variant="outlined"
                        disabled={!loading ? false : true}
                      >
                        Enviar
                      </LoadingButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </header>
      </div>
    </Container>
  );
}

export default page;
