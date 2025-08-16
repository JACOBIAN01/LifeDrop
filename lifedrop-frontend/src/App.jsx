import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import BecomeDonorPage from "./pages/BecomeDonorPage";
import BloodRequestPage from "./pages/BloodRequestPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authIN" element={<Auth status="SignIN" />} />
        <Route path="/authUP" element={<Auth status="SignUP" />} />
        <Route path="/donor" element={<BecomeDonorPage />} />
        <Route path="/request" element={<BloodRequestPage />} />
      </Routes>
    </Router>
  );
}
