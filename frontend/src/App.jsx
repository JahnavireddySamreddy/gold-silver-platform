import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import Buy from "./pages/Buy";
import Knowledge from "./pages/Knowledge";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/login"       element={<Login />} />
      <Route path="/register"    element={<Register />} />
      <Route path="/knowledge"   element={<Knowledge />} />
      <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/portfolio"   element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
      <Route path="/transactions"element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
      <Route path="/buy"         element={<ProtectedRoute><Buy /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
