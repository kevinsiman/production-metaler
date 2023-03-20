import React, { useState, useEffect, FormEvent } from "react";
import { v4 as uuid } from "uuid";

import {
  Paper,
  Grid,
  TextField,
  Autocomplete,
  Box,
  Divider,
  InputAdornment,
  FormControl,
  Typography,
} from "@mui/material";
import {
  MaterialOptions,
  terceirizacaoOptions,
  tratamentoSuperficialOptions,
  tratamentoTermicoOptions,
} from "../../libs/data";
import Button from "@mui/material/Button";
import { HandleCalculate } from "../../CalcularPeso/Calculadora";
import { api } from "../../libs/api";

type productType = {
  referencia: string;
  nome: string;
  x: number;
  y: number;
  z?: number;
  material: {
    material: string;
    peso: number;
    valor: number;
  };
};

export const NovoProdutoForm = () => {
  const centro: number = 180.0;
  const tornoCNC: number = 120.0;
  const tornoMecanico: number = 80;
  const fresa: number = 100;
  const retifica: number = 60;
  const erosaoFio: number = 200.0;
  const erosaoPenetracao: number = 150.0;

  const [product, setProduct] = useState<{
    nome: string;
    referencia: string;
    material: string;
    peso: number;
    x: number;
    y: number;
    z: number;
    tt: string;
    ts: string;
    terceirizacao: [{ id?: string; nome?: string; valor?: number }] | any;
    hr_torno: number;
    vl_torno: number;
    hr_torno_convencional: number;
    vl_torno_convencional: number;
    hr_cnc: number;
    vl_cnc: number;
    hr_retifica: number;
    vl_retifica: number;
    hr_fresa: number;
    vl_fresa: number;
    hr_erosao_fio: number;
    vl_erosao_fio: number;
    hr_erosao_penetracao: number;
    vl_erosao_penetracao: number;
  }>({
    nome: "",
    referencia: "",
    material: "",
    peso: 0,
    x: 0,
    y: 0,
    z: 0,
    tt: "",
    ts: "",
    terceirizacao: [],
    hr_torno: 0,
    vl_torno: 0,
    hr_torno_convencional: 0,
    vl_torno_convencional: 0,
    hr_cnc: 0,
    vl_cnc: 0,
    hr_retifica: 0,
    vl_retifica: 0,
    hr_fresa: 0,
    vl_fresa: 0,
    hr_erosao_fio: 0,
    vl_erosao_fio: 0,
    hr_erosao_penetracao: 0,
    vl_erosao_penetracao: 0,
  });

  const [terceirizacao, setTerceirizacao] = useState<{
    nome: string;
    valor: number;
  }>({ nome: "", valor: 0 });

  const [materialSelect, setMaterialSelect] = useState<{
    valuekg: number;
    density: number;
    label: string;
    name: string;
  }>({
    valuekg: 0,
    density: 0,
    label: "",
    name: "",
  });

  const [horaMaquina, setHoraMaquina] = useState<{
    centro: number;
    tornoCNC: number;
    tornoMecanico: number;
    fresa: number;
    retifica: number;
    erosaoFio: number;
    erosaoPenetracao: number;
  }>({
    centro: 0,
    tornoCNC: 0,
    tornoMecanico: 0,
    fresa: 0,
    retifica: 0,
    erosaoFio: 0,
    erosaoPenetracao: 0,
  });

  const [ttSelect, setTtSelect] = useState<{
    label: string;
    loteMinimo: number;
    pricekg: number;
  }>({ label: "", loteMinimo: 0, pricekg: 0 });

  const [tsSelect, setTsSelect] = useState<{
    label: string;
    loteMinimo: number;
    pricekg: number;
  }>({ label: "", loteMinimo: 0, pricekg: 0 });

  const [totalT, setTotalT] = useState<number>(0);

  const [ttValor, setTTvalor] = useState<number>(0);
  const [tsValor, setTSvalor] = useState<number>(0);
  const [materialValor, setMaterialValor] = useState<number>(0);

  const AdcTerceirizacao = () => {
    if (terceirizacao.valor && terceirizacao.nome) {
      setProduct({
        ...product,
        terceirizacao: [
          ...product.terceirizacao,
          { id: uuid(), nome: terceirizacao.nome, valor: terceirizacao.valor },
        ],
      });
    }
  };

  const deleteTerceirizacao = (id: number) => {
    setProduct({
      ...product,
      terceirizacao: product.terceirizacao.filter(
        (item: any) => item.id !== id
      ),
    });
  };

  const calculateHrCNC = () => {
    let x: number;
    x = product.hr_cnc * centro;
    setProduct({ ...product, vl_cnc: x });
  };
  const calculateHrTorno = () => {
    let x: number;
    x = product.hr_torno * tornoCNC;
    setProduct({ ...product, vl_torno: x });
  };
  const calculateHrFresa = () => {
    let x: number;
    x = product.hr_fresa * fresa;
    setProduct({ ...product, vl_fresa: x });
  };

  useEffect(() => {
    calculateHrCNC();
    calculateHrTorno();
    calculateHrFresa();
  }, [product.hr_cnc, product.hr_torno, product.hr_fresa]);

  useEffect(() => {
    let x: number = 0;
    product.terceirizacao.map((item: any) => (x = x + item.valor));
    setTotalT(x);
  }, [product.terceirizacao]);

  useEffect(() => {
    let x = MaterialOptions.filter((item) => item.name === product.material);
    setMaterialSelect(x[0]);
  }, [product.material]);

  useEffect(() => {
    let x = tratamentoTermicoOptions.filter(
      (item) => item.label === product.tt
    );
    setTtSelect(x[0]);
  }, [product.tt]);

  useEffect(() => {
    let x = tratamentoSuperficialOptions.filter(
      (item) => item.label === product.ts
    );
    setTsSelect(x[0]);
  }, [product.ts]);

  useEffect(() => {
    if (materialSelect?.density) {
      const result = handleCalculate.calculate(
        product.x,
        product.y,
        product.z,
        materialSelect.density,
        materialSelect.valuekg,
        0,
        0
      ).result;
      const valor = handleCalculate.calculate(
        product.x,
        product.y,
        product.z,
        materialSelect.density,
        materialSelect.valuekg,
        0,
        0
      ).value;
      setProduct({ ...product, peso: result });
      setMaterialValor(Number(valor?.toFixed(2)));
    }
  }, [product.material, product.x, product.y, product.z]);

  useEffect(() => {
    if (product.tt) {
      setTTvalor(product?.peso * ttSelect?.pricekg);
    }
    if (product.ts) {
      setTSvalor(product?.peso * tsSelect?.pricekg);
    }
  }, [product.peso, ttSelect, tsSelect]);

  const handleCalculate = new HandleCalculate();
  console.log(product);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (product.referencia) {
      await api.post("/pd_product/create", product).then(({ data }) => {
        console.log(data);
      });
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <Grid
        onSubmit={(e) => handleSubmit(e)}
        container
        component="form"
        spacing={4}
      >
        <Grid item sm={6}>
          <TextField
            type="text"
            label="Referencia"
            fullWidth
            defaultValue={product.referencia}
            onChange={(e) =>
              setProduct({ ...product, referencia: e.target.value })
            }
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            type="text"
            label="Descricao"
            fullWidth
            defaultValue={product.nome}
            onChange={(e) => setProduct({ ...product, nome: e.target.value })}
          />
        </Grid>
        <Divider variant="fullWidth" />
        <Grid item sm={12}>
          <Autocomplete
            fullWidth
            options={MaterialOptions}
            onInputChange={(e, newValue) => {
              setProduct({ ...product, material: newValue });
            }}
            renderInput={(params) => (
              <TextField label="Materia Prima" {...params} />
            )}
          />
          {materialSelect ? <>R${materialSelect?.valuekg} por quilo</> : null}
        </Grid>
        <Grid item sm={2.4}>
          <TextField
            type="number"
            label="X"
            fullWidth
            defaultValue={product.x}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setProduct({ ...product, x: Number(e.target.value) })
            }
          />
        </Grid>
        <Grid item sm={2.4}>
          <TextField
            type="number"
            label="Y"
            fullWidth
            defaultValue={product.y}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setProduct({ ...product, y: Number(e.target.value) })
            }
          />
        </Grid>
        <Grid item sm={2.4}>
          <TextField
            type="number"
            label="Z"
            fullWidth
            defaultValue={product.z}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setProduct({ ...product, z: Number(e.target.value) })
            }
          />
        </Grid>
        <Grid item sm={2.4}>
          <TextField
            disabled
            type="number"
            label="Peso"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
            fullWidth
            value={product?.peso.toFixed(3)}
            onChange={(e) =>
              setProduct({ ...product, peso: Number(e.target.value) })
            }
          />
        </Grid>
        <Grid item sm={2.4}>
          <TextField
            disabled
            type="number"
            label="Valor"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            fullWidth
            value={materialValor}
            onChange={(e) =>
              setProduct({ ...product, peso: Number(e.target.value) })
            }
          />
        </Grid>
        <Grid item sm={8}>
          <Autocomplete
            disabled={!product.peso}
            fullWidth
            clearOnEscape
            options={tratamentoTermicoOptions}
            onInputChange={(e, newValue) => {
              setProduct({ ...product, tt: newValue });
            }}
            renderInput={(params) => (
              <TextField label="Tratamento Termico" {...params} />
            )}
          />
          <Box>
            {ttSelect ? <>R${ttSelect?.pricekg.toFixed(2)} por quilo</> : null}
          </Box>
        </Grid>
        <Grid item sm={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            disabled
            type="number"
            label="Valor"
            fullWidth
            value={ttValor.toFixed(2)}
            onChange={(e) =>
              setProduct({ ...product, peso: Number(e.target.value) })
            }
          />
        </Grid>
        <Grid item sm={8}>
          <Autocomplete
            disabled={!product.peso}
            fullWidth
            getOptionLabel={(option) => option.label}
            options={tratamentoSuperficialOptions}
            onInputChange={(e, newValue) => {
              setProduct({ ...product, ts: newValue });
            }}
            renderInput={(params) => (
              <TextField label="Tratamento Superficial" {...params} />
            )}
          />
          <Box>
            {tsSelect ? <>R${tsSelect?.pricekg.toFixed(2)} por quilo</> : null}
          </Box>
        </Grid>
        <Grid item sm={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            disabled
            type="number"
            label="Valor"
            fullWidth
            value={tsValor.toFixed(2)}
            onChange={(e) =>
              setProduct({ ...product, peso: Number(e.target.value) })
            }
          />
        </Grid>

        <Divider />
        <Grid item sm={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            HORA MAQUINA
          </Typography>
        </Grid>
        <Grid sx={{ textAlign: "center" }} item sm={3}>
          <TextField
            inputProps={{
              step: 0.1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">hr</InputAdornment>
              ),
            }}
            label="Centro CNC"
            placeholder="Horas"
            type="number"
            fullWidth
            onChange={(e) =>
              setProduct({
                ...product,
                hr_cnc: Number(e.target.value),
              })
            }
          />
          <Box>R${product.hr_cnc * centro || null}</Box>
        </Grid>
        <Grid sx={{ textAlign: "center" }} item sm={3}>
          <TextField
            inputProps={{
              step: 0.1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">hr</InputAdornment>
              ),
            }}
            label="Torno Mecanico"
            placeholder="Horas"
            type="number"
            fullWidth
            onChange={(e) =>
              setProduct({
                ...product,
                hr_torno_convencional: Number(e.target.value),
              })
            }
          />
          <Box>R${product.hr_torno_convencional * tornoMecanico || null}</Box>
        </Grid>
        <Grid sx={{ textAlign: "center" }} item sm={3}>
          <TextField
            inputProps={{
              step: 0.1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">hr</InputAdornment>
              ),
            }}
            label="Torno CNC"
            placeholder="Horas"
            type="number"
            fullWidth
            onChange={(e) =>
              setProduct({
                ...product,
                hr_torno: Number(e.target.value),
              })
            }
          />
          <Box>R${product.hr_torno * tornoCNC || null}</Box>
        </Grid>
        <Grid sx={{ textAlign: "center" }} item sm={3}>
          <TextField
            inputProps={{
              step: 0.1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">hr</InputAdornment>
              ),
            }}
            label="Fresa"
            placeholder="Horas"
            type="number"
            fullWidth
            onChange={(e) =>
              setProduct({
                ...product,
                hr_fresa: Number(e.target.value),
              })
            }
          />
          <Box>R${product.hr_fresa * fresa || null}</Box>
        </Grid>

        <Grid item sm={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            TERCEIRIZACAO
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Total em Tercerização: R${totalT || 0}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          <Autocomplete
            fullWidth
            options={terceirizacaoOptions}
            onChange={(e: any, value: string | any) => {
              setTerceirizacao({
                ...terceirizacao,
                nome: value?.label ?? "",
              });
            }}
            renderInput={(params) => (
              <TextField label="Terceirização" {...params} />
            )}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
            onChange={(e) =>
              setTerceirizacao({
                ...terceirizacao,
                valor: Number(e.target.value),
              })
            }
            label="Valor"
            type="number"
            fullWidth
          />
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center" }} item sm={2}>
          <Button fullWidth variant="contained" onClick={AdcTerceirizacao}>
            ADC
          </Button>
        </Grid>
        {product.terceirizacao?.map((item: any, index: number) => (
          <React.Fragment key={item?.id}>
            <Grid item sm={6}>
              <TextField
                fullWidth
                disabled
                label="Nome"
                defaultValue={item?.nome ?? ""}
              />
            </Grid>
            <Grid item sm={4}>
              <TextField
                disabled
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                label="Valor"
                defaultValue={item?.valor ?? ""}
              />
            </Grid>
            <Grid sx={{ display: "flex", alignItems: "center" }} item sm={2}>
              <Button onClick={() => deleteTerceirizacao(item.id)}>
                Delete
              </Button>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item sm={12}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
