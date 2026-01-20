import { NAV_ITEMS, type SectionId } from "../data/navigation";

type MobileNavProps = {
  activeSection: SectionId;
  onSelect: (section: SectionId) => void;
};

export const MobileNav = ({ activeSection, onSelect }: MobileNavProps) => {
  return (
    <nav className="mobile-nav" aria-label="Menu mobile">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-pill ${activeSection === item.id ? "active" : ""}`}
          onClick={() => onSelect(item.id)}
          type="button"
        >
          {item.shortLabel}
        </button>
      ))}
    </nav>
  );
};
