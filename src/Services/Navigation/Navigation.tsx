import Home from 'Pages/Home/Home';
import Login from 'Pages/Login/Login';
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
    </Routes>
  );
}
