import React, { useState, useEffect } from "react";

import { Box, Paper, Button, Typography } from "@mui/material";

import { PieChart, Pie } from "recharts";

interface ChartBoxProps {
  value: number;
  title: string;
  color: string;
}
export const ChartBox = ({ value, title, color }: ChartBoxProps) => {
  return (
    <Paper
      sx={{
        width: "150px",
        height: "150px",
        bgcolor: color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3px",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "50pt",
          fontWeight: "60",
          lineHeight: "80px",
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ textAlign: "center", color: "white", fontSize: "9pt" }}>
        {title}
      </Typography>
    </Paper>
  );
};
