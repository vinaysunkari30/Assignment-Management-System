import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoCheckCircleFill } from "react-icons/go";
import {
  LuClipboardList,
  LuClock,
  LuTrendingUp,
  LuCalendarDays,
  LuArrowRight,
  LuExternalLink,
  LuBookOpen,
} from "react-icons/lu";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    setUser(currentUser);

    setAssignments(
      allAssignments.filter((item) =>
        item.assignedTo?.includes(currentUser.id),
      ),
    );
  }, []);

  const isSubmitted = (item) => Boolean(item.submissions?.[user.id]?.submitted);

  const submitted = assignments.filter(isSubmitted).length;
  const pending = assignments.length - submitted;
  const overdue = assignments.filter(
    (item) => !isSubmitted(item) && new Date(item.dueDate) < new Date(),
  ).length;

  const progress = assignments.length
    ? Math.round((submitted / assignments.length) * 100)
    : 0;

  const stats = [
    {
      title: "Total Assignments",
      value: assignments.length,
      icon: LuClipboardList,
      color: "blue",
    },
    {
      title: "Submitted",
      value: submitted,
      icon: GoCheckCircleFill,
      color: "green",
    },
    {
      title: "Pending",
      value: pending,
      icon: LuClock,
      color: "orange",
    },
    {
      title: "Overdue",
      value: overdue,
      icon: LuCalendarDays,
      color: "red",
    },
  ];

  const recentAssignments = [...assignments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const getStatus = (item) => {
    if (isSubmitted(item)) return "Submitted";
    if (new Date(item.dueDate) < new Date()) return "Overdue";
    return "Pending";
  };

  const statusColors = {
    Submitted: "bg-green-50 text-green-600",
    Pending: "bg-orange-50 text-orange-600",
    Overdue: "bg-red-50 text-red-600",
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)] w-full">
      {/* Welcome Header */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[30px] border-blue-50/80" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-blue-50/60 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-4xl">
              <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f393/512.png" />
            </div>

            <div>
              <div className="mb-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                Student Workspace
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                Welcome, {user.name || "Student"}! 👋
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                {user.profession || "Computer Science Student"}
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="block sm:inline">
                  {user.department || "Computer Science & Engineering"}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/student/assignments")}
            className="sm:w-[40%] lg:w-[28%] xl:w-[25%] flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Assignments
            <LuArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => {
          const Icon = card.icon;

          const colors = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
            red: "bg-red-50 text-red-600",
          };

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <div className={`rounded-lg p-3 ${colors[card.color]}`}>
                  <Icon size={21} />
                </div>
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Progress and Quick Links */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Overall Progress */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-800">
                My Learning Progress
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your overall assignment completion
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <LuTrendingUp size={22} />
            </div>
          </div>

          <div className="mt-8 flex items-end justify-between">
            <div>
              <h2 className="text-4xl font-bold text-slate-800">{progress}%</h2>
              <p className="mt-1 text-sm text-slate-500">Completion rate</p>
            </div>
            <p className="text-sm text-slate-500">
              {submitted} of {assignments.length} completed
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-5 text-sm">
            <span className="text-green-600">✓ {submitted} Submitted</span>
            <span className="text-orange-600">● {pending} Pending</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-800">Quick Access</h2>
          <p className="mt-1 text-sm text-slate-500">Manage your assignments</p>

          <div className="mt-5 space-y-3">
            {[
              {
                label: "All Assignments",
                icon: LuBookOpen,
                path: "/student/assignments",
                color: "text-blue-600 bg-blue-50",
              },
              {
                label: "Pending Assignments",
                icon: LuClock,
                path: "/student/pendings",
                color: "text-orange-600 bg-orange-50",
              },
              {
                label: "Submitted Assignments",
                icon: GoCheckCircleFill,
                path: "/student/submitted",
                color: "text-green-600 bg-green-50",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-100 p-3 text-left transition hover:border-blue-200 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3">
                    <span className={`rounded-lg p-2 ${item.color}`}>
                      <Icon size={18} />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {item.label}
                    </span>
                  </span>
                  <LuArrowRight size={17} className="text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-800">Recent Assignments</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest assigned tasks
            </p>
          </div>

          <button
            onClick={() => navigate("/student/assignments")}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            View All <LuArrowRight size={16} />
          </button>
        </div>

        {recentAssignments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentAssignments.map((item) => {
              const status = getStatus(item);

              return (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <LuCalendarDays size={14} />
                        Due {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                      <span>{item.points} Points</span>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-14 text-center">
            <LuClipboardList size={35} className="mx-auto text-slate-300" />
            <p className="mt-3 font-semibold text-slate-700">
              No assignments yet
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Your assigned tasks will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Upcoming Deadlines */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-semibold text-slate-800">Upcoming Deadlines</h2>
        <p className="mt-1 text-sm text-slate-500">
          Keep an eye on your pending assignments.
        </p>

        <div className="mt-4 space-y-3">
          {assignments
            .filter(
              (item) =>
                !isSubmitted(item) && new Date(item.dueDate) >= new Date(),
            )
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-2 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center"
              >
                <p className="text-sm font-medium text-slate-700">
                  {item.title}
                </p>
                <p className="flex items-center gap-2 text-xs font-medium text-orange-600">
                  <LuCalendarDays size={15} />
                  {new Date(item.dueDate).toLocaleDateString()}
                </p>
              </div>
            ))}

          {assignments.filter(
            (item) =>
              !isSubmitted(item) && new Date(item.dueDate) >= new Date(),
          ).length === 0 && (
            <p className="py-4 text-center text-sm text-slate-400">
              No upcoming deadlines. You're all caught up!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
