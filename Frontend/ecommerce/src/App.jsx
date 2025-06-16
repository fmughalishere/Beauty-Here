import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Checkout from './Components/Checkout';
import PaymentSuccess from './Components/PaymentSuccess';
import Home from './Pages/Home';
import Product from './Pages/Product';
import About from './Pages/About';
import LoginPage from './Pages/LoginPage';
import ProvidedServices from './Pages/AllServices';
import SkinDemo from './Pages/SkinDemo';
import Cart from './Pages/Cart';
import Profile from './Pages/profile';
import Makeup from './Pages/MakeUp';
import Haircare from './Pages/Haircare';
import Fragrance from './Pages/Fragrance';
import SkincareQuiz from './Components/SkincareQuiz';


function App() {
  return (
    <div>
      <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/skincare' element={<SkinDemo />} />
            <Route path='/services' element={<ProvidedServices />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/makeup' element={<Makeup/>}/>
            <Route path='/haircare' element={<Haircare/>}/>
            <Route path='/fragrance' element={<Fragrance/>}/>
            <Route path='/ai-assistant' element={<SkincareQuiz />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
