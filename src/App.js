import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import PratoComum from './pages/PratoComum';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// import EditarPratoAdmin from './pages/EditarPratoAdmin';
// import HomeAdmin from './pages/HomeAdmin';
// import HomeComum from './pages/HomeComum';
// import NovoPratoAdmin from './pages/NovoPratoAdmin';
// import PratoAdmin from './pages/PratoAdmin';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/Home';
import PratoAdminPage from './pages/PratoAdmin';
import PratoDetails from './pages/Prato';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<PrivateRoute> <HomePage /> </PrivateRoute>} />
        <Route path="/novo-prato" element={<PrivateRoute> <PratoAdminPage /> </PrivateRoute>} />
        <Route path="/editar-prato/:id" element={<PrivateRoute> <PratoAdminPage /> </PrivateRoute>} />
        <Route path="/editar-prato/:id" element={<PrivateRoute> <PratoAdminPage /> </PrivateRoute>} />
        <Route path="/prato/:id" element={<PrivateRoute> <PratoDetails /> </PrivateRoute>} />


        {/* <Route path="/editar-prato-admin" element={<EditarPratoAdmin />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/home-comum" element={<HomeComum />} />
        <Route path="/novo-prato-admin" element={<NovoPratoAdmin />} />
        <Route path="/prato-admin" element={<PratoAdmin />} /> */}

        <Route path="*" element={<Navigate to="/sign-in" />} />
      </Routes>
    </Router>
  );
}

export default App;
