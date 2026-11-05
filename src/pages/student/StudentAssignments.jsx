import { useEffect, useMemo, useState } from "react";

import Modal from "../../components/Modal";

import { GoCheckCircleFill } from "react-icons/go";
import {
  LuSearch,
  LuCalendarDays,
  LuClipboardList,
  LuExternalLink,
  LuClock,
  LuFileText,
  LuX,
  LuSend,
} from "react-icons/lu";

const StudentAssignments = () => {
  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [note, setNote] = useState("");
  const [driveLink, setDriveLink] = useState("");

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

  useEffect(() => {
    document.body.style.overflow = selectedAssignment ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedAssignment]);

  const isSubmitted = (item) => Boolean(item.submissions?.[user.id]?.submitted);

  const getStatus = (item) => {
    if (isSubmitted(item)) return "Submitted";
    if (new Date(item.dueDate) < new Date()) return "Overdue";
    return "Pending";
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch =
        `${item.title} ${item.description} ${(item.tags || []).join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const status = getStatus(item);
      const matchesFilter = filter === "All" || status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [assignments, search, filter, user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!driveLink.trim()) {
      alert("Please enter your submission Drive link.");
      return;
    }

    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    const updated = allAssignments.map((item) =>
      item.id === selectedAssignment.id
        ? {
            ...item,
            submissions: {
              ...(item.submissions || {}),
              [user.id]: {
                submitted: true,
                submittedAt: new Date().toISOString(),
                note: note.trim(),
                driveLink: driveLink.trim(),
              },
            },
          }
        : item,
    );

    localStorage.setItem("assignments", JSON.stringify(updated));

    setAssignments(
      updated.filter((item) => item.assignedTo?.includes(user.id)),
    );

    setSelectedAssignment(null);
    setNote("");
    setDriveLink("");
  };

  const statusColors = {
    Submitted: "bg-green-50 text-green-600",
    Pending: "bg-orange-50 text-orange-600",
    Overdue: "bg-red-50 text-red-600",
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          My Assignments
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your assignments, complete your work and submit before the
          deadline.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Total Assignments",
            value: assignments.length,
            icon: LuClipboardList,
            color: "blue",
          },
          {
            title: "Submitted",
            value: assignments.filter(isSubmitted).length,
            icon: GoCheckCircleFill,
            color: "green",
          },
          {
            title: "Pending",
            value: assignments.filter((item) => !isSubmitted(item)).length,
            icon: LuClock,
            color: "orange",
          },
        ].map((card) => {
          const Icon = card.icon;
          const colors = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
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

      {/* Assignment List */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-semibold text-slate-800">All Assignments</h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredAssignments.length} assignments found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
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

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
              <option value="Submitted">Submitted</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 xl:grid-cols-2">
          {filteredAssignments.map((item) => {
            const status = getStatus(item);
            const submission = item.submissions?.[user.id];

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col xs:flex-row items-start gap-3 w-full">
                    <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                      <LuFileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">{item.id}</p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 border rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}
                  >
                    {status}
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

                <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                  <div>
                    <p className="text-xs text-slate-400">Due Date</p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <LuCalendarDays size={15} />
                      {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">Maximum Points</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {item.points} Points
                    </p>
                  </div>
                </div>

                {submission?.submitted && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3">
                    <p className="text-xs font-semibold text-green-700">
                      Submitted on{" "}
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                    {submission.note && (
                      <p className="mt-1 text-xs text-green-700">
                        {submission.note}
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    View Instructions <LuExternalLink size={15} />
                  </a>

                  {!submission?.submitted ? (
                    <button
                      onClick={() => setSelectedAssignment(item)}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      <LuSend size={15} />
                      Submit Work
                    </button>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-semibold text-green-600">
                      <GoCheckCircleFill size={17} />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="py-16 text-center">
            <LuClipboardList size={35} className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No assignments found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Submit Assignment Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={Boolean(selectedAssignment)}
          onClose={() => setSelectedAssignment(null)}
          title="Submit Assignment"
          description="Upload your work using a Google Drive link."
        >
          <form onSubmit={handleSubmit} className="space-y-5 p-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Assignment
              </label>
              <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                {selectedAssignment?.title}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Google Drive Submission Link *
              </label>
              <input
                required
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Submission Note
              </label>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe what you have completed..."
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                className="rounded-lg cursor-pointer border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <LuSend size={16} />
                Submit Assignment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentAssignments;
