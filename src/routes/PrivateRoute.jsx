import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import PropTypes from 'prop-types';
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if (loading) {
        return <div className="flex justify-center items-center w-full min-h-screen">
            <span className="loading loading-infinity loading-lg text-gray-400"></span>
        </div>
    }
    if (user) {
        return children;
    }
    return;
};
PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;