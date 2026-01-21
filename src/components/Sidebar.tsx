import { NAV_ITEMS, type SectionId } from "../data/navigation";
import { supabase } from "../services/supabase";

type SidebarProps = {
  activeSection: SectionId;
  onSelect: (section: SectionId) => void;
};

export const Sidebar = ({ activeSection, onSelect }: SidebarProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">F</div>
        <div className="brand-text">
          <span className="brand-title">Fluxo</span>
          <span className="brand-sub">gestor financeiro</span>
        </div>
      </div>
      <nav className="nav" aria-label="Menu principal">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-card">
        <p className="sidebar-card-title">Saldo atual</p>
        <p className="sidebar-card-value">R$ 12.480,90</p>
        <p className="sidebar-card-note">Atualizado agora</p>
        <button className="ghost logout-btn" type="button" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </aside>
  );
};
