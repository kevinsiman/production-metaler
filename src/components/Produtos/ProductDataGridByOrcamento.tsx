import React, { useState, useEffect, useMemo, useCallback } from "react";
import { api } from "../../libs/api";

import Router from "next/router";

import clsx from "clsx";

import moment from "moment";

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumns,
  GridToolbar,
  GridRowModel,
  GridRenderCellParams,
  GridActionsCellItem,
  GridRowId,
  GridCellEditCommitParams,
  GridCellParams,
} from "@mui/x-data-grid";

import {
  Paper,
  Modal,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ChartBox } from "../Orcamentos/ChartBox/ChartBox";

export type OrcamentoDataType = {
  id: number;
  nome: string;
  referencia: string;
  created_at: string;
  material: string;
  peso: string;
};

interface DataGridOrcamentoProps {
  reloadData: number;
}

export const ProductDataGrid = ({ reloadData }: DataGridOrcamentoProps) => {
  const atualDate = moment().format();

  const [pageSize, setPageSize] = useState<number>(100);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [orcamentoData, setOrcamentoData] = useState<OrcamentoDataType[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const searchOrcamentoData = async () => {
    await api
      .post("/pd_product/read", {})
      .then(({ data }) => {
        setOrcamentoData(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    searchOrcamentoData();
  }, [reloadData]);

  const duplicateUser = useCallback(
    (id: GridRowId) => async () => {
      setOrcamentoData((prevRows) => prevRows.filter((row) => row.id !== id));
      await api
        .post("/pd_orcamento/delete", { id: id })
        .then(({ data }) => console.log(data));
    },
    []
  );

  const teste = async (params: GridCellEditCommitParams) => {
    const { id, value, field } = params;
    console.log(params);
    let updateData = {};

    switch (field) {
      case "cliente":
        updateData = { id: id, cliente: value };
        break;
      case "status":
        updateData = { id: id, status: value };
        break;

      case "prazo_entrega":
        updateData = { id: id, prazo_entrega: value };
        break;
      case "data_entrega":
        updateData = { id: id, data_entrega: value };
        break;

      default:
        break;
    }
    await api
      .post("/pd_orcamento/update", updateData)
      .then(({ data }) => console.log(data))
      .catch((error) => {
        console.log(error);
      });
  };

  const columnsMemo = useMemo<GridColumns<OrcamentoDataType | any>>(
    () => [
      {
        field: "nome",

        headerName: "Nome",
        width: 150,
      },
      {
        field: "referencia",
        headerName: "Referencia",
        flex: 1,
        minWidth: 100,
        cellClassName: (params: GridCellParams<number>) => {
          if (params.value == null) {
            return "";
          }

          return clsx("pedido_compra", {
            cell: params.value,
          });
        },
      },
      {
        field: "material",
        headerName: "Material",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "peso",

        headerName: "Peso",
        width: 100,
        renderCell: (params: GridRenderCellParams) => params.value.toFixed(3),
      },
      {
        field: "hr_cnc",
        headerName: "CNC",
        width: 100,
      },
      {
        field: "hr_torno",
        headerName: "Torno",
        width: 100,
      },
      {
        field: "hr_fresa",
        headerName: "Fresa",
        width: 100,
      },
      {
        field: "hr_retifica",
        headerName: "Retifica",
        width: 100,
      },

      {
        field: "created_at",
        headerName: "Criado em",
        type: "date",
        width: 170,
        renderCell: (params: GridRenderCellParams) => (
          <>{moment(params.value).format("DD/MM/YYYY HH:mm")}</>
        ),
      },
      {
        field: "Ações",
        type: "actions",
        hideable: false,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={duplicateUser(params.id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={() =>
              Router.push({
                pathname: "/orcamento-detalhes",
                query: { id: params.id },
              })
            }
            color="inherit"
          />,
        ],
      },
    ],
    []
  );

  const memoData: GridRowsProp = useMemo(
    () => [...orcamentoData],
    [orcamentoData]
  );

  return (
    <>
      <Paper
        sx={{
          height: "90vh",
          "& .time.negative": {
            backgroundColor: "rgba(250, 0, 0, 0.8)",

            color: "white",
            display: "flex",
            justifyContent: "center",
          },
          "& .time.positive": {
            backgroundColor: "#00B050",

            color: "white",
            display: "flex",
            justifyContent: "center",
          },
          "& .time.today": {
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
          },
          "& .status.cell": {
            display: "flex",
            justifyContent: "center",
          },
          "& .pedido_compra.cell": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Defini a visibilidade Inicial das Colunas
                data_entrega: false,
              },
            },
          }}
          disableSelectionOnClick
          columns={columnsMemo}
          rows={memoData}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 20, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          components={{ Toolbar: GridToolbar }}
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
          showCellRightBorder
          onCellEditCommit={(params) => teste(params)}
        />
      </Paper>
    </>
  );
};
