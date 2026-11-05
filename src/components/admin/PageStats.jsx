import { GoCheckCircleFill } from "react-icons/go";
import {
  LuClipboardList,
  LuUsers,
  LuClock,
  LuPlus,
  LuSearch,
  LuCalendarDays,
  LuFileText,
  LuCircleAlert,
  LuTrendingUp,
  LuArrowUpRight,
} from "react-icons/lu";

const statCards = [
  {
    title: "Total Assignments",
    value: stats.totalAssignments,
    description: "Assignments created",
    icon: LuClipboardList,
    color: "blue",
  },
  {
    title: "Total Students",
    value: stats.totalStudents,
    description: "Registered students",
    icon: LuUsers,
    color: "purple",
  },
  {
    title: "Submitted",
    value: stats.submitted,
    description: "Student submissions",
    icon: GoCheckCircleFill,
    color: "green",
  },
  {
    title: "Pending",
    value: stats.pending,
    description: "Awaiting submission",
    icon: LuClock,
    color: "orange",
  },
];

const PageStats = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {statCards.map((card) => {
      const Icon = card.icon;
      return (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>

            <div className={`rounded-xl p-3 ${colorStyles[card.color]}`}>
              <Icon size={24} />
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">{card.description}</p>
        </div>
      );
    })}
  </div>
);

export default PageStats;
