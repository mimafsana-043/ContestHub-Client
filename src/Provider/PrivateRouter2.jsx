import { Navigate, useLocation } from "react-router";
const PrivateRouter2 = () => {
    const location = useLocation();
    return <Navigate state={location.pathname} to={'/Register'}></Navigate>
};

export default PrivateRouter2;