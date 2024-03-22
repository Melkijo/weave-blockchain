import React, { useState, useEffect } from "react";
import ActorNavbar from "../components/actor/ActorNavbar";
import TraceProductComponent from "../components/actor/TraceProductComponent";
import { useWeb3 } from "../components/Web3Provider";

const TraceProduct = () => {
  const { accounts, supplyChain } = useWeb3();
  const [actorName, setActorName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActorName = async () => {
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
    };
    fetchActorName();
  }, [accounts, supplyChain]);

  const renderContent = () => {
    if (isLoading) {
      return <div></div>;
    }

    if (!actorName) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="mb-8 text-3xl font-bold">
            Your address is not registered!
          </h1>
        </div>
      );
    }

    return (
      <>
        <div className="max-w-full px-8 py-6 mx-auto">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">Trace Asset</h1>
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <TraceProductComponent />
          </div>
        </div>
      </>
    );
  };

  return (
    <ActorNavbar>
      <div className="w-full min-h-screen bg-gray-50">{renderContent()}</div>
    </ActorNavbar>
  );
};

export default TraceProduct;
