import type { Alert, Bill, CreditCard, Goal, Invoice, MonthlyMetric, PlannedExpense, Transaction } from "./types";

export const creditCards: CreditCard[] = [
  {
    id: "1",
    name: "Pessoal",
    lastDigits: "1289",
    holderName: "Daniel Novello",
    limitAmount: 8000,
    availableAmount: 4680,
    style: "default",
  },
  {
    id: "2",
    name: "Fluxo Prime",
    lastDigits: "6420",
    holderName: "Fluxo Prime",
    limitAmount: 12000,
    availableAmount: 7200,
    style: "alt",
  },
  {
    id: "3",
    name: "Business",
    lastDigits: "2233",
    holderName: "Business",
    limitAmount: 20000,
    availableAmount: 12500,
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
    description: "Mercado Central",
    subtitle: "Cartao - Hoje",
    amount: -320.40,
    type: "expense",
    category: "Cartao",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    description: "Salario",
    subtitle: "Entrada - Ontem",
    amount: 4200.00,
    type: "income",
    category: "Entrada",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    description: "Delivery",
    subtitle: "Pix - 2 dias",
    amount: -74.90,
    type: "expense",
    category: "Pix",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    description: "Freelance",
    subtitle: "Entrada - 3 dias",
    amount: 980.00,
    type: "income",
    category: "Entrada",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    description: "Uber",
    subtitle: "Cartao - 4 dias",
    amount: -38.90,
    type: "expense",
    category: "Cartao",
    createdAt: new Date().toISOString(),
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
