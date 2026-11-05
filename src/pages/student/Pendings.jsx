import { useEffect, useState } from "react";

import { IoAlertCircleOutline } from "react-icons/io5";
import {
  LuClock,
  LuCalendarDays,
  LuExternalLink,
  LuFileText,
  LuSend,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Pendings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    setUser(currentUser);

    setAssignments(
      allAssignments.filter(
        (item) =>
          item.assignedTo?.includes(currentUser.id) &&
          !item.submissions?.[currentUser.id]?.submitted,
      ),
    );
  }, []);

  const overdueAssignments = assignments.filter(
    (item) => new Date(item.dueDate) < new Date(),
  );

  const upcomingAssignments = assignments.filter(
    (item) => new Date(item.dueDate) >= new Date(),
  );

  const sortedAssignments = [...assignments].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
  );

  const getDaysLeft = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(date);
    due.setHours(0, 0, 0, 0);

    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Pending Assignments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Complete your remaining assignments and stay on track.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600">
          <LuClock size={18} />
          {assignments.length} Pending
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Total Pending",
            value: assignments.length,
            icon: LuFileText,
            color: "blue",
          },
          {
            title: "Upcoming",
            value: upcomingAssignments.length,
            icon: LuCalendarDays,
            color: "orange",
          },
          {
            title: "Overdue",
            value: overdueAssignments.length,
            icon: IoAlertCircleOutline,
            color: "red",
          },
        ].map((card) => {
          const Icon = card.icon;
          const colors = {
            blue: "bg-blue-50 text-blue-600",
            orange: "bg-orange-50 text-orange-600",
            red: "bg-red-50 text-red-600",
          };

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-4"
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

      {/* Overdue Warning */}
      {overdueAssignments.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <IoAlertCircleOutline
            size={22}
            className="mt-0.5 shrink-0 text-red-600"
          />
          <div>
            <h3 className="font-semibold text-red-700">
              You have {overdueAssignments.length} overdue assignment(s).
            </h3>
            <p className="mt-1 text-sm text-red-600">
              These assignments have passed their deadlines. Complete and submit
              them as soon as possible.
            </p>
          </div>
        </div>
      )}

      {/* Pending Assignment List */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-800">Your Pending Work</h2>
          <p className="mt-1 text-sm text-slate-500">
            Assignments waiting for your submission.
          </p>
        </div>

        {sortedAssignments.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 p-5 xl:grid-cols-2">
            {sortedAssignments.map((item) => {
              const isOverdue = getDaysLeft(item.dueDate) < 0;
              const daysLeft = getDaysLeft(item.dueDate);

              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-5 transition hover:shadow-sm ${
                    isOverdue
                      ? "border-red-200"
                      : "border-slate-200 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col xs:flex-row items-start gap-3">
                      <div
                        className={`rounded-lg p-3 ${
                          isOverdue
                            ? "bg-red-50 text-red-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        <LuFileText size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold leading-6 text-slate-800">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">{item.id}</p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        isOverdue
                          ? "bg-red-50 text-red-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {isOverdue ? "Overdue" : "Pending"}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-slate-100 py-4">
                    <div>
                      <p className="text-xs text-slate-400">Due Date</p>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <LuCalendarDays size={15} />
                        {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-400">Points</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {item.points}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                      <p
                        className={`text-xs font-semibold ${
                          isOverdue ? "text-red-600" : "text-orange-600"
                        }`}
                      >
                        {isOverdue
                          ? `${Math.abs(daysLeft)} day(s) overdue`
                          : daysLeft === 0
                            ? "Due today"
                            : `${daysLeft} day(s) remaining`}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={item.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
                      >
                        Instructions <LuExternalLink size={14} />
                      </a>

                      <button
                        onClick={() => navigate("/student/assignments")}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <LuSend size={15} />
                        Submit Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <LuClock size={40} className="mx-auto text-green-500" />
            <h3 className="mt-3 font-semibold text-slate-800">
              You're all caught up!
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              You have submitted all your assigned work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pendings;
