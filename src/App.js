import './App.css';
import Home from './Screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Screens/Login.jsx';
import Signin from './Screens/Signin.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { CartProvider } from './Components/ContextRed.jsx'; // Use PascalCase for the provider name
import MyOrders from './Screens/MyOrders.jsx';

function App() {
  return (
    <CartProvider> {/* PascalCase for the Provider */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/myorders' element={<MyOrders />}/>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
