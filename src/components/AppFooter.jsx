import React from "react";

const AppFooter = () => {
  return (
    <div className="bg-black py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm text-white font-light">
          © {new Date().getFullYear()} WeaveChain. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AppFooter;
