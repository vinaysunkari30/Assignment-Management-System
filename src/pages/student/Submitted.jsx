import { useEffect, useState } from "react";

import { GoCheckCircleFill } from "react-icons/go";
import {
  LuCalendarDays,
  LuExternalLink,
  LuFileText,
  LuAward,
  LuSearch,
  LuClipboardCheck,
} from "react-icons/lu";

const Submitted = () => {
  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    setUser(currentUser);

    setAssignments(
      allAssignments.filter(
        (item) =>
          item.assignedTo?.includes(currentUser.id) &&
          item.submissions?.[currentUser.id]?.submitted,
      ),
    );
  }, []);

  const totalPoints = assignments.reduce(
    (sum, item) => sum + (Number(item.points) || 0),
    0,
  );

  const filteredAssignments = assignments.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedAssignments = [...filteredAssignments].sort(
    (a, b) =>
      new Date(b.submissions[user.id]?.submittedAt) -
      new Date(a.submissions[user.id]?.submittedAt),
  );

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Submitted Assignments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review your completed work and submission history.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-semibold text-green-600">
          <GoCheckCircleFill size={18} />
          {assignments.length} Completed
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Completed Assignments",
            value: assignments.length,
            icon: LuClipboardCheck,
            color: "blue",
          },
          {
            title: "Total Points",
            value: totalPoints,
            icon: LuAward,
            color: "green",
          },
          {
            title: "Completion Status",
            value: "Submitted",
            icon: GoCheckCircleFill,
            color: "purple",
          },
        ].map((card) => {
          const Icon = card.icon;

          const colors = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            purple: "bg-purple-50 text-purple-600",
          };

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.title}</p>
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

      {/* Submission History */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-800">Submission History</h2>
            <p className="mt-1 text-sm text-slate-500">
              All your successfully submitted assignments.
            </p>
          </div>

          <div className="relative">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-60"
            />
          </div>
        </div>

        {sortedAssignments.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {sortedAssignments.map((item) => {
              const submission = item.submissions[user.id];

              return (
                <div key={item.id} className="p-5 transition hover:bg-slate-50">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                    {/* Assignment Details */}
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-green-50 p-3 text-green-600">
                        <LuFileText size={22} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-800">
                            {item.title}
                          </h3>

                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                            Submitted
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {item.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-blue-700">
                      <LuAward size={20} />
                      <div>
                        <p className="text-xs text-blue-500">Maximum Points</p>
                        <p className="font-bold">{item.points} Points</p>
                      </div>
                    </div>
                  </div>

                  {/* Submission Information */}
                  <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-400">Submission Date</p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <LuCalendarDays size={16} className="text-green-600" />
                        {submission.submittedAt
                          ? new Date(submission.submittedAt).toLocaleString()
                          : "Date unavailable"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Due Date</p>
                      <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <LuCalendarDays size={16} />
                        {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    {submission.note && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-slate-400">
                          Your Submission Note
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {submission.note}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Links */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-medium text-green-600">
                      <GoCheckCircleFill size={16} />
                      Successfully submitted
                    </span>

                    <div className="flex flex-wrap gap-4">
                      {submission.driveLink && (
                        <a
                          href={submission.driveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          My Submission <LuExternalLink size={15} />
                        </a>
                      )}

                      <a
                        href={item.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
                      >
                        Instructions <LuExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <LuClipboardCheck size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-semibold text-slate-800">
              {assignments.length === 0
                ? "No submissions yet"
                : "No matching assignments"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {assignments.length === 0
                ? "Your completed assignments will appear here."
                : "Try searching with another assignment title."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submitted;
