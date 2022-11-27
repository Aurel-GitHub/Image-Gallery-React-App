import Header from 'Layouts/Header/Header';
import { Navigate } from 'react-router-dom';
import { ChildrenProps } from '../Utils/Interfaces/i-children-props';

export default function ProtectedRoute({ children }: ChildrenProps): JSX.Element {
  if (!localStorage.getItem('token')) {
    return <Navigate to='/login' />;
  } else {
    return (
      <>
        <Header /> {children}
      </>
    );
  }
}
