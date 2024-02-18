import React, { useState, useEffect } from "react";
import RegisterForm from "../components/owner/RegisterForm";
import ListActor from "../components/owner/ListActor";

const Register = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-8 text-gray-900 text-center pt-6">
                Actor Register Page
            </h1>
            <div className="text-right mx-10 my-2">
                <a href="/dashboard" className="text-black font-bold hover:text-blue-700">Go to Dashboard</a>
            </div>
            <div className="flex px-4">
                <RegisterForm />
                <ListActor />
            </div>
        </div>
    );
};

export default Register;
