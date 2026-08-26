import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export const InstallAppButton: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<InstallPrompt | null>(null);
  useEffect(() => {
    const handler = (event: Event) => { event.preventDefault(); setInstallPrompt(event as InstallPrompt); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  if (!installPrompt) return null;
  return <button onClick={async () => { await installPrompt.prompt(); await installPrompt.userChoice; setInstallPrompt(null); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#e6ede4] border border-[#b8c9b7] text-[#3f5a44] hover:bg-[#dbe6d9] transition"><Download className="w-4 h-4" /> Instalar</button>;
};
