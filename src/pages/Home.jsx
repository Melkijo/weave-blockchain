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
      <div className="max-w-[1520px] py-6  mx-auto ">
        <PublicNavbar />
        <section className="flex items-center justify-between px-10 mt-24 mb-24">
          <div className="w-1/2 pl-10">
            <h1 className="text-[55px] font-bold text-gray-100 font-display uppercase mb-4 leading-tight">
              Certify and Trace the{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500"
                data-testid="hero-test"
              >
                Art of Weaving
              </span>
            </h1>
            <p className="mb-8 text-lg font-normal text-white ">
              Where Results are Authenticated and Traced in Supply Chain
              Excellence!
            </p>
            <a href="/public-tracer">
              <button
                data-testid="prove-test"
                className="px-8 py-3 text-lg font-bold text-white transition-colors duration-300 rounded-md bg-fuchsia-500 hover:bg-blue-800 hover:text-white"
              >
                Prove it
              </button>
            </a>
          </div>
          <div className="flex justify-center w-1/2">
            <img src="hero-weave.png" alt="Illustration" className="w-4/5 " />
          </div>
        </section>

        <div className="grid grid-cols-12 px-20 gap-4 mt-12 py-20 bg-[#040C28]">
          <div className="flex flex-col items-start justify-center col-span-7 pl-8 text-white rounded-xl h-60 bg-slate-800">
            <h3 className="inline-block mb-2 text-[36px] font-bold text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Blockchain Integration
            </h3>
            <p className="w-3/5 text-lg leading-relaxed">
              Utilize the power of blockchain to create an unforgeable and
              transparent ledger for your supply chain documents.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-5 px-10 text-center text-white rounded-xl h-60 bg-slate-800">
            {" "}
            <h3 className="inline-block mb-2 text-[36px] font-bold text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Seamless Collaboration
            </h3>
            <p className="text-lg leading-relaxed ">
              Connect seamlessly with stakeholders across the supply chain,
              fostering real-time collaboration and information sharing.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center col-span-5 px-10 text-center text-white rounded-xl h-60 bg-slate-800">
            <h3 className="mb-2 text-[36px]  font-bold text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Traceability
            </h3>
            <p className="text-lg leading-relaxed ">
              Gain unparalleled visibility into your supply chain processes,
              allowing for quick and accurate traceability
            </p>
          </div>
          <div className="flex flex-col items-start justify-center col-span-7 pl-8 text-white rounded-xl h-60 bg-slate-800">
            <h3 className="inline-block mb-4 w-[400px] text-[36px] font-bold leading-tight text-transparent font-display bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text">
              Efficiency Boost and Enhanced Security
            </h3>
            <p className="w-3/5 text-lg leading-relaxed">
              Experience a significant reduction in paperwork, errors, and
              delays, propelling your business towards.
            </p>
          </div>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-[42px] font-display font-bold text-center text-white leading-none">
            How It Works
          </h2>
          <div className="flex justify-center w-full">
            <p className="mt-4 text-lg font-normal text-center text-white w-[600px]">
              Our platform is designed to be simple and user-friendly, ensuring
              that you can get started without any hassle.
            </p>
          </div>

          <div className="flex items-center justify-center mt-10">
            <img src="how-it-work.png" alt="" />
          </div>
        </div>

        <div className="px-20 mt-12 py-16 bg-[#040C28] grid grid-cols-12 gap-5 text-white">
          <div className="flex flex-col justify-center col-span-5">
            <h3 className="mb-2 text-4xl font-bold uppercase font-display w-[400px] leading-relaxed">
              Frequently ask question
            </h3>
            <p className="text-lg leading-8">
              Unraveling Answers to Your Frequently Asked Questions for Seamless
              Supply Chain Documentation.
            </p>
          </div>
          <div className="col-span-7 gap-5">
            <div className="mb-3 collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="text-xl font-medium collapse-title">
                How does IPFS enhance security in a blockchain-based weave?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  IPFS decentralizes data storage, reducing single-point
                  failures and increasing resistance to censorship.
                </p>
              </div>
            </div>
            <div className="mb-3 collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title">
                What role do QR codes play in this implementation?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  QR codes link physical objects to their digital records on
                  IPFS, providing easy access and verification.
                </p>
              </div>
            </div>
            <div className="mb-3 collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title">
                What are potential challenges and solutions?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  Challenges include interoperability and scalability; solutions
                  involve standardization and ongoing optimization efforts.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-slate-800">
              <input type="radio" name="my-accordion-3" />
              <div className="text-xl font-medium collapse-title">
                How do IPFS and QR codes help track and verify products in a
                blockchain weave?
              </div>
              <div className="collapse-content">
                <p className="pr-20 text-lg font-light leading-8">
                  IPFS and QR codes make it easy to check product authenticity
                  and trace their origin in the blockchain weave.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[1000px] m-auto mt-12 mb-6">
          <div className="py-10 text-center text-white bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-2xl">
            <h3 className="mb-3 text-4xl font-bold font-display">
              TRACE YOUR AUTHENTICATED WEAVE!
            </h3>
            <p className="mb-5 text-lg ">
              Where Results are Authenticated and Traced in Supply Chain
              Excellence
            </p>
            <a href="/public-tracer">
              <button className="px-8 py-3 text-lg font-bold border-2 border-white rounded-xl hover:bg-fuchsia-400">
                Prove It!
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
