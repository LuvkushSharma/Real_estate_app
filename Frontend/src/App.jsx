import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import CreateProperty from './pages/CreateProperty';
import Properties from './pages/Properties';
import Oops from './components/Oops';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/foregettingPassword" element={<ForgetPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        
        <Route path="*" element={<Oops />} />

        <Route path='/create-property' element={<CreateProperty/>}/>
        <Route path='/properties' element={<Properties/>}/> 

      </Routes>
    </Router>
  );
};

export default App;
