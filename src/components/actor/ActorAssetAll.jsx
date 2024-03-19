import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "../Web3Provider";
import Notification from "../Notification";
import { stateName, fabricTypeName } from "../../helpers/constants";

function ActorAssetAll() {
  const [assets, setAssets] = useState([]);
  const { web3, accounts, supplyChain } = useWeb3();
  const [reloading, setReloading] = useState(false);
  const [role, setRole] = useState(null);
  const [filterBy, setFilterBy] = useState("All");

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [getDataloading, setGetDataLoading] = useState(false);

  const convertWeiToEth = (wei) => {
    if (!web3) return;
    const eth = web3.utils.fromWei(wei, "ether");
    return Number(eth).toFixed(9);
  };

  useEffect(() => {
    setGetDataLoading(true);
    const init = async () => {
      if (!web3 || !accounts || !supplyChain) return;

      const totalAssets = await supplyChain.methods.assetIdCounter().call();
      const assetsWithPriceAndState = [];
      for (let i = 1; i <= totalAssets; i++) {
        const infoAssets = await supplyChain.methods
          .payableAssetsById(i)
          .call();

        const tracker = await supplyChain.methods
          .tracerAssets(i, infoAssets.trackerNumber)
          .call();
        const dataFabricDetails = await supplyChain.methods
          .fabricDetailsById(i)
          .call();
        assetsWithPriceAndState.push({
          id: i,
          price: infoAssets.price,
          state: infoAssets.state,
          ipfs: infoAssets.ipfs,

          time: tracker.time,
          address: tracker.actorAddress,
          buyStatus: tracker.buyStatus,
          rawMaterial: dataFabricDetails.rawMaterial,
          threadType: dataFabricDetails.threadType,
          fabricType: dataFabricDetails.fabricType,
          pattern: dataFabricDetails.pattern,
        });
      }

      const role = await supplyChain.methods.getActorRole(accounts[0]).call();
      setRole(role);
      setAssets(assetsWithPriceAndState);
      setReloading(false);
      setGetDataLoading(false);
    };
    if (web3) {
      init();
    }
  }, [web3, accounts, supplyChain, reloading]);

  const buyAsset = async (assetId, price) => {
    setLoading(true);
    setId(assetId);
    try {
      const result = await supplyChain.methods.purchaseAsset(assetId).send({
        from: accounts[0],
        value: price,
      });
      if (result && assetId) {
        setSuccessMsg(
          <span>
            Asset with <strong>ID {assetId}</strong> succesfully purchased at
            price <strong>{convertWeiToEth(price)} ETH</strong>
          </span>
        );
        setLoading(false);
        setNotificationOpen(true);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
      setLoading(false);
      setNotificationOpen(true);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationOpen(false);
      reset();
    }, 5000);

    return () => clearTimeout(timer);
  }, [notificationOpen, errorMsg, successMsg]);

  const reset = useCallback(() => {
    setSuccessMsg("");
    setErrorMsg("");
    setNotificationOpen(false);
  }, []);

  const handleReload = () => {
    setReloading(true);
  };

  const filteredAssets = assets.filter((asset) => {
    if (filterBy === "All") return true;
    if (filterBy === "Buyable" && asset.state == 2 && role == 2) return true;
    if (filterBy === "Buyable" && asset.state == 3 && role == 3) return true;
    if (filterBy === "Buyable" && asset.state == 4 && role == 4) return true;
    if (filterBy === "Buyable" && asset.state == 5 && role == 5) return true;
    return false;
  });

  return (
    <div>
      <div className="mb-1">
        <h2 className="font-bold text-gray-800 text-l">Filter</h2>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="relative inline-block w-64">
            <select
              className="block w-full px-4 py-2 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Buyable">Buyable</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 13.415l5.707-5.707a1 1 0 111.414 1.414l-6.364 6.364a.997.997 0 01-1.414 0L2.879 8.122a1 1 0 011.414-1.414L10 13.415z"
                />
              </svg>
            </div>
          </div>
        </div>
        <button
          className="py-2 text-white transition duration-200 bg-blue-500 rounded w-36 hover:bg-blue-600"
          onClick={handleReload}
          disabled={reloading}
        >
          {reloading ? "Reloading..." : "Reload"}
        </button>
      </div>
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-200 border-b border-gray-400">
          <tr className="border-b-2 border-gray-200">
            <th className="px-4 py-2 text-sm text-gray-600">ID</th>
            <th className="px-4 py-2 text-sm text-gray-600">Price</th>
            <th className="px-4 py-2 text-sm text-gray-600">Asset Name</th>
            <th className="px-4 py-2 text-sm text-gray-600">Documentation</th>
            <th className="px-4 py-2 text-sm text-gray-600">
              [No. State] Status
            </th>
            <th className="px-4 py-2 text-sm text-gray-600">Owner</th>
            <th className="px-4 py-2 text-sm text-gray-600">Date</th>
            <th className="px-4 py-2 text-sm text-gray-600">Buy</th>
          </tr>
        </thead>
        <tbody>
          {getDataloading
            ? "Getting Asset Data..."
            : filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-100">
                  <td className="px-4 py-3 border">{asset.id}</td>
                  <td className="px-4 py-3 border">
                    {convertWeiToEth(asset.price)} ETH
                  </td>
                  {
                    <>
                      {asset.state == 1 && (
                        <td className="px-4 py-3 border">
                          {asset.rawMaterial}
                        </td>
                      )}
                      {(asset.state == 2 || asset.state == 3) && (
                        <td className="px-4 py-3 border">{asset.threadType}</td>
                      )}
                      {(asset.state == 4 || asset.state == 5) && (
                        <td className="px-4 py-3 border">
                          {fabricTypeName[asset.fabricType]} ({asset.pattern})
                        </td>
                      )}
                    </>
                  }
                  <td className="px-4 py-3 overflow-hidden border max-w-[200px] text-ellipsis ">
                    <a
                      href={"ipfs://" + asset.ipfs}
                      target="_blank"
                      className="overflow-hidden text-blue-400 underline underline-offset-1"
                    >
                      {asset.ipfs}
                    </a>
                  </td>
                  <td className="px-4 py-3 border">
                    [{asset.state}] {stateName[asset.state]}
                  </td>
                  <td className="px-4 py-3 border">{asset.address}</td>
                  <td className="px-4 py-3 border">
                    {new Date(asset.time * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border">
                    {asset.buyStatus == 0 && (
                      <>
                        {asset.state == 2 &&
                          role == 2 &&
                          asset.address != accounts[0] && (
                            <button
                              className="px-4 py-2 ml-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                              onClick={() => buyAsset(asset.id, asset.price)}
                            >
                              {loading && id == asset.id ? "Loading..." : "Buy"}
                            </button>
                          )}
                        {asset.state == 3 &&
                          role == 3 &&
                          asset.address != accounts[0] && (
                            <button
                              className="px-4 py-2 ml-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                              onClick={() => buyAsset(asset.id, asset.price)}
                            >
                              {loading && id == asset.id ? "Loading..." : "Buy"}
                            </button>
                          )}
                        {asset.state == 4 &&
                          role == 4 &&
                          asset.address != accounts[0] && (
                            <button
                              className="px-4 py-2 ml-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                              onClick={() => buyAsset(asset.id, asset.price)}
                            >
                              {loading && id == asset.id ? "Loading..." : "Buy"}
                            </button>
                          )}
                        {asset.state == 5 &&
                          role == 5 &&
                          asset.address != accounts[0] && (
                            <button
                              className="px-4 py-2 ml-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                              onClick={() => buyAsset(asset.id, asset.price)}
                            >
                              {loading && id == asset.id ? "Loading..." : "Buy"}
                            </button>
                          )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {successMsg !== "" && notificationOpen && (
        <Notification
          msg={successMsg}
          open={notificationOpen}
          bgColor="green"
        />
      )}
      {errorMsg !== "" && notificationOpen && (
        <Notification msg={errorMsg} open={notificationOpen} bgColor="red" />
      )}
    </div>
  );
}

export default ActorAssetAll;
