import React, { useEffect, useState } from "react";

import { api } from "../../libs/api";

import { Box, Paper, TextField, Autocomplete, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NovoProdutoForm } from "../Produtos/NovoProdutoForm";

interface OrcamentoDetailsProps {
  id: string | any;
}

export const OrcamentoDetails = ({ id }: OrcamentoDetailsProps) => {
  const [data, setData] = useState<any>({});
  const [date, setDate] = React.useState<Dayjs | null>();
  console.log(id);

  const getData = async () => {
    await api
      .post("/pd_orcamento/readUnique", { id: Number(id) })
      .then(({ data }) => {
        setData(data);
        setDate(dayjs(data.prazo_entrega));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <NovoProdutoForm />
      <Box sx={{ display: "flex", gap: 5, wrap: "wrap" }}>
        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 5 }}
        >
          <Paper>
            <TextField
              label="cliente"
              variant="filled"
              focused
              fullWidth
              value={data?.cliente}
              defaultValue={data?.cliente}
            />
          </Paper>
          <Paper>
            <TextField
              label="pd"
              variant="filled"
              focused
              fullWidth
              value={data?.pedido_compra}
              defaultValue={data?.pedido_compra}
            />
          </Paper>
          <Paper>
            <TextField
              label="Status"
              variant="filled"
              focused
              fullWidth
              value={data?.status}
              defaultValue={data?.status}
            />
          </Paper>
        </Box>
        <Box>
          <Paper>
            <LocalizationProvider
              adapterLocale="pt-br"
              dateAdapter={AdapterDayjs}
            >
              <CalendarPicker
                date={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
          </Paper>
        </Box>
      </Box>
    </Paper>
  );
};
