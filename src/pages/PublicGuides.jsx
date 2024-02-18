import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import AppFooter from '../components/AppFooter';

const PublicGuides = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
      <div className="px-8 py-6 max-w-full mx-auto">
        <PublicNavbar />
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-gray-100 font-bold mb-4">Cara Terhubung ke Web3</h1>
          <p className="text-lg text-gray-100 mb-8">
            Anda harus terhubung ke Web3 untuk dapat mengakses data yang tersimpan di Blockchain, Berikut beberapa langkah untuk terhubung ke Web3.
          </p>
          <div className="w-full max-w-3xl">
            <div className="mb-8">
              <h2 className="text-2xl text-gray-100 font-bold mb-4">Langkah 1: Hubungkan Akun Metamask</h2>
              <img
                src="metamask.png"
                alt="Registration Process"
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <p className=" text-gray-100">
                Silahkan hubungkan akun Metamask anda melalui extension (Link: <a href="https://metamask.io/download/" className="text-blue-800 hover:text-blue-600">https://metamask.io/download/</a>), ikuti step-by-step pembuatan akun dari Metamask.
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl text-gray-100 font-bold mb-4">Langkah 2: Tambahkan Jaringan Sepolia Ethereum Testnet</h2>
              <img
                src="sepolia.jpeg"
                alt="Dashboard"
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <p className=" text-gray-100">
                Saat ini, sistem berjalan di jaringan publik ethereum testnet yaitu Sepolia. Silahkan tambahkan Sepolia testnet ke Metamask anda (Link: <a href="https://sepolia.dev/" className="text-blue-800 hover:text-blue-600">https://sepolia.dev</a>) dan tekan "Add to Metamask". Pastikan anda memilih jaringan Sepolia pada Metamask Extension.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-gray-100 font-bold mb-4">You're all set up</h2>
              <img
                src="cekproduk.png"
                alt="Account Settings"
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <p className=" text-gray-100">
                Setelah terhubung ke jaringan artinya anda sudah terhubung ke Web3, anda dapat mengakses data seperti <a href="/public-tracer" className="text-blue-800 hover:text-blue-500">cek produk</a>. Enjoy
              </p>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default PublicGuides;
