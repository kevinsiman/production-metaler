import React, { useState, useEffect, FormEvent } from "react";

import dayjs, { Dayjs } from "dayjs";

import {
  Autocomplete,
  Grid,
  Box,
  Container,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment, { now } from "moment";
import { api } from "../../libs/api";

const clientes = [{ label: "KUHN" }, { label: "MULTIVAC" }, { label: "DENSO" }];

interface NovoOrcamentoFormProps {
  setReloadData: (type: number) => void;

  setOpenModal: (type: boolean) => void;
}

export const NovoOrcamentoForm = ({
  setOpenModal,
  setReloadData,
}: NovoOrcamentoFormProps) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const [data, setData] = useState<{
    cliente: string;
    pedido_compra: string;
    data_entrega: string;
    prazo_entrega: string;
    status: string;
  }>({
    cliente: "",
    pedido_compra: "",
    data_entrega: Date(),
    prazo_entrega: "",
    status: "orcamento",
  });

  const handleDateChange = (newValue: any) => {
    let date = moment(newValue._d).format();
    setData({ ...data, prazo_entrega: date });
  };

  const handleCloseSnackBar = () => {
    setSuccess(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    await api
      .post("pd_orcamento/create", data)
      .then(({ data }) => {
        console.log("enviado");
        setSuccess(true);
      })
      .catch((error) => {
        console.log("Erro");
        console.log(error);
      });

    setIsSending(false);
    setOpenModal(false);
    setReloadData(Math.random());
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSending}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Enviado com Sucesso"
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container component="main" sx={{ p: 5 }}>
          <Grid
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            container
            spacing={2}
          >
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                disablePortal
                id="combo-box-demo"
                options={clientes}
                fullWidth
                clearOnEscape
                inputValue={data.cliente}
                onInputChange={(event, newInputValue) => {
                  setData({ ...data, cliente: newInputValue ?? "" });
                }}
                renderInput={(params) => (
                  <TextField {...params} required autoFocus label="cliente" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="pd"
                name="lastName"
                autoComplete="family-name"
                type="text"
                onChange={(e) =>
                  setData({ ...data, pedido_compra: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <MobileDatePicker
                closeOnSelect={true}
                disablePast={true}
                label="Prazo de Entrega"
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField {...params} required fullWidth />
                )}
                onChange={handleDateChange}
                value={data?.data_entrega}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2, py: 2 }}
              >
                Cadastrar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </LocalizationProvider>
    </>
  );
};
