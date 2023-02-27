import React, { useEffect, useState } from "react";

import { api } from "../src/libs/api";

import { useRouter } from "next/router";

import { Box } from "@mui/material";

import { DataGridOrcamento } from "../src/components/Orcamentos/DataGridOrcamento";
import { NovoOrcamentoForm } from "../src/components/Orcamentos/NovoOrcamentoForm";
import { NovoOrcamentoFormModal } from "../src/components/Orcamentos/NovoOrcamentoFormModal";
import { ChartBox } from "../src/components/Orcamentos/ChartBox/ChartBox";

type dataType = {
  cliente: string;
  created_at: string;
  data_entrega: string;
  id: number;
  pedido_compra: string;
  prazo_entrega: string;
  status: string;
  updated_at: string;
};

const orcamento = () => {
  const [reloadData, setReloadData] = useState<number>(1);

  const [data, setData] = useState<any>([]);
  const [orcamentoLength, setOrcamentoLength] = useState<number>(0);
  const [vendaLength, setVendaLength] = useState<number>(0);
  const [declinadoLength, setDeclinadoLength] = useState<number>(0);
  const [totalLength, setTotalLength] = useState<number>(0);
  const { query } = useRouter();

  const getDataOrcamento = async () => {
    await api.post("/pd_orcamento/read", {}).then(({ data }) => {
      setData(data);
      setOrcamentoLength(
        data.filter((item: dataType) => item.status === "Orcamento").length
      );
      setVendaLength(
        data.filter((item: dataType) => item.status === "Venda").length
      );
      setDeclinadoLength(
        data.filter((item: dataType) => item.status === "Declinado").length
      );
      setTotalLength(data.length);
    });
  };

  useEffect(() => {
    getDataOrcamento();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <NovoOrcamentoFormModal setReloadData={setReloadData} />
      <Box sx={{ display: "flex", gap: 5 }}>
        <ChartBox
          value={totalLength}
          title="Total de Cadastros"
          color="green"
        />
        <ChartBox
          value={orcamentoLength}
          title="Total de Orçamentos"
          color="purple"
        />
        <ChartBox
          value={vendaLength}
          title="Total de Vendas"
          color="darkorange"
        />
        <ChartBox
          value={declinadoLength}
          title="Total de Orçamentos Declinados"
          color="red"
        />
      </Box>
      <DataGridOrcamento reloadData={reloadData} />
    </Box>
  );
};

export default orcamento;
