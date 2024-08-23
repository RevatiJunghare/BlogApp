import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/store';

interface Props {
    children: any;
    
  }

const PrivateRoute:React.FC<Props>=({ children })=> {
    // const { isAuthenticated } = useAuth0();
    const auth = useAppSelector((store)=>store.auth.data.isUserLoggedIn)

    if(!auth) {
        toast.warning("Please Login First");
        return <Navigate to="/login" />;
    }
    return children;
}

export default PrivateRoute;