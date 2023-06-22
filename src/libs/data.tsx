export const MaterialOptions = [
  { valuekg: 9.90, density: 7.85, label: "SAE 1020", name: "SAE 1020" },
  { valuekg: 11.28, density: 7.85, label: "SAE 1045", name: "SAE 1045" },
  { valuekg: 21.0, density: 7.85, label: "SAE 4140", name: "SAE 4140" },
  { valuekg: 28.0, density: 7.85, label: "SAE 4340", name: "SAE 4340" },
  { valuekg: 20.0, density: 7.85, label: "SAE 8620", name: "SAE 8620" },
  {
    valuekg: 35.0,
    density: 7.85,
    label: "SAE 52100",
    name: "SAE 52100",
  },
  { valuekg: 60.0, density: 7.85, label: "D2", name: "D2" },
  { valuekg: 200.0, density: 7.85, label: "M2", name: "M2" },
  { valuekg: 35.4, density: 7.85, label: "P20", name: "P20" },
  { valuekg: 58.0, density: 7.85, label: "H13", name: "H13" },
  { valuekg: 60.0, density: 7.9, label: "INOX 304", name: "INOX 304" },
  {
    id: 12,
    valuekg: 120.0,
    density: 7.9,
    label: "INOX 310",
    name: "INOX 310",
  },
  {
    valuekg: 79.0,
    density: 7.9,
    label: "INOX 316",
    name: "INOX 316",
  },
  {
    valuekg: 60.0,
    density: 2.75,
    label: "ALUMINIO 5052",
    name: "ALUMINIO 5052",
  },
  {
    valuekg: 50.0,
    density: 2.75,
    label: "ALUMINIO 6051",
    name: "ALUMINIO 6051",
  },
  {
    valuekg: 50.0,
    density: 2.75,
    label: "ALUMINIO 6351",
    name: "ALUMINIO 6351",
  },
  {
    valuekg: 95.0,
    density: 2.75,
    label: "ALUMINIO 7075",
    name: "ALUMINIO 7075",
  },
  { valuekg: 120.0, density: 8.95, label: "BRONZE TM23", name: "BRONZE TM23" },
  { valuekg: 65.0, density: 8.65, label: "COBRE", name: "COBRE" },
  { valuekg: 110.0, density: 8.55, label: "LATÃO", name: "LATÃO" },
  { valuekg: 55.0, density: 1.14, label: "NYLON", name: "NYLON" },
  {
    valuekg: 72.0,
    density: 1.41,
    label: "POLIACETAL (POM)",
    name: "POLIACETAL (POM)",
  },
  { valuekg: 120.0, density: 1.41, label: "TEFLON", name: "TEFLON" },
  { valuekg: 40.0, density: 1.35, label: "CELERON", name: "CELERON" },
  {
    valuekg: 60.0,
    density: 1.35,
    label: "POLIURETANO (PU)",
    name: "POLIURETANO (PU)",
  },
  {
    valuekg: 60.0,
    density: 1.35,
    label: "POLICARBONATO",
    name: "POLICARBONATO",
  },
  { valuekg: 72.0, density: 1.35, label: "POLIACETAL", name: "POLIACETAL" },
];

export const materialType = [
  { label: "TREFILADO" },
  { label: "LAMINADO" },
  { label: "CHAPA" },
];

export const tratamentoTermicoOptions = [
  { label: "Tempera", loteMinimo: 35, pricekg: 4.29 },
  { label: "Tempera + Revenimento", loteMinimo: 35, pricekg: 4.29 },
  { label: "Revenimento", loteMinimo: 35, pricekg: 4.29 },
  { label: "Normalização", loteMinimo: 35, pricekg: 4.29 },
  { label: "Recozimento", loteMinimo: 0, pricekg: 4.29 },
];

export const hrcOptions = [
  { label: "40-45 HRC" },
  { label: "48-52 HRC" },
  { label: "55-60 HRC" },
  { label: "60-65 HRC" },
];

export const tratamentoSuperficialOptions = [
  { label: "Oxidacao", loteMinimo: 35, pricekg: 4.284 },
  { label: "Galvanização", loteMinimo: 35, pricekg: 7.22 },
  { label: "Carbonitação", loteMinimo: 35, pricekg: 4.0 },
  { label: "Cromo duro", loteMinimo: 35, pricekg: 5.22 },
  { label: "Zincagem", loteMinimo: 35, pricekg: 5.29 },
  { label: "Niquel Quimico", loteMinimo: 35, pricekg: 36.0 },
  { label: "Niquel Eletrolitico", loteMinimo: 35, pricekg: 16.0 },
];

export const terceirizacaoOptions = [
  { label: "Soldagem" },
  { label: "Gravação à Laser" },
  { label: "Corte à Laser" },
  { label: "Corte à Jato dágua" },
  { label: "Corte à Plasma" },
  { label: "Dobra" },
];

export const clienteOptions = [
  { label: "KUHN" },
  { label: "KUFFERATH" },
  { label: "ADVALTECH" },
  { label: "MOLGEP" },
  { label: "BOI BULL" },
  { label: "MULTIVAC" },
  { label: "OFK" },
  { label: "DENSO" },
];

export const statusOrcamentoOptions = [
  { label: "ORCAMENTO" },
  { label: "VENDA" },
];

export const valorHoraMaquina = [
  { label: "centro", valor: 150 },
  { label: "tornoCNC", valor: 120 },
  { label: "tornoMecanico", valor: 80 },
  { label: "Retifica", valor: 60 },
  { label: "erosaoFio", valor: 200 },
  { label: "erosaoPenetracao", valor: 100 },
];
