// src/hooks/useGenerate.tsx
import { useState } from "react";
import api, { setAuthToken } from "@/lib/api"; // adjust path if you don't use @ alias

type Payload = {
  topic: string;
  platform: string;
  tone?: string | null;
  brand_voice?: string | null;
};

export default function useGenerate() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate(payload: Payload) {
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const token = localStorage.getItem("access_token");
      setAuthToken(token);

      const resp = await api.post("/api/generate", payload);
      const data = resp.data;

      // adapt to backend response shape
      const text =
        typeof data === "string" ? data : data?.text || data?.content || (data?.result && JSON.stringify(data.result));

      setOutput(text ?? null);
      return text;
    } catch (err: any) {
      console.error("generate error:", err?.response || err);
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.response?.statusText ||
        err?.message ||
        "Generation failed";
      setError(String(msg));
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { generate, loading, output, error };
}
