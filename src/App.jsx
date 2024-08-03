import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Quiz from './pages/Quiz/Quiz';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const routes = (
  <Router> 
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
</Router>
);

const App = () => {
  return <div>{routes}</div>;
}

export default App