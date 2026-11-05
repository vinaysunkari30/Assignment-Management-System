import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// import PageWelcome from "../../components/admin/PageWelcome";
// import PageStats from "../../components/admin/PageStats";

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

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    setAssignments(allAssignments.filter((item) => item.creatorId === user.id));

    setStudents(allStudents);
  }, []);

  const getSubmittedCount = (assignment) => {
    return Object.values(assignment.submissions || {}).filter(
      (submission) => submission.submitted,
    ).length;
  };

  const getProgress = (assignment) => {
    const assigned = assignment.assignedTo?.length || 0;

    if (!assigned) return 0;

    return Math.round((getSubmittedCount(assignment) / assigned) * 100);
  };

  const stats = useMemo(() => {
    const totalAssignments = assignments.length;

    const totalAssigned = assignments.reduce(
      (sum, item) => sum + (item.assignedTo?.length || 0),
      0,
    );

    const submitted = assignments.reduce(
      (sum, item) => sum + getSubmittedCount(item),
      0,
    );

    const pending = totalAssigned - submitted;

    return {
      totalAssignments,
      totalStudents: students.length,
      totalAssigned,
      submitted,
      pending,
      progress: totalAssigned
        ? Math.round((submitted / totalAssigned) * 100)
        : 0,
    };
  }, [assignments, students]);

  const filteredAssignments = assignments.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const progress = getProgress(item);

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && progress === 100) ||
      (filter === "In Progress" && progress > 0 && progress < 100) ||
      (filter === "Not Started" && progress === 0);

    return matchesSearch && matchesFilter;
  });

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

  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      {/* welcome */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          
          <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-6xl sm:h-24 sm:w-24 sm:text-7xl">
              👨‍🏫
            </div>

            <div className="min-w-0 w-full">
              
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:text-xs">
                  {user.role === "admin"
                    ? "Professor Workspace"
                    : "Student Workspace"}
                </span>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 sm:text-xs">
                  {user.role === "admin"
                    ? user.designation || "Assignment Mentor"
                    : user.designation || "Student"}
                </span>
              </div>

              <h1 className="break-words text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
                Welcome, {user.name || "User"}! 👋
              </h1>

              <p className="mt-2 break-words text-sm font-medium leading-relaxed text-slate-500 lg:text-base">
                {user.profession ||
                  (user.role === "admin"
                    ? "Professor & Academic Administrator"
                    : "Computer Science Student")}

                <span className="mx-2 hidden sm:inline">•</span>

                <span className="block sm:inline">
                  {user.department || "Computer Science & Engineering"}
                </span>
              </p>
            </div>
          </div>

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin/assignments")}
              className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl cursor-pointer bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg sm:w-fit sm:self-start xl:self-center"
            >
              <LuPlus size={20} />
              <span>Create New Assignment</span>
            </button>
          )}
        </div>
      </div>
    
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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">
                Overall Submission Progress
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Total student assignment submissions
              </p>
            </div>

            <LuTrendingUp className="text-blue-600" size={24} />
          </div>

          <div className="mt-7 flex items-end justify-between">
            <h2 className="text-4xl font-bold text-slate-800">
              {stats.progress}%
            </h2>
            <p className="text-sm text-slate-500">
              {stats.submitted} of {stats.totalAssigned} submitted
            </p>
          </div>

          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{ width: `${stats.progress}%` }}
            />
          </div>

          <div className="mt-5 flex gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              Submitted ({stats.submitted})
            </span>

            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              Pending ({stats.pending})
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-orange-100 bg-orange-50 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
              <LuCircleAlert size={22} />
            </div>
            <h3 className="font-semibold text-slate-800">Attention Required</h3>
          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-800">
            {stats.pending}
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Student submissions are still pending.
          </p>

          <button
            onClick={() => navigate("/admin/progress")}
            className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-orange-700"
          >
            View student progress
            <LuArrowUpRight size={17} />
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h3 className="font-semibold text-slate-800">
              Assignment Overview
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Monitor the progress of each assignment.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <LuSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={17}
              />
              <input
                type="text"
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-56"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="All">All Assignments</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>

        {filteredAssignments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Assignment</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4">Submissions</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAssignments.map((item) => {
                  const assigned = item.assignedTo?.length || 0;
                  const submitted = getSubmittedCount(item);
                  const progress = getProgress(item);

                  const overdue =
                    new Date(item.dueDate) < new Date() && progress < 100;

                  const status =
                    progress === 100
                      ? "Completed"
                      : progress === 0
                        ? "Not Started"
                        : "In Progress";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                            <LuFileText size={20} />
                          </div>

                          <div>
                            <p className="font-medium text-slate-800 text-sm sm:text-base">
                              {item.title}
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {item.tags?.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <LuCalendarDays size={16} />
                          {new Date(item.dueDate).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {submitted} / {assigned}
                      </td>

                      <td className="px-6 py-5">
                        <div className="w-28">
                          <p className="mb-2 text-sm font-semibold text-slate-700">
                            {progress}%
                          </p>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            overdue
                              ? "bg-red-50 text-red-600"
                              : progress === 100
                                ? "bg-green-50 text-green-600"
                                : progress === 0
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {overdue ? "Overdue" : status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() =>
                            navigate("/admin/progress", {
                              state: { assignmentId: item.id },
                            })
                          }
                          className="text-sm cursor-pointer font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <LuClipboardList size={35} className="mx-auto text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-800">
              No assignments found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Create an assignment or change your search filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
