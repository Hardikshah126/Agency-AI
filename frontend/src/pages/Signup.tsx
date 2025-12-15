import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    try {
      await signup({ email, password });
      navigate("/app"); // ✅ go to dashboard
    } catch (e: any) {
      setError(e?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[360px] space-y-4">
        <h1 className="text-2xl font-bold">Create account</h1>

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleSignup} disabled={loading} className="w-full">
          {loading ? "Creating..." : "Sign up"}
        </Button>
      </div>
    </div>
  );
}
