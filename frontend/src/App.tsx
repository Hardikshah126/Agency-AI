import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Index";
import AppDashboard from "@/pages/AppDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
