import { useState, useEffect, useCallback } from "react";
import { useWeb3 } from "../Web3Provider";
import Notification from "../Notification";
import { stateName, fabricTypeName } from "../../helpers/constants";

function PublicAssetAll() {
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

  console.log(assets);

  const filteredAssets = assets.filter((asset) => {
    if (filterBy === "All" && (asset.state == 4 || asset.state == 5))
      return true;
    // if (filterBy === "All") return true;
    if (filterBy === "Buyable" && asset.state == 2 && role == 2) return true;
    if (filterBy === "Buyable" && asset.state == 3 && role == 3) return true;
    if (filterBy === "Buyable" && asset.state == 4 && role == 4) return true;
    if (filterBy === "Buyable" && asset.state == 5 && role == 5) return true;
    if (filterBy === "Retail" && (asset.state == 4 || asset.state == 5))
      return true;
    return false;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-4xl font-bold text-white ">Market</h1>
        </div>

        <button
          className="py-2 text-white transition duration-200 bg-blue-500 rounded w-36 hover:bg-blue-600"
          onClick={handleReload}
          disabled={reloading}
        >
          {reloading ? "Reloading..." : "Refresh"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {getDataloading ? (
          <div className="mt-5 text-white ">Mencari kain...</div>
        ) : (
          filteredAssets.map((asset) => (
            <div className="bg-white card" key={asset.id}>
              <figure>
                <img
                  src={"https://dweb.link/ipfs/" + asset.ipfs}
                  alt="car!"
                  className="object-cover w-full h-40 rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                {
                  <>
                    {asset.state == 1 && (
                      <h2 className="card-title line-clamp-1">
                        {asset.rawMaterial}
                      </h2>
                    )}
                    {(asset.state == 2 || asset.state == 3) && (
                      <h2 className="card-title line-clamp-1">
                        {asset.threadType}
                      </h2>
                    )}
                    {(asset.state == 4 || asset.state == 5) && (
                      <h2 className="card-title line-clamp-1">
                        {fabricTypeName[asset.fabricType]} ({asset.pattern})
                      </h2>
                    )}
                  </>
                }

                <p>{asset.rawMaterial}</p>
                <div className="justify-end card-actions">
                  <a
                    href={
                      `https://weave-blockchain.vercel.app/public-tracer?q=` +
                      asset.id
                    }
                    // target="_blank"
                  >
                    <button className="btn btn-primary hover:bg-gray-700 hover:text-white">
                      Detail
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

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

export default PublicAssetAll;
