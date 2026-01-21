import type { Alert, Bill, CreditCard, Goal, Invoice, MonthlyMetric, PlannedExpense, Transaction } from "./types";

export const creditCards: CreditCard[] = [
  {
    id: "1",
    lastDigits: "1289",
    holder: "Daniel Novello",
    availableLimit: 4680,
    style: "default",
  },
  {
    id: "2",
    lastDigits: "6420",
    holder: "Fluxo Prime",
    availableLimit: 7200,
    style: "alt",
  },
  {
    id: "3",
    lastDigits: "2233",
    holder: "Business",
    availableLimit: 12500,
    style: "dark",
  },
];

export const invoices: Invoice[] = [
  { id: "1", cardName: "Fluxo Prime", amount: 1240 },
  { id: "2", cardName: "Business", amount: 2890 },
  { id: "3", cardName: "Cartao pessoal", amount: 890 },
];

export const alerts: Alert[] = [
  { id: "1", title: "Uso do limite", value: "62%", progress: 62, style: "default" },
  { id: "2", title: "Assinaturas", value: "R$ 210", progress: 40, style: "soft" },
];

export const goals: Goal[] = [
  {
    id: "1",
    title: "Reserva de emergencia",
    currentAmount: 7000,
    targetAmount: 10000,
    progress: 70,
    style: "default",
  },
  {
    id: "2",
    title: "Viagem internacional",
    currentAmount: 2100,
    targetAmount: 4000,
    progress: 52,
    style: "alt",
  },
  {
    id: "3",
    title: "Novo notebook",
    currentAmount: 1500,
    targetAmount: 6000,
    progress: 25,
    style: "soft",
  },
];

export const plannedExpenses: PlannedExpense[] = [
  { id: "1", title: "Casa propria", amount: 1200, frequency: "mes" },
  { id: "2", title: "Carro", amount: 900, frequency: "mes" },
  { id: "3", title: "Curso", amount: 350, frequency: "mes" },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    title: "Mercado Central",
    amount: -320.40,
    date: "Hoje",
    type: "expense",
    category: "Cartao",
  },
  {
    id: "2",
    title: "Salario",
    amount: 4200.00,
    date: "Ontem",
    type: "income",
    category: "Entrada",
  },
  {
    id: "3",
    title: "Delivery",
    amount: -74.90,
    date: "2 dias",
    type: "expense",
    category: "Pix",
  },
  {
    id: "4",
    title: "Freelance",
    amount: 980.00,
    date: "3 dias",
    type: "income",
    category: "Entrada",
  },
  {
    id: "5",
    title: "Uber",
    amount: -38.90,
    date: "4 dias",
    type: "expense",
    category: "Cartao",
  },
];

export const bills: Bill[] = [
  { id: "1", title: "Fatura Cartao Fluxo", amount: 1240.00 },
  { id: "2", title: "Academia", amount: 149.00 },
  { id: "3", title: "Assinaturas", amount: 89.90 },
  { id: "4", title: "Internet", amount: 119.90 },
];

export const monthlyMetrics: MonthlyMetric[] = [
  { id: "1", label: "Entrada do mes", value: 18250.00, trend: "+12% vs ultimo mes", trendDirection: "up" },
  { id: "2", label: "Saidas do mes", value: 7940.00, trend: "-6% vs ultimo mes", trendDirection: "down" },
  { id: "3", label: "Economia", value: 3500.00, trend: "Meta 70%", trendDirection: "up" },
];

export const extratoSummary: Alert[] = [
  { id: "1", title: "Entradas", value: "R$ 12.880", progress: 82, style: "default" },
  { id: "2", title: "Saidas", value: "R$ 7.200", progress: 58, style: "alt" },
  { id: "3", title: "Economia", value: "R$ 5.680", progress: 64, style: "soft" },
];