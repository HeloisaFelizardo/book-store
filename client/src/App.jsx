import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CartPage from './pages/CartPage.jsx';
import Menu from "./components/header/Menu.jsx";



function App() {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
