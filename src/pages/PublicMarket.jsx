import React, { useState, useEffect } from "react";
import ActorNavbar from "../components/actor/ActorNavbar";
import ActorAssetAll from "../components/actor/ActorAssetAll";
import { useWeb3 } from "../components/Web3Provider";
import PublicNavbar from "../components/PublicNavbar";
import PublicAssetAll from "../components/actor/publicAssetAll";

const PublicMarket = () => {
  const { accounts, supplyChain } = useWeb3();
  const [actorName, setActorName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActor() {
      try {
        const actor = await supplyChain.methods
          .actorsByAddress(accounts[0])
          .call();
        setActorName(actor.name);
      } catch (error) {
        console.error("Failed to fetch actor data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActor();
  }, [accounts, supplyChain]);

  const renderContent = () => {
    if (isLoading) {
      return <div></div>;
    }

    // if (!actorName) {
    //   return (
    //     <div className="flex flex-col items-center justify-center h-screen">
    //       <h1 className="mb-8 text-3xl font-bold">
    //         Your address is not registered!
    //       </h1>
    //     </div>
    //   );
    // }

    return (
      <div className="max-w-full px-8 pt-5 mx-auto">
        {/* <h1 className="mb-4 text-4xl font-bold text-white">Market</h1> */}
        <div>
          <PublicAssetAll />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#091233] min-h-screen">
        <div className="max-w-full py-6 mx-auto ">
          <PublicNavbar />
          <div className="w-full min-h-screen bg-[#091233]">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicMarket;
