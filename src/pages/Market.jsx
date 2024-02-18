import React, { useState, useEffect } from "react";
import ActorNavbar from "../components/actor/ActorNavbar";
import ActorAssetAll from "../components/actor/ActorAssetAll";
import { useWeb3 } from "../components/Web3Provider";

const Market = () => {
    const { accounts, supplyChain } = useWeb3();
    const [actorName, setActorName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchActor() {
            try {
                const actor = await supplyChain.methods.actorsByAddress(accounts[0]).call();
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
        if (isLoading) { return (<div></div>); }

        if (!actorName) {
            return (
                <div className="h-screen flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold mb-8">
                        Your address is not registered!
                    </h1>
                </div>
            );
        }

        return (
            <>
                <ActorNavbar />
                <div className="px-8 py-6 max-w-full mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">Market</h1>
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <ActorAssetAll />
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen">{renderContent()}</div>
    );
};

export default Market;