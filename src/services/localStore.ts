import type { PlannedExpense } from "../app/types";

type AlertSettings = {
  limitPercent: number;
  subscriptionsBudget: number;
};

type InvestmentAllocation = {
  id: string;
  label: string;
  percent: number;
  style?: "default" | "alt" | "soft";
};

type InvestmentReturn = {
  id: string;
  label: string;
  percent: number;
  style?: "default" | "alt" | "soft";
};

const readJson = <T>(key: string, fallback: T): T => {
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const withId = <T extends { id: string }>(list: T[], item: T) => {
  const exists = list.findIndex((entry) => entry.id === item.id);
  if (exists === -1) {
    return [...list, item];
  }
  const copy = [...list];
  copy[exists] = item;
  return copy;
};

export const getAlertSettings = (): AlertSettings => {
  return readJson<AlertSettings>("alerts", {
    limitPercent: 70,
    subscriptionsBudget: 210,
  });
};

export const saveAlertSettings = (settings: AlertSettings) => {
  writeJson("alerts", settings);
};

export const getPlannedExpenses = (): PlannedExpense[] => {
  return readJson<PlannedExpense[]>("planned_expenses", [
    { id: "1", title: "Casa propria", amount: 1200, frequency: "mes" },
    { id: "2", title: "Carro", amount: 900, frequency: "mes" },
    { id: "3", title: "Curso", amount: 350, frequency: "mes" },
  ]);
};

export const upsertPlannedExpense = (item: PlannedExpense) => {
  const list = getPlannedExpenses();
  writeJson("planned_expenses", withId(list, item));
};

export const deletePlannedExpense = (id: string) => {
  const list = getPlannedExpenses().filter((item) => item.id !== id);
  writeJson("planned_expenses", list);
};

export const getInvestmentAllocations = (): InvestmentAllocation[] => {
  return readJson<InvestmentAllocation[]>("investment_allocations", [
    { id: "1", label: "Renda fixa", percent: 45, style: "default" },
    { id: "2", label: "Fundos imobiliarios", percent: 28, style: "alt" },
    { id: "3", label: "Acoes", percent: 27, style: "soft" },
  ]);
};

export const upsertInvestmentAllocation = (item: InvestmentAllocation) => {
  const list = getInvestmentAllocations();
  writeJson("investment_allocations", withId(list, item));
};

export const deleteInvestmentAllocation = (id: string) => {
  const list = getInvestmentAllocations().filter((item) => item.id !== id);
  writeJson("investment_allocations", list);
};

export const getInvestmentReturns = (): InvestmentReturn[] => {
  return readJson<InvestmentReturn[]>("investment_returns", [
    { id: "1", label: "12 meses", percent: 14.2, style: "default" },
    { id: "2", label: "24 meses", percent: 22.9, style: "soft" },
  ]);
};

export const upsertInvestmentReturn = (item: InvestmentReturn) => {
  const list = getInvestmentReturns();
  writeJson("investment_returns", withId(list, item));
};

export const deleteInvestmentReturn = (id: string) => {
  const list = getInvestmentReturns().filter((item) => item.id !== id);
  writeJson("investment_returns", list);
};
