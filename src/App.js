import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Forgot from './components/Forgot';
import UpdatePass from './components/UpdatePass';
import Home from './dataComponents/Home';
import AddProperty from './dataComponents/AddProperty';
import ViewAll from './dataComponents/ViewAll';
import Edit from './dataComponents/Edit';
import { createContext, useState } from 'react';
export let myData = createContext();
function App() {
  let [propertyData, setPropertyData] = useState([]);
  return (
    <div className="App">
      <myData.Provider value={{ propertyData, setPropertyData }}>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot' element={<Forgot />} />
          <Route path='/reset-password/:id/:token' element={<UpdatePass />} />
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path='/add' element={<AddProperty />} />
          <Route path='/all-property' element={<ViewAll />} />
          <Route path='/edit/:dataId' element={<Edit />} />
        </Routes>
      </div>
    </myData.Provider>
      </div>
  );
}

export default App;
