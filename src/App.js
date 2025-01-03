
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from './Components/Main/Main.js';
import SignUp from './Components/Features/SignUp.js';
import SignIn from './Components/Features/SignIn.js';
import Toner from './Components/Products/Toner.js';
import Lotion from './Components/Products/Lotion.js';
import Serum from './Components/Products/Serum.js';
import Cart from './Components/Cart/Cart.js';
import PasswordReset from './Components/Features/PasswordReset.js';
import AddProduct from './Components/Features/AddProduct.js';
import ProductDetail from './Components/Products/Product/ProductDetail.js';
import ManageAccount from './Components/Manage/ManageAccount.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/add-products" element={<AddProduct />} />
        <Route path="/toner" element={<Toner />} />
        <Route path="/lotion" element={<Lotion />} />
        <Route path="/serum" element={<Serum />} />
        <Route path="/product-detail/:title" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/manage" element={<ManageAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
