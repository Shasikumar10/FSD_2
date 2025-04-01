import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddItem from "./pages/AddItem";
import AdminClaims from "./pages/AdminClaims";
import UserDashboard from "./pages/UserDashboard";  
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider should be inside Router */}
        <NavigationBar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddItem /></ProtectedRoute>} />
          <Route path="/admin/claims" element={<AdminClaims />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
