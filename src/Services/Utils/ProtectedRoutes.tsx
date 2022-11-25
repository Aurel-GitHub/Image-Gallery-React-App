import Header from 'Layouts/Header/Header';
import { Navigate } from 'react-router-dom';
import { ChildrenProps } from './Interfaces/i-children-props';

export default function ProtectedRoute({ children }: ChildrenProps): JSX.Element {
  const userConnected = localStorage.getItem('token');
  if (!userConnected) {
    return <Navigate to='/login' />;
  } else {
    return (
      <>
        <Header /> {children}
      </>
    );
  }
}
