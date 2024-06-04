"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import MaterialTable from "@material-table/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { dictionary } from "../../constants/dictionary";
import { Typography, Container, Select, MenuItem } from "@mui/material";
import "../../globals.css";
import Swal from "sweetalert2";
import { type } from "os";
import { Password } from "@mui/icons-material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Placeholder } from "react-bootstrap";
import usePlaceholder from "react-bootstrap/esm/usePlaceholder";

function page() {
  const [country, setCountry] = useState();
  const [province, setProvince] = useState();
  const [activity, setActivity] = useState();
  const [progress, setProgress] = useState(false);

  const columns = [
    { title: "id", field: "id", with: 50, hidden: true },
    { title: "Nombre", field: "name", with: 50 },
    { title: "Email", field: "email", with: 50 },
    {
      title: "Administrador",
      field: "isadmin",
      with: 50,
      lookup: {
        false: "NO",
        true: "SI",
      },
      align: "center",
    },
    {
      title: "Password (min 6 digitos)",
      field: "password",
      with: 50,
      usePlaceholder: "dsasd",
      render: (rowData) => <p>{rowData.password.split("").map(() => "*")}</p>,
    },
  ];
  const [tableData, setTableData] = useState();

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleRowDelete = (rowData) => {
    Swal.fire({
      title: "Confirma eliminar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: rowData.id,
            userId: sessionStorage.getItem("id"),
          }),
        };
        await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/deleteuser`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.result.status == true) {
              Swal.fire({
                icon: "success",
                title: "Se eliminó el usuario con éxito!",
                showConfirmButton: false,
                timer: 3000,
              });
              handleGetUsers();
            } else {
              Swal.fire({
                title: "Error!",
                text: "error al crear el proveedor" + " " + data.result.data,
                icon: "error",
                confirmButtonText: "Cerrar",
                timer: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "error en la solicitud" + " " + data.result.data,
              icon: "error",
              confirmButtonText: "Cerrar",
              timer: 3000,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("No se guardo los cambios", "", "info");
      }
    });
  };

  const handleRowAdd = async (newRow) => {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (!validEmail.test(newRow.email)) {
      Swal.fire({
        title: "Error!",
        text: "El email ingresado es invalido",
        icon: "error",
        confirmButtonText: "Cerrar",
        timer: 6000,
      });
      return;
    }
    if (newRow.password.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "La contraseña debe tener mas de 6 caracteres",
        icon: "error",
        confirmButtonText: "Cerrar",
        timer: 6000,
      });
      return;
    }

    setProgress(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newRow.id,
        name: newRow.name,
        email: newRow.email,
        password: newRow.password,
        userTypeId: 1,
        isAdmin: newRow.isadmin,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/createusers`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          Swal.fire({
            icon: "success",
            title: "Se creó el usuario con éxito!",
            showConfirmButton: false,
            timer: 3000,
          });
          handleGetUsers();
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al crear el cliente" + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 3000,
          });
          setProgress(false);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "error en la solicitud" + " " + data.result.data,
          icon: "error",
          confirmButtonText: "Cerrar",
          timer: 3000,
        });
        setProgress(false);
      });
  };

  const handleRowUpdate = async (newRow, oldRow) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newRow.id,
        name: newRow.name,
        email: newRow.email,
        password: newRow.password,
        userTypeId: 1,
        isAdmin: newRow.isadmin,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/modifyuser`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          Swal.fire({
            icon: "success",
            title: "Se actualizó el usuario con éxito!",
            showConfirmButton: false,
            timer: 6000,
          });
          handleGetUsers();
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al modificar el usuario" + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 6000,
          });
          setProgress(false);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: "error en la solicitud" + " " + data.result.data,
          icon: "error",
          confirmButtonText: "Cerrar",
          timer: 6000,
        });
        setProgress(false);
      });
  };

  const handleGetUsers = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/getusers`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const userList = data.result.data.map((row) => row);
          setTableData(userList);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error: " + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: `error en la solicitud: ${error}`,
          icon: "error",
          confirmButtonText: "Cerrar",
          timer: 3000,
        });
      });
  };

  return (
    <Container>
      <NavBar />
      <Typography
        component="h5"
        variant="h5"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
          backgroundColor: "black",
          borderRadius: "10px",
        }}
      >
        USUARIOS
      </Typography>
      <MaterialTable
        columns={columns}
        data={tableData}
        title=""
        editable={{
          onRowAdd: handleRowAdd,
          onRowUpdate: handleRowUpdate,
        }}
        actions={[
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete",
            onClick: (e, data) => handleRowDelete(data),
          },
        ]}
        options={{
          filtering: true,
          addRowPosition: "first",
        }}
      />
    </Container>
  );
}

export default page;
