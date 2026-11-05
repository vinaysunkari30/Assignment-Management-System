import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { LuClipboardList } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

export const studentTabsList = [
  {
    id: 1,
    tab: "Dashboard",
    url: "/student/dashboard",
    icon: <LuLayoutDashboard className="text-[#09e1e8]" />,
  },
  {
    id: 2,
    tab: "Assignments",
    url: "/student/assignments",
    icon: <LuClipboardList className="text-white" />,
  },
  {
    id: 3,
    tab: "Pendings",
    url: "/student/pendings",
    icon: <IoMdTime className="text-yellow-500" />,
  },
  {
    id: 4,
    tab: "Submitted",
    url: "/student/submitted",
    icon: <IoCheckmarkCircleSharp className="text-green-500" />,
  },
];

export const adminTabsList = [
  {
    id: 1,
    tab: "Dashboard",
    url: "/admin/dashboard",
    icon: <LuLayoutDashboard className="text-[#09e1e8]" />,
  },
  {
    id: 2,
    tab: "Assignments",
    url: "/admin/assignments",
    icon: <HiOutlineBookOpen className="text-white" />,
  },
  {
    id: 3,
    tab: "Students",
    url: "/admin/students",
    icon: <FaUsers className="text-[#8B5CF6]" />,
  },
  {
    id: 4,
    tab: "Progress",
    url: "/admin/progress",
    icon: <FiTrendingUp className="text-green-500" />,
  },
];
