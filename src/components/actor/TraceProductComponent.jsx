import React, { useState } from "react";
import { useWeb3 } from '../Web3Provider';
import { rolesName, stateName, fabricTypeName, dyeTypeName } from "../../helpers/constants";

const TraceProduct = () => {
    const { web3, supplyChain } = useWeb3();
    const [assetHistory, setAssetHistory] = useState([]);
    const [moreDetails, setMoreDetails] = useState(false);
    const [asset, setAsset] = useState();
    const [IdAsset, setIdAsset] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fabricDetails, setFabricDetails] = useState({
        id: null,
        rawMaterial: null,
        threadType: null,
        threadQuality: null,
        dyeType: null,
        pattern: null,
        origin: null,
        fabricType: null,
    });

    const convertWeiToEth = (wei) => {
        if (!web3) return;
        const eth = web3.utils.fromWei(wei, "ether");
        return Number(eth).toFixed(9);
    };


    const getAssetById = async (assetId) => {
        if (window.ethereum) {
            if (window.ethereum) {
                try {
                    const assetHistoryArray = [];

                    const dataFabricDetails = await supplyChain.methods.fabricDetailsById(assetId).call();
                    const id = dataFabricDetails[0];
                    const rawMaterial = dataFabricDetails[1];
                    const threadType = dataFabricDetails[2];
                    const threadQuality = dataFabricDetails[3];
                    const dyeType = dataFabricDetails[4];
                    const pattern = dataFabricDetails[5];
                    const origin = dataFabricDetails[6];
                    const fabricType = dataFabricDetails[7];

                    setFabricDetails({
                        id,
                        rawMaterial,
                        threadType,
                        threadQuality,
                        dyeType,
                        pattern,
                        origin,
                        fabricType,
                    })
                    console.log(fabricDetails);

                    const payableAssets = await supplyChain.methods.payableAssetsById(assetId).call();
                    for (let i = 1; i <= payableAssets.trackerNumber; i++) {
                        const tracker = await supplyChain.methods.tracerAssets(assetId, i).call();
                        const actors = await supplyChain.methods.actorsByAddress(tracker.actorAddress).call();
                        assetHistoryArray.push({ id: assetId, price: tracker.price, state: tracker.state, actor: tracker.actorAddress, name: actors.name, role: actors.role, place: actors.place, date: tracker.time });
                    }
                    setAssetHistory(assetHistoryArray);
                    if (assetHistoryArray.length === 0) {
                        setAsset(null);
                    }
                    else if (assetHistoryArray[0].price === 0) {
                        setAsset(null);
                    }
                    else {
                        setAsset(assetHistoryArray[0].price);
                    }
                    setLoading(false);
                    setIdAsset(assetId);
                } catch (error) {
                    console.log(error);
                    setLoading(false);
                }
            }
        }
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        const assetId = event.target.elements.assetId.value;
        if (assetId != "") {
            setLoading(true);
            await getAssetById(assetId);
        }
    }

    const handleMoreDetails = async () => {
        setMoreDetails(true);
    }
    const handleHideDetails = async () => {
        setMoreDetails(false);
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div className="flex items-center rounded-md mb-6 mt-2">
                    <input className="rounded-l-md border bg-transparent px-4 py-2 focus:outline-none" type="text" name="assetId" placeholder="Search by ID..." />
                    <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white py-2 ml-4 px-4 rounded-r-md">
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>
            {asset === null && (
                loading ? "" : (
                    <div className="text-center">
                        <button disabled={true} className="bg-yellow-300 text-black py-2 px-4 rounded">
                            Asset with ID <strong>{IdAsset}</strong> has not been created.
                        </button>
                    </div>
                )
            )}
            <h1 className="text-center text-lg text-gray-600 font-bold my-4 mb-2">Product Information</h1>
            <div className="flex justify-between -mx-6">
                <div className="w-4/12 px-6 border-r h-full border-gray-300">
                    <h1 className="text-sm text-gray-600">ID</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.id == "0" ? "-" : fabricDetails.id}</strong>
                            </p>
                        )
                    }
                    <div className="border-t border-gray-300 my-4"></div>
                    <h1 className="text-sm text-gray-600">Thread Type</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.threadType == "" ? "-" : fabricDetails.threadType}</strong>
                            </p>
                        )
                    }
                    <div className="border-t border-gray-300 my-4"></div>
                    <h1 className="text-sm text-gray-600">Pattern</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.pattern == "" ? "-" : fabricDetails.pattern}</strong>
                            </p>
                        )
                    }
                </div>
                <div className="w-4/12 px-6 border-r h-full border-gray-300">
                    <h1 className="text-sm text-gray-600">Thread Raw Material</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.rawMaterial == "" ? "-" : fabricDetails.rawMaterial}</strong>
                            </p>
                        )
                    }
                    <div className="border-t border-gray-300 my-4"></div>
                    <h1 className="text-sm text-gray-600">Dye Type</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.dyeType == "0" ? "-" : dyeTypeName[fabricDetails.dyeType]}</strong>
                            </p>
                        )
                    }
                    <div className="border-t border-gray-300 my-4"></div>
                    <h1 className="text-sm text-gray-600">Fabric Type</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.fabricType == "0" ? "-" : fabricTypeName[fabricDetails.fabricType]}</strong>
                            </p>
                        )
                    }
                </div>
                <div className="w-4/12 px-6">
                    <h1 className="text-sm text-gray-600">Thread Quaility</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.threadQuality == "" ? "-" : fabricDetails.threadQuality}</strong>
                            </p>
                        )
                    }
                    <div className="border-t border-gray-300 my-4"></div>
                    <h1 className="text-sm text-gray-600">Origin</h1>
                    {
                        loading ? "..." : (
                            <p className="text-lg text-black">
                                <strong>{fabricDetails.origin == "" ? "-" : fabricDetails.origin}</strong>
                            </p>
                        )
                    }
                </div>
            </div>

            <h1 className="text-xl text-gray-600 font-bold my-4">Assets History</h1>
            <table className="table-auto w-full text-left mb-6">
                <thead className="bg-gray-300 border-b border-gray-400">
                    <tr className="border-b-2 border-gray-300">
                        <th className="px-4 py-2 text-sm text-gray-600">Price</th>
                        <th className="px-4 py-2 text-sm text-gray-600">[No. State] State</th>
                        <th className="px-4 py-2 text-sm text-gray-600">ETH Address</th>
                        {moreDetails && (
                            <React.Fragment>
                                <th className="px-4 py-2 text-sm text-gray-600">Name</th>
                                <th className="px-4 py-2 text-sm text-gray-600">Role</th>
                                <th className="px-4 py-2 text-sm text-gray-600">User Address</th>
                            </React.Fragment>
                        )}
                        <th className="px-4 py-2 text-sm text-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (<div className="text-slate-700 mt-2">Loading...</div>) : (
                        assetHistory.map((history, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                {history.name && (
                                    <>
                                        <td className="border px-4 py-2">{convertWeiToEth(history.price)} ETH</td>
                                        <td className="border px-4 py-2">[{history.state}] {stateName[history.state]}</td>
                                        <td className="border px-4 py-2"><a href={`https://sepolia.etherscan.io/address/${history.actor}`} className="hover:text-blue-500">{history.actor}</a></td>
                                        {moreDetails && (
                                            <>
                                                <td className="border px-4 py-2">{history.name}</td>
                                                <td className="border px-4 py-2">{rolesName[history.role]}</td>
                                                <td className="border px-4 py-2">{history.place}</td>
                                            </>
                                        )}
                                        <td className="border px-4 py-2">{new Date(history.date * 1000).toLocaleString()}</td>
                                    </>
                                )}
                            </tr>
                        )
                        ))}
                </tbody>
            </table>
            <div className="text-center">
                {moreDetails === false && (
                    <button className="bg-blue-500 mb-6 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleMoreDetails()}>More Details</button>
                )}
                {moreDetails === true && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={() => handleHideDetails()}>Hide Details</button>
                )}
            </div>
        </div>
    );
};

export default TraceProduct;
