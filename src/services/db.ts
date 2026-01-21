import { supabase } from "./supabase";
import type {
  CreditCard,
  Goal,
  PlannedExpense,
  Profile,
  Transaction,
} from "../app/types";

type DbTransaction = {
  id: string;
  description: string;
  subtitle: string | null;
  amount: number;
  type: "income" | "expense";
  category: string | null;
  created_at: string;
};

type DbCreditCard = {
  id: string;
  name: string;
  holder_name: string;
  last_digits: string;
  limit_amount: number;
  available_amount: number;
  style: "default" | "alt" | "dark";
};

type DbGoal = {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
};

type DbProfile = {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
};

type DbAlertSettings = {
  id: string;
  user_id: string;
  limit_percent: number;
  subscriptions_budget: number;
};

type DbPlannedExpense = {
  id: string;
  title: string;
  amount: number;
  frequency: string;
};

type DbInvestmentAllocation = {
  id: string;
  label: string;
  percent: number;
  style: "default" | "alt" | "soft";
};

type DbInvestmentReturn = {
  id: string;
  label: string;
  percent: number;
  style: "default" | "alt" | "soft";
};

const mapTransaction = (row: DbTransaction): Transaction => ({
  id: row.id,
  description: row.description,
  subtitle: row.subtitle ?? undefined,
  amount: Number(row.amount),
  type: row.type,
  category: row.category ?? undefined,
  createdAt: row.created_at,
});

const mapCreditCard = (row: DbCreditCard): CreditCard => ({
  id: row.id,
  name: row.name,
  holderName: row.holder_name,
  lastDigits: row.last_digits,
  limitAmount: Number(row.limit_amount),
  availableAmount: Number(row.available_amount),
  style: row.style ?? "default",
});

const mapGoal = (row: DbGoal): Goal => {
  const progress = row.target_amount
    ? (row.current_amount / row.target_amount) * 100
    : 0;

  return {
    id: row.id,
    title: row.title,
    currentAmount: Number(row.current_amount),
    targetAmount: Number(row.target_amount),
    progress,
    style: "default",
  };
};

const mapProfile = (row: DbProfile): Profile => ({
  id: row.id,
  name: row.name,
  email: row.email,
  avatarUrl: row.avatar_url,
});

const mapPlannedExpense = (row: DbPlannedExpense): PlannedExpense => ({
  id: row.id,
  title: row.title,
  amount: Number(row.amount),
  frequency: row.frequency,
});

const mapAllocation = (row: DbInvestmentAllocation) => ({
  id: row.id,
  label: row.label,
  percent: Number(row.percent),
  style: row.style ?? "default",
});

const mapReturn = (row: DbInvestmentReturn) => ({
  id: row.id,
  label: row.label,
  percent: Number(row.percent),
  style: row.style ?? "default",
});

const getUserId = async () => {
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    throw new Error("Usuario nao autenticado.");
  }
  return data.user.id;
};

export const fetchTransactions = async () => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data as DbTransaction[]).map(mapTransaction);
};

export const queryTransactions = async (params: {
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}) => {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 10;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("transactions")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.search) {
    query = query.ilike("description", `%${params.search}%`);
  }
  if (params.category) {
    query = query.ilike("category", `%${params.category}%`);
  }
  if (params.startDate) {
    query = query.gte("created_at", params.startDate);
  }
  if (params.endDate) {
    query = query.lte("created_at", params.endDate);
  }

  const { data, error, count } = await query;
  if (error) {
    throw error;
  }

  return {
    data: (data as DbTransaction[]).map(mapTransaction),
    count: count ?? 0,
  };
};

