import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser);
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace/>;
}

// export function PrivateRoute2() {
//   const { currentUser } = useSelector((state) => state.user);
//   console.log(currentUser);
//   return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
// }