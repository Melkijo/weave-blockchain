import React, { useState, useEffect } from "react";
import ActorNavbar from "../components/actor/ActorNavbar"
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
                const actor = await supplyChain.methods.actorsByAddress(accounts[0]).call();
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
        if (isLoading) { return (<div></div>); }

        if (!actorName) {
            return (
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold mb-8">Your Address Is Not Registered!</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The system will automatically detect registered users. Please connect with the appropriate account.
                    </p>
                </div>
            );
        }

        const { name, role } = actorInfo;

        return (
            <>
                <ActorNavbar />
                <div className="px-8 py-6 max-w-full mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">Dashboard</h1>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-sm mb-2 text-center">
                            Welcome, {name} (<strong>{rolesName[role]}</strong>)
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
            </>
        );
    };

    return <div className="bg-gray-100 min-h-screen">{renderContent()}</div>;
};

export default Dashboard;
