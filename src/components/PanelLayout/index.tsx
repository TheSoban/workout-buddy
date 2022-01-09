import { Outlet } from "react-router-dom";


const PanelLayout = () => {
  return <>
    <nav>sss</nav>
    <main className="container">
      <Outlet />
    </main>
    <footer>sss</footer>
  </>
}

export default PanelLayout;