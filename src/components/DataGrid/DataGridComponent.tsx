import React, { useState, useEffect, useMemo, useCallback } from "react";

import { Paper } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumns,
  GridToolbar,
  GridRowModel,
  GridActionsCellItem,
  GridRowId,
  GridValueSetterParams,
  GridValueGetterParams,
  GridCellEditStopParams,
} from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";

const initialRow = [
  { id: 1, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 2, cliente: "KUHN", deliveryDate: "2023-01-01", status: "Orcamento" },
  { id: 3, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 4, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 5, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 6, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 7, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 8, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  { id: 9, cliente: "KUHN", deliveryDate: "12-12-2030", status: "Orcamento" },
  {
    id: 10,
    cliente: "KUHN",
    deliveryDate: "12-12-2030",
    status: "Orcamento",
  },
];

type Row = typeof initialRow[number];

export const DataGridComponent = ({ params, role, setRowId }: GridRowModel) => {
  const [pageSize, setPageSize] = useState<number>(10);

  const [data, setData] = useState<Row[]>(initialRow);

  const teste = () => {};

  const duplicateUser = useCallback(
    (id: GridRowId) => () => {
      setData((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, cliente: "DENSO" } : row
        )
      );
    },
    []
  );

  const columnsMemo = useMemo<GridColumns<Row | any>>(
    () => [
      { field: "id", headerName: "ID", width: 50 },
      { field: "cliente", headerName: "cliente", width: 150, editable: true },
      {
        field: "deliveryDate",
        headerName: "Data de Entrega",
        width: 200,
        type: "date",
        editable: true,
      },
      {
        field: "status",
        headerName: "Status",

        valueOptions: ["Aguardando", "Aprovado", "Declinado", "Orcamento"],
        type: "singleSelect",
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Duplicate User"
            onClick={() => {
              console.log(data);
            }}
            showInMenu
          />,
        ],
      },
    ],
    [duplicateUser]
  );

  const memoData: GridRowsProp = useMemo(() => [...data], [data]);

  return (
    <Paper sx={{ height: "90vh", width: "90vw", padding: "10px" }}>
      <DataGrid
        localeText={{
          toolbarDensity: "Tamanho",
          toolbarExport: "Exportar",
          toolbarFilters: "Filtrar",
          toolbarColumns: "Colunas",
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        autoPageSize
        pageSize={pageSize}
        rowsPerPageOptions={[10, 20, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableSelectionOnClick
        rows={memoData}
        columns={columnsMemo}
        components={{ Toolbar: GridToolbar }}
        showCellRightBorder
        checkboxSelection
        onCellEditCommit={(params) =>
          console.log(params.field, params.id, params.value)
        }
      />
    </Paper>
  );
};
