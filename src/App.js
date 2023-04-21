
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AllUsers from './components/AllUsers';
import UpdateProfile from './components/UpdateProfile';
import MyFollowers from './components/FollowersList';

function App() {
  return (
    <>
      {/* webpage routes */}
      <BrowserRouter >
        <Routes >
          <Route exact path='/login' element={<Login />} ></Route>
          <Route exact path='/register' element={<Register />} ></Route>
          <Route
            exact path="/" element={
              <ProtectedRoute >
                <Profile />
              </ProtectedRoute>
            } >
          </Route>
          <Route
            exact path="/:user" element={
              <ProtectedRoute >
                <Profile />
              </ProtectedRoute>
            } >
          </Route>
          <Route
            exact path="/users/all" element={
              <ProtectedRoute >
                <AllUsers />
              </ProtectedRoute>
            } >
          </Route>
          <Route
            exact path="/followers/:username" element={
              <ProtectedRoute >
                <MyFollowers />
              </ProtectedRoute>
            } >
          </Route>

          <Route exact path='update-profile' element={<ProtectedRoute ><UpdateProfile /></ProtectedRoute>} />

          <Route path='*' element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
