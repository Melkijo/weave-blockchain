import React from "react";

const SignIn = ({ isOpen, onClose }) => {

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                            className="inline-block align-bottom bg-opacity-90 bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-black shadow-sm font-medium px-3 py-2 text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onClose}
                                >
                                    ✖
                                </button>
                            </div>
                            <h1 className="text-center text-2xl font-bold mb-2">Sign In</h1>
                            <p className=" text-gray-900 text-xs text-center">
                                Klik tombol "Continue" untuk melanjutkan ke dashboard pengguna, pastikan akun anda sudah terdaftar dan terkoneksi.
                            </p>

                            <div className="text-center my-10">
                                <a
                                    href="/dashboard"
                                    className="px-4 mx-2 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                                >
                                    Continue
                                </a>
                            </div>
                            <div className="text-center">
                                <a href="/user-guides" className="text-blue-500 hover:text-blue-800 px-2">Panduan</a>
                                <a href="/register" className="text-blue-500 hover:text-blue-800 px-2">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignIn;
