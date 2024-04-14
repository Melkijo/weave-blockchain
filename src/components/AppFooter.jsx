import React from "react";
const AppFooter = () => {
  return (
    <div className="py-6 bg-slate-950">
      <div className="container mx-auto text-center">
        <p className="font-light text-white text-md">
          © {new Date().getFullYear()} WeaveChain. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AppFooter;
