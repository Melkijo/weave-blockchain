import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import TraceProduct from "./pages/TraceProduct";
import Register from "./pages/Register";
import PublicGuides from "./pages/PublicGuides";
import UserGuides from "./pages/UserGuides";
import PublicTraceProduct from "./pages/PublicTraceProduct";
import Home from "./pages/Home";

import { Web3Provider } from "./components/Web3Provider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <Web3Provider>
            <Dashboard />
          </Web3Provider>
        }
      />
      <Route
        path="/market"
        element={
          <Web3Provider>
            {" "}
            <Market />
          </Web3Provider>
        }
      />
      <Route
        path="/trace-product"
        element={
          <Web3Provider>
            <TraceProduct />
          </Web3Provider>
        }
      />
      <Route
        path="/register"
        element={
          <Web3Provider>
            <Register />
          </Web3Provider>
        }
      />
      <Route
        path="/public-tracer"
        element={
          <Web3Provider>
            <PublicTraceProduct />
          </Web3Provider>
        }
      />
      <Route path="/public-guides" element={<PublicGuides />} />
      <Route path="/user-guides" element={<UserGuides />} />
    </Routes>
  );
}

export default App;
