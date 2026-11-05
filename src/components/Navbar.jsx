import { useNavigate } from "react-router-dom";

import MobileMenu from "./MobileMenu";

import { GiProgression } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="px-3 py-4 md:p-4 bg-slate-900 flex justify-between items-center w-full fixed z-1">
      <div className="flex justify-start items-center gap-2.5 w-full">
        <div className="bg-yellow-500 rounded-lg p-2 w-8.5 h-7.5 md:w-10 md:h-9 flex justify-center items-center">
          <GiProgression className="text-white text-3xl" />
        </div>
        <p className="text-cyan-400 text-sm xs:text-lg font-syne font-semibold">
          Assignment Tracker
        </p>
      </div>
      <div className="flex justify-end items-center gap-3 xs:gap-4 md:gap-5 w-full">
        <button
          onClick={onLogout}
          className="hidden md:flex text-white text-md font-roboto flex justify-center items-center gap-2 cursor-pointer bg-slate-800/70 border border-1.5 border-slate-700 rounded-xl px-4 py-2"
        >
          Logout <FiLogOut />
        </button>
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
