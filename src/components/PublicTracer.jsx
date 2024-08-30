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
      <form onSubmit={handleSearch} className="mx-6 mt-10 md:mx-12">
        <div className="items-center mt-2 mb-6 rounded-md">
          <h1 className="my-2 font-bold text-white">Produk ID</h1>
          <input
            className="w-1/3 px-4 py-2 text-black border rounded shadow-lg bg-slate-100 focus:outline-none"
            type="text"
            name="assetId"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by ID..."
          />
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 ml-4 text-white bg-purple-400 rounded hover:bg-purple-500"
          >
            {loading ? "Mencari..." : "Cari"}
          </button>
        </div>
      </form>
      {asset === null &&
        (loading ? (
          ""
        ) : (
          <div className="text-center">
            <button disabled={true} className="px-4 py-2 text-white rounded">
              Aset dengan ID <strong>{IdAsset}</strong> belum dibuat.
            </button>
          </div>
        ))}
      <div className="flex flex-col gap-10 mx-6 mt-6 md:mx-12 md:flex-row">
        <div className="rounded-md w-full md:w-[600px] h-[350px] border border-white">
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
                          className="object-cover object-center w-full h-full"
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
        <div className="flex-grow p-4 text-white border border-white rounded-lg shadow-lg ">
          <h1 className="mt-3 mb-5 text-2xl font-bold text-center text-white">
            Informasi produk
          </h1>
          <div className="flex justify-between -mx-6">
            <div className="h-full px-4 border-r border-white md:px-6 ">
              <h1 className="text-sm text-white md:text-base">ID</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.id == "0" ? "-" : fabricDetails.id}
                  </strong>
                </p>
              )}
              <div className="my-4 border-t border-white"></div>
              <h1 className="text-sm text-white md:text-base">Tipe Benang</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.threadType == ""
                      ? "-"
                      : fabricDetails.threadType}
                  </strong>
                </p>
              )}
              <div className="my-4 border-t border-white"></div>
              <h1 className="text-sm text-white md:text-base">Corak</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.pattern == "" ? "-" : fabricDetails.pattern}
                  </strong>
                </p>
              )}
            </div>
            <div className="w-4/12 h-full px-6 border-r border-white">
              <h1 className="text-sm text-white md:text-base">Bahan Baku</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.rawMaterial == ""
                      ? "-"
                      : fabricDetails.rawMaterial}
                  </strong>
                </p>
              )}
              <div className="my-4 border-t border-white"></div>
              <h1 className="text-sm text-white md:text-base">Pewarna</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.dyeType == "0"
                      ? "-"
                      : dyeTypeName[fabricDetails.dyeType]}
                  </strong>
                </p>
              )}
              <div className="my-4 border-t border-white"></div>
              <h1 className="text-sm text-white md:text-base">Jenis Kain</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.fabricType == "0"
                      ? "-"
                      : fabricTypeName[fabricDetails.fabricType]}
                  </strong>
                </p>
              )}
            </div>
            <div className="w-4/12 px-6 overflow-hidden text-ellipsis">
              <h1 className="text-sm text-white md:text-base">
                Kualitas Benang
              </h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.threadQuality == ""
                      ? "-"
                      : fabricDetails.threadQuality}
                  </strong>
                </p>
              )}
              <div className="my-4 border-t border-white"></div>
              <h1 className="text-sm text-white md:text-base">Asal</h1>
              {loading ? (
                "..."
              ) : (
                <p className="text-sm text-white md:text-lg">
                  <strong>
                    {fabricDetails.origin == "" ? "-" : fabricDetails.origin}
                  </strong>
                </p>
              )}

              <div className="my-4 border-t border-white"></div>

              <h1 className="text-sm text-white md:text-base">Gambar</h1>
              {loading ? (
                "..."
              ) : (
                <a
                  href={"ipfs://" + fabricDetails.ipfs}
                  target="_blank"
                  className="overflow-hidden text-white underline underline-offset-1 "
                >
                  {fabricDetails.ipfs == "" ? "-" : fabricDetails.ipfs}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 mx-6 mt-10 border border-white rounded-lg md:p-4 md:mx-12 bg-opacity-40">
        <div className="w-full">
          <h1 className="mt-3 mb-5 text-2xl font-bold text-center text-white">
            Riwayat Proses Aset
          </h1>
          <table className="w-full mb-6 text-left table-auto ">
            <thead className="bg-white border border-white ">
              <tr className="border-b-2 border-white">
                <th className="hidden px-4 py-2 font-bold text-black md:block">
                  Harga
                </th>
                <th className="px-4 py-2 font-bold text-black ">Status</th>
                <th className="hidden px-4 py-2 font-bold text-black md:block">
                  Alamat ETH
                </th>
                <th className="block px-4 py-2 font-bold text-black md:hidden">
                  Lokasi
                </th>

                {moreDetails && (
                  <React.Fragment>
                    <th className="px-4 py-2 font-bold text-black">Nama</th>
                    <th className="px-4 py-2 font-bold text-black">
                      Dokumentasi
                    </th>
                    <th className="px-4 py-2 font-bold text-black">Peran</th>
                    <th className="px-4 py-2 font-bold text-black">Lokasi</th>
                  </React.Fragment>
                )}
                <th className="px-4 py-2 font-bold text-black">Tanggal</th>
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
                    <tr key={index} className="font-medium text-white ">
                      {history.name && (
                        <>
                          <td className="hidden px-4 py-2 border border-white md:block">
                            {convertWeiToEth(history.price)} ETH
                          </td>
                          <td className="px-2 py-2 text-sm border border-white md:px-4 md:text-base">
                            {stateName[history.state]}
                          </td>
                          <td className="px-4 py-2 border border-white">
                            {history.place}
                          </td>
                          <td className="hidden px-2 md:px-4 py-2 border border-white overflow-hidden max-w-[50px] md:max-w-[200px] text-ellipsis text-sm md:text-base">
                            <a
                              href={`https://sepolia.etherscan.io/address/${history.actor}`}
                              className="text-white underline underline-offset-1 "
                            >
                              {history.actor}
                            </a>
                          </td>
                          {moreDetails && (
                            <>
                              <td className="px-2 py-2 border border-white md:px-4">
                                {history.name}
                              </td>
                              <td className="px-2 md:px-4 py-2 border border-white overflow-hidden max-w-[100px] text-ellipsis">
                                <a
                                  href={"ipfs://" + history.ipfs}
                                  target="_blank"
                                  className="text-white underline underline-offset-1"
                                >
                                  {history.ipfs}
                                </a>
                              </td>
                              <td className="px-4 py-2 border border-white">
                                {rolesName[history.role]}
                              </td>
                              <td className="px-4 py-2 border border-white">
                                {history.place}
                              </td>
                            </>
                          )}
                          <td className="px-2 py-2 text-sm border border-white md:px-4 md:text-base">
                            {new Date(history.date * 1000).toLocaleDateString()}
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
                className="hidden px-4 py-2 mb-6 text-white transition duration-200 bg-blue-500 rounded md:block hover:bg-blue-600"
                onClick={() => handleMoreDetails()}
              >
                Detail
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
      </div>
    </div>
  );
};

export default TraceProduct;
