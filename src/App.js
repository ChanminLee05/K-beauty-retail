
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './Components/Main/Main.js';
import SignUp from './Components/Features/SignUp.js';
import SignIn from './Components/Features/SignIn.js';
import Toner from './Components/Products/Toner.js';
import Lotion from './Components/Products/Lotion.js';
import Serum from './Components/Products/Serum.js';
import Cart from './Components/Cart/Cart.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/toner" element={<Toner />} />
        <Route path="/lotion" element={<Lotion />} />
        <Route path="/serum" element={<Serum />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
