import React, { useState } from 'react';
import PublicNavbar from '../components/PublicNavbar';
import AppFooter from '../components/AppFooter';

const UserGuides = () => {
  const [activeTab, setActiveTab] = useState("register");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <div className="px-8 py-6 max-w-full mx-auto">
        <PublicNavbar />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-gray-100 font-bold mb-4">Panduan Pengguna</h1>
          <div className="w-full max-w-3xl">
            <div className="flex justify-center mb-4">
              <button
                className={`text-lg border rounded-lg px-2 py-1 text-gray-100 mx-2 hover:bg-blue-400 transition-transform ${activeTab === "register" && "bg-blue-500"
                  }`}
                onClick={() => handleTabClick("register")}
              >
                Register
              </button>
              <button
                className={`text-lg border rounded-lg px-2 py-1 text-gray-100 mx-2 hover:bg-blue-400 transition-transform ${activeTab === "sign-in" && "bg-blue-500"
                  }`}
                onClick={() => handleTabClick("sign-in")}
              >
                Sign In
              </button>
              <button
                className={`text-lg border rounded-lg px-2 py-1 text-gray-100 mx-2 hover:bg-blue-400 transition-transform ${activeTab === "user-navbar" && "bg-blue-500"
                  }`}
                onClick={() => handleTabClick("user-navbar")}
              >
                Navbar User
              </button>
              <button
                className={`text-lg border rounded-lg px-2 py-1 text-gray-100 mx-2 hover:bg-blue-400 transition-transform ${activeTab === "dashboard" && "bg-blue-500"
                  }`}
                onClick={() => handleTabClick("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`text-lg border rounded-lg px-2 py-1 text-gray-100 mx-2 hover:bg-blue-400 transition-transform ${activeTab === "market" && "bg-blue-500"
                  }`}
                onClick={() => handleTabClick("market")}
              >
                Market
              </button>
              <button
                className={`text-lg border rounded-lg px-2 py-1 text-gray-100 mx-2 hover:bg-blue-400 transition-transform ${activeTab === "trace-product" && "bg-blue-500"
                  }`}
                onClick={() => handleTabClick("trace-product")}
              >
                Trace Product
              </button>
            </div>
            <div className="border-t border-gray-200 my-10"></div>
            {activeTab === "register" && (
              <div className="mb-8">
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Langkah 1: Menekan menu "Register" di bagian modal Sign In</h2>
                <img
                  src="register-1.jpg"
                  alt="Register IMG"
                  className="w-full rounded-lg shadow-lg mb-4"
                />
                <p className=" text-gray-100">
                  Setelah  menekan tombol Sign In pada bagian NavBar, selanjutnya silahkan tekan menu "Register" di bagian kanan bawah pada modal Sign In.
                </p>
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Langkah 2: Selanjutnya anda akan diarahkan ke halam Register </h2>
                <p className=" text-gray-100">
                  Selama proses registrasi pastikan mengisi data yang benar...
                </p>
                {/* Konten panduan langkah 1 */}
              </div>
            )}
            {activeTab === "sign-in" && (
              <div className="mb-8">
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Langkah 1: Menekan menu "Sign In" di bagian Navbar</h2>
                <img
                  src="sign-in.jpeg"
                  alt="Sign In IMG"
                  className="w-full rounded-lg shadow-lg mb-4"
                />
                <p className=" text-gray-100">
                  Silahkan tekan menu "Sign In" di bagian Navbar terlebih dahulu
                </p>
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Langkah 2: Tekan tombol Continue</h2>
                <img
                  src="sign-in2.jpeg"
                  alt="Registration Process"
                  className="w-full rounded-lg shadow-lg mb-4"
                />
                <p className=" text-gray-100">
                  Selanjutnya akan muncul pop up untuk melanjutkan sign in, tekan "Continue" untuk melanjutkan sign in. Pastikan akun metamask anda sudah terkoneksi dan alamat ETH anda sudah terdaftar, kemudian sistem akan mengarahkan ke halaman pengguna. Selesai
                </p>
                {/* Konten panduan langkah 1 */}
              </div>
            )}
            {activeTab === "user-navbar" && (
              <div className="mb-8">
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Mengenai navigasi bar user</h2>
                {/* Konten panduan untuk Actor */}
              </div>
            )}
            {activeTab === "dashboard" && (
              <div className="mb-8">
                <h2 className="text-2xl text-gray-100 font-bold mb-4">Mengenai dashboard</h2>
                {/* Konten panduan untuk Contract Owner */}
              </div>
            )}
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default UserGuides
