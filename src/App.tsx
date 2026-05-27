import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect, useState } from "react";

import { HomeRouter } from "./routes/HomeRouter";
import { AsaLoading } from "./components/AsaLoading";
import WhatsAppButton from "./components/WhatsappButton";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // pantalla completa primero
  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <AsaLoading />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeRouter />} />
      </Routes>

      <Toaster />
      <Footer />
      <WhatsAppButton />
    </>
  );
}