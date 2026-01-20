export type SectionId =
  | "dashboard"
  | "cartoes"
  | "extrato"
  | "metas"
  | "investimentos"
  | "configuracoes";

export type NavItem = {
  id: SectionId;
  label: string;
  shortLabel: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", shortLabel: "Dash" },
  { id: "cartoes", label: "Cartoes", shortLabel: "Cartoes" },
  { id: "extrato", label: "Extrato", shortLabel: "Extrato" },
  { id: "metas", label: "Metas", shortLabel: "Metas" },
  { id: "investimentos", label: "Investimentos", shortLabel: "Invest." },
  { id: "configuracoes", label: "Configuracoes", shortLabel: "Perfil" },
];
