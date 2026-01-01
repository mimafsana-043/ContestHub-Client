import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Pages/Loading/Loading";
import { AuthContext } from "./AuthProvider";
const PrivateRouter = ({ children }) => {

    const location = useLocation();
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to={'/Login'}></Navigate>
    }

};

export default PrivateRouter;