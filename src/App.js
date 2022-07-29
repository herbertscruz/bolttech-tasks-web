import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import NoMatch from "./components/NoMatch";
import Navigation from "./components/Navigation";
import React from "react";
import Home from "./components/Home";
import AccessRoute from "./components/login/AccessRoute";
import Account from "./components/Account";
import AuthProvider from "./components/login/AuthProvider";
import ProtectedRoute from "./components/login/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="signin"
          element={
            <AccessRoute>
              <SignIn />
            </AccessRoute>
          }
        />
        <Route
          path="signup"
          element={
            <AccessRoute>
              <SignUp />
            </AccessRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
