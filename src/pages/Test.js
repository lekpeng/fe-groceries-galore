import * as React from "react";
import { useState } from "react";
// import { DataGridPro, GridColumns, GridRowsProp, useGridApiRef } from "@mui/x-data-grid-pro";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

import { randomCreatedDate, randomTraderName, randomUpdatedDate } from "@mui/x-data-grid-generator";

const columns = [
  { field: "id", headerName: "ID", type: "singleSelect", valueOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], editable: true },
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

async function makeSaveRequest(name, age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === "") {
        return reject(new Error("Name is required"));
      }
      console.log("Saving", name, age);
      resolve();
    }, 1000); // Simulate network delay
  });
}

export default function BasicEditingGrid() {
  const apiRef = useGridApiRef();
  const [tableData, setTableData] = useState([...rows]);

  const handleRowEditCommit = async (id) => {
    console.log("EDITED SMTH");
    const model = apiRef.current.getEditRowsModel(); // This object contains all rows that are being editted
    const newRow = model[id]; // The data that will be commited
    const name = newRow.name.value; // The new value entered
    const age = newRow.age.value;

    // Get the row before commiting
    const oldRow = apiRef.current.getRow(id);

    try {
      // Make the HTTP request to save in the backend
      await makeSaveRequest(name, age);
    } catch (error) {
      alert(error.message);
      // Restore the row in case of error
      apiRef.current.updateRows([oldRow]);
    }
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        experimentalFeatures={{ newEditingApi: true }}
        apiRef={apiRef}
        editMode="row"
        rows={tableData}
        columns={columns}
        onRowEditCommit={handleRowEditCommit}
      />
    </div>
  );
}
