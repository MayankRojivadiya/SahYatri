import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = useSelector((store) => store.user.token);

  if (token !== null) {
    return children;
  } else {
    return <Navigate to="/signup" />;
  }
}

export default PrivateRoute;