export const createTransaction = async (payload: {
  description: string;
  subtitle?: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  created_at?: string;
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("transactions").insert({
    user_id: userId,
    description: payload.description,
    subtitle: payload.subtitle ?? null,
    amount: payload.amount,
    type: payload.type,
    category: payload.category ?? null,
    created_at: payload.created_at ?? undefined,
  });

  if (error) {
    throw error;
  }
};

export const updateTransaction = async (payload: {
  id: string;
  description: string;
  subtitle?: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  created_at?: string;
}) => {
  const { error } = await supabase
    .from("transactions")
    .update({
      description: payload.description,
      subtitle: payload.subtitle ?? null,
      amount: payload.amount,
      type: payload.type,
      category: payload.category ?? null,
      created_at: payload.created_at ?? undefined,
    })
    .eq("id", payload.id);

  if (error) {
    throw error;
  }
};

export const deleteTransaction = async (id: string) => {
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export const fetchCreditCards = async () => {
  const { data, error } = await supabase.from("credit_cards").select("*");

  if (error) {
    throw error;
  }

  return (data as DbCreditCard[]).map(mapCreditCard);
};

export const createCreditCard = async (payload: {
  name: string;
  holder_name: string;
  last_digits: string;
  limit_amount: number;
  available_amount: number;
  style?: "default" | "alt" | "dark";
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("credit_cards").insert({
    user_id: userId,
    name: payload.name,
    holder_name: payload.holder_name,
    last_digits: payload.last_digits,
    limit_amount: payload.limit_amount,
    available_amount: payload.available_amount,
    style: payload.style ?? "default",
  });

  if (error) {
    throw error;
  }
};

export const updateCreditCard = async (payload: {
  id: string;
  name: string;
  holder_name: string;
  last_digits: string;
  limit_amount: number;
  available_amount: number;
  style?: "default" | "alt" | "dark";
}) => {
  const { error } = await supabase
    .from("credit_cards")
    .update({
      name: payload.name,
      holder_name: payload.holder_name,
      last_digits: payload.last_digits,
      limit_amount: payload.limit_amount,
      available_amount: payload.available_amount,
      style: payload.style ?? "default",
    })
    .eq("id", payload.id);

  if (error) {
    throw error;
  }
};

export const deleteCreditCard = async (id: string) => {
  const { error } = await supabase.from("credit_cards").delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export const fetchGoals = async () => {
  const { data, error } = await supabase.from("goals").select("*");

  if (error) {
    throw error;
  }

  return (data as DbGoal[]).map(mapGoal);
};

export const createGoal = async (payload: {
  title: string;
  target_amount: number;
  current_amount: number;
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("goals").insert({
    user_id: userId,
    title: payload.title,
    target_amount: payload.target_amount,
    current_amount: payload.current_amount,
  });

  if (error) {
    throw error;
  }
};

export const updateGoal = async (payload: {
  id: string;
  title: string;
  target_amount: number;
  current_amount: number;
}) => {
  const { error } = await supabase
    .from("goals")
    .update({
      title: payload.title,
      target_amount: payload.target_amount,
      current_amount: payload.current_amount,
    })
    .eq("id", payload.id);

  if (error) {
    throw error;
  }
};

export const deleteGoal = async (id: string) => {
  const { error } = await supabase.from("goals").delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return mapProfile(data as DbProfile);
};

export const updateProfile = async (payload: {
  id: string;
  name: string;
  email: string;
}) => {
  const { error } = await supabase.from("profiles").update({
    name: payload.name,
    email: payload.email,
  }).eq("id", payload.id);

  if (error) {
    throw error;
  }
};

export const fetchAlertSettings = async () => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from("alert_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return {
      limitPercent: 70,
      subscriptionsBudget: 210,
    };
  }

  const row = data as DbAlertSettings;
  return {
    limitPercent: Number(row.limit_percent),
    subscriptionsBudget: Number(row.subscriptions_budget),
  };
};

export const upsertAlertSettings = async (payload: {
  limitPercent: number;
  subscriptionsBudget: number;
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("alert_settings").upsert({
    user_id: userId,
    limit_percent: payload.limitPercent,
    subscriptions_budget: payload.subscriptionsBudget,
  });

  if (error) {
    throw error;
  }
};

export const fetchPlannedExpenses = async () => {
  const { data, error } = await supabase.from("planned_expenses").select("*");
  if (error) {
    throw error;
  }
  return (data as DbPlannedExpense[]).map(mapPlannedExpense);
};

export const createPlannedExpense = async (payload: {
  title: string;
  amount: number;
  frequency: string;
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("planned_expenses").insert({
    user_id: userId,
    title: payload.title,
    amount: payload.amount,
    frequency: payload.frequency,
  });
  if (error) {
    throw error;
  }
};

export const updatePlannedExpense = async (payload: {
  id: string;
  title: string;
  amount: number;
  frequency: string;
}) => {
  const { error } = await supabase
    .from("planned_expenses")
    .update({
      title: payload.title,
      amount: payload.amount,
      frequency: payload.frequency,
    })
    .eq("id", payload.id);
  if (error) {
    throw error;
  }
};

export const deletePlannedExpense = async (id: string) => {
  const { error } = await supabase
    .from("planned_expenses")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
};

export const fetchInvestmentAllocations = async () => {
  const { data, error } = await supabase
    .from("investment_allocations")
    .select("*");
  if (error) {
    throw error;
  }
  return (data as DbInvestmentAllocation[]).map(mapAllocation);
};

export const upsertInvestmentAllocation = async (payload: {
  id?: string;
  label: string;
  percent: number;
  style?: "default" | "alt" | "soft";
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("investment_allocations").upsert({
    id: payload.id,
    user_id: userId,
    label: payload.label,
    percent: payload.percent,
    style: payload.style ?? "default",
  });
  if (error) {
    throw error;
  }
};

export const deleteInvestmentAllocation = async (id: string) => {
  const { error } = await supabase
    .from("investment_allocations")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
};

export const fetchInvestmentReturns = async () => {
  const { data, error } = await supabase
    .from("investment_returns")
    .select("*");
  if (error) {
    throw error;
  }
  return (data as DbInvestmentReturn[]).map(mapReturn);
};

export const upsertInvestmentReturn = async (payload: {
  id?: string;
  label: string;
  percent: number;
  style?: "default" | "alt" | "soft";
}) => {
  const userId = await getUserId();
  const { error } = await supabase.from("investment_returns").upsert({
    id: payload.id,
    user_id: userId,
    label: payload.label,
    percent: payload.percent,
    style: payload.style ?? "default",
  });
  if (error) {
    throw error;
  }
};

export const deleteInvestmentReturn = async (id: string) => {
  const { error } = await supabase
    .from("investment_returns")
    .delete()
    .eq("id", id);
  if (error) {
    throw error;
  }
};
