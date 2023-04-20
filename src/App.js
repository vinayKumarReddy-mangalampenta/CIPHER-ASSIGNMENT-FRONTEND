
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Profile from './components/Profile';

function App() {
  return (
    <>
      {/* webpage routes */}
      <BrowserRouter >
        <Routes >
          <Route exact path='/login' element={<Login />} ></Route>
          <Route exact path='/register' element={<Register />} ></Route>
          <Route exact path="/" element={<Profile />} ></Route>
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
