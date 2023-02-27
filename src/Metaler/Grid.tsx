import React, { useState, useEffect, useMemo, useCallback } from "react";

import { v4 as uuid } from "uuid";

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
import { cadastro } from "../libs/fields";

import { Button, Box } from "@mui/material";
import { api } from "../libs/api";

export const Grid = () => {
  const columns = useMemo<GridColumns<any>>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "date",
        width: 100,
        editable: true,
      },
      {
        field: "created_at",
        headerName: "Criado",
        type: "date",
        width: 100,
        editable: true,
      },
      {
        field: "data_entrega",
        headerName: "Data de Entrega",
        type: "date",
        width: 150,
        editable: true,
      },
      { field: "op", headerName: "Ordem Compra", width: 150, editable: true },
      { field: "pd", headerName: "Pedido Compra", width: 150, editable: true },
      { field: "item", headerName: "Item", width: 150, editable: true },
      { field: "quantidade", headerName: "QTD", width: 150, editable: true },
      { field: "material", headerName: "Material", width: 150, editable: true },
      { field: "medidas", headerName: "Medidas", width: 150, editable: true },
      { field: "TT", headerName: "TT", width: 150, editable: true },
      { field: "TS", headerName: "TS", width: 150, editable: true },
      { field: "desenho", headerName: "Desenho", width: 150, editable: true },
      { field: "NF", headerName: "NF", width: 150, editable: true },
      { field: "price", headerName: "Valor", width: 150, editable: true },
    ],
    []
  );

  const giveItAll = async () => {
    await api
      .post("/follow/create", cadastro)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <Button onClick={giveItAll}>Agora MEL</Button>;
};
