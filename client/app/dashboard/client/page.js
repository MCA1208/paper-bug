"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import MaterialTable from "@material-table/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { dictionary } from "../../constants/dictionary";
import { Typography, Container, Select, MenuItem } from "@mui/material";
import "../../globals.css";
import Swal from "sweetalert2";

function page() {
  const [country, setCountry] = useState();
  const [province, setProvince] = useState();
  const [activity, setActivity] = useState();
  const [progress, setProgress] = useState(false);

  const getCities = (country) => {
    return province[country] ?? [];
  };

  const columns = [
    { title: "id", field: "id", with: 50, hidden: true },
    { title: "Nombre", field: "name", with: 50 },
    { title: "Telefono", field: "telephone", with: 50 },
    { title: "Rubro", field: "activityid", with: 50, lookup: activity },
    { title: "Email", field: "email", with: 50 },
    {
      title: "País",
      field: "countryid",
      with: 50,
      lookup: country,
    },
    // {
    //   title: "Provincia",
    //   field: "provinceid",
    //   with: 50
    // },
    { title: "Domicilio", field: "address", with: 50 },
    { title: "Detalle", field: "detail", with: 50 },
  ];
  const [tableData, setTableData] = useState();

  useEffect(() => {
    handleActivity();
    handleClient();
    handleCountry();
    //handleProvince();
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
          `${process.env.NEXT_PUBLIC_URL_API}/deleteclient`,
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.result.status == true) {
              Swal.fire({
                icon: "success",
                title: "Se eliminó el proveedor con éxito!",
                showConfirmButton: false,
                timer: 3000,
              });
              handleClient();
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
    console.log(`${process.env.NEXT_PUBLIC_URL_API}/createsupplier`);
    setProgress(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: newRow.id,
        name: newRow.name,
        activityid: newRow.activityid,
        email: newRow.email,
        countryid: newRow.countryid,
        address: newRow.address,
        detail: newRow.detail,
        telephone: newRow.telephone,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/createclient`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          Swal.fire({
            icon: "success",
            title: "Se creó el cliente con éxito!",
            showConfirmButton: false,
            timer: 3000,
          });
          handleClient();
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
        activityId: newRow.activityid,
        email: newRow.email,
        countryId: newRow.countryid,
        address: newRow.address,
        detail: newRow.detail,
        telephone: newRow.telephone,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/modifyclient`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          Swal.fire({
            icon: "success",
            title: "Se actualizó el cliente con éxito!",
            showConfirmButton: false,
            timer: 3000,
          });
          handleClient();
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
          timer: 6000,
        });
        setProgress(false);
      });
  };

  const handleActivity = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/getactivity`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const activity = {};
          data.result.data.map((row) => (activity[row.id] = row.name));
          setActivity(activity);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al obtener las actividades" + " " + data.result.data,
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

  const handleCountry = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/getcountry`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const country = {};
          data.result.data.map((row) => (country[row.id] = row.name));
          setCountry(country);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al obtener los paises" + " " + data.result.data,
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

  const handleProvince = async (countryid) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryid: countryid }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/getprovince`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const province = {};
          data.result.data.map((row) => (province[row.id] = row.name));
          setProvince(province);
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al obtener las provincias" + " " + data.result.data,
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

  const handleClient = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/getclient`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          const supplierList = data.result.data.map((row) => row);
          console.log(`supplierList: ${supplierList}`);
          setTableData(supplierList);
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
        CLIENTE
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
