import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PatientDataTable(props) {
  const [rows, setRows] = [props.rows, props.setRows]
  const [selectionModel, setSelectionModel] = useState([]);
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'time', headerName: 'Time', width: 130},
    { field: 'parameter', headerName: 'Parameter', width: 130 },
    { field: 'value', headerName: 'Value', width: 70 },
    {
      field: 'action',
      sortable: false,
      disableColumnMenu: true,
      width: 90,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              console.log('Trash Icon clicked');
              const selectedIDs = new Set<number>(selectionModel);
              setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
            }}
          ><DeleteIcon/>
          </IconButton>
        )
      }
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5]}
      checkboxSelection
      onSelectionModelChange={(ids) => {
        setSelectionModel(ids);
        console.log(ids)
      }}
    /> 
  )
}

export default PatientDataTable;