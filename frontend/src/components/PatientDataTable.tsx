import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function PatientDataTable(props) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [rows, setRows] = useState([
    { id: 1, time: '1', parameter: 'Albumin', value: '1' },
    { id: 2, time: '1', parameter: 'ALP', value: '1' },
    { id: 3, time: '1', parameter: 'ALT', value: '2' },
    { id: 4, time: '1', parameter: 'AST', value: '3.2' },
    { id: 5, time: '1', parameter: 'Cholesterol', value: '1' },
    { id: 6, time: '1', parameter: 'HCT', value: null },
    { id: 7, time: '1', parameter: 'FiO2', value: '23' },
    { id: 8, time: '1', parameter: 'HCO3', value: '15' },
    { id: 9, time: '1', parameter: 'Platelets', value: '1' },
    { id: 10, time: '1', parameter: 'FiO2', value: '23'},
    { id: 11, time: '1', parameter: 'HCO3', value: '15' },
    { id: 12, time: '1', parameter: 'Platelets', value: '1' },
  ]);
  
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