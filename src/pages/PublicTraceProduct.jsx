import React, { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicTracer from "../components/PublicTracer";
import AppFooter from "../components/AppFooter";
import QRCode from "react-qr-code";

const PublicTraceProduct = () => {
  const [qrCode, setQrCode] = useState("");
  const currentURL = window.location.href;
  console.log(currentURL);
  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <div className="px-8 py-6 max-w-full mx-auto">
        <PublicNavbar />
        <button
          className="bg-blue-500 py-3 px-5"
          onClick={() => setQrCode(currentURL)}
        >
          Create QR
        </button>
        <PublicTracer />
      </div>
      <AppFooter />
      {qrCode && <QRCode value={qrCode} />}
    </div>
  );
};

export default PublicTraceProduct;