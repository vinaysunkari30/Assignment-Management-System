import { NavLink } from "react-router-dom";

import { studentTabsList, adminTabsList } from "../data/tabsList";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const renderTabsList = (eachTab) => (
    <NavLink
      key={eachTab.id}
      to={eachTab.url}
      className={({
        isActive,
      }) => `flex justify-center items-center rounded-xl transition active:scale-85 hover:bg-slate-800
        md:w-full md:gap-3 md:mb-2 md:py-2 md:justify-start md:px-3 lg:gap-5 lg:px-4 xl:px-5
        ${isActive ? "bg-slate-700" : ""}
        `}
    >
      <span className="text-2xl text-[#09e1e8]">{eachTab.icon}</span>
      <span className="md:block hidden text-md lg:text-lg font-roboto">
        {eachTab.tab}
      </span>
    </NavLink>
  );

  return (
    <div className="fixed left-0 top-0 hidden h-screen w-56 flex-col items-center bg-slate-950 pt-18.5 md:flex lg:w-[252px]">
      <div className="w-[90%] rounded-full border border-white"></div>

      <ul className="flex flex-col items-center justify-center gap-2 py-4 text-white">
        {user.role === "admin"
          ? adminTabsList.map((eachTab) => renderTabsList(eachTab))
          : studentTabsList.map((eachTab) => renderTabsList(eachTab))}
      </ul>
    </div>
  );
};

export default Sidebar;
