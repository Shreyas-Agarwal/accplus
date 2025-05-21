import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import BimAssessment from "./pages/BimAssessment";
import AccNotifications from "./pages/AccNotifications";
import CompanySelect from "./pages/CompanySelect";
import CompanyGrid from "./pages/CompanyGrid";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/bim-assessment" element={<BimAssessment />} />
        <Route path="/acc-notifications" element={<AccNotifications />} />
        {/* <Route path="/company-select" element={<CompanySelect />}></Route> */}
        <Route path="/company-grid" element={<CompanyGrid />} />
      </Routes>
    </Router>
  );
}
