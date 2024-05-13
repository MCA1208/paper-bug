"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import MaterialTable from "@material-table/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { dictionary } from "../../constants/dictionary";
import { Typography, Container, Hidden } from "@mui/material";
import "../../globals.css";
import Swal from "sweetalert2";

function page() {
  const [country, setCountry] = useState();
  const [progress, setProgress] = useState(false);

  const columns = [
    { title: "id", field: "id", with: 50, hidden: true },
    { title: "Nombre", field: "names", with: 50 },
    { title: "Telefono", field: "telephone", with: 50 },
    { title: "Rubro", field: "activityid", with: 50 },
    { title: "Email", field: "email", with: 50 },
    {
      title: "País",
      field: "countryid",
      with: 50,
      lookup: country,
    },
    { title: "Provincia", field: "provinceid", with: 50 },
    { title: "Domicilio", field: "address", with: 50 },
    { title: "Detalle", field: "detail", with: 50 },
  ];
  const [tableData, setTableData] = useState();

  useEffect(() => {
    // const country = {};
    // dictionary.countries.map((row) => (country[row.id] = row.title));
    // setCountry(country);
    handleSupplier();
    handleCountry();
  }, []);

  const handleRowDelete = (rowData) => {
    if (confirm(dictionary.messageConfirmDelete)) {
      const deletedIds = Array.isArray(rowData)
        ? rowData.map((row) => row.id)
        : [rowData.id];
      const updatedData = tableData.filter(
        (row) => !deletedIds.includes(row.id)
      );
      setTableData(updatedData);
    }
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
        activityId: newRow.activityId,
        email: newRow.email,
        countryId: newRow.countryId,
        provinceId: newRow.provinceId,
        address: newRow.address,
        detail: newRow.address,
        telephone: newRow.telephone,
        userId: sessionStorage.getItem("id"),
      }),
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/createsupplier`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.result.status == true) {
          sessionStorage.setItem("id", data.result.data[0].id);
          sessionStorage.setItem("email", data.result.data[0].email);
          router.push("/dashboard/home");
        } else {
          Swal.fire({
            title: "Error!",
            text: "error al crear el proveedor" + " " + data.result.data,
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

  const handleRowUpdate = (newRow, oldRow) =>
    new Promise((resolve, reject) => {
      const updatedData = [...tableData];
      updatedData[oldRow.tableData.id] = newRow;
      resolve(setTableData(updatedData));
    });

  const handleCountry = async () => {
    //setProgress(true);
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
          //setProgress(false);
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
        //setProgress(false);
      });
  };
  const handleSupplier = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/getsupplier`,
      requestOptions
    )
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
        PROVEEDOR
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
