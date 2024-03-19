import React from "react";
import PublicNavbar from "../components/PublicNavbar";
import AppFooter from "../components/AppFooter";

const Home = () => {
  return (
    <div className="bg-[#091233] min-h-screen">
      <div className=" py-6 max-w-full mx-auto">
        <PublicNavbar />
        <section className="flex items-center justify-between ml-10 mt-24 mb-36">
          <div className="w-1/2">
            <h1 className="text-[55px] font-bold text-gray-100 font-display uppercase mb-4">
              Certify and Trace the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7F00FF] to-[#E100FF]">
                Art of Weaving
              </span>
            </h1>
            <p className="text-lg text-gray-100 mb-8">
              Where Results are Authenticated and Traced in Supply Chain
              Excellence!
            </p>
            <a
              href="/public-tracer"
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 hover:text-white transition-colors duration-300"
            >
              Prove it
            </a>
          </div>
          <div className="w-1/2">
            <img src="hero-weave.png" alt="Illustration" className="w-4/5 " />
          </div>
        </section>

        <div className="grid grid-cols-12 px-32 gap-4 mt-12 py-16 bg-[#040C28]">
          <div className="col-span-8 bg-blue-400 h-48 flex flex-col justify-center text-white p-5 rounded-md">
            <h3 className="font-bold text-2xl mb-2">Blockchain Integration</h3>
            <p className="w-3/4">
              Utilize the power of blockchain to create an unforgeable and
              transparent ledger for your supply chain documents.
            </p>
          </div>
          <div className="col-span-4 bg-red-400 h-48 flex flex-col justify-center text-white p-5 rounded-md">
            {" "}
            <h3 className="font-bold text-2xl mb-2">Seamless Collaboration</h3>
            <p>
              Connect seamlessly with stakeholders across the supply chain,
              fostering real-time collaboration and information sharing.
            </p>
          </div>
          <div className="col-span-4 bg-blue-400 h-48 flex flex-col justify-center text-white p-5 rounded-md">
            <h3 className="font-bold text-2xl mb-2">Traceability</h3>
            <p>
              Gain unparalleled visibility into your supply chain processes,
              allowing for quick and accurate traceability
            </p>
          </div>
          <div className="col-span-8 bg-red-400 h-48 flex flex-col justify-center text-white p-5 rounded-md">
            <h3 className="font-bold text-2xl mb-2">
              Efficiency Boost and Enhanced Security
            </h3>
            <p className="w-3/4">
              Rest easy knowing that your documentation is safeguarded against
              tampering, fraud, and unauthorized access. Experience a
              significant reduction in paperwork, errors, and delays, propelling
              your business towards new heights of efficiency.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-100 text-center ">
            How It Works
          </h2>
          <p className="text-gray-100 text-center mt-4">
            Our platform is designed to be simple and user-friendly, ensuring
            that you can get started without any hassle.
          </p>
          <div className="flex items-center justify-center mt-10">
            <img src="how-it-work.png" alt="" />
          </div>
        </div>

        <div className="px-10 mt-12 py-16 bg-[#040C28] grid grid-cols-12 gap-5 text-white">
          <div className="col-span-4">
            <h3 className="font-display text-4xl uppercase font-bold mb-4">
              Frequently ask question
            </h3>
            <p>
              Unraveling Answers to Your Frequently Asked Questions for Seamless
              Supply Chain Documentation.
            </p>
          </div>
          <div className="col-span-8 gap-5">
            <div className="collapse collapse-plus bg-[#D901FF] mb-3">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-[#D901FF] mb-3">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-[#D901FF]">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 mx-20">
          <div className="bg-gradient-to-r from-[#8501FF] to-[#D901FF] text-center text-white py-10 rounded-2xl">
            <h3 className="uppercase font-display  text-4xl mb-3">
              TRACE YOUR AUTHENTICATED WEAVE!
            </h3>
            <p className="mb-5">
              Where Results are Authenticated and Traced in Supply Chain
              Excellence
            </p>
            <button className="rounded-xl px-5 py-3 border border-white hover:bg-blue-500">
              Prove It!
            </button>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default Home;
