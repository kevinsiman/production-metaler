import React from "react";
import { useRouter } from "next/router";
import { OrcamentoDetails } from "../src/components/Orcamentos/OrcamentoDetails";

const OrcamentoDetalhes = () => {
  const { query } = useRouter();
  return (
    <>
      <OrcamentoDetails id={query.id} />
    </>
  );
};

export default OrcamentoDetalhes;
