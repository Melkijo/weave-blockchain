import React, { useEffect, useState } from "react";
import { useWeb3 } from "./Web3Provider";
import {
  rolesName,
  stateName,
  fabricTypeName,
  dyeTypeName,
} from "../helpers/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

const TraceProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const { web3, supplyChain } = useWeb3();
  const [assetHistory, setAssetHistory] = useState([]);
  const [moreDetails, setMoreDetails] = useState(false);
  const [asset, setAsset] = useState("p");
  const [loading, setLoading] = useState(false);
  const [IdAsset, setIdAsset] = useState(null);
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

  console.log(searchQuery);

  const convertWeiToEth = (wei) => {
    if (!web3) return;
    const eth = web3.utils.fromWei(wei, "ether");
    return Number(eth).toFixed(9);
  };

  //make useEffect to reload if searchQuery change
  useEffect(() => {
    if (searchQuery != "") {
      setLoading(true);
      getAssetById(searchQuery);
    }
  }, []);

  const getAssetById = async (assetId) => {
    if (window.ethereum) {
      try {
        const assetHistoryArray = [];

        const dataFabricDetails = await supplyChain.methods
          .fabricDetailsById(assetId)
          .call();
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
        });
        console.log(fabricDetails);

        const payableAssets = await supplyChain.methods
          .payableAssetsById(assetId)
          .call();
        for (let i = 1; i <= payableAssets.trackerNumber; i++) {
          const tracker = await supplyChain.methods
            .tracerAssets(assetId, i)
            .call();
          const actors = await supplyChain.methods
            .actorsByAddress(tracker.actorAddress)
            .call();
          assetHistoryArray.push({
            id: assetId,
            price: tracker.price,
            state: tracker.state,
            actor: tracker.actorAddress,
            name: actors.name,
            role: actors.role,
            place: actors.place,
            date: tracker.time,
          });
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
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    // const assetId = event.target.elements.assetId.value;
    setSearchParams({ q: searchQuery });
    navigate(`?q=${encodeURIComponent(searchQuery)}`);
    if (searchQuery != "") {
      setLoading(true);
      await getAssetById(searchQuery);
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
      <form onSubmit={handleSearch} className="mx-12 mt-10">
        <div className="items-center rounded-md mb-6 mt-2">
          <h1 className="font-bold text-gray-50 my-2">Product ID</h1>
          <input
            className="bg-slate-100 rounded w-1/3 border px-4 py-2 focus:outline-none shadow-lg"
            type="text"
            name="assetId"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by ID..."
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 ml-4 px-4 rounded"
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
              className="bg-yellow-300 text-white py-2 px-4 rounded"
            >
              Asset with ID <strong>{IdAsset}</strong> has not been created.
            </button>
          </div>
        ))}
      <div className="border border-white text-white rounded-lg shadow-lg  p-4 mx-12 mt-6 bg-opacity-40">
        <h1 className="text-center text-2xl font-bold text-white mb-5 mt-3">
          Product Information
        </h1>
        <div className="flex justify-between -mx-6">
          <div className="w-4/12 px-6 border-r h-full border-gray-300">
            <h1 className="text-sm text-white">ID</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.id == "0" ? "-" : fabricDetails.id}
                </strong>
              </p>
            )}
            <div className="border-t border-gray-300 my-4"></div>
            <h1 className="text-sm text-white">Thread Type</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.threadType == ""
                    ? "-"
                    : fabricDetails.threadType}
                </strong>
              </p>
            )}
            <div className="border-t border-gray-300 my-4"></div>
            <h1 className="text-sm text-white">Pattern</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.pattern == "" ? "-" : fabricDetails.pattern}
                </strong>
              </p>
            )}
          </div>
          <div className="w-4/12 px-6 border-r h-full border-gray-300">
            <h1 className="text-sm text-white">Thread Raw Material</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.rawMaterial == ""
                    ? "-"
                    : fabricDetails.rawMaterial}
                </strong>
              </p>
            )}
            <div className="border-t border-gray-300 my-4"></div>
            <h1 className="text-sm text-white">Dye Type</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.dyeType == "0"
                    ? "-"
                    : dyeTypeName[fabricDetails.dyeType]}
                </strong>
              </p>
            )}
            <div className="border-t border-gray-300 my-4"></div>
            <h1 className="text-sm text-white">Fabric Type</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.fabricType == "0"
                    ? "-"
                    : fabricTypeName[fabricDetails.fabricType]}
                </strong>
              </p>
            )}
          </div>
          <div className="w-4/12 px-6">
            <h1 className="text-sm text-white">Thread Quaility</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.threadQuality == ""
                    ? "-"
                    : fabricDetails.threadQuality}
                </strong>
              </p>
            )}
            <div className="border-t border-gray-300 my-4"></div>
            <h1 className="text-sm text-white">Origin</h1>
            {loading ? (
              "..."
            ) : (
              <p className="text-lg text-white">
                <strong>
                  {fabricDetails.origin == "" ? "-" : fabricDetails.origin}
                </strong>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="border border-white rounded-lg  p-4 mx-12 mt-10 bg-opacity-40">
        <div className="w-full">
          <h1 className="text-center text-2xl font-bold text-white mb-5 mt-3">
            Asset Process History
          </h1>
          <table className="table-auto w-full text-left mb-6 ">
            <thead className="bg-blue-600 border border-white ">
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-2 font-medium text-white">Price</th>
                <th className="px-4 py-2 font-medium text-white">
                  [No. State] State
                </th>
                <th className="px-4 py-2 font-medium text-white">
                  ETH Address
                </th>
                {moreDetails && (
                  <React.Fragment>
                    <th className="px-4 py-2 font-medium text-white">Name</th>
                    <th className="px-4 py-2 font-medium text-white">Role</th>
                    <th className="px-4 py-2 font-medium text-white">
                      User Address
                    </th>
                  </React.Fragment>
                )}
                <th className="px-4 py-2 font-medium text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div className="text-white mt-2">Loading...</div>
              ) : (
                assetHistory.map((history, index) => (
                  <tr
                    key={index}
                    className="text-white font-light hover:bg-blue-300"
                  >
                    {history.name && (
                      <>
                        <td className="border px-4 py-2">
                          {convertWeiToEth(history.price)} ETH
                        </td>
                        <td className="border px-4 py-2">
                          {stateName[history.state]}
                        </td>
                        <td className="border px-4 py-2">
                          <a
                            href={`https://sepolia.etherscan.io/address/${history.actor}`}
                            className="hover:text-blue-500"
                          >
                            {history.actor}
                          </a>
                        </td>
                        {moreDetails && (
                          <>
                            <td className="border px-4 py-2">{history.name}</td>
                            <td className="border px-4 py-2">
                              {rolesName[history.role]}
                            </td>
                            <td className="border px-4 py-2">
                              {history.place}
                            </td>
                          </>
                        )}
                        <td className="border px-4 py-2">
                          {new Date(history.date * 1000).toLocaleString()}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="text-center">
            {moreDetails === false && (
              <button
                className="bg-blue-500 mb-6 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => handleMoreDetails()}
              >
                More Details
              </button>
            )}
            {moreDetails === true && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => handleHideDetails()}
              >
                Hide Details
              </button>
            )}
          </div>
        </div>
        {/* <div className=" w-3/12 mx-4">
                    <h1 className="font-bold my-2 text-center">Informasi Produk</h1>
                    <div className="flex justify">
                        <div className="mb-4 pr-10">
                            <p>Product ID</p>
                            <p>Raw Material</p>
                            <p>Thread Type</p>
                            <p>Fabric Type</p>
                            <p>Dye Type</p>
                            <p>Pattern</p>
                        </div>
                        <div className="mb-4">
                            <p>: Product ID</p>
                            <p>: Raw Material</p>
                            <p>: Thread Type</p>
                            <p>: Fabric Type</p>
                            <p>: Dye Type</p>
                            <p>: Pattern</p>
                        </div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default TraceProduct;
