import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomeScreen from "./components/HomeScreen";
import RideConfirmation from "./components/RideConfirmation";
import LiveTracking from "./components/LiveTracking";
import PaymentPage from "./components/PaymentPage";
import RideHistory from "./components/RideHistory";
import Profile  from "./components/profile";// ✅ Add this import


// ✅ NEW: OTP Components
import SendOtp from "./components/SendOtp";
import VerifyOtp from "./components/VerifyOtp";
import RideBookingForm from "./components/RideBookingFrom";

// 🔒 Protects pages that require login
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// 🚀 Shows Navbar only when user is logged in and not on login/signup/otp pages
function LayoutWithNavbar({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const hideNavbarRoutes = ["/login", "/signup", "/send-otp", "/verify-otp"];
  const shouldShowNavbar = isLoggedIn && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 6000);
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <LayoutWithNavbar>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* ✅ NEW OTP Routes */}
            <Route path="/send-otp" element={<SendOtp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />

            {/* ✅ Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ride-confirmation"
              element={
                
                <ProtectedRoute>
                  
                  <RideConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/live-tracking"
              element={
                <ProtectedRoute>
                  
                  <LiveTracking />
                  <RideBookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ride-history"
              element={
                <ProtectedRoute>
                  <RideHistory />
                </ProtectedRoute>
              }
            />
            
          </Routes>
        </LayoutWithNavbar>
      )}
    </Router>
  );
}

export default App;
