import React from "react";
import { Outlet } from "react-router-dom";
import { BasicNavbar } from "../Navbar/BasicNavbar";

export const BasicLayout: React.FC = () => {
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