import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage'
import SignInSide from './pages/SignIn';
import BookP from './pages/BookPage';
import Error from './pages/NoPage';
import CartCheckout from './pages/cart';
import VideoP from './pages/VideoCourcePage';
import Ordered from './pages/ordered';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index  element = {<Home />} />
          <Route path = '/home'  element = {<Home />} />
          <Route path = '/signin' element = {<SignInSide />} />
          <Route path = '/ordered' element = {<Ordered />} />
          <Route path = '/books' element = {<BookP />} />
          <Route path = '/videos' element = {<VideoP />} />
          <Route path = '/cart' element = {<CartCheckout />} />
          <Route path = '*' element = {<Error />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
