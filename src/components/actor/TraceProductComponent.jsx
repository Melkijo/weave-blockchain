import React, { useState } from "react";
import { useWeb3 } from "../Web3Provider";
import {
  rolesName,
  stateName,
  fabricTypeName,
  dyeTypeName,
} from "../../helpers/constants";

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
    ipfs: null,
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

          const dataFabricDetails = await supplyChain.methods
            .fabricDetailsById(assetId)
            .call();
          //   console.log(dataFabricDetails);
          const id = dataFabricDetails[0];
          const rawMaterial = dataFabricDetails[1];
          const threadType = dataFabricDetails[2];
          const threadQuality = dataFabricDetails[3];
          //   const ipfs = dataFabricDetails[4];
          const dyeType = dataFabricDetails[5];
          const pattern = dataFabricDetails[6];
          const origin = dataFabricDetails[7];
          const fabricType = dataFabricDetails[8];

          //   console.log(fabricDetails);

          const payableAssets = await supplyChain.methods
            .payableAssetsById(assetId)
            .call();
          for (let i = 1; i <= payableAssets.trackerNumber; i++) {
            const tracker = await supplyChain.methods
              .tracerAssets(assetId, i)
              .call();
            // console.log(tracker);
            const actors = await supplyChain.methods
              .actorsByAddress(tracker.actorAddress)
              .call();
            // console.log(actors);

            assetHistoryArray.push({
              id: assetId,
              price: tracker.price,
              state: tracker.state,
              actor: tracker.actorAddress,
              name: actors.name,
              ipfs: tracker.ipfs,
              role: actors.role,
              place: actors.place,
              date: tracker.time,
            });

            if (i == payableAssets.trackerNumber) {
              setFabricDetails({
                id,
                rawMaterial,
                threadType,
                threadQuality,
                ipfs: tracker.ipfs,
                dyeType,
                pattern,
                origin,
                fabricType,
              });
            }
          }
          setAssetHistory(assetHistoryArray);
          if (assetHistoryArray.length === 0) {
            setAsset(null);
          } else if (assetHistoryArray[0].price === 0) {
            setAsset(null);
          } else {
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
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const assetId = event.target.elements.assetId.value;
    if (assetId != "") {
      setLoading(true);
      await getAssetById(assetId);
    }
  };

  const handleMoreDetails = async () => {
    setMoreDetails(true);
  };
  const handleHideDetails = async () => {
    setMoreDetails(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="flex items-center mt-2 mb-6 rounded-md">
          <input
            className="px-4 py-2 bg-transparent border rounded-l-md focus:outline-none"
            type="text"
            name="assetId"
            placeholder="Search by ID..."
          />
          <button
            disabled={loading}
            className="px-4 py-2 ml-4 text-white bg-blue-500 hover:bg-blue-700 rounded-r-md"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
      {asset === null &&
        (loading ? (
          ""
        ) : (
          <div className="text-center">
            <button
              disabled={true}
              className="px-4 py-2 text-black bg-yellow-300 rounded"
            >
              Asset with ID <strong>{IdAsset}</strong> has not been created.
            </button>
          </div>
        ))}
      <h1 className="my-4 mb-2 text-lg font-bold text-center text-gray-600">
        Product Information
      </h1>
      <div className="flex justify-between -mx-6">
        <div className="w-4/12 h-full px-6 border-r border-gray-300">
          <h1 className="text-sm text-gray-600">ID</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.id == "0" ? "-" : fabricDetails.id}
              </strong>
            </p>
          )}
          <div className="my-4 border-t border-gray-300"></div>
          <h1 className="text-sm text-gray-600">Thread Type</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.threadType == ""
                  ? "-"
                  : fabricDetails.threadType}
              </strong>
            </p>
          )}
          <div className="my-4 border-t border-gray-300"></div>
          <h1 className="text-sm text-gray-600">Pattern</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.pattern == "" ? "-" : fabricDetails.pattern}
              </strong>
            </p>
          )}
        </div>
        <div className="w-4/12 h-full px-6 border-r border-gray-300">
          <h1 className="text-sm text-gray-600">Thread Raw Material</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.rawMaterial == ""
                  ? "-"
                  : fabricDetails.rawMaterial}
              </strong>
            </p>
          )}
          <div className="my-4 border-t border-gray-300"></div>
          <h1 className="text-sm text-gray-600">Dye Type</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.dyeType == "0"
                  ? "-"
                  : dyeTypeName[fabricDetails.dyeType]}
              </strong>
            </p>
          )}
          <div className="my-4 border-t border-gray-300"></div>
          <h1 className="text-sm text-gray-600">Fabric Type</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.fabricType == "0"
                  ? "-"
                  : fabricTypeName[fabricDetails.fabricType]}
              </strong>
            </p>
          )}
        </div>
        <div className="w-4/12 px-6">
          <h1 className="text-sm text-gray-600">Thread Quaility</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.threadQuality == ""
                  ? "-"
                  : fabricDetails.threadQuality}
              </strong>
            </p>
          )}
          <div className="my-4 border-t border-gray-300"></div>
          <h1 className="text-sm text-gray-600">Origin</h1>
          {loading ? (
            "..."
          ) : (
            <p className="text-lg text-black">
              <strong>
                {fabricDetails.origin == "" ? "-" : fabricDetails.origin}
              </strong>
            </p>
          )}
          <div className="my-4 border-t border-gray-300"></div>

          <h1 className="text-sm text-gray-600">Documentation</h1>
          {loading ? (
            "..."
          ) : (
            <a
              href={"ipfs://" + fabricDetails.ipfs}
              target="_blank"
              className="text-blue-400 underline underline-offset-1"
            >
              {fabricDetails.ipfs == "" ? "-" : fabricDetails.ipfs}
            </a>
          )}
        </div>
      </div>

      <h1 className="my-4 text-xl font-bold text-gray-600">Assets History</h1>
      <table className="w-full mb-6 text-left table-auto">
        <thead className="bg-gray-300 border-b border-gray-400">
          <tr className="border-b-2 border-gray-300">
            <th className="px-4 py-2 text-sm text-gray-600">Price</th>
            <th className="px-4 py-2 text-sm text-gray-600">
              [No. State] State
            </th>
            <th className="px-4 py-2 text-sm text-gray-600">ETH Address</th>
            {moreDetails && (
              <React.Fragment>
                <th className="px-4 py-2 text-sm text-gray-600">Name</th>
                <th className="px-4 py-2 text-sm text-gray-600">
                  documentation
                </th>

                <th className="px-4 py-2 text-sm text-gray-600">Role</th>
                <th className="px-4 py-2 text-sm text-gray-600">
                  User Address
                </th>
              </React.Fragment>
            )}
            <th className="px-4 py-2 text-sm text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="mt-2 text-slate-700">Loading...</div>
          ) : (
            assetHistory.map((history, index) => {
              if (index > 0 && history.ipfs === assetHistory[index - 1].ipfs)
                return null;
              return (
                <tr key={index} className="hover:bg-gray-100">
                  {history.name && (
                    <>
                      <td className="px-4 py-2 border">
                        {convertWeiToEth(history.price)} ETH
                      </td>
                      <td className="px-4 py-2 border">
                        [{history.state}] {stateName[history.state]}
                      </td>
                      <td className="px-4 py-2 border">
                        <a
                          href={`https://sepolia.etherscan.io/address/${history.actor}`}
                          className="hover:text-blue-500"
                        >
                          {history.actor}
                        </a>
                      </td>
                      {moreDetails && (
                        <>
                          <td className="px-4 py-2 border">{history.name}</td>
                          <td className="px-4 py-2 border">
                            <a
                              href={"ipfs://" + history.ipfs}
                              target="_blank"
                              className="text-blue-400 underline underline-offset-1"
                            >
                              {history.ipfs}
                            </a>
                          </td>

                          <td className="px-4 py-2 border">
                            {rolesName[history.role]}
                          </td>
                          <td className="px-4 py-2 border">{history.place}</td>
                        </>
                      )}
                      <td className="px-4 py-2 border">
                        {new Date(history.date * 1000).toLocaleString()}
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="text-center">
        {moreDetails === false && (
          <button
            className="px-4 py-2 mb-6 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => handleMoreDetails()}
          >
            More Details
          </button>
        )}
        {moreDetails === true && (
          <button
            className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => handleHideDetails()}
          >
            Hide Details
          </button>
        )}
      </div>
    </div>
  );
};

export default TraceProduct;
