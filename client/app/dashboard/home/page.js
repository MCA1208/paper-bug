"use client";

import React, { useState } from "react";
import NavBar from "../navbar/NavBar";
import MaterialTable from "@material-table/core";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/material/Icon";
import { Typography } from "@mui/material";

function page() {
  const { useState } = React;

  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value",
    },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    },
  ]);

  const [data, setData] = useState([
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ]);

  return (
    <Container>
      <NavBar />
      <Typography
        component="h5"
        variant="h5"
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        SEGUIMIENTOS DE ENVÍOS
      </Typography>
      <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </Container>
  );
}

export default page;
