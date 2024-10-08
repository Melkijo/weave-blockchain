import React, { useState, useEffect, useRef } from "react";
import { useWeb3 } from "../Web3Provider";
import CreateThread from "./process_form_modal/2_CreateThread";
import DistributeThread from "./process_form_modal/3_DistributeThread";
import FabricWeaving from "./process_form_modal/4_FabricWeaving";
import SellFabric from "./process_form_modal/5_SellFabric";
import { stateName, fabricTypeName } from "../../helpers/constants";
import QRCode from "qrcode";

function ActorAsset() {
  const [assets, setAssets] = useState([]);
  const { web3, accounts, supplyChain } = useWeb3();
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [reloading, setReloading] = useState(true);
  const [role, setRole] = useState(null);
  const [dontHaveAsset, setdontHaveAsset] = useState(false);

  const [createThreadModalOpen, setCreateThreadModalOpen] = useState(false);
  const [distributeThreadModalOpen, setDistributeThreadModalOpen] =
    useState(false);
  const [fabricWeavingModalOpen, setFabricWeavingModalOpen] = useState(false);
  const [sellFabricModalOpen, setSellFabricModalOpen] = useState(false);

  const [qrCode, setQrCode] = useState("halo");

  const convertWeiToEth = (wei) => {
    if (!web3) return;
    const eth = web3.utils.fromWei(wei, "ether");
    return Number(eth).toFixed(9);
  };

  useEffect(() => {
    console.log(assets);
    const init = async () => {
      if (!web3 || !accounts || !supplyChain) return;

      const actorAssets = await supplyChain.methods
        .getActorAssets(accounts[0])
        .call();

      const assetsWithPriceAndState = await Promise.all(
        actorAssets.map(async (asset) => {
          const infoAssets = await supplyChain.methods
            .payableAssetsById(asset.id)
            .call();
          const tracker = await supplyChain.methods
            .tracerAssets(asset.id, infoAssets.trackerNumber)
            .call();
          const dataFabricDetails = await supplyChain.methods
            .fabricDetailsById(asset.id)
            .call();
          return {
            ...asset,
            time: tracker.time,
            price: infoAssets.price,
            state: infoAssets.state,
            ipfs: infoAssets.ipfs,
            rawMaterial: dataFabricDetails.rawMaterial,
            threadType: dataFabricDetails.threadType,
            fabricType: dataFabricDetails.fabricType,
            pattern: dataFabricDetails.pattern,
          };
        })
      );
      const role = await supplyChain.methods.getActorRole(accounts[0]).call();
      setRole(role);
      setAssets(assetsWithPriceAndState);
      setReloading(false);
      if (assets.length == 0) {
        setdontHaveAsset(true);
      } else if (assets.length > 0) {
        for (let i = 0; i < assets.length; i++) {
          if (assets[i].id == 0) {
            setdontHaveAsset(true);
          } else {
            setdontHaveAsset(false);
          }
        }
      } else {
        setdontHaveAsset(true);
      }
      //   console.log(assets);
      //   console.log(dontHaveAsset);
    };
    if (web3) {
      init();
    }
  }, [web3, accounts, supplyChain, reloading]);

  const handleCreateThreadModal = (assetId) => {
    setSelectedAssetId(assetId);
    setCreateThreadModalOpen(true);
  };
  const handleDistributeThreadModal = (assetId) => {
    setSelectedAssetId(assetId);
    setDistributeThreadModalOpen(true);
  };
  const handleFabricWeavingModal = (assetId) => {
    setSelectedAssetId(assetId);
    setFabricWeavingModalOpen(true);
  };
  const handleSellFabricModal = (assetId) => {
    setSelectedAssetId(assetId);
    setSellFabricModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAssetId(null);
    setCreateThreadModalOpen(false);
    setDistributeThreadModalOpen(false);
    setFabricWeavingModalOpen(false);
    setSellFabricModalOpen(false);
  };
  const handleReload = () => {
    setReloading(true);
  };

  const handleQRCode = (assetId) => {
    setQrCode(`https://weave-blockchain.vercel.app/public-tracer?q=${assetId}`);
    document.getElementById("my_modal_1").showModal();
  };
  const canvasRef = useRef(null);

  const handleDownload = () => {
    if (canvasRef.current) {
      const qrCodeDataURL = canvasRef.current.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeDataURL;
      downloadLink.download = "qrcode.png"; // You can change the filename if needed
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      QRCode.toCanvas(canvas, qrCode, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("success!");
        }
      });
    }
  }, [qrCode]);
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h1 className="text-xl font-bold text-center">Produk</h1>
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
            <th className="px-4 py-2 text-sm font-bold text-gray-600">ID</th>
            <th className="px-4 py-2 text-sm font-bold text-gray-600">
              Nama aset
            </th>

            <th className="hidden w-full px-4 py-2 text-sm font-bold text-gray-600 md:flex ">
              Gambar
            </th>

            <th className="hidden w-full px-4 py-2 text-sm font-bold text-gray-600 md:flex ">
              <div className="hidden md:block">Harga</div>
            </th>
            <th className="hidden w-full px-4 py-2 text-sm font-bold text-gray-600 md:flex ">
              [No. State] Status
            </th>
            <th className="hidden w-full px-4 py-2 text-sm font-bold text-gray-600 md:flex ">
              Tanggal
            </th>
            <th className="px-4 py-2 text-sm font-bold text-gray-600 ">aksi</th>
          </tr>
        </thead>
        <tbody>
          {reloading
            ? "Getting your asset data..."
            : dontHaveAsset
            ? "You don't have any asset"
            : assets.map((asset, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {asset.id != 0 && (
                    <React.Fragment>
                      <td className="px-4 py-3 border">{asset.id}</td>
                      {
                        <>
                          {asset.state == 1 && (
                            <td className="px-4 py-3 border">
                              {asset.rawMaterial}
                            </td>
                          )}
                          {(asset.state == 2 || asset.state == 3) && (
                            <td className="px-4 py-3 border ">
                              {asset.threadType}
                            </td>
                          )}
                          {(asset.state == 4 || asset.state == 5) && (
                            <td className="px-4 py-3 border ">
                              {fabricTypeName[asset.fabricType]} (
                              {asset.pattern})
                            </td>
                          )}
                        </>
                      }
                      <td className="hidden md:flex w-full px-4 py-3 border overflow-hidden max-w-[200px] text-ellipsis">
                        <a
                          href={"ipfs://" + asset.ipfs}
                          target="_blank"
                          className="text-blue-400 underline underline-offset-1"
                        >
                          {asset.ipfs}
                        </a>
                      </td>
                      <td className="hidden w-full px-4 py-3 border md:flex ">
                        {convertWeiToEth(asset.price)} ETH
                      </td>
                      <td className="hidden w-full px-4 py-3 border md:flex ">
                        [{asset.state}] {stateName[asset.state]}
                      </td>
                      <td className="hidden w-full px-4 py-3 border md:flex ">
                        {new Date(asset.time * 1000).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 border ">
                        <div className="flex flex-col gap-2 md:flex-row">
                          {asset.state == 1 && role == 1 && (
                            <button
                              className="text-white transition duration-200 bg-blue-500 rounded-md btn btn-primary hover:bg-blue-600"
                              onClick={() => handleCreateThreadModal(asset.id)}
                            >
                              Process
                            </button>
                          )}
                          {asset.state == 2 && role == 2 && (
                            <button
                              className="text-white transition duration-200 bg-blue-500 rounded-md btn btn-primary hover:bg-blue-600"
                              onClick={() =>
                                handleDistributeThreadModal(asset.id)
                              }
                            >
                              Process
                            </button>
                          )}
                          {asset.state == 3 && role == 3 && (
                            <button
                              className="text-white transition duration-200 bg-blue-500 rounded-md btn btn-primary hover:bg-blue-600"
                              onClick={() => handleFabricWeavingModal(asset.id)}
                            >
                              Process
                            </button>
                          )}
                          {asset.state == 4 && role == 4 && (
                            <button
                              className="text-white transition duration-200 bg-blue-500 rounded-md btn btn-primary hover:bg-blue-600"
                              onClick={() => handleSellFabricModal(asset.id)}
                            >
                              Process
                            </button>
                          )}
                          <button
                            className="ms-3 btn btn-outline btn-accent"
                            onClick={() => handleQRCode(asset.id)}
                          >
                            Create QR
                          </button>
                        </div>
                      </td>
                    </React.Fragment>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
      <dialog id="my_modal_1" className="modal ">
        <div className="bg-white modal-box">
          <h3 className="mb-3 text-lg font-bold text-center">QR Generator</h3>
          <div className="flex justify-center py-3 bg-blue-300">
            {/* {qrCode && (
              <QRCode id="qrCode" value={qrCode} level="H" ref={qrCodeRef} />
            )} */}
            <canvas ref={canvasRef} id="canvas" />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            {qrCode && (
              <a
                href={qrCode}
                target="_blank"
                className="mt-3 text-blue-500 underline hover:text-blue-700"
              >
                {qrCode}
              </a>
            )}
            <button className="btn btn-success" onClick={handleDownload}>
              Download QR Code
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <CreateThread
        isOpen={createThreadModalOpen}
        onClose={handleCloseModal}
        assetId={selectedAssetId}
      />
      <DistributeThread
        isOpen={distributeThreadModalOpen}
        onClose={handleCloseModal}
        assetId={selectedAssetId}
      />
      <FabricWeaving
        isOpen={fabricWeavingModalOpen}
        onClose={handleCloseModal}
        assetId={selectedAssetId}
      />
      <SellFabric
        isOpen={sellFabricModalOpen}
        onClose={handleCloseModal}
        assetId={selectedAssetId}
      />
    </div>
  );
}

export default ActorAsset;
