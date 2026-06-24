import { HeroProvider, useHero } from "./HeroContext";
import { Sidebar, BottomDock } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MissionControl } from "./MissionControl";
import { DeepScan } from "./DeepScan";
import { NeuralLink } from "./NeuralLink";
import { PowerStats } from "./PowerStats";
import { Celebration } from "./Celebration";
import { ComplianceModal } from "./ComplianceModal";

function Viewport() {
  const { view } = useHero();
  return (
    <main className="md:ml-72 px-4 md:px-8 pt-6 pb-28 md:pb-8 max-w-5xl mx-auto">
      <TopBar />
      {view === "mission" && <MissionControl />}
      {view === "scan" && <DeepScan />}
      {view === "link" && <NeuralLink />}
      {view === "stats" && <PowerStats />}
    </main>
  );
}

export function HeroApp() {
  return (
    <HeroProvider>
      <div className="min-h-screen w-full">
        <Sidebar />
        <Viewport />
        <BottomDock />
        <Celebration />
        <ComplianceModal />
      </div>
    </HeroProvider>
  );
}
