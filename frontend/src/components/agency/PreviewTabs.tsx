// src/components/agency/PreviewTabs.tsx
import React from "react";

export interface PreviewTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  /**
   * generated is a mapping from backend platform key
   * e.g. { linkedin: "...", x: "...", instagram_reel: "..." }
   */
  generated?: Record<string, string>;
}

const PLATFORMS: { uiKey: string; backendKey: string; label: string }[] = [
  { uiKey: "linkedin", backendKey: "linkedin", label: "LinkedIn" },
  { uiKey: "x", backendKey: "x", label: "X / Thread" },
  { uiKey: "reel", backendKey: "instagram_reel", label: "Reel Script" },
];

export const PreviewTabs: React.FC<PreviewTabsProps> = ({
  activeTab,
  onTabChange,
  generated,
}) => {
  const getBackendKey = (uiKey: string) => {
    return PLATFORMS.find((p) => p.uiKey === uiKey)?.backendKey;
  };

  const renderContentFor = (uiKey: string) => {
    const backendKey = getBackendKey(uiKey);
    const text = backendKey ? generated?.[backendKey] : undefined;

    if (text && text.trim().length > 0) {
      return (
        <div className="prose max-w-none whitespace-pre-wrap break-words">
          {text}
        </div>
      );
    }

    return (
      <div className="text-sm text-muted-foreground">
        No generated content yet for <strong>{uiKey}</strong>.  
        Type an idea and click <em>Generate</em>.
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {PLATFORMS.map((p) => {
          const active = p.uiKey === activeTab;
          return (
            <button
              key={p.uiKey}
              onClick={() => onTabChange(p.uiKey)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Preview Area */}
      <div className="rounded-lg border border-border bg-background p-5 min-h-[220px]">
        {renderContentFor(activeTab)}
      </div>
    </div>
  );
};

export default PreviewTabs;
