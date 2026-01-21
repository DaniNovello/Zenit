export type ModalField = {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
};

export type ModalConfig = {
  title: string;
  description?: string;
  mode?: "view" | "form";
  actionLabel?: string;
  fields?: ModalField[];
  initialValues?: Record<string, string>;
  content?: ReactNode;
  onSubmit?: (values: Record<string, string>) => Promise<void>;
};

export interface Transaction {
  id: string;
  description: string;
  subtitle?: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  progress: number;
  style?: "default" | "alt" | "soft";
}

export interface CreditCard {
  id: string;
  name: string;
  holderName: string;
  lastDigits: string;
  limitAmount: number;
  availableAmount: number;
  style: "default" | "alt" | "dark";
}

export interface Invoice {
  id: string;
  cardName: string;
  amount: number;
}

export interface Alert {
  id: string;
  title: string;
  value: string;
  progress: number;
  style?: "default" | "alt" | "soft";
}

export interface PlannedExpense {
  id: string;
  title: string;
  amount: number;
  frequency: string;
}

export interface Bill {
  id: string;
  title: string;
  amount: number;
}

export interface MonthlyMetric {
  id: string;
  label: string;
  value: number;
  trend: string;
  trendDirection: "up" | "down";
}

export interface Profile {
  id: string;
  name: string | null;
  email: string | null;
  avatarUrl?: string | null;
}
import type { ReactNode } from "react";
