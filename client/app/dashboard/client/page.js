"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";
import MaterialTable from "@material-table/core";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import { dictionary } from "../../constants/dictionary";
import { Typography } from "@mui/material";

function page() {
  const [country, setCountry] = useState();
  const columns = [
    { title: "Nombre", field: "name", with: 50 },
    { title: "Rubro", field: "activity", with: 50 },
    { title: "Email", field: "email", with: 50 },
    {
      title: "País",
      field: "country",
      with: 50,
      lookup: country,
    },
    { title: "Provincia", field: "province", with: 50 },
    { title: "Domicilio", field: "address", with: 50 },
    { title: "Detalle", field: "detail", with: 50 },
  ];
  const [tableData, setTableData] = useState([
    {
      id: 0,
      name: "Milton Cesar Amado",
      activity: "Venta de computadoras",
      email: "milton.amado10@gmail.com",
      country: 1,
      province: "Buenos aires",
      address: "Florencio varela calle necochea 3509",
      detail: "Es un cliente de servicios temporales",
    },
    {
      id: 1,
      name: "Juan Perez",
      activity: "Accesorios de autos",
      email: "milton.amado10@gmail.com",
      country: 2,
      province: "Buenos aires",
      address: "Quilmes calle moreno 22",
      detail: "renovación contrato  x año",
    },
    {
      id: 2,
      name: "Carlos Gomez",
      activity: "Libreria mayorista",
      email: "milton.amado10@gmail.com",
      country: 4,
      province: "Santa Fé",
      address: "Rosario Garibaldi 44",
      detail: "contacto es Mario Rodriguez cel 1199968425",
    },
  ]);

  useEffect(() => {
    const country = {};
    dictionary.countries.map((row) => (country[row.id] = row.title));
    setCountry(country);
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

  return (
    <Container>
      <NavBar />
      <Typography
        component="h5"
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        CLIENTES
      </Typography>
      <MaterialTable
        columns={columns}
        data={tableData}
        title=""
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              resolve(setTableData([...tableData, newRow]));
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              resolve(setTableData(updatedData));
            }),
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

      <DeleteIcon />
    </Container>
  );
}

export default page;
