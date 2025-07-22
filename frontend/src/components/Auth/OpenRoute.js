import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const token = useSelector((store) => store.user.token);

  if (token === null) {
    return children;
  } else {
    return <Navigate to="/home" />;
  }
}

export default OpenRoute;
