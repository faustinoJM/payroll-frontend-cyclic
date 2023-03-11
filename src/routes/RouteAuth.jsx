import { Navigate, Route, RouteProps, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext";


export default function RouterAuth({children, isPrivate = false}) {
  const { user } = useAuth();
  const location = useLocation();


  return (
      !!user ? (
        children
      ) : (
        <Navigate to='/login' state={{ from: location }} replace/> 
      )
  )
}