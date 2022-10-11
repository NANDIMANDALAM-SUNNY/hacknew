import React,{useState,createContext} from 'react'
import Header from './components/Header/Header';
import Home from './components/Main/Home';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddQuestion from './components/AddQuestion/AddQuestion';
import ViewQuHome from './components/ViewQuestion/SingleHome';
import Register from './components/Register/Register';
import Login from './components/Login/Login';

export const store = createContext();

function App() {
  const [token,setToken] = useState(localStorage.getItem('jwt-token'));

  return (
    <>
    <store.Provider value={[token,setToken]}>
        <Router>
            <Header />
          <Routes>
              <Route exact path='/' element={<Home />  } />
              <Route exact path='/addquestion' element={<AddQuestion /> } />
              <Route exact path='/viewquestion/:id' element={<ViewQuHome /> } />
              <Route exact path='/register' element={<Register /> } />
              <Route exact path='/login' element={<Login />} />
          </Routes>
        </Router>
    </store.Provider>
    </>
  );
}

export default App;
