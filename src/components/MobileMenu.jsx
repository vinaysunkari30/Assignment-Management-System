import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { studentTabsList, adminTabsList } from "../data/tabsList";

import { FiLogOut } from "react-icons/fi";


const MobileMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const renderTabsList = (eachTab) => (
    <NavLink
      key={eachTab.id}
      to={eachTab.url}
      onClick={() => {
        setOpen(false);
      }}
      className={({ isActive }) =>
        `w-full font-syne text-center tracking-wide rounded-xl text-white text-md px-3 py-1.5 cursor-pointer font-medium
            ${isActive ? "bg-slate-700 hover:bg-slate-700" : "hover:bg-slate-500"}`
      }
    >
      {eachTab.tab}
    </NavLink>
  );

  const onLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      ref={menuRef}
      className="relative flex flex-col justify-center items-end md:hidden"
    >
      <button
        onClick={() => setOpen(!isOpen)}
        className="w-8 h-8 relative cursor-pointer"
      >
        <span
          className={`absolute left-0 top-2 w-6  h-0.5 bg-white transition-all duration-200 
                  ${isOpen ? "rotate-132 top-4" : ""}`}
        ></span>
        <span
          className={`absolute left-0 top-4 w-6  h-0.5 bg-white transition-all duration-200 
                  ${isOpen ? "-rotate-132 top-3" : ""}`}
        ></span>
        <span
          className={`absolute left-0 top-6 w-6  h-0.5 bg-white transition-all duration-200 
                  ${isOpen ? "opacity-0" : ""}`}
        ></span>
      </button>
      <div
        className={`absolute -right-3 top-6.5 mt-5.5 md:hidden
                  bg-slate-900 w-55 h-70 xs:w-80 xs:h-75 px-5 py-4 rounded-bl-3xl
                  flex flex-col transform transition-all duration-300 ease-in-out flex items-center
                  ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0 pointer-events-none"
                  }
                `}
      >
        <div className="flex flex-col h-full gap-3 xs:gap-4 items-center overflow-y-auto scroll w-[70%] xs:w-[50%]">
          {user.role === "admin"
            ? adminTabsList.map((eachTab) => renderTabsList(eachTab))
            : studentTabsList.map((eachTab) => renderTabsList(eachTab))}
        </div>
        <div className="w-full border rounded-xl border-slate-700 mb-2"></div>
        <button
          onClick={onLogout}
          className="border border-rose-600 flex justify-center text-rose-600 hover:bg-rose-400/20 w-full items-center cursor-pointer active:scale-85 transition mb-2 gap-[10px] mt-[5px] px-[6px] py-[6px] rounded-lg sm:gap-[6px] sm:px-[8px]"
        >
          <span className="text-[15px] font-medium xs:text-[17px] sm:text-[18px] xl:text-[19px]">
            Logout
          </span>
          <FiLogOut className="text-[21px] xs:text-[22px] sm:text-[20px] md:text-[21px] xl:text-[22px]" />
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
