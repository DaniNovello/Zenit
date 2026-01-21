export type ModalConfig = {
  title: string;
  description?: string;
  mode?: "view" | "form";
  actionLabel?: string;
};

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category?: string;
}

export interface CreditCard {
  id: string;
  lastDigits: string;
  holder: string;
  availableLimit: number;
  style?: "default" | "alt" | "dark";
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

export interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
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
