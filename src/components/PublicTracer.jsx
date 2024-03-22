import React, { useEffect, useState } from "react";
import { useWeb3 } from "./Web3Provider";
import {
  rolesName,
  stateName,
  fabricTypeName,
  dyeTypeName,
} from "../helpers/constants";
import { useNavigate, useSearchParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
    ipfs: null,
    dyeType: null,
    pattern: null,
    origin: null,
    fabricType: null,
  });

  //   console.log(searchQuery);

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
        //   const ipfs = dataFabricDetails[4];
        const dyeType = dataFabricDetails[5];
        const pattern = dataFabricDetails[6];
        const origin = dataFabricDetails[7];
        const fabricType = dataFabricDetails[8];

        // const [uniqueAssets, setUniqueAssets] = useState([]);
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
        <div className="items-center mt-2 mb-6 rounded-md">
          <h1 className="my-2 font-bold text-gray-50">Product ID</h1>
          <input
            className="w-1/3 px-4 py-2 border rounded shadow-lg bg-slate-100 focus:outline-none"
            type="text"
            name="assetId"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by ID..."
          />
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 ml-4 text-white bg-blue-600 rounded hover:bg-blue-700"
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
              className="px-4 py-2 text-white bg-yellow-300 rounded"
            >
              Asset with ID <strong>{IdAsset}</strong> has not been created.
            </button>
          </div>
        ))}
      <div className="flex gap-10 mx-12 mt-6">
        <div className="rounded-md w-[600px] h-[350px] border border-white">
          {loading ? (
            <div className="w-full h-full skeleton"></div>
          ) : assetHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-white">No Image</h1>
            </div>
          ) : (
            <Carousel
              infiniteLoop={true}
              showStatus={false}
              showIndicators={true}
              showThumbs={false}
            >
              {assetHistory.reduce((unique, history, index) => {
                if (
                  index === 0 ||
                  history.ipfs !== assetHistory[index - 1].ipfs
                ) {
                  unique.push(
                    <div key={index} className="w-[600px] h-[350px]">
                      {history.ipfs ? (
                        <img
                          src={"https://dweb.link/ipfs/" + history.ipfs}
                          className="object-cover w-full h-full"
                          alt={stateName[history.state]}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <h2 className="text-white">No Image Available</h2>
                        </div>
                      )}
                      <p className="legend">{stateName[history.state]}</p>
                    </div>
                  );
                }
                return unique;
              }, [])}
            </Carousel>
          )}
        </div>
        <div className="flex-grow p-4 text-white border border-white rounded-lg shadow-lg bg-opacity-40">
          <h1 className="mt-3 mb-5 text-2xl font-bold text-center text-white">
            Product Information
          </h1>
          <div className="flex justify-between -mx-6">
            <div className="h-full px-6 border-r border-gray-300 ">
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
              <div className="my-4 border-t border-gray-300"></div>
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
              <div className="my-4 border-t border-gray-300"></div>
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
            <div className="w-4/12 h-full px-6 border-r border-gray-300">
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
              <div className="my-4 border-t border-gray-300"></div>
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
              <div className="my-4 border-t border-gray-300"></div>
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
            <div className="w-4/12 px-6 overflow-hidden text-ellipsis">
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
              <div className="my-4 border-t border-gray-300"></div>
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

              <div className="my-4 border-t border-gray-300"></div>

              <h1 className="text-sm text-white">Documentation</h1>
              {loading ? (
                "..."
              ) : (
                <a
                  href={"ipfs://" + fabricDetails.ipfs}
                  target="_blank"
                  className="overflow-hidden text-blue-400 underline underline-offset-1 "
                >
                  {fabricDetails.ipfs == "" ? "-" : fabricDetails.ipfs}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 mx-12 mt-10 border border-white rounded-lg bg-opacity-40">
        <div className="w-full">
          <h1 className="mt-3 mb-5 text-2xl font-bold text-center text-white">
            Asset Process History
          </h1>
          <table className="w-full mb-6 text-left table-auto ">
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
                    <th className="px-4 py-2 font-medium text-white">
                      Documentation
                    </th>
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
                <div className="mt-2 text-white">Loading...</div>
              ) : (
                assetHistory.map((history, index) => {
                  if (
                    index > 0 &&
                    history.ipfs === assetHistory[index - 1].ipfs
                  )
                    return null;
                  return (
                    <tr
                      key={index}
                      className="font-light text-white hover:bg-gray-800"
                    >
                      {history.name && (
                        <>
                          <td className="px-4 py-2 border ">
                            {convertWeiToEth(history.price)} ETH
                          </td>
                          <td className="px-4 py-2 border">
                            {stateName[history.state]}
                          </td>
                          <td className="px-4 py-2 border  overflow-hidden max-w-[200px] text-ellipsis">
                            <a
                              href={`https://sepolia.etherscan.io/address/${history.actor}`}
                              className="text-blue-400 underline underline-offset-1 "
                            >
                              {history.actor}
                            </a>
                          </td>
                          {moreDetails && (
                            <>
                              <td className="px-4 py-2 border">
                                {history.name}
                              </td>
                              <td className="px-4 py-2 border overflow-hidden max-w-[200px] text-ellipsis">
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
                              <td className="px-4 py-2 border">
                                {history.place}
                              </td>
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
        {/* <div className="w-3/12 mx-4 ">
                    <h1 className="my-2 font-bold text-center">Informasi Produk</h1>
                    <div className="flex justify">
                        <div className="pr-10 mb-4">
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
