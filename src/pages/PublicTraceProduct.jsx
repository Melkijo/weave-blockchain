import React, { useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import PublicTracer from "../components/PublicTracer";
import AppFooter from "../components/AppFooter";
// import QRCode from "react-qr-code";

const PublicTraceProduct = () => {
  return (
    <div className="bg-[#091233] min-h-screen">
      <div className="max-w-full py-6 mx-auto">
        <PublicNavbar />
        <PublicTracer />
      </div>
      <AppFooter />
    </div>
  );
};

export default PublicTraceProduct;
