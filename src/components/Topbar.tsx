import { type ReactNode } from "react";

type TopbarProps = {
  eyebrow: string;
  title: string;
  actions?: ReactNode;
};

export const Topbar = ({ eyebrow, title, actions }: TopbarProps) => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {actions ? <div className="topbar-actions">{actions}</div> : null}
    </header>
  );
};
