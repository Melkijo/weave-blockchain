import React, { useEffect, useState } from "react";
import PublicNavbar from "../components/PublicNavbar";
import AppFooter from "../components/AppFooter";
import LoadingScreen from "./LoadingScreen";
const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="bg-[#091233] min-h-screen ">
      <div className="max-w-[1520px] py-0 md:py-6  mx-auto ">
        <PublicNavbar />
        <section className="flex flex-col-reverse items-center justify-between px-0 mt-24 mb-24 md:px-10 md:flex-row">
          <div className="w-full pl-10 md:w-1/2">
            <h1 className="text-4xl md:text-[55px] font-bold text-gray-100 font-display uppercase mb-4 leading-tight">
              Rantai pasok{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500"
                data-testid="hero-test"
              >
                Kesenian Tenun
              </span>
            </h1>
            <p className="mb-8 text-lg font-normal text-white ">
              Dimana hasil menjadi bukti nyata dan terverifikasi dalam rantai
              pasok
            </p>
            <a href="/public-tracer">
              <button
                data-testid="prove-test"
                className="px-8 py-3 text-lg font-bold text-white transition-colors duration-300 rounded-md bg-fuchsia-500 hover:bg-blue-800 hover:text-white"
              >
                Coba gratis
              </button>
            </a>
          </div>
          <div className="flex justify-center w-full mb-4 md:w-1/2">
            <img src="hero-weave.png" alt="Illustration" className="w-4/5 " />
          </div>
        </section>

        <div className="grid grid-cols-full md:grid-cols-12 px-10 md:px-20 gap-4 mt-12 py-20 bg-[#040C28]">
          <div className="flex flex-col items-start justify-center px-4 text-white col-span-full md:col-span-7 md:pl-8 rounded-xl h-60 bg-slate-800">
            <h3 className="inline-block mb-2 text-2xl md:text-[36px] font-bold text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Integrasi Blockchain
            </h3>
            <p className="w-full text-base leading-relaxed md:w-3/5 md:text-lg">
              Memanfaatkan kekuatan blockchain untuk membuat buku besar yang
              tidak dapat dipalsukan dan dan transparan untuk dokumen rantai
              pasokan Anda.
            </p>
          </div>
          <div className="flex flex-col justify-center w-full px-5 text-left text-white col-span-full md:col-span-5 enter md:text-center md:px-10 rounded-xl h-60 bg-slate-800">
            {" "}
            <h3 className="inline-block mb-2 text-2xl md:text-[36px] font-bold text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Kolaborasi yang mulus
            </h3>
            <p className="text-base leading-relaxed md:text-lg ">
              Terhubung dengan lancar dengan para pemangku kepentingan di
              seluruh rantai pasokan,
            </p>
          </div>
          <div className="flex flex-col items-start justify-center px-5 text-left text-white col-span-full md:col-span-5 md:items-center md:px-10 md:text-center rounded-xl h-60 bg-slate-800">
            <h3 className="mb-2 text-2xl md:text-[36px]  font-bold text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Keterlacakan
            </h3>
            <p className="text-base leading-relaxed md:text-lg ">
              Dapatkan visibilitas yang tak tertandingi ke dalam proses rantai
              pasokan Anda, memungkinkan penelusuran yang cepat dan akurat
            </p>
          </div>
          <div className="flex flex-col items-start justify-center px-8 text-white col-span-full md:col-span-7 rounded-xl h-60 bg-slate-800">
            <h3 className="inline-block mb-4 text-full md:w-[400px] text-2xl md:text-[36px] font-bold leading-tight text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Peningkatan Efisiensi Keamanan
            </h3>
            <p className="w-full text-base leading-relaxed md:w-3/5 md:text-lg">
              pengurangan yang signifikan dalam dokumen, kesalahan, dan
              penundaan, sehingga mendorong bisnis Anda.
            </p>
          </div>
        </div>

        <div className="px-4 my-16 text-center ">
          <h2 className="text-3xl md:text-[42px] font-display font-bold text-center text-white leading-none">
            Cara kerjanya
          </h2>
          <div className="flex justify-center w-full">
            <p className="mt-4 text-base md:text-lg font-normal text-center text-white w-[600px]">
              Platform kami dirancang agar sederhana dan ramah pengguna,
              memastikan Anda dapat memulai tanpa kerumitan.
            </p>
          </div>

          <div className="flex items-center justify-center mt-10">
            <img src="how-it-work.png" alt="" />
          </div>
        </div>

        <div className="px-8 md:px-20 mt-12 py-16 bg-[#040C28] grid grid-cols-1 md:grid-cols-12 gap-5 text-white">
          <div className="flex flex-col justify-center col-span-full md:col-span-5">
            <h3 className="mb-2 text-2xl md:text-4xl font-bold uppercase font-display w-full md:w-[400px] leading-relaxed">
              Pertanyaan yang sering ditanyakan
            </h3>
            <p className="text-base leading-8 md:text-lg">
              Pertanyaan yang Sering Diajukan untuk Kelancaran Dokumentasi
              Rantai Pasokan.
            </p>
          </div>
          <div className="gap-5 col-span-full md:col-span-7">
            <div className="mb-3 collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="text-xl font-medium collapse-title">
                Bagaimana IPFS meningkatkan keamanan dalam tenunan berbasis
                blockchain?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  IPFS mendesentralisasikan penyimpanan data, mengurangi satu
                  titik dan meningkatkan ketahanan terhadap penyensoran.
                </p>
              </div>
            </div>
            <div className="mb-3 collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title">
                Apa peran kode QR dalam implementasi ini?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  Kode QR menghubungkan objek fisik dengan catatan digitalnya di
                  IPFS, memberikan akses dan verifikasi yang mudah.
                </p>
              </div>
            </div>
            <div className="mb-3 collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title">
                Apa saja tantangan dan solusi yang potensial?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  Tantangannya meliputi interoperabilitas dan skalabilitas;
                  solusi melibatkan standardisasi dan upaya pengoptimalan yang
                  berkelanjutan.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title">
                Bagaimana IPFS dan kode QR membantu melacak dan memverifikasi
                produk dalam tenunan blockchain?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  IPFS dan kode QR memudahkan untuk memeriksa keaslian produk
                  dan melacak asal usulnya dalam tenunan blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[1000px] m-auto mt-12 mb-6 ">
          <div className="px-8 py-10 text-center text-white md:px-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-2xl">
            <h3 className="mb-3 text-2xl font-bold md:text-4xl font-display">
              LACAK TENUNAN YANG DIAUTENTIKASI!
            </h3>
            <p className="mb-5 text-lg">
              Di mana Hasil Diotentikasi dan Ditelusuri dalam Rantai Pasokan
              Keunggulan
            </p>
            <a href="/public-tracer">
              <button className="px-8 py-3 text-lg font-bold border-2 border-white rounded-xl hover:bg-fuchsia-400">
                Coba Gratis
              </button>
            </a>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Home;
