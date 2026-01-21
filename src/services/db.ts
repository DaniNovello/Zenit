import { supabase } from "./supabase";
import type { CreditCard, Goal, Profile, Transaction } from "../app/types";

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

export const createTransaction = async (payload: {
  description: string;
  subtitle?: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  created_at?: string;
}) => {
  const { error } = await supabase.from("transactions").insert({
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
  const { error } = await supabase.from("credit_cards").insert({
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
  const { error } = await supabase.from("goals").insert({
    title: payload.title,
    target_amount: payload.target_amount,
    current_amount: payload.current_amount,
  });

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
