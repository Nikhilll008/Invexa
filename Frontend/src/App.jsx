import { Routes, Route } from "react-router-dom";

import InvexaLanding from "./pages/Landing/InvexaLanding";
import RoleSelect from "./pages/RoleSelect/RoleSelect";

import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import ForgotPassword from "./pages/User/ForgotPassword";

import CALogin from "./pages/CA/CALogin";
import CASignup from "./pages/CA/CASignup";
import Dashboard from "./pages/User/Dashboard/Dashboard";

import MyAccount from "./pages/User/MyAccount/MyAccount";
import Invoices from "./pages/User/Invoices/Invoices";
import Settings from "./pages/User/Settings/Settings";
import Notifications from "./pages/User/Notifications/Notifications";
import HelpSupport from "./pages/User/HelpSupport/HelpSupport";

function App() {

return (

<Routes>

<Route path="/" element={<InvexaLanding />} />

<Route path="/role-select" element={<RoleSelect />} />

<Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route path="/ca-login" element={<CALogin />} />

<Route path="/ca-signup" element={<CASignup />} />

<Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/dashboard" element={<Dashboard />} />


<Route path="/dashboard" element={<Dashboard />} />

<Route path="/my-account" element={<MyAccount />} />

<Route path="/invoices" element={<Invoices />} />

<Route path="/settings" element={<Settings />} />

<Route path="/notifications" element={<Notifications />} />

<Route path="/help-support" element={<HelpSupport />} />

</Routes>

);

}

export default App;