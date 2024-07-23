import "./App.css";
import SignUp from "./components/UserSection/signUp";
import Login from "./components/UserSection/login";
import Dashboard from "./components/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <GoogleOAuthProvider clientId="849352318712-bvdsm30983kecdg352p548obdtr0hvcd.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/login"
            element={isLoggedIn === true ? <Dashboard /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
