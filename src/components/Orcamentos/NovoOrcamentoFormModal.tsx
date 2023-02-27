import React, { useState } from "react";
import { Box, Modal, Typography, Button, Paper, Fade } from "@mui/material";
import { NovoOrcamentoForm } from "./NovoOrcamentoForm";

interface NovoOrcamentoFormModalProps {
  setReloadData: (type: number) => void;
}

export const NovoOrcamentoFormModal = ({
  setReloadData,
}: NovoOrcamentoFormModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpenModal(true)}>
        Novo Orçamento
      </Button>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignitems: "center",
          p: 5,
        }}
      >
        <Fade in={openModal}>
          <Paper sx={{ p: 1 }}>
            <NovoOrcamentoForm
              setReloadData={setReloadData}
              setOpenModal={setOpenModal}
            />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
};
