import React, { useEffect, useState, useCallback } from "react";
import CryptoCompare from "cryptocompare";
import { useWeb3 } from "../../Web3Provider";
import Notification from "../../Notification";
import uploadIPFS from "../../../helpers/uploadIPFS";

const FabricWeaving = ({ isOpen, onClose, assetId }) => {
  const { web3, accounts, supplyChain } = useWeb3();

  const [exchangeRate, setExchangeRate] = useState(null);
  const [price, setPrice] = useState("");
  const [priceEth, setPriceEth] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [formState, setFormState] = useState({
    dyeType: 1,
    pattern: "",
    origin: "",
    fabricType: 1,
  });

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const formatPrice = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  useEffect(() => {
    async function init() {
      const xRate = await CryptoCompare.price("ETH", ["IDR"]);
      setExchangeRate(xRate);
    }
    init();
  }, []);
  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const ethValue = value / exchangeRate.IDR || 0;
    setPrice(value);
    setPriceEth(ethValue);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (priceEth) {
      const weiPrice = web3.utils.toWei(priceEth.toFixed(18), "ether");
      try {
        const ipfsData = await uploadIPFS(selectedFile);
        const result = await supplyChain.methods
          .fabricWeaving(
            assetId,
            weiPrice,
            formState.dyeType,
            formState.pattern,
            formState.origin,
            formState.fabricType,
            ipfsData.IpfsHash
          )
          .send({ from: accounts[0] });
        console.log(result);
        if (result && assetId) {
          setSuccessMsg(
            <span>
              Asset with <strong>ID {assetId}</strong> succesfully updated at
              price {priceEth}
            </span>
          );
          setNotificationOpen(true);
        }
      } catch (error) {
        setErrorMsg(error.message);
        setNotificationOpen(true);
      }
    }
    if (!priceEth) {
      if (formState.pattern == "") {
        setErrorMsg(`Pattern must not be empty!`);
      } else if (formState.origin == "") {
        setErrorMsg(`Origin must not be empty!`);
      } else if (price == "") {
        setErrorMsg(`Price must not be empty!`);
      } else {
        setErrorMsg(
          <span>
            Invalid Price : <strong>{price}</strong>
          </span>
        );
      }
      setNotificationOpen(true);
    }
  };

  useEffect(() => {
    setLoading(false);
    if (successMsg !== "") {
      setPrice("");
      setPriceEth("");
    }
    const timer = setTimeout(() => {
      setNotificationOpen(false);
      resetForm();
      if (successMsg !== "") {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [notificationOpen, errorMsg, successMsg]);

  const resetForm = useCallback(() => {
    setSuccessMsg("");
    setErrorMsg("");
    setNotificationOpen(false);
    setLoading(false);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <h2 className="mb-8 text-2xl font-bold text-center">
                  Fabric Weaving
                </h2>
                <div className="mb-1">
                  <label
                    htmlFor="assetId"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    ID Asset
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="assetId"
                      id="assetId"
                      value={assetId}
                      className="block w-full px-4 py-2 border border-gray-400 rounded bg-slate-300 focus:outline-none focus:border-gray-500"
                      disabled
                    />
                  </div>
                </div>
                {/* inputan untuk detail kain */}
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="mb-1">
                    <label
                      htmlFor="dyeType"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Dye Type
                    </label>
                    <select
                      className="block w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-gray-500"
                      name="dyeType"
                      value={formState.dyeType}
                      onChange={handleInputChange}
                    >
                      <option value="1">Natural</option>
                      <option value="2">Synthetic</option>
                    </select>
                  </div>

                  <div className="mb-1">
                    <label
                      htmlFor="pattern"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Pattern
                    </label>
                    <input
                      type="text"
                      name="pattern"
                      id="pattern"
                      value={formState.pattern}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-gray-500"
                      placeholder="Pattern details"
                    />
                  </div>

                  <div className="mb-1">
                    <label
                      htmlFor="origin"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Origin
                    </label>
                    <input
                      type="text"
                      name="origin"
                      id="origin"
                      value={formState.origin}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-gray-500"
                      placeholder="Origin details"
                    />
                  </div>
                  <div className="mb-1">
                    <label
                      htmlFor="fabricType"
                      className="block mb-2 font-medium text-gray-700"
                    >
                      Fabric Type
                    </label>
                    <select
                      className="block w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-gray-500"
                      name="fabric type"
                      value={formState.fabricType}
                      onChange={handleInputChange}
                    >
                      <option value="1">Songket</option>
                      <option value="2">Ikat</option>
                    </select>
                  </div>
                </div>
                {/* akhir dari inputan detaill kain */}

                <div className="mb-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Price (IDR)
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={price}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-gray-500"
                      placeholder="10,000,000"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">
                        {formatPrice(price)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="block pl-1 mb-4 text-gray-700 font-small">
                  ({priceEth} ETH)
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="documentation"
                    className="block mb-2 font-medium text-gray-700"
                  >
                    Documentation
                  </label>
                  <input
                    type="file"
                    className="w-full border-gray-400 rounded file-input focus:outline-none focus:border-gray-500"
                    name="documentation"
                    id="documentation"
                    onChange={changeHandler}
                  />
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mr-4 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          {successMsg !== "" && notificationOpen && (
            <Notification
              msg={successMsg}
              open={notificationOpen}
              bgColor="green"
            />
          )}
          {errorMsg !== "" && notificationOpen && (
            <Notification
              msg={errorMsg}
              open={notificationOpen}
              bgColor="red"
            />
          )}
        </div>
      )}
    </>
  );
};

export default FabricWeaving;
