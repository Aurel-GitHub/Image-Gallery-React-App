import Home from 'Pages/Home/Home';
import Login from 'Pages/Login/Login';
import AddPicutres from 'Pages/Pictures/AddPictures/AddPictures';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from 'Services/Utils/ProtectedRoutes';

export default function Navigation(): JSX.Element {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to='/' />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path='/add-picture'
        element={
          <ProtectedRoute>
            <AddPicutres />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
