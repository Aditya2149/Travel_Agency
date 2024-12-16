//App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TourPackages from './components/TourPackages';
import AdminLogin from './components/AdminLogin'; // Import the AdminLogin component
import AdminDashboard from './components/adminDashboard'; // Import the AdminLogin component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TourPackages />} />
        <Route path="/admin/login" element={<AdminLogin />} /> {/* Admin login route */}
        <Route path="/admin-dashboard" element={< AdminDashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;