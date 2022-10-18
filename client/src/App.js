import React,{useState,createContext} from 'react'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import NavbarComponent from './components/Navbar//NavbarComponent';
import Profile from './components/Profile/Profile';
import ConfirmAccount from './components/ConfirmAccount/ConfirmAccount';
// import Profile from './components/Profile/Profile';


export const store = createContext();



function App() {
  const [token,setToken] = useState(localStorage.getItem('jwt-token'));
  const [products,setProducts] = useState({});
  const [search,setSearch] = useState("");
	const [sort, setSort] = useState({ sort: "rating", order: "desc" });
	const [page, setPage] = useState(1);
  const [profile,setProfile] = useState([])

  return (
   <>
    <store.Provider value={{token,setToken,products,setProducts,search,setSearch,profile,setProfile}} >
        <Router>
        <NavbarComponent />
          <Routes>
              <Route exact path='/' element={<Dashboard />  } />
              <Route exact path='/register' element={<Register /> } />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/forgot-password' element={<ForgotPassword /> } />
              <Route exact path='/resetpassword/:token' element={<ResetPassword /> } />
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/confirmaccount' element={<ConfirmAccount />} />
             
          </Routes>
        </Router>
    </store.Provider>
   </>
  );
}

export default App;
