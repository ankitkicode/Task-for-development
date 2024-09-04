import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Generate from './Component/QR_Generate/Generate';
import Scan from './Component/QR_Scan/Scan';
import Register from './Component/Register/Register';
import ProtectedRoute from '../src/protectedroute/ProtectedRoute'; // Import the ProtectedRoute component
import EditInventory from './Component/Edit/Edit';
import UserInventory from './Component/userinventory/UserInventory';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route
            path="/"
            element={
              
                <Home />
              
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-inventory" element={
            <ProtectedRoute>
              <UserInventory/>
            </ProtectedRoute>
            
            } />
          <Route
            path="/QR-generate"
            element={
              <ProtectedRoute>
                <Generate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QR-scan"
            element={
              <ProtectedRoute>
                <Scan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditInventory/>
              </ProtectedRoute>
            }
          />
        </Route>
        
      </Routes>
    </div>
  );
};

export default App;
