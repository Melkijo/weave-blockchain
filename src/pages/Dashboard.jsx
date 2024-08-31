import React, { useState, useEffect } from "react";
import ActorNavbar from "../components/actor/ActorNavbar";
import AddRawMaterial from "../components/actor/process_form_modal/1_AddRawMaterial";
import ActorAsset from "../components/actor/ActorAsset";
import { useWeb3 } from "../components/Web3Provider";
import { rolesName } from "../helpers/constants";

const Dashboard = () => {
  const { accounts, supplyChain } = useWeb3();
  const [actorInfo, setActorInfo] = useState(null);
  const [actorName, setActorName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActorInfo() {
      try {
        const actor = await supplyChain.methods
          .actorsByAddress(accounts[0])
          .call();
        setActorInfo(actor);
        setActorName(actor.name);
      } catch (error) {
        console.error("Failed to fetch actor data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchActorInfo();
  }, [accounts, supplyChain]);

  const renderContent = () => {
    if (isLoading) {
      return <div></div>;
    }

    if (!actorName) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="mb-8 text-3xl font-bold">
            Your Address Is Not Registered!
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            The system will automatically detect registered users. Please
            connect with the appropriate account.
          </p>
        </div>
      );
    }

    const { name, role } = actorInfo;

    return (
      <div className="w-full px-8 py-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="mb-2 text-sm text-center">
            Selamat datang, {name} (<strong>{rolesName[role]}</strong>)
          </h2>
          {role == 1 && (
            <div className="flex justify-center">
              <AddRawMaterial />
            </div>
          )}
          <div className="mx-auto">
            <ActorAsset />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ActorNavbar>
      <div className="w-full min-h-screen bg-gray-50">{renderContent()}</div>
    </ActorNavbar>
  );
};

export default Dashboard;
