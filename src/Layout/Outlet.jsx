import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
