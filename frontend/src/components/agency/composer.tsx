// src/components/agency/Composer.tsx
import React, { useState } from "react";
import useGenerate from "@/hooks/useGenerate";

export default function Composer() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("linkedin");
  const { generate, loading, output, error } = useGenerate();

  const onGenerate = async () => {
    if (!topic.trim()) return alert("Type an idea first");
    await generate({
      topic: topic.trim(),
      platform,
      tone: "friendly",
      brand_voice: null,
    });
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <label>Your idea</label>
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        rows={6}
        style={{ width: "100%", padding: 12 }}
      />

      <div>
        <button onClick={() => setPlatform("linkedin")} style={{ marginRight: 8 }}>
          LinkedIn
        </button>
        <button onClick={() => setPlatform("x")} style={{ marginRight: 8 }}>
          X (Thread)
        </button>
        <button onClick={() => setPlatform("reel")}>Reel Script</button>
      </div>

      <div>
        <button onClick={onGenerate} disabled={loading}>
          {loading ? "Generating…" : "Generate Content"}
        </button>
      </div>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {output && (
        <div>
          <h4>Result</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>{output}</pre>
        </div>
      )}
    </div>
  );
}
