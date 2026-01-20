import { useEffect, useMemo, useState } from "react";
import { MobileNav } from "../components/MobileNav";
import { Modal } from "../components/Modal";
import { Sidebar } from "../components/Sidebar";
import { NAV_ITEMS, type SectionId } from "../data/navigation";
import { Cartoes } from "../pages/Cartoes";
import { Configuracoes } from "../pages/Configuracoes";
import { Dashboard } from "../pages/Dashboard";
import { Extrato } from "../pages/Extrato";
import { Investimentos } from "../pages/Investimentos";
import { Metas } from "../pages/Metas";
import { type ModalConfig } from "./types";

export const App = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(modalConfig));
  }, [modalConfig]);

  const openModal = (config: ModalConfig) => {
    setModalConfig(config);
  };

  const content = useMemo(() => {
    switch (activeSection) {
      case "cartoes":
        return <Cartoes onOpenModal={openModal} />;
      case "extrato":
        return <Extrato onOpenModal={openModal} />;
      case "metas":
        return <Metas onOpenModal={openModal} />;
      case "investimentos":
        return <Investimentos onOpenModal={openModal} />;
      case "configuracoes":
        return <Configuracoes onOpenModal={openModal} />;
      case "dashboard":
      default:
        return <Dashboard onOpenModal={openModal} />;
    }
  }, [activeSection, openModal]);

  return (
    <div className="app-shell">
      <div className="ambient">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="app">
        <Sidebar activeSection={activeSection} onSelect={setActiveSection} />

        <main className="content" aria-live="polite">
          {content}
        </main>

        <MobileNav activeSection={activeSection} onSelect={setActiveSection} />
      </div>

      {modalConfig ? (
        <Modal config={modalConfig} onClose={() => setModalConfig(null)} />
      ) : null}

      <div className="sr-only" aria-hidden="true">
        {NAV_ITEMS.map((item) => item.label).join(", ")}
      </div>
    </div>
  );
};
