import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import AppFooter from "../components/AppFooter";

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen">
            <div className="px-8 py-6 max-w-full mx-auto">
                <PublicNavbar />
                <section className="flex items-center justify-between ml-10 mt-24 mb-36">
                    <div className="w-1/2">
                        <h1 className="text-4xl font-bold text-gray-100 ate mb-4">
                            Menghubungkan Seni dan Keaslian
                        </h1>
                        <p className="text-lg text-gray-100 mb-8">
                            Mencatat dan Menelusuri Produk Kerajinan Tenun Tradisional dengan Teknologi Blockchain
                        </p>
                        <a
                            href="/public-tracer"
                            className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-300"
                        >
                            Buktikan
                        </a>
                    </div>
                    <div className="w-1/2">
                        <img src="eth_tenun.png" alt="Illustration" className="w-3/5 mx-36 shadow-2xl shadow-slate-900 rounded-3xl" />
                    </div>
                </section>
                <section className=" ml-10 mt-24">
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Cara Kerja Sistem
                    </h1>
                        <img src="buatbuat.png" alt="Illustration" className="w-full mx-auto shadow-2xl shadow-slate-900 rounded-3xl" />
                </section>
            </div>
            <AppFooter />
        </div>
    );
};

export default Home;
