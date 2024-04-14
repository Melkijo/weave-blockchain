import React, { useState, useEffect } from "react";
import RegisterForm from "../components/owner/RegisterForm";
import ListActor from "../components/owner/ListActor";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1
        className="pt-6 mb-8 text-2xl font-bold text-center text-gray-900"
        data-testid="registration-test"
      >
        Actor Register Page
      </h1>
      <div className="mx-10 my-2 text-right">
        <a
          href="/dashboard"
          className="font-bold text-black hover:text-blue-700"
        >
          Go to Dashboard
        </a>
      </div>
      <div className="flex px-4">
        <RegisterForm />
        <ListActor />
      </div>
    </div>
  );
};

export default Register;
