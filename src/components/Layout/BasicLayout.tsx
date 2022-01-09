import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { BasicNavbar } from "../Navbar/BasicNavbar";

export const BasicLayout: React.FC = () => {
  const data = useAuth();

  if(data.user.authenticated) return <Navigate to="/panel" replace />
  return <>
    <BasicNavbar />
    <main className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin:"100px auto"
    }}>
      <Outlet />
    </main>
  </>
}