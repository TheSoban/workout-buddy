import { Outlet } from "react-router-dom";
import { PanelNavbar } from "../Navbar";

export const PanelLayout = () => {
  return <>
    <PanelNavbar />
    <main className="container">
      <Outlet />
    </main>
  </>
}
