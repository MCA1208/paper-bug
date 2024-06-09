"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import MaterialTable from "@material-table/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { dictionary } from "../../constants/dictionary";
import { Typography, Container } from "@mui/material";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function page() {
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const [progress, setProgress] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [rowid, setRowid] = React.useState(false);
  const [client, setClient] = React.useState(false);
  const [stateOrder, setStateOrder] = React.useState("");
  const [stateTracking, setStateTracking] = React.useState("");

  const columns = [
    { title: "id", field: "id", with: 50, hidden: true },
    {
      title: "Cliente",
      field: "clientid",
      with: 50,
      lookup: client,
      filterPlaceholder: "filtrar",
    },
    {
      title: "Estado",
      field: "stateordersid",
      with: 50,
      lookup: stateOrder,
      align: "center",
      cellStyle: {
        backgroundColor: "#99DFFF",
        color: "#000s",
        fontWeight: "bold",
      },

      filterPlaceholder: "filtrar",
    },
    {
      title: "Detalle",
      field: "detail",
      with: 50,
      filterPlaceholder: "filtrar",
    },
    {
      title: "Fecha inicio",
      field: "startdate",
      type: "date",
      with: 80,
      filtering: false,

      // render: (rowData) =>
      //   rowData && <input type="date" value={rowData.startdate}></input>,
    },
    {
      title: "Hora inicio",
      field: "starthour",
      with: 50,
      filtering: false,
      type: "time",
    },
    {
      title: "Fecha entrega",
      field: "enddate",
      with: 50,
      type: "date",
      filtering: false,
      dateSetting: { locale: "es-ES" },
    },
    {
      title: "Hora entrega",
      field: "endhour",
      with: 50,
      filtering: false,
      type: "time",
    },
    {
      title: "Tracking",
      // field: "tracking",
      with: 50,
      render: (rowData) =>
        rowData && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen(rowData.id)}
          >
            Tracking
          </Button>
        ),
      hiddenByColumnsButton: true,
    },
  ];
  const [tableData, setTableData] = useState();

  useEffect(() => {
    handleGetOrder();
    handleGetClientList();
    handleGetStateOrderList();
  }, []);

  const handleOpen = (id) => {
    setRowid(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
                timer: 6000,
              });
              handleGetOrder();
            } else {
              Swal.fire({
                title: "Error!",
                text: "error al crear el proveedor" + " " + data.result.data,
                icon: "error",
                confirmButtonText: "Cerrar",
                timer: 6000,
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
              timer: 6000,
            });
          });
      } else if (result.isDenied) {
        Swal.fire("No se guardo los cambios", "", "info");
      }
    });
  };

  const handleRowAdd = async (newRow) => {
    if (newRow.stateordersid != 1) {
      Swal.fire({
        title: "Error!",
        text:
          "El estado inicial solo puede ser pendiente al crear un pedido. " +
          "Se puede modificar despues de agregar los destinos en tracking",
        icon: "error",
        confirmButtonText: "Cerrar",
        timer: 6000,
      });
      return;
    }

    setProgress(true);
    const startDateFormat =
      newRow.startdate.getFullYear() +
      "-" +
      `0${newRow.startdate.getMonth()}`.slice(-2) +
      "-" +
      `0${newRow.startdate.getDate()}`.slice(-2);
    const startHourFormat =
      `0${newRow.starthour.getHours()}`.slice(-2) +
      ":" +
      `0${newRow.starthour.getMinutes()}`.slice(-2);
    const endDateFormat =
      newRow.enddate.getFullYear() +
      "-" +
      `0${newRow.enddate.getMonth()}`.slice(-2) +
      "-" +
      `0${newRow.enddate.getDate()}`.slice(-2);
    const endHourFormat =
      `0${newRow.endhour.getHours()}`.slice(-2) +
      ":" +
      `0${newRow.endhour.getMinutes()}`.slice(-2);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: newRow.clientid,
        stateOrdersId: newRow.stateordersid,
        detail: newRow.detail,
        startDate: startDateFormat,
        startHour: startHourFormat,
        endDate: endDateFormat,
        endHour: endHourFormat,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/createorders`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          Swal.fire({
            icon: "success",
            title: "Se creó el pedido con éxito!",
            showConfirmButton: false,
            timer: 6000,
          });
          handleGetOrder();
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al crear el pedido" + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 6000,
          });
          setProgress(false);
        }
      })
      .catch((error) => {
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
          handleGetOrder();
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

  const handleGetOrder = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/getorders`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const orderList = data.result.data.map((row) => row);
          setTableData(orderList);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error: " + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 6000,
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
          timer: 6000,
        });
      });
  };
  const handleGetClientList = async () => {
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
            text: "error: " + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 6000,
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
          timer: 6000,
        });
      });
  };
  const handleGetStateOrderList = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/getstateorders`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const stateorder = {};
          data.result.data.map((row) => (stateorder[row.id] = row.name));
          setStateOrder(stateorder);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error: " + " " + data.result.data,
            icon: "error",
            confirmButtonText: "Cerrar",
            timer: 6000,
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
          timer: 6000,
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
        PEDIDOS
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
            tooltip: "Eliminar",
            onClick: (e, data) => handleRowDelete(data),
          },
        ]}
        options={{
          filtering: true,
          addRowPosition: "first",
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
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

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Agregar destinos y estados
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla. ROW_ID:{" "}
            {rowid}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
}

export default page;
