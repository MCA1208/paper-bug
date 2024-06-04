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

function page() {
  const [client, setClient] = useState();
  const [progress, setProgress] = useState(false);

  const columns = [
    { title: "id", field: "id", with: 50, hidden: true },
    { title: "Nombre", field: "name", with: 50 },
    { title: "Email", field: "email", with: 50 },
    {
      title: "Cliente",
      field: "clientid",
      with: 50,
      lookup: client,
      align: "center",
    },
    {
      title: "Password (min 6 digitos)",
      field: "password",
      with: 50,
      render: (rowData) => <p>{rowData.password.split("").map(() => "*")}</p>,
    },
  ];
  const [tableData, setTableData] = useState();

  useEffect(() => {
    handleGetUsers();
    handleClientCboBox();
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

    setProgress(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newRow.name,
        email: newRow.email,
        password: newRow.password,
        userTypeId: 2,
        clientid: newRow.clientid,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/createusersclient`,
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
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/getusersclient`,
      requestOptions
    )
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

  const handleClientCboBox = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/getclient`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const client = {};
          data.result.data.map((row) => (client[row.id] = row.name));
          setClient(client);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al obtener los clientes" + " " + data.result.data,
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
        USUARIOS CLIENTE
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
        localization={{
          pagination: {
            lastTooltip: "Última página",
            nextTooltip: "Siguiente página",
            previousTooltip: "Página anterior",
            firstTooltip: "Primer página",
            labelRowsPerPage: "Filas por página",
            labelRows: "Filas",
          },
          header: {
            actions: "Acción",
          },
          body: {
            addTooltip: "Agregar",
            editTooltip: "Editar",
          },
          toolbar: {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar",
          },
        }}
      />
    </Container>
  );
}

export default page;
