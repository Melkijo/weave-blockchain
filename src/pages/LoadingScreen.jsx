import React from "react";
const LoadingScreen = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-7 bg-[#091233]">
      <div className="animate-bounce ">
        <div className="animate-spin">
          <div className="w-[100px] h-[100px] bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-xl"></div>
        </div>
      </div>

      <div>
        <p className="text-xl font-bold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
