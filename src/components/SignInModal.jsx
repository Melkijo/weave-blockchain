import React from "react";

const SignIn = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl bg-opacity-90 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-3 py-2 font-medium text-black border border-black rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  ✖
                </button>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-center">Sign In</h1>
              <p className="text-xs text-center text-gray-900 ">
                Klik tombol "Continue" untuk melanjutkan ke dashboard pengguna,
                pastikan akun anda sudah terdaftar dan terkoneksi.
              </p>

              <div className="my-10 text-center">
                <a
                  href="/dashboard"
                  className="px-4 py-3 mx-2 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Continue
                </a>
              </div>
              <div className="text-center">
                <a
                  href="/user-guides"
                  className="px-2 text-blue-500 hover:text-blue-800"
                >
                  Panduan
                </a>
                <a
                  href="/register"
                  className="px-2 text-blue-500 hover:text-blue-800"
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
